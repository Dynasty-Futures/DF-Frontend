// =============================================================================
// Dynasty Futures Frontend - Environment Configuration
// =============================================================================
// Typed access to Vite environment variables with sensible defaults.
// All VITE_* vars are baked in at build time (not runtime secrets).
//
// Usage:
//   import { env } from '@/config/env';
//   console.log(env.apiUrl);  // "" in dev (proxy), "https://..." in prod
// =============================================================================

export const env = {
  /**
   * Backend API base URL.
   * - Development: empty string (Vite dev proxy forwards /v1/* to localhost:3000)
   * - Production: full URL like "https://api.dynastyfuturesdyn.com"
   */
  apiUrl: import.meta.env.VITE_API_URL || '',

  /** API version prefix (e.g. "v1") */
  apiVersion: import.meta.env.VITE_API_VERSION || 'v1',

  /** When true, components should use mock data instead of real API calls */
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',

  /** When true, the API client logs requests/responses to the browser console */
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',

  /** Application display name */
  appName: import.meta.env.VITE_APP_NAME || 'Dynasty Futures',

  /** Support contact email */
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@dynastyfuturesdyn.com',

  /** Google OAuth Client ID (required for Google SSO) */
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',

  /** True when running `npm run build` (NODE_ENV=production) */
  isProduction: import.meta.env.PROD,

  /** True when running `npm run dev` (NODE_ENV=development) */
  isDevelopment: import.meta.env.DEV,

  /**
   * Full base path for API requests.
   * - Development: "/v1" (proxied by Vite to localhost:3000)
   * - Production: "https://api.dynastyfuturesdyn.com/v1"
   */
  get apiBasePath(): string {
    const base = this.apiUrl ? this.apiUrl.replace(/\/$/, '') : '';
    return `${base}/${this.apiVersion}`;
  },
} as const;
