# Prompt 04 — Tag Generation

**Version:** 1.0  
**Model:** claude-haiku-4-5-20251001  
**Max tokens:** 800  
**Est. cost:** ~0.005€  
**Runs in parallel with:** Step 2 (chapter generation)

## Purpose
Generate an optimized set of 12-15 YouTube tags for maximum discoverability.

## Tag Strategy
- **Long-tail (3-4 words)**: Specific, low competition, high intent — 4-5 tags
- **Medium (2-3 words)**: Moderate competition — 5-6 tags  
- **Broad (1-2 words)**: High volume, used for categorization — 3-4 tags

## Tag Rules
- Total characters: max 500 (YouTube limit)
- Include: singular/plural variants, with/without accents
- Include: FR and EN variants when relevant for reach
- Avoid standalone ultra-generic tags (youtube, vidéo, video)
- Order from most specific to most broad in final list

## Example Output
```json
{
  "tags": {
    "longueTraine": [
      "créer api rest nodejs express",
      "tutoriel api rest typescript 2026",
      "nodejs express authentification jwt"
    ],
    "moyens": [
      "api rest javascript",
      "nodejs express tutoriel",
      "backend nodejs français",
      "express.js 2026"
    ],
    "larges": [
      "nodejs",
      "javascript backend",
      "web development"
    ]
  },
  "tagsOrdonnes": ["créer api rest nodejs express", ...],
  "totalCaracteres": 387
}
```

## Iteration Notes
- v1.0: Initial. Running in parallel with step 2 saves ~0.5-1s on total pipeline time.
- Watch for tags exceeding 500 char total — add validation in pipeline.ts.
