import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import OpenPlatformButton from '@/components/dashboard/OpenPlatformButton';
import { useTradingAccounts, useIframeUrl } from '@/hooks/useTrading';

const DashboardTrade = () => {
  const accountsQ = useTradingAccounts();
  const accounts = accountsQ.data?.data ?? [];
  const hasAccounts = accounts.length > 0;

  // The embed is the full Volumetrica web platform, which has its own built-in
  // account switcher — so we mint a single user-scoped session and let the
  // trader change accounts inside the platform itself. (A DF-side dropdown
  // can't reliably re-scope the embed, since the minted session is keyed to the
  // trader, not an individual account.)
  const iframeQ = useIframeUrl(undefined, { enabled: hasAccounts });
  const iframeUrl = iframeQ.data?.data.url;

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <ScrollReveal>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trade</h1>
            <p className="text-muted-foreground mt-1">
              Live trading via DeepCharts, embedded right here. Switch between
              your accounts directly inside the platform.
            </p>
          </div>
          <OpenPlatformButton variant="outline" size="default" />
        </div>
      </ScrollReveal>

      {/* Loading list */}
      {accountsQ.isLoading && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading…
        </div>
      )}

      {/* No accounts */}
      {!accountsQ.isLoading && !hasAccounts && (
        <div className="rounded-2xl border border-border/30 bg-card/50 p-8 text-center text-muted-foreground">
          You don't have any trading accounts yet.
        </div>
      )}

      {/* iFrame */}
      {hasAccounts && iframeQ.isLoading && (
        <div className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm flex items-center justify-center min-h-[600px] text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={18} /> Connecting to
          trading platform…
        </div>
      )}

      {hasAccounts && iframeQ.isError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 flex items-start gap-3">
          <AlertCircle className="text-destructive shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="font-medium text-foreground">
              Failed to load trading platform
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {iframeQ.error?.message ??
                'Try the "DeepCharts" button to launch in a new tab.'}
            </p>
          </div>
        </div>
      )}

      {hasAccounts && iframeUrl && (
        <div className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <iframe
            src={iframeUrl}
            title="Trading Platform"
            className="w-full h-[calc(100vh-220px)] min-h-[600px] border-0"
            allow="clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          <div className="flex items-center justify-end gap-2 p-2 border-t border-border/30 text-xs text-muted-foreground">
            <ExternalLink size={12} />
            <span>Embedded via DeepCharts</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTrade;
