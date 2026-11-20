/** Fondo de luces suaves en movimiento (aurora en oscuro, sol de mañana en claro). */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`aurora pointer-events-none absolute inset-[-20%] -z-10 opacity-80 blur-3xl ${className}`}>
      <i className="left-[50%] top-[8%] h-[48%] w-[48%]" style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 65%)" }} />
      <i
        className="left-[64%] top-[42%] h-[40%] w-[38%]"
        style={{ background: "radial-gradient(circle, var(--aurora-2), transparent 65%)", animationDuration: "22s", animationDelay: "-6s" }}
      />
      <i
        className="left-[12%] top-[48%] h-[44%] w-[46%]"
        style={{ background: "radial-gradient(circle, var(--aurora-3), transparent 65%)", animationDuration: "26s", animationDelay: "-11s" }}
      />
    </div>
  );
}
