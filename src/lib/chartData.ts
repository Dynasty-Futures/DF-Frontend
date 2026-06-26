// =============================================================================
// Chart data builders
// =============================================================================
// Generates ChartDataPoint[] for the dashboard's PerformanceChart from a real
// AccountData view shape.
//
// Primary path: a PER-TRADE running-equity curve built from account.closedTrades
// (oldest→newest, commission-netted). This mirrors what the trading platform
// plots — equity steps once per closed trade, so an early losing trade shows a
// dip before later wins recover it, instead of collapsing a whole day into one
// step. The P&L view shows each trade's net P&L as a bar.
//
// Accepted timeframe tokens:
//   - 'daily'   → per-TRADE intraday curve for the selected day
//   - 'weekly'  → per-DAY closing-equity over the last 7 days
//   - 'monthly' → per-DAY closing-equity over the last ~3 months (90 days)
//
// The weekly/monthly views span the FULL calendar window (today − N … today),
// not just the days that had trades — no-trade days carry the prior equity
// flat — so changing the range visibly changes the chart's span.
// =============================================================================

import { addDays, format, isSameDay, startOfDay, subDays } from 'date-fns';
import type {
  AccountData,
  ChartDataPoint,
  ClosedTradePoint,
} from '@/data/mockDashboardData';

const tfDays = (tf: string): number => {
  if (tf === 'weekly' || tf === '7') return 7;
  if (tf === 'monthly' || tf === '90') return 90; // ~3 months
  if (tf === '30') return 30;
  return 90;
};

const isDailyTf = (tf: string): boolean => tf === 'daily' || tf === '1';

// Filter closed trades to the active timeframe window.
// Build a per-trade running-equity series for a single day. The leading "Start"
// point anchors the curve at the equity *before* the first trade, so the first
// trade's bar/step is visible. Equity values are absolute (cumulative from the
// account's true starting balance), already computed in the adapter.
const buildFromTrades = (
  account: AccountData,
  windowed: ClosedTradePoint[],
): ChartDataPoint[] => {
  const profitTarget = account.startingBalance + account.profitTarget;
  const maxLoss = account.startingBalance - account.maxDrawdown;
  const labelFmt = 'h:mm a';

  const first = windowed[0]!;
  const baseEquity = first.equity - first.netPnl;

  const points: ChartDataPoint[] = [
    {
      date: 'Start',
      balance: Math.round(baseEquity),
      maxLoss,
      profitTarget,
      pnl: 0,
    },
  ];

  for (const t of windowed) {
    points.push({
      date: format(new Date(t.time), labelFmt),
      balance: Math.round(t.equity),
      maxLoss,
      profitTarget,
      pnl: Math.round(t.netPnl),
    });
  }

  return points;
};

// Per-day closing-equity series for the weekly/monthly (zoomed-out) views.
// Spans the FULL window (today − N + 1 … today) directly from closedTrades:
// each day's bar is that day's net P&L and the line is the running equity, so
// no-trade days carry the prior balance flat. Weekly (7 pts) and monthly
// (~90 pts) therefore differ by span even when trades cluster on one day.
const buildFromDaySeries = (
  account: AccountData,
  timeframe: string,
): ChartDataPoint[] => {
  const profitTarget = account.startingBalance + account.profitTarget;
  const maxLoss = account.startingBalance - account.maxDrawdown;
  const days = tfDays(timeframe);
  const windowStart = subDays(startOfDay(new Date()), days - 1);

  // Net P&L per calendar day, and the equity carried into the window (starting
  // balance plus everything realized before the window began).
  const pnlByDay = new Map<string, number>();
  let equity = account.startingBalance;
  for (const t of account.closedTrades) {
    const when = new Date(t.time);
    if (when < windowStart) {
      equity += t.netPnl;
    } else {
      const key = format(when, 'yyyy-MM-dd');
      pnlByDay.set(key, (pnlByDay.get(key) ?? 0) + t.netPnl);
    }
  }

  // No trade history at all → flat line at the current balance across the span.
  if (!account.closedTrades.length) {
    equity = account.currentBalance || account.startingBalance;
  }

  const points: ChartDataPoint[] = [];
  for (let i = 0; i < days; i++) {
    const day = addDays(windowStart, i);
    const dayPnl = pnlByDay.get(format(day, 'yyyy-MM-dd')) ?? 0;
    equity += dayPnl;
    points.push({
      date: format(day, 'MMM d'),
      balance: Math.round(equity),
      maxLoss,
      profitTarget,
      pnl: Math.round(dayPnl),
    });
  }

  return points;
};

// Flat single-point baseline — shown when the selected window has no trades
// (e.g. "daily" on a day the trader didn't trade).
const flatBaseline = (account: AccountData): ChartDataPoint[] => {
  const profitTarget = account.startingBalance + account.profitTarget;
  const maxLoss = account.startingBalance - account.maxDrawdown;
  return [
    {
      date: format(new Date(), 'MMM d'),
      balance: account.currentBalance || account.startingBalance,
      maxLoss,
      profitTarget,
      pnl: 0,
    },
  ];
};

export const buildChartData = (
  account: AccountData,
  timeframe: string,
  selectedDate?: Date,
): ChartDataPoint[] => {
  // Daily → a per-TRADE intraday curve for the selected day, so a losing trade
  // early in the session shows a dip before later wins recover it.
  if (isDailyTf(timeframe)) {
    const target = selectedDate ?? new Date();
    const dayTrades = account.closedTrades.filter((t) =>
      isSameDay(new Date(t.time), target),
    );
    return dayTrades.length
      ? buildFromTrades(account, dayTrades)
      : flatBaseline(account);
  }

  // Weekly / monthly → a per-DAY closing-equity series (zoomed out). Distinct
  // from the daily view's per-trade granularity, so changing the range visibly
  // changes the chart. Falls back to a flat baseline when there's no history.
  return buildFromDaySeries(account, timeframe);
};
