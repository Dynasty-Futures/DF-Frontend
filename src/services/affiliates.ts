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
} as const;
