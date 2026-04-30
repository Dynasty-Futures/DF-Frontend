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
} from "lucide-react";
import { format, isToday } from "date-fns";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AccountSelector from "@/components/dashboard/AccountSelector";
import OpenPlatformButton from "@/components/dashboard/OpenPlatformButton";
import BuyChallengeButton from "@/components/dashboard/BuyChallengeButton";
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

  // Toast + cache invalidation when returning from successful Stripe checkout.
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

  // Selected account: ?account=ID query param wins, else first account.
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

  // Merge live balance over the adapted view so top metrics show real-time.
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

  // Real-data chart; daily view aligns to the user-selected calendar date.
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
    document
      .getElementById("stats-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Loading the accounts list itself
  if (accountsQ.isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading dashboard…
      </div>
    );
  }

  // List failed
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

  // No accounts → empty state
  if (accounts.length === 0) {
    return (
      <div className="space-y-10 pt-16 lg:pt-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Get started by purchasing your first challenge.
          </p>
        </div>
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-12 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            No accounts yet
          </h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Once you purchase a challenge, your trading dashboard will populate
            here.
          </p>
          <div className="flex items-center justify-center gap-3">
            <BuyChallengeButton size="default" />
            <Button asChild variant="outline">
              <Link to="/pricing">Browse Plans</Link>
            </Button>
          </div>
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
            {/* Date Range Selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/20 border border-border/30">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${dateRange === "daily" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setDateRange("daily")}
              >
                Daily
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${dateRange === "weekly" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setDateRange("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${dateRange === "monthly" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setDateRange("monthly")}
              >
                Monthly
              </Button>
            </div>
            <AccountSelector
              value={selectedAccount}
              onValueChange={setSelectedAccount}
            />
            <OpenPlatformButton />
            <BuyChallengeButton variant="outline" />
          </div>
        </div>
      </ScrollReveal>

      {/* Loading the selected account view */}
      {view.isLoading && !accountData && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading account…
        </div>
      )}

      {accountData && (
        <>
          {/* Key Metrics */}
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <MetricCard
                title="Account Balance"
                value={formatCurrency(accountData.currentBalance)}
                icon={Wallet}
                trend={accountData.closedPnL >= 0 ? "up" : "down"}
                trendValue={formatCurrency(accountData.closedPnL, true)}
              />
              <MetricCard
                title="Closed P&L"
                value={formatCurrency(accountData.closedPnL, true)}
                icon={TrendingUp}
                trend={accountData.closedPnL >= 0 ? "up" : "down"}
                trendValue={`${((accountData.closedPnL / Math.max(accountData.startingBalance, 1)) * 100).toFixed(1)}%`}
              />
              <MetricCard
                title="Drawdown Used"
                value={formatCurrency(accountData.drawdownUsed)}
                icon={ShieldAlert}
                trend="neutral"
                trendValue={`of ${formatCurrency(accountData.maxDrawdown)}`}
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={scrollToStats}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
              >
                <span>Jump to Stats</span>
                <ChevronDown size={16} className="animate-bounce" />
              </button>
            </div>

            <PerformanceChart
              data={chartData}
              chartType={chartType}
              onChartTypeChange={setChartType}
              startingBalance={accountData.startingBalance}
              timeframe={dateRange}
              className="h-[calc(100vh-380px)] min-h-[400px]"
            />
          </ScrollReveal>

          {/* Stats Section */}
          <ScrollReveal delay={300}>
            <div id="stats-section" className="pt-8">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Performance Overview
                </h2>
              </div>

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
            </div>
          </ScrollReveal>

          {/* Daily Analytics */}
          <ScrollReveal delay={450}>
            <div className="pt-8">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className="text-primary" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Daily Analytics
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {isToday(selectedDate)
                      ? "Today's trading performance"
                      : format(selectedDate, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              <DailyAnalytics
                accountId={selectedAccount}
                selectedDate={selectedDate}
              />
            </div>
          </ScrollReveal>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
