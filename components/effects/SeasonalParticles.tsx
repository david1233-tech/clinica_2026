"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import type { EffectKey } from "@/lib/seasons";
import { useSeason } from "@/lib/useSeason";

type Shape = "leaf" | "petal" | "snow" | "spark" | "confetti" | "heart";
type Fx = {
  shape: Shape;
  colors: string[];
  count: number;
  /** Luciérnagas que flotan entre las partículas. */
  fireflies?: boolean;
  /** Fuegos artificiales que estallan cada cierto tiempo. */
  fireworks?: string[];
};

/** Partículas de cada temporada. Van sobre la portada del inicio, que siempre es oscura. */
const FX: Record<EffectKey, Fx> = {
  navidad: { shape: "snow", colors: ["#ffffff", "#e6f6ff", "#d9f3ff"], count: 85 },
  "anio-nuevo": { shape: "spark", colors: ["#ffc15e", "#ffe3a3", "#c6e94b"], count: 40, fireworks: ["#ffc15e", "#ffe3a3", "#c6e94b", "#ffffff", "#2ec4a6"] },
  "san-valentin": { shape: "heart", colors: ["#ff6b8b", "#ff9eb5", "#ffc2d1"], count: 34 },
  "dia-madre": { shape: "petal", colors: ["#ff9eb5", "#ffc2d1", "#ffffff"], count: 40 },
  "dia-padre": { shape: "leaf", colors: ["#2ec4a6", "#1d5560", "#c6e94b"], count: 30 },
  "fiestas-patrias": { shape: "confetti", colors: ["#d91023", "#ffffff"], count: 60 },
  "aniversario-arequipa": { shape: "confetti", colors: ["#ffffff", "#ffd978", "#c6e94b"], count: 45, fireworks: ["#ffffff", "#ffd978", "#ffe3a3"] },
  primavera: { shape: "leaf", colors: ["#c6e94b", "#2ec4a6", "#4caf50", "#9cc43a"], count: 34, fireflies: true },
  verano: { shape: "spark", colors: ["#ffc23c", "#ffd978", "#ff9f45"], count: 40 },
  otono: { shape: "leaf", colors: ["#e8a33d", "#c9662b", "#9cc43a"], count: 32 },
  invierno: { shape: "snow", colors: ["#ffffff", "#cfe9f2"], count: 50 },
};

type P = { x: number; y: number; s: number; vx: number; vy: number; rot: number; vr: number; ph: number; c: string; a: number; fly?: boolean; crystal?: boolean };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string };

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

/**
 * Animación de la fecha o estación activa (nieve en Navidad, fuegos en Año Nuevo, corazones en
 * San Valentín...). Cambia sola según el calendario de `lib/seasons.ts`. Con "reducir movimiento"
 * se dibuja una sola vez, quieta.
 */
export function SeasonalParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const season = useSeason();
  const effect = season?.effect;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !effect) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fx = FX[effect];
    const still = prefersReducedMotion();
    const rising = fx.shape === "spark";
    let W = 0;
    let H = 0;
    let raf = 0;
    let t = 0;
    let visible = true;
    let nextBurst = 60;
    const sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const make = (fresh: boolean): P => {
      if (fx.fireflies && Math.random() < 0.28) {
        return { fly: true, x: rnd(0, W), y: rnd(H * 0.2, H), s: rnd(1.2, 2.6), vx: rnd(-0.25, 0.25), vy: rnd(-0.2, 0.2), rot: 0, vr: 0, ph: rnd(0, 6.28), c: "#e9ffb0", a: 1 };
      }
      const y = rising ? (fresh ? rnd(H * 0.3, H) : H + 10) : fresh ? rnd(-H * 0.2, H) : -20;
      const snow = fx.shape === "snow";
      // En la nieve, algunos copos son cristales de seis puntas, más grandes y lentos.
      const crystal = snow && Math.random() < 0.3;
      const small = snow || rising;
      return {
        x: rnd(0, W),
        y,
        s: crystal ? rnd(5, 10) : small ? rnd(1.2, 3) : fx.shape === "heart" ? rnd(10, 17) : rnd(5, 10),
        vx: rnd(-0.25, 0.35),
        vy: rising ? -rnd(0.35, 1.1) : crystal ? rnd(0.3, 0.6) : rnd(0.4, 1),
        rot: rnd(0, 6.28),
        vr: rnd(-0.02, 0.02),
        ph: rnd(0, 6.28),
        c: pick(fx.colors),
        a: crystal ? rnd(0.55, 0.9) : rnd(0.45, 0.85),
        crystal,
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
      ctx.strokeStyle = p.c;
      ctx.beginPath();
      if (p.crystal) {
        // Copo de nieve: tres ejes con ramitas.
        ctx.lineWidth = 1.1;
        ctx.lineCap = "round";
        for (let k = 0; k < 6; k++) {
          ctx.rotate(Math.PI / 3);
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -p.s);
          ctx.moveTo(0, -p.s * 0.55);
          ctx.lineTo(p.s * 0.28, -p.s * 0.8);
          ctx.moveTo(0, -p.s * 0.55);
          ctx.lineTo(-p.s * 0.28, -p.s * 0.8);
        }
        ctx.stroke();
        ctx.restore();
        return;
      }
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
        case "heart": {
          const s = p.s / 10;
          ctx.moveTo(0, 3 * s);
          ctx.bezierCurveTo(-10 * s, -4 * s, -5 * s, -11 * s, 0, -5 * s);
          ctx.bezierCurveTo(5 * s, -11 * s, 10 * s, -4 * s, 0, 3 * s);
          break;
        }
        default:
          ctx.arc(0, 0, p.s, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    };

    const burst = () => {
      if (!fx.fireworks) return;
      const x = rnd(W * 0.35, W * 0.92);
      const y = rnd(H * 0.12, H * 0.45);
      const c = pick(fx.fireworks);
      const n = W < 640 ? 34 : 54;
      for (let k = 0; k < n; k++) {
        const ang = (k / n) * Math.PI * 2 + rnd(-0.05, 0.05);
        const sp = rnd(1.4, 3.4);
        sparks.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 0, max: rnd(55, 85), c: Math.random() < 0.25 ? "#ffffff" : c });
      }
    };

    const drawSparks = () => {
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1;
        s.vx *= 0.97;
        s.vy = s.vy * 0.97 + 0.035;
        const px = s.x;
        const py = s.y;
        s.x += s.vx;
        s.y += s.vy;
        ctx.globalAlpha = Math.max(0, 1 - s.life / s.max);
        ctx.strokeStyle = s.c;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(px - s.vx * 2, py - s.vy * 2);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        if (s.life > s.max) sparks.splice(i, 1);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = () => {
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
        p.x += p.vx + Math.sin(t * 0.02 + p.ph) * (p.crystal ? 0.3 : 0.45);
        p.y += p.vy;
        p.rot += p.vr;
        ctx.globalAlpha = rising ? p.a * Math.min(1, Math.max(0, p.y / H)) : p.a;
        if (rising || p.crystal) {
          ctx.shadowColor = p.c;
          ctx.shadowBlur = p.crystal ? 6 : 10;
        }
        draw(p);
        ctx.shadowBlur = 0;
        const out = rising ? p.y < H * 0.05 : p.y > H + 20;
        if (out || p.x > W + 30 || p.x < -30) parts[i] = make(false);
      }
      if (fx.fireworks) {
        if (--nextBurst <= 0) {
          burst();
          nextBurst = Math.round(rnd(70, 150));
        }
        drawSparks();
      }
      ctx.globalAlpha = 1;
    };

    if (still) {
      frame();
      return;
    }

    const loop = () => {
      frame();
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
