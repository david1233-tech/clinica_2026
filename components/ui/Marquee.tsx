import { Fragment } from "react";

/** Cinta infinita de palabras; se pausa al pasar el cursor. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <Fragment key={item}>
          <span className={i % 2 ? "text-leaf" : undefined}>{item}</span>
          <span className="text-accent" aria-hidden="true">✦</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="marquee relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track flex w-max font-display text-2xl font-medium tracking-tight whitespace-nowrap sm:text-3xl">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
