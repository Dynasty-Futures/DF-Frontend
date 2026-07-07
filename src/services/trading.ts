// =============================================================================
// Dynasty Futures - Trading Service
// =============================================================================
// Maps to the backend's /v1/trading/* endpoints. Trader-facing — every call
// is scoped to the authenticated user on the backend.
//
// Endpoint data strategy:
//   STORED — read from Prisma (cheap, cached). `?live=true` forces refresh.
//   LIVE   — pass-through to the trading platform provider (Volumetrica).
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';
import type {
  TradingAccount,
  TradingAccountDetail,
  LiveSnapshot,
  AccountSnapshot,
  Trade,
  AccountReport,
  PlatformUrlResult,
  CheckoutUrlResult,
  LiveOption,
  ReportRange,
} from '@/types/trading';

export const tradingService = {
  /**
   * List the authenticated user's accounts.
   * GET /v1/trading/accounts?live=true
   */
  listAccounts: (opts?: LiveOption): Promise<ApiResponse<TradingAccount[]>> =>
    apiClient.get<ApiResponse<TradingAccount[]>>('/trading/accounts', {
      params: opts as Record<string, unknown>,
    }),

  /**
   * Get a single account with merged live snapshot.
   * GET /v1/trading/accounts/:id
   */
  getAccount: (id: string): Promise<ApiResponse<TradingAccountDetail>> =>
    apiClient.get<ApiResponse<TradingAccountDetail>>(`/trading/accounts/${id}`),

  /**
   * Real-time balance/equity/P&L from the platform.
   * GET /v1/trading/accounts/:id/live
   */
  getLive: (id: string): Promise<ApiResponse<LiveSnapshot>> =>
    apiClient.get<ApiResponse<LiveSnapshot>>(`/trading/accounts/${id}/live`),

  /**
   * Daily equity-curve snapshots.
   * GET /v1/trading/accounts/:id/snapshots?live=true
   */
  getSnapshots: (id: string, opts?: LiveOption): Promise<ApiResponse<AccountSnapshot[]>> =>
    apiClient.get<ApiResponse<AccountSnapshot[]>>(`/trading/accounts/${id}/snapshots`, {
      params: opts as Record<string, unknown>,
    }),

  /**
   * Historical trades.
   * GET /v1/trading/accounts/:id/trades?live=true
   */
  getTrades: (id: string, opts?: LiveOption): Promise<ApiResponse<Trade[]>> =>
    apiClient.get<ApiResponse<Trade[]>>(`/trading/accounts/${id}/trades`, {
      params: opts as Record<string, unknown>,
    }),

  /**
   * On-demand P&L report computed by the platform.
   * GET /v1/trading/accounts/:id/report?startDt=...&endDt=...
   */
  getReport: (id: string, range: ReportRange): Promise<ApiResponse<AccountReport>> =>
    apiClient.get<ApiResponse<AccountReport>>(`/trading/accounts/${id}/report`, {
      params: range as unknown as Record<string, unknown>,
    }),

  /**
   * Reset an account to its starting balance (evaluation accounts only).
   * POST /v1/trading/accounts/:id/reset
   */
  resetAccount: (id: string): Promise<ApiResponse<LiveSnapshot>> =>
    apiClient.post<ApiResponse<LiveSnapshot>>(`/trading/accounts/${id}/reset`),

  /**
   * Upgrade an evaluation account that hit its profit target to a funded
   * account. Mirrors YPF's own "Upgrade Account" button.
   * POST /v1/trading/accounts/:id/upgrade
   */
  upgradeAccount: (id: string): Promise<ApiResponse<LiveSnapshot>> =>
    apiClient.post<ApiResponse<LiveSnapshot>>(`/trading/accounts/${id}/upgrade`),

  /**
   * Mint an account-bound WooCommerce RESET checkout URL (carries a fresh,
   * 5-min `ypf-ref` so the purchase binds to THIS account).
   * POST /v1/trading/accounts/:id/reset-checkout
   */
  resetCheckoutUrl: (id: string): Promise<ApiResponse<CheckoutUrlResult>> =>
    apiClient.post<ApiResponse<CheckoutUrlResult>>(
      `/trading/accounts/${id}/reset-checkout`,
    ),

  /**
   * Mint an account-bound WooCommerce ACTIVATION checkout URL (Standard $80
   * fee), same `ypf-ref` binding.
   * POST /v1/trading/accounts/:id/activation-checkout
   */
  activationCheckoutUrl: (id: string): Promise<ApiResponse<CheckoutUrlResult>> =>
    apiClient.post<ApiResponse<CheckoutUrlResult>>(
      `/trading/accounts/${id}/activation-checkout`,
    ),

  /**
   * One-time SSO URL into the trading platform's web dashboard.
   * GET /v1/trading/dashboard-url
   *
   * NOTE: URL is single-use. Don't cache the result — call on demand.
   */
  getDashboardUrl: (): Promise<ApiResponse<PlatformUrlResult>> =>
    apiClient.get<ApiResponse<PlatformUrlResult>>('/trading/dashboard-url'),

  /**
   * Embeddable iFrame URL. Optional accountId narrows the embed.
   * GET /v1/trading/iframe-url?accountId=...
   */
  getIframeUrl: (accountId?: string): Promise<ApiResponse<PlatformUrlResult>> =>
    apiClient.get<ApiResponse<PlatformUrlResult>>('/trading/iframe-url', {
      params: accountId ? { accountId } : undefined,
    }),
} as const;
