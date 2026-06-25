// =============================================================================
// useAccountView
// =============================================================================
// Hook that combines /v1/trading account, snapshots, and trades into a single
// adapted AccountData view shape — what the dashboard widgets expect.
//
// Returns:
//   - data: AccountData | null   (null while loading or when accountId is not set)
//   - isLoading: any of the underlying queries is still loading
//   - isError: true if the account fetch fails (snapshots/trades errors are
//             tolerable — empty arrays just zero out derived metrics)
// =============================================================================

import { useMemo } from 'react';
import {
  useTradingAccount,
  useAccountSnapshots,
  useAccountTrades,
} from '@/hooks/useTrading';
import { adaptAccountView, type AccountData } from '@/lib/tradingAdapter';
import type { ApiError } from '@/types/api';

export interface AccountViewResult {
  data: AccountData | null;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
}

export const useAccountView = (accountId: string | undefined): AccountViewResult => {
  const accountQ = useTradingAccount(accountId);
  const snapshotsQ = useAccountSnapshots(accountId);
  // Pull trades live so a freshly-viewed account syncs its YPF history into the
  // dashboard's derived metrics (win rate, sessions, calendar, streaks).
  const tradesQ = useAccountTrades(accountId, { live: true });

  const data = useMemo<AccountData | null>(() => {
    if (!accountQ.data?.data) return null;
    return adaptAccountView(
      accountQ.data.data,
      snapshotsQ.data?.data ?? [],
      tradesQ.data?.data ?? [],
    );
  }, [accountQ.data, snapshotsQ.data, tradesQ.data]);

  return {
    data,
    isLoading: accountQ.isLoading || snapshotsQ.isLoading || tradesQ.isLoading,
    isError: accountQ.isError,
    error: accountQ.error ?? null,
  };
};
