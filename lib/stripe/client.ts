import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PLANS = {
  free: {
    name: "Free",
    generationsPerMonth: 3,
    historyDays: 0,
    watermark: true,
    languages: ["fr"] as string[],
    priceMonthly: 0,
    priceYearly: 0,
  },
  creator: {
    name: "Creator",
    generationsPerMonth: 100,
    historyDays: -1, // illimité
    watermark: false,
    languages: ["fr", "en"] as string[],
    priceMonthly: 1400, // centimes
    priceYearly: 12000, // 10€/mois
    stripePriceMonthly: process.env.STRIPE_PRICE_CREATOR_MONTHLY!,
    stripePriceYearly: process.env.STRIPE_PRICE_CREATOR_YEARLY!,
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export async function createCheckoutSession(
  userId: string,
  email: string,
  plan: "creator",
  billing: "monthly" | "yearly"
): Promise<string> {
  const planConfig = PLANS[plan];
  const priceId =
    billing === "monthly"
      ? planConfig.stripePriceMonthly
      : planConfig.stripePriceYearly;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
    metadata: { userId, plan, billing },
    subscription_data: {
      metadata: { userId, plan },
    },
    allow_promotion_codes: true,
  });

  return session.url!;
}

export async function createCustomerPortalSession(
  stripeCustomerId: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
  });
  return session.url;
}
