"use client";

import { Moon, Sun } from "@phosphor-icons/react";

/**
 * Alterna claro/oscuro. El tema real vive en <html data-theme>, fijado antes
 * del primer pintado por el script del layout, así que el icono se resuelve
 * solo con CSS y no hay parpadeo ni desajuste de hidratación.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("vs-theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-line bg-surface/60 text-fg backdrop-blur-md transition hover:border-accent ${className}`}
      aria-label="Cambiar entre modo claro y oscuro"
      title="Cambiar tema"
    >
      <Moon size={19} weight="duotone" className="transition-transform duration-500 group-hover:-rotate-12 dark:hidden" />
      <Sun size={20} weight="duotone" className="hidden transition-transform duration-700 group-hover:rotate-90 dark:block" />
    </button>
  );
}
