const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Chaptry";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: BASE_URL,
    description:
      "L'outil le plus rapide pour générer chapitres + descriptions SEO YouTube depuis une URL",
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Chaptry est un générateur IA de chapitres YouTube, descriptions SEO et tags. Il transforme n'importe quelle URL YouTube en contenu SEO optimisé en 30 secondes, sans connecter sa chaîne.",
    foundingDate: "2024",
    areaServed: ["FR", "BE", "CH", "CA"],
    knowsAbout: [
      "YouTube SEO",
      "générateur chapitres YouTube",
      "description YouTube optimisée",
      "tags YouTube",
      "SEO créateurs de contenu",
    ],
  };
}

export function buildHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment générer des chapitres YouTube optimisés avec Chaptry",
    description:
      "Générer des chapitres YouTube SEO, une description et des tags en 30 secondes depuis une URL vidéo.",
    totalTime: "PT30S",
    tool: [{ "@type": "HowToTool", name: "Chaptry", url: BASE_URL }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Coller l'URL YouTube",
        text: "Copie l'URL de ta vidéo YouTube publique et colle-la dans le champ de génération Chaptry.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Lancer la génération",
        text: "Clique sur Générer. Chaptry récupère automatiquement le transcript et lance le pipeline IA en parallèle.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copier les résultats",
        text: "En 30 secondes tu obtiens des chapitres timestampés optimisés CTR, une description SEO complète et des tags pertinents. Copie-les en un clic dans YouTube Studio.",
      },
    ],
  };
}

export function buildSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    url: BASE_URL,
    description:
      "Générateur automatique de chapitres YouTube, descriptions SEO et tags depuis une URL vidéo",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "29",
      priceCurrency: "EUR",
      offerCount: 3,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };
}

export function buildFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleSchema(post: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `${BASE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      url: BASE_URL,
    },
  };
}

export function buildToolSchema(tool: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: `${BASE_URL}/tools/${tool.slug}`,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };
}
