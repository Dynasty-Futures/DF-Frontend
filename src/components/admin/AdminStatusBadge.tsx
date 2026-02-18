import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface AdminStatusBadgeProps {
  status: string;
  variant?: 'default' | 'outline';
  className?: string;
}

const statusStyles: Record<string, string> = {
  // Account statuses (mock / display)
  'Evaluation': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Funded': 'bg-primary/20 text-primary border-primary/30',
  'Paused': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Failed': 'bg-destructive/20 text-destructive border-destructive/30',

  // Account statuses (API enum values)
  'EVALUATION': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'PHASE_2': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'PASSED': 'bg-primary/20 text-primary border-primary/30',
  'FUNDED': 'bg-primary/20 text-primary border-primary/30',
  'SUSPENDED': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'FAILED': 'bg-destructive/20 text-destructive border-destructive/30',
  'CLOSED': 'bg-muted/50 text-muted-foreground border-border/50',
  
  // KYC statuses (mock / display)
  'Not Started': 'bg-muted/50 text-muted-foreground border-border/50',
  'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Verified': 'bg-primary/20 text-primary border-primary/30',

  // KYC statuses (API enum values)
  'NOT_STARTED': 'bg-muted/50 text-muted-foreground border-border/50',
  'PENDING': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'APPROVED': 'bg-primary/20 text-primary border-primary/30',
  'REJECTED': 'bg-destructive/20 text-destructive border-destructive/30',

  // User statuses (API enum values)
  'PENDING_VERIFICATION': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'ACTIVE': 'bg-primary/20 text-primary border-primary/30',
  'BANNED': 'bg-destructive/20 text-destructive border-destructive/30',

  // Tax form statuses
  'Missing': 'bg-destructive/20 text-destructive border-destructive/30',
  'Submitted': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Approved': 'bg-primary/20 text-primary border-primary/30',
  
  // Payout statuses
  'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Paid': 'bg-primary/20 text-primary border-primary/30',
  'Rejected': 'bg-destructive/20 text-destructive border-destructive/30',
  'Held': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  
  // Violation/flag statuses
  'Open': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Reviewed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Resolved': 'bg-primary/20 text-primary border-primary/30',
  
  // Subscription statuses
  'Active': 'bg-primary/20 text-primary border-primary/30',
  'Canceled': 'bg-muted/50 text-muted-foreground border-border/50',
  'Past Due': 'bg-destructive/20 text-destructive border-destructive/30',
  
  // Transaction statuses
  'Refunded': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Chargeback': 'bg-destructive/20 text-destructive border-destructive/30',
  
  // Eligibility
  'Eligible': 'bg-primary/20 text-primary border-primary/30',
  'Not Eligible': 'bg-destructive/20 text-destructive border-destructive/30',
  'Needs Review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  
  // System status
  'Online': 'bg-primary/20 text-primary border-primary/30',
  'Degraded': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Offline': 'bg-destructive/20 text-destructive border-destructive/30',
  'OK': 'bg-primary/20 text-primary border-primary/30',
  'Backlog': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export function AdminStatusBadge({ status, variant = 'default', className }: AdminStatusBadgeProps) {
  const style = statusStyles[status] || 'bg-muted/50 text-muted-foreground border-border/50';
  
  return (
    <Badge 
      variant="outline" 
      className={cn('font-medium border', style, className)}
    >
      {status}
    </Badge>
  );
}

interface AdminSeverityBadgeProps {
  severity: 'Info' | 'Warning' | 'Critical';
  className?: string;
}

const severityStyles = {
  'Info': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Warning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Critical': 'bg-destructive/20 text-destructive border-destructive/30',
};

export function AdminSeverityBadge({ severity, className }: AdminSeverityBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn('font-medium border', severityStyles[severity], className)}
    >
      {severity}
    </Badge>
  );
}

interface AdminPlanBadgeProps {
  plan: 'Standard' | 'Advanced' | 'Dynasty';
  className?: string;
}

const planStyles = {
  'Standard': 'bg-muted/50 text-muted-foreground border-border/50',
  'Advanced': 'bg-secondary/20 text-secondary border-secondary/30',
  'Dynasty': 'bg-primary/20 text-primary border-primary/30',
};

export function AdminPlanBadge({ plan, className }: AdminPlanBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn('font-medium border', planStyles[plan], className)}
    >
      {plan}
    </Badge>
  );
}

interface AdminConfidenceBadgeProps {
  confidence: 'Low' | 'Medium' | 'High';
  className?: string;
}

const confidenceStyles = {
  'Low': 'bg-muted/50 text-muted-foreground border-border/50',
  'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'High': 'bg-destructive/20 text-destructive border-destructive/30',
};

export function AdminConfidenceBadge({ confidence, className }: AdminConfidenceBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn('font-medium border', confidenceStyles[confidence], className)}
    >
      {confidence}
    </Badge>
  );
}
