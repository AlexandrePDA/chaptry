import { YoutubeTranscript } from "youtube-transcript";

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export interface TranscriptResult {
  text: string;
  language: string;
  source: "youtube";
  durationSeconds: number;
}

export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  // Try YouTube native transcript first (FR, then EN, then any)
  const langPrefs = ["fr", "en", ""];

  for (const lang of langPrefs) {
    try {
      const segments = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: lang || undefined,
      });

      if (segments.length === 0) continue;

      const text = segments
        .map((s) => s.text.trim())
        .filter(Boolean)
        .join(" ");

      const durationSeconds =
        segments.length > 0
          ? Math.round(
              (segments[segments.length - 1].offset +
                (segments[segments.length - 1].duration ?? 0)) /
                1000
            )
          : 0;

      return {
        text,
        language: lang || "auto",
        source: "youtube",
        durationSeconds,
      };
    } catch {
      continue;
    }
  }

  throw new Error(
    "Transcript non disponible pour cette vidéo. Assure-toi que les sous-titres sont activés."
  );
}

export interface VideoMetadataRaw {
  title: string;
  channelName: string;
  thumbnailUrl: string;
  viewCount?: number;
  publishedAt?: string;
}

export async function fetchVideoMetadata(videoId: string): Promise<VideoMetadataRaw> {
  // Use oEmbed API (no key needed) for basic metadata
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  const response = await fetch(oembedUrl, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Vidéo introuvable ou privée.");
  }

  const data = (await response.json()) as {
    title: string;
    author_name: string;
    thumbnail_url: string;
  };

  return {
    title: data.title,
    channelName: data.author_name,
    thumbnailUrl: data.thumbnail_url,
  };
}
