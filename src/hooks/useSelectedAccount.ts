// =============================================================================
// Dynasty Futures - Selected-account persistence hook
// =============================================================================
// Single source of truth for the dashboard's "currently viewed account".
//
// Resolution order: ?account= URL param → localStorage → first available id.
// The resolved id is mirrored back into BOTH:
//   - the URL query param (so a hard refresh and browser back/forward keep the
//     account you were viewing), and
//   - localStorage (so navigating to a param-less route — e.g. the journal's
//     "Back to Dashboard" button — and returning keeps it too).
//
// This fixes two classes of bugs:
//   1. Clicking a calendar day opened the journal for the WRONG account (the
//      link dropped the account, so the journal fell back to accounts[0]).
//   2. The viewed account didn't survive refreshes or round-trips into the
//      calendar and back.
// =============================================================================

import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const STORAGE_KEY = 'df:selectedAccountId';

const readStored = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
};

const writeStored = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage unavailable (private mode / quota) — non-fatal */
  }
};

/**
 * Resolve + persist the currently-viewed account id.
 *
 * @param availableIds ids of the accounts currently loaded. Used to validate
 *   the persisted/URL id (so a deleted account falls back cleanly) and to pick
 *   a sane default. Pass `[]` while the account list is still loading — the
 *   hook returns `''` and won't touch the URL until ids are known.
 * @returns `[selectedAccountId, setSelectedAccount]`
 */
export function useSelectedAccount(
  availableIds: string[],
): readonly [string, (id: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlAccount = searchParams.get('account') ?? '';

  const isKnown = (id: string) => id !== '' && availableIds.includes(id);

  const stored = readStored();
  const resolved = isKnown(urlAccount)
    ? urlAccount
    : isKnown(stored)
      ? stored
      : (availableIds[0] ?? '');

  // Mirror the resolved id back into the URL + localStorage once it's known.
  // Runs on mount and whenever resolution changes (e.g. accounts finish
  // loading, or a stale id falls back to a valid one).
  useEffect(() => {
    if (!resolved) return;
    writeStored(resolved);
    if (resolved !== urlAccount) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('account', resolved);
          return next;
        },
        { replace: true },
      );
    }
  }, [resolved, urlAccount, setSearchParams]);

  const setSelectedAccount = useCallback(
    (id: string) => {
      writeStored(id);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('account', id);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return [resolved, setSelectedAccount] as const;
}
