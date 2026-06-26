// =============================================================================
// Dynasty Futures - Journal Service
// =============================================================================
// Maps to the backend's /v1/journal/* endpoints. Daily trader notes scoped to
// one of the authenticated user's accounts. Persisted server-side so notes
// follow the trader across devices (replaces the old localStorage-only store).
// =============================================================================

import { apiClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';

export interface JournalEntry {
  accountId: string;
  date: string; // YYYY-MM-DD
  content: string;
}

export const journalService = {
  /**
   * Get the entry for an account on a given day (content '' when empty).
   * GET /v1/journal/:accountId/:date
   */
  get: (accountId: string, date: string): Promise<ApiResponse<JournalEntry>> =>
    apiClient.get<ApiResponse<JournalEntry>>(`/journal/${accountId}/${date}`),

  /**
   * Create/update the entry (blank content clears it).
   * PUT /v1/journal/:accountId/:date
   */
  save: (
    accountId: string,
    date: string,
    content: string,
  ): Promise<ApiResponse<JournalEntry>> =>
    apiClient.put<ApiResponse<JournalEntry>>(`/journal/${accountId}/${date}`, {
      content,
    }),
};
