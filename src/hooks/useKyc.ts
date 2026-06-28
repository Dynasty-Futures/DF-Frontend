// =============================================================================
// Dynasty Futures - KYC React Query Hooks
// =============================================================================
// Surfaces the trader's identity-verification status (synced from YPF) and the
// action to initiate it. The verification itself completes in YPF's portal.
// =============================================================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { kycService, type KycState } from '@/services/kyc';
import type { ApiResponse, ApiError } from '@/types/api';

export const kycKeys = {
  all: ['kyc'] as const,
  status: () => [...kycKeys.all, 'status'] as const,
};

/**
 * Fetch + refresh the trader's KYC status from YPF. Enabled only when signed in.
 */
export const useKycStatus = (enabled = true) =>
  useQuery<ApiResponse<KycState>, ApiError>({
    queryKey: kycKeys.status(),
    queryFn: () => kycService.status(),
    enabled,
    staleTime: 30_000,
  });

/**
 * Initiate verification on YPF, then write the refreshed status into the cache.
 */
export const useRequestKyc = () => {
  const qc = useQueryClient();
  return useMutation<ApiResponse<KycState>, ApiError, void>({
    mutationFn: () => kycService.request(),
    onSuccess: (data) => {
      qc.setQueryData(kycKeys.status(), data);
    },
  });
};
