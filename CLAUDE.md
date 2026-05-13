# ChapitreAI — YouTube SEO Generator

Micro-SaaS qui génère chapitres YouTube optimisés CTR + description SEO + tags depuis une URL YouTube.

## Stack
- **Framework**: Next.js 14 (App Router)
- **DB**: Supabase (Postgres + Auth + RLS)
- **Paiements**: Stripe Checkout + Customer Portal
- **LLM**: Claude Haiku (free/creator) + Claude Sonnet (pro)
- **Email**: Resend
- **Hébergement**: Vercel

## Architecture
```
app/(marketing)/      → Landing + Blog + Outils SEO programmatiques
app/(app)/            → Dashboard + Générateur + Historique (zone auth)
app/api/              → Endpoints REST
lib/llm/              → Pipeline LLM 4 étapes
lib/youtube/          → Transcript fetching + metadata
lib/seo/              → Data layer pages programmatiques + Schema.org
prompts/              → Prompts versionnés (itérer ici, pas dans le code)
supabase/migrations/  → SQL schema
types/supabase.ts     → Types générés Supabase
```

## Pipeline LLM (cœur produit)
1. `lib/llm/pipeline.ts` — orchestration des 4 étapes
2. Étapes 2 et 4 tournent en parallèle pour vitesse
3. Coût cible: 0.03-0.06€ par génération
4. Prompts versionnés dans `/prompts/*.md` — itérer sans toucher au code

## SEO programmatique
- `lib/seo/tools-data.ts` — toutes les données des ~30 pages initiales
- Ajouter de nouvelles pages ici UNIQUEMENT, les routes se génèrent automatiquement
- `app/sitemap.ts` — sitemap dynamique auto-généré
- `lib/seo/schema.ts` — Schema.org pour chaque type de page

## Quotas plans
| Plan | Générations/mois | LLM |
|------|-----------------|-----|
| free | 3 | Haiku |
| creator | 30 | Haiku |
| pro | 150 | Sonnet |

## Variables d'environnement requises
Voir `.env.example` pour la liste complète.

## Commandes utiles
```bash
npm run dev        # Dev local
npm run build      # Build production
npm run typecheck  # Vérification TypeScript
```

## Ordre de dev recommandé (business plan section 12)
1. Pipeline LLM + test sur 30 vidéos
2. Backend API (generate, transcript, stripe)
3. App frontend (dashboard, generate, history)
4. Marketing site + SEO de base
5. Polish + Product Hunt

## Critères de qualité avant launch
- Génération < 30 sec sur 95% des vidéos
- Qualité supérieure à TubeBuddy/VidIQ sur 30 vidéos test
- Stripe webhooks idempotents testés
- Lighthouse > 90 sur landing
- RGPD : suppression et export fonctionnels

## Règles de pricing
- Free: watermark dans description
- Creator: 12€/mois, 10€/an (-20%)
- Pro: 29€/mois, 24€/an (-20%), trial 7j avec CB

## Points de vigilance
- Rate limiting sur `/api/demo` (anti-abus, stocké en mémoire → Redis en prod)
- Webhooks Stripe doivent être idempotents (vérifier `event.id`)
- Transcripts stockés en DB pour permettre régénération sans re-fetch
- RLS Supabase activé sur toutes les tables

Style
Préférer ship en 1 semaine + mesurer à build pendant 1 mois. Tant que MRR < $10k, vitesse > élégance technique. Pense business avant code. Dans chaque texte, intègre SEO.