import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/Dynasty_Futures.png";
import PreLaunchModal from "@/components/PreLaunchModal";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Rules", path: "/rules" },
  { name: "FAQ", path: "/faq" },
  { name: "Support", path: "/support" },
  { name: "Legal", path: "/legal" },
];

const Footer = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <footer className="relative bg-gradient-to-t from-background via-card to-background border-t border-border/30">
      {/* Glow effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="flex flex-col justify-between min-h-[160px]">
            <div className="flex-1 flex items-center justify-start">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center gap-3 group"
              >
                <img
                  src={logo}
                  alt="Dynasty Futures"
                  className="h-10 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105 logo-blend"
                />
              </Link>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dynasty Futures is a proprietary trading firm offering simulated
              funded accounts to qualified futures traders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 link-transition inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setShowAnnouncement(true)}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 link-transition"
                >
                  Pre-Launch Announcement
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@dynastyfuturesdyn.com</li>
              <li>Mon - Fri: 9AM - 6PM EST</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclosure Banner */}
        <div className="mt-8 mb-8">
          <Link
            to="/legal"
            onClick={handleLinkClick}
            className="block bg-gradient-to-r from-primary/10 via-teal/10 to-soft-blue/10 rounded-xl border border-primary/30 p-4 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-primary"
                  >
                    <path
                      d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z"
                      fill="hsl(142 76% 45% / 0.2)"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 10l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">
                    Important Legal Disclosure
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    Read our full risk disclosure and terms
                  </p>
                </div>
              </div>
              <span className="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                Read Disclosure →
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Dynasty Futures. All rights reserved.
            </p>
            <span className="text-xs text-muted-foreground">
              All trading on Dynasty Futures is simulated. Payouts are based on
              simulated trading performance. This is not real trading, and no
              real capital is ever at risk.
            </span>
          </div>
        </div>
      </div>

      <PreLaunchModal
        externalOpen={showAnnouncement}
        onExternalClose={() => setShowAnnouncement(false)}
      />
    </footer>
  );
};

export default Footer;
