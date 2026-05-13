import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PLANS, type PlanKey } from "@/lib/stripe/client";
import { DeleteAccountButton } from "@/components/app/delete-account-button";
import type { Database } from "@/types/supabase";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileData } = await supabase
    .from("users")
    .select("plan, stripe_customer_id, generations_used_this_month")
    .eq("id", user!.id)
    .single();

  const profile = profileData as Pick<UserRow, "plan" | "stripe_customer_id" | "generations_used_this_month"> | null;
  const plan = (profile?.plan ?? "free") as PlanKey;
  const planConfig = PLANS[plan];

  return (
    <div className="px-4 py-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Paramètres</h1>
        <p className="text-muted-foreground text-sm">{user?.email}</p>
      </div>

      <div className="space-y-6">
        {/* Plan */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold mb-4">Abonnement</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium capitalize">{plan}</p>
              <p className="text-sm text-muted-foreground">
                {planConfig.generationsPerMonth} générations/mois ·{" "}
                {plan === "free"
                  ? "Gratuit"
                  : `${planConfig.priceMonthly / 100}€/mois`}
              </p>
            </div>
            {plan === "free" ? (
              <Link
                href="/pricing"
                className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Upgrader
              </Link>
            ) : (
              <form action="/api/stripe/portal" method="POST">
                <button
                  type="submit"
                  className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Gérer l&apos;abonnement
                </button>
              </form>
            )}
          </div>
          {plan !== "free" && (
            <p className="text-xs text-muted-foreground">
              Pour annuler, accède au portail de facturation ci-dessus. Tu gardes l&apos;accès jusqu&apos;à la fin de ta période.
            </p>
          )}
        </section>

        {/* Account */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold mb-4">Compte</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Membre depuis</span>
              <span>
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Générations ce mois</span>
              <span>
                {profile?.generations_used_this_month ?? 0} / {planConfig.generationsPerMonth}
              </span>
            </div>
          </div>
        </section>

        {/* RGPD */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold mb-4">Données personnelles (RGPD)</h2>
          <div className="space-y-3">
            <form action="/api/account/export" method="POST">
              <button
                type="submit"
                className="w-full text-left rounded-lg border px-4 py-3 text-sm hover:bg-muted transition-colors"
              >
                📥 Exporter mes données
              </button>
            </form>
            <DeleteAccountButton />
          </div>
        </section>

        {/* Sign out */}
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full rounded-xl border py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );
}
