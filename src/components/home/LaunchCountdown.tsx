import { useState, useEffect } from 'react';

// Target: 2026-06-29T00:00:00 America/Denver (Mountain Time)
// Mountain Time is UTC-6 in summer (MDT). June 29 00:00 MDT = June 29 06:00 UTC
const LAUNCH_UTC_MS = Date.UTC(2026, 5, 29, 6, 0, 0); // months are 0-indexed

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diff = LAUNCH_UTC_MS - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

const LaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center px-4 mt-8 mb-6">
      <div
        className="glass-card border border-gold/30 rounded-xl px-6 py-4 text-center"
        style={{
          maxWidth: '580px',
          width: '100%',
          boxShadow: '0 0 18px 2px rgba(212,175,55,0.12), 0 2px 16px rgba(0,0,0,0.4)',
        }}
      >
        {timeLeft ? (
          <>
            <p className="text-xs uppercase tracking-widest text-white/60 mb-3 leading-none">
              <span className="text-gold font-semibold">Dynasty Futures</span>{' '}
              <span className="text-white/80">goes live in</span>
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-3 sm:gap-5">
                  {i > 0 && (
                    <span className="text-gold/40 text-lg font-light select-none">|</span>
                  )}
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
                      {pad(value)}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gold/70 mt-1 leading-none">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-base sm:text-lg font-semibold">
            <span className="text-gold">Dynasty Futures</span>{' '}
            <span className="text-white">is Live</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LaunchCountdown;
