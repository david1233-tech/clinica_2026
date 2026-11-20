import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { LogoTree } from "@/components/brand/LogoTree";
import { SITE } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="container-site reveal mt-24">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-line bg-surface px-6 py-14 sm:px-14 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 65%)" }}
        />
        <LogoTree className="absolute -bottom-6 right-6 -z-10 hidden h-56 w-64 text-fg/20 opacity-40 md:block" />
        <div className="flex max-w-2xl flex-col gap-6">
          <span className="eyebrow">Tu primera consulta</span>
          <h2 className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Empieza hoy a cuidarte de forma <em className="text-accent">natural</em>
          </h2>
          <p className="text-muted">
            Escríbenos por WhatsApp al {SITE.mobile} y reserva tu evaluación en Yanahuara.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
              Reservar por WhatsApp
            </a>
            <Link href="/contacto" className="btn btn-ghost">
              Cómo llegar
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
