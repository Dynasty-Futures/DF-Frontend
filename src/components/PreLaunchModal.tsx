import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'dynasty-prelaunch-seen';

interface PreLaunchModalProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

const PreLaunchModal = ({ externalOpen, onExternalClose }: PreLaunchModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only auto-open on first visit if not externally controlled
    if (externalOpen === undefined) {
      const hasSeen = localStorage.getItem(STORAGE_KEY);
      if (!hasSeen) {
        setIsOpen(true);
      }
    }
  }, [externalOpen]);

  // Determine actual open state
  const actualOpen = externalOpen !== undefined ? externalOpen : isOpen;

  const handleDismiss = () => {
    if (externalOpen !== undefined && onExternalClose) {
      onExternalClose();
    } else {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={actualOpen} onOpenChange={(open) => { if (!open) handleDismiss(); }}>
      <DialogContent className="bg-gradient-card border-border/50 max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="font-display text-xl md:text-2xl font-bold text-foreground">
            Dynasty Futures Is Launching Soon
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm md:text-base text-muted-foreground">
          <p>
            Dynasty Futures is currently preparing for launch in Q1 2026.
          </p>
          <p>
            We are focused on building a stable, transparent, and trader-first proprietary futures firm. During this pre-launch period, certain features and dashboards may be unavailable as we finalize infrastructure and operations.
          </p>
          <p>
            If you have questions or need assistance, our team is available to help.
          </p>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 pt-2">
          <Link 
            to="/support" 
            onClick={handleDismiss}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline text-center sm:text-left"
          >
            Contact Support
          </Link>
          <Button 
            onClick={handleDismiss}
            className="bg-gradient-to-r from-primary to-teal text-primary-foreground font-semibold btn-glow w-full sm:w-auto"
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreLaunchModal;
