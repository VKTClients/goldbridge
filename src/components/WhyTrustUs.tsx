"use client";

import { Shield, Lock, Eye, Clock, Users, Award, BarChart3, Headphones } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const trustPoints = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your funds are protected with institutional-level encryption, multi-signature wallets, and cold storage protocols.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Track every trade, every return, and every movement of your capital in real-time through your personal dashboard.",
  },
  {
    icon: Clock,
    title: "Consistent Weekly Payouts",
    description: "Automated payouts every Monday without fail. No lock-up periods, no hidden delays — withdraw anytime.",
  },
  {
    icon: Lock,
    title: "Regulated & Compliant",
    description: "We operate within strict regulatory frameworks with full KYC/AML compliance to protect you and your investments.",
  },
  {
    icon: Users,
    title: "12,000+ Active Investors",
    description: "Join a growing community of investors across Africa and beyond who trust GoldBridge with their capital.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Consistent performance since inception with a 98.2% client retention rate — our results speak for themselves.",
  },
  {
    icon: BarChart3,
    title: "Disciplined Strategy",
    description: "Our portfolio managers use quantitative models and risk-managed strategies across forex, crypto, indices, and metals.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Every investor gets access to responsive support. Premium clients receive a personal account manager available 24/7.",
  },
];

const stats = [
  { value: "$2.4B+", label: "Assets Under Management" },
  { value: "98.2%", label: "Client Retention Rate" },
  { value: "12,000+", label: "Active Investors" },
  { value: "52+", label: "Consecutive Weekly Payouts" },
];

export default function WhyTrustUs() {
  return (
    <section id="trust" className="section-padding relative overflow-hidden">
      <div className="aurora aurora-gold top-[20%] left-[10%] w-[150px] md:w-[350px] h-[120px] md:h-[250px] opacity-[0.05] md:opacity-[0.1]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        {/* Header */}
        <AnimateOnScroll scale blur>
          <div className="text-center mb-10 md:mb-16">
            <div className="pill-gold mb-5 mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-gold" />
              About GoldBridge
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
              Why Trust <span className="gold-text">GoldBridge?</span>
            </h2>
            <p className="text-[#555] text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
              GoldBridge Capital was founded on three principles: clarity, discipline, and transparency.
              We believe every investor deserves to know exactly how their money is working — and to see results, not promises.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Stats Bar */}
        <AnimateOnScroll delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-gold p-4 md:p-5 text-center">
                <p className="text-[#D4AF37] text-2xl md:text-3xl font-bold font-display mb-1">{stat.value}</p>
                <p className="text-[#555] text-[10px] md:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-14">
          {trustPoints.map((point, i) => (
            <AnimateOnScroll key={point.title} delay={i * 0.06} scale>
              <div className="glass p-5 h-full group hover:-translate-y-1 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
                  <point.icon size={18} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-white text-sm font-semibold mb-2">{point.title}</h3>
                <p className="text-[#555] text-xs leading-relaxed">{point.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* About Paragraph */}
        <AnimateOnScroll delay={0.2}>
          <div className="glass-subtle p-6 md:p-8 max-w-3xl mx-auto text-center">
            <h3 className="text-white text-base md:text-lg font-display font-semibold mb-3">Our Mission</h3>
            <p className="text-[#666] text-xs md:text-sm leading-relaxed mb-4">
              GoldBridge Capital exists to democratise institutional-grade investing. We combine advanced quantitative
              strategies with a human-first approach, ensuring every investor — from R1,000 to R1,000,000+ — receives
              the same level of care, transparency, and performance.
            </p>
            <p className="text-[#555] text-xs leading-relaxed">
              Our team of portfolio managers, risk analysts, and market strategists work around the clock across
              global markets to deliver consistent, disciplined returns. We don&apos;t chase hype — we follow data,
              manage risk, and let the results speak.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
