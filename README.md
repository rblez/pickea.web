# Pickea

Servicios digitales para Cuba. Recargas, streaming, suscripciones, licencias y más.

## Stack

- SvelteKit v2 + Svelte 5 (runes)
- Tailwind CSS v4
- TypeScript, Vite 8
- Static adapter (`@sveltejs/adapter-static`)
- PWA con Service Worker + manifest

## Desarrollo

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Deploy en Vercel

1. Conectar repo `rblez/pickea.web`
2. Framework: SvelteKit
3. Build command: `bun run build`
4. Output directory: `build`
5. Dominio: `pickea.rblez.com`

## Estructura

```
src/
├── lib/
│   ├── components/    # UI components
│   ├── data/          # Productos, categorías, monedas
│   ├── stores/        # Carrito (localStorage)
│   └── types.ts
├── routes/
│   ├── +page.svelte        # Home (catálogo + hero)
│   ├── cart/               # Carrito
│   ├── checkout/           # Checkout → WhatsApp
│   ├── tos/                # Términos y condiciones
│   └── products/           # Redirect a /
static/
├── images/
├── fonts/
├── manifest.json     # PWA manifest
└── sw.js             # Service Worker
```

## Funcionalidades

- Catálogo con búsqueda y filtros por categoría
- Modal de producto (Comprar / Añadir al carrito / Compartir)
- Carrito persistente (localStorage)
- Checkout → envío de pedido por WhatsApp (+53 63807214)
- Splash screen con animación
- Detección de conexión offline
- Scroll-to-top
- PWA instalable
- Dark theme
- Responsive (móvil 2 cols, desktop 4 cols)

## Contacto

WhatsApp: [+53 63807214](https://wa.me/5363807214)
