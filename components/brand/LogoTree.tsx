import type { CSSProperties } from "react";

const LEAF = "M0 0C14-12 14-48 0-60C-14-48-14-12 0 0Z";

/** Hojas del árbol del logo: posición, giro, escala y color. */
const LEAVES = [
  { t: "translate(90 98) rotate(-62) scale(1.25)", c: "#2BB5A0" },
  { t: "translate(94 92) rotate(-14) scale(1.05)", c: "#5A6577" },
  { t: "translate(100 88) rotate(14) scale(.95)", c: "#1D5560" },
  { t: "translate(122 102) rotate(58) scale(1.25)", c: "#3CC2AA" },
  { t: "translate(82 80) rotate(-48) scale(.62)", c: "#4CAF50" },
  { t: "translate(124 108) rotate(98) scale(1.05)", c: "#A8C82A" },
  { t: "translate(118 84) rotate(40) scale(.58)", c: "#4CAF50" },
  { t: "translate(86 112) rotate(-104) scale(.6)", c: "#A8C82A" },
];

type Props = { className?: string; animated?: boolean; startDelay?: number };

/** Árbol del logo en SVG. Con `animated`, el tronco se dibuja y las hojas brotan. */
export function LogoTree({ className, animated = false, startDelay = 0.25 }: Props) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true" overflow="visible">
      <path
        pathLength={1}
        className={animated ? "trunk-draw" : undefined}
        d="M100 164 C101 140 98 118 92 96 M97 128 C108 118 116 110 124 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
      />
      {LEAVES.map((leaf, i) => (
        <g key={i} transform={leaf.t}>
          <path
            d={LEAF}
            fill={leaf.c}
            className={animated ? "leaf-grow" : undefined}
            style={animated ? ({ "--d": `${(startDelay + i * 0.09).toFixed(2)}s` } as CSSProperties) : undefined}
          />
        </g>
      ))}
    </svg>
  );
}
