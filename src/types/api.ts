// =============================================================================
// Dynasty Futures - Generic API Types
// =============================================================================
// These types match the response shapes from the Express backend.
// Success responses use { success, data, message? }.
// Error responses use { error: { code, message, details? } }.
// =============================================================================

/**
 * Successful API response wrapping a single resource.
 * Matches: res.json({ success: true, data: ticket, message: '...' })
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Successful paginated API response.
 * Matches: res.json({ success: true, data: [...], pagination: {...} })
 */
export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Pagination metadata returned by the backend.
 * Matches: PaginatedResult<T>['pagination'] from support-ticket.repository.ts
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Pagination query parameters sent to the backend.
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Error response from the backend.
 * Matches: AppError.toJSON() -> { error: { code, message, details? } }
 */
export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Typed error class thrown by the API client on non-2xx responses.
 * Preserves the backend's error structure for display in the UI.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(statusCode: number, code: string, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  /** True for 4xx client errors (bad input, auth, not found) */
  get isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  /** True for 5xx server errors */
  get isServerError(): boolean {
    return this.statusCode >= 500;
  }

  /** True for 401 Unauthorized */
  get isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  /** True for 403 Forbidden */
  get isForbidden(): boolean {
    return this.statusCode === 403;
  }

  /** True for 404 Not Found */
  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  /** True for 422 Validation Error */
  get isValidationError(): boolean {
    return this.statusCode === 422;
  }

  /** True for 429 Rate Limited */
  get isRateLimited(): boolean {
    return this.statusCode === 429;
  }
}
