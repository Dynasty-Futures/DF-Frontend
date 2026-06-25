import {
  Target,
  TrendingDown,
  TrendingUp,
  Calendar,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  SnowflakeIcon,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Percent,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAccountView } from "@/hooks/useAccountView";
import { EMPTY_ACCOUNT_DATA } from "@/lib/emptyAccountData";
import { useState, useMemo } from "react";
import {
  format,
  subDays,
  isSameDay,
  startOfMonth,
  getDay,
  getDaysInMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SummaryItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

const SummaryItem = ({
  label,
  value,
  icon,
  variant = "default",
}: SummaryItemProps) => {
  const variantStyles = {
    default: "border-border/30 hover:border-primary/30",
    success: "border-primary/30 bg-primary/5",
    warning: "border-yellow-500/30 bg-yellow-500/5",
    danger: "border-destructive/30 bg-destructive/5",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 gap-2 min-w-0 cursor-help",
            variantStyles[variant],
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-shrink">
            <div className="p-1.5 rounded-md bg-muted/50 animate-icon-3d-float flex-shrink-0">
              {icon}
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {label}
            </span>
          </div>
          <span className="text-xs font-semibold text-foreground whitespace-nowrap flex-shrink-0">
            {value}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-popover border border-border z-50"
      >
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-primary font-semibold">{value}</p>
      </TooltipContent>
    </Tooltip>
  );
};

interface SummaryPanelProps {
  accountId: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const SummaryPanel = ({
  accountId,
  selectedDate,
  onDateChange,
}: SummaryPanelProps) => {
  const navigate = useNavigate();
  const [viewedMonth, setViewedMonth] = useState(new Date());
  const [showCreds, setShowCreds] = useState(false);
  const { data: accountData } = useAccountView(accountId);
  const account = accountData ?? EMPTY_ACCOUNT_DATA;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success(`${label} copied`),
      () => toast.error("Copy failed"),
    );
  };

  const hasPlatformDetails =
    !!account.nextProgramName ||
    account.profitSplit !== undefined ||
    account.profitTradingDays !== undefined ||
    !!account.credentials;

  const goToPreviousMonth = () => setViewedMonth((prev) => subMonths(prev, 1));
  const goToNextMonth = () => setViewedMonth((prev) => addMonths(prev, 1));

  // Generate calendar data for viewed month
  const dailyPnL = useMemo(() => account?.dailyPnL ?? [], [account]);
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
      isSaturday: boolean;
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
        isSaturday: prevDate.getDay() === 6,
      });
    }

    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(monthStart);
      date.setDate(i + 1);
      const dayOfWeek = date.getDay();
      const isSaturday = dayOfWeek === 6;

      const daysFromToday = Math.floor(
        (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
      );
      const pnlIndex = dailyPnL.length - 1 - daysFromToday;
      const pnl =
        !isSaturday && pnlIndex >= 0 && pnlIndex < dailyPnL.length
          ? dailyPnL[pnlIndex]
          : 0;

      days.push({
        date,
        dayNumber: date.getDate(),
        pnl,
        noTrades: pnl === 0,
        isSelected: isSameDay(date, selectedDate),
        isToday: isSameDay(date, today),
        isCurrentMonth: true,
        isSaturday,
      });
    }

    return days;
  }, [dailyPnL, selectedDate, viewedMonth]);

  // Guard against division by zero when no account is connected
  const profitProgress = account.profitTarget > 0
    ? Math.min(100, Math.max(0, (account.closedPnL / account.profitTarget) * 100))
    : 0;

  // Format currency
  const formatCurrency = (value: number, showSign = false) => {
    const formatted = `$${Math.abs(value).toLocaleString()}`;
    if (showSign && value !== 0) {
      return value > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 h-full">
        {/* Header with Title and Stage Badge */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">
            Evaluation Progress
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] px-2 py-0.5 border-primary/30 text-primary"
          >
            Stage: {account.stage}
          </Badge>
        </div>

        {/* Profit Target Progress - Full Width */}
        <div className="mb-5 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Progress to Target
            </span>
            <span className="text-xs font-semibold text-primary">
              {formatCurrency(account.closedPnL)} /{" "}
              {formatCurrency(account.profitTarget)}
            </span>
          </div>
          <Progress value={profitProgress} className="h-1.5 bg-muted/30" />
        </div>

        {/* Funding Requirements Group */}
        <div className="mb-5">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Funding Requirements
          </span>
          <div className={cn("grid grid-cols-1 gap-2 mt-2", account.planType === 'Standard' ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            <SummaryItem
              label="Profit Target"
              value={formatCurrency(account.profitTarget)}
              icon={<Target size={14} className="text-primary" />}
              variant="success"
            />

            <SummaryItem
              label="Max Loss Limit"
              value={formatCurrency(account.maxDrawdown)}
              icon={<TrendingDown size={14} className="text-destructive" />}
              variant="danger"
            />

            {account.planType === 'Standard' && (
              <SummaryItem
                label="Daily Loss Limit"
                value={formatCurrency(account.dailyLossLimit)}
                icon={<TrendingDown size={14} className="text-yellow-500" />}
                variant="warning"
              />
            )}
          </div>
        </div>

        <div className="border-t border-border/30 my-4" />

        {/* Performance Metrics Group */}
        <div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Performance Metrics
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            <SummaryItem
              label="Best Day"
              value={formatCurrency(account.metrics.bestDay, true)}
              icon={<ArrowUpRight size={14} className="text-primary" />}
            />

            <SummaryItem
              label="Worst Day"
              value={formatCurrency(account.metrics.worstDay)}
              icon={<ArrowDownRight size={14} className="text-destructive" />}
            />

            <SummaryItem
              label="Trading Days"
              value={`${account.metrics.tradingDays} / ${account.metrics.totalDays}`}
              icon={<Calendar size={14} className="text-gold-dark" />}
            />

            <SummaryItem
              label="Profit Streak"
              value={`${account.metrics.profitStreak} Days`}
              icon={<Zap size={14} className="text-primary" />}
            />
          </div>
        </div>

        {/* Account Details Group (live platform data) */}
        {hasPlatformDetails && (
          <>
            <div className="border-t border-border/30 my-4" />
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Account Details
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {account.nextProgramName && (
                  <SummaryItem
                    label="Next Phase"
                    value={account.nextProgramName}
                    icon={<GitBranch size={14} className="text-primary" />}
                  />
                )}
                {account.profitSplit !== undefined && (
                  <SummaryItem
                    label="Profit Split"
                    value={`${account.profitSplit}%`}
                    icon={<Percent size={14} className="text-primary" />}
                    variant="success"
                  />
                )}
                {account.profitTradingDays !== undefined && (
                  <SummaryItem
                    label="Profitable Days"
                    value={`${account.profitTradingDays}`}
                    icon={<TrendingUp size={14} className="text-primary" />}
                  />
                )}
              </div>

              {account.credentials && (
                <div className="mt-2 p-3 rounded-lg bg-muted/10 border border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <KeyRound size={14} className="text-gold-dark" />
                    <span className="text-xs font-medium text-foreground">
                      Platform Credentials
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">Login</span>
                      <button
                        onClick={() =>
                          copyToClipboard(account.credentials!.login, "Login")
                        }
                        className="text-xs font-mono text-foreground hover:text-primary transition-colors"
                        title="Click to copy"
                      >
                        {account.credentials.login}
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        Password
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            copyToClipboard(
                              account.credentials!.password,
                              "Password",
                            )
                          }
                          className="text-xs font-mono text-foreground hover:text-primary transition-colors"
                          title="Click to copy"
                        >
                          {showCreds ? account.credentials.password : "••••••••"}
                        </button>
                        <button
                          onClick={() => setShowCreds((s) => !s)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title={showCreds ? "Hide" : "Show"}
                        >
                          {showCreds ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

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
                {format(viewedMonth, "MMMM yyyy")}
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
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div
                  key={i}
                  className="text-[10px] text-muted-foreground text-center py-1 font-medium"
                >
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
                    if (day.isCurrentMonth && !day.isSaturday) {
                      onDateChange(day.date);
                      navigate(
                        `/dashboard/journal/${format(day.date, "yyyy-MM-dd")}`,
                      );
                    }
                  }}
                  disabled={!day.isCurrentMonth || day.isSaturday}
                  className={cn(
                    "aspect-square rounded-md text-[10px] flex flex-col items-center justify-center transition-all duration-200",
                    // Base styles
                    day.isCurrentMonth && !day.isSaturday
                      ? "hover:bg-muted/30 cursor-pointer"
                      : day.isSaturday && day.isCurrentMonth
                        ? "bg-muted/5 cursor-not-allowed"
                        : "opacity-30 cursor-default",
                    // Selected day - highlight glow
                    day.isSelected && !day.isSaturday &&
                      "ring-1 ring-primary bg-primary/20 shadow-[0_0_8px_hsl(var(--primary)/0.4)]",
                    // Today marker (if not selected)
                    day.isToday && !day.isSelected && "ring-1 ring-border",
                  )}
                >
                  <span
                    className={cn(
                      "font-medium",
                      day.isSelected && !day.isSaturday && "text-primary",
                      !day.isCurrentMonth && "text-muted-foreground/50",
                      day.isSaturday && day.isCurrentMonth && "text-muted-foreground/30",
                    )}
                  >
                    {day.dayNumber}
                  </span>
                  {/* P&L indicator dot - never shown on Saturday */}
                  {day.isCurrentMonth && !day.noTrades && !day.isSaturday && (
                    <div
                      className={cn(
                        "w-1 h-1 rounded-full mt-0.5",
                        day.pnl > 0 ? "bg-primary" : "bg-destructive",
                      )}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-3 mt-3 pt-2 border-t border-border/20">
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
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-muted/50" />
                <span className="text-[9px] text-muted-foreground">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 my-4" />

        {/* Streak Tracker */}
        <div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Streak Tracker
          </span>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="p-3 rounded-xl bg-muted/10 border border-border/20 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Flame size={14} className="text-primary" />
                <span className="text-[10px] text-muted-foreground">
                  Max Wins
                </span>
              </div>
              <div className="flex items-center justify-center gap-0.5">
                {Array.from({
                  length: Math.min(account.streaks.maxWinStreak, 8),
                }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-primary"
                    style={{ height: `${10 + i * 2}px` }}
                  />
                ))}
              </div>
              <span className="text-lg font-bold text-primary mt-1 block">
                {account.streaks.maxWinStreak}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-muted/10 border border-border/20 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <SnowflakeIcon size={14} className="text-destructive" />
                <span className="text-[10px] text-muted-foreground">
                  Max Losses
                </span>
              </div>
              <div className="flex items-center justify-center gap-0.5">
                {Array.from({
                  length: Math.min(account.streaks.maxLossStreak, 8),
                }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-destructive"
                    style={{ height: `${10 + i * 2}px` }}
                  />
                ))}
              </div>
              <span className="text-lg font-bold text-destructive mt-1 block">
                {account.streaks.maxLossStreak}
              </span>
            </div>

            <div
              className={cn(
                "p-3 rounded-xl border text-center",
                account.streaks.currentStreak > 0
                  ? "bg-primary/10 border-primary/30"
                  : account.streaks.currentStreak < 0
                    ? "bg-destructive/10 border-destructive/30"
                    : "bg-muted/10 border-border/20",
              )}
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Zap
                  size={14}
                  className={
                    account.streaks.currentStreak > 0
                      ? "text-primary"
                      : account.streaks.currentStreak < 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }
                />
                <span className="text-[10px] text-muted-foreground">
                  Current
                </span>
              </div>
              <span
                className={cn(
                  "text-2xl font-bold",
                  account.streaks.currentStreak > 0
                    ? "text-primary"
                    : account.streaks.currentStreak < 0
                      ? "text-destructive"
                      : "text-muted-foreground",
                )}
              >
                {Math.abs(account.streaks.currentStreak)}
              </span>
              <span
                className={cn(
                  "text-[10px] block",
                  account.streaks.currentStreak > 0
                    ? "text-primary"
                    : account.streaks.currentStreak < 0
                      ? "text-destructive"
                      : "text-muted-foreground",
                )}
              >
                {account.streaks.currentStreak > 0
                  ? "wins"
                  : account.streaks.currentStreak < 0
                    ? "losses"
                    : "neutral"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 my-4" />

        {/* Day of Week Performance Heatmap */}
        <div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Day of Week
          </span>
          <div className="mt-2 p-3 rounded-xl bg-muted/10 border border-border/20">
            <div className="flex gap-2">
              {Object.entries(account.dayOfWeekPerformance).map(
                ([day, value]) => {
                  const maxValue = Math.max(
                    ...Object.values(account.dayOfWeekPerformance).map((v) =>
                      Math.abs(v),
                    ),
                  );
                  const intensity =
                    maxValue > 0 ? Math.abs(value) / maxValue : 0;

                  const getHeatmapColor = () => {
                    if (value === 0) return "bg-muted/30";
                    if (value > 0) {
                      if (intensity > 0.7) return "bg-primary";
                      if (intensity > 0.4) return "bg-primary/70";
                      return "bg-primary/40";
                    } else {
                      if (intensity > 0.7) return "bg-destructive";
                      if (intensity > 0.4) return "bg-destructive/70";
                      return "bg-destructive/40";
                    }
                  };

                  return (
                    <div
                      key={day}
                      className="flex-1 text-center group cursor-pointer"
                    >
                      <div
                        className={`h-10 rounded-lg ${getHeatmapColor()} transition-all duration-300 hover:scale-105 flex items-center justify-center`}
                        title={`${day}: ${value >= 0 ? "+" : ""}$${Math.abs(
                          value,
                        ).toLocaleString()}`}
                      >
                        <span className="text-[10px] font-medium text-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          {value >= 0 ? "+" : "-"}$
                          {Math.abs(value).toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 block">
                        {day}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-border/20">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-destructive" />
                <span className="text-[9px] text-muted-foreground">Loss</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-muted/30" />
                <span className="text-[9px] text-muted-foreground">
                  Break-even
                </span>
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

export default SummaryPanel;
