/**
 * Visible silhouette stand-in for the hero subject.
 *
 * TO REPLACE WITH THE REAL PHOTO:
 * 1. Drop your real `lisha-cutout.png` (1200×1082, transparent) into `/public/`.
 * 2. In `scroll-hero.tsx`, swap `<FigurePlaceholder />` for the `<Image>` block
 *    that's commented just above it.
 */
export function FigurePlaceholder() {
  return (
    <svg
      viewBox="0 0 800 900"
      preserveAspectRatio="xMidYMax meet"
      className="h-[70vh] w-auto select-none md:h-[92vh]"
      style={{ filter: "drop-shadow(0 30px 60px rgba(14,23,41,0.45))" }}
      aria-label="Photo placeholder — replace with /public/lisha-cutout.png"
    >
      <defs>
        <linearGradient id="figureGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E1729" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#1E3A6B" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      <g fill="url(#figureGrad)">
        {/* Head */}
        <ellipse cx="400" cy="200" rx="95" ry="115" />
        {/* Hair flowing on the right side */}
        <path d="M 380 110 Q 510 130 540 260 Q 555 380 530 480 Q 500 460 480 420 Q 470 320 460 240 Q 430 200 380 195 Z" />
        {/* Shoulders / jacket collar */}
        <path d="M 280 290 Q 240 340 230 420 L 570 420 Q 560 340 520 290 Q 460 320 400 320 Q 340 320 280 290 Z" />
        {/* Torso (jacket) */}
        <path d="M 230 400 Q 195 540 220 700 L 580 700 Q 605 540 570 400 L 230 400 Z" />
        {/* Knees up (sitting pose) */}
        <path d="M 200 660 Q 150 740 200 870 L 600 870 Q 650 740 600 660 Q 540 700 480 700 L 320 700 Q 260 700 200 660 Z" />
      </g>

      {/* Inline label so it's obvious this is a stand-in */}
      <g
        fontFamily="ui-monospace, SF Mono, Menlo, monospace"
        fontSize="14"
        fill="rgba(255,255,255,0.55)"
        letterSpacing="2"
        textAnchor="middle"
      >
        <text x="400" y="540">PHOTO PLACEHOLDER</text>
        <text x="400" y="562" fontSize="11" opacity="0.7">
          drop /public/lisha-cutout.png
        </text>
      </g>
    </svg>
  );
}
