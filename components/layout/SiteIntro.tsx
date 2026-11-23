"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import type { GeoPermissibleObjects } from "d3-geo";
import type { GeometryCollection, Topology } from "topojson-specification";
import fachada from "@/public/local/fachada.jpg";
import interior from "@/public/local/interior-tienda.jpg";

/** Yanahuara, Arequipa. */
const TARGET: [number, number] = [-71.541, -16.389];
const START_ROTATION: [number, number] = [-15, -18];
const END_ROTATION: [number, number] = [-TARGET[0], -TARGET[1]];

/** Centro de la puerta de la tienda en la foto de la fachada (proporción del ancho/alto). */
const DOOR = { x: 0.467, y: 0.75 };
const FACADE_POS_X = 0.47;

/* Línea de tiempo del globo (ms). Las fases con fotos están en globals.css (.site-intro). */
const ROTATE = [300, 2000] as const;
const ZOOM = [1200, 2900] as const;
const MAX_ZOOM = 6.5;
const GLOBE_END = 3600;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const progress = (t: number, [a, b]: readonly [number, number]) => clamp01((t - a) / (b - a));
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

type Atlas = Topology<{ land: GeometryCollection; countries: GeometryCollection }>;

/**
 * Bienvenida cinematográfica en tres actos:
 * 1) la Tierra gira y se acerca hasta Yanahuara, Arequipa;
 * 2) aterriza en la fachada de la tienda y la cámara entra por la puerta;
 * 3) dentro de la tienda aparece la marca y una cortina revela el sitio.
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
    let cancelled = false;
    let finished = false;

    // Punto de fuga del "travelling": la puerta, calculada para object-fit: cover.
    const aimAtDoor = () => {
      const W = root.clientWidth;
      const H = root.clientHeight;
      const s = Math.max(W / fachada.width, H / fachada.height);
      const dw = fachada.width * s;
      const dh = fachada.height * s;
      const ox = (W - dw) * FACADE_POS_X;
      const oy = (H - dh) / 2;
      root.style.setProperty("--door-x", `${ox + DOOR.x * dw}px`);
      root.style.setProperty("--door-y", `${oy + DOOR.y * dh}px`);
    };
    aimAtDoor();

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      html.style.overflow = "";
      try {
        sessionStorage.setItem("vs-intro", "1");
      } catch {}
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
    const onEnd = (e: AnimationEvent) => e.target === root && finish();
    root.addEventListener("animationend", onEnd);

    (async () => {
      try {
        const [d3, topo, atlasModule] = await Promise.all([
          import("d3-geo"),
          import("topojson-client"),
          import("world-atlas/countries-110m.json"),
        ]);
        if (cancelled || finished) return;
        const atlas = atlasModule.default as unknown as Atlas;
        const land = topo.feature(atlas, atlas.objects.land) as GeoPermissibleObjects;
        const borders = topo.mesh(atlas, atlas.objects.countries, (a, b) => a !== b) as GeoPermissibleObjects;
        const countries = topo.feature(atlas, atlas.objects.countries);
        const peru = ("features" in countries ? countries.features : []).find((f) => String(f.id) === "604") as GeoPermissibleObjects | undefined;
        const graticule = d3.geoGraticule10();
        const sphere: GeoPermissibleObjects = { type: "Sphere" };

        const ctx = canvas.getContext("2d");
        if (!ctx) return skip();
        let W = 0;
        let H = 0;
        const resize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          W = canvas.clientWidth;
          H = canvas.clientHeight;
          canvas.width = W * dpr;
          canvas.height = H * dpr;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          aimAtDoor();
        };
        resize();
        window.addEventListener("resize", resize);

        const stars = Array.from({ length: 220 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.2, p: Math.random() * Math.PI * 2 }));
        const projection = d3.geoOrthographic().clipAngle(90).precision(0.4);
        const path = d3.geoPath(projection, ctx);
        const start = performance.now();
        root.classList.add("is-playing");

        const frame = (now: number) => {
          const t = now - start;
          const base = Math.min(W, H) * (W < 640 ? 0.42 : 0.34);
          const zoomP = easeInOut(progress(t, ZOOM));
          const k = base * (0.6 + 0.4 * easeOut(progress(t, [0, 900]))) * Math.exp(Math.log(MAX_ZOOM) * zoomP);
          const rotP = easeInOut(progress(t, ROTATE));
          const idle = (1 - rotP) * t * 0.004;
          projection
            .scale(k)
            .translate([W / 2, H / 2])
            .rotate([lerp(START_ROTATION[0], END_ROTATION[0], rotP) - idle, lerp(START_ROTATION[1], END_ROTATION[1], rotP)]);

          ctx.clearRect(0, 0, W, H);

          const starAlpha = 1 - zoomP;
          if (starAlpha > 0.01) {
            ctx.fillStyle = "#ffffff";
            for (const s of stars) {
              ctx.globalAlpha = starAlpha * (0.35 + 0.65 * Math.abs(Math.sin(t * 0.0012 + s.p)));
              ctx.beginPath();
              ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.globalAlpha = 1;
          }

          const glow = ctx.createRadialGradient(W / 2, H / 2, k * 0.92, W / 2, H / 2, k * 1.22);
          glow.addColorStop(0, "rgba(46,196,166,0.45)");
          glow.addColorStop(1, "rgba(46,196,166,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(W / 2, H / 2, k * 1.22, 0, Math.PI * 2);
          ctx.fill();

          const ocean = ctx.createRadialGradient(W / 2 - k * 0.35, H / 2 - k * 0.35, k * 0.1, W / 2, H / 2, k);
          ocean.addColorStop(0, "#0f4a47");
          ocean.addColorStop(1, "#03100f");
          ctx.beginPath();
          path(sphere);
          ctx.fillStyle = ocean;
          ctx.fill();

          ctx.beginPath();
          path(graticule);
          ctx.strokeStyle = "rgba(198,233,75,0.09)";
          ctx.lineWidth = 0.6;
          ctx.stroke();

          ctx.beginPath();
          path(land);
          ctx.fillStyle = "#1f7466";
          ctx.fill();
          ctx.strokeStyle = "rgba(198,233,75,0.45)";
          ctx.lineWidth = 0.7;
          ctx.stroke();

          ctx.beginPath();
          path(borders);
          ctx.strokeStyle = "rgba(234,246,241,0.16)";
          ctx.lineWidth = 0.5;
          ctx.stroke();

          const peruA = progress(t, [1700, 2400]);
          if (peru && peruA > 0) {
            ctx.beginPath();
            path(peru);
            ctx.fillStyle = `rgba(198,233,75,${0.32 * peruA})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(198,233,75,${0.95 * peruA})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }

          const shine = ctx.createRadialGradient(W / 2 - k * 0.5, H / 2 - k * 0.6, 0, W / 2 - k * 0.5, H / 2 - k * 0.6, k * 1.3);
          shine.addColorStop(0, "rgba(255,255,255,0.10)");
          shine.addColorStop(1, "rgba(255,255,255,0)");
          ctx.beginPath();
          path(sphere);
          ctx.fillStyle = shine;
          ctx.fill();

          const pinA = progress(t, [2100, 2500]);
          const pt = projection(TARGET);
          if (pt && pinA > 0) {
            const [px, py] = pt;
            for (let i = 0; i < 3; i++) {
              const ring = (t / 1500 + i / 3) % 1;
              ctx.beginPath();
              ctx.arc(px, py, 6 + ring * 46, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(198,233,75,${(1 - ring) * 0.8 * pinA})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(198,233,75,${pinA})`;
            ctx.shadowColor = "#c6e94b";
            ctx.shadowBlur = 18;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = pinA;
            ctx.fillStyle = "#eaf6f1";
            ctx.font = "700 12px system-ui, sans-serif";
            ctx.fillText("AREQUIPA", px + 14, py - 10);
            ctx.globalAlpha = 1;
          }

          if (t < GLOBE_END && !finished) raf = requestAnimationFrame(frame);
          else window.removeEventListener("resize", resize);
        };
        raf = requestAnimationFrame(frame);
      } catch {
        skip();
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      html.style.overflow = "";
      skipButton?.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("animationend", onEnd);
    };
  }, []);

  const brand = "Vital Salud";

  return (
    <div ref={rootRef} className="site-intro fixed inset-0 z-[100] overflow-hidden bg-[#020a0a] text-white" role="presentation">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0a2a27_0%,#020a0a_65%)]" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

      {/* Acto 2: aterrizaje en la fachada y travelling hacia la puerta */}
      <div aria-hidden="true" className="intro-facade absolute inset-0">
        <div className="intro-dolly absolute inset-0">
          <Image src={fachada} alt="" fill preload sizes="100vw" quality={90} className="object-cover" style={{ objectPosition: `${FACADE_POS_X * 100}% 50%` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/35" />
        </div>
        <p className="intro-landing absolute inset-x-0 top-[18%] text-center text-[0.7rem] font-bold uppercase tracking-[0.4em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.6)] sm:text-xs">
          Av. Víctor Andrés Belaúnde 367 · Yanahuara
        </p>
      </div>

      {/* Acto 3: dentro de la tienda */}
      <div aria-hidden="true" className="intro-inside absolute inset-0">
        <Image src={interior} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
      </div>
      <div aria-hidden="true" className="intro-flash pointer-events-none absolute inset-0 bg-white" />

      <div aria-hidden="true" className="intro-hud pointer-events-none absolute inset-x-0 top-0 flex justify-between p-5 font-mono text-[0.65rem] tracking-[0.25em] text-white/75 sm:p-8 sm:text-xs">
        <span>CENTRO VITAL SALUD</span>
        <span>16°23′S · 71°32′W</span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[16%] flex flex-col items-center gap-4 px-6 text-center">
        <p className="intro-eyebrow text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#c6e94b] sm:text-xs">Bienvenido a</p>
        <p className="font-display text-[clamp(3.2rem,12vw,9.5rem)] font-light leading-none tracking-tight" aria-label={brand}>
          {brand.split("").map((ch, i) => (
            <span key={i} aria-hidden="true" className="intro-letter inline-block whitespace-pre" style={{ "--i": i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
        <p className="intro-slogan max-w-md text-base text-white/85 sm:text-lg">Cuidando para prevenir · Tu salud, en manos naturales</p>
      </div>

      <button
        type="button"
        data-skip
        className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] right-5 z-10 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-md transition hover:bg-white/20 sm:right-8"
      >
        Saltar intro
      </button>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <div className="intro-progress h-full origin-left bg-[#c6e94b]" />
      </div>
    </div>
  );
}
