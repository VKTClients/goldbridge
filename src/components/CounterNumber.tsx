"use client";

import { useEffect, useRef, useState } from "react";

interface CounterNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CounterNumber({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2000,
  className = "",
}: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number;
          let animationFrame: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * end);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            }
          };

          animationFrame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
