/**
 * DEVELOPER NOTE: In production, achievement states (locked/in-progress/unlocked),
 * progress percentages, and dates will be driven by live trading data from
 * PropTradeTech / broker APIs. Rarity and category can remain static metadata.
 */

import {
  Award,
  Target,
  CircleDollarSign,
  TrendingUp,
  Zap,
  Gem,
  Crown,
  Lock,
  Medal,
  Percent,
  Trophy,
  Snowflake,
  Timer,
  Layers,
  Shield,
  CalendarCheck,
  Globe,
  Diamond,
  BookOpen,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Rarity = "common" | "rare" | "epic" | "legendary";
type AchievementState = "locked" | "in-progress" | "unlocked";
type Category = "progression" | "performance" | "payout";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: Category;
  rarity: Rarity;
  state: AchievementState;
  unlockedDate?: string;
  progress?: {
    current: number;
    target: number;
    label: string;
  };
}

const rarityConfig: Record<
  Rarity,
  { label: string; className: string; glowClass: string }
> = {
  common: {
    label: "Common",
    className: "rarity-common-tag",
    glowClass: "rarity-common",
  },
  rare: {
    label: "Rare",
    className: "rarity-rare-tag",
    glowClass: "rarity-rare",
  },
  epic: {
    label: "Epic",
    className: "rarity-epic-tag",
    glowClass: "rarity-epic",
  },
  legendary: {
    label: "Legendary",
    className: "rarity-legendary-tag",
    glowClass: "rarity-legendary",
  },
};

// Check if achievement was unlocked within last 7 days
const isRecentlyUnlocked = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  const unlockDate = new Date(dateStr + ", 2025");
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - unlockDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays <= 7;
};

// Mock achievements data - ranked by difficulty within each category
const achievements: Achievement[] = [
  // === PROGRESSION (easiest to hardest) ===
  {
    id: "first-steps",
    title: "First Steps",
    description: "Complete your first evaluation",
    icon: <Target size={24} className="text-primary" />,
    category: "progression",
    rarity: "common",
    state: "unlocked",
    unlockedDate: "Jan 15, 2025",
  },
  {
    id: "the-analyst",
    title: "The Analyst",
    description: "Log 50 entries in your trading journal",
    icon: <BookOpen size={24} className="text-primary" />,
    category: "progression",
    rarity: "common",
    state: "in-progress",
    progress: { current: 32, target: 50, label: "32 / 50 entries" },
  },
  {
    id: "funded-trader",
    title: "Funded Trader",
    description: "Pass evaluation and become funded",
    icon: <Award size={24} className="text-primary" />,
    category: "progression",
    rarity: "rare",
    state: "unlocked",
    unlockedDate: "Jan 20, 2025",
  },
  {
    id: "1k-profit-club",
    title: "$1K Profit Club",
    description: "Earn $1,000 in total profits",
    icon: <TrendingUp size={24} className="text-primary" />,
    category: "progression",
    rarity: "rare",
    state: "unlocked",
    unlockedDate: "Feb 5, 2025",
  },
  {
    id: "5k-profit-club",
    title: "$5K Profit Club",
    description: "Earn $5,000 in total profits",
    icon: <Gem size={24} className="text-primary" />,
    category: "progression",
    rarity: "epic",
    state: "in-progress",
    progress: { current: 3500, target: 5000, label: "$3,500 / $5,000" },
  },
  {
    id: "10k-profit-club",
    title: "$10K Profit Club",
    description: "Earn $10,000 in total profits",
    icon: <Medal size={24} className="text-primary" />,
    category: "progression",
    rarity: "legendary",
    state: "locked",
  },
  {
    id: "dynasty-elite",
    title: "Dynasty Elite",
    description: "Maintain funded status for 6 months",
    icon: <Crown size={24} className="text-primary" />,
    category: "progression",
    rarity: "legendary",
    state: "in-progress",
    progress: { current: 2, target: 6, label: "2 / 6 months" },
  },

  // === PERFORMANCE (easiest to hardest) ===
  {
    id: "ice-cold",
    title: "Ice Cold",
    description: "Execute a trade with zero slippage",
    icon: <Snowflake size={24} className="text-primary" />,
    category: "performance",
    rarity: "common",
    state: "unlocked",
    unlockedDate: "Dec 14, 2025",
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Complete 10 trades in a single session",
    icon: <Timer size={24} className="text-primary" />,
    category: "performance",
    rarity: "rare",
    state: "unlocked",
    unlockedDate: "Feb 10, 2025",
  },
  {
    id: "diversified",
    title: "Diversified",
    description: "Trade 5 different instruments in one week",
    icon: <Layers size={24} className="text-primary" />,
    category: "performance",
    rarity: "rare",
    state: "in-progress",
    progress: { current: 3, target: 5, label: "3 / 5 instruments" },
  },
  {
    id: "risk-manager",
    title: "Risk Manager",
    description: "Complete 20 trades within risk limits",
    icon: <Shield size={24} className="text-primary" />,
    category: "performance",
    rarity: "rare",
    state: "unlocked",
    unlockedDate: "Feb 8, 2025",
  },
  {
    id: "hot-streak",
    title: "Hot Streak",
    description: "5 consecutive winning days",
    icon: <Zap size={24} className="text-primary" />,
    category: "performance",
    rarity: "rare",
    state: "unlocked",
    unlockedDate: "Feb 8, 2025",
  },
  {
    id: "consistency-is-key",
    title: "Consistency Is Key",
    description: "Maintain 60%+ win rate for 30 days",
    icon: <Percent size={24} className="text-primary" />,
    category: "performance",
    rarity: "epic",
    state: "in-progress",
    progress: { current: 18, target: 30, label: "18 / 30 days" },
  },
  {
    id: "perfect-week",
    title: "Perfect Week",
    description: "Profitable every day Monday through Friday",
    icon: <CalendarCheck size={24} className="text-primary" />,
    category: "performance",
    rarity: "epic",
    state: "locked",
  },
  {
    id: "the-comeback-kid",
    title: "The Comeback Kid",
    description: "Recover from Max Loss Limit to break even",
    icon: <TrendingUp size={24} className="text-primary" />,
    category: "performance",
    rarity: "epic",
    state: "locked",
  },
  {
    id: "triple-threat",
    title: "Triple Threat",
    description: "Win trades in Asia, EU, and US sessions in one day",
    icon: <Globe size={24} className="text-primary" />,
    category: "performance",
    rarity: "legendary",
    state: "locked",
  },
  {
    id: "diamond-hands",
    title: "Diamond Hands",
    description: "Hold a profitable position for 8+ hours",
    icon: <Diamond size={24} className="text-primary" />,
    category: "performance",
    rarity: "legendary",
    state: "locked",
  },

  // === PAYOUT & PROFIT (easiest to hardest) ===
  {
    id: "first-payout",
    title: "First Payout",
    description: "Request your first payout",
    icon: <CircleDollarSign size={24} className="text-primary" />,
    category: "payout",
    rarity: "common",
    state: "unlocked",
    unlockedDate: "Feb 1, 2025",
  },
  {
    id: "consistent-cashout",
    title: "Consistent Cashout",
    description: "Request payouts 3 months in a row",
    icon: <Repeat size={24} className="text-primary" />,
    category: "payout",
    rarity: "epic",
    state: "in-progress",
    progress: { current: 1, target: 3, label: "1 / 3 months" },
  },
];

const RarityTag = ({
  rarity,
  muted = false,
}: {
  rarity: Rarity;
  muted?: boolean;
}) => {
  const config = rarityConfig[rarity];
  return (
    <span
      className={cn(
        "px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border",
        config.className,
        muted && "opacity-50"
      )}
    >
      {config.label}
    </span>
  );
};

const ProgressBar = ({
  current,
  target,
  label,
}: {
  current: number;
  target: number;
  label: string;
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  return (
    <div className="mt-3 space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">Progress</span>
        <span className="text-foreground font-medium">{label}</span>
      </div>
      <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-teal rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard = ({ achievement, index }: AchievementCardProps) => {
  const { title, description, icon, rarity, state, unlockedDate, progress } =
    achievement;
  const config = rarityConfig[rarity];

  const isUnlocked = state === "unlocked";
  const isInProgress = state === "in-progress";
  const isLocked = state === "locked";
  const isNew = isUnlocked && isRecentlyUnlocked(unlockedDate);
  const hasShimmer =
    isUnlocked && (rarity === "epic" || rarity === "legendary");

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden group animate-fade-in",
            isUnlocked && [
              "bg-card/60 backdrop-blur-sm",
              config.glowClass,
              "achievement-card-hover cursor-default",
            ],
            isInProgress && [
              "bg-card/40 backdrop-blur-sm border-border/50",
              "achievement-card-hover cursor-default opacity-90",
            ],
            isLocked && [
              "bg-muted/10 border-border/20 opacity-40 cursor-not-allowed",
            ]
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Shimmer overlay for epic/legendary unlocked */}
          {hasShimmer && (
            <div className="achievement-shimmer absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          {/* Gradient overlay for unlocked */}
          {isUnlocked && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal/5 pointer-events-none" />
          )}

          {/* NEW badge for recently unlocked */}
          {isNew && (
            <div className="absolute top-4 left-4 z-10">
              <span className="new-badge px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-primary text-primary-foreground">
                NEW
              </span>
            </div>
          )}

          {/* Rarity tag - top right */}
          <div className="absolute top-4 right-4">
            <RarityTag rarity={rarity} muted={isLocked} />
          </div>

          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div
              className={cn(
                "p-3 rounded-xl border transition-all flex-shrink-0",
                isUnlocked &&
                  "bg-primary/15 border-primary/30 animate-icon-3d-float",
                isInProgress && "bg-primary/10 border-primary/20",
                isLocked && "bg-muted/20 border-border/30"
              )}
            >
              {isLocked ? (
                <Lock size={24} className="text-muted-foreground" />
              ) : (
                icon
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-16">
              <h4
                className={cn(
                  "font-semibold text-lg",
                  isLocked ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>

              {/* Unlocked date pill */}
              {isUnlocked && unlockedDate && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Trophy size={12} className="text-primary" />
                  <span className="text-xs text-primary font-medium">
                    Unlocked {unlockedDate}
                  </span>
                </div>
              )}

              {/* Progress bar for in-progress */}
              {isInProgress && progress && (
                <ProgressBar
                  current={progress.current}
                  target={progress.target}
                  label={progress.label}
                />
              )}
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs p-4 space-y-2">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {isInProgress && progress && (
          <p className="text-xs text-primary font-medium">
            Progress: {progress.label}
          </p>
        )}
        {isUnlocked && unlockedDate && (
          <p className="text-xs text-primary font-medium">
            Unlocked: {unlockedDate}
          </p>
        )}
        {isLocked && (
          <p className="text-xs text-muted-foreground italic">
            Complete the requirements to unlock
          </p>
        )}
        <div className="pt-1">
          <RarityTag rarity={rarity} muted={isLocked} />
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const CategorySection = ({
  title,
  achievements,
}: {
  title: string;
  achievements: Achievement[];
}) => {
  if (achievements.length === 0) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, idx) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={idx}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

const DashboardAchievements = () => {
  const unlockedCount = achievements.filter(
    (a) => a.state === "unlocked"
  ).length;
  const totalCount = achievements.length;

  const progressionAchievements = achievements.filter(
    (a) => a.category === "progression"
  );
  const performanceAchievements = achievements.filter(
    (a) => a.category === "performance"
  );
  const payoutAchievements = achievements.filter(
    (a) => a.category === "payout"
  );

  return (
    <div className="space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground mt-1">
            Track your trading milestones and unlock rewards
          </p>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary/10 border border-primary/30">
          <Award size={24} className="text-primary" />
          <span className="text-xl font-bold text-foreground">
            {unlockedCount}
          </span>
          <span className="text-muted-foreground">of</span>
          <span className="text-xl font-bold text-foreground">
            {totalCount}
          </span>
          <span className="text-muted-foreground text-sm">Unlocked</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        <CategorySection
          title="Progression"
          achievements={progressionAchievements}
        />
        <CategorySection
          title="Performance"
          achievements={performanceAchievements}
        />
        <CategorySection
          title="Payout & Profit"
          achievements={payoutAchievements}
        />
      </div>
    </div>
  );
};

export default DashboardAchievements;
