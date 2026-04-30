// =============================================================================
// Chart data builders
// =============================================================================
// Generates ChartDataPoint[] for the dashboard's PerformanceChart from a
// real AccountData view shape. Replaces the synthetic generateChartData()
// helper from mockDashboardData.
//
// Accepted timeframe tokens (origin/main vocabulary):
//   - 'daily'   → 8 hourly points around the selected date's daily P&L
//   - 'weekly'  → last 7 calendar days
//   - 'monthly' → last 30 calendar days  (default fallback)
//
// Legacy numeric tokens '1'|'7'|'30'|'90' still map to the same buckets so
// callers can migrate gradually.
// =============================================================================

import { differenceInCalendarDays, format, setHours, subDays } from 'date-fns';
import type { AccountData, ChartDataPoint } from '@/data/mockDashboardData';

const tfDays = (tf: string): number => {
  if (tf === 'weekly' || tf === '7') return 7;
  if (tf === '90') return 90;
  return 30; // 'monthly' default
};

const isDailyTf = (tf: string): boolean => tf === 'daily' || tf === '1';

export const buildChartData = (
  account: AccountData,
  timeframe: string,
  selectedDate?: Date,
): ChartDataPoint[] => {
  const today = new Date();
  const profitTarget = account.startingBalance + account.profitTarget;
  const maxLoss = account.startingBalance - account.maxDrawdown;

  // Intraday — synthesize hourly points around the selected day's P&L. Real
  // intraday data isn't exposed by /v1/trading; this is the best we can do
  // without a per-tick endpoint, but it's deterministic given a fixed date.
  if (isDailyTf(timeframe)) {
    const target = selectedDate ?? today;
    const daysAgo = Math.max(
      0,
      differenceInCalendarDays(today, target),
    );
    const idx = account.dailyPnL.length - 1 - daysAgo;
    const dayPnl =
      idx >= 0 && idx < account.dailyPnL.length ? account.dailyPnL[idx] : 0;
    const dayClose =
      idx >= 0 && idx < account.equityHistory.length
        ? account.equityHistory[idx]
        : account.currentBalance;
    const dayOpen = dayClose - dayPnl;
    const hourlyVariation = dayPnl / 8;

    const data: ChartDataPoint[] = [];
    for (let i = 0; i < 8; i++) {
      const hour = setHours(target, 9 + i);
      data.push({
        date: format(hour, 'ha'),
        balance: Math.round(dayOpen + (i + 1) * hourlyVariation),
        maxLoss,
        profitTarget,
        pnl: Math.round(hourlyVariation),
      });
    }
    return data;
  }

  const days = tfDays(timeframe);
  const equity = account.equityHistory;
  const pnl = account.dailyPnL;
  const sliceStart = Math.max(0, equity.length - days);
  const equitySlice = equity.slice(sliceStart);
  const pnlSlice = pnl.slice(sliceStart);

  return equitySlice.map((balance, index) => {
    const date = subDays(today, equitySlice.length - 1 - index);
    return {
      date: format(date, 'MMM d'),
      balance,
      maxLoss,
      profitTarget,
      pnl: pnlSlice[index] ?? 0,
    };
  });
};
