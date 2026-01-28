import { 
  Link as LinkIcon, 
  Tag, 
  CircleDollarSign, 
  TrendingUp, 
  Clock, 
  MousePointerClick, 
  UserPlus, 
  Target, 
  ShoppingCart,
  Percent,
  Gift,
  Calendar,
  Activity,
  Sparkles,
  Headphones,
  Zap,
  FileText,
  Download,
  Mail,
  MessageCircle,
  Check,
  X,
  Copy,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock affiliate data
const affiliateData = {
  referralLink: 'https://dynastyfutures.com/ref/USER123',
  discountCode: 'DYNASTY15',
  currentBalance: 1250.00,
  totalEarned: 4800.00,
  pendingPayouts: 450.00,
  clicks: 1247,
  signups: 89,
  conversions: 34,
  totalSales: 34,
};

const benefits = [
  { icon: Percent, title: '40% Commission', subtitle: 'Per Sale' },
  { icon: Gift, title: '15% Discount', subtitle: 'For Your Audience' },
  { icon: TrendingUp, title: 'Lifetime', subtitle: 'Commissions' },
  { icon: Calendar, title: 'Weekly Payouts', subtitle: 'Every Friday' },
  { icon: Activity, title: 'Real-Time', subtitle: 'Dashboard Tracking' },
  { icon: Sparkles, title: 'Free Evals', subtitle: 'For Creators' },
  { icon: Headphones, title: 'Priority', subtitle: 'Creator Support' },
  { icon: Zap, title: 'Early Access', subtitle: 'Features & Promos' },
];

const allowedItems = [
  'Honest, accurate promotion',
  'FTC disclosure on all posts',
  'Sharing your personal discount code',
  'Promoting other prop firms',
];

const notAllowedItems = [
  'Sharing Dynasty confidential information',
  'Leaking payout rules, risk engine logic, or backend systems',
  'False earnings claims',
  'Encouraging rule-breaking',
  'Buying accounts using your own affiliate link',
];

const documents = [
  { name: 'Affiliate Agreement (PDF)', icon: FileText },
  { name: 'Affiliate NDA (PDF)', icon: FileText },
  { name: 'Branding Guidelines', icon: FileText },
  { name: 'FTC Compliance Guide', icon: FileText },
];

const DashboardAffiliate = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Affiliate Program</h1>
        <p className="text-muted-foreground mt-1">Earn commissions while helping traders build their dynasty.</p>
      </div>

      {/* Referral Link & Discount Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referral Link Card */}
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/70 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LinkIcon size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Your Referral Link</span>
          </div>
          <div className="bg-background/50 rounded-xl p-3 mb-4 border border-border/20">
            <p className="text-sm text-foreground font-mono truncate">{affiliateData.referralLink}</p>
          </div>
          <Button 
            onClick={() => copyToClipboard(affiliateData.referralLink, 'Referral link')}
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
          >
            <Copy size={16} className="mr-2" />
            Copy Link
          </Button>
        </div>

        {/* Discount Code Card */}
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/70 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
              <Tag size={20} className="text-teal" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Your Discount Code</span>
          </div>
          <div className="bg-background/50 rounded-xl p-3 mb-2 border border-border/20">
            <p className="text-lg text-foreground font-bold tracking-wider text-center">{affiliateData.discountCode}</p>
          </div>
          <p className="text-xs text-muted-foreground text-center mb-4">Your audience receives 15% off</p>
          <Button 
            onClick={() => copyToClipboard(affiliateData.discountCode, 'Discount code')}
            className="w-full bg-teal/10 hover:bg-teal/20 text-teal border border-teal/20"
          >
            <Copy size={16} className="mr-2" />
            Copy Code
          </Button>
        </div>
      </div>

      {/* Earnings Overview */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-lg font-semibold text-foreground">Earnings Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-5 transition-all duration-300 hover:border-primary/30 hover:translate-y-[-2px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CircleDollarSign size={20} className="text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
            <p className="text-2xl font-bold text-primary">${affiliateData.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-5 transition-all duration-300 hover:border-teal/30 hover:translate-y-[-2px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-teal" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1">Total Commissions Earned</p>
            <p className="text-2xl font-bold text-teal">${affiliateData.totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-5 transition-all duration-300 hover:border-soft-blue/30 hover:translate-y-[-2px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-soft-blue/10 flex items-center justify-center">
                <Clock size={20} className="text-soft-blue" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1">Pending Payouts</p>
            <p className="text-2xl font-bold text-soft-blue">${affiliateData.pendingPayouts.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px]">
          <div className="flex items-center gap-2 mb-2">
            <MousePointerClick size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Clicks</span>
          </div>
          <p className="text-xl font-bold text-foreground">{affiliateData.clicks.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px]">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Signups</span>
          </div>
          <p className="text-xl font-bold text-foreground">{affiliateData.signups.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px]">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Conversions</span>
          </div>
          <p className="text-xl font-bold text-foreground">{affiliateData.conversions.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px]">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total Sales</span>
          </div>
          <p className="text-xl font-bold text-foreground">{affiliateData.totalSales.toLocaleString()}</p>
        </div>
      </div>

      {/* Affiliate Benefits */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-teal rounded-full"></div>
          <h2 className="text-lg font-semibold text-foreground">Affiliate Benefits</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px] group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Firm Friendly Policy */}
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/30 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Affiliate Freedom Policy</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Dynasty Futures supports creators who partner with multiple prop firms. Affiliates may promote other firms, 
          as long as confidential Dynasty information is not shared and comparisons do not use private internal data.
        </p>
      </div>

      {/* Affiliate Guidelines */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-soft-blue rounded-full"></div>
          <h2 className="text-lg font-semibold text-foreground">Affiliate Guidelines</h2>
        </div>
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {/* Allowed */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check size={14} className="text-primary" />
                </div>
                <span className="text-sm font-semibold text-primary">Allowed</span>
              </div>
              <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {allowedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Not Allowed */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                  <X size={14} className="text-destructive" />
                </div>
                <span className="text-sm font-semibold text-destructive">Not Allowed</span>
              </div>
              <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {notAllowedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <X size={14} className="text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents & Agreements */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-lg font-semibold text-foreground">Documents & Agreements</h2>
        </div>
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc, index) => (
              <button
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-background/30 border border-border/20 hover:border-primary/30 hover:bg-background/50 transition-all duration-300 group text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <doc.icon size={16} className="text-primary" />
                </div>
                <span className="text-sm text-foreground flex-1">{doc.name}</span>
                <Download size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Support Card */}
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/30 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Need Help?</h3>
            <p className="text-sm text-muted-foreground">Our affiliate support team is here for you.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => window.location.href = 'mailto:affiliates@dynastyfuturesdyn.com'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Mail size={16} className="mr-2" />
              affiliates@dynastyfuturesdyn.com
            </Button>
            <Button 
              variant="outline"
              className="border-border/30 hover:bg-card/70"
            >
              <MessageCircle size={16} className="mr-2" />
              Open Support Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAffiliate;
