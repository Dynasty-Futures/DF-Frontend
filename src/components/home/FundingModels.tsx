import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PlanImage } from "@/components/icons/PlanIcons";
import ScrollReveal from "@/components/ui/ScrollReveal";

const plans = [
  {
    id: "standard" as const,
    name: "Standard Plan",
    tagline: "Pass First, Activate Later",
    description:
      "Start with a low evaluation fee. Pay the activation fee only after you pass and get funded.",
    color: "from-primary to-primary",
    bgGlow: "bg-primary/20",
    features: ["Low upfront cost", "Static drawdown", "5-day payout cycles"],
  },
  {
    id: "advanced" as const,
    name: "Advanced Plan",
    tagline: "Instant Activation, No Activation Fee",
    description:
      "One fee covers everything. When you pass, you're activated immediately with no extra costs.",
    color: "from-gold-dark to-gold-light",
    bgGlow: "bg-gold-dark/20",
    features: ["No activation fee", "Immediate activation"],
  },
  {
    id: "builder" as const,
    name: "Builder Plan",
    tagline: "More Room to Execute",
    description:
      "Designed for traders who want more room to execute with a higher max loss limit than Standard while maintaining a structured evaluation model.",
    color: "from-primary via-primary to-gold-light",
    bgGlow: "bg-gold-light/20",
    features: [
      "Higher max loss limit",
      "No activation fee",
      "Built for serious traders",
    ],
  },
];

const FundingModels = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Funding Models</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Dynasty Futures offers three plan structures to fit different
            trading styles and risk preferences.
          </p>
        </ScrollReveal>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            return (
              <ScrollReveal
                key={plan.id}
                delay={index * 150}
                className="group relative glass-card-strong rounded-2xl border border-border/50 p-6 lg:p-8 feature-card overflow-hidden"
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
                    <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center p-1">
                      <PlanImage plan={plan.id} size={48} />
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FundingModels;
