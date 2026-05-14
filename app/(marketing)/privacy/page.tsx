import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Chaptry",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Politique de confidentialité</h1>

      <div className="space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Données collectées</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Email et mot de passe (authentification)</li>
            <li>Transcripts textuels des vidéos YouTube traitées</li>
            <li>Résultats générés (chapitres, descriptions, tags)</li>
            <li>Données de facturation (gérées par Stripe — nous ne stockons pas de données bancaires)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Utilisation</h2>
          <p>Vos données sont utilisées uniquement pour fournir le service Chaptry. Nous ne revendons aucune donnée à des tiers.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Hébergement</h2>
          <p>Données hébergées dans l&apos;Union Européenne (Frankfurt) via Supabase. Conformité RGPD assurée.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Vos droits (RGPD)</h2>
          <p>Vous pouvez à tout moment exporter ou supprimer vos données depuis <strong>Paramètres → Données personnelles</strong>, ou en contactant <a href="mailto:dev.dakaprod@gmail.com" className="text-primary">dev.dakaprod@gmail.com</a>.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Cookies</h2>
          <p>Nous utilisons uniquement les cookies nécessaires à l&apos;authentification (session Supabase). Aucun cookie publicitaire.</p>
        </section>

        <p className="text-xs">Dernière mise à jour : mai 2026</p>
      </div>
    </div>
  );
}
