// =============================================================================
// Dynasty Futures - Trading React Query Hooks
// =============================================================================
// Trader-facing hooks wrapping the trading service. Mirrors the query-key
// factory pattern from useAccounts.ts.
//
// Live snapshots use a short stale time (15s) so they auto-refresh while the
// dashboard is open. Dashboard/iframe URLs are lazy queries — they only fire
// when manually refetched, since the URLs are one-time-use.
// =============================================================================

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { tradingService } from '@/services/trading';
import type { ApiResponse, ApiError } from '@/types/api';
import type {
  TradingAccount,
  TradingAccountDetail,
  LiveSnapshot,
  AccountSnapshot,
  Trade,
  AccountReport,
  PlatformUrlResult,
  LiveOption,
  ReportRange,
} from '@/types/trading';

// Dashboard data auto-refreshes on this cadence while a view is mounted, so a
// trader sitting on the page sees new trades/balances/account changes without a
// manual refresh. Paired with staleTime: 0 on the dashboard queries, every
// mount and window-focus also pulls fresh (a hard refresh always does anyway).
export const LIVE_REFRESH_MS = 120_000; // 2 minutes

// =============================================================================
// Query key factory
// =============================================================================

export const tradingKeys = {
  all: ['trading'] as const,
  accounts: () => [...tradingKeys.all, 'accounts'] as const,
  list: (opts?: LiveOption) => [...tradingKeys.accounts(), 'list', opts] as const,
  detail: (id: string) => [...tradingKeys.accounts(), 'detail', id] as const,
  live: (id: string) => [...tradingKeys.accounts(), 'live', id] as const,
  snapshots: (id: string, opts?: LiveOption) =>
    [...tradingKeys.accounts(), 'snapshots', id, opts] as const,
  trades: (id: string, opts?: LiveOption) =>
    [...tradingKeys.accounts(), 'trades', id, opts] as const,
  report: (id: string, range: ReportRange) =>
    [...tradingKeys.accounts(), 'report', id, range] as const,
  dashboardUrl: () => [...tradingKeys.all, 'dashboard-url'] as const,
  iframeUrl: (accountId?: string) => [...tradingKeys.all, 'iframe-url', accountId] as const,
};

// =============================================================================
// Query hooks
// =============================================================================

/**
 * List the authenticated user's accounts.
 */
export const useTradingAccounts = (
  opts?: LiveOption,
  options?: Omit<UseQueryOptions<ApiResponse<TradingAccount[]>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<TradingAccount[]>, ApiError>({
    queryKey: tradingKeys.list(opts),
    queryFn: () => tradingService.listAccounts(opts),
    // Keep the account list live — so newly-discovered accounts appear and
    // disabled ones drop off without a manual refresh. Overridable via options.
    staleTime: 0,
    refetchInterval: LIVE_REFRESH_MS,
    ...options,
  });

/**
 * Get a single account with merged live snapshot.
 */
export const useTradingAccount = (
  id: string | undefined,
  options?: Omit<UseQueryOptions<ApiResponse<TradingAccountDetail>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<TradingAccountDetail>, ApiError>({
    queryKey: tradingKeys.detail(id ?? ''),
    queryFn: () => tradingService.getAccount(id as string),
    enabled: !!id,
    ...options,
  });

/**
 * Real-time live snapshot. Default stale: 15s; pass `refetchInterval` in
 * options to auto-refresh while a dashboard view is mounted.
 */
export const useLiveAccount = (
  id: string | undefined,
  options?: Omit<UseQueryOptions<ApiResponse<LiveSnapshot>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<LiveSnapshot>, ApiError>({
    queryKey: tradingKeys.live(id ?? ''),
    queryFn: () => tradingService.getLive(id as string),
    enabled: !!id,
    staleTime: 15_000,
    ...options,
  });

/**
 * Daily equity-curve snapshots.
 */
export const useAccountSnapshots = (
  id: string | undefined,
  opts?: LiveOption,
  options?: Omit<UseQueryOptions<ApiResponse<AccountSnapshot[]>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<AccountSnapshot[]>, ApiError>({
    queryKey: tradingKeys.snapshots(id ?? '', opts),
    queryFn: () => tradingService.getSnapshots(id as string, opts),
    enabled: !!id,
    ...options,
  });

/**
 * Historical trades for an account.
 */
export const useAccountTrades = (
  id: string | undefined,
  opts?: LiveOption,
  options?: Omit<UseQueryOptions<ApiResponse<Trade[]>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<Trade[]>, ApiError>({
    queryKey: tradingKeys.trades(id ?? '', opts),
    queryFn: () => tradingService.getTrades(id as string, opts),
    enabled: !!id,
    ...options,
  });

/**
 * On-demand P&L report. Disabled by default until both account id and a
 * range are set.
 */
export const useAccountReport = (
  id: string | undefined,
  range: ReportRange | undefined,
  options?: Omit<UseQueryOptions<ApiResponse<AccountReport>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<AccountReport>, ApiError>({
    queryKey: tradingKeys.report(id ?? '', range ?? { startDt: '' }),
    queryFn: () => tradingService.getReport(id as string, range as ReportRange),
    enabled: !!id && !!range?.startDt,
    ...options,
  });

/**
 * One-time SSO URL into the trading platform.
 *
 * Use it like:
 *   const { refetch } = useDashboardUrl();
 *   const onClick = async () => {
 *     const { data } = await refetch();
 *     if (data?.data.url) window.open(data.data.url, '_blank', 'noopener');
 *   };
 *
 * Disabled by default — `enabled: false` keeps it out of the auto-fetch
 * lifecycle. Call refetch() to consume.
 */
export const useDashboardUrl = (
  options?: Omit<UseQueryOptions<ApiResponse<PlatformUrlResult>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<PlatformUrlResult>, ApiError>({
    queryKey: tradingKeys.dashboardUrl(),
    queryFn: () => tradingService.getDashboardUrl(),
    enabled: false,
    gcTime: 0,
    ...options,
  });

/**
 * Embeddable iFrame URL (optionally scoped to a specific account).
 */
export const useIframeUrl = (
  accountId?: string,
  options?: Omit<UseQueryOptions<ApiResponse<PlatformUrlResult>, ApiError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ApiResponse<PlatformUrlResult>, ApiError>({
    queryKey: tradingKeys.iframeUrl(accountId),
    queryFn: () => tradingService.getIframeUrl(accountId),
    ...options,
  });

// =============================================================================
// Mutation hooks
// =============================================================================

/**
 * Reset an account on the platform. Only valid for accounts in EVALUATION.
 * Invalidates the account detail + lists so consumers refetch.
 */
export const useResetAccount = (
  options?: UseMutationOptions<ApiResponse<LiveSnapshot>, ApiError, string>,
) => {
  const qc = useQueryClient();
  return useMutation<ApiResponse<LiveSnapshot>, ApiError, string>({
    mutationFn: (id: string) => tradingService.resetAccount(id),
    ...options,
    onSuccess: (data, id, ctx) => {
      qc.invalidateQueries({ queryKey: tradingKeys.detail(id) });
      qc.invalidateQueries({ queryKey: tradingKeys.live(id) });
      qc.invalidateQueries({ queryKey: tradingKeys.accounts() });
      options?.onSuccess?.(data, id, ctx);
    },
  });
};
