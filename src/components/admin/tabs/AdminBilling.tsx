import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { useAdminAccounts } from '@/hooks/useAccounts';
import type { AdminAccount } from '@/types/account';
import { AlertTriangle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatCurrency = (value: string | number | null | undefined): string => {
  if (value == null) return '—';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const getAmountPaid = (account: AdminAccount): string => {
  const paid = account.challenges[0]?.amountPaid;
  return formatCurrency(paid ?? account.accountType.price);
};

const fullName = (acc: AdminAccount): string =>
  `${acc.user.firstName} ${acc.user.lastName}`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdminBilling() {
  const { data: response, isLoading, isError } = useAdminAccounts({ limit: 100 });
  const accounts = response?.data ?? [];

  const columns: Column<AdminAccount>[] = [
    {
      key: 'createdAt',
      header: 'Purchase Date',
      sortable: true,
      render: (item) => formatDate(item.createdAt),
    },
    {
      key: 'userName',
      header: 'User',
      sortable: true,
      render: (item) => (
        <div>
          <p className="font-medium text-foreground">{fullName(item)}</p>
          <p className="text-xs text-muted-foreground">{item.user.email}</p>
        </div>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (item) => (
        <div>
          <p className="font-medium text-foreground">{item.accountType.displayName}</p>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(item.accountType.accountSize)} account
          </p>
        </div>
      ),
    },
    {
      key: 'amountPaid',
      header: 'Amount Paid',
      render: (item) => (
        <span className="font-semibold text-foreground">{getAmountPaid(item)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (item) => <AdminStatusBadge status={item.status} />,
    },
  ];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <p className="text-lg font-medium text-foreground">Failed to load billing data</p>
        <p className="text-sm">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <AdminDataTable
      data={accounts}
      columns={columns}
      keyField="id"
      searchable
      searchPlaceholder="Search by user or email..."
      loading={isLoading}
    />
  );
}
