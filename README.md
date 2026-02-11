# Dynasty Futures - Frontend

The client-side application for **Dynasty Futures**, a proprietary trading firm offering simulated funded accounts to qualified futures traders. Built with React, TypeScript, Vite, and Tailwind CSS.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routing Overview](#routing-overview)
- [Backend Integration](#backend-integration)
- [UI Component Library](#ui-component-library)
- [Styling](#styling)
- [Deployment](#deployment)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 18](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Build Tool | [Vite 5](https://vitejs.dev) (SWC compiler) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) + CSS variables |
| UI Components | [shadcn/ui](https://ui.shadcn.com) (Radix primitives) |
| Routing | [React Router 6](https://reactrouter.com) |
| Data Fetching | [TanStack React Query 5](https://tanstack.com/query) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) validation |
| Charts | [Recharts](https://recharts.org) |
| Notifications | [Sonner](https://sonner.emilkowal.dev) + Radix Toast |
| Fonts | Outfit (body), Space Grotesk (display) |
| Deployment | [Vercel](https://vercel.com) |

---

## Project Structure

```
DF-Frontend/
├── public/                     # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/                 # Images & logos
│   ├── components/
│   │   ├── admin/              # Admin panel components & tabs
│   │   │   └── tabs/           # Individual admin tab views
│   │   ├── dashboard/          # Trader dashboard components
│   │   ├── home/               # Landing page sections
│   │   ├── icons/              # Custom SVG icon components
│   │   ├── layout/             # Navbar, Footer, Layout wrapper
│   │   └── ui/                 # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── config/
│   │   └── env.ts              # Typed environment variable access
│   ├── contexts/               # React context providers
│   ├── data/                   # Mock data for development
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   ├── pages/
│   │   ├── admin/              # Admin page wrapper
│   │   └── dashboard/          # Dashboard sub-pages
│   ├── services/
│   │   ├── api.ts              # Fetch-based API client
│   │   └── support.ts          # Support ticket service
│   ├── types/                  # TypeScript type definitions
│   ├── App.tsx                 # Root component with route definitions
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles & Tailwind directives
├── .env                        # Base environment variables
├── .env.development            # Dev overrides (Vite proxy, debug mode)
├── .env.production             # Production overrides (API URL)
├── .env.example                # Reference for all available env vars
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind theme & custom animations
├── vite.config.ts              # Vite config (proxy, aliases)
├── vercel.json                 # Vercel SPA rewrite rules
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18 (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- **npm** >= 9 (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd DF-Frontend

# Install dependencies
npm install

# Start the development server (http://localhost:8080)
npm run dev
```

The dev server starts on **port 8080** and automatically proxies API requests (`/v1/*`, `/health`, `/ready`) to `http://localhost:3000`, so you can run the backend locally without CORS issues.

---

## Environment Variables

All environment variables are prefixed with `VITE_` and baked in at build time. They are accessed via `@/config/env.ts` for type-safe usage throughout the app.

| Variable | Description | Dev Default | Prod Default |
|---|---|---|---|
| `VITE_API_URL` | Backend API base URL | *(empty - uses Vite proxy)* | `https://api.dynastyfuturesdyn.com` |
| `VITE_API_VERSION` | API version prefix | `v1` | `v1` |
| `VITE_USE_MOCK_DATA` | Use mock data instead of real API | `false` | `false` |
| `VITE_DEBUG_MODE` | Log API requests to browser console | `true` | `false` |
| `VITE_APP_NAME` | Application display name | `Dynasty Futures` | `Dynasty Futures` |
| `VITE_SUPPORT_EMAIL` | Support contact email | `support@dynastyfuturesdyn.com` | `support@dynastyfuturesdyn.com` |

**Loading order** (later overrides earlier): `.env` -> `.env.local` -> `.env.[mode]` -> `.env.[mode].local`

Create a `.env.local` file for personal overrides (it is gitignored).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR on port 8080 |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development build (includes source maps) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## Routing Overview

### Public Pages

| Path | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, how it works, funding models |
| `/pricing` | Pricing | Plan comparison and purchase |
| `/rules` | Rules | Trading rules for each account type |
| `/faq` | FAQ | Frequently asked questions |
| `/support` | Support | Support ticket submission |
| `/legal` | Legal | Terms, privacy policy, disclaimers |
| `/login` | Login | User authentication |
| `/payouts` | Payouts | Payout structure information |

### Trader Dashboard (`/dashboard/*`)

Authenticated trader area wrapped in `DashboardLayout` with a sidebar and mobile nav.

| Path | Page |
|---|---|
| `/dashboard` | Dashboard Home (performance overview, analytics) |
| `/dashboard/accounts` | Account management |
| `/dashboard/billing` | Billing history |
| `/dashboard/payouts` | Payout requests & history |
| `/dashboard/affiliate` | Affiliate program |
| `/dashboard/profile` | User profile settings |
| `/dashboard/achievements` | Trading achievements & milestones |
| `/dashboard/help` | Help center |
| `/dashboard/journal/:date` | Daily trading journal |

### Admin Panel (`/admin/*`)

Internal administration area wrapped in `AdminPage` with a drawer navigation.

| Path | Tab |
|---|---|
| `/admin` | Overview dashboard |
| `/admin/accounts` | Account management |
| `/admin/risk` | Risk flags & monitoring |
| `/admin/payouts` | Payout processing |
| `/admin/users` | User management & KYC |
| `/admin/compliance` | Compliance tools |
| `/admin/billing` | Billing management |
| `/admin/audit` | Audit log |
| `/admin/health` | System health monitoring |
| `/admin/settings` | Platform settings |
| `/admin/support` | Support ticket management |
| `/admin/announcements` | Announcements |
| `/admin/products` | Product management |
| `/admin/integrations` | Third-party integrations |
| `/admin/security` | Security settings |

---

## Backend Integration

The frontend communicates with the Dynasty Futures backend via a typed API client located at `src/services/api.ts`.

### How It Works

- **Development**: API requests to `/v1/*` are proxied by Vite to `http://localhost:3000` (the local backend). No CORS configuration needed.
- **Production**: Requests are sent directly to the `VITE_API_URL` (e.g., `https://api.dynastyfuturesdyn.com/v1`).

### API Client Usage

```typescript
import { apiClient } from '@/services/api';

// GET request
const data = await apiClient.get<ResponseType>('/support/tickets');

// POST request
const result = await apiClient.post<ResponseType>('/support/tickets', { subject: '...' });

// With query parameters
const filtered = await apiClient.get<ResponseType>('/accounts', {
  params: { status: 'ACTIVE', page: 1 }
});
```

### Key Features

- Auto-attaches `Authorization: Bearer <token>` when a token accessor is registered
- Normalizes backend errors into typed `ApiError` instances
- Debug logging in development (controlled by `VITE_DEBUG_MODE`)
- Request cancellation via `AbortSignal`

---

## UI Component Library

This project uses [shadcn/ui](https://ui.shadcn.com) -- a collection of accessible, composable components built on [Radix UI](https://www.radix-ui.com) primitives. Components live in `src/components/ui/` and are fully customizable.

### Adding New Components

```bash
npx shadcn@latest add <component-name>
```

Configuration is managed in `components.json`. The path alias `@/components/ui` maps to the UI directory.

### Available Components

Accordion, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Input OTP, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable Panels, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip

---

## Styling

### Tailwind CSS

The project uses Tailwind CSS with an extensive custom theme defined in `tailwind.config.ts`:

- **Custom color system**: HSL-based CSS variables for easy theming (neon green accents, charcoal backgrounds, teal/soft-blue highlights)
- **Custom fonts**: Outfit (body), Space Grotesk (display headings)
- **Custom animations**: 20+ animations including fade-in, float, shimmer, breathe, glow-pulse, 3D icon effects, achievement unlocks, and more
- **Dark mode**: Class-based dark mode support (`darkMode: ["class"]`)

### Path Aliases

The `@` alias resolves to `src/`, so imports look like:

```typescript
import { Button } from '@/components/ui/button';
import { env } from '@/config/env';
import { apiClient } from '@/services/api';
```

---

## Deployment

### Vercel (Current)

The project is configured for Vercel with SPA rewrites in `vercel.json`. All routes fall through to `index.html` for client-side routing.

```bash
# Build for production
npm run build

# The dist/ folder is deployed automatically by Vercel
```

For Vercel deployments, set `VITE_API_URL` in the Vercel dashboard under **Project Settings > Environment Variables** (the dashboard value takes precedence over `.env.production`).

### Manual / Other Platforms

```bash
# Build the production bundle
npm run build

# Preview locally before deploying
npm run preview

# Deploy the dist/ directory to your hosting provider
```

The output is a static SPA -- any hosting that serves `index.html` for all routes will work (Vercel, Netlify, AWS S3 + CloudFront, etc.).
