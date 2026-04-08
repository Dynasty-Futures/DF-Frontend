# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (port 8080, proxies /v1/* → localhost:3000)
npm run build      # Production build
npm run build:dev  # Dev-mode build
npm run lint       # ESLint validation
npm run preview    # Preview production build locally
```

No test suite is configured. Verify changes manually via `npm run dev`.

## Architecture

**Stack:** React 18 + TypeScript + Vite (SWC) + React Router v6 + TanStack Query + Tailwind CSS + shadcn/ui

### Routing

Three route tiers, all defined in `src/App.tsx`:
- **Public** — marketing/auth pages (`/`, `/pricing`, `/login`, `/register`, etc.)
- **Protected** (`/dashboard/*`) — Requires auth via `ProtectedRoute` wrapping `AuthContext`
- **Admin** (`/admin/*`) — Requires `ADMIN` role via `RoleGuard`

Routes are lazy-loaded (except dashboard home). Scroll-to-top is handled globally on navigation.

### Authentication & State

- `AuthContext` (`src/contexts/AuthContext.tsx`) — central auth state: user, login/logout/register, role checks. Access token lives in memory; refresh token in `localStorage`.
- `AdminFiltersContext` — scoped state for admin table filters.
- TanStack Query handles server state (5min stale time, 1 retry, no retries on mutations).

### API Layer

All API calls go through `src/services/api.ts`:
- In dev, requests to `/v1/*` are proxied to `localhost:3000` via Vite config.
- In prod, uses `VITE_API_URL` env var.
- Bearer token is auto-attached from `AuthContext`.
- Errors are normalized to `ApiError`.
- Domain services (`auth.ts`, `accounts.ts`, `users.ts`, `support.ts`, `checkout.ts`) import the `apiClient` from `api.ts`.

### Environment Variables

Typed and validated in `src/config/env.ts`. Use `VITE_` prefix for all client-side vars. See `.env.example` for the full list (includes `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`, `VITE_DEBUG_MODE`).

### UI Conventions

- Component library: shadcn/ui (Radix primitives) — add new components via `npx shadcn@latest add <component>`, configured in `components.json`.
- Tailwind dark mode uses the `class` strategy (toggled by `next-themes`).
- Custom Tailwind tokens: colors `gold`, `stone`, `charcoal`; animations `glow-pulse`, `float`, `shimmer`, `achievement-unlock`, `confetti`.
- Path alias: `@` → `src/`.

### Key Directories

| Path | Purpose |
|---|---|
| `src/pages/` | Page-level containers (one per route) |
| `src/components/` | Shared UI; `admin/` and `dashboard/` subfolders for section-specific components |
| `src/services/` | API client + domain service modules |
| `src/contexts/` | React contexts (auth, admin filters) |
| `src/hooks/` | Custom hooks |
| `src/types/` | Shared TypeScript types (`user.ts`, `api.ts`) |
| `src/config/` | Typed env config |
| `src/lib/` | Utilities (e.g., `perfFlags.ts`) |

### Deployment

Deployed on Vercel. `vercel.json` contains SPA rewrite rules that redirect all routes to `index.html`.
