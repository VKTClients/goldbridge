"use client";

import { Star, Quote } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const testimonials = [
  {
    name: "Thabo M.",
    location: "Johannesburg, SA",
    avatar: "T",
    rating: 5,
    text: "I started with the Starter package at R3,000 and within 4 weeks I had already seen consistent returns. The transparency is what sold me — I can see exactly where my money is working.",
    package: "Starter",
    since: "Nov 2025",
  },
  {
    name: "Naledi K.",
    location: "Cape Town, SA",
    avatar: "N",
    rating: 5,
    text: "GoldBridge changed my perspective on investing. The weekly payouts are reliable, and the dashboard makes it so easy to track everything. I've since upgraded to the Growth package.",
    package: "Growth",
    since: "Oct 2025",
  },
  {
    name: "David O.",
    location: "Lagos, Nigeria",
    avatar: "D",
    rating: 5,
    text: "As someone investing from Nigeria, the multi-currency support was a game-changer. I invest in Naira and the returns are converted seamlessly. Premium package has been incredible.",
    package: "Premium",
    since: "Sep 2025",
  },
  {
    name: "Amahle S.",
    location: "Durban, SA",
    avatar: "A",
    rating: 5,
    text: "I was skeptical at first, but after my first payout arrived exactly on Monday as promised, I knew this was legitimate. Now I've referred 5 friends and earned R2,500 in bonuses.",
    package: "Starter",
    since: "Dec 2025",
  },
  {
    name: "Kgosi P.",
    location: "Gaborone, Botswana",
    avatar: "K",
    rating: 5,
    text: "The support team is exceptional. They walked me through the entire process and my account manager checks in weekly. Returns have been consistently within the projected range.",
    package: "Growth",
    since: "Oct 2025",
  },
  {
    name: "Fatima H.",
    location: "Nairobi, Kenya",
    avatar: "F",
    rating: 5,
    text: "I've tried other investment platforms before but none come close to GoldBridge. The clarity, the discipline, the results — everything they promise, they deliver. Highly recommend.",
    package: "Premium",
    since: "Aug 2025",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="aurora aurora-gold top-[30%] right-[15%] w-[150px] md:w-[350px] h-[120px] md:h-[250px] opacity-[0.05] md:opacity-[0.1]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        {/* Header */}
        <AnimateOnScroll scale blur>
          <div className="text-center mb-10 md:mb-16">
            <div className="pill-gold mb-5 mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-gold" />
              Testimonials
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
              Trusted by <span className="gold-text">Investors</span>
            </h2>
            <p className="text-[#555] text-sm md:text-base max-w-xl mx-auto leading-relaxed px-2">
              Hear from real investors who are growing their wealth with GoldBridge Capital every week.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={t.name} delay={i * 0.08} scale>
              <div className="glass p-5 md:p-6 h-full flex flex-col group hover:-translate-y-1 transition-all duration-500">
                {/* Quote icon */}
                <Quote size={20} className="text-[#D4AF37]/20 mb-3" />

                {/* Text */}
                <p className="text-[#888] text-xs leading-relaxed flex-1 mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/15 flex items-center justify-center">
                    <span className="text-[#D4AF37] text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium">{t.name}</p>
                    <p className="text-[#444] text-[10px]">{t.location}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                      t.package === "Premium" ? "bg-[#D4AF37]/10 text-[#D4AF37]" :
                      t.package === "Growth" ? "bg-emerald-500/10 text-emerald-400" :
                      "bg-blue-500/10 text-blue-400"
                    }`}>
                      {t.package}
                    </span>
                    <p className="text-[#333] text-[8px] mt-0.5">Since {t.since}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
