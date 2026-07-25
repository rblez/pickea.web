# Pickea SRL — Tienda al por mayor en Cuba

## Stack
- SvelteKit v2 + Svelte 5 (runes: `$state`, `$derived`, `$effect`, `$props`)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` directive)
- TypeScript 6, Vite 8
- Static adapter (`@sveltejs/adapter-static`) — no server code at all
- Package manager: **bun** (see bun.lock)
- Deploy: **Vercel** (see vercel.json, basePath: `/v1`)

## Key architecture
- **Fully static SPA** — no load functions, form actions, API routes, or endpoints
- **Base path `/v1`** — every internal link must use `$app/paths` `base` (e.g. `{base + '/products'}`)
- Cart is `$state` runes + localStorage in `src/lib/stores/cart.svelte.ts`
- Checkout sends order via WhatsApp to `+53 63807214`
- Product catalog: `src/lib/data/products.json` (add/edit products here); import via `$lib/data/products` (typed re-export, not the `.json` directly)
- Categories: defined in `src/lib/data/categories.ts` — each product has `category` and `subcategory` string fields
- Currency rates: `src/lib/data/currencies.ts` (USD=1, EUR=1.1667, CUP=660)
- Types: `src/lib/types.ts`
- No `instructions` field on products — kept intentionally minimal

## Routes
| Path | File | Purpose |
|------|------|---------|
| `/` | `src/routes/+page.svelte` | Redirects to `/products` |
| `/products` | `src/routes/products/+page.svelte` | Catalog with search + category + currency filter |
| `/cart` | `src/routes/cart/+page.svelte` | Cart with quantity controls |
| `/checkout` | `src/routes/checkout/+page.svelte` | Form → WhatsApp redirect |

## Commands
- `bun run dev` — dev server
- `bun run build` — production build (outputs to `/build`)
- `bun run preview` — preview production build
- `bun run check` — svelte-check type checking (runs `svelte-kit sync` first)
- `bun run prepare` — `svelte-kit sync` (generates `.svelte-kit` types)

## Conventions
- All text is in **Spanish** (app name: Pickea SRL)
- Static images go in `static/images/`, referenced as `{base + '/images/...'}`
- No `.env` files — no secrets or server-side config needed
- Mobile: fixed bottom nav with icons; desktop: horizontal top nav
