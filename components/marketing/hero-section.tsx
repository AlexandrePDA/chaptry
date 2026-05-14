"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const DEMOS = [
  {
    url: "youtube.com/watch?v=xK2uElmcgqQ",
    label: "Tuto Dev · Node.js",
    chapters: [
      { time: "00:00", title: "Pourquoi Node.js domine l'API REST en 2024" },
      { time: "02:15", title: "Setup Express en 5 minutes chrono" },
      { time: "07:30", title: "Architecture MVC : la bonne façon" },
      { time: "13:45", title: "CRUD complet avec validation Zod" },
      { time: "20:10", title: "Auth JWT sans se tromper" },
      { time: "26:00", title: "Tests Postman + déploiement Railway" },
    ],
    tags: [
      "nodejs",
      "express.js",
      "api rest nodejs",
      "javascript backend",
      "tuto nodejs français",
      "créer api rest",
      "node js 2024",
      "express typescript",
      "backend javascript",
      "web development",
    ],
  },
  {
    url: "youtube.com/watch?v=9bZkp7q19f0",
    label: "Finance · Bourse",
    chapters: [
      { time: "00:00", title: "Le marché actions qu'on ne t'explique jamais" },
      { time: "03:40", title: "ETF vs actions : ce que choisissent les pros" },
      { time: "09:15", title: "Construire un portefeuille solide en 2024" },
      { time: "16:30", title: "Les 5 erreurs des investisseurs débutants" },
      { time: "23:00", title: "Dollar-cost averaging : stratégie complète" },
      { time: "28:45", title: "Plan d'action pour commencer cette semaine" },
    ],
    tags: [
      "bourse débutant",
      "investir en bourse",
      "ETF investissement",
      "portefeuille actions",
      "finance personnelle",
      "bourse française",
      "stratégie bourse 2024",
      "dollar cost averaging",
      "actions ETF",
      "investissement long terme",
    ],
  },
  {
    url: "youtube.com/watch?v=dQw4w9WgXcQ",
    label: "Podcast · Entrepreneuriat",
    chapters: [
      { time: "00:00", title: "Mon invité : 0 à 1M€ de CA en 3 ans" },
      { time: "04:20", title: "L'idée de départ et les premiers doutes" },
      { time: "11:05", title: "Comment il a trouvé ses 100 premiers clients" },
      { time: "19:30", title: "La crise qui a failli tout faire s'effondrer" },
      { time: "26:15", title: "Recrutement : les erreurs à ne pas répéter" },
      { time: "33:00", title: "Ses conseils pour les entrepreneurs de 2024" },
    ],
    tags: [
      "entrepreneuriat france",
      "créer une entreprise",
      "startup française",
      "témoignage entrepreneur",
      "business en ligne",
      "réussir en business",
      "entrepreneur français",
      "business 2024",
      "podcast entrepreneuriat",
      "scale startup",
    ],
  },
  {
    url: "youtube.com/watch?v=kJQP7kiw5Fk",
    label: "Gaming · Minecraft",
    chapters: [
      { time: "00:00", title: "Le spawn le plus rare qu'on m'ait montré" },
      { time: "02:50", title: "Construction de la base principale J1" },
      { time: "08:30", title: "Farm automatique blé + carottes sans redstone" },
      { time: "15:20", title: "Premier raid du Nether, presque mort 3 fois" },
      { time: "22:40", title: "Craft de l'armure en diamant complète" },
      { time: "29:10", title: "Préparation du combat contre l'Ender Dragon" },
    ],
    tags: [
      "minecraft survie",
      "minecraft français",
      "minecraft 2024",
      "tuto minecraft",
      "farm minecraft",
      "ender dragon minecraft",
      "let's play minecraft",
      "minecraft débutant",
      "survival minecraft",
      "let's play fr",
    ],
  },
];

type DemoPhase = "idle" | "typing" | "loading" | "result";

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function HeroSection() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [typedUrl, setTypedUrl] = useState("");
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("idle");
  const [chaptersVisible, setChaptersVisible] = useState(0);
  const [tagsVisible, setTagsVisible] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runDemo = useCallback((demoIdx: number) => {
    const demo = DEMOS[demoIdx];

    setTypedUrl("");
    setDemoPhase("typing");
    setChaptersVisible(0);
    setTagsVisible(0);

    let charIdx = 0;
    intervalRef.current = setInterval(() => {
      charIdx++;
      setTypedUrl(demo.url.slice(0, charIdx));
      if (charIdx >= demo.url.length) {
        clearInterval(intervalRef.current!);
        timeoutRef.current = setTimeout(() => {
          setDemoPhase("loading");
          timeoutRef.current = setTimeout(() => {
            setDemoPhase("result");
            let chIdx = 0;
            intervalRef.current = setInterval(() => {
              chIdx++;
              setChaptersVisible(chIdx);
              if (chIdx >= demo.chapters.length) {
                clearInterval(intervalRef.current!);
                timeoutRef.current = setTimeout(() => {
                  let tIdx = 0;
                  intervalRef.current = setInterval(() => {
                    tIdx++;
                    setTagsVisible(tIdx);
                    if (tIdx >= demo.tags.length) {
                      clearInterval(intervalRef.current!);
                      timeoutRef.current = setTimeout(() => {
                        const next = (demoIdx + 1) % DEMOS.length;
                        setDemoIndex(next);
                        runDemo(next);
                      }, 4000);
                    }
                  }, 120);
                }, 300);
              }
            }, 160);
          }, 1700);
        }, 500);
      }
    }, 42);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => runDemo(0), 700);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [runDemo]);

  const demo = DEMOS[demoIndex];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,hsl(0_84%_47%_/_0.07),transparent)]" />

      <div className="container max-w-5xl mx-auto px-4">
        {/* Headline + subtitle */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary font-medium mb-8">
            <YouTubeIcon className="w-4 h-4" />
            Génération en 30 secondes
          </div>

          <h1 className="text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl md:leading-[1.1] lg:text-[3.75rem] font-bold tracking-tight mb-6">
            Génère tes chapitres YouTube,
            <br />
            ta description SEO et tes tags
            <br />
            <span className="text-primary">en 30 secondes.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Colle une URL YouTube. Chaptry analyse le transcript et génère tout
            le contenu SEO-optimisé prêt à coller dans YouTube Studio. Sans
            connecter ta chaîne.
          </p>
        </div>

        {/* Pipeline — inlined between subtitle and CTA */}
        <div className="mb-10">
          {/* Mobile: vertical SVG animation */}
          <div className="md:hidden overflow-hidden">
            <svg
              viewBox="0 0 280 415"
              className="w-full max-w-[260px] mx-auto"
              aria-hidden="true"
            >
              <defs>
                <path id="p-m-flow" d="M 140,80 L 140,370" />
              </defs>

              {/* Vertical connecting lines */}
              <line
                x1="140"
                y1="80"
                x2="140"
                y2="130"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <line
                x1="140"
                y1="194"
                x2="140"
                y2="234"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <line
                x1="140"
                y1="298"
                x2="140"
                y2="338"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* URL YouTube card */}
              <rect
                x="40"
                y="10"
                width="200"
                height="70"
                rx="12"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <rect
                x="50"
                y="19"
                width="52"
                height="42"
                rx="6"
                fill="#f3f4f6"
              />
              <g transform="translate(58, 22) scale(1.5)">
                <path
                  fill="#FF0000"
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                />
                <path
                  fill="white"
                  d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </g>
              <text
                x="170"
                y="40"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
              >
                URL YouTube
              </text>
              <text
                x="170"
                y="57"
                textAnchor="middle"
                fontSize="9"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                youtube.com/watch?v=…
              </text>

              {/* Chapitres card */}
              <rect
                x="40"
                y="130"
                width="200"
                height="64"
                rx="10"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <circle
                cx="60"
                cy="162"
                r="5.5"
                fill="#e01414"
                fillOpacity="0.12"
              />
              <circle cx="60" cy="162" r="3.5" fill="#e01414" />
              <text
                x="76"
                y="152"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
              >
                Chapitres
              </text>
              <text
                x="76"
                y="168"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                Booste le temps de visionnage
              </text>
              <text
                x="76"
                y="182"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                et réduit le taux de rebond
              </text>

              {/* Description SEO card */}
              <rect
                x="40"
                y="234"
                width="200"
                height="64"
                rx="10"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <circle
                cx="60"
                cy="266"
                r="5.5"
                fill="#e01414"
                fillOpacity="0.12"
              />
              <circle cx="60" cy="266" r="3.5" fill="#e01414" />
              <text
                x="76"
                y="256"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
              >
                Description SEO
              </text>
              <text
                x="76"
                y="272"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                Positionne tes vidéos plus haut
              </text>
              <text
                x="76"
                y="286"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                dans les recherches YouTube
              </text>

              {/* Tags optimisés card */}
              <rect
                x="40"
                y="338"
                width="200"
                height="64"
                rx="10"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <circle
                cx="60"
                cy="370"
                r="5.5"
                fill="#e01414"
                fillOpacity="0.12"
              />
              <circle cx="60" cy="370" r="3.5" fill="#e01414" />
              <text
                x="76"
                y="360"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
              >
                Tags optimisés
              </text>
              <text
                x="76"
                y="376"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                Cible les bonnes requêtes
              </text>
              <text
                x="76"
                y="390"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                et maximise ta portée
              </text>

              {/* Single dot flowing through gaps only (hidden inside cards) */}
              <circle r="4.5" fill="#e01414">
                <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s">
                  <mpath href="#p-m-flow" />
                </animateMotion>
                <animate
                  attributeName="fill-opacity"
                  values="1;0;1;0;1;0;0"
                  keyTimes="0;0.172;0.393;0.531;0.752;0.890;1"
                  calcMode="discrete"
                  dur="2.2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
            </svg>
          </div>

          {/* Desktop: SVG animation */}
          <div className="hidden md:block w-full overflow-hidden">
            <svg viewBox="0 0 860 286" className="w-full" aria-hidden="true">
              <defs>
                <path id="p-in" d="M 192,140 L 402,140" />
                <path id="p-ch" d="M 458,140 C 548,140 602,58 657,58" />
                <path id="p-desc" d="M 458,140 L 657,140" />
                <path id="p-tags" d="M 458,140 C 548,140 602,222 657,222" />
                <filter
                  id="hub-glow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Lines */}
              <path
                d="M 192,140 L 402,140"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5 4"
              />
              <path
                d="M 458,140 C 548,140 602,58 657,58"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 458,140 L 657,140"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 458,140 C 548,140 602,222 657,222"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                fill="none"
              />

              {/* YouTube input card */}
              <rect
                x="10"
                y="88"
                width="182"
                height="104"
                rx="12"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <rect
                x="20"
                y="98"
                width="162"
                height="62"
                rx="8"
                fill="#f3f4f6"
              />
              <g transform="translate(74, 103) scale(2.2)">
                <path
                  fill="#FF0000"
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                />
                <path
                  fill="white"
                  d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </g>
              <text
                x="101"
                y="178"
                textAnchor="middle"
                fontSize="12"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
                fontWeight="600"
              >
                URL YouTube
              </text>

              {/* Hub */}
              <circle
                cx="430"
                cy="140"
                r="36"
                fill="#e01414"
                fillOpacity="0.07"
              >
                <animate
                  attributeName="r"
                  values="32;42;32"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fillOpacity"
                  values="0.07;0.02;0.07"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="430"
                cy="140"
                r="28"
                fill="#e01414"
                filter="url(#hub-glow)"
              />
              <path
                d="M 433,124 L 424,141 H 431 L 427,156 L 439,138 H 432 Z"
                fill="white"
              />

              {/* Output cards */}
              <rect
                x="657"
                y="26"
                width="195"
                height="64"
                rx="10"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <text
                x="674"
                y="47"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
              >
                Chapitres
              </text>
              <text
                x="674"
                y="63"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                Booste le temps de visionnage
              </text>
              <text
                x="674"
                y="78"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                et réduit le taux de rebond
              </text>

              <rect
                x="657"
                y="108"
                width="195"
                height="64"
                rx="10"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <text
                x="674"
                y="129"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
              >
                Description SEO
              </text>
              <text
                x="674"
                y="145"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                Positionne tes vidéos plus haut
              </text>
              <text
                x="674"
                y="160"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                dans les recherches YouTube
              </text>

              <rect
                x="657"
                y="190"
                width="195"
                height="64"
                rx="10"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              <text
                x="674"
                y="211"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
                fill="#111827"
              >
                Tags optimisés
              </text>
              <text
                x="674"
                y="227"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                Cible les bonnes requêtes
              </text>
              <text
                x="674"
                y="242"
                fontSize="10"
                fontFamily="system-ui,sans-serif"
                fill="#6b7280"
              >
                et maximise ta portée
              </text>

              {/* Animated dots */}
              <circle r="5" fill="#e01414">
                <animateMotion dur="1.3s" repeatCount="indefinite" begin="0s">
                  <mpath href="#p-in" />
                </animateMotion>
              </circle>
              <circle r="4.5" fill="#e01414" fillOpacity="0.9">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin="1.3s">
                  <mpath href="#p-ch" />
                </animateMotion>
              </circle>
              <circle r="4.5" fill="#e01414" fillOpacity="0.9">
                <animateMotion dur="1.1s" repeatCount="indefinite" begin="1.5s">
                  <mpath href="#p-desc" />
                </animateMotion>
              </circle>
              <circle r="4.5" fill="#e01414" fillOpacity="0.9">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin="1.7s">
                  <mpath href="#p-tags" />
                </animateMotion>
              </circle>
            </svg>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Tester gratuitement
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Aucune CB requise · Annulation à tout moment
          </p>
        </div>

        {/* Demo title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Chaptry en action
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Transcripts réels · Résultats réels
          </p>
        </div>

        {/* Animated mockup */}
        <div className="w-full rounded-2xl border bg-white shadow-[0_8px_40px_-8px_hsl(0_84%_47%_/_0.12)] overflow-hidden">
          {/* Window chrome */}
          <div className="border-b bg-muted/40 px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 shrink-0" />
            <span className="w-3 h-3 rounded-full bg-green-400 shrink-0" />
            <div className="ml-2 flex-1 flex items-center justify-center gap-2 pr-8">
              <span className="text-xs text-muted-foreground font-mono">
                chaptry.com/generate
              </span>
              {demoPhase === "result" && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full animate-in fade-in duration-300">
                  {demo.label}
                </span>
              )}
            </div>
          </div>

          {/* URL input */}
          <div className="px-5 py-4 border-b">
            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-2.5">
              <svg
                viewBox="0 0 20 20"
                className="w-4 h-4 text-muted-foreground shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                <circle cx="10" cy="10" r="8" />
                <path d="M2 10h16M10 2a12.66 12.66 0 0 1 0 16M10 2a12.66 12.66 0 0 0 0 16" />
              </svg>
              <span className="text-sm font-mono text-foreground flex-1 min-h-[1.25rem] truncate">
                {typedUrl || (
                  <span className="text-muted-foreground">
                    https://youtube.com/watch?v=...
                  </span>
                )}
                {demoPhase === "typing" && (
                  <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                )}
              </span>
              {demoPhase !== "idle" && demoPhase !== "typing" && (
                <span
                  className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    demoPhase === "loading"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {demoPhase === "loading" ? "Analyse…" : "✓ Prêt"}
                </span>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="px-5 md:px-8 py-6 h-[460px] md:h-[340px] overflow-hidden">
            {(demoPhase === "idle" || demoPhase === "typing") && (
              <p className="text-sm text-muted-foreground">
                Colle ton URL et génère en 30 secondes.
              </p>
            )}

            {demoPhase === "loading" && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
                Analyse du transcript en cours…
              </div>
            )}

            {demoPhase === "result" && (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
                {/* Chapters */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Chapitres générés
                  </div>
                  <div className="space-y-2.5 font-mono text-sm">
                    {demo.chapters.slice(0, chaptersVisible).map((ch, i) => (
                      <div
                        key={`${demoIndex}-ch-${i}`}
                        className="flex items-baseline gap-3 animate-in fade-in slide-in-from-bottom-1 duration-300"
                      >
                        <span className="text-primary font-bold shrink-0 w-12">
                          {ch.time}
                        </span>
                        <span className="text-foreground">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Tags
                  </div>
                  <div className="flex flex-wrap md:flex-col gap-1.5">
                    {demo.tags.slice(0, tagsVisible).map((tag, i) => (
                      <span
                        key={`${demoIndex}-tag-${i}`}
                        className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium w-fit animate-in fade-in slide-in-from-right-2 duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div className="px-5 pb-4 flex items-center gap-1.5">
            {DEMOS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === demoIndex
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/30 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>

        {/* "Teste avec ta propre vidéo →" */}
        <div className="mt-4 rounded-xl border bg-muted/20 px-5 md:px-8 py-5">
          <p className="text-sm font-medium mb-3">
            Teste avec ta propre vidéo →
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link
              href="/dashboard"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors text-center sm:shrink-0"
            >
              Générer →
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Inscription gratuite requise pour ta propre URL
          </p>
        </div>
      </div>
    </section>
  );
}
