"use client";

import type { CSSProperties } from "react";
import { Confetti, Flag, Flower, Gift, Heart, Leaf, Plant, Snowflake, Sparkle, Sun, type Icon } from "@phosphor-icons/react";
import type { EffectKey } from "@/lib/seasons";
import { useSeason } from "@/lib/useSeason";

const ICONS: Record<EffectKey, Icon> = {
  navidad: Gift,
  "anio-nuevo": Sparkle,
  "san-valentin": Heart,
  "dia-madre": Flower,
  "dia-padre": Leaf,
  "fiestas-patrias": Flag,
  "aniversario-arequipa": Confetti,
  primavera: Plant,
  verano: Sun,
  otono: Leaf,
  invierno: Snowflake,
};

/** Saludo de la fecha o estación activa en la portada del inicio (cambia solo con el calendario). */
export function SeasonalGreeting() {
  const season = useSeason();
  if (!season) return null;
  const IconCmp = ICONS[season.effect];

  return (
    <div
      className="season-greet flex max-w-[min(26rem,calc(100vw-2rem))] items-center gap-3 rounded-full border border-white/20 bg-white/10 py-2 pl-2 pr-5 text-white shadow-[0_10px_40px_-10px_rgb(0_0_0/0.5)] backdrop-blur-md"
      style={{ "--d": "1.8s" } as CSSProperties}
    >
      <span className="season-greet-icon grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#c6e94b] text-[#061614]">
        <IconCmp size={19} weight="fill" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-bold">{season.greeting}</span>
        <span className="truncate text-xs text-white/70">{season.message}</span>
      </span>
    </div>
  );
}
