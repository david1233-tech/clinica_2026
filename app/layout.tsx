import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteIntro } from "@/components/layout/SiteIntro";
import { SITE, SOCIAL_LINKS, siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE.name} | Centro naturista en Arequipa`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.slogan}. ${SITE.description}`,
  keywords: ["medicina natural", "naturista Arequipa", "nutrición clínica", "Yanahuara", "terapias naturales", "psicología"],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.slogan}`,
    description: SITE.description,
    images: [{ url: "/hero-vital-salud.jpg", alt: "Fachada del Centro Vital Salud en Yanahuara" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#061614" },
  ],
};

/**
 * Antes del primer pintado: aplica el tema guardado (o el del sistema) y
 * marca la bienvenida como vista si ya apareció en esta sesión.
 * Con ?temporada= la bienvenida siempre se muestra (vista previa).
 */
const bootScript = `(function(){try{var r=document.documentElement,m=matchMedia("(prefers-color-scheme: dark)"),s=localStorage.getItem("vs-theme");r.dataset.theme=s==="dark"||(s!=="light"&&m.matches)?"dark":"light";m.addEventListener("change",function(e){if(!localStorage.getItem("vs-theme"))r.dataset.theme=e.matches?"dark":"light"});if(sessionStorage.getItem("vs-intro")&&location.search.indexOf("temporada=")<0)r.dataset.introSeen=""}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE.name,
  slogan: SITE.slogan,
  description: SITE.description,
  url: siteUrl(),
  image: `${siteUrl()}/hero-vital-salud.jpg`,
  telephone: "+51976371809",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Yanahuara",
    addressRegion: "Arequipa",
    addressCountry: "PE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: SOCIAL_LINKS.filter((s) => s.name !== "WhatsApp").map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" suppressHydrationWarning className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2">
          Saltar al contenido
        </a>
        <SiteIntro />
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
