// =============================================================================
// ProtectedRoute
// =============================================================================
// Wraps routes that require authentication. Shows a loading spinner while the
// session is being restored; redirects to /login if the user is not logged in.
//
// Usage:
//   <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
// =============================================================================

import { type ReactNode } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // useRequireAuth handles the redirect; if we reach here we're authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
