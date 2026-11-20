import Link from "next/link";
import { House } from "@phosphor-icons/react/ssr";
import { LogoTree } from "@/components/brand/LogoTree";
import { Aurora } from "@/components/ui/Aurora";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-28">
      <Aurora className="opacity-60" />
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <LogoTree animated startDelay={0} className="h-28 w-32 text-fg/70" />
        <p className="eyebrow">Error 404</p>
        <h1 className="font-display text-5xl tracking-tight sm:text-6xl">
          Esta página aún no <em className="text-accent">florece</em>
        </h1>
        <p className="max-w-md text-muted">La dirección que buscas no existe o cambió de lugar.</p>
        <Link href="/" className="btn btn-primary">
          <House size={18} weight="bold" aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
