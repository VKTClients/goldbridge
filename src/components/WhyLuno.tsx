"use client";

import { Shield, Zap, Globe, CreditCard, Lock, BadgeCheck } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";

const reasons = [
  {
    icon: Shield,
    title: "Regulated & Compliant",
    description: "Luno meets strict regulatory requirements across multiple jurisdictions, helping ensure every transaction follows best-practice compliance.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Deposits are typically credited quickly. Luno's infrastructure processes many common payment methods with low latency.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Support for multiple local currencies and fiat on/off ramps makes it easy to fund your account from many countries.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Methods",
    description: "Fund via bank transfer, card, or crypto — choose whichever method is most convenient for you.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Luno uses strong encryption and secure custody practices to protect funds and customer data.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted by Millions",
    description: "Luno is a well-known payments and exchange provider with a large user base across Africa and beyond.",
  },
];

export default function WhyLuno() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="aurora aurora-white top-[20%] right-[5%] w-[120px] md:w-[300px] h-[80px] md:h-[200px] opacity-[0.02] md:opacity-[0.04]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        {/* Header */}
        <AnimateOnScroll scale blur>
          <div className="text-center mb-10 md:mb-16">
            <div className="pill-gold mb-5 mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Payment Infrastructure
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
              Why We Use <span className="gold-text">Luno</span>
            </h2>
            <p className="text-[#555] text-sm md:text-base max-w-xl mx-auto leading-relaxed px-2">
              Goldbridge Capital partners with Luno for reliable, secure payment rails to make funding simple and transparent for our investors.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Logo + Trust Banner */}
        <AnimateOnScroll delay={0.05}>
          <div className="glass-subtle p-5 md:p-6 mb-8 md:mb-10 flex flex-col sm:flex-row items:center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Luno wordmark placeholder */}
              <div className="w-10 h-10 rounded-xl bg-[#1E90FF]/10 border border-[#1E90FF]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#1E90FF] font-bold text-sm">L</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Luno</p>
                <p className="text-[#555] text-[10px]">Official Payment Partner</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[#888] text-[10px]">Regulated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[#888] text-[10px]">Secure Infrastructure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E90FF]" />
                <span className="text-[#888] text-[10px]">Global Support</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((reason, i) => (
            <AnimateOnScroll key={reason.title} delay={i * 0.07} scale>
              <TiltCard>
                <div className="glass p-4 md:p-6 group hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1E90FF]/[0.06] border border-[#1E90FF]/[0.12] flex items-center justify-center flex-shrink-0 group-hover:border-[#1E90FF]/25 group-hover:bg-[#1E90FF]/[0.1] transition-all duration-500">
                      <reason.icon size={15} className="text-[#1E90FF]" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-semibold mb-1.5">
                        {reason.title}
                      </h3>
                      <p className="text-[#555] text-xs leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
