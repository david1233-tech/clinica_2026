import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SpacesGallery } from "@/components/home/SpacesGallery";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { CountUp } from "@/components/ui/CountUp";
import { CtaBand } from "@/components/ui/CtaBand";
import { InView } from "@/components/ui/InView";
import { Marquee } from "@/components/ui/Marquee";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SERVICES, SPECIALTIES } from "@/lib/data/services";
import salonCharlas from "@/public/interior-terapias.jpg";
import fachada from "@/public/local/fachada.jpg";
import patio from "@/public/local/patio-descanso.jpg";

const BOOKS = [
  { year: "2009", title: "Sabor de Vida Sana" },
  { year: "2010", title: "La salud está en tus manos" },
  { year: "2012", title: "Sabor que Salva Vidas" },
];

const COUNTRIES = ["Estados Unidos", "México", "República Dominicana", "Colombia", "Brasil", "Chile", "Bolivia", "Uruguay"];

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const STATS = [
  { to: 3, label: "libros publicados" },
  { to: 8, suffix: "+", label: "países como conferencista" },
  { to: 2009, from: 1990, label: "primer libro publicado" },
  { to: 5, label: "días de atención a la semana" },
];

/* Fotos que no aparecen en el carrusel: cada imagen se usa en un solo lugar del sitio. */
const SPACES = [
  { image: fachada, title: "Nuestra fachada", text: "Av. Víctor Andrés Belaúnde 367, Yanahuara. Te esperamos con la puerta abierta.", position: "47% 50%" },
  { image: patio, title: "Patio de descanso", text: "Plantas colgantes, sillones y luz natural para esperar tu consulta con calma.", position: "50% 70%" },
  { image: salonCharlas, title: "Salón de charlas", text: "Donde dictamos charlas y diplomados sobre alimentación y vida saludable.", position: "50% 60%" },
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
              <dd className="font-display text-5xl font-light text-accent tabular-nums sm:text-6xl">
                <CountUp to={s.to} from={s.from} suffix={s.suffix} />
              </dd>
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
        <InView className="relative order-last lg:order-none">
          <div aria-hidden="true" className="absolute inset-10 -z-10 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 70%)" }} />
          <div className="card flex flex-col gap-6 p-8 sm:p-10">
            <span className="eyebrow">Obras publicadas</span>
            <ol className="flex flex-col divide-y divide-line">
              {BOOKS.map((b, i) => (
                <li key={b.year} className="enter enter-rise flex items-baseline gap-5 py-4" style={d(0.15 + i * 0.12)}>
                  <span className="font-display text-sm text-muted tabular-nums">{b.year}</span>
                  <span className="font-display text-2xl leading-snug sm:text-3xl">{b.title}</span>
                </li>
              ))}
            </ol>
            <div className="enter enter-rise flex flex-wrap gap-2" style={d(0.6)}>
              {COUNTRIES.map((c) => (
                <span key={c} className="rounded-full border border-line px-3 py-1 text-xs font-semibold">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </InView>
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
      <SpacesGallery spaces={SPACES} />

      <CtaBand />
    </>
  );
}
