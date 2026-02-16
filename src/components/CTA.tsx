"use client";

import { ArrowUpRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Aurora */}
      <div className="aurora aurora-gold top-[20%] left-[30%] w-[150px] md:w-[400px] h-[120px] md:h-[300px] opacity-[0.05] md:opacity-[0.1]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        <AnimateOnScroll scale blur>
        <div className="glass-gold p-8 md:p-16 relative overflow-hidden gold-shimmer">
          {/* Grid bg inside */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          <div className="relative z-10 text-center">
            <div className="pill-gold mb-6 mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-gold" />
              Begin Today
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 md:mb-6 tracking-tight">
              Your Wealth Deserves<br />
              <span className="gold-text">Goldbridge</span>
            </h2>
            <p className="text-[#666] text-sm md:text-base max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
              Join 12,000+ investors who trust Goldbridge Capital to grow their
              wealth across global markets. Start with as little as R1,000.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <a href="/invest" className="btn-gold gap-2 px-8 py-3.5 sm:py-3 text-sm w-full sm:w-auto justify-center">
                Start Investing
                <ArrowUpRight size={14} />
              </a>
              <a href="#markets" className="btn-outline px-8 py-3.5 sm:py-3 text-sm w-full sm:w-auto justify-center">
                Explore Markets
              </a>
            </div>

            <p className="text-[#333] text-[10px] mt-8 tracking-wider">
              No hidden fees · Weekly payouts · Withdraw anytime · 24/7 support
            </p>
          </div>
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
