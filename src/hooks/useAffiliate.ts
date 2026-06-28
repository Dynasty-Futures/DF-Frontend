// =============================================================================
// Dynasty Futures - Affiliate React Query Hooks
// =============================================================================
// Surfaces the trader's affiliate status, referral code, and discount coupons.
// All data is mirrored from the affiliate-platform webhooks; earnings and
// performance metrics are not available without a service token.
// =============================================================================

import { useQuery } from '@tanstack/react-query';
import { affiliateService, type MyAffiliateStatus } from '@/services/affiliates';
import type { ApiResponse, ApiError } from '@/types/api';

export const affiliateKeys = {
  all: ['affiliate'] as const,
  me: () => [...affiliateKeys.all, 'me'] as const,
};

/**
 * Fetch the current user's affiliate status. Enabled only when signed in.
 */
export const useAffiliateStatus = (enabled = true) =>
  useQuery<ApiResponse<MyAffiliateStatus>, ApiError>({
    queryKey: affiliateKeys.me(),
    queryFn: () => affiliateService.me(),
    enabled,
    staleTime: 60_000,
  });
