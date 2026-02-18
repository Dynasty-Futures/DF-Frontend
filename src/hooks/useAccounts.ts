// =============================================================================
// Dynasty Futures - Account React Query Hooks
// =============================================================================
// Custom hooks wrapping the account service with TanStack React Query.
// Queries auto-cache and refetch; mutations invalidate relevant caches.
//
// Usage:
//   const { data, isLoading } = useAdminAccounts({ status: 'FUNDED' });
//   const { data: account } = useAdminAccount(accountId);
// =============================================================================

import {
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { accountService } from '@/services/accounts';
import type { ApiResponse, PaginatedResponse, ApiError } from '@/types/api';
import type {
  AdminAccount,
  AccountFilters,
  AccountStats,
} from '@/types/account';

// =============================================================================
// Query key factory -- ensures consistent cache keys across the app
// =============================================================================

export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  list: (filters?: AccountFilters) => [...accountKeys.lists(), filters] as const,
  details: () => [...accountKeys.all, 'detail'] as const,
  detail: (id: string) => [...accountKeys.details(), id] as const,
  stats: () => [...accountKeys.all, 'stats'] as const,
};

// =============================================================================
// Query hooks
// =============================================================================

/**
 * Fetch a paginated list of accounts with optional filters.
 */
export const useAdminAccounts = (
  filters?: AccountFilters,
  options?: Omit<UseQueryOptions<PaginatedResponse<AdminAccount>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<PaginatedResponse<AdminAccount>, ApiError>({
    queryKey: accountKeys.list(filters),
    queryFn: () => accountService.getAccounts(filters),
    ...options,
  });

/**
 * Fetch a single account by ID.
 */
export const useAdminAccount = (
  id: string,
  options?: Omit<UseQueryOptions<ApiResponse<AdminAccount>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<AdminAccount>, ApiError>({
    queryKey: accountKeys.detail(id),
    queryFn: () => accountService.getAccount(id),
    enabled: !!id,
    ...options,
  });

/**
 * Fetch account statistics (total, by status).
 */
export const useAccountStats = (
  options?: Omit<UseQueryOptions<ApiResponse<AccountStats>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<AccountStats>, ApiError>({
    queryKey: accountKeys.stats(),
    queryFn: () => accountService.getStats(),
    ...options,
  });
