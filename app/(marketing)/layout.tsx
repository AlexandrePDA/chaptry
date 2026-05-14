import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <header className="sticky top-0 z-50 px-4 pt-3">
        <div className="max-w-6xl mx-auto rounded-2xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
          <div className="flex h-14 items-center justify-between px-5">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <Logo className="w-8 h-[21px]" />
              <span>Chaptry</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm">
            </nav>
            <div className="flex items-center gap-2 md:gap-3">
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-3 md:px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <span className="hidden sm:inline">Mon dashboard →</span>
                  <span className="sm:hidden">Dashboard →</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-3 md:px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <span className="hidden sm:inline">Essai gratuit</span>
                    <span className="sm:hidden">S&apos;inscrire</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t bg-muted/20 py-16 mt-0">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Logo className="w-8 h-[21px]" />
              Chaptry
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L&apos;outil le plus rapide pour générer chapitres + descriptions SEO YouTube. Fait pour les créateurs francophones.
            </p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4">Comparatifs</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/tools/vs-tubebuddy" className="hover:text-foreground transition-colors">vs TubeBuddy</Link></li>
              <li><Link href="/tools/vs-vidiq" className="hover:text-foreground transition-colors">vs VidIQ</Link></li>
              <li><Link href="/tools/vs-youtube-auto-chapters" className="hover:text-foreground transition-colors">vs Chapitres Auto</Link></li>
              <li><Link href="/tools/alternative-tubebuddy" className="hover:text-foreground transition-colors">Alternative TubeBuddy</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4">Ressources</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog SEO YouTube</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Tarifs</Link></li>
              <li><Link href="/tools/youtube-chapters-for-podcasters" className="hover:text-foreground transition-colors">Pour Podcasteurs</Link></li>
              <li><Link href="/tools/youtube-seo-for-educators" className="hover:text-foreground transition-colors">Pour Éducateurs</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4">Produit</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Connexion</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">S&apos;inscrire</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">CGU</Link></li>
            </ul>
          </div>
        </div>
        <div className="container max-w-6xl mx-auto px-4 mt-10 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Chaptry. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">CGU</Link>
            <Link href="/legal" className="hover:text-foreground transition-colors">Mentions légales</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
