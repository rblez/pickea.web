# Pickea

Servicios digitales para Cuba. Recargas, streaming, suscripciones, licencias y más.

## Stack

- SvelteKit v2 + Svelte 5 (runes)
- Tailwind CSS v4
- TypeScript, Vite 8
- Static adapter (`@sveltejs/adapter-static`) — SPA fallback
- PWA con Service Worker + manifest
- Capacitor Android (APK via GitHub Actions)

## Desarrollo

```bash
bun install
bun run dev
```

## Build

```bash
bun run build        # Web → /build
```

## Deploy

La web se despliega automáticamente en **Vercel** al pushear a `main`.  
Dominio: [pickea.rblez.com](https://pickea.rblez.com)

## APK

Cada push a `main` genera un APK firmado en GitHub Actions.  
Descargar: [pickea.rblez.com/download](https://pickea.rblez.com/download)  
El contenido se actualiza vía Service Worker — no requiere reinstalar.

## Estructura

```
src/
├── lib/
│   ├── components/    # UI components
│   ├── data/          # Productos, categorías, monedas
│   ├── stores/        # Carrito (localStorage), filtros, modal
│   └── types.ts
├── routes/
│   ├── +page.svelte        # Catálogo con banner, búsqueda, categorías
│   ├── cart/               # Carrito
│   ├── checkout/           # Checkout → WhatsApp
│   ├── download/           # Descarga APK
│   ├── tos/                # Términos y condiciones
│   └── p/[id]/             # Página de producto dinámica
static/
├── images/
├── fonts/
├── manifest.json     # PWA manifest
└── sw.js             # Service Worker
```

## Funcionalidades

- Catálogo con búsqueda y filtros por categoría
- Variantes de producto con selector
- Estado "Agotado" por producto o variante
- Banner promocional en home
- Modal de producto (Comprar / Añadir al carrito / Compartir)
- Carrito persistente (localStorage)
- Checkout → envío de pedido por WhatsApp (+53 63807214)
- Detección de conexión offline
- Scroll-to-top
- PWA instalable
- Dark theme (#080808)
- Responsive (móvil 2 cols, desktop 4 cols)
- APK Android con branding Pickea

## Contacto

- WhatsApp: [+53 63807214](https://wa.me/5363807214)
- Telegram: [@pickeaofc](https://t.me/pickeaofc)
- Instagram: [@pickea\_](https://instagram.com/pickea_)
