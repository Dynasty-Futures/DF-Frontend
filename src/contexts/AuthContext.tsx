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
import { toast } from 'sonner';
import type { User, UserRole } from '@/types/user';
import { authApi } from '@/services/auth';
import { setTokenAccessor, setUnauthorizedHandler } from '@/services/api';
import { ApiError } from '@/types/api';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REFRESH_TOKEN_KEY = 'df_refresh_token';
const AUTH_CHANNEL_NAME = 'df-auth';

// Cross-tab sync message shapes. `BroadcastChannel` only delivers to OTHER
// tabs, so a tab never receives its own posts.
type AuthBroadcastMessage =
  | { type: 'login'; user: User; accessToken: string; refreshToken: string }
  | { type: 'logout' };

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

  // BroadcastChannel used to sync login/logout across tabs in the same browser.
  // Held in a ref so all callbacks see the same instance.
  const authChannelRef = useRef<BroadcastChannel | null>(null);

  const postAuthMessage = useCallback((message: AuthBroadcastMessage) => {
    authChannelRef.current?.postMessage(message);
  }, []);

  // -----------------------------------------------------------------------
  // Token helpers
  // -----------------------------------------------------------------------

  const saveTokens = useCallback((accessToken: string, refreshToken: string) => {
    accessTokenRef.current = accessToken;
    refreshTokenRef.current = refreshToken;
    if (typeof window !== 'undefined') localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }, []);

  const clearTokens = useCallback(() => {
    accessTokenRef.current = null;
    refreshTokenRef.current = null;
    if (typeof window !== 'undefined') localStorage.removeItem(REFRESH_TOKEN_KEY);
  }, []);

  // -----------------------------------------------------------------------
  // Register the token accessor with the API client once on mount.
  // This makes every apiClient request include the current access token.
  // -----------------------------------------------------------------------

  useEffect(() => {
    setTokenAccessor(() => accessTokenRef.current);
  }, []);

  // -----------------------------------------------------------------------
  // Register the unauthorized handler.
  // Fires when any non-auth API call returns 401 — i.e. the session was
  // invalidated server-side (most commonly because the user signed in on
  // another browser, which our backend enforces by deleting prior sessions).
  // -----------------------------------------------------------------------

  useEffect(() => {
    setUnauthorizedHandler((code) => {
      // Idempotent: if we already cleared state, skip the duplicate toast.
      if (accessTokenRef.current === null && refreshTokenRef.current === null) {
        return;
      }

      accessTokenRef.current = null;
      refreshTokenRef.current = null;
      if (typeof window !== 'undefined') localStorage.removeItem(REFRESH_TOKEN_KEY);
      setUser(null);

      // Tell sibling tabs they're also logged out — they share localStorage
      // and may have their own in-memory access token still loaded.
      postAuthMessage({ type: 'logout' });

      // Distinguish "kicked by another login" from a naturally-expired token.
      // Backend returns UNAUTHORIZED for invalidated sessions and TOKEN_EXPIRED
      // when the access token has aged out without a refresh.
      if (code === 'TOKEN_EXPIRED') {
        toast.error('Your session has expired. Please sign in again.');
      } else {
        toast.error('You were signed out because this account signed in on another device.');
      }
    });

    return () => setUnauthorizedHandler(null);
  }, [postAuthMessage]);

  // -----------------------------------------------------------------------
  // Cross-tab login/logout sync via BroadcastChannel.
  // BroadcastChannel only delivers to OTHER tabs, so we never echo our own
  // messages back into our state.
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') {
      return;
    }

    const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
    authChannelRef.current = channel;

    channel.onmessage = (event: MessageEvent<AuthBroadcastMessage>) => {
      const msg = event.data;
      if (msg.type === 'login') {
        accessTokenRef.current = msg.accessToken;
        refreshTokenRef.current = msg.refreshToken;
        setUser(msg.user);
      } else if (msg.type === 'logout') {
        accessTokenRef.current = null;
        refreshTokenRef.current = null;
        // The originating tab already removed the localStorage entry.
        setUser(null);
      }
    };

    return () => {
      channel.close();
      authChannelRef.current = null;
    };
  }, []);

  // -----------------------------------------------------------------------
  // Session restore on mount
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (typeof window === 'undefined') { setIsLoading(false); return; }

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
      postAuthMessage({
        type: 'login',
        user: res.data.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    },
    [saveTokens, postAuthMessage]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login(email, password);
      saveTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
      postAuthMessage({
        type: 'login',
        user: res.data.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    },
    [saveTokens, postAuthMessage]
  );

  const googleLogin = useCallback(
    async (idToken: string) => {
      const res = await authApi.googleAuth(idToken);
      saveTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
      postAuthMessage({
        type: 'login',
        user: res.data.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    },
    [saveTokens, postAuthMessage]
  );

  const logout = useCallback(async () => {
    const rt = refreshTokenRef.current;

    // Optimistically clear local state
    clearTokens();
    setUser(null);
    postAuthMessage({ type: 'logout' });

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
  }, [clearTokens, postAuthMessage]);

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
