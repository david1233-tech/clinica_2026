import type { CSSProperties } from "react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Aurora } from "@/components/ui/Aurora";

type Props = { eyebrow: string; before: string; accent?: string; after?: string; description: string };

/** Cabecera de las páginas internas, con la misma secuencia de entrada que el inicio. */
export function PageHeader({ eyebrow, before, accent, after, description }: Props) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44">
      <Aurora className="opacity-60" />
      <div className="grain" />
      <div className="container-site relative flex flex-col items-start gap-6">
        <span className="eyebrow enter enter-blur" style={{ "--d": "0.35s" } as CSSProperties}>
          <span className="pulse-dot" aria-hidden="true" />
          {eyebrow}
        </span>
        <AnimatedTitle
          before={before}
          accent={accent}
          after={after}
          start={0.45}
          className="max-w-4xl font-display text-5xl font-normal leading-[0.98] tracking-tight text-balance sm:text-7xl"
        />
        <p className="enter enter-rise max-w-2xl text-lg leading-relaxed text-muted" style={{ "--d": "1s" } as CSSProperties}>
          {description}
        </p>
      </div>
    </section>
  );
}
