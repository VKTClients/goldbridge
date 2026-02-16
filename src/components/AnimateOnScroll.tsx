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
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to avoid blur flash
  const isInView = useInView(ref, { once, margin: "-20px" });

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile or before mount, render without animations to prevent blur flash
  if (!mounted || isMobile) {
    return (
      <div 
        ref={ref} 
        className={className}
        style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
      >
        {children}
      </div>
    );
  }

  // Desktop animations
  const dist = distance ?? 40;

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

  if (scale) {
    initial.scale = 0.92;
    visible.scale = 1;
  }
  if (blur) {
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
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
