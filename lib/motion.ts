/**
 * ¿Debemos reducir el movimiento? Respeta la preferencia del sistema, salvo
 * cuando la URL lleva ?intro (data-motion="force"), útil para previsualizar.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  if (document.documentElement.dataset.motion === "force") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
