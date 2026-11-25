import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { LogoTree } from "@/components/brand/LogoTree";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Aurora } from "@/components/ui/Aurora";

type Props = {
  eyebrow: string;
  before: string;
  accent?: string;
  after?: string;
  description: string;
  /** Sin foto, la portada usa auroras y el árbol del logo (así ninguna imagen se repite). */
  image?: StaticImageData;
  imageAlt?: string;
  imagePosition?: string;
};

/** Portada a pantalla completa de las páginas internas, con titular animado letra por letra. */
export function PageHeader({ eyebrow, before, accent, after, description, image, imageAlt = "", imagePosition = "50% 50%" }: Props) {
  return (
    <section className="on-dark relative isolate mb-16 flex min-h-[78svh] items-end overflow-hidden bg-[#061614] pb-16 pt-36 sm:mb-24 sm:min-h-[86svh] sm:pb-20">
      {image ? (
        <>
          <div className="kenburns-once absolute inset-0 -z-10">
            <Image src={image} alt={imageAlt} fill preload placeholder="blur" sizes="100vw" className="object-cover" style={{ objectPosition: imagePosition }} />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/10 to-black/50" />
        </>
      ) : (
        <>
          <Aurora className="opacity-90" />
          <LogoTree
            animated
            startDelay={0.6}
            className="pointer-events-none absolute -right-10 bottom-0 -z-10 h-[70%] w-auto text-white/25 opacity-30 sm:right-[4%] sm:opacity-40"
          />
        </>
      )}
      <div className="grain" />
      <div className="container-site relative flex flex-col items-start gap-6">
        <span className="eyebrow eyebrow-in" style={{ "--d": "0.25s" } as CSSProperties}>
          <span className="pulse-dot" aria-hidden="true" />
          {eyebrow}
        </span>
        <AnimatedTitle
          mode="chars"
          before={before}
          accent={accent}
          after={after}
          start={0.4}
          className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.8rem)] font-light leading-[0.98] tracking-tight text-balance"
        />
        <p className="enter enter-rise max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={{ "--d": "1.2s" } as CSSProperties}>
          {description}
        </p>
      </div>
      <div aria-hidden="true" className="enter enter-rise absolute bottom-6 right-6 hidden flex-col items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/60 sm:flex" style={{ "--d": "1.6s" } as CSSProperties}>
        <span className="[writing-mode:vertical-rl]">Desliza</span>
        <span className="scroll-cue h-12 w-px bg-white/40" />
      </div>
    </section>
  );
}
