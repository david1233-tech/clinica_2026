"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/musica/musica-fondo.mp3";
const VOLUME = 0.22;
const STORAGE_KEY = "vs-music";

/**
 * Música de fondo suave. Los navegadores no permiten sonido automático, así que empieza con el
 * primer toque, clic o tecla del visitante (subiendo el volumen de a poco). Si la silencia, se
 * recuerda en este navegador y no vuelve a sonar sola. Vive en el header (layout), así que no se
 * corta al cambiar de página. El archivo solo se descarga cuando va a sonar.
 */
export function MusicToggle({ className = "" }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const fadeRef = useRef(0);
  const wantRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  /**
   * El volumen se controla con Web Audio (GainNode): en iPhone/iPad, Safari ignora
   * `audio.volume` y la música sonaría a todo volumen.
   */
  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio(SRC);
      a.loop = true;
      a.preload = "auto";
      audioRef.current = a;
      try {
        const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        const gain = ctx.createGain();
        gain.gain.value = 0;
        ctx.createMediaElementSource(a).connect(gain).connect(ctx.destination);
        ctxRef.current = ctx;
        gainRef.current = gain;
      } catch {
        a.volume = 0;
      }
    }
    return audioRef.current;
  };

  const getVolume = () => (gainRef.current ? gainRef.current.gain.value : getAudio().volume);
  const setVolume = (v: number) => {
    if (gainRef.current) gainRef.current.gain.value = v;
    else getAudio().volume = v;
  };

  const fadeTo = (target: number, ms: number, done?: () => void) => {
    cancelAnimationFrame(fadeRef.current);
    const from = getVolume();
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      setVolume(from + (target - from) * k);
      if (k < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const start = () => {
    const a = getAudio();
    wantRef.current = true;
    ctxRef.current?.resume().catch(() => {});
    a.play()
      .then(() => {
        setPlaying(true);
        fadeTo(VOLUME, 2500);
      })
      .catch(() => setPlaying(false));
  };

  const stop = () => {
    wantRef.current = false;
    setPlaying(false);
    fadeTo(0, 600, () => audioRef.current?.pause());
  };

  useEffect(() => {
    let off = false;
    try {
      off = localStorage.getItem(STORAGE_KEY) === "off";
    } catch {}

    // Primer gesto del visitante = permiso del navegador para sonar.
    const onFirst = (e: Event) => {
      remove();
      if ((e.target as Element | null)?.closest?.("[data-music-toggle]")) return;
      start();
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const remove = () => events.forEach((ev) => window.removeEventListener(ev, onFirst, true));
    if (!off) events.forEach((ev) => window.addEventListener(ev, onFirst, { capture: true, passive: true }));

    // Pausa si la pestaña queda en segundo plano y retoma al volver.
    const onVisibility = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) a.pause();
      else if (wantRef.current) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      remove();
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
      ctxRef.current?.close().catch(() => {});
      audioRef.current = null;
      gainRef.current = null;
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next = !wantRef.current;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    if (next) start();
    else stop();
  };

  return (
    <button
      type="button"
      data-music-toggle
      onClick={toggle}
      className={`group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-line bg-surface/60 text-fg backdrop-blur-md transition hover:border-accent ${className}`}
      aria-label={playing ? "Silenciar música de fondo" : "Activar música de fondo"}
      aria-pressed={playing}
      title={playing ? "Silenciar música" : "Activar música"}
    >
      <span aria-hidden="true" className={`music-bars flex h-4 items-end gap-[3px] ${playing ? "is-playing" : ""}`}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="music-bar w-[3px] rounded-full bg-current" style={{ animationDelay: `${i * -0.27}s` }} />
        ))}
      </span>
      {!playing && <span aria-hidden="true" className="absolute h-[2px] w-6 rotate-45 rounded-full bg-current opacity-80" />}
    </button>
  );
}
