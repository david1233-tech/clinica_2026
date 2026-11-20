"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, FacebookLogo, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

const SOCIAL_ICONS = { Facebook: FacebookLogo, TikTok: TiktokLogo, WhatsApp: WhatsappLogo } as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // Todas las páginas del menú abren con una foto oscura: el header va en claro encima.
  const overPhoto = !scrolled && !open && NAV_LINKS.some((l) => l.href === pathname);

  return (
    <>
      <header
        className={`enter enter-drop fixed inset-x-0 top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] sm:px-6 ${overPhoto ? "on-dark" : ""}`}
        style={{ "--d": "0s" } as CSSProperties}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled || open
              ? "border border-line bg-bg/75 shadow-[var(--shadow)] backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <Logo onClick={close} />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-sm font-semibold">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 transition-colors ${
                      isActive(link.href) ? "bg-accent-soft text-accent" : "text-fg/80 hover:text-fg"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden py-3! sm:inline-flex">
              <CalendarCheck size={18} weight="bold" aria-hidden="true" />
              Reservar cita
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 backdrop-blur-md lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              <span className={`absolute h-0.5 w-5 rounded bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-5 rounded bg-fg transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-5 rounded bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] pt-28 backdrop-blur-2xl transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        inert={!open}
      >
        <nav aria-label="Menú móvil" className="flex-1">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className={`transition-all duration-500 ease-out-expo ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`font-display text-4xl font-medium tracking-tight ${isActive(link.href) ? "italic text-accent" : "text-fg"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`flex flex-col gap-5 transition-all delay-300 duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
            <CalendarCheck size={18} weight="bold" aria-hidden="true" />
            Reservar cita por WhatsApp
          </a>
          <div className="flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICONS[s.name];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg transition hover:border-accent hover:text-accent"
                >
                  <Icon size={22} weight="fill" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
