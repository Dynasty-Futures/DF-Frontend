// =============================================================================
// Dynasty Futures - Auth Service
// =============================================================================
// Typed API calls for authentication endpoints.
// All methods return the parsed response — errors are thrown as ApiError.
//
// Usage:
//   import { authApi } from '@/services/auth';
//   const { user, accessToken, refreshToken } = await authApi.login(email, pw);
// =============================================================================

import { apiClient } from '@/services/api';
import type { User } from '@/types/user';

// ---------------------------------------------------------------------------
// Response shapes (match backend JSON)
// ---------------------------------------------------------------------------

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: true;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

export interface RefreshResponse {
  success: true;
  data: {
    accessToken: string;
    user: User;
  };
  message?: string;
}

export interface MeResponse {
  success: true;
  data: {
    user: User;
  };
}

export interface LogoutResponse {
  success: true;
  message: string;
}

// ---------------------------------------------------------------------------
// API methods
// ---------------------------------------------------------------------------

export const authApi = {
  /**
   * Register a new account with email & password.
   */
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => apiClient.post<AuthResponse>('/auth/register', data),

  /**
   * Log in with email & password.
   */
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),

  /**
   * Authenticate via Google SSO (sends the Google ID token to the backend).
   */
  googleAuth: (idToken: string) =>
    apiClient.post<AuthResponse>('/auth/google', { idToken }),

  /**
   * Refresh the access token using a valid refresh token.
   */
  refresh: (refreshToken: string) =>
    apiClient.post<RefreshResponse>('/auth/refresh', { refreshToken }),

  /**
   * Log out (invalidate the session for the given refresh token).
   */
  logout: (refreshToken: string) =>
    apiClient.post<LogoutResponse>('/auth/logout', { refreshToken }),

  /**
   * Fetch the currently authenticated user's profile.
   */
  getMe: () => apiClient.get<MeResponse>('/auth/me'),
} as const;
