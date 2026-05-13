import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const [{ data: profile }, { data: generations }] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase.from("generations").select("*").eq("user_id", user.id).eq("is_deleted", false),
  ]);

  const exportData = {
    exportedAt: new Date().toISOString(),
    account: { email: user.email, createdAt: user.created_at, ...(profile ?? {}) },
    generations: generations ?? [],
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="chaptry-export-${Date.now()}.json"`,
    },
  });
}
