import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { runGenerationPipeline } from "@/lib/llm/pipeline";
import { extractVideoId, fetchTranscript, fetchVideoMetadata } from "@/lib/youtube/transcript";
import { PLANS, type PlanKey } from "@/lib/stripe/client";
import { sendQuotaEmail } from "@/lib/email";

const schema = z.object({
  videoUrl: z.string().url(),
});

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  // Get user profile and check quota
  const { data: rawProfile, error: profileError } = await supabase
    .from("users")
    .select("plan, generations_used_this_month, generations_reset_at")
    .eq("id", user.id)
    .single();

  if (profileError || !rawProfile) {
    return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profile = rawProfile as any;
  const rawPlan = profile.plan ?? "free";
  const plan = (rawPlan in PLANS ? rawPlan : "free") as PlanKey;
  const planConfig = PLANS[plan];
  const limit = planConfig.generationsPerMonth;

  // Reset monthly counter if needed
  const resetAt = profile.generations_reset_at
    ? new Date(profile.generations_reset_at)
    : null;
  const now = new Date();

  if (!resetAt || resetAt < new Date(now.getFullYear(), now.getMonth(), 1)) {
    await supabase
      .from("users")
      .update({
        generations_used_this_month: 0,
        generations_reset_at: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      })
      .eq("id", user.id);
    profile.generations_used_this_month = 0;
  }

  if (profile.generations_used_this_month >= limit) {
    return NextResponse.json(
      {
        error: "Limite mensuelle atteinte.",
        used: profile.generations_used_this_month,
        limit,
        plan,
      },
      { status: 429 }
    );
  }

  // Parse & validate request
  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "URL invalide." }, { status: 400 });
  }

  const videoId = extractVideoId(body.videoUrl);
  if (!videoId) {
    return NextResponse.json({ error: "URL YouTube invalide." }, { status: 400 });
  }

  try {
    // Fetch transcript + metadata in parallel
    const [metadata, transcriptResult] = await Promise.all([
      fetchVideoMetadata(videoId),
      fetchTranscript(videoId),
    ]);

    // Run LLM pipeline
    const result = await runGenerationPipeline(
      transcriptResult.text,
      {
        title: metadata.title,
        channelName: metadata.channelName,
        durationSeconds: transcriptResult.durationSeconds,
      },
      plan,
      planConfig.languages
    );

    // Add watermark for free plan
    let finalDescription = result.description;
    if (plan === "free" && planConfig.watermark) {
      finalDescription += "\n\n—\nGénéré avec Chaptry (chaptry.com)";
    }

    // Save to DB
    const { data: generation, error: saveError } = await supabase
      .from("generations")
      .insert({
        user_id: user.id,
        video_url: body.videoUrl,
        video_id: videoId,
        video_title: metadata.title,
        channel_name: metadata.channelName,
        duration_seconds: transcriptResult.durationSeconds,
        transcript: transcriptResult.text,
        chapters: result.chapters,
        description: finalDescription,
        tags: result.tags,
        generation_metadata: {
          ...result.metadata,
          transcriptSource: transcriptResult.source,
          transcriptLanguage: transcriptResult.language,
          plan,
        },
      })
      .select("id")
      .single();

    if (saveError) {
      console.error("Save error:", saveError);
    }

    // Increment usage counter
    const newCount = profile.generations_used_this_month + 1;
    await supabase
      .from("users")
      .update({ generations_used_this_month: newCount })
      .eq("id", user.id);

    // Send quota email when last generation is consumed
    if (newCount >= limit && user.email) {
      sendQuotaEmail(user.email, plan, limit).catch(console.error);
    }

    // Track usage event
    await supabase.from("usage_events").insert({
      user_id: user.id,
      event_type: "generation",
      metadata: {
        videoId,
        plan,
        durationMs: result.metadata.durationMs,
        costEuros: result.metadata.costEuros,
      },
    });

    return NextResponse.json({
      generationId: generation?.id,
      chapters: result.chapters,
      chaptersText: result.chaptersText,
      description: finalDescription,
      tags: result.tags,
      tagsData: result.tagsData,
      videoTitle: metadata.title,
      channelName: metadata.channelName,
      thumbnailUrl: metadata.thumbnailUrl,
      usage: {
        used: profile.generations_used_this_month + 1,
        limit,
        plan,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur de génération";
    console.error("Generation error:", err);

    if (message.startsWith("LANGUAGE_NOT_ALLOWED:")) {
      const lang = message.split(":")[1];
      return NextResponse.json(
        {
          code: "LANGUAGE_NOT_ALLOWED",
          detectedLanguage: lang,
          plan,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
