# Pickea — Servicios digitales para Cuba

## Stack
- SvelteKit v2 + Svelte 5 (runes: `$state`, `$derived`, `$effect`, `$props`)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` directive)
- TypeScript 6, Vite 8
- Static adapter (`@sveltejs/adapter-static`) — fallback `index.html`
- Package manager: **bun**
- Deploy: **Vercel** (vercel.json, framework: null, SPA fallback)
- APK: **Capacitor Android** via GitHub Actions (push to `main` → builds APK)

## Key architecture
- **Fully static SPA** — no load functions, form actions, API routes, or endpoints
- Navbar search + category pills use shared rune state in `src/lib/stores/filters.svelte.ts`
- Cart is `$state` runes + localStorage in `src/lib/stores/cart.svelte.ts`
- Checkout sends order via WhatsApp to `+53 63807214`
- Product catalog: `src/lib/data/products.json`; import via `$lib/data/products`
- Categories: `src/lib/data/categories.ts` — each product has `category` string
- Currency: CUP only (rates in `src/lib/data/currencies.ts`)
- Types: `src/lib/types.ts`
- Theme: dark (`#080808`), accent green (`#22C55E`), font SF Pro Rounded
- Icons: Remix Icons (UI) + SimpleIcons (socials)

## Routes
| Path | File | Purpose |
|------|------|---------|
| `/` | `src/routes/+page.svelte` | Catalog with banner, search, category filter, product grid |
| `/cart` | `src/routes/cart/+page.svelte` | Cart with quantity controls, variant label |
| `/checkout` | `src/routes/checkout/+page.svelte` | Form → WhatsApp redirect |
| `/tos` | `src/routes/tos/+page.svelte` | Términos de Servicio |
| `/p/[id]` | `src/routes/p/[id]/+page.svelte` | Product detail page with OG meta |

## Commands
- `bun run dev` — dev server
- `bun run build` — production build (outputs to `/build`)
- `bun run preview` — preview production build
- `bun run check` — svelte-check type checking

## Conventions
- All text in **Spanish** (app name: Pickea)
- Images in `static/images/`, referenced as `/images/...`
- No `.env` files — no secrets or server-side config
- Theme: dark bg `#080808`, cards `#111`, borders `#222`, accent `#22C55E`
- Mobile: responsive navbar, category pills, product grid 2 cols
