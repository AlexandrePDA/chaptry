export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Chaptry"
    >
      {/* Rounded play triangle */}
      <path
        d="M9,7 C4,7 2,10 2,15 L2,65 C2,70 4,73 9,73 C12,73 15,71 18,69 L52,47 C57,44 59,42 59,40 C59,38 57,36 52,33 L18,11 C15,9 12,7 9,7 Z"
        fill="#FF0000"
      />
      {/* Top line */}
      <polyline
        points="59,40 73,20 115,20"
        fill="none"
        stroke="#C4C4C4"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Middle line */}
      <line
        x1="59" y1="40" x2="115" y2="40"
        stroke="#C4C4C4"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Bottom line */}
      <polyline
        points="59,40 73,60 115,60"
        fill="none"
        stroke="#C4C4C4"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
