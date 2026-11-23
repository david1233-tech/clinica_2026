/**
 * Única fuente de verdad para los datos del negocio. Cualquier teléfono,
 * dirección, horario o red social que aparezca en el sitio sale de aquí.
 */
const WHATSAPP_NUMBER = "51976371809";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: "Centro Vital Salud",
  shortName: "VitalSalud",
  slogan: "Tu salud, en manos naturales",
  description:
    "Medicina naturista, nutrición clínica, psicología, terapias y productos naturales en Yanahuara, Arequipa.",
  address: "Av. Víctor Andrés Belaúnde 367",
  district: "Yanahuara, Arequipa - Perú",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Av. Víctor Andrés Belaúnde 367, Yanahuara, Arequipa"),
  mobile: "976 371 809",
  mobileHref: "tel:+51976371809",
  landline: "(054) 692940",
  landlineHref: "tel:+5154692940",
  hours: [
    { days: "Lunes a sábado", time: "9:00 a 19:00" },
    { days: "Domingos", time: "Previa cita" },
  ],
  whatsappUrl: whatsappLink("Hola, quisiera reservar una cita en Centro Vital Salud."),
  /** Tienda en línea (sitio externo de biller.pe). Se abre en una pestaña nueva para no perder esta web. */
  storeUrl: "https://vitalsalud.biller.pe/ecommerce",
} as const;

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    handle: "SoyVitalSaludAQP",
    href: "https://www.facebook.com/SoyVitalSaludAQP",
  },
  {
    name: "TikTok",
    handle: "@vital.salud.arequipa",
    href: "https://www.tiktok.com/@vital.salud.arequipa",
  },
  {
    name: "WhatsApp",
    handle: SITE.mobile,
    href: SITE.whatsappUrl,
  },
] as const;

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
] as const;

/** URL pública del sitio: dominio propio, dominio de Vercel o local. */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
