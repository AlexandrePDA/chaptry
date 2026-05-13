import { callLLM } from "./providers";
import {
  STRUCTURAL_ANALYSIS_PROMPT,
  CHAPTER_GENERATION_PROMPT,
  DESCRIPTION_SEO_PROMPT,
  TAG_GENERATION_PROMPT,
} from "./prompts";

export interface VideoMetadata {
  title: string;
  channelName: string;
  durationSeconds: number;
  description?: string;
}

export interface Chapter {
  timestamp: string;
  timestampSecondes: number;
  titre: string;
  description: string;
}

export interface GenerationResult {
  chapters: Chapter[];
  chaptersText: string;
  description: string;
  tags: string[];
  tagsData: {
    longueTraine: string[];
    moyens: string[];
    larges: string[];
  };
  metadata: {
    inputTokensTotal: number;
    outputTokensTotal: number;
    costEuros: number;
    durationMs: number;
    model: string;
  };
}

interface StructuralAnalysis {
  genre: string;
  langue: string;
  dureeEstimeeMinutes: number;
  themePrincipal: string;
  motsClePrincipaux: string[];
  segments: Array<{
    debut: number;
    fin: number;
    theme: string;
    importance: string;
  }>;
  tonalite: string;
  publicCible: string;
  valeurPrincipale: string;
}

function parseJSON<T>(text: string): T {
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
  return JSON.parse(cleaned) as T;
}

function estimateCostEuros(inputTokens: number, outputTokens: number): number {
  // Claude Haiku pricing: ~$0.25/M input, $1.25/M output → convert to EUR ~0.93
  const inputCost = (inputTokens / 1_000_000) * 0.25 * 0.93;
  const outputCost = (outputTokens / 1_000_000) * 1.25 * 0.93;
  return Math.round((inputCost + outputCost) * 10000) / 10000;
}

export async function runGenerationPipeline(
  transcript: string,
  metadata: VideoMetadata,
  plan: "free" | "creator" = "free",
  allowedLanguages: string[] = ["fr", "en"]
): Promise<GenerationResult> {
  const startTime = Date.now();
  let totalInputTokens = 0;
  let totalOutputTokens = 0;

  const model =
    plan === "creator"
      ? "claude-sonnet-4-6"
      : "claude-haiku-4-5-20251001";

  const truncatedTranscript = transcript.slice(0, 12000);

  // Step 1 — Structural Analysis
  const step1Input = `TITRE DE LA VIDÉO : ${metadata.title}
CHAÎNE : ${metadata.channelName}
DURÉE : ${Math.round(metadata.durationSeconds / 60)} minutes

TRANSCRIPT :
${truncatedTranscript}`;

  const step1 = await callLLM(
    [{ role: "user", content: step1Input }],
    { model, maxTokens: 1500, systemPrompt: STRUCTURAL_ANALYSIS_PROMPT }
  );
  totalInputTokens += step1.inputTokens;
  totalOutputTokens += step1.outputTokens;

  let analysis: StructuralAnalysis;
  try {
    analysis = parseJSON<StructuralAnalysis>(step1.text);
  } catch {
    throw new Error("Échec de l'analyse structurelle. Réessaie.");
  }

  // Language gate: block non-allowed languages (pass "other" through)
  const detectedLang = analysis.langue;
  if (detectedLang !== "other" && !allowedLanguages.includes(detectedLang)) {
    throw new Error(`LANGUAGE_NOT_ALLOWED:${detectedLang}`);
  }

  // Steps 2 & 3+4 in parallel for speed
  const step2Input = `LANGUE : ${detectedLang}
ANALYSE STRUCTURELLE :
${JSON.stringify(analysis, null, 2)}

TITRE ORIGINAL : ${metadata.title}
DURÉE TOTALE : ${metadata.durationSeconds} secondes
THÈME PRINCIPAL : ${analysis.themePrincipal}
MOTS-CLÉS : ${analysis.motsClePrincipaux.join(", ")}`;

  const step34Input = `LANGUE : ${detectedLang}
TITRE : ${metadata.title}
CHAÎNE : ${metadata.channelName}
MOTS-CLÉS : ${analysis.motsClePrincipaux.join(", ")}
THÈME : ${analysis.themePrincipal}
PUBLIC CIBLE : ${analysis.publicCible}`;

  const [step2, step4] = await Promise.all([
    callLLM(
      [{ role: "user", content: step2Input }],
      { model, maxTokens: 1500, systemPrompt: CHAPTER_GENERATION_PROMPT }
    ),
    callLLM(
      [{ role: "user", content: step34Input }],
      { model, maxTokens: 800, systemPrompt: TAG_GENERATION_PROMPT }
    ),
  ]);

  totalInputTokens += step2.inputTokens + step4.inputTokens;
  totalOutputTokens += step2.outputTokens + step4.outputTokens;

  let chaptersData: { chapitres: Chapter[]; formatTexte: string };
  let tagsData: {
    tags: { longueTraine: string[]; moyens: string[]; larges: string[] };
    tagsOrdonnes: string[];
  };

  try {
    chaptersData = parseJSON(step2.text);
  } catch {
    throw new Error("Échec de la génération des chapitres. Réessaie.");
  }

  try {
    tagsData = parseJSON(step4.text);
  } catch {
    tagsData = { tags: { longueTraine: [], moyens: [], larges: [] }, tagsOrdonnes: [] };
  }

  // Step 3 — SEO Description (after chapters are ready)
  const step3Input = `LANGUE : ${detectedLang}
TITRE : ${metadata.title}
MOTS-CLÉS PRINCIPAUX : ${analysis.motsClePrincipaux.join(", ")}
THÈME : ${analysis.themePrincipal}
VALEUR PRINCIPALE : ${analysis.valeurPrincipale}
PUBLIC CIBLE : ${analysis.publicCible}
GENRE : ${analysis.genre}

CHAPITRES GÉNÉRÉS :
${chaptersData.formatTexte}

RÉSUMÉ TRANSCRIPT :
${truncatedTranscript.slice(0, 3000)}`;

  const step3 = await callLLM(
    [{ role: "user", content: step3Input }],
    { model, maxTokens: 2000, systemPrompt: DESCRIPTION_SEO_PROMPT }
  );
  totalInputTokens += step3.inputTokens;
  totalOutputTokens += step3.outputTokens;

  let descriptionData: { description: string };
  try {
    descriptionData = parseJSON(step3.text);
  } catch {
    descriptionData = { description: step3.text };
  }

  const durationMs = Date.now() - startTime;

  return {
    chapters: chaptersData.chapitres,
    chaptersText: chaptersData.formatTexte,
    description: descriptionData.description,
    tags: tagsData.tagsOrdonnes ?? [],
    tagsData: tagsData.tags ?? { longueTraine: [], moyens: [], larges: [] },
    metadata: {
      inputTokensTotal: totalInputTokens,
      outputTokensTotal: totalOutputTokens,
      costEuros: estimateCostEuros(totalInputTokens, totalOutputTokens),
      durationMs,
      model,
    },
  };
}
