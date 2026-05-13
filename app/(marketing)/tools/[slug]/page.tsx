import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  TOOL_PAGES,
  COMPARISON_PAGES,
  NICHE_PAGES,
} from "@/lib/seo/tools-data";
import { buildFAQSchema, buildToolSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";

type Props = { params: Promise<{ slug: string }> };

function findPage(slug: string) {
  const tool = TOOL_PAGES.find((p) => p.slug === slug);
  if (tool) return { type: "tool" as const, data: tool };

  const comparison = COMPARISON_PAGES.find((p) => p.slug === slug);
  if (comparison) return { type: "comparison" as const, data: comparison };

  const niche = NICHE_PAGES.find((p) => p.slug === slug);
  if (niche) return { type: "niche" as const, data: niche };

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return {};

  return {
    title: page.data.metaTitle,
    description: page.data.metaDescription,
    alternates: { canonical: `${APP_URL}/tools/${slug}` },
    openGraph: {
      title: page.data.metaTitle,
      description: page.data.metaDescription,
      url: `${APP_URL}/tools/${slug}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const slugs = [
    ...TOOL_PAGES.map((p) => p.slug),
    ...COMPARISON_PAGES.map((p) => p.slug),
    ...NICHE_PAGES.map((p) => p.slug),
  ];
  return slugs.map((slug) => ({ slug }));
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  const breadcrumbs = [
    { name: "Accueil", url: APP_URL },
    { name: "Outils", url: `${APP_URL}/tools` },
    { name: page.data.h1, url: `${APP_URL}/tools/${slug}` },
  ];

  if (page.type === "tool") {
    const tool = page.data;
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildToolSchema({
                title: tool.title,
                description: tool.metaDescription,
                slug,
              })
            ),
          }}
        />
        {tool.faqItems && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildFAQSchema(tool.faqItems)),
            }}
          />
        )}

        {/* Breadcrumb */}
        <div className="container py-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Accueil</Link>
          {" › "}
          <Link href="/tools" className="hover:text-foreground">Outils</Link>
          {" › "}
          <span>{tool.title}</span>
        </div>

        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium mb-4">
              {tool.language === "fr" ? "Outil gratuit" : "Free Tool"} · 30 sec
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{tool.h1}</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {tool.intro}
            </p>

            {/* Mini tool widget */}
            <div className="rounded-2xl border bg-card shadow-lg p-6 max-w-2xl mx-auto">
              <p className="text-sm font-medium mb-3 text-left">
                {tool.language === "fr"
                  ? "URL de ta vidéo YouTube"
                  : "Your YouTube video URL"}
              </p>
              <div className="flex gap-3">
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  {tool.language === "fr" ? "Générer →" : "Generate →"}
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {tool.language === "fr"
                  ? "Gratuit · Pas de CB · Sans connecter ta chaîne"
                  : "Free · No credit card · No channel connection"}
              </p>
            </div>
          </div>
        </section>

        {/* Keywords section */}
        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {tool.language === "fr"
                ? "Comment générer automatiquement"
                : "How to automatically generate"}{" "}
              {tool.title.toLowerCase()}
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {tool.intro} Notre outil utilise un pipeline IA spécialisé en 4 étapes
                pour analyser le contenu de ta vidéo et générer des résultats optimisés
                pour le SEO YouTube et le CTR.
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="rounded-xl border p-5">
                  <div className="text-2xl mb-3">1️⃣</div>
                  <h3 className="font-semibold mb-2">Analyse automatique</h3>
                  <p className="text-sm text-muted-foreground">
                    Colle l&apos;URL. On récupère le transcript et les métadonnées en 2-3 secondes.
                  </p>
                </div>
                <div className="rounded-xl border p-5">
                  <div className="text-2xl mb-3">2️⃣</div>
                  <h3 className="font-semibold mb-2">Pipeline IA spécialisé</h3>
                  <p className="text-sm text-muted-foreground">
                    Notre IA analyse la structure thématique et génère du contenu optimisé YouTube.
                  </p>
                </div>
                <div className="rounded-xl border p-5">
                  <div className="text-2xl mb-3">3️⃣</div>
                  <h3 className="font-semibold mb-2">Copie en un clic</h3>
                  <p className="text-sm text-muted-foreground">
                    Résultat prêt à coller dans YouTube Studio. Éditables avant copie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {tool.faqItems && tool.faqItems.length > 0 && (
          <section className="py-12 bg-muted/20">
            <div className="container max-w-3xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Questions fréquentes</h2>
              <div className="space-y-4">
                {tool.faqItems.map((item) => (
                  <div key={item.question} className="rounded-xl border bg-card p-6">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related tools */}
        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Outils complémentaires</h2>
            <div className="flex flex-wrap gap-3">
              {tool.relatedTools.map((relSlug) => {
                const rel = TOOL_PAGES.find((p) => p.slug === relSlug);
                if (!rel) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/tools/${relSlug}`}
                    className="rounded-full border px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    {rel.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center max-w-2xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {tool.language === "fr"
                ? "Prêt à économiser 30 minutes par vidéo ?"
                : "Ready to save 30 minutes per video?"}
            </h2>
            <p className="mb-6 text-primary-foreground/80">
              {tool.language === "fr"
                ? "Gratuit pour 3 vidéos. Aucune carte bancaire requise."
                : "Free for 3 videos. No credit card required."}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 font-bold hover:bg-white/90 transition-colors"
            >
              {tool.language === "fr" ? "Essayer gratuitement →" : "Try for free →"}
            </Link>
          </div>
        </section>
      </>
    );
  }

  if (page.type === "comparison") {
    const comp = page.data;
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)),
          }}
        />

        <div className="container py-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Accueil</Link>
          {" › "}
          <Link href="/tools" className="hover:text-foreground">Comparatifs</Link>
          {" › "}
          <span>vs {comp.competitor}</span>
        </div>

        <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{comp.h1}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{comp.intro}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Comparaison détaillée</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4">Critère</th>
                    <th className="text-center p-4 text-primary font-bold">Chaptry</th>
                    <th className="text-center p-4 text-muted-foreground">{comp.competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {comp.comparisonPoints.map((point, i) => (
                    <tr key={point.feature} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="p-4 font-medium">{point.feature}</td>
                      <td className={`p-4 text-center ${point.winner === "us" ? "text-green-600 font-semibold" : ""}`}>
                        {point.us}
                      </td>
                      <td className={`p-4 text-center ${point.winner === "them" ? "text-green-600 font-semibold" : "text-muted-foreground"}`}>
                        {point.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-xl border bg-muted/30 p-6">
              <h3 className="font-bold text-lg mb-2">Notre verdict</h3>
              <p className="text-muted-foreground">{comp.verdict}</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">
              Essaie Chaptry gratuitement
            </h2>
            <p className="mb-6 text-primary-foreground/80">
              3 vidéos gratuites. Aucune carte bancaire requise.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 font-bold hover:bg-white/90 transition-colors"
            >
              Commencer gratuitement →
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Niche page
  const niche = page.data;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="container py-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Accueil</Link>
        {" › "}
        <Link href="/tools" className="hover:text-foreground">Outils</Link>
        {" › "}
        <span>{niche.niche}</span>
      </div>

      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{niche.h1}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{niche.intro}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3 font-bold hover:bg-primary/90 transition-colors"
          >
            Tester gratuitement →
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold mb-4">Le problème actuel</h2>
              <ul className="space-y-3">
                {niche.painPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Ce que tu gagnes</h2>
              <ul className="space-y-3">
                {niche.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">
              Exemple de chapitres pour un {niche.niche.toLowerCase()}
            </h2>
            <pre className="rounded-xl bg-muted p-6 text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {niche.exampleChapters}
            </pre>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">
            Génère tes chapitres en 30 secondes
          </h2>
          <p className="mb-6 text-primary-foreground/80">
            3 vidéos gratuites. Aucune carte bancaire requise.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 font-bold hover:bg-white/90 transition-colors"
          >
            Commencer gratuitement →
          </Link>
        </div>
      </section>
    </>
  );
}
