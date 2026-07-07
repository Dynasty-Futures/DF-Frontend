// =============================================================================
// Dynasty Futures - Trading Types
// =============================================================================
// Mirrors backend response shapes for /v1/trading/* endpoints. The backend
// returns Prisma models for STORED data (Decimals serialize as strings) and
// platform DTOs for LIVE data (numbers as numbers).
// =============================================================================

import type { Account, AccountStatus, Challenge } from '@/types/account';

// ---------------------------------------------------------------------------
// Account type subset returned by /trading endpoints (lighter than the admin
// AccountType — only the fields the trading service includes in its select).
// ---------------------------------------------------------------------------

export interface TradingAccountType {
  id: string;
  name: string;
  displayName: string;
  accountSize: string; // Prisma Decimal → string
  profitSplit: number;
  price: string; // Prisma Decimal → string
  payoutCycleCap?: string | null; // Prisma Decimal → string; null = uncapped
}

export interface BillingChallenge {
  id: string;
  phase: string;
  status: string;
  amountPaid: string | null;
  startedAt: string;
}

// ---------------------------------------------------------------------------
// List item — GET /v1/trading/accounts
// ---------------------------------------------------------------------------

export interface TradingAccount extends Account {
  accountType: TradingAccountType;
  challenges?: BillingChallenge[];
}

// ---------------------------------------------------------------------------
// Detail — GET /v1/trading/accounts/:id
// Same as TradingAccount + active challenges + an optional live snapshot
// merged in. `live` may be null if the platform fetch failed.
// ---------------------------------------------------------------------------

export interface TradingAccountDetail extends TradingAccount {
  challenges: Challenge[];
  live: LiveSnapshot | null;
}

// ---------------------------------------------------------------------------
// Live snapshot — GET /v1/trading/accounts/:id/live + reset action
// Maps to PlatformAccountResult on the backend. Numbers are numbers.
// ---------------------------------------------------------------------------

export interface LiveSnapshot {
  platformAccountId: string;
  platformUserId: string;
  accountName: string;
  status: string;
  balance: number;
  equity?: number;
  openPnl?: number;
  margin?: number;
  startingBalance: number;
  currency: string;
  // Phase progression
  programName?: string;
  nextProgramName?: string;
  // Day counters (payout / upgrade eligibility)
  tradingDays?: number;
  profitTradingDays?: number;
  withdrawProfitTradingDays?: number;
  activeDays?: number;
  // Trader's profit-split % on this account
  profitSplit?: number;
  // Eval → funded upgrade eligibility (YPF's own "level up reached" flag)
  isLevelUpReached?: boolean;
  // ISO timestamp once an upgrade has been requested (absent = none pending)
  upgradeRequestDate?: string;
  // Drawdown metrics
  drawDown?: number;
  maxDrawDown?: number;
  // Platform trading credentials (trader's own login/password)
  loginCredentials?: { login: string; password: string };
  createdAt?: string;
  updatedAt?: string;
}

// ---------------------------------------------------------------------------
// Daily snapshot — GET /v1/trading/accounts/:id/snapshots
// Raw Prisma DailySnapshot model. Decimals → strings.
// ---------------------------------------------------------------------------

export interface AccountSnapshot {
  id: string;
  accountId: string;
  date: string;
  openBalance: string;
  closeBalance: string;
  highBalance: string;
  lowBalance: string;
  dailyPnl: string;
  totalPnl: string;
  dailyDrawdown: string;
  currentDrawdown: string;
  tradesCount: number;
  winningTrades: number;
  losingTrades: number;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Trade — GET /v1/trading/accounts/:id/trades
// Raw Prisma Trade model. Decimals → strings; side is "BUY" | "SELL".
// ---------------------------------------------------------------------------

export type TradeSide = 'BUY' | 'SELL';

export interface Trade {
  id: string;
  accountId: string;
  externalId: string | null;
  symbol: string;
  side: TradeSide;
  quantity: number;
  entryPrice: string;
  exitPrice: string | null;
  realizedPnl: string | null;
  commission: string;
  entryTime: string;
  exitTime: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Report — GET /v1/trading/accounts/:id/report
// Maps to PlatformReportResult.
// ---------------------------------------------------------------------------

export interface AccountReport {
  platformAccountId: string;
  startDate: string;
  endDate: string;
  totalPnl: number;
  totalTrades: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  sharpeRatio?: number;
  bestDay?: number;
  worstDay?: number;
  raw?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// SSO / iframe URLs — both endpoints return { url: string }
// ---------------------------------------------------------------------------

export interface PlatformUrlResult {
  url: string;
}

/** Account-bound WooCommerce checkout URL (reset / activation) with a minted ypf-ref. */
export interface CheckoutUrlResult {
  url: string;
}

// ---------------------------------------------------------------------------
// Query params
// ---------------------------------------------------------------------------

export interface LiveOption {
  live?: boolean;
}

export interface ReportRange {
  startDt: string; // ISO date string
  endDt?: string;
}

// Re-export AccountStatus for convenience at trading-domain call sites
export type { AccountStatus };
