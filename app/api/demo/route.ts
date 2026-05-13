import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { extractVideoId, fetchTranscript, fetchVideoMetadata } from "@/lib/youtube/transcript";
import { runGenerationPipeline } from "@/lib/llm/pipeline";

const schema = z.object({
  videoUrl: z.string().url(),
  email: z.string().email().optional(),
});

// In-memory rate limit store (use Redis in production)
const ipRateLimit = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string, limitPerHour = 10): boolean {
  const now = Date.now();
  const entry = ipRateLimit.get(ip);

  if (!entry || entry.resetAt < now) {
    ipRateLimit.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }

  if (entry.count >= limitPerHour) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req);
  const limit = parseInt(process.env.DEMO_RATE_LIMIT_PER_HOUR ?? "10");

  if (!checkRateLimit(ip, limit)) {
    return NextResponse.json(
      { error: "Limite de démo atteinte. Crée un compte gratuit pour continuer." },
      { status: 429 }
    );
  }

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
    const [metadata, transcriptResult] = await Promise.all([
      fetchVideoMetadata(videoId),
      fetchTranscript(videoId),
    ]);

    // Truncate transcript for demo (limit cost)
    const truncatedTranscript = transcriptResult.text.slice(0, 6000);

    const result = await runGenerationPipeline(
      truncatedTranscript,
      {
        title: metadata.title,
        channelName: metadata.channelName,
        durationSeconds: transcriptResult.durationSeconds,
      },
      "free"
    );

    const finalDescription =
      result.description + "\n\n—\nGénéré avec Chaptry (chaptry.com)";

    return NextResponse.json({
      videoTitle: metadata.title,
      channelName: metadata.channelName,
      thumbnailUrl: metadata.thumbnailUrl,
      chapters: result.chapters,
      chaptersText: result.chaptersText,
      description: finalDescription,
      tags: result.tags,
      isDemo: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
