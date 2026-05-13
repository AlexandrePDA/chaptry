import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion — Chaptry",
  description: "Connecte-toi à Chaptry pour générer tes chapitres YouTube SEO.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
