"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pausa las animaciones de texto de su contenido hasta que entra en pantalla.
 * Sin JavaScript (o si el observador falla) el texto se muestra igual.
 */
export function InView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`inview ${className}`}>
      {children}
    </div>
  );
}
