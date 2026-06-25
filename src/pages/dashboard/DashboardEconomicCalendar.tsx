import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { CalendarClock } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

// TradingView's free "Economic Calendar" (events) embed. The loader script reads
// its config from its own text content, so we inject a fresh <script> into the
// container and re-run whenever the theme flips. Effect-only → never runs during
// SSR/prerender (the dashboard isn't prerendered anyway).
const TRADINGVIEW_EVENTS_SRC =
  "https://s3.tradingview.com/external-embedding/embed-widget-events.js";

const EconomicCalendarWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any prior embed (e.g. on theme change / remount).
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = TRADINGVIEW_EVENTS_SRC;
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      isTransparent: true,
      width: "100%",
      height: 650,
      locale: "en",
      importanceFilter: "-1,0,1",
      // US-led, plus the majors that move index/energy/metals futures.
      countryFilter: "us,eu,gb,jp,cn",
    });
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [resolvedTheme]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
};

const DashboardEconomicCalendar = () => {
  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
            <CalendarClock size={28} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Economic Calendar</h1>
            <p className="text-muted-foreground mt-1">
              Upcoming market-moving events and data releases
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Widget */}
      <ScrollReveal delay={150}>
        <div className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
          <EconomicCalendarWidget />
          <p className="mt-3 text-[11px] text-muted-foreground text-center">
            Times shown in your local timezone. Data provided by TradingView.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default DashboardEconomicCalendar;
