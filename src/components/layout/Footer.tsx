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
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Dynasty Futures LLC is a proprietary trading firm registered in
                Wyoming, offering simulated funded accounts to qualified futures
                traders.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/dynastyfutures"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/dynastyfutures"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/CMwf9Nsysq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.12 18.1.138 18.112a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/dynasty-futures"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
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
