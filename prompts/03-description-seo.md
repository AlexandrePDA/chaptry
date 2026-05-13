# Prompt 03 — SEO Description Generation

**Version:** 1.0  
**Model:** claude-haiku-4-5-20251001 (free/creator) / claude-sonnet-4-6 (pro)  
**Max tokens:** 2000  
**Est. cost:** ~0.02€

## Purpose
Generate a complete SEO-optimized YouTube description with proper structure.

## Description Structure (ENFORCED)
1. HOOK (2-3 lines): Main keyword in first 100 chars. Direct language ("tu/toi").
2. VALUE SUMMARY (3-5 lines): Concrete learning points. Secondary keywords.
3. CHAPTERS: Copy chapters verbatim from step 2 output.
4. ABOUT THIS VIDEO (2-3 lines): Context, why watch now.
5. USEFUL LINKS: Resources mentioned in video.
6. SUBSCRIPTION CTA (1-2 lines): Natural, not aggressive.
7. HASHTAGS: 3-5 relevant hashtags.

## SEO Constraints
- Main keyword in first 100 characters
- Target length: 500-1000 words
- Semantic variants of keywords throughout
- No keyword stuffing (penalized by YouTube)

## Example Output Structure
```
[Mot-clé principal] en 2026 : voici exactement comment [promesse principale]. 
Dans cette vidéo, tu vas apprendre [bénéfice concret 1] et [bénéfice concret 2].

🎯 CE QUE TU VAS APPRENDRE :
• [Point clé 1 avec mot-clé]
• [Point clé 2]
• [Point clé 3]
• [Point clé 4]

⏱️ CHAPITRES :
[Chapitres copiés tels quels]

📌 À PROPOS DE CETTE VIDÉO :
[Contexte + why now]

🔗 RESSOURCES MENTIONNÉES :
📚 [Ressource 1] : [description]
🛠️ [Ressource 2] : [description]

👉 Abonne-toi pour [promesse future liée au sujet].

#hashtag1 #hashtag2 #hashtag3
```

## Iteration Notes
- v1.0: Initial structure. Key insight: emoji sections improve readability scan and CTR.
- The CTA should match creator's niche style — future iteration: customize per genre.
