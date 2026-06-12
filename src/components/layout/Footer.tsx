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
  { name: "Legal / Terms of Use", path: "/legal?tab=terms" },
  { name: "Refund & Cancellation Policy", path: "/legal?tab=refund" },
  { name: "Restricted Countries & Regions", path: "/legal?tab=restricted" },
];

const dynastyArticleLinks = [
  { name: "Essential Trading Rules Overview", path: "/legal?tab=trading-rules" },
  { name: "KYC & AML Policy", path: "/legal?tab=kyc-aml" },
  { name: "Rise Payout Guide", path: "/legal?tab=rise-payouts" },
  { name: "Daily Loss Limit Explained", path: "/legal?tab=trading-rules&rule=daily-loss" },
  { name: "Drawdown Rules Explained", path: "/legal?tab=trading-rules&rule=drawdown" },
  { name: "News Trading Policy", path: "/legal?tab=trading-rules&rule=news-trading" },
  { name: "Consistency Rule Explained", path: "/legal?tab=trading-rules&rule=consistency" },
  { name: "Position Size Limits", path: "/legal?tab=trading-rules&rule=position-size" },
  { name: "Profit Targets Explained", path: "/legal?tab=trading-rules&rule=profit-targets" },
  { name: "Payouts & Profit Split", path: "/legal?tab=trading-rules&rule=payouts-split" },
  { name: "Account Violations & Resets", path: "/legal?tab=trading-rules&rule=violations" },
  { name: "Copy Trading & Automated Systems Policy", path: "/legal?tab=trading-rules&rule=copy-trading" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
                  href="https://www.instagram.com/dynasty.futures/?utm_source=ig_web_button_share_sheet"
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
                  href="https://twitter.com/DynastyFuturesT"
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
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942.0209-.0406.0012-.0916-.0407-.1057a13.2995 13.2995 0 01-1.8727-.8998.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8985.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/dynasty-futures/"
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

          {/* Dynasty Articles */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Dynasty Articles
            </h4>
            <ul className="space-y-2">
              {dynastyArticleLinks.map((link) => (
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
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@dynastyfuturesdyn.com</li>
              <li>Available 24 hours a day, 7 days a week</li>
              <li>
                <Link
                  to="/support"
                  onClick={handleLinkClick}
                  className="hover:text-primary transition-colors duration-300 link-transition inline-block"
                >
                  Support
                </Link>
              </li>
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
                    Help Center And Important Legal Disclosure
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
