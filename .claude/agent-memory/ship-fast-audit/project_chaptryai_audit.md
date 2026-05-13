---
name: project-chaptryai-audit
description: Audit snapshot of ChapitreAI (Chaptry) project state as of 2026-05-13 — what is built, what is missing, key risks for launch
metadata:
  type: project
---

Project name in code: Chaptry (chaptry.ai). CLAUDE.md still calls it ChapitreAI — brand is Chaptry.

**Status as of 2026-05-13: ~85% built, launch-ready within 1-3 days of focused work.**

## What is fully built
- LLM pipeline (4-step, steps 2+4 parallel): lib/llm/pipeline.ts
- Auth: email+password + Google OAuth, password reset, email verification flow
- App layout with auth guard: app/(app)/layout.tsx redirects to /login
- Dashboard: usage stats, recent generations, upgrade CTA
- Generator page: full UI with loading steps, all error states (quota/language/network/server), results tabs
- History list + detail page with copy buttons
- Settings page: plan display, Stripe portal link, RGPD export/delete
- Stripe: checkout (creator plan only, monthly+yearly), webhook (checkout.completed, subscription.updated, subscription.deleted), customer portal
- DB schema: users, generations, usage_events with RLS on all tables, auto-create profile trigger
- SEO: 25 slugs (6 tool pages, 4 comparison, 6 niche, 5 blog), sitemap.ts, robots.ts, Schema.org (FAQ, SoftwareApp, Article, Tool, Breadcrumb)
- Landing page: hero, problem section, comparison table, pricing (Free+Creator), FAQ with structured data
- Pricing page: monthly/yearly toggle, checkout button
- Demo API: /api/demo with in-memory rate limiting
- All env vars configured in .env.local (Supabase, Stripe, Anthropic, OpenAI, Resend)
- TypeScript: zero errors (tsc --noEmit passes clean)

## Key issues found
1. **CRITICAL**: Model naming inconsistency — pipeline.ts uses "claude-sonnet-4-6" for creator plan but CLAUDE.md says Creator uses Haiku and Pro uses Sonnet. The DB schema has plan CHECK constraint for ('free','creator','pro','agency') but PLANS object in stripe/client.ts only defines 'free' and 'creator'. If a user somehow gets plan='pro' from DB, PLANS['pro'] returns undefined → runtime crash in /api/generate. 
2. **PARTIAL**: No "pro" plan in PLANS object despite DB allowing it and .env.example listing STRIPE_PRICE_PRO_MONTHLY/YEARLY price IDs.
3. **PARTIAL**: fetchVideoMetadata returns durationSeconds: 0 always (oEmbed doesn't provide duration). Pipeline receives 0 and passes it to the model. Not blocking but affects chapter quality.
4. **PARTIAL**: Whisper fallback mentioned in landing FAQ ("on bascule sur Whisper automatiquement") but fetchTranscript throws if no YouTube transcript — no Whisper fallback implemented. Landing copy is misleading.
5. **PARTIAL**: /api/stripe/portal is called via HTML form POST (method="POST") from settings page but the route expects a proper API call — may not work correctly from a plain HTML form without CSRF handling.
6. **MINOR**: In-memory rate limit on /api/demo resets on Vercel cold start. Documented as known issue.
7. **MINOR**: RESEND_API_KEY is set but Resend is never used anywhere in the codebase — no welcome email, no usage alerts.
8. **MINOR**: Landing pricing says "Creator — 12€/mois" but pricing page and PLANS object both say 14€/mois. Inconsistency.
9. **MINOR**: Landing error message says "100 vidéos/mois" for Creator at 14€ but CLAUDE.md says 30/month for creator. PLANS object says 100. PLANS is authoritative.

**Why:** These issues were found during 2026-05-13 launch-readiness audit.
**How to apply:** Prioritize fixing the pro-plan crash risk and the Whisper FAQ lie before launch.
