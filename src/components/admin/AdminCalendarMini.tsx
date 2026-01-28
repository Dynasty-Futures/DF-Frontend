import { cn } from '@/lib/utils';

interface DayData {
  date: number;
  pnl: number;
  traded: boolean;
}

interface AdminCalendarMiniProps {
  days: DayData[];
  className?: string;
}

// Generate mock calendar data for current month
export function generateMockCalendarData(): DayData[] {
  const days: DayData[] = [];
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isPast = i <= today.getDate();

    days.push({
      date: i,
      pnl: isPast && !isWeekend ? Math.random() * 2000 - 500 : 0,
      traded: isPast && !isWeekend && Math.random() > 0.3,
    });
  }

  return days;
}

export function AdminCalendarMini({ days, className }: AdminCalendarMiniProps) {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  // Add empty cells for days before the first day of the month
  const paddedDays = [...Array(firstDayOfMonth).fill(null), ...days];

  return (
    <div className={cn('space-y-2', className)}>
      <h4 className="text-sm font-medium text-foreground">Trading Calendar</h4>
      
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs text-muted-foreground font-medium py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {paddedDays.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }

          const isToday = day.date === today.getDate();
          const getPnlColor = () => {
            if (!day.traded) return 'bg-muted/30';
            if (day.pnl > 500) return 'bg-primary/60';
            if (day.pnl > 0) return 'bg-primary/30';
            if (day.pnl > -300) return 'bg-destructive/30';
            return 'bg-destructive/60';
          };

          return (
            <div
              key={day.date}
              className={cn(
                'aspect-square rounded-md flex items-center justify-center text-xs',
                'transition-colors cursor-default',
                getPnlColor(),
                isToday && 'ring-2 ring-primary ring-offset-1 ring-offset-background'
              )}
              title={day.traded ? `P&L: $${day.pnl.toFixed(0)}` : 'No trades'}
            >
              {day.date}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary/60" />
          <span className="text-xs text-muted-foreground">Profit</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-destructive/60" />
          <span className="text-xs text-muted-foreground">Loss</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-muted/30" />
          <span className="text-xs text-muted-foreground">No trades</span>
        </div>
      </div>
    </div>
  );
}
