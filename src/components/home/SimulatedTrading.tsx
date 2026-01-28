import { Monitor, Zap, Shield, ChevronDown } from 'lucide-react';

const features = [
  {
    icon: Monitor,
    title: 'Real-Time Market Data',
    description: 'Trade with live or near real-time price feeds from actual futures markets.',
  },
  {
    icon: Zap,
    title: 'Platform Connections',
    description: 'Connect through supported platforms like Tradovate with Rithmic data feed integration.',
  },
  {
    icon: Shield,
    title: 'Risk-Free Challenge',
    description: 'During the challenge phase, you trade in a simulated environment—all trading is simulated, no live capital is ever traded.',
  },
];

const SimulatedTrading = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How <span className="text-gradient">Simulated Trading</span> Works
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              All trading at Dynasty Futures occurs on simulated accounts using real-time or near real-time futures market data. This environment mirrors live market conditions but does not involve live capital at any stage.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-teal/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-teal/30 transition-colors duration-300">
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
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative bg-gradient-card rounded-2xl border border-border/50 p-8 overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal/20 rounded-full blur-3xl" />
              
              {/* Connection diagram */}
              <div className="relative space-y-6">
                {/* Your Platform */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Your Trading Platform</p>
                    <p className="text-xs text-muted-foreground">Tradovate & Compatible Platforms</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ChevronDown className="w-6 h-6 text-primary" />
                </div>

                {/* Data Feed */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal to-soft-blue flex items-center justify-center">
                    <Zap className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Data Feed Connection</p>
                    <p className="text-xs text-muted-foreground">Rithmic Integration</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ChevronDown className="w-6 h-6 text-teal" />
                </div>

                {/* Simulated Environment */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-teal/10 border border-primary/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Simulated Environment</p>
                    <p className="text-xs text-muted-foreground">Live prices, simulated execution</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-primary to-teal rounded-full text-sm font-semibold text-primary-foreground shadow-lg">
              100% Simulated Trading
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatedTrading;