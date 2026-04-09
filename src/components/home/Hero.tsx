import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import logo from "@/assets/DF_Logo.png";
import heroPoster from "@/assets/hero-temple.png";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { getPerfFlags } from "@/lib/perfFlags";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress } = useScrollProgress(sectionRef);
  const { noHeroVideo } = getPerfFlags();

  const [isNarrowViewport, setIsNarrowViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia("(max-width: 767px)").matches : false,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const viewportQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsNarrowViewport(viewportQuery.matches);
    syncViewport();
    viewportQuery.addEventListener("change", syncViewport);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => {
      viewportQuery.removeEventListener("change", syncViewport);
      mediaQuery.removeEventListener("change", sync);
    };
  }, []);

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
      cloudOffset1: progress * -60,
      cloudOffset2: progress * -30,
      overlayOpacity: 0.3 + progress * 0.5,
    }),
    [progress],
  );

  const usePosterInsteadOfVideo =
    noHeroVideo || isNarrowViewport || prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Sky base layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 15% 3%) 0%, hsl(220 12% 6%) 40%, hsl(220 10% 10%) 100%)",
        }}
      />

      {/* Cloud layer 1 - slow drift */}
      <div
        className="absolute inset-0 opacity-[0.07] cloud-drift-slow"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 600px 200px at 20% 25%, hsl(220 10% 40%) 0%, transparent 70%),
            radial-gradient(ellipse 500px 150px at 70% 15%, hsl(220 8% 35%) 0%, transparent 70%),
            radial-gradient(ellipse 400px 120px at 45% 35%, hsl(220 10% 30%) 0%, transparent 70%)
          `,
          transform: `translateX(${scrollStyles.cloudOffset1}px)`,
          willChange: "transform",
        }}
      />

      {/* Cloud layer 2 - medium drift */}
      <div
        className="absolute inset-0 opacity-[0.05] cloud-drift-medium"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 700px 180px at 60% 20%, hsl(220 8% 45%) 0%, transparent 70%),
            radial-gradient(ellipse 450px 140px at 25% 30%, hsl(220 10% 35%) 0%, transparent 70%)
          `,
          transform: `translateX(${scrollStyles.cloudOffset2}px)`,
          willChange: "transform",
        }}
      />

      {/* Hero background media layer */}
      <div className="absolute inset-0">
        {usePosterInsteadOfVideo ? (
          <img
            src={heroPoster}
            alt="Dynasty Futures trading platform hero background"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover object-center"
          >
            <source src="/dynastyfutures.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 55%, transparent 30%, hsl(220 15% 4% / 0.7) 100%),
            linear-gradient(180deg, hsl(220 15% 4% / 0.4) 0%, transparent 30%, transparent 60%, hsl(220 15% 4% / ${scrollStyles.overlayOpacity}) 100%)
          `,
        }}
      />

      {/* Warm gold ambient glow from temple interior */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 50% 60%, hsl(43 74% 49% / 0.08) 0%, transparent 70%)",
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
                  Start Challenge
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 bg-card/40 backdrop-blur-sm px-8 py-6 text-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                asChild
              >
                <Link to="/pricing" onClick={handleClick}>
                  View Pricing & Plans
                </Link>
              </Button>
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
            "linear-gradient(to top, hsl(220 15% 6% / 0.8) 0%, transparent 100%)",
        }}
      />

      <style>{`
        .cloud-drift-slow {
          animation: cloudDriftSlow 45s linear infinite;
        }
        .cloud-drift-medium {
          animation: cloudDriftMedium 30s linear infinite;
        }
        @keyframes cloudDriftSlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-80px); }
        }
        @keyframes cloudDriftMedium {
          0% { transform: translateX(0); }
          100% { transform: translateX(60px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cloud-drift-slow,
          .cloud-drift-medium {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
