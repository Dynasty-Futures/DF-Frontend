// =============================================================================
// ExternalDashboardGate (temporary)
// =============================================================================
// Bounces traders to the YPF-hosted dashboard while our in-app reset/activation
// checkout flows are still being finished. Sits inside ProtectedRoute, so by the
// time it renders the user is authenticated and we have their email.
//
// Catches ALL ways into /dashboard (navbar, post-login redirect, direct URL /
// bookmark). Allowlisted emails — and everyone when VITE_EXTERNAL_DASHBOARD is
// off — pass straight through unchanged.
//
// To revert: flip VITE_EXTERNAL_DASHBOARD to "false" (this no-ops) or git-revert
// the commit. See src/lib/externalDashboard.ts.
// =============================================================================

import { type ReactNode, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  EXTERNAL_DASHBOARD_URL,
  shouldUseExternalDashboard,
} from '@/lib/externalDashboard';

interface ExternalDashboardGateProps {
  children: ReactNode;
}

const ExternalDashboardGate = ({ children }: ExternalDashboardGateProps) => {
  const { user, isLoading } = useAuth();
  const redirect = !isLoading && shouldUseExternalDashboard(user?.email);

  useEffect(() => {
    if (redirect) {
      window.location.replace(EXTERNAL_DASHBOARD_URL);
    }
  }, [redirect]);

  // Hold a spinner while auth resolves or while the external redirect is firing,
  // so our (unfinished) dashboard never flashes for a redirected trader.
  if (isLoading || redirect) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ExternalDashboardGate;
