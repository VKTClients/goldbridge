"use client";

import { UserPlus, Package, TrendingUp, Banknote, ArrowUpRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Account",
    description:
      "Sign up in under 2 minutes. Verify your identity with our streamlined KYC process.",
    accent: "from-[#D4AF37]/10 to-[#D4AF37]/[0.02]",
    border: "border-[#D4AF37]/15",
    iconColor: "text-[#D4AF37]",
  },
  {
    number: "02",
    icon: Package,
    title: "Choose Your Package",
    description:
      "Select from Starter, Growth, or Premium tiers based on your investment goals and risk appetite.",
    accent: "from-[#D4AF37]/10 to-[#D4AF37]/[0.02]",
    border: "border-[#D4AF37]/15",
    iconColor: "text-[#D4AF37]",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Invest",
    description:
      "Fund your account via Luno - card, bank transfer, or crypto. Your capital is deployed instantly.",
    accent: "from-[#D4AF37]/10 to-[#D4AF37]/[0.02]",
    border: "border-[#D4AF37]/15",
    iconColor: "text-[#D4AF37]",
  },
  {
    number: "04",
    icon: Banknote,
    title: "Get Paid",
    description:
      "Receive automated weekly payouts directly to your wallet. No lock-ups, no hidden fees - withdraw anytime.",
    accent: "from-emerald-500/10 to-emerald-500/[0.02]",
    border: "border-emerald-500/15",
    iconColor: "text-emerald-400",
  },
];

export default function GetStartedSteps() {
  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="aurora aurora-gold top-[40%] left-[20%] w-[150px] md:w-[350px] h-[120px] md:h-[250px] opacity-[0.05] md:opacity-[0.1]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        <AnimateOnScroll scale blur>
          <div className="text-center mb-10 md:mb-16">
            <div className="pill-gold mb-5 mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-gold" />
              Getting Started
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
              Start in <span className="gold-text">4 Simple Steps</span>
            </h2>
            <p className="text-[#555] text-sm md:text-base max-w-xl mx-auto leading-relaxed px-2">
              From your first deposit to your first payout in as little as 7 days.
              No complexity, no jargon - just results.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-14">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 0.1} scale>
              <div className="relative h-full">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-[calc(50%-8px)] w-[calc(100%-16px)] h-[1px] z-0">
                    <div className="w-full h-full bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5" />
                  </div>
                )}

                <div className="glass p-5 md:p-6 h-full relative z-10 group hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.accent} border ${step.border} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
                    >
                      <step.icon size={20} className={step.iconColor} />
                    </div>
                    <span className="text-[#222] text-[40px] font-bold font-display leading-none select-none">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-white text-base md:text-lg font-semibold mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-[#555] text-xs leading-relaxed">{step.description}</p>

                  <div className="flex items-center gap-1.5 mt-4 lg:hidden">
                    {steps.map((_, j) => (
                      <div
                        key={j}
                        className={`h-1 rounded-full transition-all ${
                          j <= i ? "bg-[#D4AF37] w-4" : "bg-white/[0.06] w-1.5"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.3}>
          <div className="text-center">
            <a href="#pricing" className="btn-gold gap-2 px-8 py-3.5 text-sm inline-flex">
              Create Your Account
              <ArrowUpRight size={14} />
            </a>
            <p className="text-[#333] text-[10px] mt-4 tracking-wider">
              Takes less than 2 minutes · No credit check · Instant access
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
