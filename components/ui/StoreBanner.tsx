import { ArrowUpRight, Storefront } from "@phosphor-icons/react/ssr";
import { SITE } from "@/lib/site";

/**
 * Acceso a la tienda en línea (biller.pe). Se abre en una pestaña nueva:
 * esta web queda abierta en su propia pestaña y el cliente vuelve con solo
 * cerrar la de la tienda, sin buscar nada ni usar "atrás".
 */
export function StoreBanner() {
  return (
    <div className="reveal relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 65%)" }}
      />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
            <Storefront size={28} weight="duotone" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-2xl sm:text-3xl">Compra en nuestra tienda en línea</h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Revisa todo nuestro catálogo y haz tu pedido. Se abre en una pestaña nueva: para volver aquí, solo cierra la pestaña de
              la tienda.
            </p>
          </div>
        </div>
        <a href={SITE.storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0 self-start md:self-auto">
          Ir a la tienda
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>
    </div>
  );
}
