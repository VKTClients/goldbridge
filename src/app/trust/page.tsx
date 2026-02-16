"use client";

import { Shield, Lock, Eye, Clock, Users, Award, BarChart3, Headphones, CheckCircle2 } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketTicker from "@/components/MarketTicker";

const trustPoints = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your funds are protected with institutional-level encryption, multi-signature wallets, and cold storage protocols used by leading financial institutions.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Track every investment, every return, and every movement of your capital in real-time through your personal dashboard.",
  },
  {
    icon: Clock,
    title: "Consistent Weekly Payouts",
    description: "Automated payouts every Monday without fail. No lock-up periods, no hidden delays — withdraw your returns anytime.",
  },
  {
    icon: Lock,
    title: "Regulated & Compliant",
    description: "We operate within strict regulatory frameworks with full KYC/AML compliance to protect you and your investments.",
  },
  {
    icon: Users,
    title: "Global Investor Community",
    description: "Join thousands of investors across Africa, Europe, and beyond who trust GoldBridge with their capital growth.",
  },
  {
    icon: Award,
    title: "25 Years of Excellence",
    description: "Established in 2000, we have over two decades of experience delivering consistent returns through disciplined strategies.",
  },
  {
    icon: BarChart3,
    title: "AI-Driven Analysis",
    description: "We combine industry experience with technology-assisted tools including AI-driven market analysis to identify opportunities.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Every investor gets access to responsive support. Premium clients receive a personal account manager available 24/7.",
  },
];

const stats = [
  { value: "25+", label: "Years of Experience" },
  { value: "98.2%", label: "Client Retention Rate" },
  { value: "40+", label: "Countries Served" },
  { value: "$1.8B+", label: "Capital Deployed" },
];

const securityFeatures = [
  "256-bit SSL encryption for all data transmission",
  "Multi-factor authentication (MFA) required",
  "Cold storage for 95% of digital assets",
  "Regular third-party security audits",
  "Real-time fraud detection systems",
  "Segregated client accounts",
];

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[#060608] noise-overlay">
      <Navbar />
      <MarketTicker />
      
      <main className="pt-[108px] pb-20">
        {/* Hero Section */}
        <section className="section-padding relative">
          <div className="aurora aurora-gold top-[10%] right-[10%] w-[200px] md:w-[400px] h-[150px] md:h-[300px] opacity-[0.06]" />
          
          <div className="max-w-[1200px] mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="text-center mb-12 md:mb-16">
                <div className="pill-gold mb-5 mx-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  Trust & Security
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                  Why Trust <span className="gold-text">GoldBridge?</span>
                </h1>
                <p className="text-[#666] text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                  Your security and trust are our top priorities. We've built our platform on a foundation of 
                  transparency, compliance, and institutional-grade security measures to protect your investments.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Stats */}
            <AnimateOnScroll delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-gold p-5 md:p-6 text-center">
                    <p className="text-[#D4AF37] text-2xl md:text-4xl font-bold font-display mb-1">{stat.value}</p>
                    <p className="text-[#555] text-[10px] md:text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Trust Points Grid */}
        <section className="section-padding relative">
          <div className="max-w-[1200px] mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Our Commitment to You</h2>
                <p className="text-[#555] text-sm max-w-xl mx-auto">
                  Every aspect of GoldBridge is designed with your security and success in mind.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {trustPoints.map((point, i) => (
                <AnimateOnScroll key={point.title} delay={i * 0.03}>
                  <div className="glass p-5 h-full">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center mb-4">
                      <point.icon size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white text-sm font-semibold mb-2">{point.title}</h3>
                    <p className="text-[#555] text-xs leading-relaxed">{point.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="section-padding relative">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <AnimateOnScroll direction="left">
                <div>
                  <div className="pill-gold mb-4">
                    <Shield size={12} />
                    Bank-Grade Security
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                    Your Assets Are Protected
                  </h2>
                  <p className="text-[#666] text-sm leading-relaxed mb-6">
                    We employ the same security measures used by leading financial institutions worldwide. 
                    Your funds and data are protected by multiple layers of security, ensuring peace of mind 
                    for every investor.
                  </p>
                  <div className="space-y-3">
                    {securityFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-[#888] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll direction="right">
                <div className="glass-gold p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/[0.1] border border-[#D4AF37]/[0.2] flex items-center justify-center">
                      <Lock size={22} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Compliance & Regulation</h3>
                      <p className="text-[#555] text-xs">Fully compliant with global standards</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="glass-subtle p-4">
                      <p className="text-white text-sm font-medium mb-1">KYC/AML Compliance</p>
                      <p className="text-[#555] text-xs">All users undergo identity verification to prevent fraud and money laundering.</p>
                    </div>
                    <div className="glass-subtle p-4">
                      <p className="text-white text-sm font-medium mb-1">Data Protection</p>
                      <p className="text-[#555] text-xs">GDPR compliant data handling with strict privacy protocols.</p>
                    </div>
                    <div className="glass-subtle p-4">
                      <p className="text-white text-sm font-medium mb-1">Regular Audits</p>
                      <p className="text-[#555] text-xs">Independent third-party audits ensure transparency and accountability.</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding relative">
          <div className="max-w-[800px] mx-auto">
            <AnimateOnScroll>
              <div className="glass-gold p-8 md:p-12 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Start Investing?
                </h2>
                <p className="text-[#666] text-sm mb-6 max-w-lg mx-auto">
                  Join thousands of investors who trust GoldBridge with their capital. 
                  Start with as little as R1,000 and watch your wealth grow.
                </p>
                <a href="/invest" className="btn-gold text-sm px-8 py-3">
                  Get Started Today
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
