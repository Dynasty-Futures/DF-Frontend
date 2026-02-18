import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { AdminDrawer } from '../AdminDrawer';
import { AdminNotesThread } from '../AdminNotesThread';
import { useAdminUsers, useChangeUserRole } from '@/hooks/useUsers';
import { useAdminAccounts } from '@/hooks/useAccounts';
import type { User, UserRole } from '@/types/user';
import { AlertTriangle, ShieldCheck, Headset, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const kycLabel: Record<string, string> = {
  NOT_STARTED: 'Not Started',
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

const statusLabel: Record<string, string> = {
  PENDING_VERIFICATION: 'Pending Verification',
  ACTIVE: 'Active',
  SUSPENDED: 'Suspended',
  BANNED: 'Banned',
};

const roleLabel: Record<string, string> = {
  TRADER: 'Trader',
  SUPPORT: 'Support',
  ADMIN: 'Admin',
};

const formatLabel = (value: string, labels: Record<string, string>): string =>
  labels[value] ?? value;

const fullName = (user: User): string =>
  `${user.firstName} ${user.lastName}`;

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString();
};

const formatDateTime = (dateStr: string | null): string => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdminUsersKYC() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: response, isLoading, isError } = useAdminUsers({ limit: 100 });
  const users = response?.data ?? [];
  const changeRole = useChangeUserRole();

  const handleChangeRole = (userId: string, role: UserRole, label: string) => {
    changeRole.mutate(
      { id: userId, role },
      {
        onSuccess: (res) => {
          toast.success(`Role changed to ${label}`);
          setSelectedUser(res.data);
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to change role');
        },
      },
    );
  };

  const { data: accountsResponse } = useAdminAccounts(
    { userId: selectedUser?.id, limit: 100 },
    { enabled: !!selectedUser },
  );
  const userAccounts = accountsResponse?.data ?? [];

  const columns: Column<User>[] = [
    { key: 'name', header: 'User', sortable: true,
      render: (item) => fullName(item) },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true,
      render: (item) => formatLabel(item.role, roleLabel) },
    { key: 'status', header: 'Status',
      render: (item) => <AdminStatusBadge status={formatLabel(item.status, statusLabel)} /> },
    { key: 'kycStatus', header: 'KYC Status',
      render: (item) => <AdminStatusBadge status={formatLabel(item.kycStatus, kycLabel)} /> },
    { key: 'accountsCount', header: 'Accounts', sortable: true,
      render: (item) => item._count?.accounts ?? 0 },
    { key: 'emailVerified', header: 'Email Verified',
      render: (item) => (
        <span className={item.emailVerified ? 'text-primary' : 'text-muted-foreground'}>
          {item.emailVerified ? 'Yes' : 'No'}
        </span>
      ) },
    { key: 'createdAt', header: 'Created', sortable: true,
      render: (item) => formatDate(item.createdAt) },
    { key: 'lastLoginAt', header: 'Last Login', sortable: true,
      render: (item) => formatDateTime(item.lastLoginAt) },
  ];

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const accountStatusLabel: Record<string, string> = {
    EVALUATION: 'Evaluation',
    PHASE_2: 'Phase 2',
    PASSED: 'Passed',
    FUNDED: 'Funded',
    SUSPENDED: 'Suspended',
    FAILED: 'Failed',
    CLOSED: 'Closed',
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <p className="text-lg font-medium text-foreground">Failed to load users</p>
        <p className="text-sm">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AdminDataTable
        data={users}
        columns={columns}
        keyField="id"
        searchable
        searchPlaceholder="Search users..."
        onRowClick={handleRowClick}
        loading={isLoading}
      />

      <AdminDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedUser ? fullName(selectedUser) : ''}
        subtitle={selectedUser?.email}
        width="xl"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* Status badges */}
            <div className="flex gap-2 flex-wrap">
              <AdminStatusBadge status={formatLabel(selectedUser.status, statusLabel)} />
              <AdminStatusBadge status={formatLabel(selectedUser.kycStatus, kycLabel)} />
              <AdminStatusBadge status={formatLabel(selectedUser.role, roleLabel)} />
            </div>

            {/* Personal Info */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="ml-2">{fullName(selectedUser)}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="ml-2">{selectedUser.email}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="ml-2">{selectedUser.phone || '—'}</span></div>
                <div><span className="text-muted-foreground">Email Verified:</span> <span className="ml-2">{selectedUser.emailVerified ? 'Yes' : 'No'}</span></div>
                <div><span className="text-muted-foreground">Created:</span> <span className="ml-2">{formatDate(selectedUser.createdAt)}</span></div>
                <div><span className="text-muted-foreground">Last Login:</span> <span className="ml-2">{formatDateTime(selectedUser.lastLoginAt)}</span></div>
              </div>
            </div>

            {/* KYC Status */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">KYC Status</h4>
              <div className="flex items-center gap-3">
                <AdminStatusBadge status={formatLabel(selectedUser.kycStatus, kycLabel)} />
                <span className="text-sm text-muted-foreground">
                  {selectedUser.kycStatus === 'APPROVED'
                    ? 'Identity verified'
                    : selectedUser.kycStatus === 'PENDING'
                      ? 'Awaiting review'
                      : selectedUser.kycStatus === 'REJECTED'
                        ? 'Verification rejected'
                        : 'Not yet submitted'}
                </span>
              </div>
            </div>

            {/* Role Management */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Role Management</h4>
              <p className="text-sm text-muted-foreground">
                Current role: <span className="font-medium text-foreground">{formatLabel(selectedUser.role, roleLabel)}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedUser.role !== 'ADMIN' && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={changeRole.isPending}
                    onClick={() => handleChangeRole(selectedUser.id, 'ADMIN', 'Admin')}
                  >
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    Promote to Admin
                  </Button>
                )}
                {selectedUser.role !== 'SUPPORT' && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={changeRole.isPending}
                    onClick={() => handleChangeRole(selectedUser.id, 'SUPPORT', 'Support')}
                  >
                    <Headset className="h-4 w-4 mr-1" />
                    {selectedUser.role === 'ADMIN' ? 'Demote to Support' : 'Promote to Support'}
                  </Button>
                )}
                {selectedUser.role !== 'TRADER' && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={changeRole.isPending}
                    onClick={() => handleChangeRole(selectedUser.id, 'TRADER', 'Trader')}
                  >
                    <UserIcon className="h-4 w-4 mr-1" />
                    Demote to Trader
                  </Button>
                )}
              </div>
            </div>

            {/* Linked Accounts */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Linked Accounts ({userAccounts.length})</h4>
              {userAccounts.length > 0 ? (
                <div className="space-y-2">
                  {userAccounts.map(acc => (
                    <div key={acc.id} className="flex items-center justify-between text-sm p-2 rounded bg-muted/20">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs">{acc.id.slice(0, 8)}...</span>
                        <span className="text-muted-foreground">{acc.accountType.displayName}</span>
                      </div>
                      <AdminStatusBadge status={formatLabel(acc.status, accountStatusLabel)} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No accounts</p>
              )}
            </div>

            {/* Notes */}
            <AdminNotesThread notes={[]} onAddNote={() => {}} />
          </div>
        )}
      </AdminDrawer>
    </div>
  );
}
