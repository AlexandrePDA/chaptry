import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chaptry — Générateur chapitres YouTube SEO en 30 secondes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f0f",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 800px 500px at 50% 50%, rgba(224,20,20,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo + name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {/* Play triangle */}
          <svg
            width="60"
            height="40"
            viewBox="0 0 120 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9,7 C4,7 2,10 2,15 L2,65 C2,70 4,73 9,73 C12,73 15,71 18,69 L52,47 C57,44 59,42 59,40 C59,38 57,36 52,33 L18,11 C15,9 12,7 9,7 Z"
              fill="#FF0000"
            />
            <polyline
              points="59,40 73,20 115,20"
              fill="none"
              stroke="#C4C4C4"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="59"
              y1="40"
              x2="115"
              y2="40"
              stroke="#C4C4C4"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <polyline
              points="59,40 73,60 115,60"
              fill="none"
              stroke="#C4C4C4"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            Chaptry
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Chapitres YouTube SEO{"\n"}en 30 secondes
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: 760,
            lineHeight: 1.4,
            marginBottom: 48,
          }}
        >
          Colle une URL YouTube, obtiens chapitres timestampés,{"\n"}description SEO et tags. Sans connecter ta chaîne.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["Chapitres", "Description SEO", "Tags"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 100,
                padding: "10px 22px",
                color: "rgba(255,255,255,0.8)",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#FF0000",
                }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
