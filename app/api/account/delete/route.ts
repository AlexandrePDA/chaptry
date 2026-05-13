import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const admin = await createAdminClient();

  // Delete user data (generations cascade via FK)
  await admin.from("users").delete().eq("id", user.id);

  // Delete auth user
  await admin.auth.admin.deleteUser(user.id);

  return NextResponse.redirect(
    new URL("/?deleted=true", process.env.NEXT_PUBLIC_APP_URL!)
  );
}
