"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { prefersReducedMotion } from "@/lib/motion";

type Space = { image: StaticImageData; title: string; text: string; position?: string };

/**
 * Galería horizontal "fijada": en escritorio la sección se queda quieta y las
 * fotos se desplazan de lado mientras haces scroll. En móvil se desliza con el dedo.
 */
export function SpacesGallery({ spaces }: { spaces: Space[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const layout = () => {
      if (!desktop.matches || prefersReducedMotion()) {
        sec.style.height = "";
        tr.style.transform = "";
        return;
      }
      const distance = tr.scrollWidth - window.innerWidth;
      sec.style.height = `${window.innerHeight + Math.max(0, distance)}px`;
      update();
    };
    const update = () => {
      if (!desktop.matches || prefersReducedMotion()) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const distance = tr.scrollWidth - window.innerWidth;
      tr.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      sec.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    desktop.addEventListener("change", layout);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      desktop.removeEventListener("change", layout);
    };
  }, []);

  return (
    <section ref={section} className="relative mt-28" aria-label="Nuestros espacios">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-8 lg:snap-none lg:overflow-visible lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[10vw] lg:will-change-transform"
        >
          <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-center gap-5 sm:w-[24rem] lg:w-[30rem]">
            <span className="eyebrow">Nuestros espacios</span>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1] tracking-tight text-balance">
              Recorre el centro <em className="text-accent">por dentro</em>
            </h2>
            <p className="max-w-sm text-muted">
              Desde la tienda saludable hasta la sala de talleres: espacios pensados para que te sientas en casa.
            </p>
            <p className="hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted lg:flex">
              <span className="h-px w-10 bg-current" /> Sigue bajando
            </p>
          </div>
          {spaces.map((s, i) => (
            <figure
              key={s.title}
              className="group relative h-[62svh] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[2rem] sm:w-[26rem] lg:h-[72svh] lg:w-[34rem]"
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 34rem, 80vw"
                className="scale-110 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-100"
                style={{ objectPosition: s.position ?? "50% 50%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white sm:p-8">
                <span className="font-display text-sm text-white/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-3xl leading-tight">{s.title}</span>
                <span className="max-w-xs translate-y-2 text-sm text-white/80 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                  {s.text}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-8 hidden lg:block">
          <div className="container-site">
            <div className="h-px w-full bg-line">
              <div className="h-full origin-left bg-accent" style={{ transform: "scaleX(var(--p, 0))" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
