// =============================================================================
// Dynasty Futures - User Types
// =============================================================================
// These types mirror the backend's Prisma User model.
// Stub for now -- will be expanded when auth endpoints are built.
// =============================================================================

// ---------------------------------------------------------------------------
// Enums (match Prisma schema)
// ---------------------------------------------------------------------------

export type UserRole = 'TRADER' | 'SUPPORT' | 'ADMIN';

export type UserStatus =
  | 'PENDING_VERIFICATION'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'BANNED';

export type KycStatus =
  | 'NOT_STARTED'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED';

// ---------------------------------------------------------------------------
// User Filters (for admin list queries)
// ---------------------------------------------------------------------------

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'email' | 'lastName' | 'role' | 'status';
  sortOrder?: 'asc' | 'desc';
}

// ---------------------------------------------------------------------------
// User Stats (for admin dashboard)
// ---------------------------------------------------------------------------

export interface UserStats {
  total: number;
  byRole: Record<string, number>;
  byStatus: Record<string, number>;
}

// ---------------------------------------------------------------------------
// User (public-facing fields -- never includes credentials)
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  kycStatus: KycStatus;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  platformUserId?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { accounts: number };
}

// ---------------------------------------------------------------------------
// Platform User Profile (Volumetrica) — GET /v1/users/:id/platform
// Mirrors PlatformUserResult from the backend providers/types.ts.
// ---------------------------------------------------------------------------

export interface PlatformUserProfile {
  platformUserId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  birthday?: string;
  organizationStatus?: number;
  webAccessDisabled?: boolean;
  extEntityId?: string;
  createdAt?: string;
  updatedAt?: string;
}
