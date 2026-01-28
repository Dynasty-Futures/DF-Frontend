import { Target, TrendingUp, TrendingDown, Clock, ArrowUpRight, ArrowDownRight, BarChart3, Trophy, Zap, Scale, DollarSign, Sun, Sunrise, Moon, Coffee } from 'lucide-react';
import { getAccountById, mockAccounts } from '@/data/mockDashboardData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface AccountMetricsProps {
  accountId: string;
}

// Colors for pie chart segments
const INSTRUMENT_COLORS = {
  NQ: 'hsl(142, 76%, 50%)',   // Dynasty Green
  ES: 'hsl(175, 70%, 50%)',   // Teal
  MES: 'hsl(45, 100%, 51%)',  // Amber
  MNQ: 'hsl(280, 70%, 60%)',  // Purple
};

const SESSION_LABELS = {
  preMarket: 'Pre-Market',
  morning: 'Morning',
  lunch: 'Lunch',
  afternoon: 'Afternoon',
};

const SESSION_TIMES = {
  preMarket: '4:00-9:30',
  morning: '9:30-12:00',
  lunch: '12:00-2:00',
  afternoon: '2:00-4:00',
};

const AccountMetrics = ({ accountId }: AccountMetricsProps) => {
  const accountData = getAccountById(accountId) || mockAccounts[1];

  const formatCurrency = (value: number, showSign = false) => {
    const formatted = `$${Math.abs(value).toLocaleString()}`;
    if (showSign && value !== 0) {
      return value > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  // Calculate edge metrics
  const { metrics, sessionPerformance } = accountData;
  const profitFactor = metrics.grossLoss > 0 ? metrics.grossProfit / metrics.grossLoss : metrics.grossProfit > 0 ? 999 : 0;
  const riskReward = metrics.avgLoss > 0 ? metrics.avgWin / metrics.avgLoss : 0;
  const winRateDecimal = metrics.winRate / 100;
  const lossRateDecimal = 1 - winRateDecimal;
  const expectancy = (winRateDecimal * metrics.avgWin) - (lossRateDecimal * metrics.avgLoss);

  // Session performance data for bar chart
  const sessionData = Object.entries(sessionPerformance).map(([key, value]) => ({
    name: SESSION_LABELS[key as keyof typeof SESSION_LABELS],
    time: SESSION_TIMES[key as keyof typeof SESSION_TIMES],
    value,
    fill: value >= 0 ? 'hsl(142, 76%, 50%)' : 'hsl(0, 84%, 60%)',
  }));

  const bestSession = sessionData.reduce((a, b) => a.value > b.value ? a : b);

  // Mock instrument data with P&L
  const instrumentBreakdown = [
    { name: 'NQ', trades: 45, winRate: 72, pnl: 2340, avgPnl: 52 },
    { name: 'ES', trades: 30, winRate: 65, pnl: 890, avgPnl: 30 },
    { name: 'MES', trades: 15, winRate: 58, pnl: -120, avgPnl: -8 },
    { name: 'MNQ', trades: 10, winRate: 70, pnl: 450, avgPnl: 45 },
  ];
  
  const totalTrades = instrumentBreakdown.reduce((sum, i) => sum + i.trades, 0);
  const totalPnl = instrumentBreakdown.reduce((sum, i) => sum + i.pnl, 0);

  const sortedByWinRate = [...instrumentBreakdown].sort((a, b) => b.winRate - a.winRate);
  const tradeDirection = { long: 68, short: 32 };

  // Get color for profit factor
  const getProfitFactorColor = () => {
    if (profitFactor < 1) return 'text-destructive';
    if (profitFactor < 1.5) return 'text-yellow-500';
    return 'text-primary';
  };

  return (
    <div className="p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 h-full">
      <h3 className="text-base font-semibold text-foreground mb-4">Advanced Metrics</h3>
      
      {/* GROUP A: Performance Metrics */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Performance Metrics</span>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <Target size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Win Rate</span>
            </div>
            <span className="text-lg font-bold text-foreground">{metrics.winRate}%</span>
          </div>
          
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Avg. Win</span>
            </div>
            <span className="text-lg font-bold text-primary">{formatCurrency(metrics.avgWin, true)}</span>
          </div>
          
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown size={14} className="text-destructive" />
              <span className="text-xs text-muted-foreground">Avg. Loss</span>
            </div>
            <span className="text-lg font-bold text-destructive">-{formatCurrency(metrics.avgLoss)}</span>
          </div>
          
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-teal" />
              <span className="text-xs text-muted-foreground">Avg. Duration</span>
            </div>
            <span className="text-lg font-bold text-foreground">2h 15m</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border/30 my-4" />
      
      {/* GROUP B: Edge Metrics - Profit Factor, R:R, Expectancy */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Edge Metrics</span>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {/* Profit Factor */}
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-primary" />
              <span className="text-[10px] text-muted-foreground">Profit Factor</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${getProfitFactorColor()}`}>
                {profitFactor.toFixed(2)}
              </span>
              <div className="w-full h-1.5 rounded-full bg-muted/30 mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${profitFactor >= 1.5 ? 'bg-primary' : profitFactor >= 1 ? 'bg-yellow-500' : 'bg-destructive'}`}
                  style={{ width: `${Math.min(profitFactor / 3, 1) * 100}%` }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground mt-1">Target: 1.5+</span>
            </div>
          </div>

          {/* Risk:Reward Ratio */}
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-2">
              <Scale size={14} className="text-teal" />
              <span className="text-[10px] text-muted-foreground">Risk:Reward</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${riskReward >= 1.5 ? 'text-primary' : riskReward >= 1 ? 'text-teal' : 'text-muted-foreground'}`}>
                {riskReward.toFixed(2)}:1
              </span>
              <div className="flex gap-1 mt-2 w-full">
                <div className="h-1.5 rounded-full bg-primary/80" style={{ width: `${Math.min(riskReward / 2.5 * 100, 100)}%` }} />
                <div className="h-1.5 rounded-full bg-destructive/80 flex-1" />
              </div>
              <span className="text-[9px] text-muted-foreground mt-1">Win vs Loss</span>
            </div>
          </div>

          {/* Expectancy */}
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={14} className="text-primary" />
              <span className="text-[10px] text-muted-foreground">Expectancy</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${expectancy > 0 ? 'text-primary' : 'text-destructive'}`}>
                {formatCurrency(Math.round(expectancy), true)}
              </span>
              <span className="text-[9px] text-muted-foreground mt-2">per trade</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border/30 my-4" />
      
      {/* GROUP C: Trade Behavior */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Trade Behavior</span>
        <div className="mt-2 p-3 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Trade Direction</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 min-w-[80px]">
              <ArrowUpRight size={14} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">Long {tradeDirection.long}%</span>
            </div>
            <div className="flex-1 h-2.5 rounded-full bg-muted/20 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-teal rounded-full transition-all duration-500"
                style={{ width: `${tradeDirection.long}%` }}
              />
            </div>
            <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
              <span className="text-sm font-semibold text-foreground">Short {tradeDirection.short}%</span>
              <ArrowDownRight size={14} className="text-destructive/70" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border/30 my-4" />

      {/* GROUP D: Session Performance */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Session Performance</span>
        <div className="mt-2 p-3 rounded-xl bg-muted/10 border border-border/20">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData} layout="vertical" margin={{ left: 0, right: 10 }}>
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(220, 10%, 60%)', fontSize: 10 }}
                  width={70}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(220, 15%, 18%)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border/50 rounded-lg px-3 py-2 shadow-lg">
                          <p className="text-xs font-medium text-foreground">{data.name}</p>
                          <p className="text-[10px] text-muted-foreground">{data.time}</p>
                          <p className={`text-sm font-bold ${data.value >= 0 ? 'text-primary' : 'text-destructive'}`}>
                            {formatCurrency(data.value, true)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  maxBarSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border/20">
            <Trophy size={12} className="text-primary" />
            <span className="text-[10px] text-muted-foreground">Best session:</span>
            <span className="text-[10px] font-medium text-primary">{bestSession.name}</span>
            <span className="text-[10px] text-primary">{formatCurrency(bestSession.value, true)}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border/30 my-4" />
      
      {/* GROUP E: Instrument Breakdown - Expanded */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Instrument Breakdown</span>
          <span className="text-[10px] font-medium text-foreground bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {totalTrades} Total Trades
          </span>
        </div>
        <div className="flex-1 p-4 rounded-xl bg-muted/10 border border-border/20">
          {/* Top Row: Pie Chart + Trade Volume */}
          <div className="flex items-center gap-6 mb-5">
            {/* Large Pie Chart */}
            <div className="w-36 h-36 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={instrumentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="trades"
                  >
                    {instrumentBreakdown.map((entry) => (
                      <Cell 
                        key={entry.name} 
                        fill={INSTRUMENT_COLORS[entry.name as keyof typeof INSTRUMENT_COLORS] || 'hsl(var(--muted-foreground))'} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Trade Volume Stats */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5 mb-3">
                <BarChart3 size={12} className="text-muted-foreground" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Trade Volume</span>
              </div>
              {instrumentBreakdown.map((inst) => (
                <div key={inst.name} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[50px]">
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: INSTRUMENT_COLORS[inst.name as keyof typeof INSTRUMENT_COLORS] }}
                    />
                    <span className="text-xs font-medium text-foreground">{inst.name}</span>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-muted/20 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(inst.trades / totalTrades) * 100}%`,
                        backgroundColor: INSTRUMENT_COLORS[inst.name as keyof typeof INSTRUMENT_COLORS]
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground min-w-[45px] text-right">{inst.trades} trades</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border/20 my-4" />
          
          {/* Win Rate Progress Bars */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-3">
              <Trophy size={12} className="text-primary" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Win Rate by Instrument</span>
            </div>
            <div className="space-y-2.5">
              {sortedByWinRate.map((inst, index) => (
                <div key={inst.name} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[50px]">
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: INSTRUMENT_COLORS[inst.name as keyof typeof INSTRUMENT_COLORS] }}
                    />
                    <span className="text-xs font-medium text-foreground">{inst.name}</span>
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-muted/20 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-primary/80 to-primary"
                      style={{ width: `${inst.winRate}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-[55px] justify-end">
                    <span className={`text-xs font-bold ${inst.winRate >= 70 ? 'text-primary' : inst.winRate >= 60 ? 'text-teal' : 'text-muted-foreground'}`}>
                      {inst.winRate}%
                    </span>
                    {index === 0 && <Trophy size={11} className="text-primary" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border/20 my-4" />
          
          {/* P&L Contribution Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <DollarSign size={12} className="text-primary" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">P&L Contribution</span>
              </div>
              <span className={`text-sm font-bold ${totalPnl >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {formatCurrency(totalPnl, true)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {instrumentBreakdown.map((inst) => (
                <div 
                  key={inst.name} 
                  className="p-3 rounded-lg bg-muted/10 border border-border/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: INSTRUMENT_COLORS[inst.name as keyof typeof INSTRUMENT_COLORS] }}
                    />
                    <span className="text-sm font-medium text-foreground">{inst.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${inst.pnl >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {formatCurrency(inst.pnl, true)}
                    </span>
                    <p className="text-[9px] text-muted-foreground">
                      Avg: {formatCurrency(inst.avgPnl, true)}/trade
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMetrics;