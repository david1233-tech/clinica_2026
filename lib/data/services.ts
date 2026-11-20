import type { Service } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    slug: "medicina-naturista",
    title: "Medicina naturista",
    kicker: "Evaluación clínica",
    summary:
      "Evaluación y tratamientos para depurar el organismo, fortalecer tu sistema inmune y recuperar el equilibrio metabólico.",
    details: ["Historia médica completa", "Diagnóstico personalizado", "Plan de tratamiento natural"],
    icon: "leaf",
  },
  {
    slug: "nutricion-clinica",
    title: "Nutrición clínica",
    kicker: "Planes alimenticios",
    summary:
      "Planes de alimentación, dietoterapia y jugoterapia adaptados a tu organismo y a tu rutina diaria.",
    details: ["Dietoterapia", "Jugoterapia", "Suplementación natural"],
    icon: "bowl",
  },
  {
    slug: "psicologia",
    title: "Psicología",
    kicker: "Equilibrio emocional",
    summary:
      "Acompañamiento emocional para equilibrar mente y cuerpo, manejar el estrés y sostener tus cambios de hábitos.",
    details: ["Sesiones individuales", "Manejo del estrés", "Hábitos saludables"],
    icon: "heart",
  },
  {
    slug: "terapias-de-bienestar",
    title: "Terapias de bienestar",
    kicker: "Alivio y descanso",
    summary:
      "Sesiones de relajación con aceites naturales para liberar tensiones acumuladas y descansar de verdad.",
    details: ["Masaje terapéutico", "Aceites esenciales", "Ambiente climatizado"],
    icon: "drop",
  },
];

/** Palabras para la cinta animada de especialidades. */
export const SPECIALTIES = [
  "Medicina naturista",
  "Nutrición clínica",
  "Psicología",
  "Jugoterapia",
  "Dietoterapia",
  "Gastronomía vegetariana",
  "Terapias de relajación",
];
