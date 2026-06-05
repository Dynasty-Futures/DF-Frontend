import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  ShieldAlert,
  ChevronDown,
  BarChart3,
  Map,
  Calendar,
  Loader2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { format, isToday } from "date-fns";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AccountSelector from "@/components/dashboard/AccountSelector";
import OpenPlatformButton from "@/components/dashboard/OpenPlatformButton";
import MetricCard from "@/components/dashboard/MetricCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import SummaryPanel from "@/components/dashboard/SummaryPanel";
import BuilderPanel from "@/components/dashboard/BuilderPanel";
import AccountMetrics from "@/components/dashboard/AccountMetrics";
import DailyAnalytics from "@/components/dashboard/DailyAnalytics";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useTradingAccounts, useLiveAccount, tradingKeys } from "@/hooks/useTrading";
import { useAccountView } from "@/hooks/useAccountView";
import { buildChartData } from "@/lib/chartData";

const DashboardHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qc = useQueryClient();

  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      toast.success(
        "Payment successful! Your account is being provisioned and will appear shortly.",
      );
      qc.invalidateQueries({ queryKey: tradingKeys.accounts() });
      searchParams.delete("checkout");
      searchParams.delete("session_id");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, qc]);

  const accountsQ = useTradingAccounts();
  const accounts = useMemo(() => accountsQ.data?.data ?? [], [accountsQ.data]);

  const urlAccountId = searchParams.get("account") ?? undefined;
  const [selectedAccount, setSelectedAccount] = useState<string>(
    urlAccountId ?? "",
  );

  useEffect(() => {
    if (!selectedAccount && accounts.length > 0) {
      setSelectedAccount(urlAccountId ?? accounts[0].id);
    }
  }, [accounts, selectedAccount, urlAccountId]);

  const [dateRange, setDateRange] = useState("monthly");
  const [chartType, setChartType] = useState<"equity" | "pnl">("equity");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const view = useAccountView(selectedAccount || undefined);
  const liveQ = useLiveAccount(selectedAccount || undefined, {
    refetchInterval: 30_000,
  });

  const accountData = useMemo(() => {
    if (!view.data) return null;
    const live = liveQ.data?.data;
    if (!live) return view.data;
    return {
      ...view.data,
      currentBalance: live.balance ?? view.data.currentBalance,
      closedPnL: (live.balance ?? view.data.currentBalance) - view.data.startingBalance,
    };
  }, [view.data, liveQ.data]);

  const isBuilderAccount = accountData?.planType === "Builder";

  const chartData = useMemo(() => {
    if (!accountData) return [];
    return buildChartData(
      accountData,
      dateRange,
      dateRange === "daily" ? selectedDate : undefined,
    );
  }, [accountData, dateRange, selectedDate]);

  const formatCurrency = (value: number, showSign = false) => {
    const formatted = `$${Math.abs(value).toLocaleString()}`;
    if (showSign && value !== 0) {
      return value > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const scrollToStats = () => {
    document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const hasAccounts = accounts.length > 0;

  if (accountsQ.isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading dashboard…
      </div>
    );
  }

  if (accountsQ.isError) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 flex items-start gap-3">
        <AlertCircle className="text-destructive shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-medium text-foreground">Failed to load dashboard</p>
          <p className="text-sm text-muted-foreground mt-1">
            {accountsQ.error?.message ?? "Please try again."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-12 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Overview of your funded trading performance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {hasAccounts && (
              <>
                {/* Date Range Selector */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/20 border border-border/30">
                  {["daily", "weekly", "monthly"].map((range) => (
                    <Button
                      key={range}
                      variant="ghost"
                      size="sm"
                      className={`px-2.5 py-1.5 rounded-lg text-xs transition-all capitalize ${
                        dateRange === range
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setDateRange(range)}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </Button>
                  ))}
                </div>
                <AccountSelector
                  value={selectedAccount}
                  onValueChange={setSelectedAccount}
                />
                <OpenPlatformButton />
              </>
            )}
            {/* New Challenge button — always visible in top-right */}
            <Button asChild size="sm" variant={hasAccounts ? "outline" : "default"}>
              <Link to="/pricing">
                <Plus size={14} className="mr-2" />
                New Challenge
              </Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Loading selected account view */}
      {hasAccounts && view.isLoading && !accountData && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading account…
        </div>
      )}

      {/* Metrics — always shown; zeros when no account data */}
      <ScrollReveal delay={150}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <MetricCard
            title="Account Balance"
            value={accountData ? formatCurrency(accountData.currentBalance) : "$0"}
            icon={Wallet}
            trend={accountData ? (accountData.closedPnL >= 0 ? "up" : "down") : "neutral"}
            trendValue={accountData ? formatCurrency(accountData.closedPnL, true) : "—"}
          />
          <MetricCard
            title="Closed P&L"
            value={accountData ? formatCurrency(accountData.closedPnL, true) : "$0"}
            icon={TrendingUp}
            trend={accountData ? (accountData.closedPnL >= 0 ? "up" : "down") : "neutral"}
            trendValue={
              accountData
                ? `${((accountData.closedPnL / Math.max(accountData.startingBalance, 1)) * 100).toFixed(1)}%`
                : "0.0%"
            }
          />
          <MetricCard
            title="Drawdown Used"
            value={accountData ? formatCurrency(accountData.drawdownUsed) : "$0"}
            icon={ShieldAlert}
            trend="neutral"
            trendValue={accountData ? `of ${formatCurrency(accountData.maxDrawdown)}` : "of $0"}
          />
        </div>

        {accountData && (
          <div className="flex justify-center">
            <button
              onClick={scrollToStats}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
            >
              <span>Jump to Stats</span>
              <ChevronDown size={16} className="animate-bounce" />
            </button>
          </div>
        )}

        {/* Performance Chart */}
        {accountData ? (
          <PerformanceChart
            data={chartData}
            chartType={chartType}
            onChartTypeChange={setChartType}
            startingBalance={accountData.startingBalance}
            timeframe={dateRange}
            className="h-[calc(100vh-380px)] min-h-[400px]"
          />
        ) : (
          <div className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm flex flex-col items-center justify-center min-h-[300px] text-muted-foreground mt-3">
            <BarChart3 size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No trading data yet</p>
            <p className="text-xs mt-1 opacity-60">Purchase a challenge to start tracking performance</p>
          </div>
        )}
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal delay={300}>
        <div id="stats-section" className="pt-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Performance Overview</h2>
          </div>

          {accountData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Map size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {isBuilderAccount ? "Payout Tracker" : "Account Roadmap"}
                  </span>
                </div>
                {isBuilderAccount ? (
                  <BuilderPanel
                    accountId={selectedAccount}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                  />
                ) : (
                  <SummaryPanel
                    accountId={selectedAccount}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                  />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Trading Analytics
                  </span>
                </div>
                <AccountMetrics accountId={selectedAccount} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-8 flex flex-col items-center justify-center min-h-[200px] text-muted-foreground text-center">
                <Map size={32} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">Account Roadmap</p>
                <p className="text-xs mt-1 opacity-60">No account connected</p>
              </div>
              <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-8 flex flex-col items-center justify-center min-h-[200px] text-muted-foreground text-center">
                <BarChart3 size={32} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">Trading Analytics</p>
                <p className="text-xs mt-1 opacity-60">No account connected</p>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Daily Analytics */}
      <ScrollReveal delay={450}>
        <div className="pt-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Daily Analytics</h2>
              <p className="text-xs text-muted-foreground">
                {isToday(selectedDate)
                  ? "Today's trading performance"
                  : format(selectedDate, "MMMM d, yyyy")}
              </p>
            </div>
          </div>
          {accountData ? (
            <DailyAnalytics accountId={selectedAccount} selectedDate={selectedDate} />
          ) : (
            <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-8 flex flex-col items-center justify-center text-muted-foreground text-center">
              <Calendar size={32} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">No trading activity yet</p>
              <p className="text-xs mt-1 opacity-60">Daily stats will appear here once you start trading</p>
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
};

export default DashboardHome;
