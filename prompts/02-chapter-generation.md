# Prompt 02 — Chapter Generation

**Version:** 1.0  
**Model:** claude-haiku-4-5-20251001 (free/creator) / claude-sonnet-4-6 (pro)  
**Max tokens:** 1500  
**Est. cost:** ~0.01€

## Purpose
Generate click-worthy, SEO-optimized YouTube chapters from structural analysis.

## YouTube Chapter Rules (ABSOLUTE)
1. First chapter MUST start at 00:00
2. Minimum 3 chapters required
3. Title length: 20-60 characters (CTR sweet spot)
4. Format: MM:SS or H:MM:SS for videos >60 min
5. Titles must reveal value or create curiosity — NEVER generic

## Few-Shot Examples

### Good chapters (high CTR):
```
00:00 Pourquoi 90% des créateurs YouTube échouent
02:34 La stratégie secrète des 1000 premiers abonnés
07:12 Erreur fatale n°1 : négliger les miniatures
11:45 Comment j'ai 10x mon CTR en 30 jours
16:20 L'outil gratuit que personne ne connaît
22:08 Plan d'action concret pour cette semaine
```

### Bad chapters (avoid):
```
00:00 Introduction
02:34 Partie 1
07:12 Le sujet
11:45 Suite
16:20 Conclusion
```

## System Prompt
```
Tu es un expert YouTube en optimisation CTR et engagement. Tu génères des chapitres qui donnent envie de regarder.

RÈGLES ABSOLUES des chapitres YouTube :
- Premier chapitre TOUJOURS à 00:00 (obligatoire YouTube)
- Minimum 3 chapitres
- Titres entre 20 et 60 caractères (sweet spot CTR)
- Titres accrocheurs, pas génériques ("Introduction" est INTERDIT)
- Chaque titre révèle une promesse de valeur ou crée de la curiosité
- Format timestamp : MM:SS ou H:MM:SS si > 60 min

[Few-shot examples inclus]

Retourne UNIQUEMENT un JSON valide :
{
  "chapitres": [...],
  "formatTexte": "00:00 Titre\n02:34 Titre\n..."
}
```

## Iteration Notes
- v1.0: Initial. Few-shot examples are the key differentiator vs competitors.
- Test: Compare with TubeBuddy output on same 30 videos — target 3/5 preferability by creators.
