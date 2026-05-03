# AGENTS.md — history-map

## Project

"旧舆迷途" — interactive historical map time-travel platform. Chinese-primary, English-secondary UI.

The actual app lives in `history-map/`. The repo root holds planning docs only.

## Commands

All commands must run inside `history-map/`:

- `pnpm dev` — dev server on **port 3049** (not 3000)
- `pnpm build` — Next.js production build (also type-checks)
- `pnpm lint` — ESLint with `next/core-web-vitals` + TypeScript config

No test framework is configured.

## Architecture

- **Stack**: Next.js 16 (App Router) · TypeScript · Tailwind v4 · Mapbox GL · Three.js · Framer Motion
- **Path alias**: `@/*` → `./src/*`
- **Routes**:
  - `/` — landing page (hero + timeline + compass)
  - `/map` — 3D Mapbox globe view
  - `/map/flat` — 2D flat map view
- **All map components are `"use client"`** — Mapbox requires browser APIs
- **Data**: `src/data/ancientCities.ts` is the static city dataset and `AncientCity` type definition

## Environment

- `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local` is required for maps to render
- Token is embedded as `NEXT_PUBLIC_*` so it's client-exposed; do not move to server-only env

## Styling

- Tailwind v4 via `@tailwindcss/postcss`
- Custom theme colors defined as CSS variables in `src/app/globals.css` (`--accent`, `--surface`, etc.) and exposed via `@theme inline`
- Three custom animations: `breathe`, `glow-pulse`, `hud-flicker`
- Font stack: "Playfair Display" (display) + "Noto Serif SC" (body, loaded via Google Fonts `@import`)
- Map layer colors are overridden at runtime in `MapBackground.tsx` — uses `GOLD` / `GOLD_DIM` / `GOLD_FAINT` / `BG` constants

## Conventions

- Package manager: **pnpm** (see `pnpm-workspace.yaml`)
- The `lib/`, `styles/`, `types/` directories under `src/` exist but are currently empty
- The `eslint-disable-next-line react-hooks/exhaustive-deps` comments on `useCallback`/`useEffect` deps are intentional — callbacks don't need to re-capture changing values within imperative Mapbox/Three.js refs