"use client";

import { useRef, useEffect, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  scale?: boolean;
  blur?: boolean;
  distance?: number;
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
  scale = false,
  blur = false,
  distance,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once) {
            if (!hasAnimated.current) {
              hasAnimated.current = true;
              setIsVisible(true);
            }
          } else {
            setIsVisible(true);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.05, rootMargin: "0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  // Calculate transform based on direction
  const dist = distance ?? 25;
  const getTransform = () => {
    if (isVisible) {
      return scale ? "translateY(0) scale(1)" : "translateY(0)";
    }
    switch (direction) {
      case "up": return scale ? `translateY(${dist}px) scale(0.98)` : `translateY(${dist}px)`;
      case "down": return scale ? `translateY(-${dist}px) scale(0.98)` : `translateY(-${dist}px)`;
      case "left": return scale ? `translateX(${dist}px) scale(0.98)` : `translateX(${dist}px)`;
      case "right": return scale ? `translateX(-${dist}px) scale(0.98)` : `translateX(-${dist}px)`;
      default: return scale ? "scale(0.98)" : "none";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
