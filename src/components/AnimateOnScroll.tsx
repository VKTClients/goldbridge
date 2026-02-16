"use client";

import { motion, useInView } from "framer-motion";
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
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isInView = useInView(ref, { once, margin: isMobile ? "-30px" : "-60px" });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Skip animations entirely if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  // Simpler, faster animations on mobile
  const dist = distance ?? (isMobile ? 16 : 40);
  const mobileDuration = Math.min(duration * 0.6, 0.4);

  const directions = {
    up: { y: dist, x: 0 },
    down: { y: -dist, x: 0 },
    left: { x: dist, y: 0 },
    right: { x: -dist, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initial: Record<string, number | string> = {
    opacity: 0,
    y: directions[direction].y,
    x: directions[direction].x,
  };
  const visible: Record<string, number | string> = {
    opacity: 1,
    y: 0,
    x: 0,
  };

  // Disable scale and blur on mobile for performance
  if (scale && !isMobile) {
    initial.scale = 0.92;
    visible.scale = 1;
  }
  if (blur && !isMobile) {
    initial.filter = "blur(8px)";
    visible.filter = "blur(0px)";
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? visible : initial}
      transition={{
        duration: isMobile ? mobileDuration : duration,
        delay: isMobile ? Math.min(delay * 0.3, 0.1) : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
