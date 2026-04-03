import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal, prefersReducedMotion } from "@/hooks/useScrollReveal";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const directionTransform: Record<RevealDirection, (d: number) => string> = {
  up: (d) => `translateY(${d}px)`,
  down: (d) => `translateY(-${d}px)`,
  left: (d) => `translateX(${d}px)`,
  right: (d) => `translateX(-${d}px)`,
  none: () => "none",
};

const ScrollReveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 30,
  threshold = 0.1,
  once = true,
  as: Tag = "div",
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    once,
  });

  const effectiveDuration = prefersReducedMotion ? 0 : duration;
  const effectiveDirection = prefersReducedMotion ? "none" : direction;

  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "none"
          : directionTransform[effectiveDirection](distance),
        transition: `opacity ${effectiveDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${effectiveDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
