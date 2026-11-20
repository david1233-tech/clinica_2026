import type { Metadata } from "next";
import { ArrowUpRight, ChatCircleText, Clock, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import panoramica from "@/public/panoramica-arequipa.jpg";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SITE, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Visítanos en ${SITE.address}, Yanahuara, o escríbenos al ${SITE.mobile}.`,
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        image={panoramica} imageAlt="Plaza de Armas de Arequipa al atardecer" imagePosition="50% 60%"
        eyebrow="Contacto"
        before="Estamos para"
        accent="ayudarte"
        description="¿Tienes dudas sobre nuestras terapias o productos, o quieres reservar una cita? Escríbenos y te respondemos a la brevedad."
      />

      <section className="container-site grid items-start gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <SpotlightCard className="reveal flex gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
              <MapPin size={24} weight="duotone" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-xl">Dirección</h2>
              <p className="text-sm text-muted">
                {SITE.address}
                <br />
                {SITE.district}
              </p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1 text-sm font-bold text-accent">
                Cómo llegar <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </SpotlightCard>

          <SpotlightCard className="reveal flex gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Phone size={24} weight="duotone" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-xl">Teléfonos</h2>
              <a href={SITE.mobileHref} className="text-sm hover:text-accent">Celular y WhatsApp: {SITE.mobile}</a>
              <a href={SITE.landlineHref} className="text-sm text-muted hover:text-accent">Fijo: {SITE.landline}</a>
            </div>
          </SpotlightCard>

          <SpotlightCard className="reveal flex gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Clock size={24} weight="duotone" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-xl">Horario</h2>
              {SITE.hours.map((h) => (
                <p key={h.days} className="text-sm text-muted">
                  <span className="text-fg">{h.days}:</span> {h.time}
                </p>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="reveal flex flex-col gap-4 p-6">
            <h2 className="font-display text-xl">Síguenos</h2>
            <ul className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
                  >
                    <SocialIcon name={s.name} />
                    <span>{s.name}</span>
                    <span className="ml-auto text-muted">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>

        <div className="card reveal p-6 sm:p-10 lg:col-span-7">
          <div className="mb-8 flex items-center gap-3 border-b border-line pb-6">
            <ChatCircleText size={30} weight="duotone" className="text-accent" aria-hidden="true" />
            <div>
              <h2 className="font-display text-2xl">Envíanos un mensaje</h2>
              <p className="text-sm text-muted">Completa el formulario y lo enviamos por WhatsApp.</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
