import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const MetricCard = ({ title, value, icon: Icon, trend, trendValue, className }: MetricCardProps) => {
  return (
    <div className={cn(
      "p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/40 relative overflow-hidden group",
      className
    )}>
      {/* Dynasty-unique left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-teal to-primary/50 rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
      
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="relative pl-2">
        <div className="flex items-start justify-between mb-2">
          {/* Icon moved to top-left */}
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-all duration-300 [perspective:400px] group-hover:[transform:rotateY(12deg)_rotateX(-6deg)_scale(1.1)] group-hover:shadow-[0_6px_16px_-3px_hsl(var(--primary)/0.4)]">
                <Icon size={16} className="text-primary" />
              </div>
            )}
            <span className="text-xs text-muted-foreground font-medium">{title}</span>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-foreground">{value}</span>
          {trend && trendValue && (
            <span className={cn(
              "text-xs font-semibold mb-0.5 flex items-center gap-0.5",
              trend === 'up' ? "text-primary" : trend === 'down' ? "text-destructive" : "text-muted-foreground"
            )}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
