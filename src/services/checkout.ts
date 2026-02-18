// =============================================================================
// Dynasty Futures - Checkout Service
// =============================================================================
// Typed API calls for Stripe checkout endpoints.
//
// Usage:
//   import { checkoutApi } from '@/services/checkout';
//   const { checkoutUrl } = await checkoutApi.createSession('standard', 25000);
// =============================================================================

import { apiClient } from '@/services/api';

// ---------------------------------------------------------------------------
// Response shapes (match backend JSON)
// ---------------------------------------------------------------------------

export interface CreateSessionResponse {
  success: true;
  data: {
    checkoutUrl: string;
  };
  message?: string;
}

// ---------------------------------------------------------------------------
// API methods
// ---------------------------------------------------------------------------

export const checkoutApi = {
  /**
   * Create a Stripe Checkout Session.
   * Returns the Stripe-hosted checkout URL to redirect the user to.
   */
  createSession: (planType: string, accountSize: number) =>
    apiClient.post<CreateSessionResponse>('/checkout/create-session', {
      planType,
      accountSize,
    }),
} as const;
