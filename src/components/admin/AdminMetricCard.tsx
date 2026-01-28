import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AdminMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'warning' | 'danger' | 'success';
  className?: string;
}

const variantStyles = {
  default: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accent: 'bg-primary',
  },
  warning: {
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400',
    accent: 'bg-yellow-500',
  },
  danger: {
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
    accent: 'bg-destructive',
  },
  success: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accent: 'bg-primary',
  },
};

export function AdminMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: AdminMetricCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-card p-6',
        'transition-all duration-300 hover:border-border/50',
        className
      )}
    >
      {/* Left accent bar */}
      <div className={cn('absolute left-0 top-0 h-full w-1 rounded-l-2xl', styles.accent)} />

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold font-display text-foreground">{value}</p>
            {trend && (
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-primary' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className={cn('rounded-xl p-3', styles.iconBg)}>
          <Icon className={cn('h-6 w-6', styles.iconColor)} />
        </div>
      </div>
    </div>
  );
}
