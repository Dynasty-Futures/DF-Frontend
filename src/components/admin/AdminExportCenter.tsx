import { useState, useMemo } from 'react';
import { Download, FileSpreadsheet, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminStatusBadge } from './AdminStatusBadge';

interface Export {
  id: string;
  type: 'payouts' | 'users' | 'accounts' | 'audit' | 'transactions';
  date: string;
  createdBy: string;
  status: 'Completed' | 'Processing' | 'Failed';
  fileName: string;
}

const mockExports: Export[] = [
  { id: 'EXP-001', type: 'payouts', date: '2024-01-15 14:30', createdBy: 'admin@dynasty.com', status: 'Completed', fileName: 'payouts_2024-01-15.csv' },
  { id: 'EXP-002', type: 'accounts', date: '2024-01-14 10:00', createdBy: 'ops@dynasty.com', status: 'Completed', fileName: 'accounts_2024-01-14.csv' },
  { id: 'EXP-003', type: 'audit', date: '2024-01-13 16:45', createdBy: 'admin@dynasty.com', status: 'Completed', fileName: 'audit_2024-01-13.csv' },
  { id: 'EXP-004', type: 'users', date: '2024-01-12 09:15', createdBy: 'ops@dynasty.com', status: 'Failed', fileName: 'users_2024-01-12.csv' },
  { id: 'EXP-005', type: 'transactions', date: '2024-01-11 11:00', createdBy: 'admin@dynasty.com', status: 'Completed', fileName: 'transactions_2024-01-11.csv' },
  { id: 'EXP-006', type: 'payouts', date: '2024-01-10 15:30', createdBy: 'ops@dynasty.com', status: 'Processing', fileName: 'payouts_2024-01-10.csv' },
];

export function AdminExportCenter() {
  const [open, setOpen] = useState(false);
  const [exportType, setExportType] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleCreateExport = () => {
    if (exportType) {
      // Placeholder - would trigger actual export
      console.log('Creating export:', exportType);
    }
  };

  // Filter exports based on type and status filters
  const filteredExports = useMemo(() => {
    return mockExports.filter(exp => {
      const matchesType = typeFilter === 'all' || exp.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || exp.status === statusFilter;
      return matchesType && matchesStatus;
    });
  }, [typeFilter, statusFilter]);

  const getStatusIcon = (status: Export['status']) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'Processing': return <Clock className="h-4 w-4 text-yellow-400 animate-spin" />;
      case 'Failed': return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-muted/20 border-border/30">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Export Center
          </DialogTitle>
        </DialogHeader>

        {/* Create New Export */}
        <div className="flex items-center gap-3 p-4 rounded-lg border border-border/30 bg-muted/10">
          <Select value={exportType} onValueChange={setExportType}>
            <SelectTrigger className="w-[180px] bg-muted/20 border-border/30">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="payouts">Payouts</SelectItem>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="accounts">Accounts</SelectItem>
              <SelectItem value="audit">Audit Log</SelectItem>
              <SelectItem value="transactions">Transactions</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleCreateExport} disabled={!exportType}>
            <Download className="h-4 w-4 mr-2" />
            Create Export
          </Button>
        </div>

        {/* Export History Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">Recent Exports</h4>
            <div className="flex items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px] h-8 text-xs bg-muted/20 border-border/30">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="payouts">Payouts</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="audit">Audit Log</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] h-8 text-xs bg-muted/20 border-border/30">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Export List */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {filteredExports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No exports match the selected filters
              </div>
            ) : (
              filteredExports.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-muted/10"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(exp.status)}
                    <div>
                      <p className="text-sm font-medium">{exp.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {exp.date} • {exp.createdBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AdminStatusBadge status={exp.status} />
                    {exp.status === 'Completed' && (
                      <Button size="sm" variant="ghost" className="h-7 px-2">
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
