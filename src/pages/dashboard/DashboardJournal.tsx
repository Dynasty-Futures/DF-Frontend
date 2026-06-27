import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  format,
  parseISO,
  isToday,
  addDays,
  subDays,
  isSameDay,
  differenceInMinutes,
} from "date-fns";
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
  BookOpen,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTradingAccounts, useAccountTrades } from "@/hooks/useTrading";
import { useSelectedAccount } from "@/hooks/useSelectedAccount";
import { useJournalEntry, useSaveJournalEntry } from "@/hooks/useJournal";
import type { Trade } from "@/types/trading";

const formatCurrency = (value: number, showSign = true) => {
  const formatted = `$${Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
  if (showSign && value !== 0) {
    return value > 0 ? `+${formatted}` : `-${formatted}`;
  }
  return formatted;
};

const formatTime = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDuration = (entryIso: string, exitIso: string | null): string => {
  if (!exitIso) return "—";
  const mins = differenceInMinutes(new Date(exitIso), new Date(entryIso));
  if (mins < 1) return "<1m";
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remaining = mins % 60;
    return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
  }
  return `${mins}m`;
};

const DashboardJournal = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();

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

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  // Account selection — shared with the dashboard via ?account= + localStorage,
  // so opening a calendar day shows the account you were viewing (not the first
  // in the list) and switching here persists back to the dashboard.
  const accountsQ = useTradingAccounts();
  const accounts = useMemo(
    () => accountsQ.data?.data ?? [],
    [accountsQ.data],
  );
  const accountIds = useMemo(() => accounts.map((a) => a.id), [accounts]);
  const [accountId, setAccountId] = useSelectedAccount(accountIds);

  const tradesQ = useAccountTrades(accountId || undefined);
  const allTrades = useMemo(() => tradesQ.data?.data ?? [], [tradesQ.data]);

  // Filter trades whose entry time falls on the selected date.
  const dayTrades: Trade[] = useMemo(
    () =>
      allTrades.filter((t) => {
        return isSameDay(new Date(t.entryTime), selectedDate);
      }),
    [allTrades, selectedDate],
  );

  // Daily stats derived from the filtered trades.
  const dayData = useMemo(() => {
    const closed = dayTrades.filter(
      (t) => t.realizedPnl !== null && t.exitTime,
    );
    const pnls = closed.map((t) => Number(t.realizedPnl ?? 0));
    const wins = pnls.filter((p) => p > 0);
    const dailyPnl = pnls.reduce((s, p) => s + p, 0);
    const losses = pnls.filter((p) => p < 0);
    const dailyDrawdown = Math.abs(losses.reduce((s, p) => s + p, 0));

    const bestPnl = pnls.length ? Math.max(...pnls) : 0;
    const worstPnl = pnls.length ? Math.min(...pnls) : 0;
    const bestTrade = closed.find((t) => Number(t.realizedPnl) === bestPnl);
    const worstTrade = closed.find((t) => Number(t.realizedPnl) === worstPnl);

    return {
      pnl: dailyPnl,
      hasTrades: closed.length > 0,
      tradesCount: closed.length,
      winRate: closed.length
        ? Math.round((wins.length / closed.length) * 100)
        : 0,
      dailyDrawdown,
      bestTrade: bestTrade
        ? { amount: bestPnl, instrument: bestTrade.symbol }
        : null,
      worstTrade: worstTrade
        ? { amount: worstPnl, instrument: worstTrade.symbol }
        : null,
    };
  }, [dayTrades]);

  // Journal entry — server-persisted per account + day, so notes follow the
  // trader across devices.
  const entryQ = useJournalEntry(accountId || undefined, dateKey);
  const saveMut = useSaveJournalEntry(accountId || undefined);

  const [journalEntry, setJournalEntry] = useState("");
  // Clear the editor immediately on account/date switch (no stale flash of the
  // previous day's note while the new one loads).
  const syncedKeyRef = useRef("");
  useEffect(() => {
    setJournalEntry("");
    syncedKeyRef.current = "";
  }, [accountId, dateKey]);
  // Seed the editor once the entry for the current account/date resolves.
  useEffect(() => {
    const key = `${accountId}|${dateKey}`;
    if (entryQ.isSuccess && syncedKeyRef.current !== key) {
      setJournalEntry(entryQ.data.data.content);
      syncedKeyRef.current = key;
    }
  }, [entryQ.isSuccess, entryQ.data, accountId, dateKey]);

  const handleSave = () => {
    if (!accountId) return;
    saveMut.mutate(
      { date: dateKey, content: journalEntry },
      {
        onSuccess: () => toast.success("Journal entry saved"),
        onError: () => toast.error("Failed to save journal entry"),
      },
    );
  };

  const accountQuery = accountId
    ? `?account=${encodeURIComponent(accountId)}`
    : "";

  const navigateDay = (direction: "prev" | "next") => {
    const newDate =
      direction === "prev"
        ? subDays(selectedDate, 1)
        : addDays(selectedDate, 1);
    navigate(`/dashboard/journal/${format(newDate, "yyyy-MM-dd")}${accountQuery}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/dashboard${accountQuery}`)}
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Calendar
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDay("prev")}
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="text-center min-w-[180px]">
            <h2 className="text-lg font-semibold text-foreground">
              {format(selectedDate, "MMMM d, yyyy")}
            </h2>
            {isToday(selectedDate) && (
              <span className="text-xs text-primary">Today</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDay("next")}
            disabled={isToday(selectedDate)}
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        {accounts.length > 0 ? (
          <Select value={accountId} onValueChange={setAccountId}>
            <SelectTrigger className="w-[220px] bg-card/50 border-border/30 backdrop-blur-sm rounded-xl">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.accountType.displayName || a.accountType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="w-[140px]" />
        )}
      </div>

      {/* Loading */}
      {(accountsQ.isLoading || (accountId && tradesQ.isLoading)) && (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading trades…
        </div>
      )}

      {/* Empty: no accounts */}
      {!accountsQ.isLoading && accounts.length === 0 && (
        <div className="rounded-2xl border border-border/30 bg-card/50 p-8 text-center text-muted-foreground">
          You don't have any trading accounts yet.
        </div>
      )}

      {!tradesQ.isLoading && accountId && (
        <>
          {/* Daily Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div
              className={cn(
                "p-4 rounded-xl border",
                dayData.pnl >= 0
                  ? "bg-primary/5 border-primary/20"
                  : "bg-destructive/5 border-destructive/20",
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {dayData.pnl >= 0 ? (
                  <TrendingUp size={16} className="text-primary" />
                ) : (
                  <TrendingDown size={16} className="text-destructive" />
                )}
                <span className="text-xs text-muted-foreground">Day's P&L</span>
              </div>
              <span
                className={cn(
                  "text-xl font-bold",
                  dayData.pnl >= 0 ? "text-primary" : "text-destructive",
                )}
              >
                {dayData.hasTrades ? formatCurrency(dayData.pnl) : "--"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="flex items-center gap-2 mb-2">
                <Target size={16} className="text-gold-dark" />
                <span className="text-xs text-muted-foreground">Trades</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {dayData.tradesCount}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="flex items-center gap-2 mb-2">
                <Award size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">Win Rate</span>
              </div>
              <span
                className={cn(
                  "text-xl font-bold",
                  dayData.winRate >= 60
                    ? "text-primary"
                    : dayData.winRate >= 40
                      ? "text-foreground"
                      : "text-destructive",
                )}
              >
                {dayData.hasTrades ? `${dayData.winRate}%` : "--"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert size={16} className="text-yellow-500" />
                <span className="text-xs text-muted-foreground">
                  Loss Realized
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {dayData.hasTrades
                  ? formatCurrency(dayData.dailyDrawdown, false)
                  : "--"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">Best Trade</span>
              </div>
              <div>
                <span className="text-xl font-bold text-primary">
                  {dayData.bestTrade
                    ? formatCurrency(dayData.bestTrade.amount)
                    : "--"}
                </span>
                {dayData.bestTrade && (
                  <span className="text-xs text-muted-foreground ml-1">
                    {dayData.bestTrade.instrument}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={16} className="text-destructive" />
                <span className="text-xs text-muted-foreground">
                  Worst Trade
                </span>
              </div>
              <div>
                <span className="text-xl font-bold text-destructive">
                  {dayData.worstTrade
                    ? formatCurrency(dayData.worstTrade.amount)
                    : "--"}
                </span>
                {dayData.worstTrade && (
                  <span className="text-xs text-muted-foreground ml-1">
                    {dayData.worstTrade.instrument}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Trade Log & Journal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-gold-dark" />
                <h3 className="text-base font-semibold text-foreground">
                  Trade Log
                </h3>
              </div>

              {dayTrades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                          Entry
                        </th>
                        <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                          Exit
                        </th>
                        <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                          Duration
                        </th>
                        <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                          Symbol
                        </th>
                        <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                          Side
                        </th>
                        <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">
                          Price In
                        </th>
                        <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">
                          Price Out
                        </th>
                        <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">
                          P&L
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayTrades.map((trade) => {
                        const direction = trade.side === "BUY" ? "Long" : "Short";
                        const pnl = Number(trade.realizedPnl ?? 0);
                        return (
                          <tr
                            key={trade.id}
                            className="border-b border-border/10 hover:bg-muted/10"
                          >
                            <td className="py-2 px-2 text-foreground text-xs">
                              {formatTime(trade.entryTime)}
                            </td>
                            <td className="py-2 px-2 text-foreground text-xs">
                              {trade.exitTime
                                ? formatTime(trade.exitTime)
                                : "Open"}
                            </td>
                            <td className="py-2 px-2 text-muted-foreground text-xs">
                              {formatDuration(trade.entryTime, trade.exitTime)}
                            </td>
                            <td className="py-2 px-2 text-foreground font-medium">
                              {trade.symbol}
                            </td>
                            <td className="py-2 px-2">
                              <span
                                className={cn(
                                  "text-xs font-medium px-1.5 py-0.5 rounded",
                                  direction === "Long"
                                    ? "text-primary bg-primary/10"
                                    : "text-destructive bg-destructive/10",
                                )}
                              >
                                {direction}
                              </span>
                            </td>
                            <td className="py-2 px-2 text-right text-muted-foreground text-xs">
                              {Number(trade.entryPrice).toFixed(2)}
                            </td>
                            <td className="py-2 px-2 text-right text-muted-foreground text-xs">
                              {trade.exitPrice
                                ? Number(trade.exitPrice).toFixed(2)
                                : "—"}
                            </td>
                            <td
                              className={cn(
                                "py-2 px-2 text-right font-semibold text-xs",
                                pnl >= 0 ? "text-primary" : "text-destructive",
                              )}
                            >
                              {trade.realizedPnl !== null
                                ? formatCurrency(pnl)
                                : "—"}
                            </td>
                          </tr>
                        );
                      })}
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
                  <h3 className="text-base font-semibold text-foreground">
                    Journal Entry
                  </h3>
                </div>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saveMut.isPending || !accountId}
                  className="gap-2"
                >
                  {saveMut.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {saveMut.isPending ? "Saving…" : "Save Entry"}
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
                Your journal entries are saved to your account and sync across
                devices.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardJournal;
