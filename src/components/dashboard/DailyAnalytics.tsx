import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useAccountView } from '@/hooks/useAccountView';
import { useAccountTrades } from '@/hooks/useTrading';
import { TrendingUp, TrendingDown, Target, Award, ShieldAlert, Calendar } from 'lucide-react';
import { format, differenceInDays, isToday as isDateToday, isSameDay } from 'date-fns';

interface DailyAnalyticsProps {
  accountId: string;
  selectedDate?: Date;
}

interface TradeHighlight {
  amount: number;
  instrument: string;
}

const DailyAnalytics = ({ accountId, selectedDate = new Date() }: DailyAnalyticsProps) => {
  const { data: account } = useAccountView(accountId);
  // Shares the trades query with useAccountView (same React Query key — no extra fetch).
  const tradesQ = useAccountTrades(accountId);
  const trades = useMemo(() => tradesQ.data?.data ?? [], [tradesQ.data]);
  const dailyPnL = useMemo(() => account?.dailyPnL ?? [], [account]);

  // Calculate the P&L for the selected date
  const dayPnL = useMemo(() => {
    const today = new Date();
    const daysAgo = differenceInDays(today, selectedDate);
    const pnlIndex = dailyPnL.length - 1 - daysAgo;

    if (pnlIndex >= 0 && pnlIndex < dailyPnL.length) {
      return dailyPnL[pnlIndex];
    }
    return 0;
  }, [dailyPnL, selectedDate]);

  // Derive trade stats for the selected day from real closed trades, attributing
  // each trade to the day it was realized (exitTime).
  const daily = useMemo(() => {
    const dayTrades = trades.filter(
      (t) =>
        t.exitTime !== null &&
        t.realizedPnl !== null &&
        isSameDay(new Date(t.exitTime), selectedDate),
    );

    const pnls = dayTrades.map((t) => Number(t.realizedPnl));
    const tradesCount = dayTrades.length;
    const wins = pnls.filter((p) => p > 0).length;
    const winRate = tradesCount > 0 ? Math.round((wins / tradesCount) * 100) : 0;

    let best: TradeHighlight | null = null;
    let worst: TradeHighlight | null = null;
    for (const t of dayTrades) {
      const amount = Number(t.realizedPnl);
      if (best === null || amount > best.amount) best = { amount, instrument: t.symbol };
      if (worst === null || amount < worst.amount) worst = { amount, instrument: t.symbol };
    }

    return { tradesCount, winRate, best, worst };
  }, [trades, selectedDate]);

  const hasActivity = daily.tradesCount > 0 || dayPnL !== 0;

  const dailyDrawdownUsed = account
    ? (Math.abs(Math.min(0, dayPnL)) / Math.max(account.dailyLossLimit, 1)) * 100
    : 0;

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

  if (!hasActivity) {
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
            <TrendingUp size={14} className="text-green-400" />
          ) : (
            <TrendingDown size={14} className="text-destructive" />
          )}
          <span className="text-xs text-muted-foreground">{isDateToday(selectedDate) ? "Today's P&L" : "Day's P&L"}</span>
        </div>
        <span className={cn(
          "text-lg font-bold",
          dayPnL >= 0 ? "text-green-400" : "text-destructive"
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
        <span className="text-lg font-bold text-foreground">{daily.tradesCount}</span>
      </div>

      {/* Win Rate */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          <Award size={14} className={cn(daily.winRate >= 60 ? "text-primary" : "text-amber-500")} />
          <span className="text-xs text-muted-foreground">Win Rate</span>
        </div>
        <span className={cn(
          "text-lg font-bold",
          daily.winRate >= 60 ? "text-primary" : "text-amber-500"
        )}>
          {daily.tradesCount > 0 ? `${daily.winRate}%` : '—'}
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
          {daily.best ? (
            <>
              <span className={cn(
                "text-lg font-bold",
                daily.best.amount >= 0 ? "text-green-400" : "text-destructive"
              )}>
                {formatCurrency(daily.best.amount, true)}
              </span>
              <span className="text-[10px] text-muted-foreground">({daily.best.instrument})</span>
            </>
          ) : (
            <span className="text-lg font-bold text-muted-foreground">—</span>
          )}
        </div>
      </div>

      {/* Worst Trade */}
      <div className="p-3 rounded-xl bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center gap-2 mb-1.5">
          <TrendingDown size={14} className="text-destructive" />
          <span className="text-xs text-muted-foreground">Worst Trade</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          {daily.worst ? (
            <>
              <span className={cn(
                "text-lg font-bold",
                daily.worst.amount < 0 ? "text-destructive" : "text-green-400"
              )}>
                {formatCurrency(daily.worst.amount, true)}
              </span>
              <span className="text-[10px] text-muted-foreground">({daily.worst.instrument})</span>
            </>
          ) : (
            <span className="text-lg font-bold text-muted-foreground">—</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyAnalytics;
