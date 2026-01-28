import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminSeverityBadge } from '../AdminStatusBadge';
import { mockAuditLogs, type MockAuditLog } from '@/data/mockAdminData';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export function AdminAuditLog() {
  const columns: Column<MockAuditLog>[] = [
    { key: 'timestamp', header: 'Timestamp', sortable: true },
    { key: 'actor', header: 'Actor', sortable: true },
    { key: 'actionType', header: 'Action Type', sortable: true },
    { key: 'targetType', header: 'Target Type', sortable: true },
    { key: 'targetId', header: 'Target ID' },
    { key: 'summary', header: 'Summary' },
    { key: 'severity', header: 'Severity', render: (item) => <AdminSeverityBadge severity={item.severity} /> },
    { key: 'source', header: 'Source' },
    { key: 'actions', header: '', render: () => (
      <Button size="sm" variant="ghost" className="h-7 px-2"><Eye className="h-3 w-3" /></Button>
    )},
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-yellow-500/30 bg-yellow-500/10">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-400">
          Audit logs are append-only for compliance. Records cannot be modified or deleted.
        </AlertDescription>
      </Alert>

      <AdminDataTable data={mockAuditLogs} columns={columns} keyField="id" searchable searchPlaceholder="Search audit logs..." />
    </div>
  );
}
