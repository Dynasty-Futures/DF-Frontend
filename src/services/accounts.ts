// =============================================================================
// Dynasty Futures - Account Service
// =============================================================================
// Maps to the backend's /v1/accounts endpoints.
// Each function returns the raw API response -- React Query hooks handle caching.
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type {
  AdminAccount,
  AccountFilters,
  AccountStats,
} from '@/types/account';

export const accountService = {
  // ---------------------------------------------------------------------------
  // Queries
  // ---------------------------------------------------------------------------

  /**
   * List accounts with optional filtering and pagination.
   * GET /v1/accounts?status=FUNDED&page=1&limit=20
   */
  getAccounts: (filters?: AccountFilters): Promise<PaginatedResponse<AdminAccount>> =>
    apiClient.get<PaginatedResponse<AdminAccount>>('/accounts', {
      params: filters as Record<string, unknown>,
    }),

  /**
   * Get a single account by ID.
   * GET /v1/accounts/:id
   */
  getAccount: (id: string): Promise<ApiResponse<AdminAccount>> =>
    apiClient.get<ApiResponse<AdminAccount>>(`/accounts/${id}`),

  /**
   * Get account statistics (total, by status).
   * GET /v1/accounts/stats
   */
  getStats: (): Promise<ApiResponse<AccountStats>> =>
    apiClient.get<ApiResponse<AccountStats>>('/accounts/stats'),
} as const;
