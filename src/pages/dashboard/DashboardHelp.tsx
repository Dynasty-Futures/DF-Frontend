import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, FileText, BookOpen, ChevronRight, MessageCircle, Headphones, Rocket, Ticket, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PreLaunchModal from '@/components/PreLaunchModal';
import { useTicketsByEmail } from '@/hooks/useSupport';
import type { TicketStatus, TicketPriority } from '@/types/support';

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

const statusColors: Record<TicketStatus, string> = {
  OPEN: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  IN_PROGRESS: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  WAITING_RESPONSE: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  RESOLVED: 'bg-primary/20 text-primary border-primary/30',
  CLOSED: 'bg-muted/50 text-muted-foreground border-border/50',
};

const statusLabels: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  WAITING_RESPONSE: 'Waiting',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

const priorityLabels: Record<TicketPriority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

const DashboardHelp = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [lookupEmail, setLookupEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Only fetch when the user has submitted an email
  const { data: ticketsResponse, isLoading: ticketsLoading, isError } = useTicketsByEmail(
    submittedEmail,
  );
  const myTickets = ticketsResponse?.data ?? [];

  const handleEmailLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupEmail.trim()) {
      setSubmittedEmail(lookupEmail.trim().toLowerCase());
    }
  };

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

      {/* My Tickets Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold text-foreground">My Tickets</h3>
        </div>

        <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
          <p className="text-sm text-muted-foreground mb-4">
            Enter your email to view your support tickets.
          </p>
          <form onSubmit={handleEmailLookup} className="flex gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className="max-w-sm bg-muted/30 border-border/50"
              required
            />
            <Button type="submit" variant="outline" disabled={ticketsLoading}>
              {ticketsLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Ticket className="h-4 w-4 mr-2" />
              )}
              {ticketsLoading ? '' : 'Look Up'}
            </Button>
          </form>

          {/* Results */}
          {submittedEmail && !ticketsLoading && (
            <div className="mt-6 space-y-3">
              {isError && (
                <p className="text-sm text-destructive">
                  Failed to load tickets. Make sure the backend is running.
                </p>
              )}
              {!isError && myTickets.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No tickets found for {submittedEmail}.
                </p>
              )}
              {myTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {' · '}
                      {priorityLabels[ticket.priority]} priority
                    </p>
                  </div>
                  <Badge variant="outline" className={`ml-3 shrink-0 ${statusColors[ticket.status]}`}>
                    {statusLabels[ticket.status]}
                  </Badge>
                </div>
              ))}
            </div>
          )}
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
