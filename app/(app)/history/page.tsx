import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PLANS, type PlanKey } from "@/lib/stripe/client";
import type { Database } from "@/types/supabase";

type GenerationRow = Database["public"]["Tables"]["generations"]["Row"];
type UserRow = Database["public"]["Tables"]["users"]["Row"];

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileData } = await supabase
    .from("users")
    .select("plan")
    .eq("id", user!.id)
    .single();

  const profile = profileData as Pick<UserRow, "plan"> | null;
  const plan = (profile?.plan ?? "free") as PlanKey;
  const planConfig = PLANS[plan];
  const historyDays = planConfig.historyDays;

  // Free plan: no history access
  if (historyDays === 0) {
    return (
      <div className="px-4 py-6 md:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Historique</h1>
        </div>
        <div className="rounded-xl border bg-card p-12 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <p className="font-semibold mb-2">Historique non disponible sur le plan Free</p>
          <p className="text-muted-foreground text-sm mb-6">
            Passe au Creator pour accéder à ton historique des 30 derniers jours.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Voir les offres →
          </Link>
        </div>
      </div>
    );
  }

  // Build query with optional date filter
  let query = supabase
    .from("generations")
    .select("id, video_title, channel_name, created_at, video_id, tags")
    .eq("user_id", user!.id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(100);

  if (historyDays > 0) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - historyDays);
    query = query.gte("created_at", cutoff.toISOString());
  }

  const { data: generationsData } = await query;
  const generations = (generationsData ?? []) as Pick<GenerationRow, "id" | "video_title" | "channel_name" | "created_at" | "video_id" | "tags">[];

  return (
    <div className="px-4 py-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Historique</h1>
        <p className="text-muted-foreground text-sm">
          {generations.length} génération{generations.length !== 1 ? "s" : ""}
          {historyDays > 0 && ` · 30 derniers jours`}
          {historyDays === -1 && ` · illimité`}
        </p>
      </div>

      {plan === "creator" && (
        <div className="mb-4 rounded-lg bg-muted/40 border px-4 py-3 text-sm text-muted-foreground flex items-center justify-between gap-4">
          <span>Historique limité aux 30 derniers jours sur le plan Creator.</span>
          <Link href="/pricing" className="text-primary font-medium hover:underline shrink-0">
            Passer au Pro →
          </Link>
        </div>
      )}

      {generations.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <div className="text-4xl mb-4">🎬</div>
          <p className="text-muted-foreground mb-4">Aucune génération pour l&apos;instant.</p>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Générer ta première vidéo →
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          {generations.map((gen, i) => (
            <div
              key={gen.id}
              className={`flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors ${i > 0 ? "border-t" : ""}`}
            >
              <img
                src={`https://i.ytimg.com/vi/${gen.video_id}/default.jpg`}
                alt=""
                className="w-20 h-14 object-cover rounded shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {gen.video_title ?? "Sans titre"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {gen.channel_name} · {new Date(gen.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {gen.tags && (
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {(gen.tags as string[]).slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href={`/history/${gen.id}`}
                className="text-xs font-medium text-primary hover:underline shrink-0"
              >
                Voir →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
