export type EffectKey =
  | "navidad"
  | "anio-nuevo"
  | "san-valentin"
  | "dia-madre"
  | "dia-padre"
  | "fiestas-patrias"
  | "aniversario-arequipa"
  | "primavera"
  | "verano"
  | "otono"
  | "invierno";

export type Season = {
  key: string;
  greeting: string;
  message: string;
  effect: EffectKey;
};

type CustomEvent = Season & {
  /** Formato "MM-DD", ambos días incluidos. */
  from: string;
  to: string;
};

/**
 * Fechas personalizadas del administrador (aniversario, campañas, etc.).
 * Tienen la prioridad más alta. Ejemplo:
 * { key: "aniversario", from: "08-10", to: "08-16", greeting: "Feliz aniversario",
 *   message: "Gracias por cuidarte con nosotros.", effect: "anio-nuevo" }
 */
export const CUSTOM_EVENTS: CustomEvent[] = [];

const SEASONS: Record<EffectKey, Season> = {
  navidad: {
    key: "navidad",
    greeting: "Feliz Navidad",
    message: "Que la salud y la paz acompañen a tu familia.",
    effect: "navidad",
  },
  "anio-nuevo": {
    key: "anio-nuevo",
    greeting: "Feliz Año Nuevo",
    message: "Un año más para cuidarte de forma natural.",
    effect: "anio-nuevo",
  },
  "san-valentin": {
    key: "san-valentin",
    greeting: "Feliz Día del Amor y la Amistad",
    message: "Cuidarte también es una forma de querer.",
    effect: "san-valentin",
  },
  "dia-madre": {
    key: "dia-madre",
    greeting: "Feliz Día de la Madre",
    message: "Para quien siempre cuida de todos.",
    effect: "dia-madre",
  },
  "dia-padre": {
    key: "dia-padre",
    greeting: "Feliz Día del Padre",
    message: "Salud y bienestar para papá.",
    effect: "dia-padre",
  },
  "fiestas-patrias": {
    key: "fiestas-patrias",
    greeting: "Felices Fiestas Patrias",
    message: "Celebremos al Perú con salud.",
    effect: "fiestas-patrias",
  },
  "aniversario-arequipa": {
    key: "aniversario-arequipa",
    greeting: "Feliz aniversario, Arequipa",
    message: "Orgullosos de cuidar la salud de la Ciudad Blanca.",
    effect: "aniversario-arequipa",
  },
  primavera: {
    key: "primavera",
    greeting: "Feliz Primavera",
    message: "Todo florece cuando te cuidas.",
    effect: "primavera",
  },
  verano: {
    key: "verano",
    greeting: "Feliz Verano",
    message: "Energía y bienestar para los días de sol.",
    effect: "verano",
  },
  otono: {
    key: "otono",
    greeting: "Feliz Otoño",
    message: "Buen momento para fortalecer tus defensas.",
    effect: "otono",
  },
  invierno: {
    key: "invierno",
    greeting: "Feliz Invierno",
    message: "Abrígate y cuida tu salud esta temporada.",
    effect: "invierno",
  },
};

export const SEASON_KEYS = Object.keys(SEASONS) as EffectKey[];

const toMd = (month: number, day: number) => month * 100 + day;
const parseMd = (value: string) => {
  const [month, day] = value.split("-").map(Number);
  return toMd(month, day);
};

/** Rango inclusivo que puede cruzar el fin de año (ej. 12-28 al 01-06). */
const inRange = (md: number, from: number, to: number) =>
  from <= to ? md >= from && md <= to : md >= from || md <= to;

const nthSunday = (year: number, month: number, n: number) => {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  return 1 + ((7 - firstWeekday) % 7) + 7 * (n - 1);
};

/** Fecha calendario en Arequipa, sin depender de la zona del servidor. */
const limaDate = (now: Date) => {
  const [year, month, day] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
  })
    .format(now)
    .split("-")
    .map(Number);
  return { year, month, day };
};

/**
 * Devuelve la temporada activa. Prioridad: fecha personalizada, luego evento
 * especial, luego estación. `preview` permite forzar una con ?temporada=navidad.
 */
export function resolveSeason(now: Date, preview?: string): Season {
  if (preview) {
    const custom = CUSTOM_EVENTS.find((event) => event.key === preview);
    if (custom) return custom;
    if (preview in SEASONS) return SEASONS[preview as EffectKey];
  }

  const { year, month, day } = limaDate(now);
  const md = toMd(month, day);

  const custom = CUSTOM_EVENTS.find((event) =>
    inRange(md, parseMd(event.from), parseMd(event.to)),
  );
  if (custom) return custom;

  const mothersDay = nthSunday(year, 5, 2);
  const fathersDay = nthSunday(year, 6, 3);

  if (inRange(md, 1115, 1227)) return SEASONS.navidad;
  if (inRange(md, 1228, 106)) return SEASONS["anio-nuevo"];
  if (inRange(md, 207, 214)) return SEASONS["san-valentin"];
  if (inRange(md, toMd(5, mothersDay - 7), toMd(5, mothersDay)))
    return SEASONS["dia-madre"];
  if (inRange(md, toMd(6, fathersDay - 7), toMd(6, fathersDay)))
    return SEASONS["dia-padre"];
  if (inRange(md, 715, 731)) return SEASONS["fiestas-patrias"];
  if (inRange(md, 808, 815)) return SEASONS["aniversario-arequipa"];

  if (inRange(md, 923, 1220)) return SEASONS.primavera;
  if (inRange(md, 1221, 320)) return SEASONS.verano;
  if (inRange(md, 321, 620)) return SEASONS.otono;
  return SEASONS.invierno;
}
