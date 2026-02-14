// =============================================================================
// RoleGuard
// =============================================================================
// Wraps routes that require a specific role. Enforces authentication first,
// then checks the user's role. Redirects to /dashboard (or a custom path)
// if the role check fails.
//
// Usage:
//   <Route path="/admin" element={
//     <RoleGuard roles={['ADMIN']}>
//       <AdminPage />
//     </RoleGuard>
//   } />
// =============================================================================

import { type ReactNode } from 'react';
import { useRequireRole } from '@/hooks/useAuth';
import type { UserRole } from '@/types/user';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  children: ReactNode;
  /** One or more roles that are allowed to view this route. */
  roles: UserRole[];
  /** Where to redirect when the role check fails (defaults to /dashboard). */
  fallbackPath?: string;
}

const RoleGuard = ({ children, roles, fallbackPath }: RoleGuardProps) => {
  const { isLoading, isAuthenticated, user } = useRequireRole(roles, fallbackPath);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !user || !roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
