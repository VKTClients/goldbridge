"use client";

import { Shield, Users, Award, BarChart3, Globe, Building2, Target, Zap } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketTicker from "@/components/MarketTicker";

const stats = [
  { value: "25+", label: "Years of Experience" },
  { value: "40+", label: "Countries Served" },
  { value: "$1.8B+", label: "Capital Deployed" },
  { value: "98.2%", label: "Client Retention" },
];

const values = [
  {
    icon: Target,
    title: "Strategic Focus",
    description: "Every investment decision is guided by rigorous analysis and a clear strategic vision for long-term growth.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "We employ disciplined risk management protocols to protect capital while pursuing optimal returns.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Our investments span international markets, deploying capital strategically across multiple regions.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "We leverage cutting-edge AI and technology-assisted tools to identify high-potential opportunities.",
  },
];

const timeline = [
  { year: "2000", event: "GoldBridge Capital founded with a vision to democratize institutional investing" },
  { year: "2005", event: "Expanded operations to serve clients across Africa and Europe" },
  { year: "2010", event: "Launched diversified e-commerce investment strategy" },
  { year: "2015", event: "Reached $500M in assets under management" },
  { year: "2020", event: "Introduced AI-driven market analysis tools" },
  { year: "2024", event: "Surpassed $1.8B in capital deployed across 40+ countries" },
];

export default function AboutPage() {
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
                  About Us
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                  Building Wealth <span className="gold-text">Since 2000</span>
                </h1>
                <p className="text-[#666] text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                  Since our establishment in 2000, we have focused on helping individuals grow their capital through 
                  carefully crafted strategies built on real-world business activity. We invest across international markets, 
                  deploying capital strategically across regions into growing online stores that generate daily sales.
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

        {/* Our Story */}
        <section className="section-padding relative">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <AnimateOnScroll direction="left">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Our Story</h2>
                  <p className="text-[#666] text-sm leading-relaxed mb-4">
                    GoldBridge Capital was founded with a simple yet powerful mission: to make institutional-grade 
                    investing accessible to everyone. What started as a small team of passionate investors has grown 
                    into a global operation serving thousands of clients across more than 40 countries.
                  </p>
                  <p className="text-[#555] text-sm leading-relaxed mb-4">
                    Our investment approach is built upon strategic analysis, disciplined execution, and responsible 
                    risk management. We combine over two decades of industry experience with technology-assisted tools 
                    — including AI-driven market analysis — to identify high-potential opportunities.
                  </p>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Today, our capital is deployed into growing e-commerce businesses that generate consistent daily 
                    sales across multiple regions, providing our investors with reliable weekly returns.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll direction="right">
                <div className="glass p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/[0.08] border border-[#D4AF37]/[0.15] flex items-center justify-center">
                      <Building2 size={22} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">GoldBridge Capital</h3>
                      <p className="text-[#555] text-xs">Est. 2000 · Institutional Wealth Management</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {timeline.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                          {i < timeline.length - 1 && <div className="w-px h-full bg-[#D4AF37]/20" />}
                        </div>
                        <div className="pb-4">
                          <p className="text-[#D4AF37] text-xs font-semibold mb-1">{item.year}</p>
                          <p className="text-[#666] text-xs leading-relaxed">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding relative">
          <div className="max-w-[1200px] mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Our Core Values</h2>
                <p className="text-[#555] text-sm max-w-xl mx-auto">
                  The principles that guide every investment decision we make.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {values.map((value, i) => (
                <AnimateOnScroll key={value.title} delay={i * 0.05}>
                  <div className="glass p-5 h-full">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center mb-4">
                      <value.icon size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white text-sm font-semibold mb-2">{value.title}</h3>
                    <p className="text-[#555] text-xs leading-relaxed">{value.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Focus */}
        <section className="section-padding relative">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <AnimateOnScroll>
                <div className="glass p-6 md:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center">
                      <BarChart3 size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white text-lg font-display font-semibold">Global Markets</h3>
                  </div>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Strategic investments across international markets. Our capital is deployed into growing e-commerce 
                    businesses that generate consistent daily sales across multiple regions including North America, 
                    Europe, and emerging markets.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.1}>
                <div className="glass p-6 md:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center">
                      <Shield size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white text-lg font-display font-semibold">Diversified Approach</h3>
                  </div>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Multi-region deployment for optimal growth. Our investment approach is built upon strategic analysis, 
                    disciplined execution, and responsible risk management to protect and grow your capital.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
