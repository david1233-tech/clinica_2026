import type { CSSProperties } from "react";

type Props = {
  before: string;
  accent?: string;
  after?: string;
  as?: "h1" | "h2";
  className?: string;
  /** Segundo en que entra la primera palabra (se suma a la bienvenida). */
  start?: number;
  step?: number;
};

/** Titular que entra palabra por palabra; `accent` lleva el estilo destacado. */
export function AnimatedTitle({ before, accent, after, as: Tag = "h1", className, start = 0.6, step = 0.08 }: Props) {
  let i = 0;
  const delay = () => ({ "--d": `${(start + step * i++).toFixed(2)}s` }) as CSSProperties;
  const words = (text?: string) =>
    (text ?? "")
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, style: delay() }));

  const first = words(before);
  const accentStyle = accent ? delay() : undefined;
  const last = words(after);

  return (
    <Tag className={className}>
      {first.map(({ word, style }, k) => (
        <span key={`b${k}`}>
          <span className="word">
            <span style={style}>{word}</span>
          </span>{" "}
        </span>
      ))}
      {accent && (
        <span className="word pr-[0.12em]">
          <span style={accentStyle}>
            <span className="accent-word">{accent}</span>
          </span>
        </span>
      )}
      {last.map(({ word, style }, k) => (
        <span key={`a${k}`}>
          {" "}
          <span className="word">
            <span style={style}>{word}</span>
          </span>
        </span>
      ))}
    </Tag>
  );
}
