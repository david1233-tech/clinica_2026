import type { Metadata } from "next";
import { ArrowsClockwise, ArrowUpRight, Baby, Drop, Grains, Leaf, Orange, Pill, Storefront } from "@phosphor-icons/react/ssr";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { CtaBand } from "@/components/ui/CtaBand";
import { InView } from "@/components/ui/InView";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StoreBanner } from "@/components/ui/StoreBanner";
import { STORE_CATEGORIES, type CategoryIcon } from "@/lib/data/products";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Productos naturales",
  description: "Conoce las categorías de nuestra tienda saludable y revisa el catálogo completo en nuestra tienda en línea.",
  alternates: { canonical: "/productos" },
};

const ICONS: Record<CategoryIcon, typeof Leaf> = { leaf: Leaf, pill: Pill, grains: Grains, baby: Baby, drop: Drop, orange: Orange };

export default function ProductosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Productos"
        before="Lo mejor de la naturaleza, listo para"
        accent="tu día"
        description="Productos seleccionados por nuestros especialistas. Encuéntralos todos en nuestra tienda en línea."
      />

      <section className="container-site flex flex-col gap-10">
        <StoreBanner />

        {/* Categorías de referencia */}
        <InView className="mt-10 flex flex-col gap-4">
          <span className="eyebrow eyebrow-in">Qué encontrarás</span>
          <AnimatedTitle
            as="h2"
            mode="chars"
            before="Categorías de nuestra"
            accent="tienda"
            start={0.1}
            className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.02] tracking-tight text-balance"
          />
          <p className="enter enter-rise max-w-2xl text-muted" style={{ "--d": "0.6s" } as React.CSSProperties}>
            Imágenes de referencia de lo que tenemos en la tienda saludable. Los productos, precios y novedades los ves al abrir la tienda en línea.
          </p>
        </InView>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STORE_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            return (
              <SpotlightCard key={cat.title} className="reveal flex min-h-[15rem] flex-col gap-4 p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={34} weight="duotone" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-2xl">{cat.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">{cat.text}</p>
                <a
                  href={SITE.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-bold text-accent"
                >
                  Ver en la tienda
                  <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Por qué los productos están en la tienda */}
        <div className="reveal grid gap-4 md:grid-cols-2">
          <div className="card flex gap-4 p-7">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
              <ArrowsClockwise size={24} weight="duotone" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-xl">¿Por qué no ves los precios aquí?</h3>
              <p className="text-sm leading-relaxed text-muted">
                Nuestro catálogo se renueva constantemente. Para que siempre veas la información correcta, los productos y precios se
                publican en un solo lugar: la tienda en línea.
              </p>
            </div>
          </div>
          <div className="card flex gap-4 p-7">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Storefront size={24} weight="duotone" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-xl">¿Prefieres comprar en persona?</h3>
              <p className="text-sm leading-relaxed text-muted">
                Visítanos en {SITE.address}, Yanahuara, de {SITE.hours[0].days.toLowerCase()} de {SITE.hours[0].time}. Nuestro equipo te
                orienta para elegir lo que necesitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
