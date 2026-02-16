"use client";

import { ArrowUpRight, Shield, TrendingUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Marquee from "./Marquee";

const partners = [
  "Bloomberg", "Reuters", "Nasdaq", "J.P. Morgan", "Goldman Sachs", "BlackRock", "Fidelity"
];

export default function Hero() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax effects on mobile for better performance
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], isMobile ? [1, 1] : [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 1]); // Disable scale on all devices
  const headlineY = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [0, -30]);
  const statsY = useTransform(scrollYProgress, [0, 0.6], isMobile ? [0, 0] : [0, 40]);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg" />
      <motion.div
        className="aurora aurora-gold top-[5%] left-[15%] w-[200px] md:w-[600px] h-[150px] md:h-[400px] opacity-[0.05] md:opacity-[0.1]"
        style={{ y: y3 }}
      />
      <motion.div
        className="aurora aurora-white top-[20%] right-[10%] w-[150px] md:w-[300px] h-[120px] md:h-[250px] opacity-[0.02] md:opacity-[0.04]"
        style={{ y: y2 }}
      />

      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 pt-28 md:pt-36 pb-16 md:pb-24"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Floating badges - parallax (desktop only) */}
        <motion.div
          className="floating-badge top-40 left-[6%] hidden lg:flex"
          style={{ y: y1 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="dot-gold" />
          <span>XAU/USD +0.92%</span>
        </motion.div>

        <motion.div
          className="floating-badge top-48 right-[10%] hidden lg:flex"
          style={{ y: y2 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          <div className="dot bg-emerald-400" />
          <span>BTC $97,842</span>
        </motion.div>

        <motion.div
          className="floating-badge top-[58%] left-[4%] hidden lg:flex"
          style={{ y: y3 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          <Shield size={10} className="text-[#D4AF37]" />
          <span className="text-[#D4AF37]">Bank-Grade Security</span>
        </motion.div>

        <motion.div
          className="floating-badge top-[62%] right-[6%] hidden lg:flex"
          style={{ y: y1 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          <TrendingUp size={10} className="text-emerald-400" />
          <span>S&P 500 +0.42%</span>
        </motion.div>

        {/* Top pill */}
        <motion.div
          className="flex justify-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="pill-gold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-gold" />
            Exclusive Wealth Management
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center max-w-5xl mx-auto mb-6 md:mb-8"
          style={{ y: headlineY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[86px] font-bold leading-[1.08] tracking-tight">
            <span className="text-white">Your Capital,</span>
            <br />
            <span className="gold-text">Amplified</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-center text-[#555] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed px-2"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          From capital allocation to cycle completion, GoldBridge is designed
          to be clear, disciplined and transparent.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a href="/invest" className="btn-gold gap-2 px-8 py-3 text-sm w-full sm:w-auto justify-center">
            Begin Your Journey
            <ArrowUpRight size={14} />
          </a>
          <a href="#markets" className="btn-outline gap-2 px-8 py-3 text-sm w-full sm:w-auto justify-center">
            View Markets
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center justify-center gap-6 sm:gap-8 md:gap-16 mb-16 md:mb-20"
          style={{ y: statsY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <div className="text-center">
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold">$2.4B+</p>
            <p className="text-[#444] text-[9px] sm:text-[10px] uppercase tracking-wider mt-1">Assets Managed</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-white/[0.06]" />
          <div className="text-center">
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold">12,000+</p>
            <p className="text-[#444] text-[9px] sm:text-[10px] uppercase tracking-wider mt-1">Active Investors</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-white/[0.06]" />
          <div className="text-center">
            <p className="text-[#D4AF37] text-xl sm:text-2xl md:text-3xl font-bold">98.2%</p>
            <p className="text-[#444] text-[9px] sm:text-[10px] uppercase tracking-wider mt-1">Client Retention</p>
          </div>
        </motion.div>

        {/* Floating dots - animated (desktop only) */}
        <motion.div
          className="absolute bottom-[30%] left-[15%] hidden lg:block"
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
        </motion.div>
        <motion.div
          className="absolute bottom-[35%] right-[20%] hidden lg:block"
          animate={{ y: [0, 8, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </motion.div>

        {/* Partner logos - infinite marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="text-center text-[#333] text-[9px] uppercase tracking-[0.3em] mb-5">
            Trusted by leading institutions
          </p>
          <Marquee speed={30}>
            {partners.map((name) => (
              <span key={name} className="text-[11px] text-white/40 font-medium tracking-wider whitespace-nowrap">
                {name}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </motion.div>
    </section>
  );
}
