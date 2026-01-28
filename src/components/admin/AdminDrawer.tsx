import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AdminDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
  headerActions?: React.ReactNode;
}

const widthClasses = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function AdminDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = 'lg',
  headerActions,
}: AdminDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full border-l border-border/30 bg-card shadow-xl',
          'animate-in slide-in-from-right duration-300',
          widthClasses[width]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/30 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold font-display text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {headerActions}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(100vh-73px)]">
          <div className="p-6">{children}</div>
        </ScrollArea>
      </div>
    </>
  );
}
