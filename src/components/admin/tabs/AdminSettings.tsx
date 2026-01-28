import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert } from 'lucide-react';

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <Badge className="bg-destructive/20 text-destructive border-destructive/30">
        <ShieldAlert className="h-3 w-3 mr-1" />
        Requires Admin Role
      </Badge>

      {/* Payout Rules */}
      <Card className="border-border/30 bg-gradient-card">
        <CardHeader><CardTitle className="text-base">Payout Rules Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Max Daily Payout</Label><Input placeholder="$50,000" className="mt-1 bg-muted/20 border-border/30" /></div>
            <div><Label>Payout Window (days)</Label><Input placeholder="14" className="mt-1 bg-muted/20 border-border/30" /></div>
            <div><Label>Min Trading Days</Label><Input placeholder="5" className="mt-1 bg-muted/20 border-border/30" /></div>
            <div><Label>Max Single Payout</Label><Input placeholder="$25,000" className="mt-1 bg-muted/20 border-border/30" /></div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Configuration */}
      <Card className="border-border/30 bg-gradient-card">
        <CardHeader><CardTitle className="text-base">Plan Configuration</CardTitle></CardHeader>
        <CardContent><Skeleton className="h-32 w-full" /><p className="text-sm text-muted-foreground mt-2">Profit targets, drawdowns, and rules configured via backend.</p></CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/30 bg-gradient-card">
        <CardHeader><CardTitle className="text-base">Notification Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            'High Drawdown Alerts (>80%)',
            'Payout Request Notifications',
            'KYC Failure Alerts',
            'Payment Failure Alerts',
            'Correlation Flag Alerts',
          ].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <Label>{item}</Label>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Team & Roles */}
      <Card className="border-border/30 bg-gradient-card">
        <CardHeader><CardTitle className="text-base">Team & Roles</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 rounded bg-muted/20"><span>Admin</span><span className="text-muted-foreground">Full access</span></div>
            <div className="flex justify-between p-2 rounded bg-muted/20"><span>Operations</span><span className="text-muted-foreground">Manage accounts, payouts</span></div>
            <div className="flex justify-between p-2 rounded bg-muted/20"><span>Support</span><span className="text-muted-foreground">View only, add notes</span></div>
            <div className="flex justify-between p-2 rounded bg-muted/20"><span>Read-only</span><span className="text-muted-foreground">View only</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
