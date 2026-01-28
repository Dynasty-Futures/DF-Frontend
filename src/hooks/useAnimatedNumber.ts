import { useState, useEffect, useRef } from 'react';

export const useAnimatedNumber = (
  targetValue: number,
  duration: number = 1000,
  decimalPlaces: number = 0
) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number>();
  const startValueRef = useRef(targetValue);
  const startTimeRef = useRef<number>();

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue =
        startValueRef.current + (targetValue - startValueRef.current) * eased;

      setDisplayValue(
        decimalPlaces > 0
          ? Number(currentValue.toFixed(decimalPlaces))
          : Math.round(currentValue)
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, decimalPlaces]);

  return displayValue;
};
