import { cn } from "@/lib/utils";
import dxfeedLogo from "@/assets/dxfeed-logo.png";
import deepchartsLogo from "@/assets/deepcharts-logo.png";
import volumetricaLogo from "@/assets/volumetrica-logo-official-clean_1.png";

interface Sponsor {
  name: string;
  logo: React.ReactNode;
}

interface SponsorTickerProps {
  sponsors?: Sponsor[];
  className?: string;
}

const SponsorTicker = ({
  sponsors,
  className,
}: SponsorTickerProps) => {
  const displaySponsors = sponsors || DefaultSponsors;

  return (
    <div className={cn("relative", className)}>
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="sponsor-track flex items-center">
          <style>{`
            .sponsor-image-main-wrapper {
              overflow: hidden;
            }
            .sponsor-track {
              display: flex;
              -webkit-animation: scroll-sponsors 30s linear infinite;
              animation: scroll-sponsors 30s linear infinite;
            }
            @media (max-width: 768px) {
              .sponsor-track {
                -webkit-animation-duration: 14s;
                animation-duration: 14s;
              }
            }
            .sponsor-image-wrapper {
              display: flex;
              flex-shrink: 0;
              animation: none !important;
              -webkit-animation: none !important;
            }
            @-webkit-keyframes scroll-sponsors {
              0% { -webkit-transform: translateX(0); }
              100% { -webkit-transform: translateX(-20%); }
            }
            @keyframes scroll-sponsors {
              0% { transform: translateX(0); }
              100% { transform: translateX(-20%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .sponsor-track {
                animation: none !important;
                -webkit-animation: none !important;
              }
            }
          `}</style>
          <div className="sponsor-image-wrapper">
            {displaySponsors.map((sponsor) => (
              <div key={sponsor.name} className="mx-8 flex items-center justify-center">
                {sponsor.logo}
              </div>
            ))}
          </div>
          <div className="sponsor-image-wrapper">
            {displaySponsors.map((sponsor) => (
              <div key={`${sponsor.name}-dup`} className="mx-8 flex items-center justify-center">
                {sponsor.logo}
              </div>
            ))}
          </div>
          <div className="sponsor-image-wrapper">
            {displaySponsors.map((sponsor) => (
              <div key={`${sponsor.name}-dup2`} className="mx-8 flex items-center justify-center">
                {sponsor.logo}
              </div>
            ))}
          </div>
          <div className="sponsor-image-wrapper">
            {displaySponsors.map((sponsor) => (
              <div key={`${sponsor.name}-dup3`} className="mx-8 flex items-center justify-center">
                {sponsor.logo}
              </div>
            ))}
          </div>
          <div className="sponsor-image-wrapper">
            {displaySponsors.map((sponsor) => (
              <div key={`${sponsor.name}-dup4`} className="mx-8 flex items-center justify-center">
                {sponsor.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorTicker;

export const DefaultSponsors: Sponsor[] = [
  {
    name: "Volumetrica",
    logo: (
      <img
        src={volumetricaLogo}
        alt="Volumetrica"
        className="h-10 w-auto object-contain"
      />
    ),
  },
  {
    name: "DXFeed",
    logo: (
      <img
        src={dxfeedLogo}
        alt="DXFeed"
        className="h-10 w-auto object-contain"
      />
    ),
  },
  {
    name: "DeepCharts",
    logo: (
      <img
        src={deepchartsLogo}
        alt="DeepCharts"
        className="h-10 w-auto object-contain"
      />
    ),
  },
];
