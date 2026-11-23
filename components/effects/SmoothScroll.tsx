"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { prefersReducedMotion } from "@/lib/motion";

/** Desplazamiento suave con inercia (Lenis). Se desactiva con "reducir movimiento". */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -96 }, autoRaf: false });
    let raf = 0;
    const loop = (time: number) => {
      // Durante la bienvenida o con el menú móvil abierto la página está bloqueada; Lenis espera.
      if (document.documentElement.style.overflow === "hidden" || document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
