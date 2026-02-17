"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="aurora aurora-gold top-[20%] left-[10%] w-[150px] md:w-[400px] h-[120px] md:h-[300px] opacity-[0.05] md:opacity-[0.08]" />
      <div className="aurora aurora-white top-[40%] right-[15%] w-[120px] md:w-[250px] h-[100px] md:h-[200px] opacity-[0.02] md:opacity-[0.04]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        <div className="glass-gold p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Label */}
            <AnimateOnScroll>
              <div className="pill-gold mb-5 mx-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Newsletter
              </div>
            </AnimateOnScroll>

            {/* Heading */}
            <AnimateOnScroll delay={0.05}>
              <p className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-3">
                Insights & Market Updates
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                Stay Connected with Gold Bridge{" "}
                <span className="gold-text">Capital</span>
              </h2>
            </AnimateOnScroll>

            {/* Description */}
            <AnimateOnScroll delay={0.1}>
              <p className="text-[#888] text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto">
                Receive curated market insights, investment perspectives, and updates
                across e-commerce, global markets, and digital assets — delivered
                directly to your inbox.
              </p>
            </AnimateOnScroll>

            {/* Form */}
            <AnimateOnScroll delay={0.15} scale>
              {submitted ? (
                <div className="flex items-center justify-center gap-3 py-4">
                  <CheckCircle size={20} className="text-emerald-400" />
                  <p className="text-emerald-400 text-sm font-medium">
                    Thank you for subscribing!
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                >
                  <div className="relative flex-1 w-full">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-[#444] focus:outline-none focus:border-[#D4AF37]/30 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-gold gap-2 px-6 py-3.5 text-sm font-semibold w-full sm:w-auto justify-center whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </AnimateOnScroll>

            {/* Fine print */}
            <AnimateOnScroll delay={0.2}>
              <p className="text-[#333] text-[10px] mt-5">
                No spam. Unsubscribe anytime. Your data is protected.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
