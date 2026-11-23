/**
 * Categorías de referencia de la tienda. Los productos, precios y stock reales
 * viven en la tienda en línea (SITE.storeUrl); aquí solo se describe qué encontrar.
 */
export type CategoryIcon = "leaf" | "pill" | "grains" | "baby" | "drop" | "orange";

export const STORE_CATEGORIES: { title: string; text: string; icon: CategoryIcon }[] = [
  {
    title: "Medicina naturista",
    text: "Preparados herbales y extractos para depurar y fortalecer tu organismo.",
    icon: "leaf",
  },
  {
    title: "Suplementos y vitaminas",
    text: "Complejos vitamínicos y suplementos naturales para tu energía diaria.",
    icon: "pill",
  },
  {
    title: "Alimentos saludables",
    text: "Granolas, snacks integrales y opciones para una alimentación más sana.",
    icon: "grains",
  },
  {
    title: "Bebidas naturales",
    text: "Preparados y bebidas refrigeradas listas para llevar.",
    icon: "orange",
  },
  {
    title: "Cuidado personal",
    text: "Productos naturales para el cuidado de tu piel y tu cabello.",
    icon: "drop",
  },
  {
    title: "Cuidado infantil",
    text: "Productos naturales pensados para los más pequeños de la casa.",
    icon: "baby",
  },
];
