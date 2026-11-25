import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, Eye, GlobeHemisphereWest, GraduationCap, Target } from "@phosphor-icons/react/ssr";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { CtaBand } from "@/components/ui/CtaBand";
import { InView } from "@/components/ui/InView";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import directora from "@/public/dra-directora.jpg";
import charla from "@/public/local/charla.jpeg";
import libros from "@/public/local/libros.jpeg";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce a la directora del Centro Vital Salud, su trayectoria en medicina natural y nuestra misión en Arequipa.",
  alternates: { canonical: "/nosotros" },
};

const BOOKS = [
  { year: "2009", title: "Sabor de Vida Sana" },
  { year: "2010", title: "La salud está en tus manos" },
  { year: "2012", title: "Sabor que Salva Vidas" },
];

const COUNTRIES = ["Estados Unidos", "México", "República Dominicana", "Colombia", "Brasil", "Chile", "Bolivia", "Uruguay"];

const DIPLOMAS = ["Medicina Natural", "Nutrición Clínica", "Dietoterapia", "Jugoterapia", "Gastronomía Vegetariana"];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        image={charla}
        imageAlt="La directora del Centro Vital Salud dictando una charla de salud ante un auditorio lleno"
        imagePosition="66% 35%"
        eyebrow="Nosotros"
        before="Cuidamos a las familias de Arequipa de forma"
        accent="natural"
        description="Somos un centro de medicina natural, nutrición clínica y bienestar integral en Yanahuara, dirigido por una especialista con más de una década enseñando a prevenir."
      />

      {/* Directora */}
      <section className="container-site grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal relative mx-auto w-full max-w-md lg:sticky lg:top-28">
          <div className="absolute inset-8 -z-10 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 70%)" }} />
          <div className="overflow-hidden rounded-[2.5rem] border border-line bg-white">
            <Image src={directora} alt="Directora del Centro Vital Salud" placeholder="blur" sizes="(min-width: 1024px) 26rem, 90vw" className="h-auto w-full" />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="reveal flex flex-col gap-5">
            <span className="eyebrow">Directora del centro</span>
            <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">Especialista en medicina natural</h2>
            <p className="text-lg leading-relaxed text-muted">
              Licenciada en Medicina Natural por la Universidad Pueblos de Europa, en Lima. Diplomada en Nutrición Clínica y Salud Humana por
              la Universidad Nacional de Trujillo. Promotora de Salud y Estilo de Vida Saludable con el programa{" "}
              <strong className="font-semibold text-fg">«Vivir con Salud»</strong>, enseñando para prevenir.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SpotlightCard className="reveal flex flex-col gap-4 p-6">
              <span className="flex items-center gap-2.5 font-bold text-accent">
                <BookOpen size={22} weight="duotone" aria-hidden="true" /> Autora publicada
              </span>
              <ol className="flex flex-col gap-3">
                {BOOKS.map((b) => (
                  <li key={b.year} className="flex items-baseline gap-3">
                    <span className="font-display text-sm text-muted tabular-nums">{b.year}</span>
                    <span className="font-display text-lg leading-snug">{b.title}</span>
                  </li>
                ))}
              </ol>
            </SpotlightCard>
            <SpotlightCard className="reveal flex flex-col gap-4 p-6">
              <span className="flex items-center gap-2.5 font-bold text-accent">
                <GlobeHemisphereWest size={22} weight="duotone" aria-hidden="true" /> Conferencista internacional
              </span>
              <ul className="flex flex-wrap gap-2">
                {COUNTRIES.map((c) => (
                  <li key={c} className="rounded-full border border-line px-3 py-1 text-xs font-semibold">
                    {c}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>

          <SpotlightCard className="reveal flex flex-col gap-4 p-6">
            <span className="flex items-center gap-2.5 font-bold text-accent">
              <GraduationCap size={22} weight="duotone" aria-hidden="true" /> Docente de diplomados
            </span>
            <ul className="flex flex-wrap gap-2">
              {DIPLOMAS.map((dip) => (
                <li key={dip} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent">
                  {dip}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </section>

      {/* Libros publicados */}
      <section className="container-site mt-28 grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <figure className="reveal-img relative overflow-hidden rounded-[2.5rem] border border-line shadow-[var(--shadow)]">
          <Image
            src={libros}
            alt="Libros publicados: Panadería Saludable, Dieta Saludable y Sabor que Salva Vidas"
            placeholder="blur"
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full"
          />
        </figure>
        <InView className="flex flex-col gap-5">
          <span className="eyebrow eyebrow-in">Autora publicada</span>
          <AnimatedTitle
            as="h2"
            mode="chars"
            before="Libros para comer sano y"
            accent="prevenir"
            start={0.1}
            className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-tight text-balance"
          />
          <p className="enter enter-rise leading-relaxed text-muted" style={{ "--d": "0.7s" } as React.CSSProperties}>
            Recetas nutritivas, panadería saludable y consejos para prevenir y tratar enfermedades de forma natural, escritos por nuestra
            directora para que lleves la prevención a tu mesa.
          </p>
        </InView>
      </section>

      {/* Misión y visión */}
      <section className="container-site mt-28 grid gap-4 md:grid-cols-2">
        {[
          {
            icon: Target,
            title: "Nuestra misión",
            text: "Brindar atención integral de salud natural de alta calidad, promoviendo la prevención y el bienestar físico, mental y emocional de cada paciente mediante terapias personalizadas y productos confiables.",
          },
          {
            icon: Eye,
            title: "Nuestra visión",
            text: "Ser el centro de medicina natural referente en la región, reconocido por la excelencia de nuestros servicios, la calidez humana y nuestro compromiso con la salud integral de la comunidad.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <SpotlightCard key={title} className="reveal flex flex-col gap-5 p-8 sm:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Icon size={28} weight="duotone" aria-hidden="true" />
            </span>
            <h2 className="font-display text-3xl">{title}</h2>
            <p className="text-lg leading-relaxed text-muted">{text}</p>
          </SpotlightCard>
        ))}
      </section>

      {/* Arequipa: declaración tipográfica */}
      <InView className="container-site mt-28">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-line bg-surface px-6 py-16 sm:px-14 sm:py-20">
          <div aria-hidden="true" className="absolute -left-20 -top-24 -z-10 h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--aurora-2), transparent 65%)" }} />
          <span className="eyebrow eyebrow-in">Desde la Ciudad Blanca</span>
          <AnimatedTitle
            as="p"
            mode="chars"
            before="Orgullosamente arequipeños, al servicio de tu"
            accent="salud"
            start={0.15}
            className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-tight text-balance"
          />
        </div>
      </InView>

      <CtaBand />
    </>
  );
}
