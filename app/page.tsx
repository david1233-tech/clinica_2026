import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { SeasonalParticles } from "@/components/effects/SeasonalParticles";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Aurora } from "@/components/ui/Aurora";
import { CtaBand } from "@/components/ui/CtaBand";
import { Marquee } from "@/components/ui/Marquee";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SERVICES, SPECIALTIES } from "@/lib/data/services";
import { SITE } from "@/lib/site";
import directoraFachada from "@/public/hero-vital-salud-movil.jpg";
import directora from "@/public/dra-directora.jpg";
import fachada from "@/public/hero-vital-salud.jpg";
import salaTalleres from "@/public/interior-terapias.jpg";
import patio from "@/public/salonnn-vital.jpg";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const STATS = [
  { value: "3", label: "libros publicados" },
  { value: "8+", label: "países como conferencista" },
  { value: "9–19 h", label: "de lunes a sábado" },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 sm:pt-36">
        <Aurora />
        <SeasonalParticles className="z-0" />
        <div className="grain" />

        <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-7">
            <span className="eyebrow enter enter-blur" style={d(0.5)}>
              <span className="pulse-dot" aria-hidden="true" />
              Medicina natural · Yanahuara, Arequipa
            </span>
            <AnimatedTitle
              before="Tu salud, en manos"
              accent="naturales"
              start={0.65}
              step={0.09}
              className="font-display text-[clamp(2.9rem,7vw,5.8rem)] font-light leading-[0.98] tracking-tight text-balance"
            />
            <p className="enter enter-rise max-w-xl text-lg leading-relaxed text-muted" style={d(1.35)}>
              Medicina naturista, nutrición clínica, psicología y terapias que cuidan tu cuerpo con lo que da la naturaleza.
            </p>
            <div className="enter enter-rise flex flex-wrap gap-3" style={d(1.5)}>
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
                Reservar por WhatsApp
              </a>
              <Link href="/servicios" className="btn btn-ghost">
                Ver servicios
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </Link>
            </div>
            <dl className="enter enter-rise mt-2 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6" style={d(1.7)}>
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-xs tracking-wide text-muted">{s.label}</dt>
                  <dd className="font-display text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Foto de la directora dentro de un arco, guiño a los arcos de sillar de Yanahuara */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div
              className="enter enter-scale absolute -inset-4 bottom-8 rounded-t-full rounded-b-[2.2rem] border-[1.5px] border-accent/50"
              style={{ ...d(0.9), "--dur": "1.2s" } as CSSProperties}
            />
            <div
              className="enter enter-arch relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[var(--shadow)]"
              style={{ ...d(0.4), "--dur": "1.5s" } as CSSProperties}
            >
              <div className="enter enter-zoom absolute inset-0" style={{ ...d(0.4), "--dur": "1.8s" } as CSSProperties}>
                <Image
                  src={directoraFachada}
                  alt="Directora del Centro Vital Salud frente al local en Yanahuara"
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-cover object-[50%_22%]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-bg/70" />
            </div>
            <div
              className="enter enter-rise absolute -left-4 bottom-10 max-w-[15rem] rounded-2xl border border-accent/30 bg-bg/70 px-5 py-4 shadow-xl backdrop-blur-xl sm:-left-12"
              style={d(1.9)}
            >
              <p className="font-display text-lg">Directora del centro</p>
              <p className="text-xs leading-snug text-muted">Lic. en Medicina Natural · Diplomada en Nutrición Clínica</p>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={SPECIALTIES} />

      {/* ============ SERVICIOS ============ */}
      <section className="container-site mt-24 flex flex-col gap-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="eyebrow">Servicios</span>
            <h2 className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              Cuatro caminos hacia tu <em className="text-accent">bienestar</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Cada tratamiento empieza con una evaluación personalizada en nuestro centro de Yanahuara.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <SpotlightCard key={s.slug} className="reveal flex flex-col gap-4 p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <ServiceIcon icon={s.icon} />
              </span>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted">{s.kicker}</span>
              <h3 className="-mt-2 font-display text-2xl">{s.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
              <Link href={`/servicios#${s.slug}`} className="flex items-center gap-1.5 text-sm font-bold text-accent">
                Ver más
                <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ============ DIRECTORA ============ */}
      <section className="container-site mt-28 grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="absolute inset-6 -z-10 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 70%)" }} />
          <div className="overflow-hidden rounded-[2.5rem] border border-line bg-white">
            <Image src={directora} alt="Directora del Centro Vital Salud con bata blanca" placeholder="blur" sizes="(min-width: 1024px) 28rem, 90vw" className="h-auto w-full" />
          </div>
        </div>
        <div className="reveal flex flex-col gap-6">
          <span className="eyebrow">Quién te atiende</span>
          <h2 className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Más de una década <em className="text-accent">enseñando a prevenir</em>
          </h2>
          <p className="leading-relaxed text-muted">
            Licenciada en Medicina Natural por la Universidad Pueblos de Europa y diplomada en Nutrición Clínica y Salud Humana por la
            Universidad Nacional de Trujillo. Promotora del programa «Vivir con Salud», autora de tres libros y conferencista en
            Estados Unidos, México, Colombia, Brasil, Chile, Bolivia, Uruguay y República Dominicana.
          </p>
          <Link href="/nosotros" className="btn btn-ghost self-start">
            Conocer su trayectoria
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ============ ESPACIOS ============ */}
      <section className="container-site mt-28 flex flex-col gap-10">
        <div className="reveal flex max-w-2xl flex-col gap-4">
          <span className="eyebrow">Nuestros espacios</span>
          <h2 className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Un lugar verde y tranquilo en <em className="text-accent">Yanahuara</em>
          </h2>
        </div>
        <div className="grid auto-rows-[16rem] gap-4 md:grid-cols-3 md:auto-rows-[18rem]">
          {[
            { src: patio, alt: "Patio de descanso con plantas y sillones", label: "Patio de descanso", cls: "md:col-span-2" },
            { src: salaTalleres, alt: "Sala de talleres y terapias", label: "Sala de talleres", cls: "md:row-span-2" },
            { src: fachada, alt: "Fachada del Centro Vital Salud", label: SITE.address, cls: "md:col-span-2" },
          ].map((img) => (
            <figure key={img.label} className={`reveal group relative overflow-hidden rounded-[2rem] ${img.cls}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-bg/80 px-4 py-2 text-xs font-bold backdrop-blur-md">
                {img.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
