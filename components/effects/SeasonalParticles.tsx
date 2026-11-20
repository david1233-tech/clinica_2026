"use client";

import { useEffect, useRef } from "react";
import type { EffectKey } from "@/lib/seasons";
import { useSeason } from "@/lib/useSeason";

type Shape = "leaf" | "petal" | "snow" | "spark" | "confetti";
type Fx = { shape: Shape; dark: string[]; light: string[]; count: number; fireflies?: boolean };

/** Apariencia de las partículas por temporada (claro y oscuro). */
const FX: Record<EffectKey, Fx> = {
  navidad: { shape: "snow", dark: ["#ffffff", "#d9f3ff"], light: ["#8fbccc", "#b9d8e2"], count: 55 },
  "anio-nuevo": { shape: "spark", dark: ["#ffc15e", "#ffe3a3", "#c6e94b"], light: ["#e0a100", "#1a9480", "#ffb238"], count: 55 },
  "dia-madre": { shape: "petal", dark: ["#ff9eb5", "#ffc2d1", "#ffffff"], light: ["#f07a9a", "#ffb3c6", "#ffc23c"], count: 34 },
  "dia-padre": { shape: "leaf", dark: ["#2ec4a6", "#1d5560", "#c6e94b"], light: ["#1a9480", "#1d5560", "#9cc43a"], count: 30 },
  "fiestas-patrias": { shape: "confetti", dark: ["#d91023", "#ffffff"], light: ["#d91023", "#f5b5bc"], count: 45 },
  primavera: { shape: "leaf", dark: ["#c6e94b", "#2ec4a6", "#4caf50", "#9cc43a"], light: ["#9cc43a", "#1a9480", "#4caf50", "#ffc23c"], count: 34, fireflies: true },
  verano: { shape: "spark", dark: ["#ffc23c", "#ffd978", "#ff9f45"], light: ["#ffb238", "#ff9f45", "#1a9480"], count: 40 },
  otono: { shape: "leaf", dark: ["#e8a33d", "#c9662b", "#9cc43a"], light: ["#d98a1f", "#b5531f", "#9cc43a"], count: 32 },
  invierno: { shape: "snow", dark: ["#ffffff", "#cfe9f2"], light: ["#8fbccc", "#b9d8e2"], count: 40 },
};

type P = { x: number; y: number; s: number; vx: number; vy: number; rot: number; vr: number; ph: number; c: string; a: number; fly?: boolean };

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

/** Partículas de la temporada activa sobre un canvas. Respeta "reducir movimiento". */
export function SeasonalParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const season = useSeason();
  const effect = season?.effect;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !effect) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fx = FX[effect];
    const rising = fx.shape === "spark";
    let W = 0;
    let H = 0;
    let raf = 0;
    let t = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const make = (fresh: boolean): P => {
      const dark = document.documentElement.dataset.theme === "dark";
      const colors = dark ? fx.dark : fx.light;
      if (fx.fireflies && Math.random() < 0.28) {
        return { fly: true, x: rnd(0, W), y: rnd(H * 0.2, H), s: rnd(1.2, 2.6), vx: rnd(-0.25, 0.25), vy: rnd(-0.2, 0.2), rot: 0, vr: 0, ph: rnd(0, 6.28), c: dark ? "#e9ffb0" : "#ffc23c", a: 1 };
      }
      const y = rising ? (fresh ? rnd(H * 0.3, H) : H + 10) : fresh ? rnd(-H, H) : -20;
      return {
        x: rnd(0, W),
        y,
        s: fx.shape === "snow" || fx.shape === "spark" ? rnd(1.2, 3) : rnd(5, 10),
        vx: rnd(-0.25, 0.35),
        vy: rising ? -rnd(0.35, 1.1) : rnd(0.35, 0.9),
        rot: rnd(0, 6.28),
        vr: rnd(-0.03, 0.03),
        ph: rnd(0, 6.28),
        c: pick(colors),
        a: rnd(0.45, 0.85),
      };
    };

    resize();
    const count = Math.round(fx.count * (W < 640 ? 0.55 : 1));
    const parts = Array.from({ length: count }, () => make(true));

    const draw = (p: P) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      switch (fx.shape) {
        case "leaf":
          ctx.moveTo(0, -p.s);
          ctx.quadraticCurveTo(p.s * 0.6, 0, 0, p.s);
          ctx.quadraticCurveTo(-p.s * 0.6, 0, 0, -p.s);
          break;
        case "petal":
          ctx.ellipse(0, 0, p.s, p.s * 0.5, 0, 0, Math.PI * 2);
          break;
        case "confetti":
          ctx.rect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
          break;
        default:
          ctx.arc(0, 0, p.s, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      t += 1;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (p.fly) {
          p.x += p.vx + Math.sin(t * 0.01 + p.ph) * 0.3;
          p.y += p.vy + Math.cos(t * 0.013 + p.ph) * 0.3;
          ctx.globalAlpha = Math.max(0, 0.35 + 0.45 * Math.sin(t * 0.05 + p.ph));
          ctx.shadowColor = p.c;
          ctx.shadowBlur = 12;
          draw(p);
          ctx.shadowBlur = 0;
          if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) parts[i] = make(true);
          continue;
        }
        p.x += p.vx + Math.sin(t * 0.02 + p.ph) * 0.45;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.globalAlpha = rising ? p.a * Math.min(1, Math.max(0, p.y / H)) : p.a;
        if (rising) {
          ctx.shadowColor = p.c;
          ctx.shadowBlur = 10;
        }
        draw(p);
        ctx.shadowBlur = 0;
        const out = rising ? p.y < H * 0.05 : p.y > H + 20;
        if (out || p.x > W + 30 || p.x < -30) parts[i] = make(false);
      }
      ctx.globalAlpha = 1;
      if (visible) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [effect]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
