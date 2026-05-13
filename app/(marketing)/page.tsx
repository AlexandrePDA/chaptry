import type { Metadata } from "next";
import Link from "next/link";
import { buildFAQSchema, buildSoftwareAppSchema } from "@/lib/seo/schema";
import { HeroSection } from "@/components/marketing/hero-section";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";

export const metadata: Metadata = {
  title: "Chaptry — Générateur de chapitres YouTube SEO en 30 secondes",
  description:
    "Génère automatiquement des chapitres YouTube optimisés CTR + une description SEO complète + des tags depuis une simple URL. En 30 secondes. Sans connecter ta chaîne.",
  alternates: { canonical: APP_URL },
};

const FAQ_ITEMS = [
  {
    question: "Comment ajouter des chapitres sur YouTube ?",
    answer:
      "Pour ajouter des chapitres sur YouTube, colle une liste de timestamps dans la description de ta vidéo. Le premier doit commencer à 00:00. Chaptry génère automatiquement cette liste depuis le transcript de ta vidéo, prête à copier-coller dans YouTube Studio.",
  },
  {
    question: "Comment l'outil récupère-t-il le transcript ?",
    answer:
      "Quand tu colles une URL YouTube, on récupère automatiquement le transcript généré par YouTube. Aucune action de ta part, pas de connexion de chaîne nécessaire.",
  },
  {
    question: "Et si ma vidéo n'a pas de transcript ?",
    answer:
      "Chaptry utilise le transcript natif de YouTube. Si ta vidéo n'en a pas, active les sous-titres automatiques dans YouTube Studio avant de générer.",
  },
  {
    question: "Quelle différence avec TubeBuddy ou VidIQ pour les chapitres ?",
    answer:
      "TubeBuddy et VidIQ sont des extensions Chrome axées sur l'analyse de mots-clés. Aucun des deux ne génère des chapitres automatiquement depuis le contenu de ta vidéo. Chaptry est le seul outil spécialisé dans la génération de chapitres YouTube optimisés CTR + description SEO complète depuis une URL.",
  },
  {
    question: "Quelle différence avec ChatGPT ?",
    answer:
      "5-10 min avec ChatGPT vs 30 secondes avec nous. Notre pipeline spécialisé respecte les contraintes YouTube (premier chapitre 00:00, longueur optimale, etc.) et génère des titres optimisés CTR sans que tu aies à rédiger un prompt.",
  },
  {
    question: "Mes vidéos restent-elles privées ?",
    answer:
      "Oui. On ne stocke jamais le contenu vidéo, uniquement le transcript textuel dans ton historique personnel. Hébergement EU, conformité RGPD complète.",
  },
  {
    question: "Quelles langues sont supportées ?",
    answer:
      "Français sur tous les plans. Anglais disponible sur le plan Creator. La détection est automatique selon la langue de la vidéo.",
  },
  {
    question: "Faut-il connecter ma chaîne YouTube ?",
    answer:
      "Non. Tu colles juste l'URL de ta vidéo. Pas de connexion OAuth, pas de permissions sur ta chaîne, pas de risque.",
  },
  {
    question: "Puis-je annuler à tout moment ?",
    answer:
      "Oui, depuis ton compte. Pas de frais d'annulation. Tu gardes l'accès jusqu'à la fin de ta période de facturation.",
  },
];

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CopyPasteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      <line x1="13" y1="13" x2="17" y2="13" />
      <line x1="13" y1="17" x2="15" y2="17" />
    </svg>
  );
}

function TrendingDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-4 h-4 text-primary shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8l3.5 3.5L13 4.5" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQSchema(FAQ_ITEMS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareAppSchema()),
        }}
      />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── PROBLÈME ──────────────────────────────────────────── */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Marre de passer 30 minutes sur chaque vidéo ?
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Chapitres YouTube, description SEO, tags : rédiger tout ça à la
              main coûte 30 à 45 min par vidéo pour des résultats souvent
              génériques et mal optimisés.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "Perte de temps",
                icon: <ClockIcon />,
                desc: "20-45 minutes par vidéo sur les chapitres + description. Pour un créateur à 4 vidéos/mois : jusqu'à 3h perdues.",
              },
              {
                label: "Résultats génériques",
                icon: <CopyPasteIcon />,
                desc: "ChatGPT génère des chapitres comme « Introduction », « Partie 1 ». Pas optimisés CTR. Pas conformes aux contraintes YouTube.",
              },
              {
                label: "SEO médiocre",
                icon: <TrendingDownIcon />,
                desc: "Une description mal structurée = moins de visibilité organique. Le mot-clé principal n'est pas en tête. Les hashtags sont aléatoires.",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border bg-white p-7">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  {item.label}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARAISON ───────────────────────────────────────── */}

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simple. Transparent. Pas de surprise.
            </h2>
            <p className="text-lg text-muted-foreground">
              Améliore ta rentabilité avec Chaptry.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border bg-white p-8 flex flex-col">
              <div className="font-bold text-xl mb-1">Free</div>
              <div className="mb-1">
                <span className="text-4xl font-bold">0€</span>
                <span className="text-base font-normal text-muted-foreground">
                  /mois
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-7">
                Pour tester sans engagement
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "3 générations/mois",
                  "Chapitres + Description + Tags",
                  "Français uniquement",
                  "Watermark dans la description",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="text-center rounded-lg py-3 text-sm font-semibold border hover:bg-muted transition-colors"
              >
                Commencer gratuitement
              </Link>
            </div>

            {/* Creator */}
            <div className="rounded-2xl border-2 border-primary shadow-lg ring-1 ring-primary/20 p-8 flex flex-col relative bg-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                  Recommandé
                </span>
              </div>
              <div className="font-bold text-xl mb-1">Creator</div>
              <div className="mb-1">
                <span className="text-4xl font-bold">14€</span>
                <span className="text-base font-normal text-muted-foreground">
                  /mois
                </span>
              </div>
              <div className="text-xs text-primary font-medium mb-2">
                ou 10€/mois en annuel{" "}
                <span className="font-semibold">(-29%)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-7">
                Pour les créateurs qui veulent scaler
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "100 générations/mois",
                  "Français + Anglais",
                  "Sans watermark",
                  "Historique illimité",
                  "Support prioritaire",
                  "Modèle IA Creator (Claude Sonnet)",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="text-center rounded-lg py-3 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Passer au Creator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground">
              Tout ce que tu dois savoir avant de commencer.
            </p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border bg-white p-6"
              >
                <h3 className="font-semibold mb-2 text-base">
                  {item.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────── */}
      <section className="py-28 bg-primary">
        <div className="container text-center max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <YouTubeIcon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Économise 30 minutes dès ta prochaine vidéo
          </h2>
          <p className="text-primary-foreground/75 text-lg mb-10">
            Aucune carte bancaire requise.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-10 py-4 text-base font-bold hover:bg-white/90 transition-colors"
          >
            Tester gratuitement →
          </Link>
        </div>
      </section>
    </>
  );
}
