# Centro Vital Salud

Sitio web del Centro Vital Salud (Yanahuara, Arequipa): medicina naturista, nutrición clínica, psicología, terapias y productos naturales.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

La bienvenida (la Tierra se acerca hasta Yanahuara) sale una vez por sesión y se omite si el
dispositivo pide "reducir movimiento". Para verla siempre: `http://localhost:3000/?intro`.
Partículas de otra temporada: `http://localhost:3000/?temporada=navidad` (claves en `lib/seasons.ts`).

## Estructura

```
app/                 Rutas: inicio, nosotros, servicios, productos, contacto, 404,
                     sitemap.xml, robots.txt y /api/products
components/
  brand/             Logo, árbol del logo animado, íconos de redes
  layout/            Header (menú móvil + modo oscuro), footer, bienvenida
  ui/                Titular animado, tarjetas con foco de luz, cinta, aurora…
  effects/           Partículas de temporada (canvas)
  contact/           Formulario que envía el mensaje por WhatsApp
lib/
  site.ts            Datos del negocio: teléfonos, dirección, horario, redes, menú
  data/              Servicios y productos
  seasons.ts         Calendario de temporadas (zona horaria de Lima)
  useSeason.ts       Temporada activa calculada en el navegador
```

**Para cambiar datos del negocio** (teléfono, horario, redes, productos) edita solo `lib/site.ts` y `lib/data/`.

## Temas

- Claro: «Mañana en Yanahuara». Oscuro: «Bosque de Noche». Tokens en `app/globals.css`.
- Por defecto sigue al sistema; el botón del header guarda la preferencia.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **Add New → Project**, importa el repositorio y pulsa **Deploy** (detecta Next.js solo).
3. Opcional: si usas dominio propio, define la variable `NEXT_PUBLIC_SITE_URL=https://tudominio.pe`
   para el sitemap y las etiquetas Open Graph.
