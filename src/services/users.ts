// =============================================================================
// Dynasty Futures - User Service
// =============================================================================
// Maps to the backend's /v1/users endpoints.
// Each function returns the raw API response -- React Query hooks handle caching.
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { User, UserFilters, UserStats } from '@/types/user';

export const userService = {
  // ---------------------------------------------------------------------------
  // Queries
  // ---------------------------------------------------------------------------

  /**
   * List users with optional filtering and pagination.
   * GET /v1/users?role=TRADER&status=ACTIVE&page=1&limit=20
   */
  getUsers: (filters?: UserFilters): Promise<PaginatedResponse<User>> =>
    apiClient.get<PaginatedResponse<User>>('/users', {
      params: filters as Record<string, unknown>,
    }),

  /**
   * Get a single user by ID.
   * GET /v1/users/:id
   */
  getUser: (id: string): Promise<ApiResponse<User>> =>
    apiClient.get<ApiResponse<User>>(`/users/${id}`),

  /**
   * Get user statistics (total, by role, by status).
   * GET /v1/users/stats
   */
  getStats: (): Promise<ApiResponse<UserStats>> =>
    apiClient.get<ApiResponse<UserStats>>('/users/stats'),
} as const;
