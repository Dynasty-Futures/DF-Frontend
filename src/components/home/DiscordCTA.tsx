import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const DiscordCTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Text + Button */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Join the <span className="text-gradient-animated">Discord</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                We're giving away 5 Standard 50K accounts at launch. The first
                100 members to join our Discord are automatically entered to win.
              </p>

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
            </div>

            {/* Gold Discord Icon — right side */}
            <div className="flex-shrink-0 relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, hsl(43 74% 49%) 0%, transparent 70%)",
                }}
              />
              <svg
                className="w-28 h-28 md:w-36 md:h-36 relative z-10 drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="none"
                fillRule="evenodd"
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
                  fillRule="evenodd"
                  d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942.0209-.0406.0012-.0916-.0407-.1057a13.2995 13.2995 0 01-1.8727-.8998.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8985.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                />
              </svg>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DiscordCTA;
