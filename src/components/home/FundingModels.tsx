import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  StandardIcon,
  AdvancedIcon,
  DynastyIcon,
} from "@/components/icons/PlanIcons";
import pricingBg from "@/assets/pricing-background.png";

const plans = [
  {
    id: "standard",
    name: "Standard Plan",
    tagline: "Pass First, Activate Later",
    description:
      "Start with a low evaluation fee. Pay the activation fee only after you pass and get funded.",
    icon: StandardIcon,
    color: "from-primary to-teal",
    bgGlow: "bg-primary/20",
    features: ["Low upfront cost", "Static drawdown", "5-day payout cycles"],
  },
  {
    id: "advanced",
    name: "Advanced Plan",
    tagline: "Instant Activation, No Activation Fee",
    description:
      "One fee covers everything. When you pass, you're activated immediately with no extra costs.",
    icon: AdvancedIcon,
    color: "from-teal to-soft-blue",
    bgGlow: "bg-teal/20",
    features: ["No activation fee", "Priority support", "Immediate activation"],
  },
  {
    id: "dynasty",
    name: "Dynasty Plan",
    tagline: "Instant Funding + Daily Payouts",
    description:
      "Start trading right away. Build a $3,000 buffer and unlock daily payouts for maximum flexibility.",
    icon: DynastyIcon,
    color: "from-primary via-teal to-soft-blue",
    bgGlow: "bg-soft-blue/20",
    features: [
      "Instant funding",
      "Daily payouts available",
      "Maximum flexibility",
    ],
  },
];

const FundingModels = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${pricingBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay for blending */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/50 to-background" />

      {/* Top fade for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-[1]" />

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Funding Models</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Dynasty Futures offers three ways to take on the markets, each with
            its own structure and benefits.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className="group relative glass-card-strong rounded-2xl border border-border/50 p-6 lg:p-8 feature-card overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 ${plan.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} p-0.5`}
                  >
                    <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={32} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p
                  className={`text-sm font-medium bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-4`}
                >
                  {plan.tagline}
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="group/btn w-full justify-between hover:bg-primary/10 transition-all duration-300"
                  asChild
                >
                  <Link to={`/pricing#${plan.id}`} onClick={handleClick}>
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FundingModels;
