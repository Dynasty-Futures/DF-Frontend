import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { getAccountById, mockAccounts } from '@/data/mockDashboardData';
import { TrendingUp, TrendingDown, Target, Award, ShieldAlert, Calendar } from 'lucide-react';
import { format, differenceInDays, isToday as isDateToday } from 'date-fns';

interface DailyAnalyticsProps {
  accountId: string;
  selectedDate?: Date;
}

const DailyAnalytics = ({ accountId, selectedDate = new Date() }: DailyAnalyticsProps) => {
  const account = getAccountById(accountId) || mockAccounts[0];
  
  // Calculate the P&L for the selected date
  const { dayPnL, hasTrades } = useMemo(() => {
    const today = new Date();
    const daysAgo = differenceInDays(today, selectedDate);
    const pnlIndex = account.dailyPnL.length - 1 - daysAgo;
    
    if (pnlIndex >= 0 && pnlIndex < account.dailyPnL.length) {
      const pnl = account.dailyPnL[pnlIndex];
      return { dayPnL: pnl, hasTrades: pnl !== 0 };
    }
    return { dayPnL: 0, hasTrades: false };
  }, [account.dailyPnL, selectedDate]);
  
  // Generate consistent mock data based on the selected date (seed with date)
  const mockData = useMemo(() => {
    const seed = selectedDate.getTime();
    const seededRandom = (offset: number) => {
      const x = Math.sin(seed + offset) * 10000;
      return x - Math.floor(x);
    };
    
    return {
      tradesCount: Math.floor(seededRandom(1) * 8) + 2,
      winRate: Math.floor(seededRandom(2) * 30) + 55,
      bestTrade: Math.abs(dayPnL * 0.6) + Math.floor(seededRandom(3) * 150) + 100,
      worstTrade: Math.abs(dayPnL * 0.3) + Math.floor(seededRandom(4) * 80) + 50,
      bestInstrument: ['ES', 'NQ', 'CL', 'GC'][Math.floor(seededRandom(5) * 4)],
      worstInstrument: ['ES', 'NQ', 'CL', 'GC'][Math.floor(seededRandom(6) * 4)],
    };
  }, [selectedDate, dayPnL]);
  
  const dailyDrawdownUsed = Math.abs(Math.min(0, dayPnL)) / account.dailyLossLimit * 100;

  const formatCurrency = (value: number, showSign = false) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
    if (showSign) {
      return value >= 0 ? `+${formatted}` : `-${formatted}`;
    }
    return value < 0 ? `-${formatted}` : formatted;
  };

  if (!hasTrades) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-muted/5 border border-border/20">
        <Calendar size={28} className="text-muted-foreground mb-3" />
        <span className="text-sm text-muted-foreground">
          {isDateToday(selectedDate) ? 'No trades today' : `No trades on ${format(selectedDate, 'MMMM d, yyyy')}`}
        </span>
        <span className="text-xs text-muted-foreground/60 mt-1">
          {isDateToday(selectedDate) ? 'Start trading to see your daily analytics' : 'Select a different day to view analytics'}
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Day's P&L */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          {dayPnL >= 0 ? (
            <TrendingUp size={14} className="text-primary" />
          ) : (
            <TrendingDown size={14} className="text-destructive" />
          )}
          <span className="text-xs text-muted-foreground">{isDateToday(selectedDate) ? "Today's P&L" : "Day's P&L"}</span>
        </div>
        <span className={cn(
          "text-lg font-bold",
          dayPnL >= 0 ? "text-primary" : "text-destructive"
        )}>
          {formatCurrency(dayPnL, true)}
        </span>
      </div>

      {/* Trades Taken */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          <Target size={14} className="text-primary" />
          <span className="text-xs text-muted-foreground">{isDateToday(selectedDate) ? "Trades Today" : "Trades"}</span>
        </div>
        <span className="text-lg font-bold text-foreground">{mockData.tradesCount}</span>
      </div>

      {/* Win Rate */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          <Award size={14} className={cn(mockData.winRate >= 60 ? "text-primary" : "text-amber-500")} />
          <span className="text-xs text-muted-foreground">Win Rate</span>
        </div>
        <span className={cn(
          "text-lg font-bold",
          mockData.winRate >= 60 ? "text-primary" : "text-amber-500"
        )}>
          {mockData.winRate}%
        </span>
      </div>

      {/* Daily Drawdown Used */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldAlert size={14} className={cn(
            dailyDrawdownUsed > 80 ? "text-destructive" : 
            dailyDrawdownUsed > 50 ? "text-amber-500" : "text-primary"
          )} />
          <span className="text-xs text-muted-foreground">DD Used</span>
        </div>
        <span className={cn(
          "text-lg font-bold",
          dailyDrawdownUsed > 80 ? "text-destructive" : 
          dailyDrawdownUsed > 50 ? "text-amber-500" : "text-foreground"
        )}>
          {dailyDrawdownUsed.toFixed(1)}%
        </span>
      </div>

      {/* Best Trade */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          <TrendingUp size={14} className="text-primary" />
          <span className="text-xs text-muted-foreground">Best Trade</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-primary">+{formatCurrency(mockData.bestTrade)}</span>
          <span className="text-[10px] text-muted-foreground">({mockData.bestInstrument})</span>
        </div>
      </div>

      {/* Worst Trade */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          <TrendingDown size={14} className="text-destructive" />
          <span className="text-xs text-muted-foreground">Worst Trade</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-destructive">-{formatCurrency(mockData.worstTrade)}</span>
          <span className="text-[10px] text-muted-foreground">({mockData.worstInstrument})</span>
        </div>
      </div>
    </div>
  );
};

export default DailyAnalytics;
