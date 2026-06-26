// =============================================================================
// Dynasty Futures - Journal React Query Hooks
// =============================================================================
// Server-persisted daily journal notes, scoped to an account. Follows the
// query-key factory pattern used across the dashboard hooks.
// =============================================================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { journalService, type JournalEntry } from '@/services/journal';
import type { ApiResponse, ApiError } from '@/types/api';

export const journalKeys = {
  all: ['journal'] as const,
  entry: (accountId: string, date: string) =>
    [...journalKeys.all, accountId, date] as const,
};

/**
 * Fetch the journal entry for an account on a given day. Disabled until an
 * account id is known.
 */
export const useJournalEntry = (accountId: string | undefined, date: string) =>
  useQuery<ApiResponse<JournalEntry>, ApiError>({
    queryKey: journalKeys.entry(accountId ?? '', date),
    queryFn: () => journalService.get(accountId as string, date),
    enabled: !!accountId,
    staleTime: 30_000,
  });

/**
 * Save (or clear) the journal entry for an account. Writes the result straight
 * into the cache so the editor stays in sync without a refetch.
 */
export const useSaveJournalEntry = (accountId: string | undefined) => {
  const qc = useQueryClient();
  return useMutation<
    ApiResponse<JournalEntry>,
    ApiError,
    { date: string; content: string }
  >({
    mutationFn: ({ date, content }) =>
      journalService.save(accountId as string, date, content),
    onSuccess: (data, { date }) => {
      qc.setQueryData(journalKeys.entry(accountId ?? '', date), data);
    },
  });
};
