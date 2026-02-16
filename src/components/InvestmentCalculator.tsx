"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, ArrowUpRight, ChevronDown } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import CounterNumber from "./CounterNumber";

const tiers = [
  { name: "Starter", min: 1000, max: 4999, rate: 0.175, label: "15–20% /week" },
  { name: "Growth", min: 5000, max: 9999, rate: 0.30, label: "25–35% /week" },
  { name: "Premium", min: 10000, max: 1000000, rate: 0.45, label: "40–50% /week" },
];

const currencies = [
  { code: "ZAR", symbol: "R", rate: 1, name: "South African Rand" },
  { code: "USD", symbol: "$", rate: 0.054, name: "US Dollar" },
  { code: "EUR", symbol: "€", rate: 0.050, name: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.043, name: "British Pound" },
  { code: "NGN", symbol: "₦", rate: 83.64, name: "Nigerian Naira" },
  { code: "KES", symbol: "KSh", rate: 6.98, name: "Kenyan Shilling" },
  { code: "BWP", symbol: "P", rate: 0.74, name: "Botswana Pula" },
];

export default function InvestmentCalculator() {
  const [amount, setAmount] = useState(10000);
  const [selectedTier, setSelectedTier] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  const tier = tiers[selectedTier];
  const currency = currencies[selectedCurrency];

  // Clamp amount to tier range
  const clampedAmount = Math.max(tier.min, Math.min(tier.max, amount));

  const projections = useMemo(() => {
    const weeklyReturnZAR = clampedAmount * tier.rate;
    const weeklyReturn = weeklyReturnZAR * currency.rate;
    const amountInCurrency = clampedAmount * currency.rate;

    return { weeklyReturn, amountInCurrency };
  }, [clampedAmount, tier.rate, currency.rate]);


  return (
    <section id="calculator" className="section-padding relative overflow-hidden">
      <div className="aurora aurora-gold top-[30%] left-[10%] w-[150px] md:w-[350px] h-[120px] md:h-[250px] opacity-[0.05] md:opacity-[0.1]" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-0">
        {/* Header */}
        <AnimateOnScroll scale blur>
          <div className="text-center mb-10 md:mb-16">
            <div className="pill-gold mb-5 mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-gold" />
              Return Calculator
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
              Project Your <span className="gold-text">Returns</span>
            </h2>
            <p className="text-[#555] text-sm md:text-base max-w-xl mx-auto leading-relaxed px-2">
              See how your investment could grow with Goldbridge Capital.
              Adjust the amount, tier, and timeframe to explore projections.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1} scale>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
            {/* Left — Controls */}
            <div className="lg:col-span-2 glass p-5 md:p-7 flex flex-col gap-6">
              {/* Investment Amount */}
              <div>
                <label className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-3 block">
                  Investment Amount
                </label>
                <div className="relative mb-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold text-lg">R</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={tier.min}
                    max={tier.max}
                    inputMode="numeric"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-9 pr-4 py-3.5 text-white text-[16px] sm:text-lg font-bold font-display outline-none focus:border-[#D4AF37]/30 transition-colors tabular-nums"
                  />
                </div>
                <input
                  type="range"
                  min={tier.min}
                  max={tier.max}
                  step={tier.min < 1000 ? 50 : tier.min < 10000 ? 500 : 1000}
                  value={clampedAmount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] h-1 bg-white/[0.06] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#D4AF37]/30"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[#444] text-[10px]">R{tier.min.toLocaleString()}</span>
                  <span className="text-[#444] text-[10px]">R{tier.max.toLocaleString()}</span>
                </div>
              </div>

              {/* Tier Selection */}
              <div>
                <label className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-3 block">
                  Investment Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {tiers.map((t, i) => (
                    <button
                      key={t.name}
                      onClick={() => {
                        setSelectedTier(i);
                        setAmount(Math.max(t.min, Math.min(t.max, amount)));
                      }}
                      className={`py-3 px-2 rounded-xl text-center transition-all duration-300 border ${
                        selectedTier === i
                          ? "bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]"
                          : "bg-white/[0.02] border-white/[0.06] text-[#666] hover:border-white/[0.1]"
                      }`}
                    >
                      <span className="text-xs font-semibold block">{t.name}</span>
                      <span className="text-[10px] mt-0.5 block opacity-70">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency Selection */}
              <div>
                <label className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-3 block">
                  Display Currency
                </label>
                <div className="relative">
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(Number(e.target.value))}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]/30 transition-colors appearance-none cursor-pointer"
                  >
                    {currencies.map((c, i) => (
                      <option key={c.code} value={i} className="bg-[#0a0a0e] text-white">
                        {c.code} ({c.symbol}) - {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" />
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[#333] text-[9px] leading-relaxed mt-auto">
                * Projected returns are estimates based on historical performance and are not guaranteed.
                Past performance does not guarantee future results.
              </p>
            </div>

            {/* Right — Results */}
            <div className="lg:col-span-3 glass-gold p-5 md:p-7 gold-shimmer">
              {/* Weekly Return Display */}
              <div className="text-center mb-6">
                <p className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-3">Weekly Return</p>
                <motion.p
                  key={projections.weeklyReturn}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-4xl md:text-5xl font-bold font-display mb-2"
                >
                  +{currency.symbol}{projections.weeklyReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </motion.p>
                <p className="text-[#444] text-xs">Every 7 days · {tier.label}</p>
              </div>

              {/* Investment Summary */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-subtle p-4 rounded-xl text-center">
                  <p className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-1.5">Investment</p>
                  <p className="text-white text-lg font-bold font-display">
                    {currency.symbol}{projections.amountInCurrency.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-[#444] text-[9px] mt-0.5">{currency.code}</p>
                </div>
                <div className="glass-subtle p-4 rounded-xl text-center">
                  <p className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-1.5">Weekly ROI</p>
                  <p className="text-[#D4AF37] text-lg font-bold font-display">
                    {(tier.rate * 100).toFixed(0)}%
                  </p>
                  <p className="text-[#444] text-[9px] mt-0.5">{tier.name} Tier</p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="glass-subtle p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={14} className="text-[#D4AF37]" />
                  <span className="text-[#888] text-xs uppercase tracking-wider">Weekly Breakdown</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#555] text-xs">Your Investment</span>
                    <span className="text-white text-sm font-semibold">
                      {currency.symbol}{projections.amountInCurrency.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#555] text-xs">Weekly Return ({(tier.rate * 100).toFixed(0)}%)</span>
                    <span className="text-emerald-400 text-sm font-semibold">
                      +{currency.symbol}{projections.weeklyReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="h-px bg-white/[0.06] my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#888] text-xs font-medium">After 1 Week</span>
                    <span className="text-[#D4AF37] text-base font-bold">
                      {currency.symbol}{(projections.amountInCurrency + projections.weeklyReturn).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <a href="/invest" className="btn-gold gap-2 px-6 py-3 text-sm w-full sm:w-auto justify-center">
                  Start With R{clampedAmount.toLocaleString()}
                  <ArrowUpRight size={14} />
                </a>
                <p className="text-[#444] text-[10px]">No lock-ups · Withdraw anytime</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
