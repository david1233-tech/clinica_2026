"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, CaretLeft, CaretRight, WhatsappLogo } from "@phosphor-icons/react";
import { SeasonalParticles } from "@/components/effects/SeasonalParticles";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/lib/site";
import directoraFachada from "@/public/hero-vital-salud-movil.jpg";
import fachada from "@/public/hero-vital-salud.jpg";
import interiorTienda from "@/public/local/interior-tienda.jpg";
import patio from "@/public/local/patio-descanso.jpg";
import salaTalleres from "@/public/local/sala-talleres.jpg";

type Slide = {
  label: string;
  image: StaticImageData;
  imageMobile?: StaticImageData;
  alt: string;
  position: string;
  eyebrow: string;
  before: string;
  accent: string;
  text: string;
};

const SLIDES: Slide[] = [
  {
    label: "Tienda saludable",
    image: interiorTienda,
    alt: "Interior de la tienda saludable del Centro Vital Salud",
    position: "50% 58%",
    eyebrow: "Tienda saludable · Yanahuara",
    before: "Tu salud, en manos",
    accent: "naturales",
    text: "Medicina naturista, nutrición clínica, psicología, terapias y productos naturales seleccionados por especialistas.",
  },
  {
    label: "Nuestro centro",
    image: fachada,
    imageMobile: directoraFachada,
    alt: "Directora del Centro Vital Salud frente a la tienda saludable",
    position: "68% 40%",
    eyebrow: "Cuidando para prevenir",
    before: "Medicina natural con respaldo",
    accent: "profesional",
    text: "Una especialista con más de una década enseñando a prevenir, autora de tres libros y conferencista internacional.",
  },
  {
    label: "Espacios",
    image: patio,
    alt: "Patio de descanso del centro con plantas colgantes y sillones",
    position: "50% 62%",
    eyebrow: "Patio de descanso",
    before: "Un refugio verde para tu",
    accent: "bienestar",
    text: `Un espacio tranquilo para esperar tu consulta o descansar después de tu terapia, en ${SITE.address}.`,
  },
  {
    label: "Talleres",
    image: salaTalleres,
    alt: "Sala de talleres y diplomados del centro",
    position: "50% 55%",
    eyebrow: "Sala de talleres",
    before: "Aprende a cuidarte con",
    accent: "expertos",
    text: "Diplomados y talleres de medicina natural, nutrición clínica, jugoterapia y gastronomía vegetariana.",
  },
];

const SLIDE_MS = 7000;
const pad = (n: number) => String(n).padStart(2, "0");

/** Portada a pantalla completa: fotos con zoom lento, barrido entre diapositivas y textos animados. */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (to: number) => {
    const target = (to + SLIDES.length) % SLIDES.length;
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

  const onProgressEnd = () => {
    if (prefersReducedMotion()) return;
    go(index + 1);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") touchX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  const slide = SLIDES[index];
  // Tras el primer cambio, los textos ya no esperan a la bienvenida.
  const delayVars = (cycle > 0 ? { "--intro-delay": "0s" } : {}) as CSSProperties;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Presentación del Centro Vital Salud"
      className={`on-dark relative isolate h-[100svh] min-h-[36rem] w-full touch-pan-y overflow-hidden bg-[#061614] ${paused ? "hero-paused" : ""}`}
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
      <h1 className="sr-only">
        {SITE.name}: {SITE.slogan}. Medicina naturista en Yanahuara, Arequipa
      </h1>

      {/* Fotografías */}
      {SLIDES.map((s, i) => (
        <div
          key={s.label}
          className="slide absolute inset-0 overflow-hidden"
          data-state={i === index ? "active" : i === prev ? "prev" : undefined}
          data-first={i === 0 && cycle === 0 ? "" : undefined}
          aria-hidden={i !== index}
        >
          <div className="kenburns absolute inset-0">
            <Image
              src={s.image}
              alt={s.alt}
              fill
              preload={i === 0}
              placeholder="blur"
              quality={i === 0 ? 90 : 75}
              sizes="100vw"
              className={`object-cover ${s.imageMobile ? "hidden sm:block" : ""}`}
              style={{ objectPosition: s.position }}
            />
            {s.imageMobile && (
              <Image src={s.imageMobile} alt={s.alt} fill placeholder="blur" sizes="100vw" className="object-cover object-[50%_25%] sm:hidden" />
            )}
          </div>
        </div>
      ))}

      {/* Velos para legibilidad */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-black/80 via-black/40 to-black/5" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/85 via-transparent to-black/45" />
      <SeasonalParticles className="z-[4]" />
      <div className="grain z-[4]" />

      {/* Texto de la diapositiva activa (se vuelve a montar para repetir la entrada) */}
      <div className="container-site relative z-10 flex h-full flex-col justify-end pb-36 pt-28 sm:justify-center sm:pb-28">
        <div key={index} className="flex max-w-3xl flex-col gap-6" aria-live={paused ? "polite" : "off"}>
          <span className="eyebrow eyebrow-in" style={{ "--d": "0.2s" } as CSSProperties}>
            <span className="pulse-dot" aria-hidden="true" />
            {slide.eyebrow}
          </span>
          <AnimatedTitle
            as="p"
            mode="chars"
            before={slide.before}
            accent={slide.accent}
            start={0.35}
            className="font-display text-[clamp(2.6rem,7.2vw,6.4rem)] font-light leading-[0.98] tracking-tight text-balance"
          />
          <p className="enter enter-rise max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={{ "--d": "1.1s" } as CSSProperties}>
            {slide.text}
          </p>
          <div className="enter enter-rise flex flex-wrap gap-3" style={{ "--d": "1.3s" } as CSSProperties}>
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
              Reservar por WhatsApp
            </a>
            <Link href="/servicios" className="btn btn-ghost">
              Ver servicios
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]">
        <div className="container-site enter enter-rise flex items-end gap-4 sm:gap-8" style={{ "--d": "1.6s" } as CSSProperties}>
          <p className="font-display text-white tabular-nums" aria-live="polite">
            <span className="text-4xl sm:text-5xl">{pad(index + 1)}</span>
            <span className="ml-1 text-sm text-white/60">/ {pad(SLIDES.length)}</span>
          </p>
          <div className="flex flex-1 gap-2 pb-3 sm:gap-4">
            {SLIDES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => go(i)}
                className="group flex flex-1 flex-col gap-2 text-left"
                aria-label={`Ir a la diapositiva ${i + 1}: ${s.label}`}
                aria-current={i === index ? "true" : undefined}
              >
                <span className="hidden text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/60 transition group-hover:text-white md:block">
                  {s.label}
                </span>
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
                  {i < index && <span className="absolute inset-0 bg-white/70" />}
                  {i === index && (
                    <span
                      key={`${index}-${cycle}`}
                      className="hero-progress absolute inset-0 bg-[#c6e94b]"
                      style={{ animationDelay: cycle === 0 ? "var(--intro-delay)" : "0s" }}
                      onAnimationEnd={onProgressEnd}
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
              aria-label="Diapositiva anterior"
            >
              <CaretLeft size={20} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#061614] sm:h-12 sm:w-12"
              aria-label="Diapositiva siguiente"
            >
              <CaretRight size={20} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
