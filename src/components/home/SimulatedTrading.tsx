import { Monitor, Zap, Shield, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: Monitor,
    title: "Real-Time Market Data",
    description:
      "Trade with live real time price feeds from actual futures markets.",
  },
  {
    icon: Zap,
    title: "Platform Connections",
    description:
      "Connect through supported platforms like Volumetrica with DeepCharts data feed integration.",
  },
  {
    icon: Shield,
    title: "Risk-Free Challenge",
    description:
      "During the challenge phase, you trade in a simulated environment—all trading is simulated, no live capital is ever traded.",
  },
];

const SimulatedTrading = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <ScrollReveal direction="left">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How <span className="text-gradient">Simulated Trading</span> Works
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              All trading at Dynasty Futures occurs on simulated accounts using
              real-time futures market data. This environment mirrors live
              market conditions but does not involve live capital at any stage.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right Content - Visual */}
          <ScrollReveal direction="right" delay={200} className="relative">
            <div className="relative bg-gradient-card rounded-2xl border border-border/50 p-8 overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-dark/20 rounded-full blur-3xl" />

              {/* Connection diagram */}
              <div className="relative space-y-6">
                {/* Your Platform */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Your Trading Platform
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Volumetrica DeepCharts Platform
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ChevronDown className="w-6 h-6 text-primary" />
                </div>

                {/* Data Feed */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-dark to-gold-light flex items-center justify-center">
                    <Zap className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Market Data Connection
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Professional futures market data feed
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ChevronDown className="w-6 h-6 text-gold-dark" />
                </div>

                {/* Simulated Environment */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/10 border border-primary/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Simulated Environment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Live prices, simulated execution
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-primary to-primary rounded-full text-sm font-semibold text-primary-foreground shadow-lg">
              100% Simulated Trading
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SimulatedTrading;
