import type { Metadata } from "next";
import { CheckCircle, ShoppingBag } from "@phosphor-icons/react/ssr";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CATEGORY_LABELS, PRODUCTS, formatPrice } from "@/lib/data/products";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Productos naturales",
  description: "Catálogo de productos naturales del Centro Vital Salud. Haz tu pedido por WhatsApp.",
  alternates: { canonical: "/productos" },
};

export default function ProductosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Productos"
        before="Lo mejor de la naturaleza, listo para"
        accent="tu día"
        description="Productos seleccionados por nuestros especialistas. Elige el tuyo y te lo separamos por WhatsApp."
      />

      <section className="container-site flex flex-col gap-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <SpotlightCard key={p.id} className="reveal flex flex-col gap-5 p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent">
                  {CATEGORY_LABELS[p.category]}
                </span>
                <span className="font-display text-2xl tabular-nums">{formatPrice(p.price)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-2xl leading-tight">{p.name}</h2>
                <p className="text-sm leading-relaxed text-muted">{p.description}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-2 border-t border-line pt-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} weight="duotone" className="shrink-0 text-accent" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(`Hola, quisiera pedir: ${p.name} (${formatPrice(p.price)}). ¿Está disponible?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                <ShoppingBag size={18} weight="bold" aria-hidden="true" />
                Pedir por WhatsApp
              </a>
            </SpotlightCard>
          ))}
        </div>
        <p className="text-center text-sm text-muted">
          Precios referenciales en soles. Confirmamos disponibilidad y entrega al responder tu mensaje.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
