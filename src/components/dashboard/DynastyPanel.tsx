import { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Calendar, Zap, TrendingDown, DollarSign, Clock, CheckCircle2, Flame, SnowflakeIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getAccountById, mockAccounts } from '@/data/mockDashboardData';
import { format, subDays, isSameDay, startOfMonth, getDay, getDaysInMonth, addMonths, subMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DynastyPanelProps {
  accountId: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

interface DetailRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const DetailRow = ({ label, value, icon }: DetailRowProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="flex items-center justify-between p-2 rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300 gap-1 min-w-0 cursor-help overflow-hidden">
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
          {icon && (
            <div className="p-1 rounded-md bg-muted/50 animate-icon-3d-float flex-shrink-0">
              {icon}
            </div>
          )}
          <span className="text-[10px] text-muted-foreground truncate leading-tight">{label}</span>
        </div>
        <span className="text-[10px] font-semibold text-foreground whitespace-nowrap flex-shrink-0 ml-1">{value}</span>
      </div>
    </TooltipTrigger>
    <TooltipContent side="top" className="bg-popover border border-border z-50">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-primary font-semibold">{value}</p>
    </TooltipContent>
  </Tooltip>
);

const DynastyPanel = ({ accountId, selectedDate, onDateChange }: DynastyPanelProps) => {
  const [payoutType, setPayoutType] = useState<'daily' | '5day'>('daily');
  const [viewedMonth, setViewedMonth] = useState(new Date());
  const navigate = useNavigate();
  const account = getAccountById(accountId) || mockAccounts[2];

  const formatCurrency = (value: number, showSign = false) => {
    const formatted = `$${Math.abs(value).toLocaleString()}`;
    if (showSign && value !== 0) {
      return value > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const goToPreviousMonth = () => setViewedMonth(prev => subMonths(prev, 1));
  const goToNextMonth = () => setViewedMonth(prev => addMonths(prev, 1));

  // Generate calendar data for viewed month
  const calendarDays = useMemo(() => {
    const today = new Date();
    const days: Array<{
      date: Date;
      dayNumber: number;
      pnl: number;
      noTrades: boolean;
      isSelected: boolean;
      isToday: boolean;
      isCurrentMonth: boolean;
    }> = [];
    
    const monthStart = startOfMonth(viewedMonth);
    const daysInMonth = getDaysInMonth(viewedMonth);
    const startDayOfWeek = getDay(monthStart);
    
    for (let i = 0; i < startDayOfWeek; i++) {
      const prevDate = subDays(monthStart, startDayOfWeek - i);
      days.push({
        date: prevDate,
        dayNumber: prevDate.getDate(),
        pnl: 0,
        noTrades: true,
        isSelected: false,
        isToday: false,
        isCurrentMonth: false,
      });
    }
    
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(monthStart);
      date.setDate(i + 1);
      
      const daysFromToday = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      const pnlIndex = account.dailyPnL.length - 1 - daysFromToday;
      const pnl = pnlIndex >= 0 && pnlIndex < account.dailyPnL.length ? account.dailyPnL[pnlIndex] : 0;
      
      days.push({
        date,
        dayNumber: date.getDate(),
        pnl,
        noTrades: pnl === 0,
        isSelected: isSameDay(date, selectedDate),
        isToday: isSameDay(date, today),
        isCurrentMonth: true,
      });
    }
    
    return days;
  }, [account.dailyPnL, selectedDate, viewedMonth]);

  // Mock payout status - in production this would come from API
  const payoutStatus = account.closedPnL > 0 ? 'Eligible' : 'Not Eligible';
  const cycleDay = 3; // Mock: current day in payout cycle
  const cycleDays = payoutType === 'daily' ? 1 : 5;

  return (
    <TooltipProvider delayDuration={100}>
    <div className="p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 h-full">
      {/* Header with Title, Status Badge, and Cycle Progress */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Dynasty Payout Roadmap</h3>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={cn(
                "text-[10px] px-2 py-0.5 flex items-center gap-1",
                payoutStatus === 'Eligible' 
                  ? 'border-primary/30 text-primary bg-primary/5' 
                  : 'border-destructive/30 text-destructive bg-destructive/5'
              )}
            >
              <CheckCircle2 size={10} />
              {payoutStatus}
            </Badge>
            {payoutType === '5day' && (
              <span className="text-[10px] text-muted-foreground bg-muted/20 px-2 py-0.5 rounded-md">
                Cycle: {cycleDay}/{cycleDays} days
              </span>
            )}
          </div>
        </div>
        
        {/* Payout Type Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/20 border border-border/30 self-start">
          <button
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300",
              payoutType === 'daily' 
                ? 'bg-primary/20 text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => setPayoutType('daily')}
          >
            Daily Payout
          </button>
          <button
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300",
              payoutType === '5day' 
                ? 'bg-primary/20 text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => setPayoutType('5day')}
          >
            5-Day Payout
          </button>
        </div>
      </div>

      {/* Payout Details Section */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Payout Details</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          {payoutType === 'daily' ? (
            <>
              <DetailRow 
                label="Payout Type" 
                value="Daily Payout" 
                icon={<DollarSign size={14} className="text-primary" />} 
              />
              <DetailRow 
                label="Eligibility" 
                value="Daily criteria" 
                icon={<Zap size={14} className="text-primary" />} 
              />
              <DetailRow 
                label="Payout Window" 
                value="Next business day" 
                icon={<Clock size={14} className="text-teal" />} 
              />
              <DetailRow 
                label="Max Daily" 
                value="$1,400" 
                icon={<ArrowUpRight size={14} className="text-primary" />} 
              />
            </>
          ) : (
            <>
              <DetailRow 
                label="Payout Type" 
                value="5-Day Cycle" 
                icon={<DollarSign size={14} className="text-primary" />} 
              />
              <DetailRow 
                label="Eligibility" 
                value="Cycle requirements" 
                icon={<Zap size={14} className="text-primary" />} 
              />
              <DetailRow 
                label="Payout Window" 
                value="Every 5 trading days" 
                icon={<Calendar size={14} className="text-teal" />} 
              />
              <DetailRow 
                label="Weekly Max" 
                value="$7,000" 
                icon={<ArrowUpRight size={14} className="text-primary" />} 
              />
            </>
          )}
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* Performance Group */}
      <div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Performance</span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2">
          <DetailRow 
            label="Best Day" 
            value={formatCurrency(account.metrics.bestDay, true)} 
            icon={<ArrowUpRight size={14} className="text-primary" />} 
          />
          <DetailRow 
            label="Worst Day" 
            value={formatCurrency(account.metrics.worstDay)} 
            icon={<ArrowDownRight size={14} className="text-destructive" />} 
          />
          <DetailRow 
            label="Trading Days" 
            value={`${account.metrics.tradingDays} / ${account.metrics.totalDays}`} 
            icon={<Calendar size={14} className="text-teal" />} 
          />
          <DetailRow 
            label="Profit Streak" 
            value={`${account.metrics.profitStreak} Days`} 
            icon={<Zap size={14} className="text-primary" />} 
          />
          <DetailRow 
            label="Max Drawdown Allowed" 
            value={formatCurrency(account.maxDrawdown)} 
            icon={<TrendingDown size={14} className="text-destructive" />} 
          />
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* Daily Performance Calendar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Daily Performance Calendar
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-1 rounded hover:bg-muted/30 transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-[10px] text-muted-foreground min-w-[90px] text-center">
              {format(viewedMonth, 'MMMM yyyy')}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-1 rounded hover:bg-muted/30 transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-card/30 border border-border/20 p-3">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-[10px] text-muted-foreground text-center py-1 font-medium">
                {d}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                onClick={() => {
                  if (day.isCurrentMonth) {
                    onDateChange(day.date);
                    navigate(`/dashboard/journal/${format(day.date, 'yyyy-MM-dd')}`);
                  }
                }}
                disabled={!day.isCurrentMonth}
                className={cn(
                  "aspect-square rounded-md text-[10px] flex flex-col items-center justify-center transition-all duration-200",
                  day.isCurrentMonth ? "hover:bg-muted/30 cursor-pointer" : "opacity-30 cursor-default",
                  day.isSelected && "ring-1 ring-primary bg-primary/20 shadow-[0_0_8px_hsl(var(--primary)/0.4)]",
                  day.isToday && !day.isSelected && "ring-1 ring-border"
                )}
              >
                <span className={cn(
                  "font-medium",
                  day.isSelected && "text-primary",
                  !day.isCurrentMonth && "text-muted-foreground/50"
                )}>
                  {day.dayNumber}
                </span>
                {day.isCurrentMonth && !day.noTrades && (
                  <div className={cn(
                    "w-1 h-1 rounded-full mt-0.5",
                    day.pnl > 0 ? "bg-primary" : "bg-destructive"
                  )} />
                )}
              </button>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-border/20">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[9px] text-muted-foreground">Profit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
              <span className="text-[9px] text-muted-foreground">Loss</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
              <span className="text-[9px] text-muted-foreground">No trades</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* Streak Tracker */}
      <div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Streak Tracker</span>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Flame size={14} className="text-primary" />
              <span className="text-[10px] text-muted-foreground">Max Wins</span>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              {Array.from({ length: Math.min(account.streaks.maxWinStreak, 8) }).map((_, i) => (
                <div key={i} className="w-1 rounded-full bg-primary" style={{ height: `${10 + i * 2}px` }} />
              ))}
            </div>
            <span className="text-lg font-bold text-primary mt-1 block">{account.streaks.maxWinStreak}</span>
          </div>

          <div className="p-3 rounded-xl bg-muted/10 border border-border/20 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <SnowflakeIcon size={14} className="text-destructive" />
              <span className="text-[10px] text-muted-foreground">Max Losses</span>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              {Array.from({ length: Math.min(account.streaks.maxLossStreak, 8) }).map((_, i) => (
                <div key={i} className="w-1 rounded-full bg-destructive" style={{ height: `${10 + i * 2}px` }} />
              ))}
            </div>
            <span className="text-lg font-bold text-destructive mt-1 block">{account.streaks.maxLossStreak}</span>
          </div>

          <div className={cn(
            "p-3 rounded-xl border text-center",
            account.streaks.currentStreak > 0 ? 'bg-primary/10 border-primary/30' : 
            account.streaks.currentStreak < 0 ? 'bg-destructive/10 border-destructive/30' : 
            'bg-muted/10 border-border/20'
          )}>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Zap size={14} className={account.streaks.currentStreak > 0 ? 'text-primary' : account.streaks.currentStreak < 0 ? 'text-destructive' : 'text-muted-foreground'} />
              <span className="text-[10px] text-muted-foreground">Current</span>
            </div>
            <span className={cn(
              "text-2xl font-bold",
              account.streaks.currentStreak > 0 ? 'text-primary' : 
              account.streaks.currentStreak < 0 ? 'text-destructive' : 
              'text-muted-foreground'
            )}>
              {Math.abs(account.streaks.currentStreak)}
            </span>
            <span className={cn(
              "text-[10px] block",
              account.streaks.currentStreak > 0 ? 'text-primary' : 
              account.streaks.currentStreak < 0 ? 'text-destructive' : 
              'text-muted-foreground'
            )}>
              {account.streaks.currentStreak > 0 ? 'wins' : account.streaks.currentStreak < 0 ? 'losses' : 'neutral'}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* Day of Week Performance Heatmap */}
      <div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Day of Week</span>
        <div className="mt-2 p-3 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex gap-2">
            {Object.entries(account.dayOfWeekPerformance).map(([day, value]) => {
              const maxValue = Math.max(...Object.values(account.dayOfWeekPerformance).map(v => Math.abs(v)));
              const intensity = maxValue > 0 ? Math.abs(value) / maxValue : 0;
              
              const getHeatmapColor = () => {
                if (value === 0) return 'bg-muted/30';
                if (value > 0) {
                  if (intensity > 0.7) return 'bg-primary';
                  if (intensity > 0.4) return 'bg-primary/70';
                  return 'bg-primary/40';
                } else {
                  if (intensity > 0.7) return 'bg-destructive';
                  if (intensity > 0.4) return 'bg-destructive/70';
                  return 'bg-destructive/40';
                }
              };
              
              return (
                <div key={day} className="flex-1 text-center group cursor-pointer">
                  <div 
                    className={`h-10 rounded-lg ${getHeatmapColor()} transition-all duration-300 hover:scale-105 flex items-center justify-center`}
                    title={`${day}: ${value >= 0 ? '+' : ''}$${Math.abs(value).toLocaleString()}`}
                  >
                    <span className="text-[10px] font-medium text-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      {value >= 0 ? '+' : '-'}${Math.abs(value).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">{day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-border/20">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-destructive" />
              <span className="text-[9px] text-muted-foreground">Loss</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-muted/30" />
              <span className="text-[9px] text-muted-foreground">Break-even</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-primary" />
              <span className="text-[9px] text-muted-foreground">Profit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
};

export default DynastyPanel;
