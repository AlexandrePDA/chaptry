import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCustomerPortalSession } from "@/lib/stripe/client";

export async function POST() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL!));
  }

  const { data: profile } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customerId = (profile as any)?.stripe_customer_id;
  if (!customerId) {
    return NextResponse.redirect(new URL("/settings?error=no_subscription", process.env.NEXT_PUBLIC_APP_URL!));
  }

  const portalUrl = await createCustomerPortalSession(customerId);
  return NextResponse.redirect(portalUrl);
}
