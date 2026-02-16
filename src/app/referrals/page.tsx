"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Gift, Users, TrendingUp, Share2, Check, ArrowRight, Copy, ExternalLink } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TiltCard from "@/components/TiltCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketTicker from "@/components/MarketTicker";

export default function ReferralsPage() {
  const { user, setShowAuthModal } = useAuth();
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [referralInput, setReferralInput] = useState("");

  useEffect(() => {
    if (user) {
      const code = `GB-${user.name.replace(/\s/g, "").toUpperCase().slice(0, 4)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      setReferralCode(code);
      setReferralLink(`https://goldbridge.capital/ref/${code}`);
    }
  }, [user]);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyReferral = () => {
    // Store referral code in localStorage for auth modal to use
    localStorage.setItem("gb_referral_code", referralInput);
    setShowAuthModal(true);
  };

  const tiers = [
    {
      level: "Level 1",
      commission: "10%",
      description: "Direct referrals",
      color: "text-[#D4AF37]"
    },
    {
      level: "Level 2", 
      commission: "5%",
      description: "Their referrals",
      color: "text-[#C9A84C]"
    },
    {
      level: "Level 3",
      commission: "3%", 
      description: "Third level referrals",
      color: "text-[#B8942E]"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Lifetime Commissions",
      description: "Earn commissions on every investment your referrals make, forever."
    },
    {
      icon: Users,
      title: "3-Tier System",
      description: "Earn from your direct referrals and their referrals up to 3 levels deep."
    },
    {
      icon: Gift,
      title: "No Limits",
      description: "No cap on how much you can earn. Refer as many people as you want."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "One-click sharing to WhatsApp, Telegram, Twitter, and more."
    }
  ];

  return (
    <div className="min-h-screen bg-[#060608] noise-overlay">
      <Navbar />
      <MarketTicker />
      
      <main className="pt-[108px] pb-20">
        {/* Hero Section */}
        <section className="section-padding relative">
          <div className="aurora aurora-gold top-[10%] left-[10%] w-[200px] md:w-[400px] h-[150px] md:h-[300px] opacity-[0.06]" />
          
          <div className="max-w-[1200px] mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="text-center mb-12 md:mb-16">
                <div className="pill-gold mb-5 mx-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  Referral Program
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight">
                  Earn <span className="gold-text">Together</span>
                </h1>
                <p className="text-[#555] text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
                  Share Goldbridge Capital with your network and earn lifetime commissions on every investment your referrals make.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Referral Input Section */}
            {!user && (
              <AnimateOnScroll delay={0.1}>
                <div className="glass-gold p-6 md:p-8 mb-12 max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-white text-xl font-semibold mb-2">Have a Referral Code?</h2>
                    <p className="text-[#888] text-sm">Enter your referral code to get started with exclusive benefits</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={referralInput}
                      onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                      placeholder="Enter referral code (e.g., GB-JOHN-4X7P)"
                      className="flex-1 px-4 py-3 bg-[#0a0a0e] border border-white/[0.06] rounded-xl text-white placeholder-[#555] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                    />
                    <button
                      onClick={handleApplyReferral}
                      disabled={!referralInput}
                      className="btn-gold px-6 py-3 font-semibold gap-2 justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Apply & Sign Up
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* User's Referral Code */}
            {user && (
              <AnimateOnScroll delay={0.1}>
                <div className="glass-subtle p-6 md:p-8 mb-12 max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-white text-xl font-semibold mb-2">Your Referral Code</h2>
                    <p className="text-[#888] text-sm">Share this code with friends and start earning commissions</p>
                  </div>
                  <div className="bg-[#0a0a0e] border border-white/[0.06] rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#D4AF37] text-2xl font-bold font-display mb-1">{referralCode}</p>
                        <p className="text-[#555] text-xs">{referralLink}</p>
                      </div>
                      <button
                        onClick={handleCopyReferral}
                        className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/[0.1] border border-[#D4AF37]/[0.2] rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/[0.2] transition-colors"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[#666] text-xs hover:border-white/[0.1] transition-colors">
                      Share on WhatsApp
                    </button>
                    <button className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[#666] text-xs hover:border-white/[0.1] transition-colors">
                      Share on Twitter
                    </button>
                    <button className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[#666] text-xs hover:border-white/[0.1] transition-colors">
                      Share via Email
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* Commission Tiers */}
            <AnimateOnScroll delay={0.15}>
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl font-semibold font-display mb-2">Commission Structure</h2>
                <p className="text-[#555] text-sm">Earn up to 18% total commission across 3 levels</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
                {tiers.map((tier, i) => (
                  <TiltCard key={tier.level}>
                    <div className="glass p-6 text-center h-full">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/[0.1] border border-[#D4AF37]/[0.2] flex items-center justify-center mx-auto mb-4">
                        <span className={`text-xl font-bold ${tier.color}`}>{tier.commission}</span>
                      </div>
                      <h3 className="text-white text-lg font-semibold mb-1">{tier.level}</h3>
                      <p className="text-[#555] text-sm">{tier.description}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Benefits */}
            <AnimateOnScroll delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {benefits.map((benefit, i) => (
                  <TiltCard key={benefit.title}>
                    <div className="glass p-6 flex gap-4 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center flex-shrink-0">
                        <benefit.icon size={20} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-[#555] text-xs leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </AnimateOnScroll>

            {/* How It Works */}
            <AnimateOnScroll delay={0.25}>
              <div className="glass-gold p-8 md:p-10 max-w-4xl mx-auto">
                <h2 className="text-white text-2xl font-semibold font-display mb-6 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { step: "1", title: "Share Your Code", desc: "Give friends your unique referral code" },
                    { step: "2", title: "They Sign Up", desc: "They register using your referral link" },
                    { step: "3", title: "They Invest", desc: "When they invest, you earn commissions" },
                    { step: "4", title: "Get Paid", desc: "Receive commissions weekly with their returns" }
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#060608] font-bold text-sm flex items-center justify-center mx-auto mb-3">
                        {item.step}
                      </div>
                      <h3 className="text-white text-xs font-semibold mb-1">{item.title}</h3>
                      <p className="text-[#555] text-[10px] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Terms */}
            <AnimateOnScroll delay={0.3}>
              <div className="mt-12 text-center">
                <p className="text-[#444] text-[11px] leading-relaxed max-w-3xl mx-auto">
                  Commissions are paid weekly based on your referrals' investment returns. 
                  Referral codes are valid for 30 days. Commissions are calculated on net investment amounts 
                  after any withdrawals. Full terms and conditions apply.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
