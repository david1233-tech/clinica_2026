import type { Product, ProductCategory } from "@/lib/types";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "medicina-naturista": "Medicina naturista",
  nutricion: "Nutrición",
  bienestar: "Bienestar",
  complementos: "Complementos",
};

export const PRODUCTS: Product[] = [
  {
    id: "decoction-medicina-natural",
    name: "Decoction Medicina Natural",
    description:
      "Preparación tradicional con extractos herbales para depuración y fortalecimiento inmunológico.",
    price: 250,
    category: "medicina-naturista",
    tags: ["depuración", "inmunidad", "herbal"],
    features: [
      "Extracto de hierbas seleccionadas",
      "Sistema de extracción tradicional",
      "Validado por especialistas",
    ],
  },
  {
    id: "kit-nutricion-integral",
    name: "Kit Nutrición Integral",
    description:
      "Combinación de suplementos naturales para nutrición completa y revitalización celular.",
    price: 380,
    category: "nutricion",
    tags: ["nutrición", "suplementos", "bienestar"],
    features: ["Complejo vitamínico", "Omega-3 concentrado", "Extracto de maca"],
  },
  {
    id: "suplemento-vitaminas-naturales",
    name: "Suplemento Vitaminas Naturales",
    description:
      "Complemento con vitaminas de origen natural para soporte inmune y energía.",
    price: 95,
    category: "complementos",
    tags: ["vitaminas", "inmunidad", "energía"],
    features: ["Complejo multivitamínico", "Sin conservantes", "Uso diario"],
  },
  {
    id: "jarabe-natural-infantil",
    name: "Jarabe Natural Cuidado Infantil",
    description:
      "Jarabe con hierbas naturales para el cuidado diario del sistema inmune en niños.",
    price: 85,
    category: "nutricion",
    tags: ["infantil", "inmunidad", "herbal"],
    features: ["Sabor frutal", "Sin azúcares añadidos", "Validado para uso infantil"],
  },
];

const priceFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => priceFormatter.format(value);
