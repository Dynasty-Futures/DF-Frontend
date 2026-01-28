import { useState } from 'react';
import { Eye, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockAccounts = [
  {
    id: '1',
    startDate: '2025-01-15',
    planType: 'Standard',
    accountSize: '$100K',
    stage: 'Funded',
    status: 'Active',
    balance: '$104,800',
  },
  {
    id: '2',
    startDate: '2025-02-01',
    planType: 'Advanced',
    accountSize: '$50K',
    stage: 'Evaluation',
    status: 'Active',
    balance: '$51,200',
  },
  {
    id: '3',
    startDate: '2024-12-10',
    planType: 'Dynasty',
    accountSize: '$150K',
    stage: 'Funded',
    status: 'Active',
    balance: '$158,500',
  },
  {
    id: '4',
    startDate: '2024-11-20',
    planType: 'Standard',
    accountSize: '$25K',
    stage: 'Evaluation',
    status: 'Violated',
    balance: '$0',
  },
];

const getStatusBadge = (status: string) => {
  const styles = {
    Active: 'bg-primary/20 text-primary border-primary/30',
    Violated: 'bg-destructive/20 text-destructive border-destructive/30',
    Closed: 'bg-muted text-muted-foreground border-border',
  };
  return styles[status as keyof typeof styles] || styles.Closed;
};

const getStageBadge = (stage: string) => {
  const styles = {
    Funded: 'bg-teal/20 text-teal border-teal/30',
    Evaluation: 'bg-soft-blue/20 text-soft-blue border-soft-blue/30',
  };
  return styles[stage as keyof typeof styles] || '';
};

type FilterStatus = 'All' | 'Active' | 'Violated' | 'Closed';
type FilterPlan = 'All' | 'Standard' | 'Advanced' | 'Dynasty';

const DashboardAccounts = () => {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');
  const [planFilter, setPlanFilter] = useState<FilterPlan>('All');

  const filteredAccounts = mockAccounts.filter((account) => {
    if (statusFilter !== 'All' && account.status !== statusFilter) return false;
    if (planFilter !== 'All' && account.planType !== planFilter) return false;
    return true;
  });

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
        <p className="text-muted-foreground mt-1">Manage your trading accounts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6">
        {/* Plan Type Filter */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Plan Type</span>
          <div className="flex items-center gap-2">
            {(['All', 'Standard', 'Advanced', 'Dynasty'] as FilterPlan[]).map((plan) => (
              <Button
                key={plan}
                variant="ghost"
                size="sm"
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  planFilter === plan
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground border border-border/30'
                }`}
                onClick={() => setPlanFilter(plan)}
              >
                {plan}
              </Button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Status</span>
          <div className="flex items-center gap-2">
            {(['All', 'Active', 'Violated', 'Closed'] as FilterStatus[]).map((status) => (
              <Button
                key={status}
                variant="ghost"
                size="sm"
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  statusFilter === status
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground border border-border/30'
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium py-5">Start Date</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Plan Type</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Account Size</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Stage</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Balance</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account, index) => (
              <TableRow 
                key={account.id} 
                className={`border-border/30 hover:bg-muted/20 transition-colors ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'
                } ${account.status === 'Active' ? 'border-l-2 border-l-primary' : ''}`}
              >
                <TableCell className="font-medium text-foreground py-5">{account.startDate}</TableCell>
                <TableCell className="text-foreground py-5">{account.planType}</TableCell>
                <TableCell className="text-foreground py-5">{account.accountSize}</TableCell>
                <TableCell className="py-5">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStageBadge(account.stage)}`}>
                    {account.stage}
                  </span>
                </TableCell>
                <TableCell className="py-5">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBadge(account.status)}`}>
                    {account.status}
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-foreground py-5">{account.balance}</TableCell>
                <TableCell className="text-right py-5">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
                  >
                    <Eye size={16} className="mr-2" />
                    View
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardAccounts;
