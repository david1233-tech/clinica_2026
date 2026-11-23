"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const LEAF = "M0 0C14-12 14-48 0-60C-14-48-14-12 0 0Z";

/** Hojas del árbol del logo: posición, giro, escala y color. */
const LEAVES = [
  { t: "translate(90 98) rotate(-62) scale(1.25)", c: "#2BB5A0" },
  { t: "translate(94 92) rotate(-14) scale(1.05)", c: "#5A6577" },
  { t: "translate(100 88) rotate(14) scale(.95)", c: "#1D5560" },
  { t: "translate(122 102) rotate(58) scale(1.25)", c: "#3CC2AA" },
  { t: "translate(82 80) rotate(-48) scale(.62)", c: "#4CAF50" },
  { t: "translate(124 108) rotate(98) scale(1.05)", c: "#A8C82A" },
  { t: "translate(118 84) rotate(40) scale(.58)", c: "#4CAF50" },
  { t: "translate(86 112) rotate(-104) scale(.6)", c: "#A8C82A" },
];

/* Línea de tiempo (s). Debe coincidir con globals.css (.site-intro). */
const T = { leaves: 2.6, exit: 6.3, done: 8.4 };

/**
 * Bienvenida "De la semilla al árbol":
 * 1) una semilla de luz late en la oscuridad, con ondas como una gota en el agua;
 * 2) crece el árbol del logo y sus hojas sueltan polen luminoso que sigue al cursor;
 * 3) "Vital Salud" aparece letra por letra mientras el contador llega a 100;
 * 4) la cámara vuela hacia el árbol y un portal con forma de hoja revela la página.
 * Una vez por sesión, se puede saltar y se omite con "reducir movimiento".
 */
export function SiteIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || getComputedStyle(root).display === "none") return;

    const html = document.documentElement;
    html.style.overflow = "hidden";
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      html.style.overflow = "";
      try {
        sessionStorage.setItem("vs-intro", "1");
      } catch {}
      // Al navegar después de la bienvenida, los textos ya no esperan los ~7 s de la intro.
      window.setTimeout(() => html.style.setProperty("--intro-delay", "0.7s"), 2500);
    };
    const skip = () => {
      html.style.setProperty("--intro-delay", "0s");
      root.classList.add("is-skipped");
      finish();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    const skipButton = root.querySelector<HTMLButtonElement>("[data-skip]");
    skipButton?.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);
    const onEnd = (e: AnimationEvent) => e.target === root && e.animationName === "intro-portal" && finish();
    root.addEventListener("animationend", onEnd);

    // ---- Polen luminoso (canvas) ----
    const ctx = canvas.getContext("2d");
    let W = 0;
    let H = 0;
    const resize = () => {
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    type Mote = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; c: string; ph: number };
    const colors = ["#c6e94b", "#e9ffb0", "#2ec4a6", "#a8c82a"];
    const motes: Mote[] = [];
    const spawn = (cx: number, cy: number, spread: number): Mote => {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 0.6 + 0.15;
      return {
        x: cx + Math.cos(a) * spread * Math.random(),
        y: cy + Math.sin(a) * spread * Math.random() * 0.7,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 0.35,
        r: Math.random() * 2.2 + 1.1,
        life: 0,
        max: 160 + Math.random() * 180,
        c: colors[Math.floor(Math.random() * colors.length)],
        ph: Math.random() * Math.PI * 2,
      };
    };

    const start = performance.now();
    const frame = (now: number) => {
      if (!ctx) return;
      const t = (now - start) / 1000;
      const cx = W / 2;
      const cy = H * (W < 640 ? 0.36 : 0.38);
      const treeR = Math.min(W, H) * 0.16;

      // Las hojas sueltan polen desde que brotan; al salir, todo acelera hacia afuera.
      if (t > T.leaves && t < T.exit && motes.length < 340) {
        for (let i = 0; i < 6; i++) motes.push(spawn(cx, cy - treeR * 0.35, treeR * 1.3));
      }
      const warp = t > T.exit ? Math.min(1, (t - T.exit) / 0.9) : 0;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.life += 1;
        // Remolino suave + atracción al cursor
        m.vx += Math.sin(t * 1.3 + m.ph) * 0.012;
        m.vy += Math.cos(t * 1.1 + m.ph) * 0.008 - 0.002;
        const dx = mouse.x - m.x;
        const dy = mouse.y - m.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 160 * 160) {
          m.vx += dx * 0.00035;
          m.vy += dy * 0.00035;
        }
        if (warp > 0) {
          const ax = m.x - cx;
          const ay = m.y - cy;
          const len = Math.hypot(ax, ay) || 1;
          m.vx += (ax / len) * warp * 1.1;
          m.vy += (ay / len) * warp * 1.1;
        }
        m.vx *= 0.985;
        m.vy *= 0.985;
        const px = m.x;
        const py = m.y;
        m.x += m.vx;
        m.y += m.vy;
        const fade = Math.min(1, m.life / 20) * Math.max(0, 1 - m.life / m.max);
        ctx.globalAlpha = fade * (0.55 + 0.45 * Math.sin(t * 4 + m.ph));
        if (warp > 0.05) {
          // Estelas tipo "velocidad luz"
          ctx.strokeStyle = m.c;
          ctx.lineWidth = m.r;
          ctx.beginPath();
          ctx.moveTo(px - m.vx * 3, py - m.vy * 3);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        } else {
          ctx.fillStyle = m.c;
          ctx.shadowColor = m.c;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        if (m.life > m.max || m.x < -50 || m.x > W + 50 || m.y < -50 || m.y > H + 50) motes.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (t < T.done && !finished) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      html.style.overflow = "";
      skipButton?.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("animationend", onEnd);
    };
  }, []);

  const brand = "Vital Salud";

  return (
    <div ref={rootRef} className="site-intro fixed inset-0 z-[100] overflow-hidden bg-[#030b0a] text-white" role="presentation">
      <div aria-hidden="true" className="intro-glow absolute inset-0" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

      {/* Escena central: semilla → árbol → nombre */}
      <div aria-hidden="true" className="intro-stage absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 pb-[6vh]">
        <div className="intro-float">
          <svg viewBox="0 0 200 175" className="h-auto w-[min(46vmin,19rem)]" overflow="visible">
            <defs>
              <radialGradient id="seed-glow">
                <stop offset="0" stopColor="#f4ffd0" />
                <stop offset="0.4" stopColor="#c6e94b" />
                <stop offset="1" stopColor="#c6e94b" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[0, 1, 2].map((i) => (
              <circle key={i} className="intro-ripple" cx="100" cy="164" r="10" fill="none" stroke="#c6e94b" strokeWidth="0.8" style={{ "--i": i } as CSSProperties} />
            ))}
            <circle className="intro-seed" cx="100" cy="164" r="16" fill="url(#seed-glow)" />
            <path
              className="intro-trunk"
              pathLength={1}
              d="M100 164 C101 140 98 118 92 96 M97 128 C108 118 116 110 124 100"
              fill="none"
              stroke="#e6f2ec"
              strokeWidth={6}
              strokeLinecap="round"
            />
            {LEAVES.map((leaf, i) => (
              <g key={i} transform={leaf.t}>
                <path d={LEAF} fill={leaf.c} className="intro-leaf" style={{ "--i": i } as CSSProperties} />
              </g>
            ))}
          </svg>
        </div>
        <p className="font-display text-[clamp(3rem,11vw,8.5rem)] font-light leading-none tracking-tight">
          {brand.split("").map((ch, i) => (
            <span key={i} className="intro-letter inline-block whitespace-pre" style={{ "--i": i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
        <p className="intro-tagline text-[0.7rem] font-bold uppercase tracking-[0.42em] text-[#c6e94b] sm:text-xs">Cuidando para prevenir</p>
      </div>

      <div aria-hidden="true" className="intro-burst pointer-events-none absolute left-1/2 top-[38%] h-[30vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#c6e94b]" />

      {/* Esquinas tipo estudio */}
      <div aria-hidden="true" className="intro-chrome pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
        <div className="flex justify-between text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/55 sm:text-xs">
          <span>Centro naturista</span>
          <span>Yanahuara · Arequipa</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="intro-counter font-display text-5xl font-light tabular-nums text-white sm:text-7xl" />
          <span className="pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/55 sm:text-xs">Preparando tu bienestar</span>
        </div>
      </div>

      <button
        type="button"
        data-skip
        className="absolute right-5 top-14 z-10 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-md transition hover:bg-white/20 sm:right-8 sm:top-16"
      >
        Saltar intro
      </button>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
        <div className="intro-progress h-full origin-left bg-[#c6e94b]" />
      </div>
    </div>
  );
}
