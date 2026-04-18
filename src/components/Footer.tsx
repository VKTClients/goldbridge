"use client";

import AnimateOnScroll from "./AnimateOnScroll";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Risk Disclosure */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-6 md:py-8">
        <AnimateOnScroll>
        <div className="glass-subtle p-4 md:p-6 mb-6 md:mb-8">
          <p className="text-[#333] text-[10px] leading-relaxed text-center">
            <span className="text-[#D4AF37] font-semibold">Important Risk Disclosure:</span>{" "}
            Trading and investing in financial markets involves substantial risk of loss. The projected returns of 20–30% per week are estimates based on historical performance and are not guaranteed. Past performance does not guarantee future results. You should not invest money you cannot afford to lose. The content on this website is for informational purposes only and does not constitute financial advice. Goldbridge Capital does not guarantee any specific outcome or profit. All investments carry risk, including the potential loss of principal. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>
        </AnimateOnScroll>

        <div className="divider-gold mb-6 md:mb-8" />

        <AnimateOnScroll delay={0.1}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Goldbridge Capital" 
              className="h-16 w-auto object-contain logo-themed"
            />
            <div className="flex flex-col">
              <span className="text-white/60 text-[11px] font-medium tracking-wide">Goldbridge Capital</span>
              <span className="text-[#333] text-[9px] tracking-wider">Est. 2005 · Institutional Wealth Management</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 md:gap-6 flex-wrap justify-center">
            <a href="#home" className="text-[#444] text-xs sm:text-[11px] hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors py-1">Home</a>
            <a href="#markets" className="text-[#444] text-xs sm:text-[11px] hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors py-1">Markets</a>
            <a href="#pricing" className="text-[#444] text-xs sm:text-[11px] hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors py-1">Pricing</a>
            <a href="#faq" className="text-[#444] text-xs sm:text-[11px] hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors py-1">FAQs</a>
            <a href="/privacy" className="text-[#444] text-xs sm:text-[11px] hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors py-1">Privacy</a>
            <a href="/terms" className="text-[#444] text-xs sm:text-[11px] hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors py-1">Terms</a>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center md:items-end gap-1.5 text-center md:text-right">
            <span className="text-[#333] text-[9px] uppercase tracking-[0.24em]">
              Support
            </span>
            <a
              href="mailto:support@goldbridgecapital.io"
              className="text-[#D4AF37] text-xs sm:text-[11px] hover:text-[#F3D889] transition-colors"
            >
              support@goldbridgecapital.io
            </a>
          </div>
        </div>
        </AnimateOnScroll>

        <div className="mt-6 md:mt-8 text-center" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <p className="text-[#222] text-[10px] tracking-wider">
            © {new Date().getFullYear()} Goldbridge Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
