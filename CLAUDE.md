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

- `AuthContext` (`src/contexts/AuthContext.tsx`) — central auth state: user, login/logout/register, role checks. Access token lives in memory via `useRef` (never in storage); refresh token in `localStorage`.
- Token bridge: `setTokenAccessor()` in `api.ts` is registered by AuthContext so the API client can synchronously read the access token without depending on React renders.
- Three auth hooks in `src/hooks/useAuth.ts` cascade: `useAuth()` → `useRequireAuth()` (redirects to `/login`) → `useRequireRole()` (redirects to `/dashboard`). `ProtectedRoute` and `RoleGuard` use these internally.
- `AdminFiltersContext` — shares filter state (dateRange, plan, status) across admin tabs without prop drilling.
- TanStack Query handles server state (5min stale time, 1 retry, no retries on mutations).

### API Layer

All API calls go through `src/services/api.ts`:
- In dev, requests to `/v1/*` are proxied to `localhost:3000` via Vite config.
- In prod, uses `VITE_API_URL` env var.
- Bearer token is auto-attached from `AuthContext`.
- Errors are normalized to `ApiError`.
- `ApiError` has status-aware getters: `isClientError`, `isForbidden`, `isRateLimited`, etc.
- Domain services (`auth.ts`, `accounts.ts`, `users.ts`, `support.ts`, `checkout.ts`) import the `apiClient` from `api.ts`.

### Data Fetching Hooks

Custom hooks in `src/hooks/` wrap services with TanStack Query. They follow a **query key factory** pattern for cache consistency:

```ts
export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  list: (filters) => [...accountKeys.lists(), filters] as const,
  // ...
};
```

New data-fetching hooks should follow this same pattern (see `useAccounts.ts` as reference).

### Environment Variables

Typed and validated in `src/config/env.ts`. Use `VITE_` prefix for all client-side vars. See `.env.example` for the full list (includes `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`, `VITE_DEBUG_MODE`).

### Admin Architecture

- Admin tabs live in `src/components/admin/tabs/` — each independently lazy-loaded under `/admin/*`.
- `AdminDataTable<T>` (`src/components/admin/AdminDataTable.tsx`) is a generic table component used across all tabs. Define columns via `Column<T>` with optional `render()` functions. Sorting/filtering are client-side.
- **Many admin tabs still use mock data** from inline `mockAdminData` objects — check if a real endpoint exists before wiring up new features.

### UI Conventions

- Component library: shadcn/ui (Radix primitives) — add new components via `npx shadcn@latest add <component>`, configured in `components.json`.
- Forms use `react-hook-form` with shadcn's `<Form>` wrapper (`src/components/ui/form.tsx`).
- Tailwind dark mode uses the `class` strategy (toggled by `next-themes`).
- Custom Tailwind tokens: colors `gold`, `stone`, `charcoal`; animations `glow-pulse`, `float`, `shimmer`, `achievement-unlock`, `confetti`.
- Glass morphism: `.glass`, `.glass-card`, `.glass-card-strong` classes in `index.css`. These degrade gracefully under performance flags (see below).
- Toasts: `sonner` is the toast library (imported via `src/components/ui/sonner.tsx`). There's also a legacy `use-toast.ts` hook in both `src/hooks/` and `src/components/ui/` — prefer `sonner` for new code.
- Path alias: `@` → `src/`.

### Performance Flags

`src/lib/perfFlags.ts` reads URL query params to disable expensive effects:
- `?noHeroVideo=1` — disables hero video background
- `?noAtmosphere=1` — disables atmospheric particle effects
- `?noBlur=1` — adds `perf-no-blur` class to `<html>`, disabling all `backdrop-filter` in CSS

`useScrollReveal` also respects `prefers-reduced-motion` automatically.

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
