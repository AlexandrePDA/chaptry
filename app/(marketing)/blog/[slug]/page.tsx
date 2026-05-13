import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/seo/tools-data";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `${APP_URL}/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${APP_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

// Placeholder content generator — in production, use MDX or a CMS
function getArticleContent(slug: string): string {
  const contentMap: Record<string, string> = {
    "comment-optimiser-description-youtube": `
La description YouTube est l'un des éléments SEO les plus sous-estimés par les créateurs. Pourtant, une description bien optimisée peut faire la différence entre une vidéo qui végète à 500 vues et une qui en accumule 50 000 grâce au trafic organique.

## Pourquoi la description YouTube est importante pour le SEO

YouTube est le deuxième moteur de recherche mondial. Comme Google, il indexe le texte pour comprendre le contenu de tes vidéos. La description est l'endroit où tu peux communiquer en détail sur le sujet de ta vidéo, intégrer tes mots-clés cibles et convaincre les spectateurs de cliquer.

Les 3 raisons pour lesquelles la description est cruciale :
1. **Indexation SEO** : YouTube et Google lisent le texte de ta description pour catégoriser ta vidéo
2. **CTR (taux de clic)** : Les 2-3 premières lignes sont visibles sans cliquer sur "Plus" — elles doivent accrocher
3. **Watch time** : Une description claire avec chapitres aide les spectateurs à trouver ce qu'ils cherchent

## La structure idéale d'une description YouTube

### 1. Le Hook (100 premiers caractères)
C'est la partie visible avant le clic sur "Plus". Elle doit inclure ton mot-clé principal et donner une raison immédiate de regarder.

**Mauvais exemple :**
> "Dans cette vidéo, je vais vous expliquer comment..."

**Bon exemple :**
> "Apprends à créer une API REST Node.js de 0 à production en 30 minutes. Je te montre exactement..."

### 2. Le résumé valeur (150-200 mots)
Liste les 3-5 choses concrètes que le spectateur va apprendre. Utilise des bullet points avec des emojis pour la lisibilité. Intègre tes mots-clés secondaires naturellement.

### 3. Les chapitres
Si tu as des chapitres (fortement recommandé), liste-les ici au format exact YouTube (MM:SS Titre).

### 4. Les liens et ressources
Mentionne les outils, ressources et liens que tu évoques dans la vidéo. C'est utile pour les spectateurs ET ça ajoute du contenu textuel pertinent.

### 5. Le CTA et abonnement
Court, naturel, pas agressif. "Abonne-toi pour les prochaines vidéos sur [ton sujet]" — simple et efficace.

### 6. Les hashtags (3-5 max)
Mets-les à la fin. YouTube en affiche 3 au-dessus du titre. Choisis des hashtags moyens, pas trop larges (pas #youtube) ni trop spécifiques.

## Les erreurs classiques à éviter

❌ **Keyword stuffing** : Répéter le même mot-clé 10 fois nuit à ton SEO. YouTube pénalise ce comportement.

❌ **Description trop courte** : Moins de 200 caractères = information insuffisante pour l'algorithme.

❌ **Copier-coller le titre** : Ta description doit compléter le titre, pas le répéter.

❌ **Oublier les links** : Les liens vers tes autres vidéos créent du maillage interne et retiennent les spectateurs sur ta chaîne.

## Combien de mots pour une description YouTube idéale ?

Entre **500 et 1000 mots** est le sweet spot :
- En dessous de 200 mots : insuffisant pour le SEO
- Entre 500 et 1000 mots : optimal (indexation maximale sans dilution)
- Au-delà de 1500 mots : possible mais rarement nécessaire

## Outil pour automatiser tout ça

Si tu publies régulièrement, rédiger une description optimisée à chaque vidéo prend 20-30 minutes. Chaptry génère une description complète (structure + SEO + chapitres + hashtags) en 30 secondes depuis l'URL de ta vidéo.
    `,
    "chapitres-youtube-impact-seo": `
Les chapitres YouTube ne sont pas juste une fonctionnalité de confort pour tes spectateurs. Ils ont un impact direct et mesurable sur ton SEO, ton watch time et tes vues.

## Comment les chapitres YouTube fonctionnent

Depuis 2020, YouTube affiche les chapitres de deux façons :
1. **Dans la barre de progression** de la vidéo (mini-titres au survol)
2. **Dans les résultats de recherche Google** — chaque chapitre peut apparaître comme un résultat individuel avec son timestamp

Ce deuxième point est le plus sous-estimé : **tes chapitres deviennent des portes d'entrée SEO supplémentaires**.

## L'impact sur le watch time

Des études de créateurs YouTube montrent que les vidéos avec chapitres bien structurés ont :
- **+15 à 25% de watch time** en moyenne
- **Moins de "drop off" précoce** : les spectateurs savent où aller et restent
- **Meilleur signal d'engagement** envoyé à l'algorithme

L'algorithme YouTube optimise pour la satisfaction spectateur. Un spectateur qui trouve rapidement ce qu'il cherche grâce aux chapitres = signal positif = plus de recommandations.

## Les chapitres dans les résultats Google

Depuis 2021, Google indexe les chapitres YouTube et les affiche dans les résultats de recherche. Si quelqu'un cherche "comment configurer Express.js" et que tu as un chapitre "Configuration Express.js en 5 min", **ton chapitre peut apparaître directement dans Google** avec un lien direct vers ce moment de la vidéo.

C'est un avantage concurrentiel énorme pour le trafic organique.

## Les règles des chapitres YouTube

Pour que YouTube affiche tes chapitres, tu dois respecter ces règles :
- **Premier chapitre à 00:00** (obligatoire)
- **Minimum 3 chapitres** (en dessous, YouTube ne les affiche pas)
- **Format correct** : MM:SS ou H:MM:SS suivi du titre
- **Dans la description** (pas en commentaire)

## Comment créer des chapitres accrocheurs

La différence entre un bon et un mauvais chapitre, c'est le titre.

**Chapitres génériques (mauvais pour le CTR) :**
- 00:00 Introduction
- 05:30 Partie 1
- 12:00 Conclusion

**Chapitres optimisés CTR (ce qu'il faut faire) :**
- 00:00 Pourquoi 90% des devs font cette erreur
- 05:30 La configuration qui change tout
- 12:00 Résultats + plan d'action pour cette semaine

La règle : chaque chapitre doit soit **révéler une promesse de valeur**, soit **créer de la curiosité**. Jamais de titres génériques.

## Automatiser la génération de chapitres

Pour un créateur publiant 2-4 vidéos par mois, créer des chapitres manuellement prend 15-30 minutes par vidéo. Chaptry analyse ton transcript et génère des chapitres optimisés CTR en 30 secondes.
    `,
  };

  return (
    contentMap[slug] ??
    `Cet article est en cours de rédaction. Reviens bientôt !

En attendant, découvre nos outils gratuits de génération de chapitres et descriptions YouTube.`
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = getArticleContent(slug);
  const breadcrumbs = [
    { name: "Accueil", url: APP_URL },
    { name: "Blog", url: `${APP_URL}/blog` },
    { name: post.title, url: `${APP_URL}/blog/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildArticleSchema({
              title: post.title,
              description: post.metaDescription,
              publishedAt: post.publishedAt,
              updatedAt: post.updatedAt,
              slug,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="container max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Accueil</Link>
          {" › "}
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          {" › "}
          <span>{post.title}</span>
        </div>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 font-medium">
                {post.category}
              </span>
              <time dateTime={post.publishedAt}>
                Publié le {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: fr })}
              </time>
              <span>·</span>
              <span>{post.readingTimeMin} min de lecture</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          </header>

          <div className="prose prose-slate max-w-none">
            {content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>;
              }
              if (line.startsWith("### ")) {
                return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.slice(4)}</h3>;
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return <p key={i} className="font-semibold my-2">{line.slice(2, -2)}</p>;
              }
              if (line.startsWith("- ") || line.startsWith("❌ ") || line.startsWith("✓ ")) {
                return <li key={i} className="ml-4 my-1 text-muted-foreground">{line.slice(2)}</li>;
              }
              if (line.startsWith("> ")) {
                return (
                  <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                    {line.slice(2)}
                  </blockquote>
                );
              }
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="my-3 text-foreground leading-relaxed">{line}</p>;
            })}
          </div>
        </article>

        {/* CTA in article */}
        <div className="mt-12 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">
            Automatise ton SEO YouTube en 30 secondes
          </h3>
          <p className="text-muted-foreground mb-4">
            Chaptry génère chapitres + description SEO + tags depuis l&apos;URL de ta vidéo.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
          >
            Essayer gratuitement →
          </Link>
        </div>

        {/* Related posts */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Articles similaires</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {BLOG_POSTS.filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="rounded-xl border p-5 hover:shadow-md transition-shadow"
                >
                  <div className="text-xs text-primary font-medium mb-2">{relPost.category}</div>
                  <h3 className="font-semibold mb-2 hover:text-primary">{relPost.title}</h3>
                  <p className="text-sm text-muted-foreground">{relPost.excerpt.slice(0, 100)}...</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
