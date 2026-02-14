// =============================================================================
// Dynasty Futures - Auth Context
// =============================================================================
// Provides authentication state and actions to the entire React tree.
//
// - On mount, checks localStorage for a saved refresh token and attempts
//   to restore the session (silent refresh).
// - Stores access + refresh tokens in memory (accessToken) and localStorage
//   (refreshToken only) so tabs can survive page reloads.
// - Registers a token accessor with the API client so all subsequent
//   requests include the Authorization header automatically.
// =============================================================================

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { User, UserRole } from '@/types/user';
import { authApi } from '@/services/auth';
import { setTokenAccessor } from '@/services/api';
import { ApiError } from '@/types/api';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REFRESH_TOKEN_KEY = 'df_refresh_token';

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

export interface AuthContextValue {
  /** The currently authenticated user, or null when logged out. */
  user: User | null;

  /** True while the initial session restore is in progress. */
  isLoading: boolean;

  /** True if a user is authenticated. */
  isAuthenticated: boolean;

  /** Shorthand role check. */
  hasRole: (role: UserRole) => boolean;

  /** Register a new account with email & password. */
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;

  /** Log in with email & password. */
  login: (email: string, password: string) => Promise<void>;

  /** Authenticate via Google ID token. */
  googleLogin: (idToken: string) => Promise<void>;

  /** Log out and clear all session data. */
  logout: () => Promise<void>;

  /** Force-refresh the current user profile from the server. */
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Keep tokens in a ref so we can read them synchronously inside the
  // token accessor without triggering re-renders.
  const accessTokenRef = useRef<string | null>(null);
  const refreshTokenRef = useRef<string | null>(null);

  // -----------------------------------------------------------------------
  // Token helpers
  // -----------------------------------------------------------------------

  const saveTokens = useCallback((accessToken: string, refreshToken: string) => {
    accessTokenRef.current = accessToken;
    refreshTokenRef.current = refreshToken;
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }, []);

  const clearTokens = useCallback(() => {
    accessTokenRef.current = null;
    refreshTokenRef.current = null;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }, []);

  // -----------------------------------------------------------------------
  // Register the token accessor with the API client once on mount.
  // This makes every apiClient request include the current access token.
  // -----------------------------------------------------------------------

  useEffect(() => {
    setTokenAccessor(() => accessTokenRef.current);
  }, []);

  // -----------------------------------------------------------------------
  // Session restore on mount
  // -----------------------------------------------------------------------

  useEffect(() => {
    const restoreSession = async () => {
      const savedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (!savedRefreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Attempt silent refresh
        const res = await authApi.refresh(savedRefreshToken);

        accessTokenRef.current = res.data.accessToken;
        refreshTokenRef.current = savedRefreshToken;
        setUser(res.data.user);
      } catch {
        // Refresh token invalid / expired — clear everything
        clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -----------------------------------------------------------------------
  // Actions
  // -----------------------------------------------------------------------

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const res = await authApi.register(data);
      saveTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
    },
    [saveTokens]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login(email, password);
      saveTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
    },
    [saveTokens]
  );

  const googleLogin = useCallback(
    async (idToken: string) => {
      const res = await authApi.googleAuth(idToken);
      saveTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
    },
    [saveTokens]
  );

  const logout = useCallback(async () => {
    const rt = refreshTokenRef.current;

    // Optimistically clear local state
    clearTokens();
    setUser(null);

    // Fire-and-forget server logout
    if (rt) {
      try {
        await authApi.logout(rt);
      } catch (error) {
        // Ignore errors — the session will expire naturally
        if (error instanceof ApiError) {
          console.debug('[Auth] Server logout failed:', error.message);
        }
      }
    }
  }, [clearTokens]);

  const refreshUser = useCallback(async () => {
    try {
      const res = await authApi.getMe();
      setUser(res.data.user);
    } catch {
      // If fetching profile fails, session is likely invalid
      clearTokens();
      setUser(null);
    }
  }, [clearTokens]);

  const hasRole = useCallback(
    (role: UserRole) => user?.role === role,
    [user]
  );

  // -----------------------------------------------------------------------
  // Memoized context value
  // -----------------------------------------------------------------------

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      hasRole,
      register,
      login,
      googleLogin,
      logout,
      refreshUser,
    }),
    [user, isLoading, hasRole, register, login, googleLogin, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
