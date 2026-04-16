import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const DiscordCTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Gold Discord Icon */}
          <div className="mb-8 relative">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, hsl(43 74% 49%) 0%, transparent 70%)",
              }}
            />
            <svg
              className="w-20 h-20 md:w-24 md:h-24 relative z-10 drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="discordGoldGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(43 74% 60%)" />
                  <stop offset="50%" stopColor="hsl(43 74% 49%)" />
                  <stop offset="100%" stopColor="hsl(35 55% 35%)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#discordGoldGrad)"
                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.12 18.1.138 18.112a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Join the <span className="text-gradient-animated">Discord</span>
          </h2>

          {/* Supporting sentence */}
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Connect with the community, get support, and stay up to date.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="btn-gradient-animated text-primary-foreground font-semibold px-8 py-6 text-lg btn-glow transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            asChild
          >
            <a
              href="https://discord.gg/CMwf9Nsysq"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Discord
            </a>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DiscordCTA;
