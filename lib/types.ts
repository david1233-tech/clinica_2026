export type ProductCategory =
  | "medicina-naturista"
  | "nutricion"
  | "bienestar"
  | "complementos";

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Precio en soles (PEN). */
  price: number;
  category: ProductCategory;
  tags: string[];
  features: string[];
}

export type ServiceIcon = "leaf" | "bowl" | "heart" | "drop";

export interface Service {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  details: string[];
  icon: ServiceIcon;
}
