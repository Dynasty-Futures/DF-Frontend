// =============================================================================
// Dynasty Futures - Support Ticket React Query Hooks
// =============================================================================
// Custom hooks wrapping the support service with TanStack React Query.
// Queries auto-cache and refetch; mutations invalidate relevant caches.
//
// Usage:
//   const { data, isLoading } = useTickets({ status: 'OPEN' });
//   const createTicket = useCreateTicket();
//   createTicket.mutate({ subject: '...', description: '...' });
// =============================================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { supportService } from '@/services/support';
import type { ApiResponse, PaginatedResponse, ApiError } from '@/types/api';
import type {
  SupportTicket,
  CreateTicketInput,
  UpdateTicketInput,
  AssignTicketInput,
  TicketFilters,
  TicketStats,
} from '@/types/support';

// =============================================================================
// Query key factory -- ensures consistent cache keys across the app
// =============================================================================

export const supportKeys = {
  all: ['support'] as const,
  tickets: () => [...supportKeys.all, 'tickets'] as const,
  ticketList: (filters?: TicketFilters) => [...supportKeys.tickets(), 'list', filters] as const,
  ticketDetail: (id: string) => [...supportKeys.tickets(), 'detail', id] as const,
  stats: () => [...supportKeys.all, 'stats'] as const,
  queue: (params?: { page?: number; limit?: number }) => [...supportKeys.all, 'queue', params] as const,
  userTickets: (userId: string, params?: { page?: number; limit?: number }) =>
    [...supportKeys.all, 'user', userId, params] as const,
  emailTickets: (email: string, params?: { page?: number; limit?: number }) =>
    [...supportKeys.all, 'email', email, params] as const,
};

// =============================================================================
// Query hooks
// =============================================================================

/**
 * Fetch a paginated list of tickets with optional filters.
 */
export const useTickets = (
  filters?: TicketFilters,
  options?: Omit<UseQueryOptions<PaginatedResponse<SupportTicket>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<PaginatedResponse<SupportTicket>, ApiError>({
    queryKey: supportKeys.ticketList(filters),
    queryFn: () => supportService.getTickets(filters),
    ...options,
  });

/**
 * Fetch a single ticket by ID.
 */
export const useTicket = (
  id: string,
  options?: Omit<UseQueryOptions<ApiResponse<SupportTicket>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<SupportTicket>, ApiError>({
    queryKey: supportKeys.ticketDetail(id),
    queryFn: () => supportService.getTicket(id),
    enabled: !!id,
    ...options,
  });

/**
 * Fetch ticket statistics (total, by status, by priority).
 */
export const useTicketStats = (
  options?: Omit<UseQueryOptions<ApiResponse<TicketStats>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<TicketStats>, ApiError>({
    queryKey: supportKeys.stats(),
    queryFn: () => supportService.getStats(),
    ...options,
  });

/**
 * Fetch unassigned tickets (support queue).
 */
export const useSupportQueue = (
  params?: { page?: number; limit?: number },
  options?: Omit<UseQueryOptions<PaginatedResponse<SupportTicket>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<PaginatedResponse<SupportTicket>, ApiError>({
    queryKey: supportKeys.queue(params),
    queryFn: () => supportService.getQueue(params),
    ...options,
  });

/**
 * Fetch tickets for a specific authenticated user.
 */
export const useUserTickets = (
  userId: string,
  params?: { page?: number; limit?: number },
  options?: Omit<UseQueryOptions<PaginatedResponse<SupportTicket>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<PaginatedResponse<SupportTicket>, ApiError>({
    queryKey: supportKeys.userTickets(userId, params),
    queryFn: () => supportService.getUserTickets(userId, params),
    enabled: !!userId,
    ...options,
  });

/**
 * Fetch tickets by email (for anonymous users).
 */
export const useTicketsByEmail = (
  email: string,
  params?: { page?: number; limit?: number },
  options?: Omit<UseQueryOptions<PaginatedResponse<SupportTicket>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<PaginatedResponse<SupportTicket>, ApiError>({
    queryKey: supportKeys.emailTickets(email, params),
    queryFn: () => supportService.getTicketsByEmail(email, params),
    enabled: !!email,
    ...options,
  });

// =============================================================================
// Mutation hooks
// =============================================================================

/**
 * Create a new support ticket.
 * On success: invalidates all ticket lists and stats.
 */
export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<SupportTicket>, ApiError, CreateTicketInput>({
    mutationFn: (data) => supportService.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.stats() });
      queryClient.invalidateQueries({ queryKey: supportKeys.queue() });
    },
  });
};

/**
 * Update an existing ticket (status, priority, assignment).
 * On success: invalidates ticket lists, stats, queue, and the specific ticket detail.
 */
export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<SupportTicket>,
    ApiError,
    { id: string; data: UpdateTicketInput }
  >({
    mutationFn: ({ id, data }) => supportService.updateTicket(id, data),
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.ticketDetail(id) });
      queryClient.invalidateQueries({ queryKey: supportKeys.stats() });
      queryClient.invalidateQueries({ queryKey: supportKeys.queue() });
    },
  });
};

/**
 * Assign a ticket to a support agent.
 */
export const useAssignTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<SupportTicket>,
    ApiError,
    { id: string; data: AssignTicketInput }
  >({
    mutationFn: ({ id, data }) => supportService.assignTicket(id, data),
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.ticketDetail(id) });
      queryClient.invalidateQueries({ queryKey: supportKeys.stats() });
      queryClient.invalidateQueries({ queryKey: supportKeys.queue() });
    },
  });
};

/**
 * Resolve a ticket.
 */
export const useResolveTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<SupportTicket>, ApiError, string>({
    mutationFn: (id) => supportService.resolveTicket(id),
    onSuccess: (_response, id) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.ticketDetail(id) });
      queryClient.invalidateQueries({ queryKey: supportKeys.stats() });
      queryClient.invalidateQueries({ queryKey: supportKeys.queue() });
    },
  });
};

/**
 * Close a ticket.
 */
export const useCloseTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<SupportTicket>, ApiError, string>({
    mutationFn: (id) => supportService.closeTicket(id),
    onSuccess: (_response, id) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.ticketDetail(id) });
      queryClient.invalidateQueries({ queryKey: supportKeys.stats() });
      queryClient.invalidateQueries({ queryKey: supportKeys.queue() });
    },
  });
};
