import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

export function AdminSystemHealth() {
  const integrations = [
    { name: 'PTT API', status: 'Online', lastCheck: '2 min ago' },
    { name: 'Webhook Processing', status: 'OK', lastCheck: '1 min ago' },
    { name: 'Data Sync', status: 'Online', lastCheck: '5 min ago' },
    { name: 'Stripe (Payments)', status: 'Degraded', lastCheck: '3 min ago' },
  ];

  const errorLogs = [
    { timestamp: '2024-01-15 14:30', service: 'Webhooks', error: 'Timeout', severity: 'Warning', message: 'Retry successful after 2 attempts' },
    { timestamp: '2024-01-15 12:15', service: 'PTT API', error: 'Rate Limit', severity: 'Info', message: 'Backed off for 60s' },
  ];

  return (
    <div className="space-y-6">
      {/* Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((int) => (
          <Card key={int.name} className="border-border/30 bg-gradient-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{int.name}</CardTitle>
                {int.status === 'Online' || int.status === 'OK' ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : int.status === 'Degraded' ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <AdminStatusBadge status={int.status} />
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Last check: {int.lastCheck}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Error Logs */}
      <Card className="border-border/30 bg-gradient-card">
        <CardHeader><CardTitle className="text-base">Recent Error Logs</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/30 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/20">
                <tr>
                  <th className="text-left p-3">Timestamp</th>
                  <th className="text-left p-3">Service</th>
                  <th className="text-left p-3">Error</th>
                  <th className="text-left p-3">Severity</th>
                  <th className="text-left p-3">Message</th>
                </tr>
              </thead>
              <tbody>
                {errorLogs.map((log, i) => (
                  <tr key={i} className="border-t border-border/30">
                    <td className="p-3 text-muted-foreground">{log.timestamp}</td>
                    <td className="p-3">{log.service}</td>
                    <td className="p-3">{log.error}</td>
                    <td className="p-3"><AdminStatusBadge status={log.severity} /></td>
                    <td className="p-3 text-muted-foreground">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Background Jobs */}
      <Card className="border-border/30 bg-gradient-card">
        <CardHeader><CardTitle className="text-base">Background Job Queue</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <p className="text-3xl font-bold text-primary">1,247</p>
              <p className="text-sm text-muted-foreground">Processed (24h)</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <p className="text-3xl font-bold text-destructive">3</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <p className="text-3xl font-bold text-yellow-400">2</p>
              <p className="text-sm text-muted-foreground">Retrying</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
