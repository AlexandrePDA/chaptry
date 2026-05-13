export function PipelineAnimation() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Mobile: simple cards */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {[
            {
              title: "Chapitres",
              desc: "Booste le temps de visionnage et réduit le taux de rebond",
            },
            {
              title: "Description SEO",
              desc: "Positionne tes vidéos plus haut dans les recherches YouTube",
            },
            {
              title: "Tags optimisés",
              desc: "Cible les bonnes requêtes et maximise ta portée",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-white p-4 flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="w-3 h-3 rounded-full bg-primary block" />
              </div>
              <div>
                <div className="font-semibold text-sm mb-0.5">{item.title}</div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: SVG animation */}
        <div className="hidden md:block w-full overflow-hidden">
          <svg viewBox="0 0 860 286" className="w-full" aria-hidden="true">
            <defs>
              {/* Paths used only by animateMotion */}
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

            {/* ── LINES ─────────────────────────────────── */}
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

            {/* ── YOUTUBE INPUT CARD ─────────────────────── */}
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
            {/* Thumbnail background */}
            <rect x="20" y="98" width="162" height="62" rx="8" fill="#f3f4f6" />
            {/* Official YouTube logo, centered in thumbnail */}
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
            {/* Label */}
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

            {/* ── HUB ───────────────────────────────────── */}
            {/* Pulse ring */}
            <circle cx="430" cy="140" r="36" fill="#e01414" fillOpacity="0.07">
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
            {/* Hub body */}
            <circle
              cx="430"
              cy="140"
              r="28"
              fill="#e01414"
              filter="url(#hub-glow)"
            />
            {/* Lightning bolt */}
            <path
              d="M 433,124 L 424,141 H 431 L 427,156 L 439,138 H 432 Z"
              fill="white"
            />

            {/* ── OUTPUT CARDS ──────────────────────────── */}

            {/* Chapitres */}
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

            {/* Description SEO */}
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

            {/* Tags */}
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

            {/* ── ANIMATED DOTS ─────────────────────────── */}
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
    </section>
  );
}
