// =============================================================================
// Dynasty Futures - Support Ticket Service
// =============================================================================
// Maps to the backend's /v1/support/tickets endpoints.
// Each function returns the raw API response -- React Query hooks handle caching.
//
// Usage:
//   import { supportService } from '@/services/support';
//   const response = await supportService.createTicket({ ... });
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type {
  SupportTicket,
  CreateTicketInput,
  UpdateTicketInput,
  AssignTicketInput,
  TicketFilters,
  TicketStats,
} from '@/types/support';

export const supportService = {
  // ---------------------------------------------------------------------------
  // Queries
  // ---------------------------------------------------------------------------

  /**
   * List tickets with optional filtering and pagination.
   * GET /v1/support/tickets?status=OPEN&page=1&limit=20
   */
  getTickets: (filters?: TicketFilters): Promise<PaginatedResponse<SupportTicket>> =>
    apiClient.get<PaginatedResponse<SupportTicket>>('/support/tickets', {
      params: filters as Record<string, unknown>,
    }),

  /**
   * Get a single ticket by ID.
   * GET /v1/support/tickets/:id
   */
  getTicket: (id: string): Promise<ApiResponse<SupportTicket>> =>
    apiClient.get<ApiResponse<SupportTicket>>(`/support/tickets/${id}`),

  /**
   * Get ticket statistics (total, by status, by priority).
   * GET /v1/support/tickets/stats
   */
  getStats: (): Promise<ApiResponse<TicketStats>> =>
    apiClient.get<ApiResponse<TicketStats>>('/support/tickets/stats'),

  /**
   * Get unassigned tickets (support queue).
   * GET /v1/support/tickets/queue
   */
  getQueue: (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<SupportTicket>> =>
    apiClient.get<PaginatedResponse<SupportTicket>>('/support/tickets/queue', {
      params: params as Record<string, unknown>,
    }),

  /**
   * Get tickets for a specific authenticated user.
   * GET /v1/support/tickets/user/:userId
   */
  getUserTickets: (
    userId: string,
    params?: { page?: number; limit?: number },
  ): Promise<PaginatedResponse<SupportTicket>> =>
    apiClient.get<PaginatedResponse<SupportTicket>>(`/support/tickets/user/${userId}`, {
      params: params as Record<string, unknown>,
    }),

  /**
   * Get tickets by email (for anonymous users to track their submissions).
   * GET /v1/support/tickets/email/:email
   */
  getTicketsByEmail: (
    email: string,
    params?: { page?: number; limit?: number },
  ): Promise<PaginatedResponse<SupportTicket>> =>
    apiClient.get<PaginatedResponse<SupportTicket>>(
      `/support/tickets/email/${encodeURIComponent(email)}`,
      { params: params as Record<string, unknown> },
    ),

  // ---------------------------------------------------------------------------
  // Mutations
  // ---------------------------------------------------------------------------

  /**
   * Create a new support ticket (authenticated or anonymous).
   * POST /v1/support/tickets
   */
  createTicket: (data: CreateTicketInput): Promise<ApiResponse<SupportTicket>> =>
    apiClient.post<ApiResponse<SupportTicket>>('/support/tickets', data),

  /**
   * Update a ticket (status, priority, assignment).
   * PATCH /v1/support/tickets/:id
   */
  updateTicket: (id: string, data: UpdateTicketInput): Promise<ApiResponse<SupportTicket>> =>
    apiClient.patch<ApiResponse<SupportTicket>>(`/support/tickets/${id}`, data),

  /**
   * Assign a ticket to a support agent.
   * POST /v1/support/tickets/:id/assign
   */
  assignTicket: (id: string, data: AssignTicketInput): Promise<ApiResponse<SupportTicket>> =>
    apiClient.post<ApiResponse<SupportTicket>>(`/support/tickets/${id}/assign`, data),

  /**
   * Mark a ticket as resolved.
   * POST /v1/support/tickets/:id/resolve
   */
  resolveTicket: (id: string): Promise<ApiResponse<SupportTicket>> =>
    apiClient.post<ApiResponse<SupportTicket>>(`/support/tickets/${id}/resolve`),

  /**
   * Close a ticket.
   * POST /v1/support/tickets/:id/close
   */
  closeTicket: (id: string): Promise<ApiResponse<SupportTicket>> =>
    apiClient.post<ApiResponse<SupportTicket>>(`/support/tickets/${id}/close`),
} as const;
