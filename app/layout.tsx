import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { buildWebSiteSchema, buildSoftwareAppSchema, buildOrganizationSchema, buildHowToSchema } from "@/lib/seo/schema";

const inter = Inter({ subsets: ["latin"] });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Chaptry";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — Générateur chapitres YouTube SEO en 30 secondes`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Génère automatiquement des chapitres YouTube optimisés CTR, une description SEO complète et des tags depuis une simple URL. En 30 secondes. Sans connecter ta chaîne.",
  keywords: [
    "générateur chapitres youtube",
    "chapitres youtube automatique",
    "description youtube seo",
    "tags youtube optimisés",
    "outil seo youtube français",
    "chaptry",
  ],
  authors: [{ name: APP_NAME, url: APP_URL }],
  creator: APP_NAME,
  publisher: APP_NAME,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Générateur chapitres YouTube SEO en 30 secondes`,
    description:
      "Colle une URL YouTube, obtiens chapitres timestampés, description SEO et tags en 30 secondes. Sans connecter ta chaîne.",
    images: [
      {
        url: `${APP_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Générateur chapitres YouTube SEO`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Chapitres YouTube SEO en 30 secondes`,
    description:
      "Génère chapitres + description YouTube SEO depuis une URL. 30 secondes. Sans connecter ta chaîne.",
    images: [`${APP_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSoftwareAppSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHowToSchema()) }} />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
