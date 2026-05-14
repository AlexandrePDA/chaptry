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

interface SupadataChunk {
  text: string;
  offset: number;
  duration: number;
  lang: string;
}

interface SupadataResponse {
  content: SupadataChunk[];
  lang: string;
  availableLangs: string[];
}

interface SupadataJobResponse {
  jobId: string;
}

async function pollJob(jobId: string, apiKey: string): Promise<SupadataResponse> {
  const maxAttempts = 30;
  const delayMs = 3000;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, delayMs));

    const res = await fetch(`https://api.supadata.ai/v1/transcript/${jobId}`, {
      headers: { "x-api-key": apiKey },
    });

    if (res.status === 200) return res.json() as Promise<SupadataResponse>;
    if (res.status !== 202) throw new Error(`Supadata job failed: ${res.status}`);
  }

  throw new Error("Transcript job timed out after 90 seconds.");
}

export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) throw new Error("SUPADATA_API_KEY manquant.");

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const res = await fetch(
    `https://api.supadata.ai/v1/transcript?url=${encodeURIComponent(videoUrl)}&lang=fr&text=false`,
    { headers: { "x-api-key": apiKey } }
  );

  if (!res.ok && res.status !== 202) {
    throw new Error(
      "Transcript non disponible pour cette vidéo. Assure-toi que les sous-titres sont activés."
    );
  }

  let data: SupadataResponse;

  if (res.status === 202) {
    const job = (await res.json()) as SupadataJobResponse;
    data = await pollJob(job.jobId, apiKey);
  } else {
    data = (await res.json()) as SupadataResponse;
  }

  const chunks = data.content;
  if (!chunks || chunks.length === 0) {
    throw new Error(
      "Transcript non disponible pour cette vidéo. Assure-toi que les sous-titres sont activés."
    );
  }

  const text = chunks
    .map((c) => c.text.trim())
    .filter(Boolean)
    .join(" ");

  const last = chunks[chunks.length - 1];
  const durationSeconds = Math.round((last.offset + (last.duration ?? 0)) / 1000);

  return {
    text,
    language: data.lang || "fr",
    source: "youtube",
    durationSeconds,
  };
}

export interface VideoMetadataRaw {
  title: string;
  channelName: string;
  thumbnailUrl: string;
  viewCount?: number;
  publishedAt?: string;
}

export async function fetchVideoMetadata(videoId: string): Promise<VideoMetadataRaw> {
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
