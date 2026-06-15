// =============================================================================
// Dynasty Futures - Crisp Live Chat
// =============================================================================
// Mounts the Crisp chat widget site-wide and keeps it in sync with auth state.
//
// - Boots Crisp once. The SDK is dynamically imported inside an effect so it
//   stays out of the SSR/prerender path (effects never run during
//   renderToString) and is code-split out of the main bundle.
// - When a trader is logged in, identifies them to the support team (email,
//   name, and useful session context) so agents have full context in the inbox.
// - On logout, resets the Crisp session so the next person on a shared device
//   starts a clean, anonymous conversation.
//
// Renders nothing. No-ops entirely when VITE_CRISP_WEBSITE_ID is unset.
// =============================================================================

import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { env } from '@/config/env';

const CrispChat = () => {
  const { user } = useAuth();

  // Crisp.configure() must run exactly once; subsequent renders only update
  // identity. Refs survive re-renders without retriggering effects.
  const configuredRef = useRef(false);
  // Only reset the session on a real logout (a prior identified -> null
  // transition), never on the initial anonymous render.
  const wasIdentifiedRef = useRef(false);

  useEffect(() => {
    if (!env.crispWebsiteId) return;

    let cancelled = false;

    // Dynamic import is cached after the first call, so re-running this effect
    // on every `user` change resolves instantly without re-fetching the SDK.
    void import('crisp-sdk-web').then(({ Crisp }) => {
      if (cancelled) return;

      if (!configuredRef.current) {
        Crisp.configure(env.crispWebsiteId);
        configuredRef.current = true;
      }

      if (user) {
        Crisp.user.setEmail(user.email);
        Crisp.user.setNickname(`${user.firstName} ${user.lastName}`.trim());
        Crisp.session.setData({
          user_id: user.id,
          role: user.role,
          status: user.status,
          kyc_status: user.kycStatus,
          accounts: user._count?.accounts ?? 0,
        });
        wasIdentifiedRef.current = true;
      } else if (wasIdentifiedRef.current) {
        Crisp.session.reset();
        wasIdentifiedRef.current = false;
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return null;
};

export default CrispChat;
