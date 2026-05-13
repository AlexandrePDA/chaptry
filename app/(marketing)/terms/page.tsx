import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — Chaptry",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Conditions générales d&apos;utilisation</h1>

      <div className="space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">1. Service</h2>
          <p>Chaptry est un outil de génération automatique de chapitres YouTube, descriptions SEO et tags à partir d&apos;une URL vidéo. Le service est fourni &quot;tel quel&quot;, sans garantie de résultats spécifiques.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">2. Utilisation</h2>
          <p>Vous vous engagez à utiliser Chaptry uniquement pour des vidéos publiques YouTube dont vous êtes l&apos;auteur ou pour lesquelles vous disposez des droits nécessaires. Tout usage abusif entraîne la résiliation du compte.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">3. Abonnement et facturation</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Les abonnements sont mensuels ou annuels, avec renouvellement automatique.</li>
            <li>L&apos;annulation prend effet à la fin de la période en cours.</li>
            <li>Aucun remboursement pour la période entamée, sauf obligation légale.</li>
            <li>Les prix sont en euros TTC.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">4. Quotas</h2>
          <p>Les quotas de génération sont réinitialisés le 1er de chaque mois. Les générations non utilisées ne sont pas reportées.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">5. Limitation de responsabilité</h2>
          <p>Chaptry ne peut être tenu responsable d&apos;une perte de revenus, de données ou de tout préjudice indirect lié à l&apos;utilisation du service.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">6. Contact</h2>
          <p><a href="mailto:contact@chaptry.com" className="text-primary">contact@chaptry.com</a></p>
        </section>

        <p className="text-xs">Dernière mise à jour : mai 2026</p>
      </div>
    </div>
  );
}
