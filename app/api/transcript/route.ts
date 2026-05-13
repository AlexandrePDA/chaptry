import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { extractVideoId, fetchTranscript, fetchVideoMetadata } from "@/lib/youtube/transcript";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  url: z.string().url().includes("youtube"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = schema.parse(body);

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: "URL YouTube invalide." }, { status: 400 });
    }

    const [metadata, transcriptResult] = await Promise.all([
      fetchVideoMetadata(videoId),
      fetchTranscript(videoId),
    ]);

    return NextResponse.json({
      videoId,
      metadata: {
        ...metadata,
        durationSeconds: transcriptResult.durationSeconds,
      },
      transcript: transcriptResult.text,
      transcriptLanguage: transcriptResult.language,
      transcriptSource: transcriptResult.source,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    const status = message.includes("invalide") || message.includes("introuvable") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
