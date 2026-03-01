"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, Check, ArrowUpRight, Copy, Wallet,
  TrendingUp, Shield, AlertTriangle, ChevronDown, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const packages = [
  {
    name: "Starter",
    min: 1000,
    max: 4999,
    rateMin: 15,
    rateMax: 20,
    rateMid: 17.5,
    color: "blue",
    features: ["Weekly automated payouts", "Basic portfolio diversification", "Email support", "Real-time dashboard access"],
  },
  {
    name: "Growth",
    min: 5000,
    max: 9999,
    rateMin: 25,
    rateMax: 35,
    rateMid: 30,
    color: "emerald",
    features: ["Everything in Starter", "Advanced portfolio strategies", "Priority support", "Dedicated account manager"],
  },
  {
    name: "Premium",
    min: 10000,
    max: 1000000,
    rateMin: 40,
    rateMax: 50,
    rateMid: 45,
    color: "gold",
    features: ["Everything in Growth", "Custom portfolio allocation", "24/7 VIP support", "Personal investment advisor"],
  },
];

const currencies = [
  { code: "ZAR", symbol: "R", name: "South African Rand", flag: "🇿🇦", rate: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", rate: 0.054 },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", rate: 0.050 },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", rate: 0.043 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", flag: "🇳🇬", rate: 83.5 },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", flag: "🇰🇪", rate: 6.95 },
  { code: "BWP", symbol: "P", name: "Botswana Pula", flag: "🇧🇼", rate: 0.73 },
  { code: "BTC", symbol: "₿", name: "Bitcoin", flag: "₿", rate: 0.0000005 },
];

const cryptoWallets = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin Network", icon: "₿", color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20" },
  { id: "eth", name: "Ethereum", symbol: "ETH", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18", network: "ERC-20 Network", icon: "Ξ", color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20" },
  { id: "usdt", name: "USDT", symbol: "USDT", address: "TQn9Y2khEsLJW1ChNWShFYKwxhA5sR7CiB", network: "TRC-20 Network", icon: "₮", color: "text-emerald-400", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20" },
];

interface StoredInvestment {
  id: string;
  package: string;
  amount: number;
  currency: string;
  amountZAR: number;
  paymentMethod: string;
  date: string;
  status: string;
}

function getStoredInvestments(): StoredInvestment[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("gb_investments");
  return stored ? JSON.parse(stored) : [];
}

function saveInvestment(inv: StoredInvestment) {
  const existing = getStoredInvestments();
  existing.push(inv);
  localStorage.setItem("gb_investments", JSON.stringify(existing));
}

function formatCurrency(amount: number, symbol: string = "R") {
  if (symbol === "₿") return symbol + amount.toFixed(8);
  return symbol + amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvestPage() {
  const { user, isLoading } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/";
    }
  }, [user, isLoading]);

  const currency = currencies[selectedCurrency];
  const amountNum = Number(amount) || 0;
  const amountZAR = amountNum / currency.rate;

  // Auto-select package based on ZAR amount
  const autoPackage = useMemo(() => {
    if (amountZAR < 1000) return null;
    if (amountZAR <= 4999) return 0;
    if (amountZAR <= 9999) return 1;
    return 2;
  }, [amountZAR]);

  const selectedPkg = autoPackage !== null ? packages[autoPackage] : null;

  // Projected returns
  const projections = useMemo(() => {
    if (!selectedPkg) return null;
    const weeklyMin = amountZAR * (selectedPkg.rateMin / 100);
    const weeklyMax = amountZAR * (selectedPkg.rateMax / 100);
    const weeklyMid = amountZAR * (selectedPkg.rateMid / 100);
    return {
      weeklyMin,
      weeklyMax,
      weeklyMid,
      monthlyMid: weeklyMid * 4,
      yearlyMid: weeklyMid * 52,
    };
  }, [selectedPkg, amountZAR]);

  // Investment rules validation
  const validateInvestment = (): string | null => {
    if (!selectedPkg) return "Please enter a valid investment amount (minimum R1,000)";
    if (amountZAR < selectedPkg.min) return `Minimum for ${selectedPkg.name} is R${selectedPkg.min.toLocaleString()}`;
    if (amountZAR > selectedPkg.max) return `Maximum for ${selectedPkg.name} is R${selectedPkg.max.toLocaleString()}`;

    const existing = getStoredInvestments();
    const pkgInvestments = existing.filter((i) => i.package === selectedPkg.name);

    // Max 3 investments per package
    if (pkgInvestments.length >= 3) {
      return `You can only make up to 3 investments in the ${selectedPkg.name} package`;
    }

    // Same amount can only be invested once per package
    const roundedAmount = Math.round(amountZAR);
    const sameAmount = pkgInvestments.find((i) => Math.round(i.amountZAR) === roundedAmount);
    if (sameAmount) {
      return `You have already invested R${roundedAmount.toLocaleString()} in the ${selectedPkg.name} package. Choose a different amount.`;
    }

    return null;
  };

  const handleProceed = () => {
    const err = validateInvestment();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep("confirm");
  };

  const handleConfirm = () => {
    if (!selectedPkg) return;
    const inv: StoredInvestment = {
      id: Date.now().toString(),
      package: selectedPkg.name,
      amount: amountNum,
      currency: currency.code,
      amountZAR: Math.round(amountZAR),
      paymentMethod: cryptoWallets[selectedWallet].symbol,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    saveInvestment(inv);
    setStep("success");
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060608]">
      {/* Header */}
      <div className="bg-[#09090c]/95 backdrop-blur-xl border-b border-white/[0.04] sticky top-0 z-40">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="text-[#555] hover:text-white transition-colors p-1.5">
              <ArrowLeft size={18} />
            </a>
            <h1 className="text-white text-base md:text-lg font-display font-semibold">Make an Investment</h1>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#555] px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02]">
            <Shield size={10} className="text-[#D4AF37]/60" />
            <span>Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Package & Amount */}
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Packages Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {packages.map((pkg, i) => {
                  const isActive = autoPackage === i;
                  const colorMap: Record<string, string> = {
                    blue: "border-blue-500/20 bg-blue-500/[0.03]",
                    emerald: "border-emerald-500/20 bg-emerald-500/[0.03]",
                    gold: "border-[#D4AF37]/20 bg-[#D4AF37]/[0.03]",
                  };
                  const activeColor = colorMap[pkg.color] || "";
                  const textColor: Record<string, string> = {
                    blue: "text-blue-400",
                    emerald: "text-emerald-400",
                    gold: "text-[#D4AF37]",
                  };

                  return (
                    <div
                      key={pkg.name}
                      className={`relative rounded-xl p-4 md:p-5 border transition-all duration-300 ${
                        isActive
                          ? activeColor + " ring-1 ring-white/[0.06]"
                          : "border-white/[0.04] bg-[#0a0a0e]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute -top-2.5 right-3">
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#060608] px-2 py-0.5 rounded-full">
                            Selected
                          </span>
                        </div>
                      )}
                      <h3 className={`text-sm font-semibold mb-1 ${isActive ? textColor[pkg.color] : "text-white"}`}>
                        {pkg.name}
                      </h3>
                      <p className="text-[#555] text-[10px] mb-3">
                        R{pkg.min.toLocaleString()} – R{pkg.max.toLocaleString()}
                      </p>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className={`text-2xl font-bold font-display ${isActive ? textColor[pkg.color] : "text-white"}`}>
                          {pkg.rateMin}–{pkg.rateMax}%
                        </span>
                        <span className="text-[#555] text-xs">/week</span>
                      </div>
                      <ul className="space-y-1.5">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[#666] text-[10px]">
                            <Check size={10} className={isActive ? textColor[pkg.color] : "text-[#444]"} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Investment Guidelines */}
              <div className="bg-[#D4AF37]/[0.04] border border-[#D4AF37]/[0.12] rounded-xl p-4 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/[0.1] flex items-center justify-center flex-shrink-0">
                    <Info size={14} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-semibold mb-2">Investment Guidelines</h4>
                    <div className="space-y-1.5">
                      <p className="text-[#555] text-[10px] leading-relaxed">
                        <span className="text-[#D4AF37] font-medium">Starter & Growth Packages:</span> Limited to 3 investment positions per package. Each investment must be a unique amount to ensure portfolio diversification.
                      </p>
                      <p className="text-[#555] text-[10px] leading-relaxed">
                        <span className="text-[#D4AF37] font-medium">Premium Package:</span> Unlimited investment positions with flexible amounts for sophisticated portfolio management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Form */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Left: Amount & Currency */}
                <div className="lg:col-span-3 bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6">
                  <h3 className="text-white text-sm font-semibold mb-4">Investment Amount</h3>

                  {/* Currency Selector */}
                  <div className="relative mb-4">
                    <button
                      onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-sm w-full"
                    >
                      <span className="text-base">{currency.flag}</span>
                      <span className="text-white text-xs font-medium">{currency.code}</span>
                      <span className="text-[#555] text-[10px] flex-1 text-left">{currency.name}</span>
                      <ChevronDown size={14} className={`text-[#555] transition-transform ${showCurrencyDropdown ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {showCurrencyDropdown && (
                        <motion.div
                          className="absolute top-full mt-1 left-0 right-0 bg-[#0c0c10] border border-white/[0.06] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-20 max-h-[240px] overflow-y-auto"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {currencies.map((c, i) => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setSelectedCurrency(i);
                                setShowCurrencyDropdown(false);
                              }}
                              className={`flex items-center gap-2.5 px-3 py-2.5 w-full hover:bg-white/[0.03] transition-colors ${
                                selectedCurrency === i ? "bg-[#D4AF37]/[0.04]" : ""
                              }`}
                            >
                              <span className="text-base">{c.flag}</span>
                              <span className="text-white text-xs font-medium w-10">{c.code}</span>
                              <span className="text-[#555] text-[10px] flex-1 text-left">{c.name}</span>
                              {selectedCurrency === i && <Check size={12} className="text-[#D4AF37]" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Amount Input */}
                  <div className="relative mb-3">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold text-lg">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setError("");
                      }}
                      placeholder="0.00"
                      inputMode="decimal"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-4 text-white text-[16px] sm:text-xl font-bold font-display outline-none focus:border-[#D4AF37]/30 transition-colors tabular-nums"
                    />
                  </div>

                  {/* ZAR equivalent */}
                  {currency.code !== "ZAR" && amountNum > 0 && (
                    <p className="text-[#555] text-xs mb-4">
                      ≈ R{amountZAR.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ZAR
                    </p>
                  )}

                  {/* Quick amounts */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {[1000, 3000, 5000, 10000, 25000, 50000].map((v) => {
                      const converted = v * currency.rate;
                      return (
                        <button
                          key={v}
                          onClick={() => setAmount(String(Math.round(converted * 100) / 100))}
                          className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#666] text-[10px] font-medium hover:border-[#D4AF37]/20 hover:text-[#D4AF37] transition-all"
                        >
                          {currency.symbol}{converted < 1 ? converted.toFixed(6) : Math.round(converted).toLocaleString()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Crypto Wallet Selection */}
                  <h4 className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-3">Send Payment Via Crypto</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {cryptoWallets.map((w, i) => (
                      <button
                        key={w.id}
                        onClick={() => { setSelectedWallet(i); setCopiedAddress(false); }}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                          selectedWallet === i
                            ? `${w.bgColor} ${w.borderColor} ${w.color}`
                            : "bg-white/[0.02] border-white/[0.06] text-[#666] hover:border-white/[0.1]"
                        }`}
                      >
                        <span className="text-lg font-bold">{w.icon}</span>
                        <span className="text-[10px] font-semibold">{w.symbol}</span>
                      </button>
                    ))}
                  </div>

                  {/* Wallet Address */}
                  <div className="mb-5">
                    <div className="relative">
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 pr-11">
                        <p className="text-[#888] text-[9px] mb-1">{cryptoWallets[selectedWallet].name} — {cryptoWallets[selectedWallet].network}</p>
                        <p className="text-white text-[10px] font-mono break-all leading-relaxed">
                          {cryptoWallets[selectedWallet].address}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(cryptoWallets[selectedWallet].address);
                          setCopiedAddress(true);
                          setTimeout(() => setCopiedAddress(false), 2000);
                        }}
                        className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          copiedAddress
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-white/[0.05] text-[#555] hover:text-white hover:bg-white/[0.1]"
                        }`}
                      >
                        {copiedAddress ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    </div>
                    <p className="text-[#444] text-[8px] mt-1.5">
                      Send your crypto to this address, then confirm your investment. Our admin team will verify the payment.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs mb-4 bg-red-500/[0.06] border border-red-500/[0.12] rounded-lg px-3 py-2.5">
                      <AlertTriangle size={14} />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleProceed}
                    disabled={!selectedPkg || amountNum <= 0}
                    className="btn-gold w-full py-3.5 text-sm font-semibold gap-2 justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue to Review
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Right: Projected Returns */}
                <div className="lg:col-span-2 bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6">
                  <h3 className="text-white text-sm font-semibold mb-4">Projected Returns</h3>

                  {selectedPkg && projections ? (
                    <>
                      <div className="space-y-4 mb-6">
                        <div className="bg-white/[0.02] border border-white/[0.03] rounded-xl p-4">
                          <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Weekly Return</p>
                          <p className="text-emerald-400 text-xl font-bold font-display">
                            R{projections.weeklyMin.toLocaleString("en-ZA", { maximumFractionDigits: 0 })} – R{projections.weeklyMax.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-[#444] text-[10px] mt-0.5">Every 7 days</p>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.03] rounded-xl p-4">
                          <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Monthly Estimate</p>
                          <p className="text-[#D4AF37] text-xl font-bold font-display">
                            R{projections.monthlyMid.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-[#444] text-[10px] mt-0.5">Based on avg. {selectedPkg.rateMid}%/week</p>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.03] rounded-xl p-4">
                          <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Annual Projection</p>
                          <p className="text-white text-xl font-bold font-display">
                            R{projections.yearlyMid.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-[#444] text-[10px] mt-0.5">52 weeks compounding</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-[#444] text-[9px] leading-relaxed">
                        <Info size={12} className="flex-shrink-0 mt-0.5" />
                        <span>Projections are estimates based on historical performance. Actual returns may vary. Past performance does not guarantee future results.</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-10">
                      <TrendingUp size={32} className="text-[#222] mx-auto mb-3" />
                      <p className="text-[#444] text-xs">Enter an investment amount to see projected returns</p>
                      <p className="text-[#333] text-[10px] mt-1">Minimum investment: R1,000</p>
                    </div>
                  )}

                  {/* Investment Rules */}
                  <div className="mt-5 pt-4 border-t border-white/[0.04]">
                    <h4 className="text-[#555] text-[10px] uppercase tracking-wider mb-2">Investment Rules</h4>
                    <ul className="space-y-1.5 text-[#444] text-[10px]">
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        Max 3 investments per package
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        Same amount can only be invested once per package
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        Weekly payouts every Monday
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Confirm */}
          {step === "confirm" && selectedPkg && projections && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-[600px] mx-auto"
            >
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-8">
                <h2 className="text-white text-lg font-display font-semibold mb-6 text-center">Review Your Investment</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                    <span className="text-[#555] text-xs">Package</span>
                    <span className="text-white text-sm font-semibold">{selectedPkg.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                    <span className="text-[#555] text-xs">Amount</span>
                    <div className="text-right">
                      <span className="text-white text-sm font-semibold">{formatCurrency(amountNum, currency.symbol)}</span>
                      {currency.code !== "ZAR" && (
                        <p className="text-[#444] text-[10px]">≈ R{amountZAR.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                    <span className="text-[#555] text-xs">Currency</span>
                    <span className="text-white text-sm">{currency.flag} {currency.code}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                    <span className="text-[#555] text-xs">Payment Method</span>
                    <span className={`text-sm font-semibold ${cryptoWallets[selectedWallet].color}`}>{cryptoWallets[selectedWallet].name} ({cryptoWallets[selectedWallet].symbol})</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                    <span className="text-[#555] text-xs">Weekly Return (est.)</span>
                    <span className="text-emerald-400 text-sm font-semibold">
                      R{projections.weeklyMin.toLocaleString("en-ZA", { maximumFractionDigits: 0 })} – R{projections.weeklyMax.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[#555] text-xs">Return Rate</span>
                    <span className="text-[#D4AF37] text-sm font-semibold">{selectedPkg.rateMin}–{selectedPkg.rateMax}% /week</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("select")}
                    className="btn-outline flex-1 py-3 text-sm justify-center"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="btn-gold flex-1 py-3 text-sm gap-2 justify-center"
                  >
                    Confirm Investment
                    <Check size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === "success" && selectedPkg && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-[500px] mx-auto text-center"
            >
              <div className="bg-[#0a0a0e] border border-emerald-500/[0.12] rounded-xl p-8 md:p-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                  <Check size={28} className="text-emerald-400" />
                </div>
                <h2 className="text-white text-xl font-display font-semibold mb-2">Investment Successful!</h2>
                <p className="text-[#555] text-sm mb-6">
                  Your {formatCurrency(amountNum, currency.symbol)} investment in the {selectedPkg.name} package has been processed.
                </p>

                <div className="bg-white/[0.02] border border-white/[0.03] rounded-xl p-4 mb-6 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#555] text-xs">Expected weekly return</span>
                    <span className="text-emerald-400 text-sm font-semibold">
                      {selectedPkg.rateMin}–{selectedPkg.rateMax}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#555] text-xs">First payout</span>
                    <span className="text-white text-sm font-medium">Next Monday</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/dashboard" className="btn-gold flex-1 py-3 text-sm gap-2 justify-center">
                    Go to Dashboard
                  </a>
                  <button
                    onClick={() => {
                      setStep("select");
                      setAmount("");
                      setError("");
                    }}
                    className="btn-outline flex-1 py-3 text-sm justify-center"
                  >
                    Make Another
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
