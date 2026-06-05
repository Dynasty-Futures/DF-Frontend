import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardUrl } from '@/hooks/useTrading';
import { toast } from 'sonner';

interface OpenPlatformButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

/**
 * Fetches a one-time SSO URL on click and opens the trading platform in a
 * new tab. The URL is single-use, so we deliberately call refetch() each
 * click instead of caching.
 */
const OpenPlatformButton = ({
  variant = 'outline',
  size = 'sm',
  className,
}: OpenPlatformButtonProps) => {
  const { refetch, isFetching } = useDashboardUrl();

  const handleClick = async () => {
    try {
      const result = await refetch();
      const url = result.data?.data.url;
      if (!url) {
        toast.error('Could not generate trading link. Try again in a moment.');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to open trading platform',
      );
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isFetching}
      className={className}
    >
      {isFetching ? (
        <Loader2 size={14} className="mr-2 animate-spin" />
      ) : (
        <img src="/deepcharts-logo.png" alt="" className="h-4 w-4 mr-2 object-contain" />
      )}
      DeepCharts
    </Button>
  );
};

export default OpenPlatformButton;
