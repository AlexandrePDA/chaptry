import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import CopyButton from "@/components/ui/copy-button";

type Props = { params: Promise<{ id: string }> };

interface Chapter {
  timestamp: string;
  titre: string;
  description?: string;
}

export default async function GenerationDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: gen } = await supabase
    .from("generations")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .eq("is_deleted", false)
    .single();

  if (!gen) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = gen as any;
  const chapters: Chapter[] = g.chapters ?? [];
  const chaptersText = chapters.map((c: Chapter) => `${c.timestamp} ${c.titre}`).join("\n");
  const tags: string[] = g.tags ?? [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/history" className="text-sm text-muted-foreground hover:text-foreground">
          ← Historique
        </Link>
      </div>

      <div className="flex items-start gap-4 mb-8">
        {g.video_id && (
          <img
            src={`https://i.ytimg.com/vi/${g.video_id}/mqdefault.jpg`}
            alt=""
            className="w-32 h-20 object-cover rounded-lg shrink-0"
          />
        )}
        <div>
          <h1 className="text-xl font-bold">{g.video_title ?? "Sans titre"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {g.channel_name} · {new Date(g.created_at).toLocaleDateString("fr-FR", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Chapitres */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Chapitres</h2>
            <CopyButton text={chaptersText} />
          </div>
          {chapters.length > 0 ? (
            <pre className="text-sm font-mono whitespace-pre-wrap text-foreground leading-relaxed">
              {chaptersText}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun chapitre.</p>
          )}
        </div>

        {/* Description */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Description SEO</h2>
            <CopyButton text={g.description ?? ""} />
          </div>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{g.description ?? "—"}</p>
        </div>

        {/* Tags */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Tags</h2>
            <CopyButton text={tags.join(", ")} />
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
