"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Faster loading on mobile for better perceived performance
    const isMobile = window.innerWidth < 768;
    const timer = setTimeout(() => setLoading(false), isMobile ? 1000 : 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#060608] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.img
              src="/Image-removebg-preview.png"
              alt="Goldbridge Capital"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-12 w-auto object-contain"
            />

            {/* Loading bar */}
            <div className="w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #B8942E, #D4AF37, #FFD966)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#333] text-[10px] tracking-[0.3em] uppercase font-medium"
            >
              Goldbridge Capital
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
