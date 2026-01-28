import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import logo from '@/assets/DF_Logo.png';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

const Hero = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Animated values state
  const [balance, setBalance] = useState(108450);
  const [openPL, setOpenPL] = useState(2340);
  const [winRate, setWinRate] = useState(68.5);
  const [trades, setTrades] = useState(47);
  const [percentage, setPercentage] = useState(8.45);
  const [isBalanceIncreasing, setIsBalanceIncreasing] = useState(false);

  // Animated display values with smooth transitions
  const displayBalance = useAnimatedNumber(balance, 2000);
  const displayOpenPL = useAnimatedNumber(openPL, 1500);
  const displayWinRate = useAnimatedNumber(winRate, 1500, 1);
  const displayTrades = useAnimatedNumber(trades, 800);
  const displayPercentage = useAnimatedNumber(percentage, 1500, 2);

  // Animate balance: $98,000 - $118,000
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => {
        const newValue = 98000 + Math.random() * 20000;
        setIsBalanceIncreasing(newValue > prev);
        return Math.round(newValue);
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Animate Open P/L: $1,200 - $4,500
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenPL(1200 + Math.random() * 3300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate Win Rate: 64% - 72%
  useEffect(() => {
    const interval = setInterval(() => {
      setWinRate(64 + Math.random() * 8);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Animate Trades: increment every 4-6 seconds
  useEffect(() => {
    const getRandomInterval = () => 4000 + Math.random() * 2000;
    let timeout: NodeJS.Timeout;
    
    const incrementTrades = () => {
      setTrades(prev => prev + 1);
      timeout = setTimeout(incrementTrades, getRandomInterval());
    };
    
    timeout = setTimeout(incrementTrades, getRandomInterval());
    return () => clearTimeout(timeout);
  }, []);

  // Animate Percentage: +5.5% to +12.8%
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(5.5 + Math.random() * 7.3);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Enhanced breathing orbs - more dramatic */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl breathe" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-teal/25 rounded-full blur-3xl breathe-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-soft-blue/15 rounded-full blur-3xl breathe-slow" />
      
      {/* Secondary breathing accents */}
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-primary/10 rounded-full blur-2xl breathe" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-teal/10 rounded-full blur-2xl breathe-slow" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern overlay with pulse */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(142 76% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(175 70% 50%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Prop Trading Firm</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Build Your{' '}
              <span className="text-gradient-animated glow-text">Dynasty.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Choose your plan, meet the objectives, trade with confidence, and{' '}
              <span className="text-gradient-animated font-semibold">Build Your Dynasty.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
                className="border-border/50 bg-card/50 backdrop-blur-sm px-8 py-6 text-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                asChild
              >
                <Link to="/pricing" onClick={handleClick}>
                  View Pricing & Plans
                </Link>
              </Button>
            </div>
          </div>

          {/* Right content - Trading Dashboard Mock */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative bg-gradient-card rounded-2xl border border-border/50 p-6 shadow-2xl overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl breathe" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal/15 rounded-full blur-2xl breathe-delayed" />
              
              {/* Header with Logo */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Logo positioned to the left of account balance */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 via-teal/20 to-soft-blue/20 rounded-xl flex items-center justify-center border border-primary/20 animate-gradient-shift">
                    <img src={logo} alt="DF" className="h-16 w-auto logo-blend" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Balance</p>
                    <p className={`font-display text-3xl font-bold text-foreground transition-all duration-500 ${isBalanceIncreasing ? 'animate-number-glow' : ''}`}>
                      ${displayBalance.toLocaleString()}.00
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <TrendingUp className="w-4 h-4 animate-icon-breathe" />
                  <span className="transition-all duration-500">+{displayPercentage.toFixed(2)}%</span>
                </div>
              </div>

              {/* Equity Curve with animations */}
              <div className="relative h-40 mb-6 rounded-xl bg-muted/30 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(142 76% 50%)" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="hsl(175 70% 50%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(195 85% 55%)" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(142 76% 50%)" />
                      <stop offset="50%" stopColor="hsl(175 70% 50%)" />
                      <stop offset="100%" stopColor="hsl(195 85% 55%)" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Animated fill area */}
                  <path
                    d="M0,120 Q50,110 100,80 T200,60 T300,40 T400,20 L400,160 L0,160 Z"
                    fill="url(#curveGradient)"
                    className="animate-curve-wave"
                  />
                  
                  {/* Main curve line with draw animation */}
                  <path
                    d="M0,120 Q50,110 100,80 T200,60 T300,40 T400,20"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    className="animate-curve-draw"
                    style={{
                      strokeDasharray: 600,
                      strokeDashoffset: 0,
                    }}
                  />
                  
                  {/* Traveling glow dot */}
                  <circle
                    r="6"
                    fill="hsl(175 70% 50%)"
                    filter="url(#glow)"
                    className="animate-dot-travel"
                  >
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path="M0,120 Q50,110 100,80 T200,60 T300,40 T400,20"
                    />
                  </circle>
                </svg>
              </div>

              {/* Stats Grid with pulse animations */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/30 transition-transform duration-300 hover:scale-105">
                  <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Open P/L</p>
                  <p className="font-semibold text-primary animate-stat-pulse">+${Math.round(displayOpenPL).toLocaleString()}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30 transition-transform duration-300 hover:scale-105">
                  <BarChart3 className="w-5 h-5 text-teal mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="font-semibold text-foreground animate-stat-pulse">{displayWinRate.toFixed(1)}%</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30 transition-transform duration-300 hover:scale-105">
                  <TrendingUp className="w-5 h-5 text-soft-blue mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Trades</p>
                  <p className="font-semibold text-foreground animate-stat-pulse">{displayTrades}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;