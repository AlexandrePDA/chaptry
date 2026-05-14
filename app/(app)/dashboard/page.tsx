import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PLANS, type PlanKey } from "@/lib/stripe/client";
import type { Database } from "@/types/supabase";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type GenerationRow = Database["public"]["Tables"]["generations"]["Row"];

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileData } = await supabase
    .from("users")
    .select("plan, generations_used_this_month")
    .eq("id", user!.id)
    .single();

  const profile = profileData as Pick<UserRow, "plan" | "generations_used_this_month"> | null;
  const plan = (profile?.plan ?? "free") as PlanKey;
  const planConfig = PLANS[plan];
  const used = profile?.generations_used_this_month ?? 0;
  const limit = planConfig.generationsPerMonth;
  const remaining = Math.max(0, limit - used);
  const pct = Math.min(100, Math.round((used / limit) * 100));

  const { data: generationsData } = await supabase
    .from("generations")
    .select("id, video_title, channel_name, created_at, video_id")
    .eq("user_id", user!.id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(5);

  const recentGenerations = (generationsData ?? []) as Pick<GenerationRow, "id" | "video_title" | "channel_name" | "created_at" | "video_id">[];

  return (
    <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm">
          Bienvenue, {user?.email}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Usage */}
        <div className="rounded-xl border bg-card p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Utilisations ce mois
          </div>
          <div className="text-3xl font-bold mb-1">
            {used}
            <span className="text-base font-normal text-muted-foreground">
              {" "}/ {limit}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {remaining} génération{remaining !== 1 ? "s" : ""} restante
            {remaining !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Plan */}
        <div className="rounded-xl border bg-card p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Ton plan
          </div>
          <div className="text-3xl font-bold mb-1 capitalize">{plan}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {planConfig.generationsPerMonth} vidéos/mois
          </p>
          {plan === "free" && (
            <Link
              href="/pricing"
              className="inline-block mt-3 text-xs font-semibold text-primary hover:underline"
            >
              Passer au Creator →
            </Link>
          )}
        </div>

        {/* Quick action */}
        <div className="rounded-xl border bg-primary text-primary-foreground p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-3">
              Prêt à gagner 30 min ?
            </div>
            <div className="text-lg font-bold mb-1">Nouvelle génération</div>
            <p className="text-xs opacity-80">URL YouTube → chapitres + description + tags</p>
          </div>
          <Link
            href="/generate"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-white text-primary px-4 py-2 text-sm font-bold hover:bg-white/90 transition-colors"
          >
            Générer maintenant →
          </Link>
        </div>
      </div>

      {/* Recent generations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Générations récentes</h2>
          <Link href="/history" className="text-sm text-primary hover:underline">
            Voir tout →
          </Link>
        </div>

        {!recentGenerations || recentGenerations.length === 0 ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <div className="text-4xl mb-4">🎬</div>
            <p className="text-muted-foreground mb-4">
              Aucune génération pour l&apos;instant.
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Générer ta première vidéo →
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border bg-card overflow-hidden">
              {recentGenerations.map((gen, i) => (
              <div
                key={gen.id}
                className={`flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors ${i > 0 ? "border-t" : ""}`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${gen.video_id}/default.jpg`}
                  alt=""
                  className="w-16 h-12 object-cover rounded shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {gen.video_title ?? "Sans titre"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {gen.channel_name} ·{" "}
                    {new Date(gen.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <Link
                  href={`/history/${gen.id}`}
                  className="text-xs text-primary hover:underline shrink-0"
                >
                  Voir →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade banner for free users */}
      {plan === "free" && remaining <= 1 && (
        <div className="mt-8 rounded-xl bg-primary/5 border border-primary/20 p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold">
              {remaining === 0
                ? "Tu as atteint ta limite mensuelle."
                : "Il te reste 1 génération ce mois."}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Passe au Creator (30 vidéos/mois à 14€) ou au Pro (150 vidéos/mois à 29€).
            </p>
          </div>
          <Link
            href="/pricing"
            className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0 ml-4"
          >
            Upgrader →
          </Link>
        </div>
      )}
    </div>
  );
}
