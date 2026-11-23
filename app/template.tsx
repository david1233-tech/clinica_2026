import { LogoTree } from "@/components/brand/LogoTree";

/**
 * Se vuelve a montar en cada navegación: una cortina con el árbol del logo
 * se levanta y la página entra suavemente.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="route-curtain pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-[#061614]">
        <LogoTree className="route-curtain-logo h-20 w-24 text-[#cfe3dc]" />
      </div>
      <div className="page-enter">{children}</div>
    </>
  );
}
