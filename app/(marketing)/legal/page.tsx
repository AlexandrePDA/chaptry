import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Chaptry",
  robots: { index: false },
};

export default function LegalPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-16 prose prose-sm">
      <h1 className="text-2xl font-bold mb-8">Mentions légales</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Éditeur</h2>
        <p className="text-muted-foreground text-sm">
          Chaptry est édité par Alexandre Pires, auto-entrepreneur.<br />
          Email : <a href="mailto:dev.dakaprod@gmail.com" className="text-primary">dev.dakaprod@gmail.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Hébergement</h2>
        <p className="text-muted-foreground text-sm">
          Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA<br />
          Base de données : Supabase (EU — Frankfurt)
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Propriété intellectuelle</h2>
        <p className="text-muted-foreground text-sm">
          L&apos;ensemble du contenu de ce site (textes, visuels, code) est la propriété exclusive de Chaptry.
          Toute reproduction sans autorisation est interdite.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Contact</h2>
        <p className="text-muted-foreground text-sm">
          Pour toute question : <a href="mailto:dev.dakaprod@gmail.com" className="text-primary">dev.dakaprod@gmail.com</a>
        </p>
      </section>
    </div>
  );
}
