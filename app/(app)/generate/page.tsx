"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Chapter {
  timestamp: string;
  timestampSecondes: number;
  titre: string;
  description: string;
}

interface GenerationResult {
  generationId: string;
  videoTitle: string;
  channelName: string;
  thumbnailUrl: string;
  chapters: Chapter[];
  chaptersText: string;
  description: string;
  tags: string[];
  usage: { used: number; limit: number; plan: string };
}

type AppError =
  | { type: "quota"; used: number; limit: number }
  | { type: "language"; detectedLanguage: string; plan: string }
  | { type: "invalid_video"; message: string }
  | { type: "server"; message: string }
  | { type: "network" };

type UrlValidationError = "not_youtube" | "no_id" | "invalid";

const LOADING_STEPS = [
  "Récupération du transcript...",
  "Analyse de la structure vidéo...",
  "Génération des chapitres...",
  "Rédaction de la description SEO...",
  "Génération des tags...",
  "Finalisation...",
];

const URL_ERROR_MESSAGES: Record<UrlValidationError, string> = {
  invalid: "Ce n'est pas une URL valide.",
  not_youtube: "Seules les URLs YouTube sont acceptées (youtube.com ou youtu.be).",
  no_id: "Cette URL ne pointe pas vers une vidéo spécifique.",
};

function validateUrl(raw: string): UrlValidationError | null {
  const s = raw.trim();
  if (!s) return "invalid";
  let parsed: URL;
  try {
    parsed = new URL(s);
  } catch {
    return "invalid";
  }
  const host = parsed.hostname.replace(/^(www\.|m\.)/, "");
  if (host !== "youtube.com" && host !== "youtu.be") return "not_youtube";
  if (host === "youtu.be") return parsed.pathname.length > 1 ? null : "no_id";
  const hasId =
    parsed.searchParams.has("v") ||
    (parsed.pathname.startsWith("/shorts/") && parsed.pathname.length > "/shorts/".length) ||
    (parsed.pathname.startsWith("/live/") && parsed.pathname.length > "/live/".length);
  return hasId ? null : "no_id";
}

function langLabel(code: string) {
  const map: Record<string, string> = { en: "anglais", es: "espagnol", de: "allemand" };
  return map[code] ?? code;
}

// Icons
function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function WifiOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function VideoOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34" />
      <path d="M23 7l-7 5 7 5V7z" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function GeneratePage() {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<UrlValidationError | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [appError, setAppError] = useState<AppError | null>(null);
  const [activeTab, setActiveTab] = useState<"chapters" | "description" | "tags">("chapters");
  const [copied, setCopied] = useState<string | null>(null);

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
    if (urlError) setUrlError(null);
  }

  function handleUrlBlur() {
    if (url.trim()) setUrlError(validateUrl(url));
  }

  async function runGenerate() {
    setLoading(true);
    setResult(null);
    setAppError(null);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1));
    }, 3500);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        if (res.status === 429) {
          setAppError({ type: "quota", used: data.used ?? 0, limit: data.limit ?? 3 });
        } else if (res.status === 403 && data.code === "LANGUAGE_NOT_ALLOWED") {
          setAppError({ type: "language", detectedLanguage: data.detectedLanguage ?? "en", plan: data.plan ?? "free" });
        } else if (res.status === 500) {
          setAppError({ type: "server", message: data.error ?? "Erreur interne. Réessaie dans quelques secondes." });
        } else {
          setAppError({ type: "invalid_video", message: data.error ?? "Vidéo inaccessible ou non supportée." });
        }
        return;
      }

      setResult(data);
      setActiveTab("chapters");
      toast.success("Génération terminée !");
    } catch {
      setAppError({ type: "network" });
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateUrl(url);
    if (validationError) {
      setUrlError(validationError);
      return;
    }
    await runGenerate();
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      toast.success("Copié !");
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div className="px-4 py-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Générer</h1>
        <p className="text-muted-foreground text-sm">
          Colle l&apos;URL d&apos;une vidéo YouTube pour générer chapitres, description SEO et tags.
        </p>
      </div>

      {/* Input form */}
      <form onSubmit={handleGenerate} className="mb-8">
        <div className="flex gap-3 items-start">
          <div className="flex-1 flex flex-col gap-1.5">
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              onBlur={handleUrlBlur}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={loading}
              className={`w-full rounded-xl border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors ${
                urlError
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-primary"
              }`}
            />
            {urlError && (
              <p className="flex items-center gap-1.5 text-xs text-red-500 pl-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                {URL_ERROR_MESSAGES[urlError]}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {loading ? "Génération..." : "Générer →"}
          </button>
        </div>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="rounded-xl border bg-card p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <ZapIcon className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="font-semibold mb-2">Analyse en cours...</p>
          <p className="text-sm text-muted-foreground mb-6">
            {LOADING_STEPS[loadingStep]}
          </p>
          <div className="flex justify-center gap-2 mb-6">
            {LOADING_STEPS.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full h-2 ${
                  i < loadingStep
                    ? "w-2 bg-primary"
                    : i === loadingStep
                    ? "w-4 bg-primary"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Généralement moins de 30 secondes ☕</p>
        </div>
      )}

      {/* Error states */}
      {appError && !loading && (
        <>
          {appError.type === "quota" && (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <ZapIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 mb-1">Limite mensuelle atteinte</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    Tu as utilisé {appError.used}/{appError.limit} générations ce mois.
                  </p>
                  <div className="w-full bg-amber-100 rounded-full h-2 mb-4">
                    <div
                      className="bg-amber-500 rounded-full h-2 transition-all"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/pricing"
                      className="inline-flex items-center rounded-lg bg-amber-600 text-white px-4 py-2 text-sm font-semibold hover:bg-amber-700 transition-colors"
                    >
                      Voir les offres →
                    </Link>
                    <span className="text-xs text-amber-600">sans engagement</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {appError.type === "language" && (() => {
            const lang = appError.detectedLanguage;
            const plan = appError.plan;
            const upgradeToCreator = lang === "en" && plan === "free";
            const upgradeToPro = (lang === "de" || lang === "es") && (plan === "free" || plan === "creator");
            const isUnsupported = !upgradeToCreator && !upgradeToPro;

            return (
              <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <GlobeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    {upgradeToCreator && (
                      <>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          Vidéo en anglais — disponible sur le plan Creator
                        </h3>
                        <p className="text-sm text-blue-700 mb-4">
                          Le plan gratuit génère uniquement pour les vidéos en français.
                          Passe au Creator pour débloquer l&apos;anglais.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href="/pricing"
                            className="inline-flex items-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Passer au Creator — FR + EN →
                          </Link>
                          <button
                            onClick={() => { setAppError(null); setUrl(""); }}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Essayer une vidéo en français
                          </button>
                        </div>
                      </>
                    )}
                    {upgradeToPro && (
                      <>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          Vidéo en {langLabel(lang)} — disponible sur le plan Pro
                        </h3>
                        <p className="text-sm text-blue-700 mb-4">
                          L&apos;allemand et l&apos;espagnol sont disponibles sur le plan Pro (FR · EN · DE · ES).
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href="/pricing"
                            className="inline-flex items-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Passer au Pro →
                          </Link>
                          <button
                            onClick={() => { setAppError(null); setUrl(""); }}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Essayer une vidéo en français
                          </button>
                        </div>
                      </>
                    )}
                    {isUnsupported && (
                      <>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          Vidéo en {langLabel(lang)} — langue non supportée
                        </h3>
                        <p className="text-sm text-blue-700 mb-4">
                          Chaptry supporte le français, l&apos;anglais, l&apos;allemand et l&apos;espagnol.
                          Les vidéos en {langLabel(lang)} ne sont pas prises en charge.
                        </p>
                        <button
                          onClick={() => { setAppError(null); setUrl(""); }}
                          className="inline-flex items-center rounded-lg border border-blue-300 bg-white text-blue-700 px-4 py-2 text-sm font-medium hover:bg-blue-50 transition-colors"
                        >
                          Essayer une autre vidéo
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {appError.type === "invalid_video" && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <VideoOffIcon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Vidéo inaccessible</h3>
                  <p className="text-sm text-red-700 mb-3">{appError.message}</p>
                  <ul className="text-xs text-red-600 space-y-1 mb-4 list-disc list-inside">
                    <li>Vérifie que la vidéo est publique et non supprimée</li>
                    <li>Les vidéos privées ou non répertoriées ne sont pas supportées</li>
                    <li>Les YouTube Shorts peuvent ne pas avoir de transcript</li>
                    <li>Essaie avec une vidéo de plus de 2 minutes</li>
                  </ul>
                  <button
                    onClick={() => runGenerate()}
                    className="inline-flex items-center rounded-lg border border-red-300 bg-white text-red-700 px-4 py-2 text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            </div>
          )}

          {appError.type === "server" && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertCircleIcon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Erreur lors de la génération</h3>
                  <p className="text-sm text-red-700 mb-4">{appError.message}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => runGenerate()}
                      className="inline-flex items-center rounded-lg border border-red-300 bg-white text-red-700 px-4 py-2 text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Réessayer
                    </button>
                    <a
                      href="mailto:support@chaptry.com"
                      className="text-sm text-red-600 hover:underline"
                    >
                      Contacter le support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {appError.type === "network" && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <WifiOffIcon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Erreur de connexion</h3>
                  <p className="text-sm text-red-700 mb-4">
                    Impossible de contacter le serveur. Vérifie ta connexion internet et réessaie.
                  </p>
                  <button
                    onClick={() => runGenerate()}
                    className="inline-flex items-center rounded-lg border border-red-300 bg-white text-red-700 px-4 py-2 text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="space-y-4">
          {/* Video info */}
          <div className="rounded-xl border bg-card p-4 flex gap-4 items-start">
            {result.thumbnailUrl && (
              <img
                src={result.thumbnailUrl}
                alt=""
                className="w-24 h-18 object-cover rounded shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{result.videoTitle}</p>
              <p className="text-sm text-muted-foreground">{result.channelName}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {result.usage.used}/{result.usage.limit} générations utilisées ce mois
              </p>
            </div>
            <a
              href={`/history/${result.generationId}`}
              className="shrink-0 text-xs text-primary hover:underline"
            >
              Voir dans l&apos;historique →
            </a>
          </div>

          {/* Tabs */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="flex border-b bg-muted/30">
              {(["chapters", "description", "tags"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-card text-foreground border-b-2 border-primary -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "chapters" ? "Chapitres" : tab === "description" ? "Description" : "Tags"}
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === "chapters" && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-muted-foreground">
                      {result.chapters.length} chapitres · Prêt à coller dans YouTube Studio
                    </p>
                    <button
                      onClick={() => copyToClipboard(result.chaptersText, "chapters")}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      {copied === "chapters" ? "✓ Copié !" : "Copier tout"}
                    </button>
                  </div>
                  <pre className="rounded-lg bg-muted p-4 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {result.chaptersText}
                  </pre>
                  <div className="mt-4 space-y-2">
                    {result.chapters.map((ch) => (
                      <div
                        key={ch.timestamp}
                        className="flex gap-3 rounded-lg border p-3 text-sm"
                      >
                        <span className="font-mono text-primary shrink-0">{ch.timestamp}</span>
                        <div>
                          <p className="font-medium">{ch.titre}</p>
                          {ch.description && (
                            <p className="text-muted-foreground text-xs mt-0.5">{ch.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "description" && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-muted-foreground">
                      {result.description.length} caractères · Structure SEO optimisée
                    </p>
                    <button
                      onClick={() => copyToClipboard(result.description, "description")}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      {copied === "description" ? "✓ Copié !" : "Copier tout"}
                    </button>
                  </div>
                  <textarea
                    value={result.description}
                    readOnly
                    rows={20}
                    className="w-full rounded-lg bg-muted p-4 text-sm leading-relaxed font-mono resize-none focus:outline-none"
                  />
                </div>
              )}

              {activeTab === "tags" && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-muted-foreground">
                      {result.tags.length} tags · Copie en format virgule-séparé pour YouTube
                    </p>
                    <button
                      onClick={() => copyToClipboard(result.tags.join(", "), "tags")}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      {copied === "tags" ? "✓ Copié !" : "Copier tout"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => copyToClipboard(tag, tag)}
                        title="Cliquer pour copier"
                        className="rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground mb-2">Format YouTube (virgule-séparé) :</p>
                    <p className="text-xs font-mono text-muted-foreground break-all">
                      {result.tags.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* New generation */}
          <button
            onClick={() => { setResult(null); setUrl(""); }}
            className="w-full rounded-xl border py-3 text-sm font-medium hover:bg-muted transition-colors"
          >
            ← Nouvelle génération
          </button>
        </div>
      )}
    </div>
  );
}
