import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import logo from "@/assets/DF_Logo.png";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress } = useScrollProgress(sectionRef);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const [balance, setBalance] = useState(108450);
  const [openPL, setOpenPL] = useState(2340);
  const [winRate, setWinRate] = useState(68.5);
  const [trades, setTrades] = useState(47);
  const [percentage, setPercentage] = useState(8.45);
  const [isBalanceIncreasing, setIsBalanceIncreasing] = useState(false);

  const displayBalance = useAnimatedNumber(balance, 2000);
  const displayOpenPL = useAnimatedNumber(openPL, 1500);
  const displayWinRate = useAnimatedNumber(winRate, 1500, 1);
  const displayTrades = useAnimatedNumber(trades, 800);
  const displayPercentage = useAnimatedNumber(percentage, 1500, 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => {
        const newValue = 98000 + Math.random() * 20000;
        setIsBalanceIncreasing(newValue > prev);
        return Math.round(newValue);
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpenPL(1200 + Math.random() * 3300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinRate(64 + Math.random() * 8);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getRandomInterval = () => 4000 + Math.random() * 2000;
    let timeout: NodeJS.Timeout;
    const incrementTrades = () => {
      setTrades((prev) => prev + 1);
      timeout = setTimeout(incrementTrades, getRandomInterval());
    };
    timeout = setTimeout(incrementTrades, getRandomInterval());
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(5.5 + Math.random() * 7.3);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const scrollStyles = useMemo(
    () => ({
      contentOpacity: 1 - progress * 1.5,
    }),
    [progress],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Subtle tonal depth layer — crisp, no blur, adds structural interest */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 15% 10%, rgba(42, 42, 42, 0.18) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 85% 90%, rgba(26, 26, 26, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 0%,  rgba(17, 17, 17, 0.10) 0%, transparent 45%)
          `,
        }}
      />

      {/* Readability overlay — subtle dark veil so hero text stays crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(5, 5, 5, 0.55) 100%),
            linear-gradient(180deg, rgba(5, 5, 5, 0.30) 0%, transparent 25%, transparent 65%, rgba(5, 5, 5, 0.60) 100%)
          `,
          zIndex: 2,
        }}
      />

      {/* Content overlay with scroll-fade */}
      <div
        className="container mx-auto px-4 relative z-10"
        style={{
          opacity: scrollStyles.contentOpacity,
          transform: `translateY(${progress * -40}px)`,
          willChange: "opacity, transform",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">
                Prop Trading Firm
              </span>
            </div>

            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-in tracking-wide"
              style={{ animationDelay: "0.1s" }}
            >
              Build Your{" "}
              <span className="text-gradient-animated glow-text">Dynasty.</span>
              <span className="sr-only"> — Simulated Funded Futures Trading</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Choose your plan, meet the objectives, trade with confidence, and{" "}
              <span className="text-gradient-animated font-semibold">
                Build Your Dynasty.
              </span>
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                size="lg"
                className="btn-gradient-animated text-primary-foreground font-semibold px-8 py-6 text-lg btn-glow group transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                asChild
              >
                <Link to="/pricing" onClick={handleClick}>
                  View Dynasty Plans
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 bg-card/40 backdrop-blur-sm px-8 py-6 text-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                asChild
              >
                <a href="https://discord.gg/CMwf9Nsysq" target="_blank" rel="noopener noreferrer">
                  Join Our Community
                </a>
              </Button>
            </div>

            {/* Trustpilot CTA */}
            <div className="flex justify-center lg:justify-start mt-2 animate-fade-in" style={{ animationDelay: "0.45s" }}>
              <a
                href="https://www.trustpilot.com/review/dynastyfuturesdyn.com?_gl=1*r3p7l0*_gcl_au*MTQ4MzEyNDE1Ny4xNzgxMjE1NTEz*_ga*MjAyMTc4MzE1My4xNzgxMjE1NTEz*_ga_11HBWMC274*czE3ODEyNDA4NjIkbzMkZzEkdDE3ODEyNDEzMjIkajYwJGwwJGgw"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-md hover:shadow-black/20"
              >
                {/* Trustpilot stars */}
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-[#00b67a]"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                      </svg>
                    </span>
                  ))}
                </span>
                {/* Trustpilot wordmark */}
                <span className="text-xs font-semibold text-foreground/80 tracking-tight">Trustpilot</span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
                  Review us on Trustpilot
                </span>
              </a>
            </div>
          </div>

          {/* Right content - Trading Dashboard Mock */}
          <div
            className="relative animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative bg-gradient-card rounded-2xl border border-border/50 p-4 md:p-6 shadow-2xl overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/15 rounded-full blur-3xl breathe" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-dark/15 rounded-full blur-2xl breathe-delayed" />

              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-12 h-auto md:w-16 bg-gradient-to-br from-primary/20 via-gold-dark/20 to-gold-light/20 rounded-xl flex items-center justify-center border border-primary/20">
                    <img
                      src={logo}
                      alt="Dynasty Futures logo"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-8 w-auto md:h-12 lg:h-16 logo-blend"
                    />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Account Balance
                    </p>
                    <p
                      className={`font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground transition-all duration-500 ${isBalanceIncreasing ? "animate-number-glow" : ""}`}
                    >
                      ${displayBalance.toLocaleString()}.00
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium">
                  <TrendingUp className="w-3 h-4 md:w-4 h-4 animate-icon-breathe" />
                  <span className="transition-all duration-500">
                    +{displayPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="relative h-24 md:h-32 lg:h-40 mb-4 md:mb-6 rounded-xl bg-muted/30 overflow-hidden">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 160"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="curveGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(35 55% 38%)"
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="50%"
                        stopColor="hsl(43 74% 49%)"
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(43 80% 65%)"
                        stopOpacity="0.3"
                      />
                    </linearGradient>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="hsl(35 55% 38%)" />
                      <stop offset="50%" stopColor="hsl(43 74% 49%)" />
                      <stop offset="100%" stopColor="hsl(43 80% 65%)" />
                    </linearGradient>
                    <filter
                      id="glow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M0,120 Q50,110 100,80 T200,60 T300,40 T400,20 L400,160 L0,160 Z"
                    fill="url(#curveGradient)"
                    className="animate-curve-wave"
                  />

                  <path
                    d="M0,120 Q50,110 100,80 T200,60 T300,40 T400,20"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    className="animate-curve-draw"
                    style={{ strokeDasharray: 600, strokeDashoffset: 0 }}
                  />

                  <circle r="6" fill="hsl(43 74% 55%)" filter="url(#glow)">
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path="M0,120 Q50,110 100,80 T200,60 T300,40 T400,20"
                    />
                  </circle>
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div className="text-center p-2 md:p-3 rounded-xl bg-muted/30 transition-transform duration-300 hover:scale-105">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    Open P/L
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-primary animate-stat-pulse">
                    +${Math.round(displayOpenPL).toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-2 md:p-3 rounded-xl bg-muted/30 transition-transform duration-300 hover:scale-105">
                  <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-gold-dark mx-auto mb-1" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    Win Rate
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-foreground animate-stat-pulse">
                    {displayWinRate.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-2 md:p-3 rounded-xl bg-muted/30 transition-transform duration-300 hover:scale-105">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-gold-light mx-auto mb-1" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    Trades
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-foreground animate-stat-pulse">
                    {displayTrades}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(10, 10, 10, 0.85) 0%, transparent 100%)",
        }}
      />
    </section>
  );
};

export default Hero;
