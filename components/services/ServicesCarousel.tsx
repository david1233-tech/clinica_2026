"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowDown, CaretLeft, CaretRight, WhatsappLogo } from "@phosphor-icons/react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SERVICES } from "@/lib/data/services";
import { prefersReducedMotion } from "@/lib/motion";
import { whatsappLink } from "@/lib/site";
import medicina from "@/public/local/servicio-medicina-naturista.png";
import nutricion from "@/public/local/servicio-nutricion.png";
import psicologia from "@/public/local/servicio-psicologia.png";
import terapias from "@/public/local/servicio-terapias.png";

/**
 * Foto de referencia de cada servicio. El texto va a la izquierda, así que se encuadra
 * (o se refleja) para que las personas queden a la derecha en escritorio.
 */
const PHOTOS: Record<string, { image: StaticImageData; alt: string; position: string; positionMobile?: string; flip?: boolean }> = {
  "medicina-naturista": { image: medicina, alt: "Hierbas medicinales, flores secas y mortero sobre una mesa de madera", position: "50% 50%", positionMobile: "70% 50%" },
  "nutricion-clinica": { image: nutricion, alt: "Nutricionista con una naranja y una pesa junto a un bowl de frutas y verduras", position: "70% 30%", positionMobile: "80% 30%" },
  psicologia: { image: psicologia, alt: "Especialista conversando con una paciente en consulta", position: "50% 30%", positionMobile: "25% 30%", flip: true },
  "terapias-de-bienestar": { image: terapias, alt: "Paciente relajada recibiendo una terapia de bienestar", position: "62% 45%", positionMobile: "50% 40%" },
};

/** Luz de color propia de cada servicio, sobre la foto. */
const MOODS = [
  { a: "rgb(46 196 166 / 0.55)", b: "rgb(198 233 75 / 0.35)" },
  { a: "rgb(255 194 60 / 0.45)", b: "rgb(156 196 58 / 0.4)" },
  { a: "rgb(120 110 220 / 0.4)", b: "rgb(46 196 166 / 0.35)" },
  { a: "rgb(60 194 170 / 0.5)", b: "rgb(29 85 96 / 0.7)" },
];

const SLIDE_MS = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

/** Portada de Servicios: carrusel automático a pantalla completa con cada servicio. */
export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (to: number) => {
    const target = (to + SERVICES.length) % SERVICES.length;
    if (target === index) return;
    setPrev(index);
    setIndex(target);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") touchX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  const s = SERVICES[index];
  const delayVars = (cycle > 0 ? { "--intro-delay": "0s" } : {}) as CSSProperties;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Nuestros servicios"
      className={`on-dark relative isolate mb-16 h-[100svh] min-h-[38rem] w-full touch-pan-y overflow-hidden bg-[#061614] sm:mb-24 ${paused ? "hero-paused" : ""}`}
      style={{ ...delayVars, "--slide-ms": `${SLIDE_MS}ms` } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <h1 className="sr-only">Servicios del Centro Vital Salud</h1>

      {/* Foto + luz de color de cada servicio */}
      {SERVICES.map((svc, i) => {
        const photo = PHOTOS[svc.slug];
        return (
          <div
            key={svc.slug}
            aria-hidden={i !== index}
            className="slide absolute inset-0 overflow-hidden bg-[#061614]"
            data-state={i === index ? "active" : i === prev ? "prev" : undefined}
            data-first={i === 0 && cycle === 0 ? "" : undefined}
          >
            <div className="kenburns absolute inset-0">
              {photo && (
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  preload={i === 0}
                  placeholder="blur"
                  sizes="100vw"
                  className={`object-cover object-[var(--pos-m)] sm:object-[var(--pos)] ${photo.flip ? "-scale-x-100" : ""}`}
                  style={{ "--pos": photo.position, "--pos-m": photo.positionMobile ?? photo.position } as CSSProperties}
                />
              )}
              <div className="absolute -left-[10%] -top-[20%] h-[80%] w-[70%] rounded-full mix-blend-soft-light blur-3xl" style={{ background: `radial-gradient(circle, ${MOODS[i].a}, transparent 65%)` }} />
              <div className="absolute -bottom-[25%] right-[-10%] h-[85%] w-[70%] rounded-full mix-blend-soft-light blur-3xl" style={{ background: `radial-gradient(circle, ${MOODS[i].b}, transparent 65%)` }} />
            </div>
            {/* Número gigante de contorno */}
            <span
              aria-hidden="true"
              className="absolute -bottom-[0.18em] right-[2vw] z-[2] font-display text-[clamp(14rem,38vw,34rem)] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.18)]"
            >
              {pad(i + 1)}
            </span>
          </div>
        );
      })}

      {/* Velos para legibilidad del texto */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-[#061614]/90 via-[#061614]/55 to-[#061614]/5" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[#061614]/90 via-transparent to-[#061614]/50" />
      <div className="grain z-[4]" />

      {/* Texto del servicio activo */}
      <div className="container-site relative z-10 flex h-full flex-col justify-end pb-40 pt-28 sm:justify-center sm:pb-28">
        <div key={index} className="flex max-w-2xl flex-col gap-5" aria-live={paused ? "polite" : "off"}>
          <span aria-hidden="true" className="svc-icon grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/10 text-[#c6e94b] backdrop-blur-md sm:h-16 sm:w-16">
            <ServiceIcon icon={s.icon} size={30} />
          </span>
          <span className="eyebrow eyebrow-in" style={{ "--d": "0.15s" } as CSSProperties}>
            <span className="pulse-dot" aria-hidden="true" />
            Servicio {pad(index + 1)} · {s.kicker}
          </span>
          <AnimatedTitle
            as="h2"
            mode="chars"
            before={s.title.split(" ").slice(0, -1).join(" ")}
            accent={s.title.split(" ").slice(-1)[0]}
            start={0.3}
            className="font-display text-[clamp(2.8rem,7.5vw,6.6rem)] font-light leading-[0.98] tracking-tight text-balance"
          />
          <p className="enter enter-rise max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={{ "--d": "0.9s" } as CSSProperties}>
            {s.summary}
          </p>
          <ul className="enter enter-rise flex flex-wrap gap-2" style={{ "--d": "1.05s" } as CSSProperties}>
            {s.details.map((d) => (
              <li key={d} className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
                {d}
              </li>
            ))}
          </ul>
          <div className="enter enter-rise flex flex-wrap gap-3 pt-1" style={{ "--d": "1.2s" } as CSSProperties}>
            <a
              href={whatsappLink(`Hola, quisiera información sobre ${s.title.toLowerCase()} en Centro Vital Salud.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsappLogo size={19} weight="bold" aria-hidden="true" />
              Reservar
            </a>
            <a href={`#${s.slug}`} className="btn btn-ghost">
              Ver detalles
              <ArrowDown size={17} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]">
        <div className="container-site enter enter-rise flex items-end gap-4 sm:gap-8" style={{ "--d": "1.4s" } as CSSProperties}>
          <p className="font-display text-white tabular-nums">
            <span className="text-4xl sm:text-5xl">{pad(index + 1)}</span>
            <span className="ml-1 text-sm text-white/60">/ {pad(SERVICES.length)}</span>
          </p>
          <div className="flex flex-1 gap-2 pb-3 sm:gap-4">
            {SERVICES.map((svc, i) => (
              <button
                key={svc.slug}
                type="button"
                onClick={() => go(i)}
                className="group flex flex-1 flex-col gap-2 text-left"
                aria-label={`Ver ${svc.title}`}
                aria-current={i === index ? "true" : undefined}
              >
                <span className="hidden text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/60 transition group-hover:text-white md:block">
                  {svc.title}
                </span>
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
                  {i < index && <span className="absolute inset-0 bg-white/70" />}
                  {i === index && (
                    <span
                      key={`${index}-${cycle}`}
                      className="hero-progress absolute inset-0 bg-[#c6e94b]"
                      style={{ animationDelay: cycle === 0 ? "var(--intro-delay)" : "0s" }}
                      onAnimationEnd={() => !prefersReducedMotion() && go(index + 1)}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#061614] sm:h-12 sm:w-12"
              aria-label="Servicio anterior"
            >
              <CaretLeft size={20} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#061614] sm:h-12 sm:w-12"
              aria-label="Servicio siguiente"
            >
              <CaretRight size={20} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
