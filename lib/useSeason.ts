"use client";

import { useSyncExternalStore } from "react";
import { resolveSeason, type Season } from "@/lib/seasons";

const noopSubscribe = () => () => {};

let cachedKey: string | null = null;
let cachedSeason: Season | null = null;

/**
 * Temporada activa calculada en el navegador del visitante. Las páginas son
 * estáticas, así que calcularla en el servidor la congelaría en la fecha del
 * build. En el servidor devuelve `null`; en el cliente, la temporada de hoy
 * (o la indicada con ?temporada=navidad para previsualizar).
 */
export function useSeason(): Season | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const preview = new URLSearchParams(window.location.search).get("temporada") ?? undefined;
      const season = resolveSeason(new Date(), preview);
      if (season.key !== cachedKey) {
        cachedKey = season.key;
        cachedSeason = season;
      }
      return cachedSeason;
    },
    () => null,
  );
}
