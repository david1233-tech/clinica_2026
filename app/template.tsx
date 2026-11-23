"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

/**
 * Se vuelve a montar en cada navegación. Transición "cascada": tres capas con
 * los colores de la marca (verde noche, turquesa y lima) suben una tras otra;
 * en la primera aparece el nombre de la sección a la que entras.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const label = NAV_LINKS.find((l) => l.href === pathname)?.label ?? "Vital Salud";

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
        <div className="route-layer bg-[#c6e94b]" style={{ "--d": "0.62s" } as CSSProperties} />
        <div className="route-layer bg-[#2ec4a6]" style={{ "--d": "0.52s" } as CSSProperties} />
        <div className="route-layer grid place-items-center bg-[#061614]" style={{ "--d": "0.42s" } as CSSProperties}>
          <p className="route-label font-display text-[clamp(3rem,10vw,8rem)] font-light italic tracking-tight text-[#eaf6f1]">
            {label.split("").map((ch, i) => (
              <span key={i} className="inline-block" style={{ "--i": i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="page-enter">{children}</div>
    </>
  );
}
