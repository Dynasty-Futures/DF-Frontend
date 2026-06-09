// =============================================================================
// Dynasty Futures - Payouts React Query Hooks
// =============================================================================
// Wraps the payouts service. Follows the query-key factory pattern from
// useTrading.ts. A successful request invalidates the eligible list + history
// (and trading accounts, since a payout affects withdrawable balance).
// =============================================================================

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { payoutService } from '@/services/payouts';
import { tradingKeys } from '@/hooks/useTrading';
import type { ApiResponse, ApiError } from '@/types/api';
import type {
  EligibleAccount,
  Payout,
  RequestPayoutPayload,
} from '@/services/payouts';

export const payoutKeys = {
  all: ['payouts'] as const,
  eligible: () => [...payoutKeys.all, 'eligible'] as const,
  history: () => [...payoutKeys.all, 'history'] as const,
};

export const useEligibleAccounts = (
  options?: Omit<
    UseQueryOptions<ApiResponse<EligibleAccount[]>, ApiError>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery<ApiResponse<EligibleAccount[]>, ApiError>({
    queryKey: payoutKeys.eligible(),
    queryFn: () => payoutService.getEligibleAccounts(),
    ...options,
  });

export const usePayoutHistory = (
  options?: Omit<
    UseQueryOptions<ApiResponse<Payout[]>, ApiError>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery<ApiResponse<Payout[]>, ApiError>({
    queryKey: payoutKeys.history(),
    queryFn: () => payoutService.getHistory(),
    ...options,
  });

export const useRequestPayout = (
  options?: UseMutationOptions<
    ApiResponse<Payout>,
    ApiError,
    RequestPayoutPayload
  >,
) => {
  const qc = useQueryClient();
  return useMutation<ApiResponse<Payout>, ApiError, RequestPayoutPayload>({
    mutationFn: (payload) => payoutService.requestPayout(payload),
    ...options,
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: payoutKeys.eligible() });
      qc.invalidateQueries({ queryKey: payoutKeys.history() });
      qc.invalidateQueries({ queryKey: tradingKeys.accounts() });
      options?.onSuccess?.(data, vars, ctx);
    },
  });
};
