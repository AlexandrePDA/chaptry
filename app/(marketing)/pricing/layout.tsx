import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs Chaptry — Générateur YouTube SEO",
  description:
    "Tarifs simples et transparents. Free 0€ · Creator 12€/mois · Pro 29€/mois. Essai gratuit, annulation à tout moment.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
