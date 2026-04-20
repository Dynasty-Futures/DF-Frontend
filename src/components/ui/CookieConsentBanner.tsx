import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "cookieConsent";

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) !== "accepted") {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 400);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 transition-all duration-500 ease-out",
        animateIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        className="max-w-5xl mx-auto rounded-2xl border border-primary/40 p-6 md:p-8 shadow-2xl shadow-black/60"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,13,13,0.97) 0%, rgba(20,18,14,0.97) 100%)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-semibold text-foreground mb-3 tracking-wide">
              Cookie Preferences
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to enhance your experience,
              analyze site usage, and assist in our marketing efforts.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              By using Dynasty Futures, you agree to our use of cookies. You can
              manage your preferences at any time through your browser settings.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              For more information, please review our{" "}
              <Link
                to="/legal"
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-row md:flex-col gap-3 md:min-w-[160px] flex-shrink-0">
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-gold-dark via-primary to-gold-light text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap"
            >
              Accept Cookies
            </button>
            <Link
              to="/legal"
              className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 text-sm font-medium transition-all duration-200 text-center whitespace-nowrap"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
