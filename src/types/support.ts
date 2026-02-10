// =============================================================================
// Dynasty Futures - Support Ticket Types
// =============================================================================
// These types mirror the backend's Prisma SupportTicket model and the
// DTOs used in the /v1/support/tickets routes.
// =============================================================================

import type { PaginationParams } from './api';

// ---------------------------------------------------------------------------
// Enums (match Prisma schema exactly)
// ---------------------------------------------------------------------------

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_RESPONSE'
  | 'RESOLVED'
  | 'CLOSED';

export type TicketPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';

// ---------------------------------------------------------------------------
// Related user (included via Prisma select in repository queries)
// ---------------------------------------------------------------------------

export interface TicketUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// ---------------------------------------------------------------------------
// Support Ticket (as returned by the API)
// ---------------------------------------------------------------------------

export interface SupportTicket {
  id: string;
  creatorId: string | null;
  assigneeId: string | null;

  /** Contact email for anonymous submissions */
  email: string | null;
  /** Contact name for anonymous submissions */
  name: string | null;

  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;

  /** Related entity type (e.g. "Account", "Payout") */
  relatedEntity: string | null;
  /** Related entity ID */
  relatedEntityId: string | null;

  resolvedAt: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;

  /** Included relation -- the user who created the ticket */
  creator: TicketUser | null;
  /** Included relation -- the assigned support agent */
  assignee: TicketUser | null;
}

// ---------------------------------------------------------------------------
// Input DTOs (match the Zod schemas in support.ts routes)
// ---------------------------------------------------------------------------

/**
 * Create a new support ticket.
 * Either creatorId OR (email + name) must be provided.
 */
export interface CreateTicketInput {
  /** Authenticated user's ID (optional -- set by auth middleware when available) */
  creatorId?: string;
  /** Email for anonymous submissions */
  email?: string;
  /** Name for anonymous submissions */
  name?: string;
  /** Ticket subject (min 5 chars) */
  subject: string;
  /** Ticket description (min 10 chars) */
  description: string;
  /** Priority level (defaults to MEDIUM on the backend) */
  priority?: TicketPriority;
  /** Related entity type */
  relatedEntity?: string;
  /** Related entity ID */
  relatedEntityId?: string;
}

/**
 * Update an existing ticket (status, priority, or assignment).
 */
export interface UpdateTicketInput {
  assigneeId?: string | null;
  status?: TicketStatus;
  priority?: TicketPriority;
}

/**
 * Assign a ticket to a support agent.
 */
export interface AssignTicketInput {
  assigneeId: string;
}

// ---------------------------------------------------------------------------
// Query / Filter types
// ---------------------------------------------------------------------------

/**
 * Filters for listing tickets (query params on GET /support/tickets).
 */
export interface TicketFilters extends PaginationParams {
  status?: TicketStatus | TicketStatus[];
  priority?: TicketPriority | TicketPriority[];
  creatorId?: string;
  assigneeId?: string | null;
  email?: string;
}

// ---------------------------------------------------------------------------
// Statistics (returned by GET /support/tickets/stats)
// ---------------------------------------------------------------------------

export interface TicketStats {
  total: number;
  byStatus: Record<TicketStatus, number>;
  byPriority: Record<TicketPriority, number>;
}
