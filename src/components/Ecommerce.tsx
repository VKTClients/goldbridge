"use client";

import { ShoppingCart, TrendingUp, Globe, BarChart3, Package, CreditCard } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";

const stats = [
  { value: "$6.3T+", label: "Global E-Commerce Revenue (2024)" },
  { value: "8-10%", label: "Annual Growth" },
  { value: "2.7B+", label: "Digital Buyers Worldwide" },
  { value: "70%+", label: "Of Purchases Influenced by Online Research" },
];

const pillars = [
  {
    icon: Globe,
    title: "Global Market Reach",
    description: "E-commerce transcends borders. We invest in platforms and logistics networks that serve consumers across 190+ countries, capturing growth in both mature and emerging markets.",
  },
  {
    icon: TrendingUp,
    title: "Predictable Revenue Streams",
    description: "Subscription models, recurring purchases, and habitual consumer spending create reliable, forecastable revenue — ideal for consistent portfolio returns.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Performance",
    description: "Every click, conversion, and cart is measurable. This transparency allows our algorithms to identify high-performing sectors and allocate capital with precision.",
  },
  {
    icon: Package,
    title: "Supply Chain Innovation",
    description: "From AI-powered inventory management to same-day delivery infrastructure, the logistics backbone of e-commerce continues to unlock new investment opportunities.",
  },
  {
    icon: CreditCard,
    title: "Digital Payments Boom",
    description: "The shift to cashless transactions fuels fintech and payment processing growth — a sector deeply intertwined with e-commerce expansion.",
  },
  {
    icon: ShoppingCart,
    title: "Consumer Behaviour Shift",
    description: "Post-pandemic habits are permanent. Mobile commerce, social selling, and AI-personalised shopping are accelerating a structural shift toward digital-first retail.",
  },
];

export default function Ecommerce() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="aurora aurora-gold top-[25%] right-[15%] w-[150px] md:w-[350px] h-[120px] md:h-[250px] opacity-[0.05] md:opacity-[0.1]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        {/* Header */}
        <AnimateOnScroll scale blur>
          <div className="text-center mb-10 md:mb-16">
            <div className="pill-gold mb-5 mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Investment Thesis
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
              E-Commerce as a <span className="gold-text">Core Pillar</span>
            </h2>
            <p className="text-[#555] text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
              Global online retail sales exceed trillions of dollars annually and continue
              to expand as consumer behaviour shifts toward digital purchasing.
              This consistent demand and measurable performance make e-commerce
              a core pillar of our investment strategy.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Stats Row */}
        <AnimateOnScroll delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-10 md:mb-14">
            {stats.map((stat, i) => (
              <div key={stat.label} className="glass-subtle p-4 md:p-5 text-center">
                <p className="text-[#D4AF37] text-2xl md:text-3xl font-bold font-display mb-1">
                  {stat.value}
                </p>
                <p className="text-[#555] text-[10px] md:text-xs leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Thesis Statement */}
        <AnimateOnScroll delay={0.1} scale>
          <div className="glass-gold p-6 md:p-10 mb-10 md:mb-14 gold-shimmer relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={24} className="text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-white text-lg md:text-xl font-semibold font-display mb-2">
                  Why E-Commerce Drives Our Returns
                </h3>
                <p className="text-[#888] text-xs md:text-sm leading-relaxed">
                  The e-commerce sector offers a rare combination of scale, growth velocity, and data transparency.
                  Unlike traditional retail, every transaction is digitally tracked — giving our algorithmic models
                  unparalleled insight into consumer trends, seasonal demand, and emerging market opportunities.
                  We allocate across marketplace platforms, payment processors, logistics infrastructure, and
                  direct-to-consumer brands to build a diversified, resilient portfolio.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Pillars Grid */}
        <AnimateOnScroll delay={0.05}>
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-white text-lg md:text-xl font-semibold font-display">
              Six Pillars of Our E-Commerce Strategy
            </h3>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {pillars.map((pillar, i) => (
            <AnimateOnScroll key={pillar.title} delay={i * 0.07} scale>
              <TiltCard>
                <div className="glass p-4 md:p-6 group hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37]/25 group-hover:bg-[#D4AF37]/[0.1] transition-all duration-500">
                      <pillar.icon size={15} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-semibold mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-[#555] text-xs leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom Note */}
        <AnimateOnScroll delay={0.2}>
          <div className="mt-8 md:mt-10 glass-subtle p-4 md:p-5 max-w-3xl mx-auto">
            <p className="text-[#444] text-[11px] leading-relaxed text-center">
              <span className="text-[#D4AF37] font-semibold">Note:</span>{" "}
              E-commerce investments are part of a diversified multi-asset strategy.
              Goldbridge Capital allocates across crypto, indices, precious metals, forex,
              and digital commerce to optimise risk-adjusted returns. All investments carry risk.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
