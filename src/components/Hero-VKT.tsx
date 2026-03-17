"use client";

import { ArrowUpRight, CirclePlay, Shield, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Marquee from "./Marquee";
import { useAuth } from "@/context/AuthContext";

const partners = [
  "Bloomberg", "Reuters", "Nasdaq", "J.P. Morgan", "Goldman Sachs", "BlackRock", "Fidelity"
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoModalRef = useRef<HTMLDivElement | null>(null);
  const videoButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeVideoButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasVideoModalOpenRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { setShowAuthModal } = useAuth();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!showVideoModal) {
      if (wasVideoModalOpenRef.current) {
        videoButtonRef.current?.focus();
        wasVideoModalOpenRef.current = false;
      }
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowVideoModal(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = videoModalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    wasVideoModalOpenRef.current = true;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeVideoButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showVideoModal]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax effects on mobile for better performance
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 1]); // Keep opacity at 1 for all devices
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 1]); // Disable scale on all devices
  const headlineY = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [0, -30]);
  const statsY = useTransform(scrollYProgress, [0, 0.6], isMobile ? [0, 0] : [0, 40]);

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden pb-16 md:pb-24">
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
          <button 
            onClick={() => setShowAuthModal(true)}
            className="btn-gold gap-2 px-8 py-3 text-sm w-full sm:w-auto justify-center"
          >
            Begin Your Journey
            <ArrowUpRight size={14} />
          </button>
          <button
            ref={videoButtonRef}
            type="button"
            onClick={() => setShowVideoModal(true)}
            className="btn-outline gap-2 px-8 py-3 text-sm w-full sm:w-auto justify-center"
            aria-haspopup="dialog"
            aria-controls="hero-video-modal"
          >
            <CirclePlay size={16} className="text-[#D4AF37]" />
            Watch Video
          </button>
          <a href="/about" className="btn-outline gap-2 px-8 py-3 text-sm w-full sm:w-auto justify-center">
            Learn More
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

      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden={false}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowVideoModal(false)}
              aria-label="Close video modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={videoModalRef}
              id="hero-video-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hero-video-title"
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050507] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-4 md:px-6">
                <div>
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mb-1">
                    Goldbridge Overview
                  </p>
                  <h2 id="hero-video-title" className="text-white text-lg md:text-xl font-display font-semibold">
                    Watch the Goldbridge introduction
                  </h2>
                </div>
                <button
                  ref={closeVideoButtonRef}
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#666] transition-colors hover:text-white"
                  aria-label="Close video"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative w-full overflow-hidden bg-black pt-[56.25%]">
                <iframe
                  src="https://player.vimeo.com/video/1171206958?autoplay=1&title=0&byline=0&portrait=0&dnt=1"
                  title="Goldbridge Capital introduction video"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  loading="eager"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              <div className="flex flex-col gap-2 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                <p className="text-[#666] text-xs md:text-sm leading-relaxed max-w-2xl">
                  A concise introduction to Goldbridge Capital, our investment structure, and how participation works.
                </p>
                <p className="text-[#444] text-[10px] uppercase tracking-[0.24em]">
                  Vimeo • Opens on demand
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
