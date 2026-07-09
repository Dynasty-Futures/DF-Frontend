const LaunchCountdown = () => {
  return (
    <div className="flex justify-center px-4 mt-16 sm:mt-20 mb-6">
      <div
        className="glass-card border border-gold/30 rounded-xl px-6 py-5 text-center"
        style={{
          maxWidth: '580px',
          width: '100%',
          boxShadow: '0 0 18px 2px rgba(212,175,55,0.12), 0 2px 16px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-start gap-3 text-left">
          <div className="mt-0.5 shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="url(#gold-grad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gold-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D4AF37" />
                  <stop offset="1" stopColor="#F5D77E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <p className="text-base sm:text-lg font-bold leading-snug mb-1.5">
              <span
                style={{
                  background: 'linear-gradient(90deg, #D4AF37 0%, #F5D77E 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Dynasty Futures 2.0
              </span>{' '}
              <span className="text-white">is Coming Soon</span>
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-2.5">
              We're currently preparing the next generation of Dynasty Futures with new platform
              integrations, major improvements, and an enhanced trading experience. Account
              purchases are temporarily unavailable while we complete development.
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              Our team will announce when Dynasty Futures 2.0 is ready to launch. Stay tuned for
              upcoming announcements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchCountdown;
