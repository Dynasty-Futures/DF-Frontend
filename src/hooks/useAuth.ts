// =============================================================================
// Dynasty Futures - Auth Hooks
// =============================================================================
// Convenience hooks that wrap the AuthContext for common patterns.
//
// useAuth()        — access the full auth context (user, login, logout …)
// useRequireAuth() — redirect to /login if not authenticated
// useRequireRole() — redirect to /dashboard if the user lacks the required role
// =============================================================================

import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext, type AuthContextValue } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/user';

// =============================================================================
// useAuth
// =============================================================================

/**
 * Returns the full auth context value.
 * Must be used inside an `<AuthProvider>`.
 *
 * @example
 *   const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an <AuthProvider>. ' +
        'Wrap your app (or the relevant subtree) with <AuthProvider>.'
    );
  }

  return context;
};

// =============================================================================
// useRequireAuth
// =============================================================================

/**
 * Redirects to `/login` if the user is not authenticated.
 * Returns the auth context so callers can use the user immediately.
 *
 * While the initial session restore is in progress (`isLoading`),
 * no redirect happens — the caller should show a loading state.
 *
 * @param redirectTo - Path to redirect to after login (defaults to current path).
 *
 * @example
 *   const { user, isLoading } = useRequireAuth();
 *   if (isLoading) return <Spinner />;
 *   // user is guaranteed non-null here
 */
export const useRequireAuth = (redirectTo?: string): AuthContextValue => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      const returnTo = redirectTo ?? location.pathname;
      navigate('/login', {
        replace: true,
        state: { from: returnTo },
      });
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate, location.pathname, redirectTo]);

  return auth;
};

// =============================================================================
// useRequireRole
// =============================================================================

/**
 * Redirects away if the authenticated user does not have one of the
 * required roles. Also enforces authentication (redirects to /login if
 * not logged in).
 *
 * @param roles - One or more roles that are allowed.
 * @param fallbackPath - Where to redirect when the role check fails
 *                       (defaults to `/dashboard`).
 *
 * @example
 *   // Only admins can access this page
 *   const { user, isLoading } = useRequireRole(['ADMIN']);
 *
 *   // Admins and support staff
 *   const { user } = useRequireRole(['ADMIN', 'SUPPORT']);
 */
export const useRequireRole = (
  roles: UserRole[],
  fallbackPath = '/dashboard'
): AuthContextValue => {
  const auth = useRequireAuth(); // ensures user is logged in first
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated && auth.user) {
      if (!roles.includes(auth.user.role)) {
        navigate(fallbackPath, { replace: true });
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, roles, navigate, fallbackPath]);

  return auth;
};
