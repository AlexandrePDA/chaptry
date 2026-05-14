import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) return NextResponse.json({ ok: false });

  // Guard: account must be < 2 min old
  const ageMs = Date.now() - new Date(user.created_at).getTime();
  if (ageMs > 2 * 60 * 1000) return NextResponse.json({ ok: false });

  await sendWelcomeEmail(user.email);
  return NextResponse.json({ ok: true });
}
