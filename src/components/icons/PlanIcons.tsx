import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  size?: number;
}

const GOLD = "hsl(43 74% 49%)";
const GOLD_LIGHT = "hsl(43 80% 65%)";
const GOLD_DARK = "hsl(35 55% 38%)";
const GOLD_BRIGHT = "hsl(43 80% 72%)";
const BRONZE = "hsl(35 55% 35%)";
const BRONZE_LIGHT = "hsl(35 60% 55%)";

export const StandardIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="standardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD_DARK} />
        <stop offset="50%" stopColor={GOLD} />
        <stop offset="100%" stopColor={GOLD_LIGHT} />
      </linearGradient>
      <filter id="standardGlow">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
      stroke={GOLD}
      strokeWidth="0.5"
      fill="none"
      opacity="0.4"
    />
    <path
      d="M13.5 3L6 13H11L9.5 21L18 10H12.5L13.5 3Z"
      fill="url(#standardGrad)"
      filter="url(#standardGlow)"
    />
    <path
      d="M12.8 5L8 12H11.5L10.5 18L16 11H12L12.8 5Z"
      fill={GOLD_BRIGHT}
      opacity="0.4"
    />
    <path
      d="M5 8L7 9M19 8L17 9M5 16L7 15M19 16L17 15"
      stroke={GOLD_LIGHT}
      strokeWidth="0.5"
      strokeLinecap="square"
      opacity="0.5"
    />
    <rect x="4" y="7" width="1.5" height="1.5" fill={GOLD} opacity="0.6" />
    <rect
      x="18.5"
      y="7"
      width="1.5"
      height="1.5"
      fill={GOLD_LIGHT}
      opacity="0.6"
    />
    <rect
      x="4"
      y="15.5"
      width="1.5"
      height="1.5"
      fill={BRONZE_LIGHT}
      opacity="0.5"
    />
    <rect
      x="18.5"
      y="15.5"
      width="1.5"
      height="1.5"
      fill={GOLD}
      opacity="0.5"
    />
  </svg>
);

export const AdvancedIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="advancedGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={GOLD_DARK} />
        <stop offset="50%" stopColor={GOLD} />
        <stop offset="100%" stopColor={GOLD_LIGHT} />
      </linearGradient>
      <linearGradient id="thrustGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={GOLD_LIGHT} />
        <stop offset="100%" stopColor={GOLD_DARK} stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path
      d="M4 4L20 4M4 8L20 8M4 12L20 12M4 16L20 16M4 20L20 20"
      stroke={BRONZE}
      strokeWidth="0.2"
      opacity="0.2"
    />
    <path
      d="M12 2L8 10L9 14L12 16L15 14L16 10L12 2Z"
      fill="url(#advancedGrad)"
    />
    <path d="M12 5L10.5 8L12 9L13.5 8L12 5Z" fill={GOLD_BRIGHT} />
    <path d="M12 6L11.2 7.5L12 8L12.8 7.5L12 6Z" fill="white" opacity="0.8" />
    <path d="M9 14L6 18L8 16L9 16.5L9 14Z" fill={GOLD_DARK} />
    <path d="M15 14L18 18L16 16L15 16.5L15 14Z" fill={GOLD_DARK} />
    <path d="M10 16L12 22L14 16L12 18L10 16Z" fill="url(#thrustGrad)" />
    <path
      d="M11 17L12 20L13 17L12 18L11 17Z"
      fill={GOLD_BRIGHT}
      opacity="0.7"
    />
    <path
      d="M6 6L4 5M18 6L20 5M5 10L3 10M19 10L21 10"
      stroke={GOLD_LIGHT}
      strokeWidth="0.5"
      strokeLinecap="square"
      opacity="0.4"
    />
  </svg>
);

export const BuilderIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="builderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD_BRIGHT} />
        <stop offset="30%" stopColor={GOLD} />
        <stop offset="60%" stopColor={GOLD_DARK} />
        <stop offset="100%" stopColor={GOLD_BRIGHT} />
      </linearGradient>
      <linearGradient id="gemGrad2" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={GOLD_LIGHT} />
        <stop offset="100%" stopColor={BRONZE_LIGHT} />
      </linearGradient>
    </defs>
    <path
      d="M12 1V4M6 3L7.5 5.5M18 3L16.5 5.5M3 7L6 8M21 7L18 8"
      stroke={GOLD_LIGHT}
      strokeWidth="0.5"
      strokeLinecap="square"
      opacity="0.4"
    />
    <path
      d="M3 19L5 9L9 13L12 6L15 13L19 9L21 19H3Z"
      fill="url(#builderGrad)"
    />
    <rect x="3" y="19" width="18" height="3" fill={BRONZE} />
    <rect x="4" y="19.5" width="16" height="2" fill={GOLD} opacity="0.3" />
    <path d="M12 10L14 14H10L12 10Z" fill="url(#gemGrad2)" />
    <path d="M12 11L13 13H11L12 11Z" fill={GOLD_BRIGHT} opacity="0.7" />
    <path d="M7 15L8.5 17H5.5L7 15Z" fill={GOLD} />
    <path d="M17 15L18.5 17H15.5L17 15Z" fill={GOLD_LIGHT} />
    <circle cx="5" cy="9" r="1" fill={GOLD_LIGHT} />
    <circle cx="5" cy="9" r="0.4" fill="white" opacity="0.7" />
    <circle cx="12" cy="6" r="1.2" fill={GOLD} />
    <circle cx="12" cy="6" r="0.5" fill="white" opacity="0.8" />
    <circle cx="19" cy="9" r="1" fill={GOLD_DARK} />
    <circle cx="19" cy="9" r="0.4" fill="white" opacity="0.7" />
    <rect x="5.5" y="20" width="1" height="1" fill={GOLD} />
    <rect x="11.5" y="20" width="1" height="1" fill={GOLD_LIGHT} />
    <rect x="17.5" y="20" width="1" height="1" fill={BRONZE_LIGHT} />
  </svg>
);

const PLAN_IMAGES = {
  standard: "/standardplan.webp",
  advanced: "/advancedplan.webp",
  builder: "/builderplan.webp",
} as const;

export type PlanImageKey = keyof typeof PLAN_IMAGES;

interface PlanImageProps {
  plan: PlanImageKey;
  className?: string;
  size?: number;
}

const PLAN_IMAGE_LABELS: Record<PlanImageKey, string> = {
  standard: "Standard Plan",
  advanced: "Advanced Plan",
  builder: "Builder Plan",
};

export function PlanImage({ plan, className, size = 40 }: PlanImageProps) {
  return (
    <img
      src={PLAN_IMAGES[plan]}
      alt={PLAN_IMAGE_LABELS[plan]}
      width={size}
      height={size}
      loading="lazy"
      className={cn("object-contain", className)}
    />
  );
}

export const CheckIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD_DARK} />
        <stop offset="100%" stopColor={GOLD} />
      </linearGradient>
    </defs>
    <circle cx="10" cy="10" r="9" fill="hsl(43 74% 49% / 0.15)" />
    <path
      d="M6 10l3 3 5-6"
      stroke="url(#checkGrad)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CrossIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <circle cx="10" cy="10" r="9" fill="hsl(0 84% 60% / 0.15)" />
    <path
      d="M7 7l6 6M13 7l-6 6"
      stroke="hsl(0 84% 60%)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const StarIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD_LIGHT} />
        <stop offset="50%" stopColor={GOLD} />
        <stop offset="100%" stopColor={GOLD_DARK} />
      </linearGradient>
    </defs>
    <path
      d="M10 2l2.5 5 5.5 1-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1z"
      fill="url(#starGrad)"
    />
  </svg>
);

export const ClockIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD_DARK} />
        <stop offset="100%" stopColor={GOLD_LIGHT} />
      </linearGradient>
    </defs>
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="url(#clockGrad)"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M10 5v5l3 3"
      stroke="url(#clockGrad)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ShieldIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD_DARK} />
        <stop offset="100%" stopColor={GOLD} />
      </linearGradient>
    </defs>
    <path
      d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z"
      fill="hsl(43 74% 49% / 0.2)"
      stroke="url(#shieldGrad)"
      strokeWidth="1.5"
    />
    <path
      d="M7 10l2 2 4-4"
      stroke="url(#shieldGrad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DollarIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={cn("transition-all duration-300", className)}
  >
    <defs>
      <linearGradient id="dollarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD_DARK} />
        <stop offset="50%" stopColor={GOLD} />
        <stop offset="100%" stopColor={GOLD_LIGHT} />
      </linearGradient>
    </defs>
    <circle cx="10" cy="10" r="9" fill="hsl(43 74% 49% / 0.15)" />
    <rect x="9" y="2.5" width="2" height="15" rx="1" fill="url(#dollarGrad)" />
    <path
      d="M13.5 7c0-1.3-1.5-2.2-3.5-2.2S6.5 5.7 6.5 7c0 1.3 1.5 2.1 3.5 2.5 2 .4 3.5 1.2 3.5 2.5s-1.5 2.3-3.5 2.3-3.5-1-3.5-2.3"
      stroke="url(#dollarGrad)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
