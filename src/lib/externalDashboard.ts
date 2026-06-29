// =============================================================================
// External Dashboard Redirect (temporary)
// =============================================================================
// While our in-app reset/activation checkout flows are still being finished,
// traders are redirected to the YPF-hosted dashboard at
// admin.dynastyfuturesdyn.com, which supports those flows today.
//
// This whole module is a temporary gate. To revert:
//   - Flip VITE_EXTERNAL_DASHBOARD to "false" (or remove it) in Vercel — no code
//     deploy needed; everything below no-ops and the in-app dashboard returns.
//   - Or git-revert the commit that introduced this file + its few call sites.
//
// A comma-separated allowlist of emails (VITE_DASHBOARD_ALLOWLIST) keeps specific
// accounts (staff / test traders) on our in-app dashboard even while the redirect
// is enabled.
//
// NOTE: this is a UI gate, not a security boundary — our dashboard is still
// auth-protected. It only hides an unfinished surface, so a client-side email
// allowlist is appropriate (manageable from Vercel without a code change).
// =============================================================================

import { env } from '@/config/env';

/** The YPF-hosted dashboard traders are redirected to while ours is unfinished. */
export const EXTERNAL_DASHBOARD_URL = 'https://admin.dynastyfuturesdyn.com';

// Pre-computed lowercase email allowlist.
const allowlist = new Set(
  env.dashboardAllowlist
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean),
);

/**
 * Whether the given user should be bounced to the external (YPF) dashboard.
 * Returns false when the redirect is disabled or the user's email is allowlisted.
 */
export const shouldUseExternalDashboard = (email?: string | null): boolean => {
  if (!env.externalDashboardEnabled) return false;
  if (email && allowlist.has(email.toLowerCase())) return false;
  return true;
};
