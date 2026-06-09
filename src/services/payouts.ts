// =============================================================================
// Dynasty Futures - Payouts Service
// =============================================================================
// Maps to the backend's /v1/payouts endpoints. Eligibility, profit split,
// approval, and the Rise money rail are owned by YPF — these endpoints surface
// withdrawable profit, submit a request, and return the mirrored history.
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';

export interface EligibleAccount {
  accountId: string;
  accountName: string;
  currency: string;
  currentBalance: number;
  startingBalance: number;
  availableProfit: number;
  hasPendingPayout: boolean;
  eligible: boolean;
}

export type PayoutStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'REJECTED'
  | 'FAILED';

export interface Payout {
  id: string;
  accountId: string;
  accountName: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  transferType: string | null;
  profitSplit: number | null;
  commission: number | null;
  transferAmount: number | null;
  rejectionReason: string | null;
  requestedAt: string;
  processedAt: string | null;
}

// Bank details are forwarded to YPF and never stored by Dynasty Futures.
export interface BankPayoutDetails {
  accountHolder: string;
  accountNumber: string;
  swiftBic: string;
  currency: string;
}

export interface RequestPayoutPayload {
  accountId: string;
  amount: number;
  payoutDetails: BankPayoutDetails;
}

export const payoutService = {
  /** GET /v1/payouts/eligible-accounts */
  getEligibleAccounts: (): Promise<ApiResponse<EligibleAccount[]>> =>
    apiClient.get<ApiResponse<EligibleAccount[]>>('/payouts/eligible-accounts'),

  /** GET /v1/payouts */
  getHistory: (): Promise<ApiResponse<Payout[]>> =>
    apiClient.get<ApiResponse<Payout[]>>('/payouts'),

  /** POST /v1/payouts */
  requestPayout: (payload: RequestPayoutPayload): Promise<ApiResponse<Payout>> =>
    apiClient.post<ApiResponse<Payout>>('/payouts', payload),
} as const;
