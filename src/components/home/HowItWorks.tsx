import { Link } from 'react-router-dom';
import { Target, LineChart, Wallet } from 'lucide-react';
import pricingBg from '@/assets/pricing-background.png';

const steps = [
  {
    number: '01',
    icon: Target,
    title: 'Pick Your Plan',
    description: 'Choose Standard, Advanced, or Dynasty and select an account size from $25K to $150K.',
    bullets: [
      { label: 'Standard & Advanced', text: 'Begin in an evaluation phase' },
      { label: 'Dynasty', text: 'Instant funding — no evaluation phase' },
    ],
    color: 'from-primary to-teal',
    link: '/rules#plan-rules',
  },
  {
    number: '02',
    icon: LineChart,
    title: 'Trade',
    description: 'Trade in a simulated environment using live futures market data on Tradovate while following Dynasty Futures rules.',
    bullets: [
      { label: 'Standard & Advanced', text: 'Trade the evaluation to qualify for the funded phase' },
      { label: 'Dynasty', text: 'Trade immediately in the funded phase' },
    ],
    color: 'from-teal to-soft-blue',
    link: '/rules#account-rules',
  },
  {
    number: '03',
    icon: Wallet,
    title: 'Request Payouts',
    description: 'Payout eligibility is determined by meeting the trading and payout requirements specific to your account type.',
    bullets: [
      { label: 'Standard & Advanced', text: 'After passing the evaluation, traders must meet funded-phase trading requirements before requesting payouts' },
      { label: 'Dynasty', text: 'Traders must meet Dynasty account trading requirements before requesting payouts' },
    ],
    color: 'from-soft-blue to-primary',
    link: '/rules#funded-trading',
  },
];

const HowItWorks = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${pricingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark overlay for blending */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      {/* Top fade for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-[1]" />
      
      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
      
      {/* Breathing orbs - enhanced visibility */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-teal/15 rounded-full blur-3xl breathe z-[2]" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-soft-blue/15 rounded-full blur-3xl breathe-delayed z-[2]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It <span className="text-gradient-animated">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to get started.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                
                <div className="relative text-center glass-card rounded-2xl p-6 border border-border/30">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-display text-7xl font-bold text-muted/10 select-none">
                    {step.number}
                  </div>
                  
                  {/* Icon - Clickable */}
                  <Link
                    to={step.link}
                    onClick={handleClick}
                    className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 group-hover:scale-110 transition-all duration-300 clickable-icon`}
                  >
                    <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-teal" />
                    </div>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-300`} />
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
                        <span className="text-primary font-medium">{bullet.label}:</span>{' '}
                        <span className="text-muted-foreground">{bullet.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-muted-foreground glass-card rounded-xl px-6 py-4 border border-border/30">
            All trading on Dynasty Futures is simulated. Payouts are based on simulated trading performance only. No real trading occurs and no real capital is ever at risk. Past simulated performance does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
