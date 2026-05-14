import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL ?? "Chaptry <noreply@chaptry.com>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
        <tr>
          <td style="background:#dc2626;padding:24px 32px;">
            <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Chaptry</span>
          </td>
        </tr>
        <tr><td style="padding:32px;">${content}</td></tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #f3f4f6;background:#f9fafb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
              © 2026 Chaptry · <a href="${APP_URL}" style="color:#9ca3af;">chaptry.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(href: string, text: string): string {
  return `<a href="${href}" style="display:inline-block;background:#dc2626;color:#ffffff;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:8px;">${text}</a>`;
}

function h1(text: string): string {
  return `<h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">${text}</h1>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">${text}</p>`;
}

// ── 1. Welcome ────────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(email: string) {
  const html = baseLayout(`
    ${h1("Bienvenue sur Chaptry 🎬")}
    ${p("Tu viens de créer ton compte. Tu as <strong>3 générations gratuites</strong> ce mois pour tester.")}
    ${p("Colle une URL YouTube et génère tes chapitres + description SEO + tags en 30 secondes, sans connecter ta chaîne.")}
    ${btn(`${APP_URL}/generate`, "Faire ma première génération →")}
    <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Des questions ? Réponds à cet email, je lis tout.</p>
  `);

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Bienvenue sur Chaptry — ta première génération t'attend",
    html,
  });
}

// ── 2. Upgrade ────────────────────────────────────────────────────────────────

export async function sendUpgradeEmail(email: string, plan: string) {
  const planLabel = plan === "pro" ? "Pro" : "Creator";
  const genCount = plan === "pro" ? "150" : "30";

  const html = baseLayout(`
    ${h1(`Ton plan ${planLabel} est actif ✓`)}
    ${p(`Merci pour ta confiance. Tu as maintenant accès à <strong>${genCount} générations/mois</strong>${plan === "pro" ? ", au modèle IA supérieur (Claude Sonnet), et aux langues FR · EN · DE · ES" : " en français et en anglais"}.`)}
    ${p("Tu peux gérer ou annuler ton abonnement à tout moment depuis tes paramètres.")}
    ${btn(`${APP_URL}/generate`, "Générer maintenant →")}
  `);

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Ton plan Chaptry ${planLabel} est actif`,
    html,
  });
}

// ── 3. Quota atteint ──────────────────────────────────────────────────────────

export async function sendQuotaEmail(email: string, plan: string, limit: number) {
  const isUpgradable = plan === "free" || plan === "creator";
  const nextPlan = plan === "free" ? "Creator (30/mois)" : "Pro (150/mois)";

  const html = baseLayout(`
    ${h1("Tu as utilisé toutes tes générations ce mois")}
    ${p(`Tu as atteint ta limite de <strong>${limit} génération${limit > 1 ? "s" : ""}/mois</strong> sur le plan ${plan === "free" ? "Free" : plan === "creator" ? "Creator" : "Pro"}.`)}
    ${isUpgradable
      ? p(`Passe au plan <strong>${nextPlan}</strong> pour continuer à générer maintenant.`)
      : p("Tes générations se réinitialisent le 1er du mois prochain.")
    }
    ${isUpgradable ? btn(`${APP_URL}/pricing`, "Voir les offres →") : btn(`${APP_URL}/dashboard`, "Voir mon dashboard →")}
  `);

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Chaptry — tu as atteint ta limite mensuelle",
    html,
  });
}

// ── 4. Annulation ─────────────────────────────────────────────────────────────

export async function sendCancellationEmail(email: string) {
  const html = baseLayout(`
    ${h1("Ton abonnement a été annulé")}
    ${p("Tu garderas l'accès à ton plan jusqu'à la fin de ta période de facturation. Après, ton compte passe automatiquement sur le plan Free (3 générations/mois).")}
    ${p("Si c'était une erreur ou si tu veux revenir, tu peux te réabonner à tout moment.")}
    ${btn(`${APP_URL}/pricing`, "Se réabonner →")}
    <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Tu as une remarque sur pourquoi tu pars ? Réponds à cet email, ça m'aide vraiment.</p>
  `);

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Ton abonnement Chaptry a été annulé",
    html,
  });
}
