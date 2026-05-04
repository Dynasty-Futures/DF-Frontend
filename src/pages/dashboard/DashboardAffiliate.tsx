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
  Activity,
  Sparkles,
  Headphones,
  FileText,
  Download,
  Mail,
  MessageCircle,
  Check,
  X,
  Copy,
  Shield,
  Award,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { toast } from "sonner";

type AffiliateTier = "Community Affiliate" | "Growth Affiliate" | "Dynasty Partner";

interface TierConfig {
  commission: number;
  colorClass: string;
  accentClass: string;
  borderClass: string;
  nextTier: AffiliateTier | null;
  nextSalesGoal: number | null;
  nextRevenueGoal: number | null;
}

const TIER_CONFIG: Record<AffiliateTier, TierConfig> = {
  "Community Affiliate": {
    commission: 10,
    colorClass: "text-primary",
    accentClass: "bg-primary/10",
    borderClass: "border-primary/30",
    nextTier: "Growth Affiliate",
    nextSalesGoal: 15,
    nextRevenueGoal: null,
  },
  "Growth Affiliate": {
    commission: 12,
    colorClass: "text-gold-dark",
    accentClass: "bg-gold-dark/10",
    borderClass: "border-gold-dark/30",
    nextTier: "Dynasty Partner",
    nextSalesGoal: 50,
    nextRevenueGoal: 10000,
  },
  "Dynasty Partner": {
    commission: 15,
    colorClass: "text-gold-light",
    accentClass: "bg-gold-light/10",
    borderClass: "border-gold-light/30",
    nextTier: null,
    nextSalesGoal: null,
    nextRevenueGoal: null,
  },
};

// Centralized mock data — replace with real API response when backend is ready
const affiliateData = {
  referralLink: "https://dynastyfutures.com/ref/USER123",
  discountCode: "DYNASTY15",
  currentBalance: 1250.0,
  totalEarned: 4800.0,
  pendingPayouts: 450.0,
  clicks: 1247,
  signups: 89,
  conversions: 34,
  totalSales: 34,
  currentTier: "Community Affiliate" as AffiliateTier,
  qualifiedSales90d: 8,
  referredRevenue90d: 1240.0,
};

const benefits = [
  { icon: Percent, title: "10%–15% Commission", subtitle: "Tier-Based" },
  { icon: Activity, title: "Real-Time", subtitle: "Dashboard Tracking" },
  { icon: Tag, title: "Discount Code", subtitle: "For Your Audience" },
  { icon: Sparkles, title: "Branded Assets", subtitle: "Promotional Materials" },
  { icon: FileText, title: "Documents", subtitle: "Guidelines & Agreements" },
  { icon: Headphones, title: "Partner Support", subtitle: "Affiliate Team" },
];

const allowedItems = [
  "Honest, accurate promotion",
  "FTC disclosure on all posts",
  "Sharing your personal discount code",
  "Promoting other prop firms",
];

const notAllowedItems = [
  "Sharing confidential internal information",
  "Leaking payout rules, risk engine logic, or backend systems",
  "False earnings claims",
  "Encouraging rule-breaking",
  "Buying accounts using your own affiliate link",
];

const documents = [
  { name: "Affiliate Agreement (PDF)", icon: FileText },
  { name: "Affiliate NDA (PDF)", icon: FileText },
  { name: "Branding Guidelines", icon: FileText },
  { name: "FTC Compliance Guide", icon: FileText },
];

const DashboardAffiliate = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const tierConfig = TIER_CONFIG[affiliateData.currentTier];

  return (
    <div className="space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Affiliate Program
          </h1>
          <p className="text-muted-foreground mt-1">
            Earn commissions while helping traders discover Dynasty Futures.
          </p>
        </div>
      </ScrollReveal>

      {/* Referral Link & Discount Code */}
      <ScrollReveal delay={150} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Referral Link Card */}
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/70 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <LinkIcon size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Your Referral Link
              </span>
            </div>
            <div className="bg-background/50 rounded-xl p-3 mb-4 border border-border/20">
              <p className="text-sm text-foreground font-mono truncate">
                {affiliateData.referralLink}
              </p>
            </div>
            <Button
              onClick={() =>
                copyToClipboard(affiliateData.referralLink, "Referral link")
              }
              className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
            >
              <Copy size={16} className="mr-2" />
              Copy Link
            </Button>
          </div>

          {/* Customer Discount Code Card */}
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/70 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-dark/10 flex items-center justify-center">
                <Tag size={20} className="text-gold-dark" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Customer Discount Code
              </span>
            </div>
            <div className="bg-background/50 rounded-xl p-3 mb-2 border border-border/20">
              <p className="text-lg text-foreground font-bold tracking-wider text-center">
                {affiliateData.discountCode}
              </p>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-4">
              Share this code so your audience saves on their purchase
            </p>
            <Button
              onClick={() =>
                copyToClipboard(affiliateData.discountCode, "Discount code")
              }
              className="w-full bg-gold-dark/10 hover:bg-gold-dark/20 text-gold-dark border border-gold-dark/20"
            >
              <Copy size={16} className="mr-2" />
              Copy Code
            </Button>
          </div>
        </div>

        {/* Tier Progress */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-lg font-semibold text-foreground">
              Tier Progress
            </h2>
          </div>

          <div
            className={`rounded-2xl bg-card/50 backdrop-blur-sm border ${tierConfig.borderClass} p-6`}
          >
            {/* Current tier & commission rate */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${tierConfig.accentClass} flex items-center justify-center`}
                >
                  <Award size={20} className={tierConfig.colorClass} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Tier</p>
                  <p
                    className={`text-base font-bold ${tierConfig.colorClass}`}
                  >
                    {affiliateData.currentTier}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Percent size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Your Commission Rate
                  </p>
                  <p className="text-base font-bold text-primary">
                    {tierConfig.commission}% per sale
                  </p>
                </div>
              </div>
            </div>

            {/* Rolling 90-day stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background/30 rounded-xl p-3 border border-border/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Qualified Sales (90-day)
                </p>
                <p className="text-xl font-bold text-foreground">
                  {affiliateData.qualifiedSales90d}
                </p>
              </div>
              <div className="bg-background/30 rounded-xl p-3 border border-border/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Referred Revenue (90-day)
                </p>
                <p className="text-xl font-bold text-foreground">
                  $
                  {affiliateData.referredRevenue90d.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Progress toward next tier */}
            {tierConfig.nextTier ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">
                      Progress toward{" "}
                      <span className="text-foreground font-medium">
                        {tierConfig.nextTier}
                      </span>
                    </p>
                    <p className="text-xs text-foreground font-medium">
                      {affiliateData.qualifiedSales90d} /{" "}
                      {tierConfig.nextSalesGoal} sales
                    </p>
                  </div>
                  <div className="w-full bg-background/40 rounded-full h-2 border border-border/20">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          (affiliateData.qualifiedSales90d /
                            tierConfig.nextSalesGoal!) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {tierConfig.nextRevenueGoal !== null && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">
                        Revenue path (alternative to sales goal)
                      </p>
                      <p className="text-xs text-foreground font-medium">
                        $
                        {affiliateData.referredRevenue90d.toLocaleString(
                          "en-US",
                          { maximumFractionDigits: 0 }
                        )}{" "}
                        / $10,000
                      </p>
                    </div>
                    <div className="w-full bg-background/40 rounded-full h-2 border border-border/20">
                      <div
                        className="h-2 rounded-full bg-gold-dark transition-all duration-700"
                        style={{
                          width: `${Math.min(
                            (affiliateData.referredRevenue90d /
                              tierConfig.nextRevenueGoal) *
                              100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-gold-light/10 rounded-xl p-4 border border-gold-light/20">
                <Award size={20} className="text-gold-light flex-shrink-0" />
                <p className="text-sm font-semibold text-gold-light">
                  Highest tier unlocked — Dynasty Partner
                </p>
              </div>
            )}

            {/* Qualified sale definition */}
            <div className="flex items-start gap-2 mt-5 pt-4 border-t border-border/20">
              <Info size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                A qualified sale is a referred purchase that is not refunded,
                charged back, disputed, self-referred, or flagged for abuse.
              </p>
            </div>
          </div>

          {/* Compliance note */}
          <p className="text-xs text-muted-foreground mt-3 pl-1 leading-relaxed">
            Tier status is based on qualified sales, referred revenue, and
            overall program compliance. Dynasty Futures may review affiliate
            status to protect program integrity.
          </p>
        </div>

        {/* Earnings Overview */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-lg font-semibold text-foreground">
              Earnings Overview
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-5 transition-all duration-300 hover:border-primary/30 hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CircleDollarSign size={20} className="text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                Current Balance
              </p>
              <p className="text-2xl font-bold text-primary">
                $
                {affiliateData.currentBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-5 transition-all duration-300 hover:border-gold-dark/30 hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold-dark/10 flex items-center justify-center">
                  <TrendingUp size={20} className="text-gold-dark" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                Total Commissions Earned
              </p>
              <p className="text-2xl font-bold text-gold-dark">
                $
                {affiliateData.totalEarned.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-5 transition-all duration-300 hover:border-gold-light/30 hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold-light/10 flex items-center justify-center">
                  <Clock size={20} className="text-gold-light" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                Pending Payouts
              </p>
              <p className="text-2xl font-bold text-gold-light">
                $
                {affiliateData.pendingPayouts.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
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
            <p className="text-xl font-bold text-foreground">
              {affiliateData.clicks.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px]">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Signups</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              {affiliateData.signups.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px]">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Conversions</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              {affiliateData.conversions.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 p-4 transition-all duration-300 hover:border-primary/20 hover:translate-y-[-2px]">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Sales</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              {affiliateData.totalSales.toLocaleString()}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Affiliate Benefits */}
      <ScrollReveal delay={300} className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gold-dark rounded-full"></div>
            <h2 className="text-lg font-semibold text-foreground">
              Affiliate Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <p className="text-sm font-semibold text-foreground">
                    {benefit.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {benefit.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-Firm Friendly Policy */}
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/30 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Affiliate Freedom Policy
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dynasty Futures supports creators who partner with multiple prop
            firms. Affiliates may promote other firms, as long as confidential
            internal information is not shared and comparisons do not use
            private data.
          </p>
        </div>

        {/* Affiliate Guidelines */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gold-light rounded-full"></div>
            <h2 className="text-lg font-semibold text-foreground">
              Affiliate Guidelines
            </h2>
          </div>
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
              {/* Allowed */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check size={14} className="text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Allowed
                  </span>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                  {allowedItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check
                        size={14}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
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
                  <span className="text-sm font-semibold text-destructive">
                    Not Allowed
                  </span>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                  {notAllowedItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X
                        size={14}
                        className="text-destructive mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
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
            <h2 className="text-lg font-semibold text-foreground">
              Documents & Agreements
            </h2>
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
                  <span className="text-sm text-foreground flex-1">
                    {doc.name}
                  </span>
                  <Download
                    size={16}
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Support Card */}
      <ScrollReveal delay={450}>
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/30 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Need Help?
              </h3>
              <p className="text-sm text-muted-foreground">
                Our affiliate support team is here for you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() =>
                  (window.location.href =
                    "mailto:affiliates@dynastyfuturesdyn.com")
                }
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
      </ScrollReveal>
    </div>
  );
};

export default DashboardAffiliate;
