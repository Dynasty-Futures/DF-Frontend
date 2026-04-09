/**
 * Public routes that should be prerendered for SEO.
 * These routes contain static content and don't require authentication.
 */
export const PUBLIC_ROUTES = [
  '/',
  '/pricing',
  '/rules',
  '/faq',
  '/support',
  '/legal',
] as const;
