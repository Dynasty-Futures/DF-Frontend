import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";
import { LineChart as LineChartIcon, BarChart3 } from "lucide-react";
import { ChartDataPoint } from "@/data/mockDashboardData";

// In production, replace mock datasets with live data from PropTradeTech / broker APIs.

interface PerformanceChartProps {
  data: ChartDataPoint[];
  chartType: "equity" | "pnl";
  onChartTypeChange: (type: "equity" | "pnl") => void;
  startingBalance: number;
  timeframe?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-xl border-2 border-primary/40 rounded-2xl p-4 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]">
        <p className="text-sm font-semibold text-primary mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2.5 h-2.5 rounded-full shadow-[0_0_6px_1px]"
              style={{
                backgroundColor: entry.color,
                boxShadow: `0 0 6px 1px ${entry.color}`,
              }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
        {payload[0]?.payload?.pnl !== undefined && (
          <div className="mt-2 pt-2 border-t border-border/30">
            <span className="text-xs text-muted-foreground">P&L: </span>
            <span
              className={`text-sm font-semibold ${payload[0].payload.pnl >= 0 ? "text-primary" : "text-destructive"}`}
            >
              {payload[0].payload.pnl >= 0 ? "+" : ""}$
              {payload[0].payload.pnl.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const PnLTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-card/95 backdrop-blur-xl border-2 border-primary/40 rounded-2xl p-4 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]">
        <p className="text-sm font-semibold text-primary mb-1">{label}</p>
        <span
          className={`text-lg font-bold ${value >= 0 ? "text-primary" : "text-destructive"}`}
        >
          {value >= 0 ? "+" : ""}${value.toLocaleString()}
        </span>
      </div>
    );
  }
  return null;
};

const PerformanceChart = ({
  data,
  chartType,
  onChartTypeChange,
  startingBalance,
  timeframe,
  className,
}: PerformanceChartProps) => {
  // Y-axis domain is driven by the equity range itself (not the profit-target /
  // max-loss rule lines) so per-trade dips/recoveries stay visible — a few-
  // hundred-dollar swing on a six-figure account would otherwise flatten to a
  // straight line. The rule lines still render as overlays when in range.
  const allBalances = data.map((d) => d.balance);
  const peakEquity = Math.max(...allBalances);
  const troughEquity = Math.min(...allBalances);
  // Anchor the domain to include the starting balance so the breakeven divider
  // always renders — even when equity has stayed entirely above or below it.
  // The target line stays out of the domain by design (shown as a top marker).
  const minBalance = Math.min(...allBalances, startingBalance);
  const maxBalance = Math.max(...allBalances, startingBalance);
  const padding = Math.max((maxBalance - minBalance) * 0.15, 30);

  // Calculate P&L domain
  const allPnL = data.map((d) => d.pnl);
  const maxPnL = Math.max(...allPnL, 0);
  const minPnL = Math.min(...allPnL, 0);
  const pnlPadding = Math.max(Math.abs(maxPnL), Math.abs(minPnL)) * 0.2;

  // Profit-target marker. The target ($start + profit target) almost always
  // sits ABOVE the equity-driven Y domain, so we keep the chart zoomed to real
  // movement and pin a labeled marker at the top instead of stretching the axis.
  // Once equity reaches the target it falls inside the domain and the dashed
  // Target line renders too — and the marker flips to a "reached" state.
  const profitTargetValue = data[0]?.profitTarget;
  const maxLossValue = data[0]?.maxLoss;
  // A target / max-loss line only "exists" when it sits away from the start
  // balance. Funded (and unconfigured) accounts have a 0 target/drawdown, which
  // would collapse those lines onto breakeven — so only draw them when distinct.
  const hasTarget =
    profitTargetValue !== undefined && profitTargetValue > startingBalance;
  const hasMaxLoss =
    maxLossValue !== undefined && maxLossValue < startingBalance;
  const targetReached =
    profitTargetValue !== undefined &&
    profitTargetValue > startingBalance &&
    peakEquity >= profitTargetValue;
  const maxLossBreached =
    maxLossValue !== undefined &&
    maxLossValue < startingBalance &&
    troughEquity <= maxLossValue;

  return (
    <div
      className={`p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 relative overflow-hidden flex flex-col ${className || "h-[360px]"}`}
    >
      {/* Dynasty-unique radial glow background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.4)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,hsl(var(--gold-dark)/0.3)_0%,transparent_70%)]" />
      </div>

      {/* Header with chart type toggle */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <h3 className="text-sm font-semibold text-foreground">
          Account Performance
        </h3>
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/20 border border-border/30">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 rounded-md text-[10px] transition-all ${chartType === "equity" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => onChartTypeChange("equity")}
          >
            <LineChartIcon
              size={12}
              className={`mr-1 ${chartType === "equity" ? "animate-icon-3d-pulse" : ""}`}
            />
            Equity
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 rounded-md text-[10px] transition-all ${chartType === "pnl" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => onChartTypeChange("pnl")}
          >
            <BarChart3
              size={12}
              className={`mr-1 ${chartType === "pnl" ? "animate-icon-3d-pulse" : ""}`}
            />
            P&L
          </Button>
        </div>
      </div>

      {/* Profit-target marker, pinned at the top. Gold "▲ Target $Xk" while the
          target is still above the chart; flips to a green "✓ target reached"
          once equity climbs to it. */}
      {chartType === "equity" && hasTarget && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
              targetReached
                ? "text-emerald-400 border-emerald-400/40 bg-emerald-400/10"
                : "text-gold-light border-gold-light/40 bg-gold-light/10"
            }`}
          >
            {targetReached
              ? "✓ Profit target reached"
              : `▲ Target $${((profitTargetValue ?? 0) / 1000).toFixed(1)}k`}
          </div>
        </div>
      )}

      {/* Max-loss marker, pinned at the bottom — mirrors the target marker.
          The max-loss level sits below the equity range, so we label it here
          instead of stretching the axis. Flips to "breached" if equity dipped
          to it. The red line still renders when equity drops near it. */}
      {chartType === "equity" && hasMaxLoss && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border text-destructive border-destructive/40 bg-destructive/10">
            {maxLossBreached
              ? "✗ Max loss breached"
              : `▼ Max Loss $${((maxLossValue ?? 0) / 1000).toFixed(1)}k`}
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "equity" ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="balanceGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="hsl(35 55% 38%)" />
                  <stop offset="100%" stopColor="hsl(43 74% 49%)" />
                </linearGradient>
                <linearGradient
                  id="areaFillGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(43 74% 49%)"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="50%"
                    stopColor="hsl(43 74% 49%)"
                    stopOpacity="0.1"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(43 74% 49%)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.1}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                domain={[minBalance - padding, maxBalance + padding]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "hsl(var(--primary))",
                  strokeOpacity: 0.35,
                  strokeWidth: 1,
                }}
              />

              {/* Profit Target Line - dashed, semi-transparent. Renders only
                  once equity climbs near it (otherwise it's the top marker). */}
              {hasTarget && (
                <ReferenceLine
                  y={profitTargetValue}
                  stroke="hsl(var(--gold-light))"
                  strokeDasharray="8 4"
                  strokeOpacity={0.6}
                  strokeWidth={2}
                />
              )}

              {/* Max Loss Line - dashed, semi-transparent */}
              {hasMaxLoss && (
                <ReferenceLine
                  y={maxLossValue}
                  stroke="hsl(var(--destructive))"
                  strokeDasharray="8 4"
                  strokeOpacity={0.6}
                  strokeWidth={2}
                />
              )}

              {/* Breakeven (starting balance) — the in/out-of-profit divider.
                  Above it = in profit, below = in loss. Sits inside the equity
                  range so it reliably renders, unlike the target/max-loss rules. */}
              <ReferenceLine
                y={startingBalance}
                stroke="#34d399"
                strokeDasharray="8 4"
                strokeOpacity={0.7}
                strokeWidth={2}
              />

              {/* Account Balance Area. The animated draw-in is kept, but the
                  Gaussian-blur glow filter is removed — it recomputed every
                  animation frame and was the source of the chart jank, so the
                  animation now runs smooth. */}
              <Area
                type="monotone"
                dataKey="balance"
                stroke="url(#balanceGradient)"
                strokeWidth={4}
                fill="url(#areaFillGradient)"
                name="Account Balance"
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.1}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  `${value >= 0 ? "+" : "-"}$${(Math.abs(value) / 1000).toFixed(1)}k`
                }
                domain={[minPnL - pnlPadding, maxPnL + pnlPadding]}
              />
              <Tooltip
                content={<PnLTooltip />}
                cursor={{ fill: "hsl(var(--primary))", fillOpacity: 0.08 }}
              />
              <ReferenceLine
                y={0}
                stroke="hsl(var(--border))"
                strokeWidth={1}
              />
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.pnl >= 0 ? "hsl(43 74% 49%)" : "hsl(0 60% 50%)"}
                    fillOpacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {chartType === "equity" && (
        <div className="absolute bottom-2 right-4 flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-0.5 bg-gradient-to-r from-gold-dark to-primary rounded" />
            <span className="text-muted-foreground">Balance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 border-t-2 border-dashed border-emerald-400/70" />
            <span className="text-muted-foreground">Breakeven</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 border-t-2 border-dashed border-destructive/60" />
            <span className="text-muted-foreground">Max Loss</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;
