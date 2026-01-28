import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, FileText, BookOpen, ChevronRight, MessageCircle, Headphones, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PreLaunchModal from '@/components/PreLaunchModal';

interface HelpCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to?: string;
  external?: boolean;
  onClick?: () => void;
}

const HelpCard = ({ title, description, icon, to, external, onClick }: HelpCardProps) => {
  const CardContent = (
    <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/30 hover:bg-card/70 hover:translate-y-[-2px] group cursor-pointer relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-start gap-5">
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">{description}</p>
          </div>
        </div>
        <ChevronRight size={24} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {CardContent}
      </button>
    );
  }

  if (external && to) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {CardContent}
      </a>
    );
  }

  return (
    <Link to={to || '/'}>
      {CardContent}
    </Link>
  );
};

const DashboardHelp = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
        <p className="text-muted-foreground mt-1">Find answers and get support</p>
      </div>

      {/* Resources Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold text-foreground">Resources</h3>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <HelpCard
            title="Frequently Asked Questions"
            description="Find answers to common questions about trading, payouts, and more."
            icon={<HelpCircle size={28} className="text-primary" />}
            to="/faq"
          />
          
          <HelpCard
            title="Trading Rules"
            description="Review the complete trading rules for all account types and plans."
            icon={<FileText size={28} className="text-primary" />}
            to="/rules"
          />
          
          <HelpCard
            title="Getting Started Guide"
            description="New to Dynasty Futures? Learn how to get started with your trading journey."
            icon={<BookOpen size={28} className="text-primary" />}
            to="/faq#getting-started"
          />
          
          <HelpCard
            title="Pre-Launch Announcement"
            description="View the Dynasty Futures pre-launch announcement and launch timeline."
            icon={<Rocket size={28} className="text-primary" />}
            onClick={() => setShowAnnouncement(true)}
          />
        </div>
      </div>

      {/* Support Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-teal rounded-full" />
          <h3 className="text-lg font-semibold text-foreground">Support</h3>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <HelpCard
            title="Contact Support"
            description="Need help? Our support team is ready to assist you."
            icon={<MessageCircle size={28} className="text-primary" />}
            to="/support"
          />
        </div>
      </div>

      {/* Direct Contact */}
      <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 relative overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-teal/5 pointer-events-none" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
              <Headphones size={32} className="text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-lg">Email Support</h4>
              <p className="text-muted-foreground mt-1">Get help directly via email</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a 
              href="mailto:support@dynastyfuturesdyn.com" 
              className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              support@dynastyfuturesdyn.com
            </a>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => navigator.clipboard.writeText('support@dynastyfuturesdyn.com')}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
      
      <PreLaunchModal 
        externalOpen={showAnnouncement} 
        onExternalClose={() => setShowAnnouncement(false)} 
      />
    </div>
  );
};

export default DashboardHelp;
