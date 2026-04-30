import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  FileText,
  BookOpen,
  ChevronRight,
  MessageCircle,
  Headphones,
  Rocket,
  Ticket,
  Loader2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import PreLaunchModal from "@/components/PreLaunchModal";
import {
  useTicketsByEmail,
  useUserTickets,
  useCreateTicket,
} from "@/hooks/useSupport";
import { useAuth } from "@/hooks/useAuth";
import type {
  SupportTicket,
  TicketStatus,
  TicketPriority,
} from "@/types/support";
import { toast } from "sonner";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HelpCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to?: string;
  external?: boolean;
  onClick?: () => void;
}

const HelpCard = ({
  title,
  description,
  icon,
  to,
  external,
  onClick,
}: HelpCardProps) => {
  const CardContent = (
    <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/30 hover:bg-card/70 hover:translate-y-[-2px] group cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-start gap-5">
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              {description}
            </p>
          </div>
        </div>
        <ChevronRight
          size={24}
          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
        />
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

  return <Link to={to || "/"}>{CardContent}</Link>;
};

const statusColors: Record<TicketStatus, string> = {
  OPEN: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  IN_PROGRESS: "bg-primary/20 text-primary border-primary/30",
  WAITING_RESPONSE: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  RESOLVED: "bg-primary/20 text-primary border-primary/30",
  CLOSED: "bg-muted/50 text-muted-foreground border-border/50",
};

const statusLabels: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  WAITING_RESPONSE: "Waiting",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const priorityLabels: Record<TicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

const TicketRow = ({ ticket }: { ticket: SupportTicket }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/30">
    <div className="flex-1 min-w-0">
      <p className="font-medium text-foreground truncate">{ticket.subject}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {new Date(ticket.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        {" · "}
        {priorityLabels[ticket.priority]} priority
      </p>
    </div>
    <Badge
      variant="outline"
      className={`ml-3 shrink-0 ${statusColors[ticket.status]}`}
    >
      {statusLabels[ticket.status]}
    </Badge>
  </div>
);

const DashboardHelp = () => {
  const { user } = useAuth();
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  // Logged-in user's tickets — primary path.
  const myTicketsQ = useUserTickets(user?.id ?? "");
  const myTickets = myTicketsQ.data?.data ?? [];

  // Email lookup is still available for anonymous lookups (e.g. tickets
  // submitted before the user signed up).
  const [lookupEmail, setLookupEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const lookupQ = useTicketsByEmail(submittedEmail);
  const lookupTickets = lookupQ.data?.data ?? [];

  // Create-ticket form
  const createTicket = useCreateTicket();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("MEDIUM");

  const handleEmailLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupEmail.trim()) {
      setSubmittedEmail(lookupEmail.trim().toLowerCase());
    }
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim().length < 5 || description.trim().length < 10) {
      toast.error("Subject must be ≥ 5 chars and description ≥ 10 chars.");
      return;
    }
    createTicket.mutate(
      {
        subject: subject.trim(),
        description: description.trim(),
        priority,
        ...(user?.id ? { creatorId: user.id } : {}),
        ...(user
          ? {}
          : { email: lookupEmail || undefined }),
      },
      {
        onSuccess: () => {
          toast.success("Support ticket submitted");
          setSubject("");
          setDescription("");
          setPriority("MEDIUM");
        },
        onError: (err) =>
          toast.error(err.message || "Failed to submit ticket"),
      },
    );
  };

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground mt-1">
            Find answers and get support
          </p>
        </div>
      </ScrollReveal>

      {/* Resources */}
      <ScrollReveal delay={150}>
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
              description="New here? Learn how to get started with your trading journey."
              icon={<BookOpen size={28} className="text-primary" />}
              to="/faq#getting-started"
            />

            <HelpCard
              title="Pre-Launch Announcement"
              description="View the pre-launch announcement and launch timeline."
              icon={<Rocket size={28} className="text-primary" />}
              onClick={() => setShowAnnouncement(true)}
            />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={300} className="space-y-10">
        {/* Submit a request */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gold-dark rounded-full" />
            <h3 className="text-lg font-semibold text-foreground">
              Submit a Request
            </h3>
          </div>

          <form
            onSubmit={handleSubmitTicket}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs text-muted-foreground">
                  Subject
                </label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Briefly describe your issue"
                  required
                  minLength={5}
                  className="bg-muted/30 border-border/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Priority
                </label>
                <Select
                  value={priority}
                  onValueChange={(v) => setPriority(v as TicketPriority)}
                >
                  <SelectTrigger className="bg-muted/30 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us what happened, when, and any error messages…"
                required
                minLength={10}
                rows={6}
                className="bg-muted/30 border-border/50"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={createTicket.isPending}>
                {createTicket.isPending ? (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                ) : (
                  <Send size={14} className="mr-2" />
                )}
                Submit Ticket
              </Button>
            </div>
          </form>
        </div>

        {/* My Tickets — logged-in path */}
        {user && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h3 className="text-lg font-semibold text-foreground">
                My Tickets
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              {myTicketsQ.isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="animate-spin" size={14} /> Loading your
                  tickets…
                </div>
              )}
              {myTicketsQ.isError && (
                <p className="text-sm text-destructive">
                  Failed to load tickets. Please retry shortly.
                </p>
              )}
              {!myTicketsQ.isLoading &&
                !myTicketsQ.isError &&
                myTickets.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    You haven't submitted any tickets yet.
                  </p>
                )}
              {myTickets.length > 0 && (
                <div className="space-y-3">
                  {myTickets.map((ticket) => (
                    <TicketRow key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Anonymous email lookup (for tickets submitted before signup) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-muted-foreground/30 rounded-full" />
            <h3 className="text-lg font-semibold text-foreground">
              Look Up by Email
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
            <p className="text-sm text-muted-foreground mb-4">
              Find tickets submitted with a different email address.
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
              <Button
                type="submit"
                variant="outline"
                disabled={lookupQ.isFetching}
              >
                {lookupQ.isFetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Ticket className="h-4 w-4 mr-2" />
                )}
                {lookupQ.isFetching ? "" : "Look Up"}
              </Button>
            </form>

            {submittedEmail && !lookupQ.isFetching && (
              <div className="mt-6 space-y-3">
                {lookupQ.isError && (
                  <p className="text-sm text-destructive">
                    Failed to load tickets.
                  </p>
                )}
                {!lookupQ.isError && lookupTickets.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No tickets found for {submittedEmail}.
                  </p>
                )}
                {lookupTickets.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Direct Contact */}
        <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
                <Headphones size={32} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-lg">
                  Email Support
                </h4>
                <p className="text-muted-foreground mt-1">
                  Get help directly via email
                </p>
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
                onClick={() =>
                  navigator.clipboard.writeText("support@dynastyfuturesdyn.com")
                }
              >
                Copy
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Card (legacy link to public /support page) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gold-dark rounded-full" />
            <h3 className="text-lg font-semibold text-foreground">
              More Options
            </h3>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <HelpCard
              title="Contact Support"
              description="Reach out via our public support flow."
              icon={<MessageCircle size={28} className="text-primary" />}
              to="/support"
            />
          </div>
        </div>
      </ScrollReveal>

      <PreLaunchModal
        externalOpen={showAnnouncement}
        onExternalClose={() => setShowAnnouncement(false)}
      />
    </div>
  );
};

export default DashboardHelp;
