import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const BANNER_HEIGHT = "2.5rem"; // h-10

function isMaintenanceWindow(): boolean {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);

  const isWeekday = !["Sat", "Sun"].includes(weekday);
  const totalMinutes = hour * 60 + minute;
  const windowStart = 16 * 60 + 30; // 4:30 PM
  const windowEnd = 18 * 60;        // 6:00 PM

  return isWeekday && totalMinutes >= windowStart && totalMinutes < windowEnd;
}

const MaintenanceBanner = () => {
  const [active, setActive] = useState(() => isMaintenanceWindow());

  useEffect(() => {
    const tick = () => setActive(isMaintenanceWindow());
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--maint-h",
      active ? BANNER_HEIGHT : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--maint-h", "0px");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-center gap-2 px-4 bg-amber-500 text-amber-950"
      style={{ height: BANNER_HEIGHT }}
      role="status"
      aria-live="polite"
    >
      <AlertTriangle size={14} className="shrink-0" aria-hidden="true" />
      <p className="text-xs font-semibold text-center">
        Scheduled maintenance is currently in progress (4:30 PM – 6:00 PM ET, Mon–Fri). Some features may be temporarily unavailable.
      </p>
    </div>
  );
};

export default MaintenanceBanner;
