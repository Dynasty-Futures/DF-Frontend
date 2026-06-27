import { useMemo } from "react";
import { Clock, Loader2, ListOrdered } from "lucide-react";
import { differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import { useAccountTrades } from "@/hooks/useTrading";

interface AccountTradeLogProps {
  accountId: string;
}

const toNum = (v: string | number | null | undefined): number => {
  if (v === null || v === undefined) return 0;
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

const fmtCurrency = (value: number): string => {
  const formatted = `$${Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
  return value < 0 ? `-${formatted}` : `+${formatted}`;
};

const fmtDateTime = (iso: string): string =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const fmtDuration = (entryIso: string, exitIso: string | null): string => {
  if (!exitIso) return "Open";
  const mins = differenceInMinutes(new Date(exitIso), new Date(entryIso));
  if (mins < 1) return "<1m";
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${mins}m`;
};

/**
 * Account-wide trade log — every trade taken on the selected account (most
 * recent first), net of commission. Distinct from the journal's per-day log.
 */
const AccountTradeLog = ({ accountId }: AccountTradeLogProps) => {
  const { data, isLoading } = useAccountTrades(accountId || undefined);

  const trades = useMemo(() => {
    const all = data?.data ?? [];
    return [...all].sort(
      (a, b) =>
        new Date(b.exitTime ?? b.entryTime).getTime() -
        new Date(a.exitTime ?? a.entryTime).getTime(),
    );
  }, [data]);

  return (
    <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
      <div className="p-5 border-b border-border/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListOrdered size={18} className="text-gold-dark" />
          <h3 className="text-base font-semibold text-foreground">Trade Log</h3>
        </div>
        {trades.length > 0 && (
          <span className="text-[11px] font-medium text-foreground bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {trades.length} {trades.length === 1 ? "trade" : "trades"}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
          <Loader2 className="animate-spin" size={18} /> Loading trades…
        </div>
      ) : trades.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Clock size={28} className="mb-2 opacity-40" />
          <p className="text-sm">No trades on this account yet</p>
        </div>
      ) : (
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card/95 backdrop-blur-sm z-10">
              <tr className="border-b border-border/30">
                {[
                  "Date",
                  "Symbol",
                  "Side",
                  "Qty",
                  "Entry",
                  "Exit",
                  "Duration",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
                <th className="text-right py-2.5 px-3 text-xs text-muted-foreground font-medium">
                  P&L
                </th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, i) => {
                const direction = trade.side === "BUY" ? "Long" : "Short";
                const pnl = toNum(trade.realizedPnl) - toNum(trade.commission);
                return (
                  <tr
                    key={trade.id}
                    className={cn(
                      "border-b border-border/10 hover:bg-muted/10 transition-colors",
                      i % 2 === 1 && "bg-muted/[0.03]",
                    )}
                  >
                    <td className="py-2.5 px-3 text-foreground text-xs whitespace-nowrap">
                      {fmtDateTime(trade.exitTime ?? trade.entryTime)}
                    </td>
                    <td className="py-2.5 px-3 text-foreground font-medium">
                      {trade.symbol}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={cn(
                          "text-xs font-medium px-1.5 py-0.5 rounded",
                          direction === "Long"
                            ? "text-emerald-500 bg-emerald-500/10"
                            : "text-destructive bg-destructive/10",
                        )}
                      >
                        {direction}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground text-xs">
                      {trade.quantity}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground text-xs">
                      {toNum(trade.entryPrice).toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground text-xs">
                      {trade.exitPrice ? toNum(trade.exitPrice).toFixed(2) : "—"}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground text-xs whitespace-nowrap">
                      {fmtDuration(trade.entryTime, trade.exitTime)}
                    </td>
                    <td
                      className={cn(
                        "py-2.5 px-3 text-right font-semibold text-xs whitespace-nowrap",
                        trade.realizedPnl === null
                          ? "text-muted-foreground"
                          : pnl >= 0
                            ? "text-emerald-500"
                            : "text-destructive",
                      )}
                    >
                      {trade.realizedPnl !== null ? fmtCurrency(pnl) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountTradeLog;
