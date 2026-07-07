import { Loader2, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import OpenPlatformButton from '@/components/dashboard/OpenPlatformButton';
import { useTradingAccounts } from '@/hooks/useTrading';
import deepchartsLogo from '@/assets/deepcharts-logo.png';

const DashboardTrade = () => {
  const accountsQ = useTradingAccounts();
  const accounts = accountsQ.data?.data ?? [];
  const hasAccounts = accounts.length > 0;

  // Trading runs on the hosted Volumetrica/DeepCharts platform, where the trader
  // self-authenticates (email + per-account password shown on the dashboard).
  // We launch it in a new tab rather than embedding: the hosted login can't be
  // iframed, and our Volumetrica session-mint isn't available for trader orgs.
  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <ScrollReveal>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trade</h1>
            <p className="text-muted-foreground mt-1">
              Launch the full trading platform to place and manage your orders.
            </p>
          </div>
          <OpenPlatformButton variant="outline" size="default" />
        </div>
      </ScrollReveal>

      {accountsQ.isLoading && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading…
        </div>
      )}

      {!accountsQ.isLoading && !hasAccounts && (
        <div className="rounded-2xl border border-border/30 bg-card/50 p-8 text-center text-muted-foreground">
          You don't have any trading accounts yet.
        </div>
      )}

      {!accountsQ.isLoading && hasAccounts && (
        <ScrollReveal>
          <div className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm p-8 sm:p-12 flex flex-col items-center text-center min-h-[420px] justify-center gap-6">
            <img
              src={deepchartsLogo}
              alt="DeepCharts"
              className="h-10 w-auto object-contain opacity-90"
            />
            <div className="space-y-2 max-w-md">
              <h2 className="text-xl font-semibold text-foreground">
                Trade on the DeepCharts platform
              </h2>
              <p className="text-sm text-muted-foreground">
                Your live charts, order entry, and positions open in the full
                trading platform. Sign in with the login and password from your
                account credentials, then pick the account you want to trade.
              </p>
            </div>
            <OpenPlatformButton variant="default" size="lg" />
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ExternalLink size={12} />
              Opens in a new tab
            </p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
};

export default DashboardTrade;
