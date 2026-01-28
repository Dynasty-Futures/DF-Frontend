import { AlertCircle, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MockAlert, Severity } from '@/data/mockAdminData';

interface AdminAlertFeedProps {
  alerts: MockAlert[];
  onAlertClick?: (alert: MockAlert) => void;
  maxHeight?: string;
  className?: string;
}

const severityConfig: Record<Severity, { icon: typeof Info; color: string; bg: string }> = {
  Info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  Warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  Critical: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
};

export function AdminAlertFeed({
  alerts,
  onAlertClick,
  maxHeight = '400px',
  className,
}: AdminAlertFeedProps) {
  return (
    <ScrollArea className={cn('pr-4', className)} style={{ maxHeight }}>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Info className="h-8 w-8 mb-2" />
            <p className="text-sm">No alerts at this time</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  'flex items-start gap-3 rounded-lg border border-border/30 bg-muted/10 p-3',
                  'transition-colors hover:bg-muted/20',
                  onAlertClick && 'cursor-pointer'
                )}
                onClick={() => onAlertClick?.(alert)}
              >
                <div className={cn('rounded-lg p-2', config.bg)}>
                  <Icon className={cn('h-4 w-4', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('text-xs font-medium', config.color)}>
                      {alert.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {alert.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {alert.targetType}: {alert.targetId}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-primary hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAlertClick?.(alert);
                      }}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
}
