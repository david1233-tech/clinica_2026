import { PRODUCTS } from "@/lib/data/products";

/** GET /api/products — catálogo público de productos. */
export function GET() {
  return Response.json({ data: PRODUCTS });
}
