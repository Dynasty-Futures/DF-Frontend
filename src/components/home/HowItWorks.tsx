import { Link } from "react-router-dom";
import { Target, LineChart, Wallet } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    icon: Target,
    title: "Pick Your Plan",
    description:
      "Choose Standard, Advanced, or Builder and select an account size from $25K to $150K.",
    bullets: [
      { label: "Standard & Advanced", text: "Begin in an evaluation phase" },
      {
        label: "Builder",
        text: "Evaluation with higher max loss limits than Standard",
      },
    ],
    color: "from-primary to-primary",
    link: "/rules#plan-rules",
  },
  {
    icon: LineChart,
    title: "Trade",
    description:
      "Trade in a simulated environment using live futures market data on Volumetrica while following Dynasty Futures rules.",
    bullets: [
      {
        label: "Standard & Advanced",
        text: "Trade the evaluation to qualify for the funded phase",
      },
      {
        label: "Builder",
        text: "Follow Builder evaluation rules and qualify for funded trading",
      },
    ],
    color: "from-gold-dark to-gold-light",
    link: "/rules#account-rules",
  },
  {
    icon: Wallet,
    title: "Request Payouts",
    description:
      "Payout eligibility is determined by meeting the trading and payout requirements specific to your account type.",
    bullets: [
      {
        label: "Standard & Advanced",
        text: "After passing the evaluation, traders must meet funded-phase trading requirements before requesting payouts",
      },
      {
        label: "Builder",
        text: "After passing, traders follow funded-phase payout requirements",
      },
    ],
    color: "from-gold-light to-primary",
    link: "/rules#funded-trading",
  },
];

const HowItWorks = () => {
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
            How It <span className="text-gradient-animated">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to get started.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={step.title}
                delay={index * 150}
                className="relative group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="relative text-center glass-card rounded-2xl p-6 border border-border/30">
                  {/* Icon - Clickable */}
                  <Link
                    to={step.link}
                    onClick={handleClick}
                    className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 group-hover:scale-110 transition-all duration-300 clickable-icon`}
                  >
                    <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-gold-dark" />
                    </div>
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-300`}
                    />
                  </Link>

                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-4">
                    {step.description}
                  </p>

                  {/* Bullet points for plan differences */}
                  <div className="space-y-2 text-left max-w-xs mx-auto">
                    {step.bullets.map((bullet, i) => (
                      <div key={i} className="text-xs">
                        <span className="text-primary font-medium">
                          {bullet.label}:
                        </span>{" "}
                        <span className="text-muted-foreground">
                          {bullet.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
