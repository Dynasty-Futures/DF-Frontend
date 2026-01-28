import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { AdminDrawer } from '../AdminDrawer';
import { AdminNotesThread } from '../AdminNotesThread';
import { mockUsers, mockNotes, mockAccounts, type MockUser } from '@/data/mockAdminData';
import { RefreshCw, StickyNote, Eye } from 'lucide-react';

export function AdminUsersKYC() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  const columns: Column<MockUser>[] = [
    { key: 'name', header: 'User', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'country', header: 'Country', sortable: true },
    { key: 'createdAt', header: 'Created', sortable: true },
    { key: 'kycStatus', header: 'KYC Status', render: (item) => <AdminStatusBadge status={item.kycStatus} /> },
    { key: 'taxFormStatus', header: 'Tax Form', render: (item) => <AdminStatusBadge status={item.taxFormStatus} /> },
    { key: 'accountsCount', header: 'Accounts', sortable: true },
    { key: 'lastActive', header: 'Last Active', sortable: true },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2"><Eye className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2"><RefreshCw className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2"><StickyNote className="h-3 w-3" /></Button>
      </div>
    )},
  ];

  const handleRowClick = (user: MockUser) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const userAccounts = selectedUser ? mockAccounts.filter(a => a.userId === selectedUser.id) : [];

  return (
    <div className="space-y-4">
      <AdminDataTable data={mockUsers} columns={columns} keyField="id" searchable searchPlaceholder="Search users..." onRowClick={handleRowClick} />

      <AdminDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selectedUser?.name || ''} subtitle={selectedUser?.email} width="xl">
        {selectedUser && (
          <div className="space-y-6">
            {/* Status badges */}
            <div className="flex gap-2">
              <AdminStatusBadge status={selectedUser.kycStatus} />
              <AdminStatusBadge status={selectedUser.taxFormStatus} />
            </div>

            {/* Personal Info */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Country:</span> <span className="ml-2">{selectedUser.country}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="ml-2">{selectedUser.phone || '—'}</span></div>
                <div><span className="text-muted-foreground">Created:</span> <span className="ml-2">{selectedUser.createdAt}</span></div>
                <div><span className="text-muted-foreground">Last Active:</span> <span className="ml-2">{selectedUser.lastActive}</span></div>
              </div>
            </div>

            {/* KYC Checklist */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">KYC Checklist</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><span className={selectedUser.kycStatus === 'Verified' ? 'text-primary' : 'text-muted-foreground'}>✓</span> ID Document</div>
                <div className="flex items-center gap-2"><span className={selectedUser.kycStatus === 'Verified' ? 'text-primary' : 'text-muted-foreground'}>✓</span> Address Proof</div>
                <div className="flex items-center gap-2"><span className={selectedUser.kycStatus === 'Verified' ? 'text-primary' : 'text-muted-foreground'}>✓</span> Selfie Verification</div>
              </div>
            </div>

            {/* Tax Form */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Tax Form</h4>
              <p className="text-sm text-muted-foreground">{selectedUser.country === 'United States' ? 'W-9 Required' : 'W-8BEN Required'}</p>
              <AdminStatusBadge status={selectedUser.taxFormStatus} />
            </div>

            {/* Linked Accounts */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Linked Accounts ({userAccounts.length})</h4>
              {userAccounts.length > 0 ? (
                <div className="space-y-2">
                  {userAccounts.map(acc => (
                    <div key={acc.id} className="flex items-center justify-between text-sm p-2 rounded bg-muted/20">
                      <span>{acc.id}</span>
                      <AdminStatusBadge status={acc.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No accounts</p>
              )}
            </div>

            {/* Notes */}
            <AdminNotesThread notes={mockNotes} onAddNote={() => {}} />
          </div>
        )}
      </AdminDrawer>
    </div>
  );
}
