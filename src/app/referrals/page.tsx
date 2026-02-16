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

  const handleShareWhatsApp = () => {
    const message = `Join me on Goldbridge Capital and start investing! Use my referral code: ${referralCode}\n\n${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const message = `Just joined Goldbridge Capital - amazing investment platform! Use my referral code: ${referralCode} to get 0.5% bonus on your first investment. ${referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = "Join me on Goldbridge Capital";
    const body = `Hi,\n\nI wanted to share this amazing investment platform with you - Goldbridge Capital.\n\nUse my referral code: ${referralCode}\n\nThis gives you a 0.5% bonus on your first investment!\n\nSign up here: ${referralLink}\n\nLet me know if you have any questions!\n\nBest regards`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  
  const benefits = [
    {
      icon: TrendingUp,
      title: "Investment Bonus",
      description: "Get 0.5% extra returns on your next investment for each successful referral."
    },
    {
      icon: Users,
      title: "Stackable Bonuses",
      description: "Multiple referrals? Stack your bonuses. 3 referrals = 1.5% extra on your next investment."
    },
    {
      icon: Gift,
      title: "No Limits",
      description: "No cap on referrals or bonuses. Refer as many friends as you want."
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
                  Share Goldbridge Capital with your network. When your friends invest, you get an additional 0.5% bonus on your next investment.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Referral Input Section */}
            {!user && (
              <AnimateOnScroll delay={0.1}>
                <div className="glass-gold p-6 md:p-8 mb-12 max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-white text-xl font-semibold mb-2">Have a Referral Code?</h2>
                    <p className="text-[#888] text-sm">Enter your referral code to get 0.5% bonus on your first investment</p>
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
                    <p className="text-[#888] text-sm">Share this code with friends and earn 0.5% bonus on your next investment</p>
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
                    <button 
                      onClick={handleShareWhatsApp}
                      className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[#666] text-xs hover:border-white/[0.1] hover:text-white transition-colors"
                    >
                      Share on WhatsApp
                    </button>
                    <button 
                      onClick={handleShareTwitter}
                      className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[#666] text-xs hover:border-white/[0.1] hover:text-white transition-colors"
                    >
                      Share on Twitter
                    </button>
                    <button 
                      onClick={handleShareEmail}
                      className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[#666] text-xs hover:border-white/[0.1] hover:text-white transition-colors"
                    >
                      Share via Email
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* Commission Tiers */}
            <AnimateOnScroll delay={0.15}>
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl font-semibold font-display mb-2">How It Works</h2>
                <p className="text-[#555] text-sm">Simple referral system with investment bonuses</p>
              </div>
              
              <div className="glass-gold p-8 md:p-10 max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/[0.1] border border-[#D4AF37]/[0.2] flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-[#D4AF37]">0.5%</span>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Your Bonus</h3>
                    <p className="text-[#555] text-sm">Get 0.5% extra returns on your next investment when friends sign up with your code</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/[0.1] border border-[#D4AF37]/[0.2] flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-[#D4AF37]">∞</span>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Unlimited Referrals</h3>
                    <p className="text-[#555] text-sm">No limit on how many friends you can refer. Each referral gives you another 0.5% bonus</p>
                  </div>
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { step: "1", title: "Share Your Code", desc: "Give friends your unique referral code" },
                    { step: "2", title: "They Invest", desc: "When they make their first investment, you get a 0.5% bonus" },
                    { step: "3", title: "Apply Bonus", desc: "Use your 0.5% bonus on your next investment for extra returns" }
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
                  0.5% bonuses are credited when your referred friends make their first investment. 
                  Bonuses stack with multiple referrals. Referral codes are valid for 30 days. 
                  Bonuses apply to your next investment only. Full terms and conditions apply.
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
