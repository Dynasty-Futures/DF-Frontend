// =============================================================================
// Dynasty Futures - Account & Challenge Types
// =============================================================================
// These types mirror the backend's Prisma Account, AccountType, and Challenge
// models. Stub for now -- will be expanded when account endpoints are built.
// =============================================================================

// ---------------------------------------------------------------------------
// Enums (match Prisma schema)
// ---------------------------------------------------------------------------

export type AccountStatus =
  | 'EVALUATION'
  | 'PHASE_2'
  | 'PASSED'
  | 'FUNDED'
  | 'SUSPENDED'
  | 'FAILED'
  | 'CLOSED';

export type ChallengePhase = 'PHASE_1' | 'PHASE_2' | 'FUNDED';

export type ChallengeStatus = 'ACTIVE' | 'PASSED' | 'FAILED' | 'EXPIRED';

// ---------------------------------------------------------------------------
// Account Type (plan configuration -- e.g. "5K", "10K", "25K")
// ---------------------------------------------------------------------------

export interface AccountType {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  accountSize: string; // Decimal comes as string from Prisma JSON
  price: string;
  resetPrice: string;
  profitSplit: number;
  minPayoutAmount: string;
  payoutFrequency: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Account (a trader's instance of an account type)
// ---------------------------------------------------------------------------

export interface Account {
  id: string;
  userId: string;
  accountTypeId: string;
  yourPropFirmId: string | null;
  status: AccountStatus;
  startingBalance: string;
  currentBalance: string;
  highWaterMark: string;
  dailyPnl: string;
  totalPnl: string;
  currentDrawdown: string;
  maxDrawdownHit: string;
  tradingDays: number;
  activatedAt: string | null;
  passedAt: string | null;
  fundedAt: string | null;
  failedAt: string | null;
  failedReason: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Challenge (a phase within an account's progression)
// ---------------------------------------------------------------------------

export interface Challenge {
  id: string;
  accountId: string;
  phase: ChallengePhase;
  status: ChallengeStatus;
  profitTarget: string;
  maxDailyLoss: string;
  maxTotalDrawdown: string;
  minTradingDays: number;
  currentProfit: string;
  tradingDaysCount: number;
  stripePaymentId: string | null;
  amountPaid: string | null;
  startedAt: string;
  expiresAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
