export interface ToolPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  toolType: "chapter" | "description" | "tags" | "general";
  language: "fr" | "en";
  keywords: string[];
  faqItems: Array<{ question: string; answer: string }>;
  relatedTools: string[];
  canonicalUrl?: string;
}

export interface ComparisonPage {
  slug: string;
  competitor: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  comparisonPoints: Array<{
    feature: string;
    us: string;
    them: string;
    winner: "us" | "them" | "tie";
  }>;
  verdict: string;
}

export interface NichePage {
  slug: string;
  niche: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  painPoints: string[];
  benefits: string[];
  exampleChapters: string;
  keywords: string[];
}

// ─── TOOL PAGES ─────────────────────────────────────────────────────────────

export const TOOL_PAGES: ToolPage[] = [
  {
    slug: "generateur-chapitres-youtube",
    title: "Générateur de Chapitres YouTube",
    metaTitle: "Générateur de Chapitres YouTube Gratuit | ChapitreAI",
    metaDescription:
      "Génère automatiquement des chapitres YouTube optimisés CTR depuis n'importe quelle URL. Timestampés, accrocheurs, SEO-friendly. Résultat en 30 secondes.",
    h1: "Générateur de Chapitres YouTube Gratuit",
    intro:
      "Crée des chapitres YouTube professionnels et optimisés CTR depuis une simple URL. Notre IA analyse le transcript de ta vidéo et génère des chapitres timestampés accrocheurs en 30 secondes — sans connecter ta chaîne.",
    toolType: "chapter",
    language: "fr",
    keywords: [
      "générateur chapitres youtube",
      "créer chapitres youtube automatiquement",
      "chapitres youtube gratuit",
      "timestamp youtube automatique",
      "outil chapitres youtube",
      "chapitres youtube seo",
    ],
    faqItems: [
      {
        question: "Comment générer des chapitres YouTube automatiquement ?",
        answer:
          "Colle l'URL de ta vidéo YouTube dans l'outil, clique sur Générer, et notre IA analyse le transcript pour créer des chapitres timestampés optimisés en 30 secondes.",
      },
      {
        question: "Les chapitres générés sont-ils conformes aux règles YouTube ?",
        answer:
          "Oui. Notre outil respecte toutes les contraintes YouTube : premier chapitre à 00:00, minimum 3 chapitres, format MM:SS correct.",
      },
      {
        question: "Puis-je modifier les chapitres générés ?",
        answer:
          "Absolument. Tous les chapitres sont éditables directement dans l'interface avant de les copier.",
      },
      {
        question: "Faut-il connecter ma chaîne YouTube ?",
        answer:
          "Non. Tu colles juste l'URL de la vidéo. Pas de connexion OAuth, pas de permissions sur ta chaîne.",
      },
    ],
    relatedTools: [
      "generateur-description-youtube",
      "generateur-tags-youtube",
      "youtube-chapter-generator",
    ],
  },
  {
    slug: "generateur-description-youtube",
    title: "Générateur de Description YouTube SEO",
    metaTitle: "Générateur de Description YouTube SEO Gratuit | ChapitreAI",
    metaDescription:
      "Génère une description YouTube SEO complète (hook + résumé + chapitres + CTA + hashtags) depuis l'URL de ta vidéo. Optimisée pour le référencement YouTube.",
    h1: "Générateur de Description YouTube SEO",
    intro:
      "Arrête de passer 20 minutes sur chaque description. Notre IA génère une description YouTube SEO complète — hook, résumé valeur, chapitres, CTA, hashtags — depuis l'URL de ta vidéo en 30 secondes.",
    toolType: "description",
    language: "fr",
    keywords: [
      "générateur description youtube",
      "description youtube seo",
      "créer description youtube",
      "description youtube optimisée",
      "outil description youtube",
      "description youtube automatique",
    ],
    faqItems: [
      {
        question: "Quelle structure a une bonne description YouTube SEO ?",
        answer:
          "Une description YouTube efficace contient : un hook avec le mot-clé principal, un résumé des bénéfices, les chapitres timestampés, un CTA, des liens ressources, et des hashtags pertinents.",
      },
      {
        question: "La description est-elle optimisée pour le SEO YouTube ?",
        answer:
          "Oui. Le mot-clé principal est dans les 100 premiers caractères, les variantes sémantiques sont intégrées naturellement, et la longueur cible 500-1000 mots pour maximiser l'indexation.",
      },
      {
        question: "Puis-je utiliser cette description telle quelle ?",
        answer:
          "Oui, mais nous recommandons d'ajouter tes liens personnels (chaîne, réseaux, ressources mentionnées) avant de copier.",
      },
    ],
    relatedTools: [
      "generateur-chapitres-youtube",
      "generateur-tags-youtube",
      "youtube-description-generator",
    ],
  },
  {
    slug: "generateur-tags-youtube",
    title: "Générateur de Tags YouTube",
    metaTitle: "Générateur de Tags YouTube Gratuit | ChapitreAI",
    metaDescription:
      "Génère 12-15 tags YouTube pertinents (longue traîne + moyens + larges) depuis l'URL ou le titre de ta vidéo. Optimisés pour la découverte organique.",
    h1: "Générateur de Tags YouTube Gratuit",
    intro:
      "Génère automatiquement des tags YouTube optimisés pour la découverte organique. Notre IA analyse ta vidéo et propose un mix stratégique de tags longue traîne, moyens et larges pour maximiser ta visibilité.",
    toolType: "tags",
    language: "fr",
    keywords: [
      "générateur tags youtube",
      "tags youtube gratuit",
      "trouver tags youtube",
      "mots clés youtube",
      "tags youtube seo",
      "outil tags youtube",
    ],
    faqItems: [
      {
        question: "Combien de tags YouTube dois-je mettre ?",
        answer:
          "YouTube recommande entre 5 et 15 tags. Notre outil génère 12-15 tags bien choisis : mix de longue traîne spécifique, tags moyens et tags larges.",
      },
      {
        question: "Les tags influencent-ils vraiment le SEO YouTube ?",
        answer:
          "Les tags ont un impact modéré sur le SEO YouTube mais restent utiles pour la catégorisation et la découverte via les vidéos suggérées.",
      },
    ],
    relatedTools: [
      "generateur-chapitres-youtube",
      "generateur-description-youtube",
      "youtube-tag-generator",
    ],
  },
  {
    slug: "youtube-chapter-generator",
    title: "YouTube Chapter Generator",
    metaTitle: "Free YouTube Chapter Generator — Auto Timestamps | ChapitreAI",
    metaDescription:
      "Generate YouTube chapters automatically from any video URL. AI-powered timestamps with click-worthy titles. Ready in 30 seconds, no channel connection needed.",
    h1: "Free YouTube Chapter Generator",
    intro:
      "Generate professional YouTube chapters from any video URL. Our AI analyzes the transcript and creates click-worthy timestamped chapters in 30 seconds — no channel connection required.",
    toolType: "chapter",
    language: "en",
    keywords: [
      "youtube chapter generator",
      "auto youtube chapters",
      "youtube timestamp generator",
      "youtube chapters tool",
      "generate youtube chapters",
      "youtube chapters free",
    ],
    faqItems: [
      {
        question: "How do I add chapters to my YouTube video?",
        answer:
          "Generate chapters with our tool, then paste them directly into your video description. YouTube will automatically detect the timestamps and create the chapter menu.",
      },
      {
        question: "Does YouTube auto-generate chapters?",
        answer:
          "Yes, but YouTube's auto-chapters are generic and poorly optimized for CTR. Our AI generates click-worthy chapter titles that entice viewers to watch specific sections.",
      },
      {
        question: "What's the first chapter rule on YouTube?",
        answer:
          "The first chapter must start at 00:00 and you need at least 3 chapters for YouTube to display them. Our tool handles this automatically.",
      },
    ],
    relatedTools: [
      "youtube-description-generator",
      "youtube-tag-generator",
      "generateur-chapitres-youtube",
    ],
  },
  {
    slug: "youtube-description-generator",
    title: "YouTube Description Generator",
    metaTitle: "Free YouTube Description Generator (SEO-Optimized) | ChapitreAI",
    metaDescription:
      "Generate a complete SEO-optimized YouTube description from any video URL. Hook, summary, chapters, CTA, hashtags — all in 30 seconds.",
    h1: "Free YouTube Description Generator",
    intro:
      "Stop spending 20+ minutes on every YouTube description. Our AI generates a complete SEO-optimized description — hook, value summary, chapters, CTA, hashtags — from your video URL in 30 seconds.",
    toolType: "description",
    language: "en",
    keywords: [
      "youtube description generator",
      "seo youtube description",
      "auto youtube description",
      "youtube description tool",
      "generate youtube description",
      "youtube description writer",
    ],
    faqItems: [
      {
        question: "What makes a good YouTube description for SEO?",
        answer:
          "A great YouTube description includes the main keyword in the first 100 characters, a clear value summary, chapters, a CTA, relevant links, and 3-5 hashtags.",
      },
      {
        question: "How long should a YouTube description be?",
        answer:
          "Between 500 and 1000 words is the sweet spot for SEO. This is enough to include all key information while keeping it readable and indexable.",
      },
    ],
    relatedTools: [
      "youtube-chapter-generator",
      "youtube-tag-generator",
      "generateur-description-youtube",
    ],
  },
  {
    slug: "youtube-tag-generator",
    title: "YouTube Tag Generator",
    metaTitle: "Free YouTube Tag Generator — Best Tags for Your Video | ChapitreAI",
    metaDescription:
      "Generate 12-15 optimized YouTube tags from your video URL or title. AI-powered mix of long-tail, medium, and broad tags for maximum discoverability.",
    h1: "Free YouTube Tag Generator",
    intro:
      "Generate the right YouTube tags for your video. Our AI analyzes your content and suggests a strategic mix of specific long-tail tags and broader discovery tags.",
    toolType: "tags",
    language: "en",
    keywords: [
      "youtube tag generator",
      "best youtube tags",
      "youtube tags tool",
      "find youtube tags",
      "youtube keywords generator",
      "youtube tags free",
    ],
    faqItems: [
      {
        question: "Do YouTube tags still matter in 2026?",
        answer:
          "Tags have reduced weight for search ranking, but they still help YouTube categorize your content and appear in suggested videos. The right tags can meaningfully impact discovery.",
      },
      {
        question: "How many tags should I use on YouTube?",
        answer:
          "Aim for 10-15 targeted tags. Quality over quantity — 10 highly relevant tags beat 50 random ones.",
      },
    ],
    relatedTools: [
      "youtube-chapter-generator",
      "youtube-description-generator",
      "generateur-tags-youtube",
    ],
  },
];

// ─── COMPARISON PAGES ────────────────────────────────────────────────────────

export const COMPARISON_PAGES: ComparisonPage[] = [
  {
    slug: "vs-tubebuddy",
    competitor: "TubeBuddy",
    metaTitle: "ChapitreAI vs TubeBuddy : Lequel choisir en 2026 ?",
    metaDescription:
      "Comparaison complète ChapitreAI vs TubeBuddy. Prix, qualité des chapitres, SEO YouTube — qui gagne pour les créateurs francophones ?",
    h1: "ChapitreAI vs TubeBuddy : La comparaison honnête",
    intro:
      "TubeBuddy est un outil puissant mais généraliste et cher. ChapitreAI est focalisé sur une seule chose : générer des chapitres et descriptions YouTube de qualité supérieure, rapidement, à moitié prix.",
    comparisonPoints: [
      { feature: "Prix mensuel", us: "12€/mois", them: "24$/mois", winner: "us" },
      { feature: "Qualité chapitres", us: "Excellente (IA spécialisée)", them: "Moyenne (template)", winner: "us" },
      { feature: "Génération description SEO", us: "Oui, complète", them: "Partielle", winner: "us" },
      { feature: "Connexion chaîne requise", us: "Non", them: "Oui", winner: "us" },
      { feature: "Analytics YouTube", us: "Non", them: "Oui", winner: "them" },
      { feature: "A/B test miniatures", us: "Non", them: "Oui", winner: "them" },
      { feature: "Vitesse génération", us: "30 secondes", them: "2-3 minutes", winner: "us" },
      { feature: "Focus francophone", us: "Oui, natif", them: "Non", winner: "us" },
    ],
    verdict:
      "Si tu veux un outil tout-en-un avec analytics, prends TubeBuddy. Si tu veux la meilleure qualité de chapitres et descriptions YouTube au meilleur prix, ChapitreAI est le choix évident.",
  },
  {
    slug: "vs-vidiq",
    competitor: "VidIQ",
    metaTitle: "ChapitreAI vs VidIQ : Comparaison 2026",
    metaDescription:
      "ChapitreAI vs VidIQ : deux outils YouTube très différents. On compare les prix, les fonctionnalités, et la qualité de génération pour trouver le meilleur choix.",
    h1: "ChapitreAI vs VidIQ : Que choisir pour ton SEO YouTube ?",
    intro:
      "VidIQ est le leader du marché sur la data YouTube. ChapitreAI est le champion sur la génération de contenu optimisé. Ils ne jouent pas dans la même catégorie.",
    comparisonPoints: [
      { feature: "Prix d'entrée", us: "12€/mois", them: "17$/mois (limité)", winner: "us" },
      { feature: "Données YouTube Analytics", us: "Non", them: "Oui (fort)", winner: "them" },
      { feature: "Génération chapitres IA", us: "Oui (haute qualité)", them: "Non", winner: "us" },
      { feature: "Description SEO automatique", us: "Oui", them: "Non", winner: "us" },
      { feature: "Recherche mots-clés", us: "Non", them: "Oui", winner: "them" },
      { feature: "Interface en français", us: "Oui", them: "Non", winner: "us" },
      { feature: "Temps par vidéo", us: "30 secondes", them: "10-15 minutes", winner: "us" },
    ],
    verdict:
      "VidIQ et ChapitreAI sont complémentaires. VidIQ pour l'analyse et la stratégie, ChapitreAI pour l'exécution et la rédaction. Beaucoup utilisent les deux.",
  },
  {
    slug: "vs-youtube-auto-chapters",
    competitor: "YouTube Auto-Chapters",
    metaTitle: "ChapitreAI vs Chapitres Automatiques YouTube : La différence",
    metaDescription:
      "Les chapitres automatiques YouTube sont gratuits mais génériques. Découvrez pourquoi des chapitres optimisés CTR font une vraie différence sur vos vues.",
    h1: "ChapitreAI vs les Chapitres Automatiques YouTube",
    intro:
      "YouTube génère des chapitres automatiquement — mais ils sont souvent génériques, mal titrés, et ne capturent pas la valeur de ta vidéo. Voici la différence que font des chapitres optimisés.",
    comparisonPoints: [
      { feature: "Prix", us: "Gratuit (3/mois)", them: "Gratuit", winner: "tie" },
      { feature: "Titres accrocheurs", us: "Oui (optimisés CTR)", them: "Non (génériques)", winner: "us" },
      { feature: "Contrôle créateur", us: "Total", them: "Aucun", winner: "us" },
      { feature: "Qualité des coupures", us: "Sémantique", them: "Algorithmique", winner: "us" },
      { feature: "Description + Tags inclus", us: "Oui", them: "Non", winner: "us" },
    ],
    verdict:
      "Les chapitres automatiques YouTube valent mieux que rien. Mais des chapitres optimisés CTR avec de vrais titres accrocheurs peuvent augmenter significativement ton watch time et tes vues.",
  },
  {
    slug: "alternative-tubebuddy",
    competitor: "TubeBuddy Alternative",
    metaTitle: "Meilleures Alternatives TubeBuddy en 2026 (moins chères)",
    metaDescription:
      "Cherches-tu une alternative à TubeBuddy moins chère et plus efficace pour générer chapitres et descriptions YouTube ? Voici les meilleures options.",
    h1: "Les meilleures alternatives à TubeBuddy en 2026",
    intro:
      "TubeBuddy est puissant mais coûteux et complexe. Si tu cherches une alternative focalisée sur la génération de chapitres et descriptions YouTube de haute qualité, voici notre comparatif.",
    comparisonPoints: [
      { feature: "Prix", us: "12€/mois", them: "24-49$/mois", winner: "us" },
      { feature: "Simplicité d'usage", us: "URL → résultat en 30s", them: "Complexe (70+ features)", winner: "us" },
      { feature: "Qualité chapitres", us: "Excellente", them: "Moyenne", winner: "us" },
      { feature: "Extension navigateur", us: "Non", them: "Oui", winner: "them" },
    ],
    verdict:
      "Pour la génération de contenu YouTube uniquement, ChapitreAI est l'alternative TubeBuddy la plus accessible et la plus qualitative.",
  },
];

// ─── NICHE PAGES ─────────────────────────────────────────────────────────────

export const NICHE_PAGES: NichePage[] = [
  {
    slug: "youtube-chapters-for-podcasters",
    niche: "Podcasteurs",
    metaTitle: "Chapitres YouTube pour Podcasteurs | ChapitreAI",
    metaDescription:
      "Les podcasts vidéos sont longs — les chapitres YouTube sont indispensables. Génère automatiquement des chapitres optimisés pour ton podcast vidéo en 30 secondes.",
    h1: "Chapitres YouTube pour Podcasteurs : Le Guide Complet",
    intro:
      "Un épisode de podcast vidéo sans chapitres, c'est comme un livre sans table des matières. Tes auditeurs ne savent pas où aller. Les chapitres YouTube augmentent ton watch time ET ton SEO.",
    painPoints: [
      "Tes épisodes durent 45 min à 2h — les créer manuellement prend 30-60 min",
      "Tes invités changent souvent — les segments sont difficiles à délimiter",
      "Les listeners cherchent des moments spécifiques et quittent si c'est trop dur",
      "Sans chapitres, ton épisode se retrouve noyé dans les résultats YouTube",
    ],
    benefits: [
      "Génère des chapitres pour un épisode de 2h en 30 secondes",
      "Titres optimisés pour le SEO : les sujets abordés deviennent des mots-clés",
      "Les spectateurs restent plus longtemps (meilleur signal pour l'algorithme)",
      "Chaque chapitre est une porte d'entrée SEO supplémentaire",
    ],
    exampleChapters: `00:00 [Prénom Invité] : Son parcours atypique raconté
04:32 Comment il a multiplié son chiffre d'affaires par 5
12:18 Les 3 erreurs que font tous les entrepreneurs débutants
21:45 La vérité sur le personal branding en 2026
35:20 Sa méthode pour créer du contenu sans burnout
48:10 Questions des auditeurs + ressources recommandées`,
    keywords: [
      "chapitres youtube podcast",
      "podcast video chapitres",
      "timestamps podcast youtube",
      "chapitres podcast automatique",
    ],
  },
  {
    slug: "youtube-chapters-for-tech-creators",
    niche: "Créateurs Tech & Dev",
    metaTitle: "Chapitres YouTube pour Créateurs Tech & Dev | ChapitreAI",
    metaDescription:
      "Tes tutoriels tech méritent des chapitres clairs. Génère des chapitres YouTube optimisés pour les tutoriels de programmation, tech et dev en 30 secondes.",
    h1: "Chapitres YouTube pour les Tutoriels Tech et Dev",
    intro:
      "Les tutoriels de programmation sont les vidéos YouTube qui bénéficient le plus des chapitres. Les développeurs cherchent des moments précis — si tu ne les aides pas, ils vont chez un concurrent.",
    painPoints: [
      "Tes tutos durent 30 min à 2h et couvrent des dizaines de concepts",
      "Les viewers cherchent 'comment faire X en JS' et veulent trouver ça directement",
      "Sans chapitres, ton tuto ne ressort pas sur 'tutoriel React hooks 2026'",
      "Créer les chapitres manuellement après le montage est une corvée",
    ],
    benefits: [
      "Génère des chapitres pour ton tuto de 90 min en 30 secondes",
      "Chaque concept devient un chapitre = un mot-clé SEO potentiel",
      "Les viewers trouvent ce qu'ils cherchent → meilleur taux de rétention",
      "Tes tutos ressortent sur des recherches très spécifiques (longue traîne)",
    ],
    exampleChapters: `00:00 Ce qu'on va construire (démo finale)
02:10 Setup environnement en 5 minutes chrono
06:45 Architecture du projet expliquée simplement
12:30 Implémentation des routes API
19:00 Gestion d'état avec Zustand (pas Redux !)
26:15 Authentification JWT de A à Z
35:40 Tests unitaires sans prise de tête
42:00 Déploiement sur Railway en 3 clics`,
    keywords: [
      "chapitres youtube tutoriel programmation",
      "chapitres youtube dev",
      "tutoriel tech youtube seo",
      "chapitres coding youtube",
    ],
  },
  {
    slug: "youtube-seo-for-educators",
    niche: "Créateurs Éducatifs",
    metaTitle: "SEO YouTube pour Créateurs Éducatifs | ChapitreAI",
    metaDescription:
      "Optimise tes vidéos éducatives YouTube pour le SEO. Chapitres, descriptions et tags générés automatiquement pour les créateurs de contenu éducatif.",
    h1: "SEO YouTube pour les Créateurs de Contenu Éducatif",
    intro:
      "Les vidéos éducatives ont le plus fort potentiel SEO sur YouTube — mais seulement si elles sont bien optimisées. Les spectateurs cherchent des réponses précises ; tes chapitres et ta description font la différence.",
    painPoints: [
      "Tes élèves cherchent 'comment calculer X' ou 'explication Y' et ne tombent pas sur toi",
      "Tu publies régulièrement mais le SEO de chaque vidéo prend trop de temps",
      "Tes vidéos de qualité n'ont pas la visibilité qu'elles méritent",
    ],
    benefits: [
      "Chaque concept enseigné devient un chapitre et un signal SEO",
      "Les descriptions générées incluent les variantes de mots-clés naturellement",
      "Tes vidéos ressortent sur les requêtes de tes apprenants",
      "Gain de 30 min par vidéo sur l'optimisation SEO",
    ],
    exampleChapters: `00:00 Introduction et objectifs de la leçon
03:15 Concepts fondamentaux à maîtriser d'abord
08:30 Explication détaillée avec exemples concrets
16:45 Les erreurs classiques des débutants
22:10 Exercice pratique guidé pas à pas
28:30 Résumé + Quiz rapide`,
    keywords: [
      "youtube seo créateurs éducatifs",
      "chapitres youtube cours en ligne",
      "seo youtube formation",
      "optimisation youtube éducation",
    ],
  },
  {
    slug: "youtube-chapters-finance-personnelle",
    niche: "Finance Personnelle",
    metaTitle: "Chapitres YouTube Finance Personnelle | ChapitreAI",
    metaDescription:
      "Optimise tes vidéos YouTube finance personnelle avec des chapitres et descriptions SEO générés automatiquement. Touche plus d'investisseurs et d'épargnants.",
    h1: "Chapitres YouTube pour les Créateurs Finance Personnelle",
    intro:
      "La finance personnelle est une des niches YouTube les plus compétitives. Se démarquer passe par un SEO impeccable et des chapitres qui répondent exactement aux questions de tes viewers.",
    painPoints: [
      "Les requêtes finance sont ultra-compétitives — chaque détail SEO compte",
      "Tes viewers cherchent des infos précises (rendement, stratégie, erreur)",
      "Les vidéos longues sur l'investissement nécessitent des chapitres clairs",
    ],
    benefits: [
      "Chapitres optimisés pour des mots-clés comme 'comment investir en bourse 2026'",
      "Descriptions qui intègrent naturellement les termes recherchés",
      "Meilleur watch time sur les vidéos explicatives longues",
    ],
    exampleChapters: `00:00 Pourquoi 90% des Français n'investissent pas
03:20 Les 5 erreurs qui font perdre de l'argent
09:45 Stratégie ETF pour débutant (mon portfolio)
16:30 Combien investir par mois selon ton salaire
22:00 Plateformes recommandées (et celles à éviter)
27:15 Plan d'action sur 12 mois`,
    keywords: [
      "chapitres youtube finance personnelle",
      "youtube seo investissement",
      "créateur youtube bourse",
    ],
  },
  {
    slug: "youtube-chapters-marketing-digital",
    niche: "Marketing Digital",
    metaTitle: "Chapitres YouTube pour Créateurs Marketing Digital | ChapitreAI",
    metaDescription:
      "Génère des chapitres et descriptions YouTube optimisés pour tes vidéos marketing digital, SEO, publicité et growth hacking.",
    h1: "Chapitres YouTube pour le Marketing Digital",
    intro:
      "Tes vidéos marketing sont souvent denses — stratégies, outils, données. Des chapitres bien structurés aident tes viewers à trouver la valeur et restent plus longtemps.",
    painPoints: [
      "Tes vidéos de 45 min sur le SEO perdent les spectateurs sans chapitres",
      "Les marketeurs cherchent des tactiques précises, pas des intros de 5 min",
      "La concurrence est forte — ton SEO doit être parfait",
    ],
    benefits: [
      "Chaque tactique devient un chapitre et un point d'entrée SEO",
      "Les viewers trouvent la partie pertinente et restent engagés",
      "Tes vidéos ressortent sur des requêtes longue traîne très précises",
    ],
    exampleChapters: `00:00 Résultat que j'ai obtenu (preuve)
02:45 La stratégie qui change tout en 2026
08:30 Outil n°1 : configuration complète
15:00 Outil n°2 : le secret des pros
21:20 Mesurer les résultats correctement
26:00 Scaling quand ça marche`,
    keywords: [
      "chapitres youtube marketing digital",
      "youtube seo marketing",
      "créateur youtube marketing",
    ],
  },
  {
    slug: "youtube-chapters-developpement-personnel",
    niche: "Développement Personnel",
    metaTitle: "Chapitres YouTube Développement Personnel | ChapitreAI",
    metaDescription:
      "Optimise tes vidéos YouTube développement personnel avec des chapitres accrocheurs. Génération automatique depuis l'URL de ta vidéo.",
    h1: "Chapitres YouTube pour le Développement Personnel",
    intro:
      "Le dev perso est la niche YouTube francophone qui croît le plus. Des chapitres bien pensés augmentent le watch time et la découverte organique de tes vidéos.",
    painPoints: [
      "Tes vidéos de 30 min sur la productivité perdent les viewers au bout de 5 min",
      "Sans chapitres, les spectateurs skippent et ton watch time baisse",
      "Tu publies 2-3 fois par semaine — optimiser chaque vidéo prend trop de temps",
    ],
    benefits: [
      "Chapitres accrocheurs qui créent de la curiosité et du FOMO",
      "Meilleur watch time = meilleure recommandation algorithmique",
      "Génération en 30 secondes pour rythme de publication élevé",
    ],
    exampleChapters: `00:00 La habitude qui a tout changé pour moi
02:10 Pourquoi la volonté ne fonctionne pas
07:30 Le système des 2 minutes (Atomic Habits)
13:45 Ma routine matinale réelle (sans mensonges)
19:20 Les 3 apps qui m'ont sauvé du procrastination
24:00 Challenge 30 jours : comment commencer`,
    keywords: [
      "chapitres youtube développement personnel",
      "youtube seo productivité",
      "créateur youtube mindset",
    ],
  },
];

// ─── BLOG DATA ────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  readingTimeMin: number;
  keywords: string[];
  excerpt: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "comment-optimiser-description-youtube",
    title: "Comment optimiser sa description YouTube en 2026 : le guide complet",
    metaTitle: "Optimiser Description YouTube 2026 : Guide SEO Complet",
    metaDescription:
      "Tout ce qu'il faut savoir sur l'optimisation des descriptions YouTube en 2026. Structure, mots-clés, longueur, hashtags — guide avec exemples.",
    publishedAt: "2026-04-15",
    updatedAt: "2026-05-01",
    category: "SEO YouTube",
    readingTimeMin: 12,
    keywords: [
      "optimiser description youtube",
      "description youtube seo",
      "mots clés description youtube",
      "longueur description youtube",
    ],
    excerpt:
      "La description YouTube est l'un des leviers SEO les plus sous-estimés. Voici comment la structurer pour maximiser ta visibilité organique et ton CTR.",
  },
  {
    slug: "chapitres-youtube-impact-seo",
    title: "Chapitres YouTube : quel impact sur le SEO et les vues en 2026 ?",
    metaTitle: "Impact des Chapitres YouTube sur le SEO | Étude 2026",
    metaDescription:
      "Les chapitres YouTube améliorent-ils vraiment le SEO et les vues ? Analyse de données, exemples concrets et bonnes pratiques pour créateurs.",
    publishedAt: "2026-04-20",
    updatedAt: "2026-05-01",
    category: "SEO YouTube",
    readingTimeMin: 8,
    keywords: [
      "chapitres youtube seo",
      "impact chapitres youtube vues",
      "chapitres youtube watch time",
      "chapters youtube algorithm",
    ],
    excerpt:
      "Les chapitres YouTube ne sont pas juste une fonctionnalité de confort. Ils impactent directement ton watch time, ton SEO et tes suggestions algorithmiques.",
  },
  {
    slug: "youtube-seo-2026",
    title: "YouTube SEO en 2026 : les stratégies qui marchent vraiment",
    metaTitle: "YouTube SEO 2026 : Guide Stratégique Complet",
    metaDescription:
      "Les meilleures stratégies YouTube SEO en 2026. Titres, descriptions, chapitres, miniatures, algorithme — tout ce qui influence vraiment ta visibilité.",
    publishedAt: "2026-03-10",
    updatedAt: "2026-05-01",
    category: "SEO YouTube",
    readingTimeMin: 15,
    keywords: [
      "youtube seo 2026",
      "stratégie youtube seo",
      "référencement youtube",
      "algorithme youtube 2026",
    ],
    excerpt:
      "L'algorithme YouTube a évolué en 2026. Voici les stratégies qui fonctionnent réellement pour augmenter ta visibilité organique sur la plateforme.",
  },
  {
    slug: "tags-youtube-2026-guide",
    title: "Les tags YouTube en 2026 : sont-ils encore utiles ?",
    metaTitle: "Tags YouTube 2026 : Guide Complet et Stratégie",
    metaDescription:
      "Les tags YouTube ont-ils encore de l'importance en 2026 ? Analyse, bonnes pratiques et stratégie pour utiliser les tags efficacement.",
    publishedAt: "2026-04-28",
    updatedAt: "2026-05-01",
    category: "SEO YouTube",
    readingTimeMin: 7,
    keywords: [
      "tags youtube 2026",
      "mots clés youtube",
      "tags youtube utiles",
      "stratégie tags youtube",
    ],
    excerpt:
      "Mythe ou réalité ? Les tags YouTube font encore partie de l'arsenal SEO d'un créateur sérieux. Voici comment les utiliser intelligemment en 2026.",
  },
  {
    slug: "chapitres-youtube-comment-ajouter",
    title: "Comment ajouter des chapitres à une vidéo YouTube (guide 2026)",
    metaTitle: "Ajouter des Chapitres YouTube : Guide Étape par Étape 2026",
    metaDescription:
      "Tuto complet pour ajouter des chapitres à une vidéo YouTube. Format timestamps, règles YouTube, erreurs à éviter — tout y est.",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    category: "Tutoriels YouTube",
    readingTimeMin: 6,
    keywords: [
      "ajouter chapitres youtube",
      "comment ajouter chapitres youtube",
      "chapitres youtube description",
      "timestamps youtube format",
    ],
    excerpt:
      "Ajouter des chapitres à tes vidéos YouTube prend moins de 5 minutes une fois que tu connais le bon format. Voici le guide complet.",
  },
];

// All slugs for sitemap generation
export const ALL_SEO_SLUGS = {
  tools: TOOL_PAGES.map((p) => p.slug),
  comparisons: COMPARISON_PAGES.map((p) => p.slug),
  niches: NICHE_PAGES.map((p) => p.slug),
  blog: BLOG_POSTS.map((p) => p.slug),
};
