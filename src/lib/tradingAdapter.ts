// =============================================================================
// Trading Data Adapter
// =============================================================================
// Translates backend /v1/trading payloads into the legacy AccountData shape
// the dashboard widgets were written against. Lets us swap real data in
// without redesigning each panel.
//
// Anything we cannot derive from the backend yet falls back to safe zeros /
// neutral defaults — never to fabricated numbers.
// =============================================================================

import { differenceInCalendarDays } from 'date-fns';
import type { AccountData, ClosedTradePoint } from '@/data/mockDashboardData';
import type { Challenge } from '@/types/account';
import type {
  AccountSnapshot,
  Trade,
  TradeSide,
  TradingAccount,
  TradingAccountDetail,
} from '@/types/trading';

const num = (v: string | number | null | undefined, fallback = 0): number => {
  if (v === null || v === undefined) return fallback;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

// Net realized P&L for a trade = gross realized P&L minus commission. YPF (and
// the trader's platform) reports P&L net of commission, so every P&L figure we
// derive — equity curve, calendar, day/session metrics — must net it too, or
// our numbers drift above the platform's (e.g. $8,632 gross vs $6,806 net).
const tradeNetPnl = (t: Trade): number => num(t.realizedPnl) - num(t.commission);

// ---------------------------------------------------------------------------
// Plan detection — backend doesn't have an explicit plan column. Best signal
// is accountType.name / displayName, e.g. "Standard 25K", "Builder 100K".
// ---------------------------------------------------------------------------

const PLAN_KEYWORDS: Array<{ match: RegExp; plan: AccountData['plan'] }> = [
  { match: /builder|dynasty/i, plan: 'Builder' },
  { match: /advanced/i, plan: 'Advanced' },
  { match: /standard|evaluation/i, plan: 'Standard' },
];

const detectPlan = (a: TradingAccount): AccountData['plan'] => {
  const haystack = `${a.accountType.name} ${a.accountType.displayName}`;
  for (const { match, plan } of PLAN_KEYWORDS) {
    if (match.test(haystack)) return plan;
  }
  return 'Standard';
};

const stageFor = (status: TradingAccount['status']): AccountData['stage'] =>
  status === 'PASSED' || status === 'FUNDED' ? 'Funded' : 'Evaluation';

const uiStatusFor = (status: TradingAccount['status']): AccountData['status'] => {
  if (status === 'CLOSED') return 'Closed';
  if (status === 'FAILED' || status === 'SUSPENDED') return 'Violated';
  return 'Active';
};

// ---------------------------------------------------------------------------
// Active challenge → profit target / loss limits. Falls back to conservative
// % of account size when no active challenge is present.
// ---------------------------------------------------------------------------

const challengeRules = (
  challenges: Challenge[] | undefined,
  startingBalance: number,
): { profitTarget: number; maxDrawdown: number; dailyLossLimit: number } => {
  const active = challenges?.find((c) => c.status === 'ACTIVE');
  // The backend stores these rules as PERCENTAGES of account size (e.g. 6 = 6%
  // — see prisma/seed.ts `toPercent`), but every dashboard consumer (chart rule
  // lines, SummaryPanel, metric tiles) works in DOLLARS. Convert here so the
  // whole dashboard stays consistent and the chart's target/loss/breakeven
  // lines land at distinct levels instead of collapsing onto the start balance.
  // A 0 (e.g. a funded account with no profit target) → $0, which consumers hide.
  const pctToDollars = (pct: number | null | undefined, fallbackPct: number): number =>
    (num(pct, fallbackPct) / 100) * startingBalance;
  return {
    profitTarget: pctToDollars(active?.profitTarget, 6),
    maxDrawdown: pctToDollars(active?.maxTotalDrawdown, 10),
    dailyLossLimit: pctToDollars(active?.maxDailyLoss, 5),
  };
};

// ---------------------------------------------------------------------------
// Snapshots → dense daily P&L + equity arrays (oldest → newest), padded so
// the last entry is "today". Missing days carry the previous balance and 0
// daily P&L. Mock helpers in mockDashboardData.ts assume this layout.
// ---------------------------------------------------------------------------

const buildSeries = (
  snapshots: AccountSnapshot[],
  startingBalance: number,
  currentBalance: number,
): { equityHistory: number[]; dailyPnL: number[] } => {
  if (!snapshots.length) {
    return { equityHistory: [currentBalance || startingBalance], dailyPnL: [0] };
  }

  const sorted = [...snapshots].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const byDay = new Map<string, AccountSnapshot>();
  for (const s of sorted) byDay.set(s.date.slice(0, 10), s);

  const today = new Date();
  const first = new Date(sorted[0]!.date);
  const totalDays = differenceInCalendarDays(today, first) + 1;

  const equityHistory: number[] = [];
  const dailyPnL: number[] = [];
  let lastBalance = num(sorted[0]!.openBalance, startingBalance);

  for (let i = 0; i < totalDays; i++) {
    const day = new Date(first);
    day.setDate(first.getDate() + i);
    const key = day.toISOString().slice(0, 10);
    const snap = byDay.get(key);

    if (snap) {
      lastBalance = num(snap.closeBalance, lastBalance);
      equityHistory.push(lastBalance);
      dailyPnL.push(num(snap.dailyPnl));
    } else {
      equityHistory.push(lastBalance);
      dailyPnL.push(0);
    }
  }

  return { equityHistory, dailyPnL };
};

// ---------------------------------------------------------------------------
// Fallback equity/daily-P&L series derived from closed trades, used when the
// backend has no daily snapshots (YPF exposes no daily-snapshot time series, so
// snapshots are usually empty). Same dense oldest→newest, last == today layout
// as buildSeries so the calendar + equity curve read it unchanged.
// ---------------------------------------------------------------------------

const buildSeriesFromTrades = (
  trades: Trade[],
  startingBalance: number,
  currentBalance: number,
): { equityHistory: number[]; dailyPnL: number[] } => {
  const closed = trades
    .filter((t) => t.exitTime && t.realizedPnl !== null)
    .map((t) => ({
      day: new Date(t.exitTime as string).toISOString().slice(0, 10),
      pnl: tradeNetPnl(t),
    }));

  if (!closed.length) {
    return { equityHistory: [currentBalance || startingBalance], dailyPnL: [0] };
  }

  const byDay = new Map<string, number>();
  for (const c of closed) byDay.set(c.day, (byDay.get(c.day) ?? 0) + c.pnl);

  const firstKey = closed.reduce((min, c) => (c.day < min ? c.day : min), closed[0]!.day);
  const first = new Date(`${firstKey}T00:00:00`);
  const today = new Date();
  const totalDays = differenceInCalendarDays(today, first) + 1;

  const equityHistory: number[] = [];
  const dailyPnL: number[] = [];
  let runningBalance = startingBalance;

  for (let i = 0; i < totalDays; i++) {
    const day = new Date(first);
    day.setDate(first.getDate() + i);
    const dayPnl = byDay.get(day.toISOString().slice(0, 10)) ?? 0;
    runningBalance += dayPnl;
    equityHistory.push(runningBalance);
    dailyPnL.push(dayPnl);
  }

  return { equityHistory, dailyPnL };
};

// ---------------------------------------------------------------------------
// Closed trades → per-trade running-equity points (oldest→newest by close
// time), starting from the account's true starting balance. This is what the
// platform plots: equity steps once per closed trade (net of commission), so a
// losing trade early in the session shows a dip before later wins recover it —
// instead of collapsing a whole day into a single bar.
// ---------------------------------------------------------------------------

const buildClosedTrades = (
  trades: Trade[],
  startingBalance: number,
): ClosedTradePoint[] => {
  const closed = trades
    .filter((t) => t.exitTime && t.realizedPnl !== null)
    .sort(
      (a, b) =>
        new Date(a.exitTime as string).getTime() -
        new Date(b.exitTime as string).getTime(),
    );

  let equity = startingBalance;
  return closed.map((t) => {
    const netPnl = tradeNetPnl(t);
    equity += netPnl;
    return {
      time: t.exitTime as string,
      netPnl,
      equity,
      symbol: t.symbol,
    };
  });
};

// ---------------------------------------------------------------------------
// Trades → win rate, avg win, avg loss, gross profit/loss, session perf,
// day-of-week perf, streaks. All derived; if no trades, fields zero out.
// ---------------------------------------------------------------------------

const sessionFromHour = (hour: number): keyof AccountData['sessionPerformance'] => {
  if (hour < 9 || (hour === 9 && hour < 9.5)) return 'preMarket';
  if (hour < 12) return 'morning';
  if (hour < 14) return 'lunch';
  return 'afternoon';
};

const DOW_KEYS: Array<keyof AccountData['dayOfWeekPerformance']> = [
  // Sun is excluded — futures markets don't trade Sundays in our UI
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
];

const computeMetrics = (trades: Trade[]): {
  metrics: AccountData['metrics'];
  sessionPerformance: AccountData['sessionPerformance'];
  dayOfWeekPerformance: AccountData['dayOfWeekPerformance'];
  streaks: AccountData['streaks'];
} => {
  const closed = trades.filter((t) => t.exitTime && t.realizedPnl !== null);
  const pnls = closed.map((t) => tradeNetPnl(t));
  const wins = pnls.filter((p) => p > 0);
  const losses = pnls.filter((p) => p < 0);
  const grossProfit = wins.reduce((s, p) => s + p, 0);
  const grossLoss = Math.abs(losses.reduce((s, p) => s + p, 0));

  // Group by trading day (entry date) to derive day metrics + streaks
  const byDay = new Map<string, number>();
  const byDow: AccountData['dayOfWeekPerformance'] = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
  };
  const session: AccountData['sessionPerformance'] = {
    preMarket: 0,
    morning: 0,
    lunch: 0,
    afternoon: 0,
  };

  for (const t of closed) {
    const pnl = tradeNetPnl(t);
    const entry = new Date(t.entryTime);
    const dayKey = entry.toISOString().slice(0, 10);
    byDay.set(dayKey, (byDay.get(dayKey) ?? 0) + pnl);

    const dowIdx = entry.getDay() - 1; // 0=Sun → -1; we drop weekends
    const dowKey = DOW_KEYS[dowIdx];
    if (dowKey) byDow[dowKey] += pnl;

    const decimalHour = entry.getHours() + entry.getMinutes() / 60;
    session[sessionFromHour(decimalHour)] += pnl;
  }

  const dayPnls = Array.from(byDay.values());
  const tradingDays = dayPnls.length;
  const bestDay = dayPnls.length ? Math.max(...dayPnls) : 0;
  const worstDay = dayPnls.length ? Math.min(...dayPnls) : 0;

  // Streaks — walk by chronological day
  const orderedDays = Array.from(byDay.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );
  let maxWin = 0;
  let maxLoss = 0;
  let curWin = 0;
  let curLoss = 0;
  let lastDirection = 0;
  let currentStreak = 0;

  for (const [, pnl] of orderedDays) {
    if (pnl > 0) {
      curWin += 1;
      curLoss = 0;
      maxWin = Math.max(maxWin, curWin);
      currentStreak = lastDirection >= 0 ? currentStreak + 1 : 1;
      lastDirection = 1;
    } else if (pnl < 0) {
      curLoss += 1;
      curWin = 0;
      maxLoss = Math.max(maxLoss, curLoss);
      currentStreak = lastDirection <= 0 ? -(Math.abs(currentStreak) + 1) : -1;
      lastDirection = -1;
    } else {
      curWin = 0;
      curLoss = 0;
      currentStreak = 0;
      lastDirection = 0;
    }
  }

  return {
    metrics: {
      winRate: closed.length ? Math.round((wins.length / closed.length) * 100) : 0,
      avgWin: wins.length ? grossProfit / wins.length : 0,
      avgLoss: losses.length ? grossLoss / losses.length : 0,
      bestDay,
      worstDay,
      tradingDays,
      totalDays: 30,
      profitStreak: currentStreak > 0 ? currentStreak : 0,
      grossProfit,
      grossLoss,
    },
    sessionPerformance: session,
    dayOfWeekPerformance: byDow,
    streaks: { maxWinStreak: maxWin, maxLossStreak: maxLoss, currentStreak },
  };
};

// ---------------------------------------------------------------------------
// Public adapter
// ---------------------------------------------------------------------------

export const adaptAccountView = (
  account: TradingAccount | TradingAccountDetail,
  snapshots: AccountSnapshot[],
  trades: Trade[],
): AccountData => {
  const startingBalance = num(account.startingBalance);
  const currentBalance = num(account.currentBalance);
  const challenges = 'challenges' in account ? account.challenges : undefined;
  const { profitTarget, maxDrawdown, dailyLossLimit } = challengeRules(
    challenges,
    startingBalance,
  );

  // Prefer real daily snapshots; fall back to a trade-derived series when the
  // backend has none (the common case, since YPF has no snapshot time series).
  const series = snapshots.length
    ? buildSeries(snapshots, startingBalance, currentBalance)
    : buildSeriesFromTrades(trades, startingBalance, currentBalance);
  const derived = computeMetrics(trades);

  // currentDrawdown is a percentage in the DB (Decimal(5,2)); convert to money
  const drawdownUsedMoney = (num(account.currentDrawdown) / 100) * startingBalance;

  // Live platform snapshot (YPF) — present on detail views. Prefer its
  // authoritative day counts / program names over values derived from trades.
  const live = 'live' in account ? account.live : null;
  if (live?.tradingDays !== undefined) {
    derived.metrics.tradingDays = live.tradingDays;
  }

  return {
    id: account.id,
    name: account.accountType.displayName || account.accountType.name,
    size: num(account.accountType.accountSize, startingBalance),
    plan: detectPlan(account),
    planType: detectPlan(account),
    stage: stageFor(account.status),
    status: uiStatusFor(account.status),
    startingBalance,
    profitTarget,
    maxDrawdown,
    dailyLossLimit,
    currentBalance,
    closedPnL: num(account.totalPnl),
    drawdownUsed: drawdownUsedMoney,
    metrics: derived.metrics,
    sessionPerformance: derived.sessionPerformance,
    dayOfWeekPerformance: derived.dayOfWeekPerformance,
    streaks: derived.streaks,
    equityHistory: series.equityHistory,
    dailyPnL: series.dailyPnL,
    closedTrades: buildClosedTrades(trades, startingBalance),
    ...(live?.nextProgramName ? { nextProgramName: live.nextProgramName } : {}),
    ...(live?.profitSplit !== undefined ? { profitSplit: live.profitSplit } : {}),
    ...(live?.profitTradingDays !== undefined
      ? { profitTradingDays: live.profitTradingDays }
      : {}),
    ...(live?.loginCredentials ? { credentials: live.loginCredentials } : {}),
  };
};

// Re-export for convenience
export type { AccountData, TradeSide };
