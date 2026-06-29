import { format, subDays, setHours } from 'date-fns';

// In production, replace mock datasets with live data from PropTradeTech / broker APIs.

export interface SessionPerformance {
  preMarket: number;
  morning: number;
  lunch: number;
  afternoon: number;
}

export interface DayOfWeekPerformance {
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
}

export interface Streaks {
  maxWinStreak: number;
  maxLossStreak: number;
  currentStreak: number; // positive = winning, negative = losing
}

export interface ClosedTradePoint {
  /** ISO close timestamp */
  time: string;
  /** Commission-netted realized P&L for this trade */
  netPnl: number;
  /** Running account equity after this trade closed */
  equity: number;
  symbol: string;
}

export interface AccountData {
  id: string;
  name: string;
  size: number;
  plan: 'Standard' | 'Advanced' | 'Builder';
  planType: 'Standard' | 'Advanced' | 'Builder';
  stage: 'Evaluation' | 'Funded';
  status: 'Active' | 'Violated' | 'Closed' | 'Upgraded';
  startingBalance: number;
  profitTarget: number;
  maxDrawdown: number;
  dailyLossLimit: number;
  currentBalance: number;
  closedPnL: number;
  drawdownUsed: number;
  metrics: {
    winRate: number;
    avgWin: number;
    avgLoss: number;
    bestDay: number;
    worstDay: number;
    tradingDays: number;
    totalDays: number;
    profitStreak: number;
    grossProfit: number;
    grossLoss: number;
  };
  sessionPerformance: SessionPerformance;
  dayOfWeekPerformance: DayOfWeekPerformance;
  streaks: Streaks;
  equityHistory: number[];
  dailyPnL: number[];
  // Closed trades, oldest→newest by close time, with commission-netted P&L.
  // Drives the per-trade running-equity curve so intraday dips/recoveries show
  // instead of collapsing trades into one daily step.
  closedTrades: ClosedTradePoint[];
  // Live platform fields (YPF) — only present on detail views with live data
  nextProgramName?: string;
  profitSplit?: number;
  profitTradingDays?: number;
  credentials?: { login: string; password: string };
  // True when the account hit its profit target and YPF will allow an
  // eval → funded upgrade (drives the "Upgrade to Funded" CTA).
  canUpgrade?: boolean;
}

// Generate random but realistic equity curves
const generateEquityHistory = (startBalance: number, days: number, volatility: number, trend: number): number[] => {
  const history: number[] = [];
  let balance = startBalance;
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.45) * volatility + trend;
    balance = Math.max(startBalance * 0.9, balance + change);
    history.push(Math.round(balance));
  }
  return history;
};

// Generate daily P&L from equity history
const generateDailyPnL = (equityHistory: number[]): number[] => {
  const pnl: number[] = [];
  for (let i = 0; i < equityHistory.length; i++) {
    if (i === 0) {
      pnl.push(0);
    } else {
      pnl.push(equityHistory[i] - equityHistory[i - 1]);
    }
  }
  return pnl;
};

// 25K Standard - Evaluation - More conservative growth
const equity25K = generateEquityHistory(25000, 90, 300, 25);
const pnl25K = generateDailyPnL(equity25K);

// 50K Advanced - Funded - Moderate growth
const equity50K = generateEquityHistory(50000, 90, 500, 50);
const pnl50K = generateDailyPnL(equity50K);

// 100K Builder - Funded - Strong growth
const equity100K = generateEquityHistory(100000, 90, 800, 80);
const pnl100K = generateDailyPnL(equity100K);

export const mockAccounts: AccountData[] = [
  {
    id: '1',
    name: '25K Standard',
    size: 25000,
    plan: 'Standard',
    planType: 'Standard',
    stage: 'Evaluation',
    status: 'Active',
    startingBalance: 25000,
    profitTarget: 1500,
    maxDrawdown: 1500,
    dailyLossLimit: 750,
    currentBalance: equity25K[equity25K.length - 1],
    closedPnL: equity25K[equity25K.length - 1] - 25000,
    drawdownUsed: Math.max(0, 25000 - Math.min(...equity25K.slice(-30))),
    metrics: {
      winRate: 62,
      avgWin: 285,
      avgLoss: 165,
      bestDay: Math.max(...pnl25K),
      worstDay: Math.min(...pnl25K),
      tradingDays: 18,
      totalDays: 30,
      profitStreak: 4,
      grossProfit: 4850,
      grossLoss: 2950,
    },
    sessionPerformance: {
      preMarket: 320,
      morning: 1450,
      lunch: -280,
      afternoon: 410,
    },
    dayOfWeekPerformance: {
      Mon: 680,
      Tue: 420,
      Wed: -150,
      Thu: 530,
      Fri: 220,
    },
    streaks: {
      maxWinStreak: 6,
      maxLossStreak: 3,
      currentStreak: 2,
    },
    equityHistory: equity25K,
    dailyPnL: pnl25K,
    closedTrades: [],
  },
  {
    id: '2',
    name: '50K Advanced',
    size: 50000,
    plan: 'Advanced',
    planType: 'Advanced',
    stage: 'Funded',
    status: 'Active',
    startingBalance: 50000,
    profitTarget: 3000,
    maxDrawdown: 2500,
    dailyLossLimit: 1500,
    currentBalance: equity50K[equity50K.length - 1],
    closedPnL: equity50K[equity50K.length - 1] - 50000,
    drawdownUsed: Math.max(0, 50000 - Math.min(...equity50K.slice(-30))),
    metrics: {
      winRate: 68,
      avgWin: 485,
      avgLoss: 245,
      bestDay: Math.max(...pnl50K),
      worstDay: Math.min(...pnl50K),
      tradingDays: 22,
      totalDays: 30,
      profitStreak: 5,
      grossProfit: 8250,
      grossLoss: 3850,
    },
    sessionPerformance: {
      preMarket: 580,
      morning: 2680,
      lunch: -420,
      afternoon: 1560,
    },
    dayOfWeekPerformance: {
      Mon: 1240,
      Tue: 860,
      Wed: 380,
      Thu: 920,
      Fri: 1000,
    },
    streaks: {
      maxWinStreak: 8,
      maxLossStreak: 2,
      currentStreak: 5,
    },
    equityHistory: equity50K,
    dailyPnL: pnl50K,
    closedTrades: [],
  },
  {
    id: '3',
    name: '100K Builder',
    size: 100000,
    plan: 'Builder',
    planType: 'Builder',
    stage: 'Funded',
    status: 'Active',
    startingBalance: 100000,
    profitTarget: 6000,
    maxDrawdown: 3000,
    dailyLossLimit: 2000,
    currentBalance: equity100K[equity100K.length - 1],
    closedPnL: equity100K[equity100K.length - 1] - 100000,
    drawdownUsed: Math.max(0, 100000 - Math.min(...equity100K.slice(-30))),
    metrics: {
      winRate: 72,
      avgWin: 685,
      avgLoss: 320,
      bestDay: Math.max(...pnl100K),
      worstDay: Math.min(...pnl100K),
      tradingDays: 25,
      totalDays: 30,
      profitStreak: 7,
      grossProfit: 14200,
      grossLoss: 5800,
    },
    sessionPerformance: {
      preMarket: 1250,
      morning: 4850,
      lunch: 680,
      afternoon: 2620,
    },
    dayOfWeekPerformance: {
      Mon: 2180,
      Tue: 1650,
      Wed: 1420,
      Thu: 1890,
      Fri: 2260,
    },
    streaks: {
      maxWinStreak: 11,
      maxLossStreak: 2,
      currentStreak: 7,
    },
    equityHistory: equity100K,
    dailyPnL: pnl100K,
    closedTrades: [],
  },
];

export const getAccountById = (id: string): AccountData | undefined => {
  return mockAccounts.find((acc) => acc.id === id);
};

export interface ChartDataPoint {
  date: string;
  balance: number;
  maxLoss: number;
  profitTarget: number;
  pnl: number;
}

// Generate chart data with real dates
export const generateChartData = (
  account: AccountData,
  timeframe: string,
  selectedDate?: Date
): ChartDataPoint[] => {
  const today = new Date();

  if (timeframe === 'daily') {
    const targetDate = selectedDate ?? today;
    const daysAgo = Math.floor((today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    const pnlIndex = account.dailyPnL.length - 1 - daysAgo;

    let dayPnL = 0;
    let dayEndBalance = account.currentBalance;

    if (pnlIndex >= 0 && pnlIndex < account.dailyPnL.length) {
      dayPnL = account.dailyPnL[pnlIndex];
      dayEndBalance = account.equityHistory[pnlIndex] ?? account.currentBalance;
    }

    const dayStartBalance = dayEndBalance - dayPnL;
    const data: ChartDataPoint[] = [];

    for (let i = 0; i < 8; i++) {
      const hour = setHours(targetDate, 9 + i);
      const progress = (i + 1) / 8;
      // Deterministic noise seeded by account size, day index, and hour
      const noiseMag = Math.max(Math.abs(dayPnL) * 0.04, 5);
      const noise = Math.sin(account.size + pnlIndex * 7 + i * 13) * noiseMag;
      const balance = Math.round(dayStartBalance + dayPnL * progress + noise);

      data.push({
        date: format(hour, 'ha'),
        balance,
        maxLoss: account.startingBalance - account.maxDrawdown,
        profitTarget: account.startingBalance + account.profitTarget,
        pnl: Math.round(dayPnL / 8 + noise),
      });
    }
    return data;
  }

  // Multi-day timeframes
  const days = timeframe === 'weekly' ? 7 : 30;
  const sliceStart = Math.max(0, account.equityHistory.length - days);
  const equitySlice = account.equityHistory.slice(sliceStart);
  const pnlSlice = account.dailyPnL.slice(sliceStart);

  return equitySlice.map((balance, index) => {
    const date = subDays(today, days - 1 - index);
    return {
      date: format(date, 'MMM d'),
      balance,
      maxLoss: account.startingBalance - account.maxDrawdown,
      profitTarget: account.startingBalance + account.profitTarget,
      pnl: pnlSlice[index] || 0,
    };
  });
};
