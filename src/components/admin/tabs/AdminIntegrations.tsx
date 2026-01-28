import { useState } from 'react';
import { Plug, CheckCircle, AlertCircle, Clock, RefreshCw, Eye, Key, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { mockIntegrations, mockWebhooks, type MockIntegration, type MockWebhook } from '@/data/mockAdminData';

export function AdminIntegrations() {
  const [expandedWebhook, setExpandedWebhook] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected': return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'Disconnected': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'Degraded': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const webhookColumns: Column<MockWebhook>[] = [
    { key: 'timestamp', header: 'Timestamp', sortable: true },
    { key: 'provider', header: 'Provider', sortable: true, render: (item) => (
      <Badge variant="outline" className="bg-muted/20">{item.provider}</Badge>
    )},
    { key: 'eventType', header: 'Event Type', sortable: true },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'target', header: 'Target', render: (item) => `${item.targetType}: ${item.targetId}` },
    { key: 'actions', header: 'Actions', render: (item) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setExpandedWebhook(expandedWebhook === item.id ? null : item.id)}>
          <Eye className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2">
          <Play className="h-3 w-3" />
        </Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="rounded-2xl border border-border/30 bg-gradient-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-primary" />
                <span className="font-semibold">{integration.name}</span>
              </div>
              {getStatusIcon(integration.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <AdminStatusBadge status={integration.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Sync</span>
                <span>{integration.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Webhook Health</span>
                <span className={integration.webhookHealth === 'Healthy' ? 'text-primary' : 'text-yellow-400'}>
                  {integration.webhookHealth}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Key</span>
                <span className="font-mono text-xs">••••••••{integration.apiKeyLast4}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                <Eye className="h-3 w-3 mr-1" /> Webhooks
              </Button>
              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                <RefreshCw className="h-3 w-3 mr-1" /> Test
              </Button>
              <Button size="sm" variant="outline" className="h-8 px-2">
                <Key className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Webhook Viewer */}
      <div className="rounded-2xl border border-border/30 bg-gradient-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Webhook Activity
        </h3>
        <AdminDataTable
          data={mockWebhooks}
          columns={webhookColumns}
          keyField="id"
          searchable
          searchPlaceholder="Search webhooks..."
        />
        
        {/* Expanded Webhook Payload */}
        {expandedWebhook && (
          <div className="mt-4 p-4 rounded-lg bg-muted/10 border border-border/30">
            <p className="text-xs text-muted-foreground mb-2">Payload</p>
            <pre className="text-xs font-mono bg-background/50 p-3 rounded overflow-x-auto">
              {JSON.stringify(mockWebhooks.find(w => w.id === expandedWebhook)?.payload || {}, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
