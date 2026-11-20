import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { CtaBand } from "@/components/ui/CtaBand";
import { InView } from "@/components/ui/InView";
import { Marquee } from "@/components/ui/Marquee";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SERVICES, SPECIALTIES } from "@/lib/data/services";
import { SITE } from "@/lib/site";
import directora from "@/public/dra-directora.jpg";
import fachada from "@/public/hero-vital-salud.jpg";
import salaTalleres from "@/public/interior-terapias.jpg";
import patio from "@/public/salonnn-vital.jpg";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const STATS = [
  { value: "3", label: "libros publicados" },
  { value: "8+", label: "países como conferencista" },
  { value: "2009", label: "primer libro publicado" },
  { value: "6", label: "días de atención a la semana" },
];

const headingClass = "font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.02] tracking-tight text-balance";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <Marquee items={SPECIALTIES} />

      {/* ============ CIFRAS ============ */}
      <InView className="container-site mt-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="enter enter-rise flex flex-col-reverse gap-2 bg-bg p-6 sm:p-8" style={d(0.1 + i * 0.1)}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-5xl font-light text-accent tabular-nums sm:text-6xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </InView>

      {/* ============ SERVICIOS ============ */}
      <section className="container-site mt-28 flex flex-col gap-10">
        <InView className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="eyebrow eyebrow-in">Servicios</span>
            <AnimatedTitle as="h2" mode="chars" before="Cuatro caminos hacia tu" accent="bienestar" start={0.1} className={headingClass} />
          </div>
          <p className="enter enter-rise max-w-sm text-muted" style={d(0.6)}>
            Cada tratamiento empieza con una evaluación personalizada en nuestro centro de Yanahuara.
          </p>
        </InView>
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
            <Image src={directora} alt="Directora del Centro Vital Salud con bata blanca" placeholder="blur" sizes="(min-width: 1024px) 28rem, 90vw" className="h-auto w-full transition-transform duration-[1.4s] ease-out-expo hover:scale-105" />
          </div>
        </div>
        <InView className="flex flex-col gap-6">
          <span className="eyebrow eyebrow-in">Quién te atiende</span>
          <AnimatedTitle as="h2" mode="chars" before="Más de una década enseñando a" accent="prevenir" start={0.1} className={headingClass} />
          <p className="enter enter-rise leading-relaxed text-muted" style={d(0.8)}>
            Licenciada en Medicina Natural por la Universidad Pueblos de Europa y diplomada en Nutrición Clínica y Salud Humana por la
            Universidad Nacional de Trujillo. Promotora del programa «Vivir con Salud», autora de tres libros y conferencista en
            Estados Unidos, México, Colombia, Brasil, Chile, Bolivia, Uruguay y República Dominicana.
          </p>
          <div className="enter enter-rise" style={d(1)}>
            <Link href="/nosotros" className="btn btn-ghost">
              Conocer su trayectoria
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </InView>
      </section>

      {/* ============ ESPACIOS ============ */}
      <section className="container-site mt-28 flex flex-col gap-10">
        <InView className="flex max-w-2xl flex-col gap-4">
          <span className="eyebrow eyebrow-in">Nuestros espacios</span>
          <AnimatedTitle as="h2" mode="chars" before="Un lugar verde y tranquilo en" accent="Yanahuara" start={0.1} className={headingClass} />
        </InView>
        <div className="grid auto-rows-[15rem] gap-4 sm:auto-rows-[18rem] md:grid-cols-3">
          {[
            { src: patio, alt: "Patio de descanso con plantas y sillones", label: "Patio de descanso", cls: "md:col-span-2" },
            { src: salaTalleres, alt: "Sala de talleres y terapias", label: "Sala de talleres", cls: "row-span-2 md:row-span-2" },
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-bg/85 px-4 py-2 text-xs font-bold backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
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
