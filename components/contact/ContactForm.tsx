"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, PaperPlaneRight } from "@phosphor-icons/react";
import { SERVICES } from "@/lib/data/services";
import { whatsappLink } from "@/lib/site";

const field =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm text-fg outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent-soft";
const label = "text-xs font-bold uppercase tracking-[0.14em] text-muted";

/**
 * El formulario arma el mensaje y abre WhatsApp con el texto listo para
 * enviar. Así funciona sin servidor ni base de datos.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      "Hola, Centro Vital Salud. Les escribo desde la web.",
      `Nombre: ${data.get("nombre")}`,
      `Teléfono: ${data.get("telefono")}`,
      `Me interesa: ${data.get("servicio")}`,
      `Mensaje: ${data.get("mensaje")}`,
    ];
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent">
          <CheckCircle size={36} weight="duotone" aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl">Tu mensaje está listo en WhatsApp</h3>
        <p className="max-w-sm text-sm text-muted">
          Abrimos WhatsApp con tus datos. Solo presiona enviar y te responderemos lo antes posible.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn btn-ghost mt-2">
          Escribir otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className={label}>Nombre completo</label>
          <input id="nombre" name="nombre" required autoComplete="name" placeholder="Ej. Ana Quispe" className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="telefono" className={label}>Celular</label>
          <input id="telefono" name="telefono" type="tel" required autoComplete="tel" inputMode="tel" placeholder="Ej. 987 654 321" className={field} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="servicio" className={label}>¿Qué te interesa?</label>
        <select id="servicio" name="servicio" className={field} defaultValue={SERVICES[0].title}>
          {SERVICES.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Productos naturales</option>
          <option>Otra consulta</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="mensaje" className={label}>Mensaje</label>
        <textarea id="mensaje" name="mensaje" required rows={4} placeholder="Cuéntanos en qué podemos ayudarte" className={`${field} resize-none`} />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        <PaperPlaneRight size={19} weight="bold" aria-hidden="true" />
        Enviar por WhatsApp
      </button>
    </form>
  );
}
