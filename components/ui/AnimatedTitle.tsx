import type { CSSProperties, ReactNode } from "react";

type Props = {
  before: string;
  accent?: string;
  after?: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  /** "words": cada palabra sube desde una máscara. "chars": cada letra aparece con desenfoque. */
  mode?: "words" | "chars";
  /** Segundo en que entra la primera pieza (se suma a la bienvenida). */
  start?: number;
  step?: number;
};

type Token = { text: string; accent: boolean; delays: number[] };

const vars = (d: number) => ({ "--d": `${d.toFixed(3)}s` }) as CSSProperties;
const split = (text?: string) => (text ?? "").split(/\s+/).filter(Boolean);

/** Calcula el retardo de cada palabra (o letra) en orden de lectura. */
function plan(before: string, accent: string | undefined, after: string | undefined, mode: "words" | "chars", start: number, step: number) {
  const tokens: Token[] = [];
  let t = start;
  const push = (text: string, isAccent: boolean) => {
    const pieces = mode === "chars" && !isAccent ? Array.from(text).length : 1;
    const delays = Array.from({ length: pieces }, (_, i) => t + i * step);
    t += step * (isAccent && mode === "chars" ? Math.max(1, Math.round(text.length / 2)) : pieces);
    tokens.push({ text, accent: isAccent, delays });
  };
  split(before).forEach((w) => push(w, false));
  if (accent) push(accent, true);
  split(after).forEach((w) => push(w, false));
  return tokens;
}

/** Titular animado; `accent` lleva el estilo destacado de la marca. */
export function AnimatedTitle({ before, accent, after, as: Tag = "h1", className, mode = "words", start = 0.6, step }: Props) {
  const tokens = plan(before, accent, after, mode, start, step ?? (mode === "chars" ? 0.028 : 0.08));

  const out: ReactNode[] = [];
  tokens.forEach((tok, i) => {
    if (i > 0) out.push(" ");
    if (tok.accent) {
      // La palabra destacada sube completa: su degradado no admite letras transformadas.
      out.push(
        <span key={i} className="word pr-[0.12em]">
          <span style={vars(tok.delays[0])}>
            <span className="accent-word">{tok.text}</span>
          </span>
        </span>,
      );
    } else if (mode === "chars") {
      out.push(
        <span key={i} className="word-chars">
          {Array.from(tok.text).map((ch, j) => (
            <span key={j} className="char" style={vars(tok.delays[j])}>
              {ch}
            </span>
          ))}
        </span>,
      );
    } else {
      out.push(
        <span key={i} className="word">
          <span style={vars(tok.delays[0])}>{tok.text}</span>
        </span>,
      );
    }
  });

  return <Tag className={className}>{out}</Tag>;
}
