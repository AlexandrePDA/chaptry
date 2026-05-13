"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "creator", billing }),
      });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Simple. Transparent. Efficace.
        </h1>

        <div className="inline-flex items-center gap-3 mt-6 rounded-full bg-muted p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${billing === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${billing === "yearly" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
          >
            Annuel <span className="text-primary font-semibold ml-1">−29%</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
        {/* Free */}
        <div className="rounded-2xl border bg-card p-8 flex flex-col">
          <div className="font-bold text-2xl mb-1">Free</div>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-bold">0€</span>
            <span className="text-muted-foreground text-sm mb-1">/mois</span>
          </div>
          <div className="text-xs text-muted-foreground font-medium mb-4">
            3 vidéos/mois
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Pour tester sans engagement
          </p>

          <ul className="space-y-3 mb-8 flex-1">
            {[
              { text: "3 générations/mois", ok: true },
              { text: "Chapitres + Description + Tags", ok: true },
              { text: "Français uniquement", ok: true },
              { text: "Sans watermark", ok: false },
              { text: "Historique des générations", ok: false },
              { text: "Support prioritaire", ok: false },
              { text: "Modèle IA Creator (Claude Sonnet)", ok: false },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-2.5 text-sm">
                {f.ok ? (
                  <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <XIcon className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                )}
                <span className={!f.ok ? "text-muted-foreground/50" : ""}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/dashboard"
            className="text-center rounded-lg py-3 font-semibold border hover:bg-muted transition-colors"
          >
            Commencer gratuitement
          </Link>
        </div>

        {/* Creator */}
        <div className="rounded-2xl border-2 border-primary shadow-xl ring-2 ring-primary/20 p-8 flex flex-col relative bg-card">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground text-xs font-bold px-4 py-1">
            RECOMMANDÉ
          </div>

          <div className="font-bold text-2xl mb-1">Creator</div>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-bold">
              {billing === "monthly" ? "14€" : "10€"}
            </span>
            <span className="text-muted-foreground text-sm mb-1">/mois</span>
          </div>
          {billing === "yearly" && (
            <div className="text-xs text-primary font-semibold mb-1">
              120€/an · économise 48€
            </div>
          )}
          <div className="text-xs text-primary font-medium mb-4">
            100 vidéos/mois
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Pour les créateurs qui veulent scaler
          </p>

          <ul className="space-y-3 mb-8 flex-1">
            {[
              "100 générations/mois",
              "Chapitres + Description + Tags",
              "Français + Anglais",
              "Sans watermark",
              "Historique illimité",
              "Support prioritaire",
              "Modèle IA Creator (Claude Sonnet)",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="text-center rounded-lg py-3 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Chargement..." : "Passer au Creator →"}
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Annulation en 1 clic · Sans engagement
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Comment tester Chaptry avant de payer ?",
              a: "Le plan gratuit inclut 3 générations par mois, sans carte bancaire. C'est suffisant pour tester la qualité sur tes propres vidéos avant de passer au Creator.",
            },
            {
              q: "Puis-je annuler à tout moment ?",
              a: "Oui, depuis tes paramètres en 1 clic. Tu gardes l'accès jusqu'à la fin de ta période de facturation. Pas de frais d'annulation.",
            },
            {
              q: "Que se passe-t-il si j'atteins ma limite mensuelle ?",
              a: "Les générations se réinitialisent le 1er de chaque mois. Sur le plan Free tu peux passer au Creator à tout moment pour continuer immédiatement.",
            },
            {
              q: "Quelle est la différence entre les deux plans ?",
              a: "Le plan Creator utilise Claude Sonnet, un modèle plus puissant qui génère des chapitres plus précis, des descriptions mieux structurées et des tags plus pertinents. Le plan Free utilise Claude Haiku, rapide et efficace pour la majorité des vidéos.",
            },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border p-6">
              <h3 className="font-semibold mb-2">{item.q}</h3>
              <p className="text-muted-foreground text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
