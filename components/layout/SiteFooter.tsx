import Link from "next/link";
import { Clock, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-bg-soft">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--aurora-2), transparent)" }}
      />
      <div className="container-site relative grid gap-12 py-16 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {SITE.slogan}. Medicina natural, nutrición y bienestar integral en el corazón de Yanahuara.
          </p>
          <ul className="flex gap-3" aria-label="Redes sociales">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name}: ${s.handle}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-fg transition duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  <SocialIcon name={s.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Pie de página" className="md:col-span-2">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">Explora</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={SITE.storeUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent transition-opacity hover:opacity-80">
                Tienda en línea ↗<span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">Visítanos</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} weight="duotone" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {SITE.address}
                <br />
                <span className="text-muted">{SITE.district}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <Phone size={18} weight="duotone" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <a href={SITE.mobileHref} className="hover:text-accent">{SITE.mobile}</a>
                <br />
                <a href={SITE.landlineHref} className="text-muted hover:text-accent">{SITE.landline}</a>
              </span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">Horario</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex gap-3">
                <Clock size={18} weight="duotone" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {h.days}
                  <br />
                  <span className="text-muted">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-site relative flex flex-col items-center justify-between gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
        <p>Yanahuara, Arequipa · Perú</p>
      </div>
    </footer>
  );
}
