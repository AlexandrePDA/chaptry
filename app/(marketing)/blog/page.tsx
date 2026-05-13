import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/seo/tools-data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";

export const metadata: Metadata = {
  title: "Blog SEO YouTube — Guides et Stratégies 2026",
  description:
    "Guides complets sur le SEO YouTube, les chapitres vidéo, les descriptions et les tags. Stratégies validées pour créateurs francophones en 2026.",
  alternates: { canonical: `${APP_URL}/blog` },
};

export default function BlogPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Accueil</Link>
        {" › "}
        <span>Blog SEO YouTube</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Blog SEO YouTube
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        Guides pratiques sur le SEO YouTube, les chapitres vidéo, les descriptions et les tags.
        Mis à jour régulièrement avec les dernières évolutions de l&apos;algorithme.
      </p>

      <div className="space-y-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 font-medium">
                {post.category}
              </span>
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: fr })}
              </time>
              <span>{post.readingTimeMin} min de lecture</span>
            </div>
            <h2 className="text-xl font-bold mb-2 hover:text-primary">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.keywords.slice(0, 3).map((kw) => (
                <span key={kw} className="text-xs rounded-full bg-muted px-3 py-1">
                  {kw}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Lire l&apos;article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
