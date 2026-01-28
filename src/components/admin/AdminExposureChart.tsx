import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface ExposureData {
  instrument: string;
  long: number;
  short: number;
}

interface AdminExposureChartProps {
  data: ExposureData[];
  className?: string;
}

export function AdminExposureChart({ data, className }: AdminExposureChartProps) {
  const maxValue = Math.max(...data.flatMap((d) => [d.long, d.short]));

  // Calculate concentration for warning
  const totalExposure = data.reduce((sum, d) => sum + d.long + d.short, 0);
  const topConcentration = data.length > 0 
    ? ((data[0].long + data[0].short) / totalExposure) * 100 
    : 0;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Firm Exposure Snapshot</h4>
        {topConcentration > 40 && (
          <div className="flex items-center gap-1 text-yellow-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">High concentration in {data[0]?.instrument}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.instrument} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{item.instrument}</span>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="text-primary">Long: {item.long}</span>
                <span className="text-destructive">Short: {item.short}</span>
              </div>
            </div>
            <div className="flex h-4 gap-0.5 rounded overflow-hidden">
              {/* Long bar */}
              <div
                className="bg-primary/60 transition-all duration-300"
                style={{ width: `${(item.long / maxValue) * 50}%` }}
              />
              {/* Short bar */}
              <div
                className="bg-destructive/60 transition-all duration-300"
                style={{ width: `${(item.short / maxValue) * 50}%` }}
              />
              {/* Empty space */}
              <div className="flex-1 bg-muted/20" />
            </div>
          </div>
        ))}
      </div>

      {/* Net exposure summary */}
      <div className="flex items-center justify-between pt-2 border-t border-border/30">
        <span className="text-sm text-muted-foreground">Net Exposure</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-primary">
            Total Long: {data.reduce((sum, d) => sum + d.long, 0)}
          </span>
          <span className="text-sm text-destructive">
            Total Short: {data.reduce((sum, d) => sum + d.short, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
