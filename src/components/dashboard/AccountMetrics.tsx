import {
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Trophy,
  Zap,
  Scale,
  DollarSign,
  Sun,
  Sunrise,
  Moon,
  Coffee,
} from "lucide-react";
import { useMemo } from "react";
import { useAccountView } from "@/hooks/useAccountView";
import { useAccountTrades } from "@/hooks/useTrading";
import { EMPTY_ACCOUNT_DATA } from "@/lib/emptyAccountData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface AccountMetricsProps {
  accountId: string;
}

// Colors for pie chart segments
const INSTRUMENT_COLORS = {
  NQ: "hsl(43, 74%, 49%)", // Dynasty Gold
  ES: "hsl(35, 55%, 42%)", // Bronze
  MES: "hsl(43, 80%, 65%)", // Light Gold
  MNQ: "hsl(280, 70%, 60%)", // Purple
};

const SESSION_LABELS = {
  preMarket: "Pre-Market",
  morning: "Morning",
  lunch: "Lunch",
  afternoon: "Afternoon",
};

const SESSION_TIMES = {
  preMarket: "4:00-9:30",
  morning: "9:30-12:00",
  lunch: "12:00-2:00",
  afternoon: "2:00-4:00",
};

const toNum = (v: string | number | null | undefined): number => {
  if (v === null || v === undefined) return 0;
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

// Symbols arrive like "ES.CME" / "MNQ.CME"; color by the root ticker.
const colorForSymbol = (name: string): string => {
  const root = name.split(/[.\-/]/)[0]?.toUpperCase() ?? name;
  return (
    INSTRUMENT_COLORS[root as keyof typeof INSTRUMENT_COLORS] ||
    "hsl(var(--muted-foreground))"
  );
};

const fmtDuration = (mins: number): string => {
  if (mins <= 0) return "—";
  if (mins < 60) return `${Math.round(mins)}m`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const AccountMetrics = ({ accountId }: AccountMetricsProps) => {
  const { data: rawAccountData } = useAccountView(accountId);
  const accountData = rawAccountData ?? EMPTY_ACCOUNT_DATA;
  const { data: tradesData } = useAccountTrades(accountId || undefined);
  const trades = useMemo(() => tradesData?.data ?? [], [tradesData]);

  // Derive instrument breakdown, trade direction, and avg duration from real
  // closed trades (commission-netted, consistent with the rest of the dashboard).
  const derived = useMemo(() => {
    const closed = trades.filter((t) => t.exitTime && t.realizedPnl !== null);
    const net = (t: (typeof closed)[number]) =>
      toNum(t.realizedPnl) - toNum(t.commission);

    const bySymbol = new Map<
      string,
      { name: string; trades: number; wins: number; pnl: number }
    >();
    for (const t of closed) {
      const g = bySymbol.get(t.symbol) ?? {
        name: t.symbol,
        trades: 0,
        wins: 0,
        pnl: 0,
      };
      const p = net(t);
      g.trades += 1;
      g.pnl += p;
      if (p > 0) g.wins += 1;
      bySymbol.set(t.symbol, g);
    }

    const breakdown = Array.from(bySymbol.values())
      .map((g) => ({
        name: g.name,
        trades: g.trades,
        winRate: g.trades ? Math.round((g.wins / g.trades) * 100) : 0,
        pnl: g.pnl,
        avgPnl: g.trades ? g.pnl / g.trades : 0,
      }))
      .sort((a, b) => b.trades - a.trades);

    const longs = closed.filter((t) => t.side === "BUY").length;
    const total = closed.length;
    const durations = closed
      .map((t) =>
        t.exitTime
          ? (new Date(t.exitTime).getTime() - new Date(t.entryTime).getTime()) /
            60000
          : 0,
      )
      .filter((d) => d > 0);

    return {
      breakdown,
      totalTrades: total,
      totalPnl: closed.reduce((s, t) => s + net(t), 0),
      tradeDirection: total
        ? {
            long: Math.round((longs / total) * 100),
            short: Math.round(((total - longs) / total) * 100),
          }
        : { long: 0, short: 0 },
      avgDurationMin: durations.length
        ? durations.reduce((a, b) => a + b, 0) / durations.length
        : 0,
    };
  }, [trades]);

  const formatCurrency = (value: number, showSign = false) => {
    const formatted = `$${Math.abs(value).toLocaleString()}`;
    if (showSign && value !== 0) {
      return value > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  // Calculate edge metrics
  const { metrics, sessionPerformance } = accountData;
  const profitFactor =
    metrics.grossLoss > 0
      ? metrics.grossProfit / metrics.grossLoss
      : metrics.grossProfit > 0
        ? 999
        : 0;
  const riskReward = metrics.avgLoss > 0 ? metrics.avgWin / metrics.avgLoss : 0;
  const winRateDecimal = metrics.winRate / 100;
  const lossRateDecimal = 1 - winRateDecimal;
  const expectancy =
    winRateDecimal * metrics.avgWin - lossRateDecimal * metrics.avgLoss;

  // Session performance data for bar chart
  const sessionData = Object.entries(sessionPerformance).map(
    ([key, value]) => ({
      name: SESSION_LABELS[key as keyof typeof SESSION_LABELS],
      time: SESSION_TIMES[key as keyof typeof SESSION_TIMES],
      value,
      fill: value >= 0 ? "hsl(43, 74%, 49%)" : "hsl(0, 84%, 60%)",
    }),
  );

  const bestSession = sessionData.reduce((a, b) => (a.value > b.value ? a : b));

  const instrumentBreakdown = derived.breakdown;
  const totalTrades = derived.totalTrades;
  const totalPnl = derived.totalPnl;

  const sortedByWinRate = [...instrumentBreakdown].sort(
    (a, b) => b.winRate - a.winRate,
  );
  const hasInstrumentData = instrumentBreakdown.length > 0;

  const tradeDirection = derived.tradeDirection;
  const hasTradeDirection = totalTrades > 0;

  // Get color for profit factor
  const getProfitFactorColor = () => {
    if (profitFactor < 1) return "text-destructive";
    if (profitFactor < 1.5) return "text-yellow-500";
    return "text-primary";
  };

  return (
    <div className="p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 h-full">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Advanced Metrics
      </h3>

      {/* GROUP A: Performance Metrics */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
          Performance Metrics
        </span>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <Target size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Win Rate</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              {metrics.winRate}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Avg. Win</span>
            </div>
            <span className="text-lg font-bold text-green-400">
              {formatCurrency(metrics.avgWin, true)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown size={14} className="text-destructive" />
              <span className="text-xs text-muted-foreground">Avg. Loss</span>
            </div>
            <span className="text-lg font-bold text-destructive">
              -{formatCurrency(metrics.avgLoss)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-gold-dark" />
              <span className="text-xs text-muted-foreground">
                Avg. Duration
              </span>
            </div>
            <span className="text-lg font-bold text-foreground">
              {derived.avgDurationMin > 0
                ? fmtDuration(derived.avgDurationMin)
                : "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* GROUP B: Edge Metrics - Profit Factor, R:R, Expectancy */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
          Edge Metrics
        </span>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {/* Profit Factor */}
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-primary" />
              <span className="text-[10px] text-muted-foreground">
                Profit Factor
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${getProfitFactorColor()}`}>
                {profitFactor.toFixed(2)}
              </span>
              <div className="w-full h-1.5 rounded-full bg-muted/30 mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${profitFactor >= 1.5 ? "bg-primary" : profitFactor >= 1 ? "bg-yellow-500" : "bg-destructive"}`}
                  style={{ width: `${Math.min(profitFactor / 3, 1) * 100}%` }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground mt-1">
                Target: 1.5+
              </span>
            </div>
          </div>

          {/* Risk:Reward Ratio */}
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-2">
              <Scale size={14} className="text-gold-dark" />
              <span className="text-[10px] text-muted-foreground">
                Risk:Reward
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span
                className={`text-2xl font-bold ${riskReward >= 1.5 ? "text-primary" : riskReward >= 1 ? "text-gold-dark" : "text-muted-foreground"}`}
              >
                {riskReward.toFixed(2)}:1
              </span>
              <div className="flex gap-1 mt-2 w-full">
                <div
                  className="h-1.5 rounded-full bg-primary/80"
                  style={{
                    width: `${Math.min((riskReward / 2.5) * 100, 100)}%`,
                  }}
                />
                <div className="h-1.5 rounded-full bg-destructive/80 flex-1" />
              </div>
              <span className="text-[9px] text-muted-foreground mt-1">
                Win vs Loss
              </span>
            </div>
          </div>

          {/* Expectancy */}
          <div className="p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={14} className="text-primary" />
              <span className="text-[10px] text-muted-foreground">
                Expectancy
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span
                className={`text-2xl font-bold ${expectancy > 0 ? "text-green-400" : "text-destructive"}`}
              >
                {formatCurrency(Math.round(expectancy), true)}
              </span>
              <span className="text-[9px] text-muted-foreground mt-2">
                per trade
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* GROUP C: Trade Behavior */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
          Trade Behavior
        </span>
        <div className="mt-2 p-3 rounded-xl bg-muted/10 border border-border/20">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">
              Trade Direction
            </span>
          </div>
          {hasTradeDirection ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 min-w-[80px]">
                <ArrowUpRight size={14} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Long {tradeDirection.long}%
                </span>
              </div>
              <div className="flex-1 h-2.5 rounded-full bg-muted/20 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-dark to-primary rounded-full transition-all duration-500"
                  style={{ width: `${tradeDirection.long}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
                <span className="text-sm font-semibold text-foreground">
                  Short {tradeDirection.short}%
                </span>
                <ArrowDownRight size={14} className="text-destructive/70" />
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground/60 text-center py-1">No trade data yet</p>
          )}
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* GROUP D: Session Performance */}
      <div className="mb-5">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
          Session Performance
        </span>
        <div className="mt-2 p-3 rounded-xl bg-muted/10 border border-border/20">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sessionData}
                layout="vertical"
                margin={{ left: 0, right: 10 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220 10% 60%)", fontSize: 10 }}
                  width={70}
                />
                <Tooltip
                  cursor={{ fill: "hsl(220 10% 15%)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border/50 rounded-lg px-3 py-2 shadow-lg">
                          <p className="text-xs font-medium text-foreground">
                            {data.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {data.time}
                          </p>
                          <p
                            className={`text-sm font-bold ${data.value >= 0 ? "text-green-400" : "text-destructive"}`}
                          >
                            {formatCurrency(data.value, true)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border/20">
            <Trophy size={12} className="text-primary" />
            <span className="text-[10px] text-muted-foreground">
              Best session:
            </span>
            <span className="text-[10px] font-medium text-primary">
              {bestSession.name}
            </span>
            <span className="text-[10px] text-green-400">
              {formatCurrency(bestSession.value, true)}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 my-4" />

      {/* GROUP E: Instrument Breakdown - Expanded */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Instrument Breakdown
          </span>
          <span className="text-[10px] font-medium text-foreground bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {totalTrades} Total Trades
          </span>
        </div>
        <div className="flex-1 p-4 rounded-xl bg-muted/10 border border-border/20">
          {hasInstrumentData ? (
            <>
              {/* Top Row: Pie Chart + Trade Volume */}
              <div className="flex items-center gap-6 mb-5">
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
                            fill={colorForSymbol(entry.name)}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-1.5 mb-3">
                    <BarChart3 size={12} className="text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Trade Volume</span>
                  </div>
                  {instrumentBreakdown.map((inst) => (
                    <div key={inst.name} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 min-w-[50px]">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorForSymbol(inst.name) }} />
                        <span className="text-xs font-medium text-foreground">{inst.name}</span>
                      </div>
                      <div className="flex-1 h-2 rounded-full bg-muted/20 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(inst.trades / totalTrades) * 100}%`, backgroundColor: colorForSymbol(inst.name) }} />
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
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorForSymbol(inst.name) }} />
                        <span className="text-xs font-medium text-foreground">{inst.name}</span>
                      </div>
                      <div className="flex-1 h-3 rounded-full bg-muted/20 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-primary/80 to-primary" style={{ width: `${inst.winRate}%` }} />
                      </div>
                      <div className="flex items-center gap-1.5 min-w-[55px] justify-end">
                        <span className={`text-xs font-bold ${inst.winRate >= 70 ? "text-primary" : inst.winRate >= 60 ? "text-gold-dark" : "text-muted-foreground"}`}>{inst.winRate}%</span>
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
                  <span className={`text-sm font-bold ${totalPnl >= 0 ? "text-green-400" : "text-destructive"}`}>{formatCurrency(totalPnl, true)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {instrumentBreakdown.map((inst) => (
                    <div key={inst.name} className="p-3 rounded-lg bg-muted/10 border border-border/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colorForSymbol(inst.name) }} />
                        <span className="text-sm font-medium text-foreground">{inst.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${inst.pnl >= 0 ? "text-green-400" : "text-destructive"}`}>{formatCurrency(inst.pnl, true)}</span>
                        <p className="text-[9px] text-muted-foreground">Avg: {formatCurrency(inst.avgPnl, true)}/trade</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground text-center">
              <BarChart3 size={28} className="mb-2 opacity-30" />
              <p className="text-xs">No instrument data yet</p>
              <p className="text-[10px] mt-1 opacity-60">Instrument breakdown will appear once you start trading</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountMetrics;
