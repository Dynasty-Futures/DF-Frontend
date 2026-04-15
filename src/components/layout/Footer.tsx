import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/Dynasty_Futures.png";
import PreLaunchModal from "@/components/PreLaunchModal";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Pricing", path: "/pricing" },
  { name: "Rules", path: "/rules" },
  { name: "FAQ", path: "/faq" },
  { name: "Affiliates", path: "/affiliates" },
  { name: "Support", path: "/support" },
  { name: "Legal", path: "/legal" },
];

const Footer = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <footer className="relative bg-gradient-to-t from-background via-card/50 to-transparent">
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
              Dynasty Futures LLC is a proprietary trading firm registered in
              Wyoming, offering simulated funded accounts to qualified futures
              traders.
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
        <div className="mt-8">
          <Link
            to="/legal"
            onClick={handleLinkClick}
            className="block bg-gradient-to-r from-gold-dark/10 via-primary/10 to-gold-light/10 rounded-xl border border-primary/30 p-4 hover:border-primary/50 transition-all duration-300 group"
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
                      fill="hsl(43 74% 49% / 0.2)"
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

        {/* Disclaimer Text */}
        <div className="mt-4 mb-8 max-w-4xl space-y-3">
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            Any references on this website to trading, traders, accounts,
            performance, revenue, profits, or payouts refer to simulated or
            evaluation-based activity unless expressly stated otherwise.
            Dynasty Futures provides proprietary trading evaluation services
            and does not offer investment advice, brokerage services, or live
            client investment accounts. Futures trading involves substantial
            risk and is not appropriate for every person. Past performance,
            whether actual, simulated, or advertised, is not indicative of
            future results.
          </p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            Any performance information, metrics, or examples shown on this
            website may be based on simulated, hypothetical, or evaluation
            account performance. Hypothetical results do not reflect real
            market execution, liquidity constraints, or slippage, and may
            overstate or understate actual performance. No representation is
            made that any user will achieve profits or losses similar to those
            referenced. Payout examples and testimonials are not a guarantee
            of future success. Individual results vary.
          </p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <strong className="text-muted-foreground/90">CFTC Rule 4.41:</strong>{" "}
            Hypothetical or simulated performance results have certain inherent
            limitations. Unlike an actual performance record, simulated results
            do not represent actual trading. Because trades have not been
            executed, results may have under- or over-compensated for the
            impact of certain market factors, including lack of liquidity.
            Simulated trading programs are also designed with the benefit of
            hindsight. No representation is made that any account will or is
            likely to achieve profits or losses similar to those shown.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Dynasty Futures LLC. All rights reserved.
          </p>
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
