"use client";

import { useRef, type AnimationEvent, type CSSProperties } from "react";
import { LogoTree } from "@/components/brand/LogoTree";
import { useSeason } from "@/lib/useSeason";

/**
 * Bienvenida al entrar: el árbol del logo brota, aparece el saludo de la
 * temporada y una cortina sube revelando la página. Se muestra una vez por
 * sesión (el script del layout la oculta antes del primer pintado si ya se
 * vio) y se puede saltar con un clic.
 */
export function SiteIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const season = useSeason();
  const greeting = season?.greeting ?? "Bienvenido";

  const markSeen = () => {
    try {
      sessionStorage.setItem("vs-intro", "1");
    } catch {}
  };

  const skip = () => {
    document.documentElement.style.setProperty("--intro-delay", "0s");
    ref.current?.classList.add("is-skipped");
    markSeen();
  };

  const onAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) markSeen();
  };

  return (
    <div
      ref={ref}
      className="site-intro fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-bg px-6"
      style={{ "--intro-delay": "0s" } as CSSProperties}
      onClick={skip}
      onAnimationEnd={onAnimationEnd}
      role="presentation"
    >
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute inset-0 opacity-70 blur-3xl"
      >
        <i className="left-[10%] top-[15%] h-[45vmax] w-[45vmax]" style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 65%)" }} />
        <i className="right-[5%] bottom-[5%] h-[40vmax] w-[40vmax]" style={{ background: "radial-gradient(circle, var(--aurora-2), transparent 65%)", animationDelay: "-7s" }} />
      </div>
      <div className="relative flex max-w-3xl flex-col items-center gap-6 text-center">
        <LogoTree animated className="h-28 w-32 text-[#3A3A3A] dark:text-[#cfe3dc] sm:h-36 sm:w-40" />
        <p className="enter enter-blur text-xs font-bold uppercase tracking-[0.32em] text-accent" style={{ "--d": "0.9s" } as CSSProperties}>
          Centro Vital Salud
        </p>
        <p key={greeting} className="font-display text-5xl font-medium tracking-tight sm:text-7xl">
          {greeting.split(" ").map((word, i) => (
            <span key={i} className="word mx-[0.12em]">
              <span style={{ "--d": `${(1.05 + i * 0.1).toFixed(2)}s` } as CSSProperties}>{word}</span>
            </span>
          ))}
        </p>
        <p className="enter enter-rise max-w-md text-base text-muted sm:text-lg" style={{ "--d": "1.5s" } as CSSProperties}>
          {season?.message ?? "Tu salud, en manos naturales."}
        </p>
        <p className="enter enter-rise text-xs text-muted/70" style={{ "--d": "1.8s" } as CSSProperties}>
          Toca para continuar
        </p>
      </div>
    </div>
  );
}
