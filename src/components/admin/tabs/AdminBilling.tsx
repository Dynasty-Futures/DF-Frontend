import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge, AdminPlanBadge } from '../AdminStatusBadge';
import { mockSubscriptions, mockTransactions, type MockSubscription, type MockTransaction } from '@/data/mockAdminData';
import { XCircle, Gift, Eye, RotateCcw, CheckCircle } from 'lucide-react';

export function AdminBilling() {
  const [activeTab, setActiveTab] = useState('subscriptions');

  const subColumns: Column<MockSubscription>[] = [
    { key: 'userName', header: 'User', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'plan', header: 'Plan', render: (item) => <AdminPlanBadge plan={item.plan} /> },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'startDate', header: 'Start Date', sortable: true },
    { key: 'renewalDate', header: 'Renewal', sortable: true },
    { key: 'lastPaymentStatus', header: 'Last Payment', render: (item) => <AdminStatusBadge status={item.lastPaymentStatus} /> },
    { key: 'amount', header: 'Amount', render: (item) => `$${item.amount}` },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2"><Eye className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2"><Gift className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive"><XCircle className="h-3 w-3" /></Button>
      </div>
    )},
  ];

  const txnColumns: Column<MockTransaction>[] = [
    { key: 'date', header: 'Date', sortable: true },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'amount', header: 'Amount', sortable: true, render: (item) => `$${item.amount}` },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'referenceId', header: 'Reference' },
    { key: 'actions', header: 'Actions', render: (item) => (
      <div className="flex gap-1">
        {item.status === 'Paid' && <Button size="sm" variant="ghost" className="h-7 px-2"><RotateCcw className="h-3 w-3" /></Button>}
        {item.status === 'Chargeback' && <Button size="sm" variant="ghost" className="h-7 px-2"><CheckCircle className="h-3 w-3" /></Button>}
      </div>
    )},
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-muted/20 border border-border/30">
        <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>

      <TabsContent value="subscriptions" className="mt-4">
        <AdminDataTable data={mockSubscriptions} columns={subColumns} keyField="id" searchable searchPlaceholder="Search subscriptions..." />
      </TabsContent>

      <TabsContent value="transactions" className="mt-4">
        <AdminDataTable data={mockTransactions} columns={txnColumns} keyField="id" searchable searchPlaceholder="Search transactions..." />
      </TabsContent>
    </Tabs>
  );
}
