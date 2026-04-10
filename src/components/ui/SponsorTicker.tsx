import { cn } from "@/lib/utils";

interface Sponsor {
  name: string;
  logo: React.ReactNode;
}

interface SponsorTickerProps {
  sponsors: Sponsor[];
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  fadeEdges?: boolean;
}

const SponsorTicker = ({
  sponsors,
  className,
  speed = 30,
  direction = "left",
  fadeEdges = true,
}: SponsorTickerProps) => {
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {fadeEdges && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </>
      )}

      <div
        className="flex items-center"
        style={{
          animation: `sponsorScroll-${direction} ${speed}s linear infinite`,
        }}
      >
        <style>{`
          @keyframes sponsorScroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          @keyframes sponsorScroll-right {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="sponsorScroll"] {
              animation: none !important;
            }
          }
        `}</style>
        {duplicatedSponsors.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
            className="flex-shrink-0 mx-8 flex items-center justify-center"
          >
            {sponsor.logo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorTicker;

export const DefaultSponsors: Sponsor[] = [
  {
    name: "Volumetrica",
    logo: (
      <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors px-4">
        <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="6" height="24" rx="2" fill="currentColor"/>
          <rect x="13" y="4" width="6" height="32" rx="2" fill="currentColor" opacity="0.8"/>
          <rect x="22" y="10" width="6" height="20" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="31" y="6" width="6" height="28" rx="2" fill="currentColor" opacity="0.4"/>
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap tracking-wide">Volumetrica</span>
      </div>
    ),
  },
  {
    name: "DXFeed",
    logo: (
      <div className="flex items-center gap-2 text-gold-dark/70 hover:text-gold-dark transition-colors px-4">
        <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          <path d="M10 20L16 14L22 18L28 12L34 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="34" cy="16" r="2" fill="currentColor"/>
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap tracking-wide">DXFeed</span>
      </div>
    ),
  },
  {
    name: "Stripe",
    logo: (
      <div className="flex items-center gap-2 text-blue-400/70 hover:text-blue-400 transition-colors px-4">
        <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 14.5C18.5 12 20 10 22.5 10C24 10 26 11 26 12C26 13.5 24 14 22 14.5C21 14.7 20 15 18.5 15.5V14.5Z" fill="currentColor"/>
          <path d="M32 20C32 16.5 28.5 14 25 14C23 14 21 14.8 20 16C19.5 16 20.5 13.5 22 12C24.5 9.5 29 10 32 13.5C34 16 34 19.5 32 22C30 25 26 26.5 23 26.5C21 26.5 19 26 18 25.5L18 30C19 30.5 21 31 23 31C27.5 31 32 29 32 24V20Z" fill="currentColor"/>
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap tracking-wide">Stripe</span>
      </div>
    ),
  },
  {
    name: "DeepCharts",
    logo: (
      <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors px-4">
        <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 30L14 20L20 24L30 10L38 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="14" cy="20" r="3" fill="currentColor"/>
          <circle cx="20" cy="24" r="3" fill="currentColor"/>
          <circle cx="30" cy="10" r="3" fill="currentColor"/>
          <circle cx="38" cy="16" r="3" fill="currentColor"/>
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap tracking-wide">DeepCharts</span>
      </div>
    ),
  },
];
