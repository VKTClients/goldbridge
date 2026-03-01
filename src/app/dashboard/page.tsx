"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, Wallet, ArrowUpRight, ArrowDownRight, Clock,
  TrendingUp, DollarSign, Calendar, ChevronRight, LogOut,
  BarChart3, CreditCard, Settings, Bell, Home, Shield, Copy,
  Check, Users, Download, HelpCircle, AlertTriangle, Target,
  Gift, MessageCircle, FileText, X, ArrowRight, Zap,
  ShieldCheck, Smartphone, Lock, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import KYCModal from "@/components/KYCModal";
import WithdrawModal from "@/components/WithdrawModal";

// Realistic mock investments
const mockInvestments = [
  { 
    id: 1, 
    plan: "Starter", 
    amountZAR: 3500, 
    rate: 17.5, 
    date: "2026-01-10", 
    status: "Active",
    currency: "ZAR",
    paymentMethod: "Card"
  },
  { 
    id: 2, 
    plan: "Growth", 
    amountZAR: 7500, 
    rate: 30, 
    date: "2026-01-22", 
    status: "Active",
    currency: "ZAR",
    paymentMethod: "Luno"
  },
  { 
    id: 3, 
    plan: "Premium", 
    amountZAR: 15000, 
    rate: 45, 
    date: "2026-02-05", 
    status: "Active",
    currency: "ZAR",
    paymentMethod: "Card"
  },
];

const mockTransactions = [
  { id: 1, type: "deposit", amount: 15000, date: "2026-02-05", description: "Premium Plan Deposit" },
  { id: 2, type: "return", amount: 6750, date: "2026-02-10", description: "Weekly Return — Premium" },
  { id: 3, type: "return", amount: 2250, date: "2026-02-10", description: "Weekly Return — Growth" },
  { id: 4, type: "deposit", amount: 7500, date: "2026-01-22", description: "Growth Plan Deposit" },
  { id: 5, type: "return", amount: 2250, date: "2026-02-03", description: "Weekly Return — Growth" },
  { id: 6, type: "return", amount: 612.50, date: "2026-02-03", description: "Weekly Return — Starter" },
  { id: 7, type: "deposit", amount: 3500, date: "2026-01-10", description: "Starter Plan Deposit" },
  { id: 8, type: "return", amount: 612.50, date: "2026-01-27", description: "Weekly Return — Starter" },
  { id: 9, type: "return", amount: 612.50, date: "2026-01-20", description: "Weekly Return — Starter" },
  { id: 10, type: "withdrawal", amount: 5000, date: "2026-01-15", description: "Withdrawal to Bank" },
];

const mockNotifications = [
  { id: 1, type: "payout", title: "Weekly payout processed", desc: "R9,612.50 credited to your account", time: "2h ago", read: false },
  { id: 2, type: "security", title: "New login detected", desc: "Chrome on Windows • Johannesburg, SA", time: "5h ago", read: false },
  { id: 3, type: "system", title: "Investment successful", desc: "Premium Plan R15,000 activated", time: "1d ago", read: true },
  { id: 4, type: "payout", title: "Weekly payout processed", desc: "R2,862.50 credited to your account", time: "1w ago", read: true },
  { id: 5, type: "system", title: "Welcome to GoldBridge", desc: "Your account is ready. Start investing today!", time: "2w ago", read: true },
];

const mockGoals = [
  { id: 1, name: "Emergency Fund", target: 100000, current: 72500, icon: Shield },
  { id: 2, name: "Property Deposit", target: 500000, current: 180000, icon: Target },
  { id: 3, name: "Retirement Fund", target: 2000000, current: 350000, icon: TrendingUp },
];

// Generate personal daily portfolio growth based on client investments
function generateDailyGrowth(investments: typeof mockInvestments) {
  const totalInvested = investments.reduce((s, i) => s + i.amountZAR, 0);
  const dailyReturn = investments.reduce((s, i) => s + (i.amountZAR * i.rate / 100) / 7, 0);
  const days = 14; // Show last 14 days
  const data: { week: string; value: number }[] = [];
  const today = new Date();
  for (let d = days - 1; d >= 0; d--) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    const dayLabel = date.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
    data.push({ week: dayLabel, value: Math.round(totalInvested + dailyReturn * (days - 1 - d)) });
  }
  return data;
}

// Chart data will be generated dynamically based on current investments

type TabKey = "overview" | "investments" | "transactions" | "settings";

const sidebarItems: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "investments", label: "Investments", icon: BarChart3 },
  { key: "transactions", label: "Transactions", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
];

function formatCurrency(amount: number) {
  return "R" + amount.toLocaleString("en-ZA");
}

// Mini SVG line chart
function PortfolioChart({ data }: { data: { week: string; value: number }[] }) {
  const w = 500, h = 160, px = 40, py = 20;
  const maxVal = Math.max(...data.map(d => d.value));
  const minVal = Math.min(...data.map(d => d.value)) * 0.9;
  const range = maxVal - minVal;
  const pts = data.map((d, i) => ({
    x: px + (i / (data.length - 1)) * (w - px * 2),
    y: py + (1 - (d.value - minVal) / range) * (h - py * 2),
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x},${h - py} L${pts[0].x},${h - py} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 1, 2, 3].map(i => {
        const y = py + (i / 3) * (h - py * 2);
        const val = maxVal - (i / 3) * range;
        return (
          <g key={i}>
            <line x1={px} y1={y} x2={w - px} y2={y} stroke="white" strokeOpacity="0.04" />
            <text x={px - 6} y={y + 3} textAnchor="end" fill="#444" fontSize="8" fontFamily="monospace">
              {(val / 1000).toFixed(0)}k
            </text>
          </g>
        );
      })}
      {/* X labels */}
      {data.map((d, i) => (
        <text key={d.week} x={pts[i].x} y={h - 4} textAnchor="middle" fill="#444" fontSize="8" fontFamily="monospace">
          {d.week}
        </text>
      ))}
      {/* Area fill */}
      <path d={area} fill="url(#chartGrad)" />
      {/* Line */}
      <path d={line} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {pts.map((p, i: number) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#060608" stroke="#D4AF37" strokeWidth="1.5" />
          <text x={p.x} y={p.y - 8} textAnchor="middle" fill="#D4AF37" fontSize="7" fontFamily="monospace" fontWeight="600">
            {formatCurrency(data[i].value)}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [txFilter, setTxFilter] = useState<"all" | "deposit" | "return" | "withdrawal">("all");
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const investments = mockInvestments;

  const referralCode = user ? `GB-${user.name.replace(/\s/g, "").toUpperCase().slice(0, 4)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}` : "";
  const referralLink = `https://goldbridge.capital/ref/${referralCode}`;

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/";
    }
  }, [user, isLoading]);


  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  const totalInvested = investments.reduce((s, i) => s + i.amountZAR, 0);
  const weeklyReturn = investments.reduce((s, i) => s + (i.amountZAR * i.rate) / 100, 0);
  const totalReturns = weeklyReturn * 6;
  const currentValue = totalInvested + totalReturns;
  const chartData = generateDailyGrowth(investments);
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const filteredTx = txFilter === "all" ? mockTransactions : mockTransactions.filter(t => t.type === txFilter);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const availableBalance = currentValue; // Available for withdrawal

  return (
    <>
      <KYCModal isOpen={showKYCModal} onClose={() => setShowKYCModal(false)} />
      <WithdrawModal 
        isOpen={showWithdrawModal} 
        onClose={() => setShowWithdrawModal(false)} 
        availableBalance={availableBalance}
      />
    <div className="min-h-screen bg-[#060608] flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden md:flex flex-col w-[240px] bg-[#09090c] border-r border-white/[0.04] fixed top-0 left-0 h-screen z-40">
        <a href="/" className="flex items-center gap-3 px-5 h-[72px] border-b border-white/[0.04]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C9A84C] to-[#B8942E] flex items-center justify-center">
            <span className="text-[#060608] font-bold text-xs">G</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-[12px] tracking-wide leading-tight">Goldbridge</span>
            <span className="text-[#D4AF37]/50 text-[8px] uppercase tracking-[0.2em]">Capital</span>
          </div>
        </a>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeTab === item.key
                  ? "bg-[#D4AF37]/[0.08] text-[#D4AF37] border border-[#D4AF37]/[0.12]"
                  : "text-[#555] hover:text-white hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Referral CTA in sidebar */}
        <div className="px-3 pb-3">
          <div className="bg-gradient-to-br from-[#D4AF37]/[0.08] to-transparent border border-[#D4AF37]/[0.1] rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Gift size={12} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[10px] font-semibold">Refer & Earn</span>
            </div>
            <p className="text-[#555] text-[9px] mb-2">Earn R500 for each friend who invests</p>
            <button onClick={copyReferral} className="w-full text-[9px] font-medium bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg py-1.5 hover:bg-[#D4AF37]/15 transition-colors flex items-center justify-center gap-1.5">
              {copiedRef ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy Link</>}
            </button>
          </div>
        </div>

        {/* User */}
        <div className="border-t border-white/[0.04] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center">
              <span className="text-[#060608] text-[10px] font-bold uppercase">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.name}</p>
              <p className="text-[#444] text-[10px] truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-[#555] hover:text-red-400 hover:bg-red-500/[0.04] rounded-lg transition-all text-xs"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#09090c]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-4 h-14">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center">
              <span className="text-[#060608] font-bold text-[10px]">G</span>
            </div>
            <span className="text-white font-semibold text-xs">Goldbridge</span>
          </a>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-[#555] hover:text-white transition-colors p-1.5">
              <Bell size={16} />
              {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#D4AF37] rounded-full text-[7px] text-[#060608] font-bold flex items-center justify-center">{unreadCount}</span>}
            </button>
            <button
              onClick={handleLogout}
              className="text-[#555] hover:text-red-400 transition-colors p-1.5"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
        <div className="flex border-t border-white/[0.03]">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[9px] font-medium transition-colors ${
                activeTab === item.key ? "text-[#D4AF37]" : "text-[#444]"
              }`}
            >
              <item.icon size={14} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowNotifications(false)} />
            <motion.div
              className="absolute right-0 md:right-[calc(50%-400px)] top-0 md:top-20 w-full md:w-[380px] h-full md:h-auto max-h-screen md:max-h-[500px] bg-[#0a0a0e] md:border border-white/[0.06] md:rounded-xl shadow-2xl overflow-hidden flex flex-col"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
                <h3 className="text-white text-sm font-semibold">Notifications</h3>
                <button onClick={() => setShowNotifications(false)} className="text-[#555] hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${!n.read ? "bg-[#D4AF37]/[0.02]" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      n.type === "payout" ? "bg-emerald-500/10" :
                      n.type === "security" ? "bg-amber-500/10" :
                      n.type === "referral" ? "bg-purple-500/10" :
                      "bg-blue-500/10"
                    }`}>
                      {n.type === "payout" ? <DollarSign size={13} className="text-emerald-400" /> :
                       n.type === "security" ? <Shield size={13} className="text-amber-400" /> :
                       n.type === "referral" ? <Gift size={13} className="text-purple-400" /> :
                       <Bell size={13} className="text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium">{n.title}</p>
                      <p className="text-[#444] text-[10px]">{n.desc}</p>
                      <p className="text-[#333] text-[9px] mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Chat Widget */}
      <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] md:bottom-6 right-4 md:right-6 z-50">
        <AnimatePresence>
          {showSupport && (
            <motion.div
              className="absolute bottom-14 right-0 w-[calc(100vw-2rem)] sm:w-[320px] bg-[#0a0a0e] border border-white/[0.06] rounded-xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-4 border-b border-white/[0.04]">
                <h4 className="text-white text-sm font-semibold">Goldbridge Support</h4>
                <p className="text-[#555] text-[10px]">Typically replies within 1 hour</p>
              </div>
              <div className="p-4 space-y-3 h-[200px] overflow-y-auto">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF37] text-[8px] font-bold">G</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.04] rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]">
                    <p className="text-[#888] text-[11px]">Hello! How can we help you today? Our team is available Mon–Fri, 8AM–6PM SAST.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-white/[0.04]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-[16px] sm:text-xs text-white placeholder:text-[#333] focus:outline-none focus:border-[#D4AF37]/30"
                  />
                  <button className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors flex-shrink-0">
                    <ArrowRight size={12} className="text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowSupport(!showSupport)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 transition-shadow"
        >
          {showSupport ? <X size={18} className="text-[#060608]" /> : <MessageCircle size={18} className="text-[#060608]" />}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-[240px] pt-[110px] md:pt-0">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-6 md:py-10">

          {/* Top Bar — Desktop */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white text-xl md:text-2xl font-display font-semibold">
                {activeTab === "overview" && "Dashboard"}
                {activeTab === "investments" && "My Investments"}
                {activeTab === "transactions" && "Transactions"}
                {activeTab === "settings" && "Settings"}
              </h1>
              <p className="text-[#444] text-xs mt-1">
                Welcome back, <span className="text-[#888]">{user.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex items-center gap-1.5 text-[11px] text-[#555] px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <Bell size={12} />
                Notifications
                {unreadCount > 0 && <span className="w-4 h-4 bg-[#D4AF37] rounded-full text-[8px] text-[#060608] font-bold flex items-center justify-center">{unreadCount}</span>}
              </button>
              <a href="/" className="flex items-center gap-1.5 text-[11px] text-[#555] px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <Home size={12} />
                Home
              </a>
            </div>
          </div>

          {/* KYC Verification Banner */}
          {user.kycStatus === "pending" && (
            <div className="mb-4 bg-amber-500/[0.04] border border-amber-500/[0.12] rounded-xl p-3.5 md:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-medium">Complete your KYC verification</p>
                  <p className="text-[#555] text-[10px]">Verify your identity to unlock higher withdrawal limits & full features</p>
                </div>
              </div>
              <button 
                onClick={() => setShowKYCModal(true)}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-lg hover:bg-amber-500/15 transition-colors whitespace-nowrap"
              >
                <Shield size={11} />
                Verify Now
              </button>
            </div>
          )}
          {user.kycStatus === "submitted" && (
            <div className="mb-4 bg-blue-500/[0.04] border border-blue-500/[0.12] rounded-xl p-3.5 md:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-medium">KYC verification under review</p>
                  <p className="text-[#555] text-[10px]">We're reviewing your documents. This usually takes 1-2 business days.</p>
                </div>
              </div>
              <span className="text-[10px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-lg">
                Under Review
              </span>
            </div>
          )}
          {user.kycStatus === "verified" && (
            <div className="mb-4 bg-emerald-500/[0.04] border border-emerald-500/[0.12] rounded-xl p-3.5 md:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-xs font-medium">Identity Verified</p>
                <p className="text-[#555] text-[10px]">Your account is fully verified with unlimited withdrawal access.</p>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                <a href="/invest" className="flex items-center justify-center gap-2 bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-3 hover:bg-white/[0.02] hover:border-[#D4AF37]/10 transition-all group">
                  <Wallet size={14} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] font-medium">Deposit</span>
                </a>
                <button 
                  onClick={() => setShowWithdrawModal(true)}
                  className="flex items-center justify-center gap-2 bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-3 hover:bg-white/[0.02] hover:border-emerald-500/10 transition-all group"
                >
                  <ArrowUpRight size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] font-medium">Withdraw</span>
                </button>
                <button onClick={copyReferral} className="flex items-center justify-center gap-2 bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-3 hover:bg-white/[0.02] hover:border-purple-500/10 transition-all group">
                  <Users size={14} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] font-medium">{copiedRef ? "Copied!" : "Refer"}</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
                {[
                  { label: "Total Invested", value: formatCurrency(totalInvested), icon: Wallet, change: null },
                  { label: "Current Value", value: formatCurrency(currentValue), icon: TrendingUp, change: `+${((totalReturns / totalInvested) * 100).toFixed(1)}%` },
                  { label: "Weekly Return", value: formatCurrency(weeklyReturn), icon: DollarSign, change: null },
                  { label: "Total Returns", value: formatCurrency(totalReturns), icon: ArrowUpRight, change: null },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4 md:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center">
                        <stat.icon size={14} className="text-[#D4AF37]" />
                      </div>
                      {stat.change && (
                        <span className="text-emerald-400 text-[10px] font-medium bg-emerald-500/[0.08] px-2 py-0.5 rounded-full">
                          {stat.change}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-lg md:text-xl font-semibold font-display">{stat.value}</p>
                    <p className="text-[#444] text-[10px] md:text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Portfolio Growth Chart */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4 md:p-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-sm font-semibold">Portfolio Growth</h3>
                  {totalInvested > 0 && (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                      <TrendingUp size={11} />
                      <span>+{((totalReturns / totalInvested) * 100).toFixed(1)}% total</span>
                    </div>
                  )}
                </div>
                {investments.length > 0 ? (
                  <PortfolioChart data={chartData} />
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp size={40} className="text-[#222] mx-auto mb-3" />
                    <p className="text-[#444] text-sm mb-2">No investments yet</p>
                    <p className="text-[#333] text-xs mb-4">Start investing to see your portfolio growth</p>
                    <a href="/invest" className="btn-gold text-[11px] font-semibold px-6 py-2.5 gap-1.5">
                      Make Your First Investment
                    </a>
                  </div>
                )}
              </div>

              {/* Two Column: Active Investments + Recent Transactions */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                <div className="lg:col-span-3 bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4 md:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm font-semibold">Active Investments</h3>
                    <button onClick={() => setActiveTab("investments")} className="text-[#D4AF37] text-[10px] flex items-center gap-1 hover:underline">
                      View All <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {investments.length > 0 ? investments.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                            inv.plan === "Premium" ? "bg-[#D4AF37]/10 text-[#D4AF37]" :
                            inv.plan === "Growth" ? "bg-emerald-500/10 text-emerald-400" :
                            "bg-blue-500/10 text-blue-400"
                          }`}>
                            {inv.plan.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">{inv.plan} Plan</p>
                            <p className="text-[#444] text-[10px]">{inv.rate}% weekly</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-xs font-medium">{formatCurrency(inv.amountZAR)}</p>
                          <p className="text-emerald-400 text-[10px]">+{formatCurrency(inv.amountZAR * inv.rate / 100)}/wk</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <Wallet size={32} className="text-[#222] mx-auto mb-3" />
                        <p className="text-[#444] text-sm mb-2">No active investments</p>
                        <p className="text-[#333] text-xs mb-4">Start investing to see your portfolio here</p>
                        <a href="/invest" className="btn-gold text-[11px] font-semibold px-6 py-2.5 gap-1.5">
                          Make Your First Investment
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4 md:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm font-semibold">Recent Activity</h3>
                    <button onClick={() => setActiveTab("transactions")} className="text-[#D4AF37] text-[10px] flex items-center gap-1 hover:underline">
                      View All <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mockTransactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          tx.type === "deposit" ? "bg-blue-500/10" :
                          tx.type === "return" ? "bg-emerald-500/10" :
                          "bg-red-500/10"
                        }`}>
                          {tx.type === "deposit" ? <ArrowDownRight size={12} className="text-blue-400" /> :
                           tx.type === "return" ? <ArrowUpRight size={12} className="text-emerald-400" /> :
                           <ArrowUpRight size={12} className="text-red-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[11px] font-medium truncate">{tx.description}</p>
                          <p className="text-[#333] text-[10px]">{tx.date}</p>
                        </div>
                        <span className={`text-xs font-medium ${
                          tx.type === "return" ? "text-emerald-400" :
                          tx.type === "withdrawal" ? "text-red-400" :
                          "text-white"
                        }`}>
                          {tx.type === "withdrawal" ? "-" : "+"}{formatCurrency(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Goals */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4 md:p-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-sm font-semibold">Financial Goals</h3>
                  <a href="/goals" className="text-[#D4AF37] text-[10px] flex items-center gap-1 hover:underline">
                    Add Goal <ChevronRight size={10} />
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mockGoals.map((goal) => {
                    const pct = Math.min((goal.current / goal.target) * 100, 100);
                    return (
                      <div key={goal.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/[0.06] flex items-center justify-center">
                            <goal.icon size={13} className="text-[#D4AF37]" />
                          </div>
                          <span className="text-white text-xs font-medium">{goal.name}</span>
                        </div>
                        <div className="flex items-end justify-between mb-1.5">
                          <span className="text-[#888] text-[10px]">{formatCurrency(goal.current)}</span>
                          <span className="text-[#444] text-[10px]">{formatCurrency(goal.target)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#D4AF37]/60 to-[#D4AF37] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="text-[#555] text-[9px] mt-1.5">{pct.toFixed(0)}% of goal reached</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Referral Card + Quick Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Referral Program */}
                <div className="bg-gradient-to-br from-[#D4AF37]/[0.04] to-[#0a0a0e] border border-[#D4AF37]/[0.08] rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift size={15} className="text-[#D4AF37]" />
                    <h3 className="text-white text-sm font-semibold">Referral Program</h3>
                  </div>
                  <p className="text-[#555] text-[11px] mb-3">Share your referral link and earn R500 for every friend who makes their first investment.</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-[10px] text-[#555] font-mono truncate">
                      {referralLink}
                    </div>
                    <button onClick={copyReferral} className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors">
                      {copiedRef ? <Check size={13} className="text-[#D4AF37]" /> : <Copy size={13} className="text-[#D4AF37]" />}
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-white text-sm font-semibold font-display">3</p>
                      <p className="text-[#444] text-[9px]">Friends Referred</p>
                    </div>
                    <div>
                      <p className="text-emerald-400 text-sm font-semibold font-display">R1,500</p>
                      <p className="text-[#444] text-[9px]">Bonus Earned</p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4 md:p-5">
                  <h3 className="text-white text-sm font-semibold mb-3">Account Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-[#D4AF37]" />
                      <span className="text-[#555] text-xs">Next payout: <span className="text-white">Monday</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="text-[#D4AF37]" />
                      <span className="text-[#555] text-xs">Member since: <span className="text-white">{new Date(user.joined).toLocaleDateString()}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={13} className="text-[#D4AF37]" />
                      <span className="text-[#555] text-xs">Active plans: <span className="text-white">{mockInvestments.length}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={13} className="text-amber-400" />
                      <span className="text-[#555] text-xs">KYC Status: <span className="text-amber-400">Pending</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={13} className="text-[#D4AF37]" />
                      <span className="text-[#555] text-xs">Withdrawal limit: <span className="text-white">R50,000/week</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Investments Tab */}
          {activeTab === "investments" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl overflow-hidden">
                <div className="hidden md:grid grid-cols-6 gap-4 px-5 py-3 border-b border-white/[0.04] text-[10px] text-[#444] uppercase tracking-wider font-medium">
                  <span>Plan</span>
                  <span>Amount</span>
                  <span>Rate</span>
                  <span>Weekly Return</span>
                  <span>Start Date</span>
                  <span>Status</span>
                </div>
                {investments.length > 0 ? investments.map((inv) => (
                  <div key={inv.id} className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 px-4 md:px-5 py-4 border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                        inv.plan === "Premium" ? "bg-[#D4AF37]/10 text-[#D4AF37]" :
                        inv.plan === "Growth" ? "bg-emerald-500/10 text-emerald-400" :
                        "bg-blue-500/10 text-blue-400"
                      }`}>
                        {inv.plan.charAt(0)}
                      </div>
                      <span className="text-white text-xs font-medium">{inv.plan}</span>
                    </div>
                    <span className="text-white text-xs">{formatCurrency(inv.amountZAR)}</span>
                    <span className="text-[#D4AF37] text-xs hidden md:block">{inv.rate}%/wk</span>
                    <span className="text-emerald-400 text-xs hidden md:block">{formatCurrency(inv.amountZAR * inv.rate / 100)}</span>
                    <span className="text-[#555] text-xs hidden md:block">{inv.date}</span>
                    <div className="flex justify-end md:justify-start">
                      <span className="text-emerald-400 text-[10px] bg-emerald-500/[0.08] px-2 py-0.5 rounded-full font-medium">
                        {inv.status}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <Wallet size={40} className="text-[#222] mx-auto mb-3" />
                    <p className="text-[#444] text-sm mb-2">No investments yet</p>
                    <p className="text-[#333] text-xs mb-4">Start investing to see your portfolio here</p>
                    <a href="/invest" className="btn-gold text-[11px] font-semibold px-6 py-2.5 gap-1.5">
                      Make Your First Investment
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <p className="text-[#444] text-[10px] mb-1">Total Invested</p>
                  <p className="text-white text-lg font-semibold font-display">{formatCurrency(totalInvested)}</p>
                </div>
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <p className="text-[#444] text-[10px] mb-1">Combined Weekly</p>
                  <p className="text-emerald-400 text-lg font-semibold font-display">{formatCurrency(weeklyReturn)}</p>
                </div>
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4 col-span-2 md:col-span-1">
                  <p className="text-[#444] text-[10px] mb-1">Active Plans</p>
                  <p className="text-white text-lg font-semibold font-display">{investments.length}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Filter Tabs + Download */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  {(["all", "deposit", "return", "withdrawal"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTxFilter(f)}
                      className={`px-3 py-1.5 text-[10px] font-medium rounded-lg transition-all capitalize ${
                        txFilter === f
                          ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                          : "text-[#555] hover:text-white border border-transparent"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 text-[10px] text-[#555] px-3 py-1.5 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <Download size={11} />
                  Export CSV
                </button>
              </div>

              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl overflow-hidden">
                {filteredTx.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-[#444] text-xs">No transactions found for this filter.</p>
                  </div>
                ) : (
                  filteredTx.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        tx.type === "deposit" ? "bg-blue-500/10" :
                        tx.type === "return" ? "bg-emerald-500/10" :
                        "bg-red-500/10"
                      }`}>
                        {tx.type === "deposit" ? <ArrowDownRight size={14} className="text-blue-400" /> :
                         tx.type === "return" ? <ArrowUpRight size={14} className="text-emerald-400" /> :
                         <ArrowUpRight size={14} className="text-red-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium">{tx.description}</p>
                        <p className="text-[#333] text-[10px]">{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-semibold ${
                          tx.type === "return" ? "text-emerald-400" :
                          tx.type === "withdrawal" ? "text-red-400" :
                          "text-white"
                        }`}>
                          {tx.type === "withdrawal" ? "-" : "+"}{formatCurrency(tx.amount)}
                        </span>
                        <p className="text-[#333] text-[10px] capitalize">{tx.type}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Profile */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6">
                <h3 className="text-white text-sm font-semibold mb-4">Profile</h3>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center">
                    <span className="text-[#060608] text-lg font-bold uppercase">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{user.name}</p>
                    <p className="text-[#444] text-xs">{user.email}</p>
                    <p className="text-[#333] text-[10px] mt-0.5">Member since {new Date(user.joined).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+27 XX XXX XXXX"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Country</label>
                    <input
                      type="text"
                      defaultValue="South Africa"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                    />
                  </div>
                </div>
                <button className="mt-4 btn-gold text-[11px] font-semibold px-5 py-2 tracking-wide">
                  Save Changes
                </button>
              </div>

              {/* KYC Verification */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6">
                <h3 className="text-white text-sm font-semibold mb-4">KYC Verification</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <FileText size={15} className="text-[#555]" />
                      <div>
                        <p className="text-white text-xs font-medium">ID Document</p>
                        <p className="text-[#444] text-[10px]">Upload your SA ID or passport</p>
                      </div>
                    </div>
                    <span className="text-amber-400 text-[10px] bg-amber-500/[0.08] px-2.5 py-1 rounded-full font-medium">Pending</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <Home size={15} className="text-[#555]" />
                      <div>
                        <p className="text-white text-xs font-medium">Proof of Address</p>
                        <p className="text-[#444] text-[10px]">Utility bill or bank statement (≤3 months)</p>
                      </div>
                    </div>
                    <span className="text-[#444] text-[10px] bg-white/[0.03] px-2.5 py-1 rounded-full">Not Submitted</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <Smartphone size={15} className="text-[#555]" />
                      <div>
                        <p className="text-white text-xs font-medium">Selfie Verification</p>
                        <p className="text-[#444] text-[10px]">Live selfie for identity match</p>
                      </div>
                    </div>
                    <span className="text-[#444] text-[10px] bg-white/[0.03] px-2.5 py-1 rounded-full">Not Submitted</span>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6">
                <h3 className="text-white text-sm font-semibold mb-4">Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={15} className="text-[#555]" />
                      <div>
                        <p className="text-white text-xs font-medium">Two-Factor Authentication</p>
                        <p className="text-[#444] text-[10px]">Add an extra layer of security</p>
                      </div>
                    </div>
                    <span className="text-[#444] text-[10px] bg-white/[0.03] px-2.5 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <Lock size={15} className="text-[#555]" />
                      <div>
                        <p className="text-white text-xs font-medium">Change Password</p>
                        <p className="text-[#444] text-[10px]">Update your account password</p>
                      </div>
                    </div>
                    <span className="text-[#444] text-[10px] bg-white/[0.03] px-2.5 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <Bell size={15} className="text-[#555]" />
                      <div>
                        <p className="text-white text-xs font-medium">Email Notifications</p>
                        <p className="text-[#444] text-[10px]">Payouts, security alerts, news</p>
                      </div>
                    </div>
                    <div className="w-9 h-5 rounded-full bg-[#D4AF37]/20 flex items-center px-0.5 cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37] ml-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-[#0a0a0e] border border-red-500/[0.08] rounded-xl p-5 md:p-6">
                <h3 className="text-red-400 text-sm font-semibold mb-2">Danger Zone</h3>
                <p className="text-[#444] text-xs mb-4">Once you sign out, you can sign back in anytime with your credentials.</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/[0.06] transition-colors"
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
    </>
  );
}
