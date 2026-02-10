/// <reference types="vite/client" />

// =============================================================================
// Dynasty Futures - Vite Environment Variable Type Declarations
// =============================================================================
// These provide autocomplete and type safety for import.meta.env.VITE_* vars.
// Keep in sync with .env.example when adding new variables.
// =============================================================================

interface ImportMetaEnv {
  /** Backend API base URL. Empty in dev (Vite proxy), full URL in production. */
  readonly VITE_API_URL: string;
  /** API version prefix (e.g. "v1") */
  readonly VITE_API_VERSION: string;
  /** Use mock data instead of real API ("true" | "false") */
  readonly VITE_USE_MOCK_DATA: string;
  /** Enable debug logging in browser console ("true" | "false") */
  readonly VITE_DEBUG_MODE: string;
  /** Application display name */
  readonly VITE_APP_NAME: string;
  /** Support contact email */
  readonly VITE_SUPPORT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
