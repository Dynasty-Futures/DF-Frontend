// =============================================================================
// Dynasty Futures - KYC Service
// =============================================================================
// Identity verification (Sumsub) is hosted by YPF. These endpoints sync the
// trader's verification status from YPF and let them initiate the flow; the
// actual document capture happens in YPF's portal (hand-off).
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';

export type KycStatus = 'NOT_STARTED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface KycState {
  status: KycStatus;
  /** True once the user has a YPF account so verification can run. */
  linked: boolean;
}

export const kycService = {
  /** GET /v1/kyc — refresh status from YPF and return it. */
  status: (): Promise<ApiResponse<KycState>> =>
    apiClient.get<ApiResponse<KycState>>('/kyc'),

  /** POST /v1/kyc/request — initiate verification on YPF, return refreshed status. */
  request: (): Promise<ApiResponse<KycState>> =>
    apiClient.post<ApiResponse<KycState>>('/kyc/request'),
};
