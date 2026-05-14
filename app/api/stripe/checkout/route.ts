import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession } from "@/lib/stripe/client";

const schema = z.object({
  plan: z.enum(["creator", "pro"]),
  billing: z.enum(["monthly", "yearly"]),
});

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
  }

  const checkoutUrl = await createCheckoutSession(
    user.id,
    user.email!,
    body.plan,
    body.billing
  );

  return NextResponse.json({ url: checkoutUrl });
}
