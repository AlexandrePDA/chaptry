"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

export function LandingPricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState<"creator" | "pro" | null>(null);
  const router = useRouter();

  async function handleCheckout(plan: "creator" | "pro") {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing }),
      });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  const creatorPrice = billing === "monthly" ? "14€" : "10€";
  const proPrice = billing === "monthly" ? "29€" : "20€";

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple. Transparent. Pas de surprise.
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Améliore ta rentabilité avec Chaptry.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-muted p-1">
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="rounded-2xl border bg-white p-8 flex flex-col">
            <div className="font-bold text-xl mb-1">Free</div>
            <div className="mb-1">
              <span className="text-4xl font-bold">0€</span>
              <span className="text-base font-normal text-muted-foreground">/mois</span>
            </div>
            <p className="text-sm text-muted-foreground mb-7">Pour tester sans engagement</p>
            <ul className="space-y-3 mb-8 flex-1">
              {["3 générations/mois", "Chapitres + Description + Tags", "Français uniquement"].map((f) => (
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
                Populaire
              </span>
            </div>
            <div className="font-bold text-xl mb-1">Creator</div>
            <div className="mb-1">
              <span className="text-4xl font-bold">{creatorPrice}</span>
              <span className="text-base font-normal text-muted-foreground">/mois</span>
            </div>
            {billing === "yearly" && (
              <div className="text-xs text-primary font-medium mb-1">120€/an · économise 48€</div>
            )}
            <p className="text-sm text-muted-foreground mb-7">Pour les créateurs actifs</p>
            <ul className="space-y-3 mb-8 flex-1">
              {["30 générations/mois", "Français + Anglais", "Sans watermark", "Historique 30 jours", "Support email"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <CheckIcon /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("creator")}
              disabled={loading !== null}
              className="text-center rounded-lg py-3 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading === "creator" ? "Chargement..." : "Passer au Creator →"}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-2">Sans engagement</p>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border bg-white p-8 flex flex-col">
            <div className="font-bold text-xl mb-1">Pro</div>
            <div className="mb-1">
              <span className="text-4xl font-bold">{proPrice}</span>
              <span className="text-base font-normal text-muted-foreground">/mois</span>
            </div>
            {billing === "yearly" && (
              <div className="text-xs text-primary font-medium mb-1">240€/an · économise 108€</div>
            )}
            <p className="text-sm text-muted-foreground mb-7">Pour les créateurs qui scalent</p>
            <ul className="space-y-3 mb-8 flex-1">
              {["150 générations/mois", "FR · EN · DE · ES", "Sans watermark", "Historique illimité", "Support prioritaire", "Modèle IA supérieur (Sonnet)"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <CheckIcon /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("pro")}
              disabled={loading !== null}
              className="text-center rounded-lg py-3 text-sm font-semibold border hover:bg-muted transition-colors disabled:opacity-60"
            >
              {loading === "pro" ? "Chargement..." : "Passer au Pro →"}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-2">Sans engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
