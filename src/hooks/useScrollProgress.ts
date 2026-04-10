import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollProgress {
  progress: number;
  scrollY: number;
}

export function useScrollProgress(
  elementRef: React.RefObject<HTMLElement | null>,
): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
  });
  const rafId = useRef<number>(0);

  const update = useCallback(() => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const elementHeight = rect.height;
    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / elementHeight, 0), 1);
    setState({ progress, scrollY: window.scrollY });
  }, [elementRef]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return state;
}
