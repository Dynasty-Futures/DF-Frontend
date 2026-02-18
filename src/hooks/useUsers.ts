// =============================================================================
// Dynasty Futures - User React Query Hooks
// =============================================================================
// Custom hooks wrapping the user service with TanStack React Query.
//
// Usage:
//   const { data, isLoading } = useAdminUsers({ role: 'TRADER' });
//   const { data: user } = useAdminUser(userId);
// =============================================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { userService } from '@/services/users';
import type { ApiResponse, PaginatedResponse, ApiError } from '@/types/api';
import type { User, UserRole, UserFilters, UserStats } from '@/types/user';

// =============================================================================
// Query key factory
// =============================================================================

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  stats: () => [...userKeys.all, 'stats'] as const,
};

// =============================================================================
// Query hooks
// =============================================================================

/**
 * Fetch a paginated list of users with optional filters.
 */
export const useAdminUsers = (
  filters?: UserFilters,
  options?: Omit<UseQueryOptions<PaginatedResponse<User>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<PaginatedResponse<User>, ApiError>({
    queryKey: userKeys.list(filters),
    queryFn: () => userService.getUsers(filters),
    ...options,
  });

/**
 * Fetch a single user by ID.
 */
export const useAdminUser = (
  id: string,
  options?: Omit<UseQueryOptions<ApiResponse<User>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<User>, ApiError>({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUser(id),
    enabled: !!id,
    ...options,
  });

/**
 * Fetch user statistics (total, by role, by status).
 */
export const useUserStats = (
  options?: Omit<UseQueryOptions<ApiResponse<UserStats>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<UserStats>, ApiError>({
    queryKey: userKeys.stats(),
    queryFn: () => userService.getStats(),
    ...options,
  });

// =============================================================================
// Mutation hooks
// =============================================================================

/**
 * Change a user's role (admin only).
 * On success: invalidates user lists and the specific user detail.
 */
export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<User>,
    ApiError,
    { id: string; role: UserRole }
  >({
    mutationFn: ({ id, role }) => userService.changeRole(id, role),
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};
