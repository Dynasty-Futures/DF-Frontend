// =============================================================================
// Dynasty Futures - API Client
// =============================================================================
// Lightweight fetch wrapper for all backend communication.
//
// - Environment-aware: uses Vite proxy in dev, full URL in production
// - Auto-attaches Authorization header when a token is available
// - Normalizes error responses into typed ApiError instances
// - Logs requests/responses in debug mode
//
// Usage:
//   import { apiClient } from '@/services/api';
//   const ticket = await apiClient.get<ApiResponse<SupportTicket>>('/support/tickets/123');
// =============================================================================

import { env } from '@/config/env';
import { ApiError, type ApiErrorResponse } from '@/types/api';

// =============================================================================
// Token accessor
// =============================================================================
// Placeholder for the auth token getter. Phase 3 (auth) will replace this
// with a real implementation that reads from the token manager.
// For now, returns null so all requests are unauthenticated.

let getAccessToken: () => string | null = () => null;

/**
 * Register a token accessor function.
 * Called by the auth system once it's initialized (Phase 3).
 */
export const setTokenAccessor = (accessor: () => string | null): void => {
  getAccessToken = accessor;
};

// =============================================================================
// Request helpers
// =============================================================================

/**
 * Build the full URL for an API request.
 * - Dev:  "/v1/support/tickets" (Vite proxy forwards to localhost:3000)
 * - Prod: "https://api.dynastyfuturesdyn.com/v1/support/tickets"
 */
const buildUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.apiBasePath}${normalizedPath}`;
};

/**
 * Build request headers with optional auth token.
 */
const buildHeaders = (customHeaders?: HeadersInit): Headers => {
  const headers = new Headers(customHeaders);

  // Default content type for JSON
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Attach auth token if available
  const token = getAccessToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

/**
 * Serialize query parameters into a URL search string.
 * Handles arrays (e.g. status=OPEN&status=CLOSED) and skips undefined/null values.
 */
const buildQueryString = (params?: Record<string, unknown>): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, String(item));
      }
    } else {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// =============================================================================
// Debug logging
// =============================================================================

const logRequest = (method: string, url: string, body?: unknown): void => {
  if (!env.debugMode) return;
  console.groupCollapsed(`[API] ${method} ${url}`);
  if (body) console.log('Body:', body);
  console.groupEnd();
};

const logResponse = (method: string, url: string, status: number, data: unknown): void => {
  if (!env.debugMode) return;
  const emoji = status >= 200 && status < 300 ? 'OK' : 'ERR';
  console.groupCollapsed(`[API] ${emoji} ${status} ${method} ${url}`);
  console.log('Response:', data);
  console.groupEnd();
};

const logError = (method: string, url: string, error: unknown): void => {
  if (!env.debugMode) return;
  console.groupCollapsed(`[API] FAIL ${method} ${url}`);
  console.error(error);
  console.groupEnd();
};

// =============================================================================
// Response handling
// =============================================================================

/**
 * Parse the response and throw an ApiError for non-2xx status codes.
 * Preserves the backend's error structure (code, message, details).
 */
const handleResponse = async <T>(response: Response, method: string, url: string): Promise<T> => {
  // Try to parse body as JSON regardless of status
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    // Body is not JSON (e.g. empty 204, or plain text error)
    body = null;
  }

  logResponse(method, url, response.status, body);

  if (response.ok) {
    return body as T;
  }

  // Parse error response matching backend's AppError.toJSON() format:
  // { error: { code, message, details? } }
  const errorBody = body as ApiErrorResponse | null;
  const errorData = errorBody?.error;

  throw new ApiError(
    response.status,
    errorData?.code || 'UNKNOWN_ERROR',
    errorData?.message || response.statusText || 'An unexpected error occurred',
    errorData?.details,
  );
};

// =============================================================================
// Core request function
// =============================================================================

interface RequestOptions {
  /** Custom headers to merge with defaults */
  headers?: HeadersInit;
  /** Query parameters (appended to URL) */
  params?: Record<string, unknown>;
  /** AbortSignal for request cancellation */
  signal?: AbortSignal;
}

const request = async <T>(
  method: string,
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> => {
  const queryString = buildQueryString(options?.params);
  const url = `${buildUrl(path)}${queryString}`;

  logRequest(method, url, body);

  try {
    const response = await fetch(url, {
      method,
      headers: buildHeaders(options?.headers),
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Send cookies for session-based auth if needed
      signal: options?.signal,
    });

    return handleResponse<T>(response, method, url);
  } catch (error) {
    logError(method, url, error);

    // Re-throw ApiErrors as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Network errors, timeouts, aborts
    if (error instanceof TypeError) {
      throw new ApiError(0, 'NETWORK_ERROR', 'Unable to connect to the server. Please check your connection.');
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(0, 'REQUEST_ABORTED', 'Request was cancelled.');
    }

    // Unknown error
    throw new ApiError(0, 'UNKNOWN_ERROR', 'An unexpected error occurred.');
  }
};

// =============================================================================
// Public API Client
// =============================================================================

export const apiClient = {
  /**
   * GET request.
   * @param path - API path relative to /v1 (e.g. "/support/tickets")
   * @param options - Query params, headers, signal
   */
  get: <T>(path: string, options?: RequestOptions): Promise<T> =>
    request<T>('GET', path, undefined, options),

  /**
   * POST request.
   * @param path - API path relative to /v1
   * @param body - JSON request body
   * @param options - Headers, signal
   */
  post: <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>('POST', path, body, options),

  /**
   * PATCH request.
   * @param path - API path relative to /v1
   * @param body - JSON request body (partial update)
   * @param options - Headers, signal
   */
  patch: <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>('PATCH', path, body, options),

  /**
   * PUT request.
   * @param path - API path relative to /v1
   * @param body - JSON request body (full replacement)
   * @param options - Headers, signal
   */
  put: <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>('PUT', path, body, options),

  /**
   * DELETE request.
   * @param path - API path relative to /v1
   * @param options - Headers, signal
   */
  delete: <T>(path: string, options?: RequestOptions): Promise<T> =>
    request<T>('DELETE', path, undefined, options),
} as const;
