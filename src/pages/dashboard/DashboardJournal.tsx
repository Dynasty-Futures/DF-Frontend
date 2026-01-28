import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { format, parseISO, isToday, addDays, subDays, differenceInDays } from 'date-fns';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  ShieldAlert,
  Clock,
  Save,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { getAccountById, mockAccounts } from '@/data/mockDashboardData';
import { toast } from 'sonner';

const DashboardJournal = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  
  // Parse date from URL or use today
  const selectedDate = useMemo(() => {
    if (date) {
      try {
        return parseISO(date);
      } catch {
        return new Date();
      }
    }
    return new Date();
  }, [date]);
  
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  
  // Journal entry state
  const [journalEntry, setJournalEntry] = useState('');
  
  // Load saved journal entry from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`journal-${dateKey}`);
    if (saved) {
      setJournalEntry(saved);
    } else {
      setJournalEntry('');
    }
  }, [dateKey]);
  
  // Use first account for demo
  const account = mockAccounts[0];
  
  // Calculate day's P&L from account data
  const dayData = useMemo(() => {
    const today = new Date();
    const daysAgo = differenceInDays(today, selectedDate);
    const pnlIndex = account.dailyPnL.length - 1 - daysAgo;
    const pnl = pnlIndex >= 0 && pnlIndex < account.dailyPnL.length ? account.dailyPnL[pnlIndex] : null;
    const hasTrades = pnl !== null && pnl !== 0;
    
    // Generate mock data seeded by date for consistency
    const seed = selectedDate.getDate() + selectedDate.getMonth() * 31;
    const tradesCount = hasTrades ? 3 + (seed % 5) : 0;
    const winRate = hasTrades ? 40 + (seed % 40) : 0;
    const dailyDrawdown = hasTrades ? 200 + (seed % 500) : 0;
    
    return {
      pnl: pnl || 0,
      hasTrades,
      tradesCount,
      winRate,
      dailyDrawdown,
      bestTrade: hasTrades ? { amount: 150 + (seed % 200), instrument: seed % 2 === 0 ? 'NQ' : 'ES' } : null,
      worstTrade: hasTrades ? { amount: -(50 + (seed % 150)), instrument: seed % 2 === 0 ? 'ES' : 'NQ' } : null,
    };
  }, [selectedDate, account.dailyPnL]);
  
  // Generate mock trades for the day with entry/exit times and duration
  const mockTrades = useMemo(() => {
    if (!dayData.hasTrades) return [];
    
    const seed = selectedDate.getDate() + selectedDate.getMonth() * 31;
    const trades = [];
    const instruments = ['NQ', 'ES', 'MNQ', 'MES'];
    
    for (let i = 0; i < dayData.tradesCount; i++) {
      const isLong = (seed + i) % 2 === 0;
      const instrumentIndex = (seed + i) % instruments.length;
      const entryPrice = 18000 + ((seed * i * 7) % 500);
      const exitPrice = isLong ? entryPrice + ((seed + i) % 50) : entryPrice - ((seed + i) % 50);
      const pnl = ((exitPrice - entryPrice) * (isLong ? 1 : -1)) * 5;
      
      // Generate entry time
      const entryHour = 9 + Math.floor(i * 1.5);
      const entryMinute = (15 + (seed * i) % 45);
      
      // Generate duration in minutes (15 to 90 minutes)
      const durationMinutes = 15 + (seed + i) % 75;
      
      // Calculate exit time
      const totalEntryMinutes = entryHour * 60 + entryMinute;
      const totalExitMinutes = totalEntryMinutes + durationMinutes;
      const exitHour = Math.floor(totalExitMinutes / 60);
      const exitMinute = totalExitMinutes % 60;
      
      // Format times
      const formatTime = (hour: number, minute: number) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
      };
      
      // Format duration
      const formatDuration = (mins: number) => {
        if (mins >= 60) {
          const hours = Math.floor(mins / 60);
          const remainingMins = mins % 60;
          return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
        }
        return `${mins}m`;
      };
      
      trades.push({
        id: i + 1,
        entryTime: formatTime(entryHour, entryMinute),
        exitTime: formatTime(exitHour, exitMinute),
        duration: formatDuration(durationMinutes),
        instrument: instruments[instrumentIndex],
        direction: isLong ? 'Long' : 'Short',
        entry: entryPrice.toFixed(2),
        exit: exitPrice.toFixed(2),
        pnl,
      });
    }
    
    return trades;
  }, [selectedDate, dayData]);
  
  const formatCurrency = (value: number, showSign = true) => {
    const formatted = `$${Math.abs(value).toLocaleString()}`;
    if (showSign && value !== 0) {
      return value > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };
  
  const handleSave = () => {
    localStorage.setItem(`journal-${dateKey}`, journalEntry);
    toast.success('Journal entry saved');
  };
  
  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? subDays(selectedDate, 1) : addDays(selectedDate, 1);
    navigate(`/dashboard/journal/${format(newDate, 'yyyy-MM-dd')}`);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigateDay('prev')}>
            <ChevronLeft size={20} />
          </Button>
          <div className="text-center min-w-[180px]">
            <h2 className="text-lg font-semibold text-foreground">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            {isToday(selectedDate) && (
              <span className="text-xs text-primary">Today</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigateDay('next')}
            disabled={isToday(selectedDate)}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
        
        <div className="w-[140px]" /> {/* Spacer for centering */}
      </div>
      
      {/* Daily Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className={cn(
          "p-4 rounded-xl border",
          dayData.pnl >= 0 
            ? "bg-primary/5 border-primary/20" 
            : "bg-destructive/5 border-destructive/20"
        )}>
          <div className="flex items-center gap-2 mb-2">
            {dayData.pnl >= 0 ? (
              <TrendingUp size={16} className="text-primary" />
            ) : (
              <TrendingDown size={16} className="text-destructive" />
            )}
            <span className="text-xs text-muted-foreground">Day's P&L</span>
          </div>
          <span className={cn(
            "text-xl font-bold",
            dayData.pnl >= 0 ? "text-primary" : "text-destructive"
          )}>
            {dayData.hasTrades ? formatCurrency(dayData.pnl) : '--'}
          </span>
        </div>
        
        <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-teal" />
            <span className="text-xs text-muted-foreground">Trades</span>
          </div>
          <span className="text-xl font-bold text-foreground">{dayData.tradesCount}</span>
        </div>
        
        <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Win Rate</span>
          </div>
          <span className={cn(
            "text-xl font-bold",
            dayData.winRate >= 60 ? "text-primary" : dayData.winRate >= 40 ? "text-foreground" : "text-destructive"
          )}>
            {dayData.hasTrades ? `${dayData.winRate}%` : '--'}
          </span>
        </div>
        
        <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={16} className="text-yellow-500" />
            <span className="text-xs text-muted-foreground">Drawdown Used</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            {dayData.hasTrades ? formatCurrency(dayData.dailyDrawdown, false) : '--'}
          </span>
        </div>
        
        <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Best Trade</span>
          </div>
          <div>
            <span className="text-xl font-bold text-primary">
              {dayData.bestTrade ? formatCurrency(dayData.bestTrade.amount) : '--'}
            </span>
            {dayData.bestTrade && (
              <span className="text-xs text-muted-foreground ml-1">{dayData.bestTrade.instrument}</span>
            )}
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-destructive" />
            <span className="text-xs text-muted-foreground">Worst Trade</span>
          </div>
          <div>
            <span className="text-xl font-bold text-destructive">
              {dayData.worstTrade ? formatCurrency(dayData.worstTrade.amount) : '--'}
            </span>
            {dayData.worstTrade && (
              <span className="text-xs text-muted-foreground ml-1">{dayData.worstTrade.instrument}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Trade Log & Journal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Log */}
        <div className="p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-teal" />
            <h3 className="text-base font-semibold text-foreground">Trade Log</h3>
          </div>
          
          {mockTrades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">Entry</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">Exit</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">Duration</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">Symbol</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">Side</th>
                    <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">Price In</th>
                    <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">Price Out</th>
                    <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTrades.map((trade) => (
                    <tr key={trade.id} className="border-b border-border/10 hover:bg-muted/10">
                      <td className="py-2 px-2 text-foreground text-xs">{trade.entryTime}</td>
                      <td className="py-2 px-2 text-foreground text-xs">{trade.exitTime}</td>
                      <td className="py-2 px-2 text-muted-foreground text-xs">{trade.duration}</td>
                      <td className="py-2 px-2 text-foreground font-medium">{trade.instrument}</td>
                      <td className="py-2 px-2">
                        <span className={cn(
                          "text-xs font-medium px-1.5 py-0.5 rounded",
                          trade.direction === 'Long' 
                            ? "text-primary bg-primary/10" 
                            : "text-destructive bg-destructive/10"
                        )}>
                          {trade.direction}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-right text-muted-foreground text-xs">{trade.entry}</td>
                      <td className="py-2 px-2 text-right text-muted-foreground text-xs">{trade.exit}</td>
                      <td className={cn(
                        "py-2 px-2 text-right font-semibold text-xs",
                        trade.pnl >= 0 ? "text-primary" : "text-destructive"
                      )}>
                        {formatCurrency(trade.pnl)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Clock size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No trades on this day</p>
            </div>
          )}
        </div>
        
        {/* Journal Entry */}
        <div className="p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <h3 className="text-base font-semibold text-foreground">Journal Entry</h3>
            </div>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="gap-2"
            >
              <Save size={14} />
              Save Entry
            </Button>
          </div>
          
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts about today's trading session...

• What went well?
• What could be improved?
• Did you follow your trading plan?
• Key lessons learned..."
            className="min-h-[280px] resize-none bg-muted/10 border-border/20 focus:border-primary/30"
          />
          
          <p className="text-xs text-muted-foreground mt-2">
            Your journal entries are saved locally on this device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardJournal;