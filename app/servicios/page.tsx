import type { Metadata } from "next";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import patio from "@/public/local/patio-descanso.jpg";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SERVICES } from "@/lib/data/services";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Medicina naturista, nutrición clínica, psicología y terapias de bienestar en Yanahuara, Arequipa.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        image={patio} imageAlt="Patio de descanso del Centro Vital Salud" imagePosition="50% 65%"
        eyebrow="Servicios"
        before="Tratamientos pensados para tu"
        accent="bienestar"
        after="integral"
        description="Terapias naturales respaldadas por especialistas comprometidos con tu recuperación física y emocional."
      />

      <section className="container-site grid gap-4 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <SpotlightCard key={s.slug} className="reveal flex flex-col gap-6 p-8 sm:p-10">
            <div id={s.slug} className="flex scroll-mt-36 items-start justify-between gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <ServiceIcon icon={s.icon} size={30} />
              </span>
              <span className="font-display text-5xl text-line tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{s.kicker}</span>
              <h2 className="font-display text-3xl sm:text-4xl">{s.title}</h2>
              <p className="leading-relaxed text-muted">{s.summary}</p>
            </div>
            <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
              {s.details.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium">
                  <CheckCircle size={18} weight="duotone" className="shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(`Hola, quisiera información sobre ${s.title.toLowerCase()} en Centro Vital Salud.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-auto self-start"
            >
              <WhatsappLogo size={19} weight="bold" aria-hidden="true" />
              Reservar {s.title.toLowerCase()}
            </a>
          </SpotlightCard>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
