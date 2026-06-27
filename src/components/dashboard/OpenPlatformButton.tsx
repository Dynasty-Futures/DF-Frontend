import { useState } from 'react';
import {
  ExternalLink,
  Loader2,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Server,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDashboardUrl } from '@/hooks/useTrading';
import { toast } from 'sonner';
import deepchartsLogo from '@/assets/deepcharts-logo.png';

interface PlatformCredentials {
  login: string;
  password: string;
}

interface OpenPlatformButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  /**
   * The selected account's platform login. When provided, clicking opens a
   * credentials popup (mirrors YPF's "Trade Now" dialog) and the user launches
   * from there. When absent, the button launches the platform directly.
   */
  credentials?: PlatformCredentials | undefined;
}

const copyToClipboard = (text: string, label: string): void => {
  navigator.clipboard?.writeText(text).then(
    () => toast.success(`${label} copied`),
    () => toast.error('Copy failed'),
  );
};

interface CredFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  mono?: boolean;
  children?: React.ReactNode;
}

const CredField = ({ label, value, icon, mono = true, children }: CredFieldProps) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border border-border/30 bg-muted/10 p-3">
    <div className="flex items-center gap-2 min-w-0">
      <div className="p-1.5 rounded-md bg-muted/50 flex-shrink-0">{icon}</div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2 min-w-0">
      <button
        type="button"
        onClick={() => copyToClipboard(value, label)}
        className={`text-xs text-foreground hover:text-primary transition-colors truncate ${mono ? 'font-mono' : 'font-medium'}`}
        title="Click to copy"
      >
        {children ?? value}
      </button>
    </div>
  </div>
);

/**
 * Launches the trading platform. With account credentials, it first shows a
 * popup with the trader's login/password (revealable + click-to-copy) and a
 * "Launch Platform" button that opens the platform in a new tab. The SSO/portal
 * URL is one-time-use, so we refetch() on each launch instead of caching.
 */
const OpenPlatformButton = ({
  variant = 'outline',
  size = 'sm',
  className,
  credentials,
}: OpenPlatformButtonProps) => {
  const { refetch, isFetching } = useDashboardUrl();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const launch = async () => {
    try {
      const result = await refetch();
      const url = result.data?.data.url;
      if (!url) {
        toast.error('Could not generate trading link. Try again in a moment.');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
      setOpen(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to open trading platform',
      );
    }
  };

  const handleTriggerClick = () => {
    if (credentials) {
      setShowPassword(false);
      setOpen(true);
    } else {
      void launch();
    }
  };

  // The trigger only shows a loading state when it launches directly (no popup);
  // with a popup, the loading state lives on the in-dialog launch button.
  const triggerLoading = isFetching && !credentials;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleTriggerClick}
        disabled={triggerLoading}
        className={className}
      >
        {triggerLoading ? (
          <>
            <Loader2 size={14} className="mr-2 animate-spin flex-shrink-0" />
            Launching…
          </>
        ) : (
          <>
            <ExternalLink size={14} className="mr-2 flex-shrink-0" />
            Launch
            <img
              src={deepchartsLogo}
              alt="DeepCharts"
              className="ml-2 w-auto object-contain flex-shrink-0"
              style={{ height: '18px' }}
            />
          </>
        )}
      </Button>

      {credentials && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Launch Trading Platform</DialogTitle>
              <DialogDescription>
                Sign in to the platform with the credentials below. Click any
                value to copy it.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 py-1">
              <CredField
                label="Server"
                value="DynastyFutures"
                mono={false}
                icon={<Server size={14} className="text-primary" />}
              />
              <CredField
                label="Login"
                value={credentials.login}
                icon={<KeyRound size={14} className="text-gold-dark" />}
              />
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-md bg-muted/50 flex-shrink-0">
                    <KeyRound size={14} className="text-gold-dark" />
                  </div>
                  <span className="text-xs text-muted-foreground">Password</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(credentials.password, 'Password')}
                    className="text-xs font-mono text-foreground hover:text-primary transition-colors truncate"
                    title="Click to copy"
                  >
                    {showPassword ? credentials.password : '••••••••'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    title={showPassword ? 'Hide' : 'Show'}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={launch} disabled={isFetching} className="w-full sm:w-auto">
                {isFetching ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    Launching…
                  </>
                ) : (
                  <>
                    <ExternalLink size={14} className="mr-2" />
                    Launch Platform
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OpenPlatformButton;
