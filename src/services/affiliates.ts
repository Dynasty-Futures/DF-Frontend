// =============================================================================
// Dynasty Futures - Affiliate Service
// =============================================================================
// Maps to the backend's /v1/affiliates endpoints.
//
// Usage:
//   import { affiliateService } from '@/services/affiliates';
//   await affiliateService.apply({ ... });
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';

export type AffiliateApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type AffiliateCouponStatus = 'CREATED' | 'APPROVED' | 'REJECTED';

export interface AffiliateCouponView {
  code: string;
  discountType: string | null;
  discountValue: number;
  status: AffiliateCouponStatus;
}

/**
 * The user's affiliate state, sourced from webhook-mirrored data. Earnings,
 * clicks, and tier metrics require the affiliate-platform service token and are
 * intentionally absent — the UI renders them as "syncing".
 */
export interface MyAffiliateStatus {
  hasApplied: boolean;
  status: AffiliateApplicationStatus | null;
  isApproved: boolean;
  preferredCode: string | null;
  referralCode: string | null;
  appliedAt: string | null;
  coupons: AffiliateCouponView[];
}

export interface AffiliateApplicationInput {
  websiteUrl?: string;
  youtubeUrl?: string;
  xUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  telegramUrl?: string;
  discordUrl?: string;
  isFundedTrader: boolean;
  hasActiveDynastyAccount: boolean;
  promotionPlan: string;
  primaryTrafficMethod: string;
  createsCustomContent: boolean;
  contentUpdateFrequency: string;
  preferredAffiliateCode: string;
  restrictedJurisdictionConfirmation: boolean;
}

export interface AffiliateApplicationResponse {
  success: true;
  data: {
    id: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  };
  message?: string;
}

export const affiliateService = {
  /**
   * Submit an affiliate program application.
   * POST /v1/affiliates/apply
   */
  apply: (data: AffiliateApplicationInput): Promise<AffiliateApplicationResponse> =>
    apiClient.post<AffiliateApplicationResponse>('/affiliates/apply', data),

  /**
   * The current user's affiliate status, referral code, and discount coupons.
   * GET /v1/affiliates/me
   */
  me: (): Promise<ApiResponse<MyAffiliateStatus>> =>
    apiClient.get<ApiResponse<MyAffiliateStatus>>('/affiliates/me'),
} as const;
