"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

type Props = { children: ReactNode; className?: string; style?: CSSProperties; as?: "article" | "div" };

/** Tarjeta con un foco de luz que sigue al cursor. */
export function SpotlightCard({ children, className = "", style, as: Tag = "article" }: Props) {
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      onPointerMove={onPointerMove}
      style={style}
      className={`group card spotlight transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[var(--shadow)] ${className}`}
    >
      {children}
    </Tag>
  );
}
