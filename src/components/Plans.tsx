"use client";

import { Check, ArrowUpRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";

const plans = [
  {
    name: "Starter",
    investment: "R1,000 – R4,999",
    returnRange: "15–20%",
    cycle: "7 Days",
    features: [
      "Weekly automated payouts",
      "Basic portfolio diversification",
      "Email support",
      "Real-time dashboard access",
      "Monthly performance reports",
    ],
    popular: false,
  },
  {
    name: "Growth",
    investment: "R5,000 – R9,999",
    returnRange: "25–35%",
    cycle: "7 Days",
    features: [
      "Everything in Starter",
      "Advanced portfolio strategies",
      "Priority support",
      "Dedicated account manager",
      "Weekly performance reports",
      "Early access to new strategies",
    ],
    popular: true,
  },
  {
    name: "Premium",
    investment: "R10,000+",
    returnRange: "40–50%",
    cycle: "7 Days",
    features: [
      "Everything in Growth",
      "Custom portfolio allocation",
      "24/7 VIP support",
      "Personal investment advisor",
      "Daily performance reports",
      "Exclusive market insights",
      "Priority withdrawals",
    ],
    popular: false,
  },
];

export default function Plans() {
  return (
    <section id="pricing" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto px-5 md:px-0">
        {/* Section Header */}
        <AnimateOnScroll scale blur>
        <div className="text-center mb-10 md:mb-16">
          <div className="pill-gold mb-5 mx-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            Investment Tiers
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
            Investments Designed For{" "}
            <span className="gold-text">Your Goals</span>
          </h2>
          <p className="text-[#555] text-sm md:text-base max-w-lg mx-auto leading-relaxed px-2">
            Choose the plan that aligns with your investment capacity. Minimum
            investment starts at just R1,000 with a 7-day payout cycle.
          </p>
        </div>
        </AnimateOnScroll>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {plans.map((plan, index) => (
            <AnimateOnScroll key={plan.name} delay={index * 0.1} scale>
            <TiltCard>
            <div
              className={`relative rounded-2xl p-5 md:p-7 transition-all duration-500 hover:-translate-y-1 ${
                plan.popular
                  ? "glass-gold"
                  : "glass"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="pill-gold text-[10px] font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6 pt-2">
                <h3 className="text-white text-lg font-semibold mb-1">
                  {plan.name}
                </h3>
                <p className="text-[#555] text-xs mb-5">{plan.investment}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#D4AF37] text-4xl font-bold font-display">
                    {plan.returnRange}
                  </span>
                  <span className="text-[#555] text-sm">/week*</span>
                </div>
                <p className="text-[#444] text-xs mt-2">
                  Payout every {plan.cycle}
                </p>
              </div>

              {/* Divider */}
              <div className="divider mb-5" />

              {/* Features */}
              <ul className="space-y-2.5 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-[#C9A84C]" />
                    </div>
                    <span className="text-[#888] text-xs">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/invest"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "btn-gold"
                    : "btn-outline"
                }`}
              >
                Get Started
                <ArrowUpRight size={12} />
              </a>
            </div>
            </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Risk Disclaimer */}
        <AnimateOnScroll delay={0.2}>
        <div className="mt-8 md:mt-10 glass-subtle p-4 md:p-5 max-w-3xl mx-auto">
          <p className="text-[#444] text-[11px] leading-relaxed text-center">
            <span className="text-[#D4AF37] font-semibold">Important Risk Disclosure:</span>{" "}
            All investments involve risk, including the possible loss of
            principal. The projected returns of 15–50% per week are based on
            historical performance and are not guaranteed. Past performance does
            not guarantee future results. You should not invest money you cannot
            afford to lose. Please consult with a qualified financial advisor before
            making any investment decisions.
          </p>
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
