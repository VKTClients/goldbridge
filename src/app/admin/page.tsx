"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, Users, Wallet, ArrowUpRight, ArrowDownRight,
  TrendingUp, DollarSign, Search, ChevronDown, ChevronRight,
  LogOut, Home, Shield, Eye, X, Download, Filter,
  CheckCircle2, Clock, AlertTriangle, FileText, Image,
  BarChart3, CreditCard, Settings, Bell, Copy, Check,
  ArrowLeft, RefreshCw, Ban, UserCheck, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──
interface ClientUser {
  email: string;
  name: string;
  joined: string;
  role: string;
  kycStatus: string;
  investments: StoredInvestment[];
  deposits: StoredDeposit[];
  withdrawals: StoredWithdrawal[];
  totalInvested: number;
  totalDeposited: number;
  totalWithdrawn: number;
}

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

interface StoredDeposit {
  id: string;
  amount: number;
  currency: string;
  walletType: string;
  txHash: string;
  proofImage?: string;
  date: string;
  status: "pending" | "confirmed" | "rejected";
  userEmail: string;
}

interface StoredWithdrawal {
  id: string;
  amount: number;
  walletAddress: string;
  walletType: string;
  date: string;
  status: "pending" | "processing" | "completed" | "rejected";
  userEmail: string;
}

// ── Helpers ──
function formatCurrency(amount: number) {
  return "R" + amount.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getStoredInvestments(): StoredInvestment[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("gb_investments") || "[]"); } catch { return []; }
}

function getStoredDeposits(): StoredDeposit[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("gb_deposits") || "[]"); } catch { return []; }
}

function getStoredWithdrawals(): StoredWithdrawal[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("gb_withdrawals") || "[]"); } catch { return []; }
}

function saveDeposits(deposits: StoredDeposit[]) {
  localStorage.setItem("gb_deposits", JSON.stringify(deposits));
}

function saveWithdrawals(withdrawals: StoredWithdrawal[]) {
  localStorage.setItem("gb_withdrawals", JSON.stringify(withdrawals));
}

// Production admin - no demo data seeding
// All data will come from real user activity and database

// ── Tab types ──
type AdminTab = "overview" | "clients" | "deposits" | "withdrawals" | "settings";

const sidebarItems: { key: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "clients", label: "Clients", icon: Users },
  { key: "deposits", label: "Deposits", icon: ArrowDownRight },
  { key: "withdrawals", label: "Withdrawals", icon: ArrowUpRight },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function AdminPage() {
  const { user, isLoading, isAdmin, getAllUsers, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientUser | null>(null);
  const [depositFilter, setDepositFilter] = useState<"all" | "pending" | "confirmed" | "rejected">("all");
  const [withdrawalFilter, setWithdrawalFilter] = useState<"all" | "pending" | "processing" | "completed" | "rejected">("all");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      window.location.href = "/";
    }
  }, [user, isLoading, isAdmin]);

  useEffect(() => {
    // Production admin - no demo data seeding
  }, []);

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  // ── Load all data ──
  const allUsers = getAllUsers().filter(u => u.role !== "admin");
  const allDeposits = getStoredDeposits();
  const allWithdrawals = getStoredWithdrawals();
  const allInvestments = getStoredInvestments();

  // Build client profiles
  const clients: ClientUser[] = allUsers.map(u => {
    const userDeposits = allDeposits.filter(d => d.userEmail === u.email);
    const userWithdrawals = allWithdrawals.filter(w => w.userEmail === u.email);
    const totalDeposited = userDeposits.filter(d => d.status === "confirmed").reduce((s, d) => s + d.amount, 0);
    const totalWithdrawn = userWithdrawals.filter(w => w.status === "completed").reduce((s, w) => s + w.amount, 0);
    return {
      email: u.email,
      name: u.name,
      joined: u.joined || new Date().toISOString(),
      role: u.role || "user",
      kycStatus: "pending",
      investments: allInvestments,
      deposits: userDeposits,
      withdrawals: userWithdrawals,
      totalInvested: totalDeposited,
      totalDeposited,
      totalWithdrawn,
    };
  });

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeposits = depositFilter === "all" ? allDeposits : allDeposits.filter(d => d.status === depositFilter);
  const filteredWithdrawals = withdrawalFilter === "all" ? allWithdrawals : allWithdrawals.filter(w => w.status === withdrawalFilter);

  // ── Stats ──
  const totalClientsCount = clients.length;
  const totalDepositsAmount = allDeposits.filter(d => d.status === "confirmed").reduce((s, d) => s + d.amount, 0);
  const totalWithdrawalsAmount = allWithdrawals.filter(w => w.status === "completed").reduce((s, w) => s + w.amount, 0);
  const pendingDeposits = allDeposits.filter(d => d.status === "pending").length;
  const pendingWithdrawals = allWithdrawals.filter(w => w.status === "pending" || w.status === "processing").length;
  const netBalance = totalDepositsAmount - totalWithdrawalsAmount;

  // ── Actions ──
  const updateDepositStatus = (id: string, status: StoredDeposit["status"]) => {
    const deposits = getStoredDeposits();
    const idx = deposits.findIndex(d => d.id === id);
    if (idx !== -1) {
      deposits[idx].status = status;
      saveDeposits(deposits);
      setRefreshKey(k => k + 1);
    }
  };

  const updateWithdrawalStatus = (id: string, status: StoredWithdrawal["status"]) => {
    const withdrawals = getStoredWithdrawals();
    const idx = withdrawals.findIndex(w => w.id === id);
    if (idx !== -1) {
      withdrawals[idx].status = status;
      saveWithdrawals(withdrawals);
      setRefreshKey(k => k + 1);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#060608] flex" key={refreshKey}>
      {/* Sidebar — Desktop */}
      <aside className="hidden md:flex flex-col w-[250px] bg-[#09090c] border-r border-white/[0.04] fixed top-0 left-0 h-screen z-40">
        <a href="/" className="flex items-center gap-3 px-5 h-[72px] border-b border-white/[0.04]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center">
            <Shield size={14} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-[12px] tracking-wide leading-tight">Goldbridge</span>
            <span className="text-red-400/70 text-[8px] uppercase tracking-[0.2em]">Admin Panel</span>
          </div>
        </a>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSelectedClient(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeTab === item.key
                  ? "bg-red-500/[0.08] text-red-400 border border-red-500/[0.12]"
                  : "text-[#555] hover:text-white hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              <item.icon size={15} />
              {item.label}
              {item.key === "deposits" && pendingDeposits > 0 && (
                <span className="ml-auto w-5 h-5 bg-amber-500/20 text-amber-400 rounded-full text-[9px] font-bold flex items-center justify-center">{pendingDeposits}</span>
              )}
              {item.key === "withdrawals" && pendingWithdrawals > 0 && (
                <span className="ml-auto w-5 h-5 bg-amber-500/20 text-amber-400 rounded-full text-[9px] font-bold flex items-center justify-center">{pendingWithdrawals}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/[0.04] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold uppercase">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.name}</p>
              <p className="text-red-400/60 text-[10px] truncate">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-[#555] hover:text-red-400 hover:bg-red-500/[0.04] rounded-lg transition-all text-xs">
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#09090c]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <Shield size={12} className="text-white" />
            </div>
            <span className="text-white font-semibold text-xs">Admin Panel</span>
          </div>
          <button onClick={handleLogout} className="text-[#555] hover:text-red-400 transition-colors p-1.5">
            <LogOut size={16} />
          </button>
        </div>
        <div className="flex border-t border-white/[0.03] overflow-x-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSelectedClient(null); }}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[9px] font-medium transition-colors min-w-[60px] relative ${
                activeTab === item.key ? "text-red-400" : "text-[#444]"
              }`}
            >
              <item.icon size={14} />
              {item.label}
              {item.key === "deposits" && pendingDeposits > 0 && (
                <span className="absolute top-1 right-1/4 w-3.5 h-3.5 bg-amber-500 rounded-full text-[7px] text-[#060608] font-bold flex items-center justify-center">{pendingDeposits}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-[250px] pt-[110px] md:pt-0">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-10">

          {/* Top Bar */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white text-xl md:text-2xl font-display font-semibold">
                {activeTab === "overview" && "Admin Overview"}
                {activeTab === "clients" && (selectedClient ? selectedClient.name : "Client Management")}
                {activeTab === "deposits" && "Deposit Management"}
                {activeTab === "withdrawals" && "Withdrawal Management"}
                {activeTab === "settings" && "Admin Settings"}
              </h1>
              <p className="text-[#444] text-xs mt-1">
                {selectedClient ? selectedClient.email : "Manage your platform operations"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRefreshKey(k => k + 1)}
                className="flex items-center gap-1.5 text-[11px] text-[#555] px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <RefreshCw size={12} />
                Refresh
              </button>
              <a href="/" className="flex items-center gap-1.5 text-[11px] text-[#555] px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <Home size={12} />
                Home
              </a>
            </div>
          </div>

          {/* ═══════════ OVERVIEW TAB ═══════════ */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Users size={14} className="text-blue-400" /></div>
                  </div>
                  <p className="text-white text-xl font-bold font-display">{totalClientsCount}</p>
                  <p className="text-[#444] text-[10px]">Total Clients</p>
                </div>
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><ArrowDownRight size={14} className="text-emerald-400" /></div>
                  </div>
                  <p className="text-emerald-400 text-xl font-bold font-display">{formatCurrency(totalDepositsAmount)}</p>
                  <p className="text-[#444] text-[10px]">Total Deposits</p>
                </div>
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><ArrowUpRight size={14} className="text-red-400" /></div>
                  </div>
                  <p className="text-red-400 text-xl font-bold font-display">{formatCurrency(totalWithdrawalsAmount)}</p>
                  <p className="text-[#444] text-[10px]">Total Withdrawals</p>
                </div>
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center"><DollarSign size={14} className="text-[#D4AF37]" /></div>
                  </div>
                  <p className="text-[#D4AF37] text-xl font-bold font-display">{formatCurrency(netBalance)}</p>
                  <p className="text-[#444] text-[10px]">Net Balance</p>
                </div>
              </div>

              {/* Pending Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0a0a0e] border border-amber-500/[0.08] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className="text-amber-400" />
                      <h3 className="text-white text-sm font-semibold">Pending Deposits</h3>
                    </div>
                    <span className="text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full">{pendingDeposits}</span>
                  </div>
                  {allDeposits.filter(d => d.status === "pending").slice(0, 3).map((dep) => (
                    <div key={dep.id} className="flex items-center justify-between py-2.5 border-b border-white/[0.03] last:border-0">
                      <div>
                        <p className="text-white text-xs font-medium">{dep.userEmail}</p>
                        <p className="text-[#444] text-[10px]">{dep.walletType} • {dep.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs font-semibold">{formatCurrency(dep.amount)}</span>
                        <button
                          onClick={() => updateDepositStatus(dep.id, "confirmed")}
                          className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
                        >
                          <Check size={12} className="text-emerald-400" />
                        </button>
                        <button
                          onClick={() => updateDepositStatus(dep.id, "rejected")}
                          className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                        >
                          <X size={12} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingDeposits === 0 && <p className="text-[#333] text-xs text-center py-4">No pending deposits</p>}
                  {pendingDeposits > 3 && (
                    <button onClick={() => setActiveTab("deposits")} className="text-amber-400 text-[10px] mt-2 hover:underline flex items-center gap-1">
                      View all {pendingDeposits} pending <ChevronRight size={10} />
                    </button>
                  )}
                </div>

                <div className="bg-[#0a0a0e] border border-amber-500/[0.08] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-amber-400" />
                      <h3 className="text-white text-sm font-semibold">Pending Withdrawals</h3>
                    </div>
                    <span className="text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full">{pendingWithdrawals}</span>
                  </div>
                  {allWithdrawals.filter(w => w.status === "pending" || w.status === "processing").slice(0, 3).map((wd) => (
                    <div key={wd.id} className="flex items-center justify-between py-2.5 border-b border-white/[0.03] last:border-0">
                      <div>
                        <p className="text-white text-xs font-medium">{wd.userEmail}</p>
                        <p className="text-[#444] text-[10px]">{wd.walletType} • {wd.walletAddress.slice(0, 12)}...</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs font-semibold">{formatCurrency(wd.amount)}</span>
                        <button
                          onClick={() => updateWithdrawalStatus(wd.id, "completed")}
                          className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
                        >
                          <Check size={12} className="text-emerald-400" />
                        </button>
                        <button
                          onClick={() => updateWithdrawalStatus(wd.id, "rejected")}
                          className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                        >
                          <X size={12} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingWithdrawals === 0 && <p className="text-[#333] text-xs text-center py-4">No pending withdrawals</p>}
                  {pendingWithdrawals > 3 && (
                    <button onClick={() => setActiveTab("withdrawals")} className="text-amber-400 text-[10px] mt-2 hover:underline flex items-center gap-1">
                      View all {pendingWithdrawals} pending <ChevronRight size={10} />
                    </button>
                  )}
                </div>
              </div>

              {/* Recent Clients */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-sm font-semibold">Recent Clients</h3>
                  <button onClick={() => setActiveTab("clients")} className="text-red-400 text-[10px] flex items-center gap-1 hover:underline">
                    View All <ChevronRight size={10} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[10px] text-[#444] uppercase tracking-wider border-b border-white/[0.04]">
                        <th className="text-left py-2.5 font-medium">Client</th>
                        <th className="text-left py-2.5 font-medium">Email</th>
                        <th className="text-right py-2.5 font-medium">Deposited</th>
                        <th className="text-right py-2.5 font-medium">Withdrawn</th>
                        <th className="text-right py-2.5 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.slice(0, 5).map((client) => (
                        <tr key={client.email} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center">
                                <span className="text-[#060608] text-[9px] font-bold uppercase">{client.name.charAt(0)}</span>
                              </div>
                              <span className="text-white text-xs font-medium">{client.name}</span>
                            </div>
                          </td>
                          <td className="text-[#555] text-xs py-3">{client.email}</td>
                          <td className="text-emerald-400 text-xs font-medium py-3 text-right">{formatCurrency(client.totalDeposited)}</td>
                          <td className="text-red-400 text-xs font-medium py-3 text-right">{formatCurrency(client.totalWithdrawn)}</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => { setSelectedClient(client); setActiveTab("clients"); }}
                              className="text-[10px] text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════ CLIENTS TAB ═══════════ */}
          {activeTab === "clients" && !selectedClient && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Search */}
              <div className="relative mb-5">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search clients by name or email..."
                  className="w-full bg-[#0a0a0e] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-red-500/30 transition-colors"
                />
              </div>

              {/* Client List */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl overflow-hidden">
                <div className="hidden md:grid grid-cols-6 gap-4 px-5 py-3 border-b border-white/[0.04] text-[10px] text-[#444] uppercase tracking-wider font-medium">
                  <span className="col-span-2">Client</span>
                  <span className="text-right">Total Deposited</span>
                  <span className="text-right">Total Withdrawn</span>
                  <span className="text-right">Deposits</span>
                  <span className="text-right">Actions</span>
                </div>
                {filteredClients.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={32} className="text-[#222] mx-auto mb-3" />
                    <p className="text-[#444] text-sm">No clients found</p>
                  </div>
                ) : filteredClients.map((client) => (
                  <div key={client.email} className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 px-4 md:px-5 py-4 border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#060608] text-[10px] font-bold uppercase">{client.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs font-medium truncate">{client.name}</p>
                        <p className="text-[#444] text-[10px] truncate">{client.email}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center justify-end">
                      <span className="text-emerald-400 text-xs font-medium">{formatCurrency(client.totalDeposited)}</span>
                    </div>
                    <div className="text-right flex items-center justify-end">
                      <span className="text-red-400 text-xs font-medium">{formatCurrency(client.totalWithdrawn)}</span>
                    </div>
                    <div className="text-right flex items-center justify-end">
                      <span className="text-[#888] text-xs">{client.deposits.length}</span>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="flex items-center gap-1.5 text-[10px] text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <Eye size={11} />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════ CLIENT DETAIL VIEW ═══════════ */}
          {activeTab === "clients" && selectedClient && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <button
                onClick={() => setSelectedClient(null)}
                className="flex items-center gap-2 text-[#555] hover:text-white text-xs mb-5 transition-colors"
              >
                <ArrowLeft size={14} />
                Back to All Clients
              </button>

              {/* Client Header */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#060608] text-lg font-bold uppercase">{selectedClient.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white text-lg font-semibold">{selectedClient.name}</h2>
                    <p className="text-[#555] text-xs flex items-center gap-1.5">
                      <Mail size={11} /> {selectedClient.email}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                      KYC: Pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <p className="text-[#444] text-[10px] mb-1">Total Deposited</p>
                  <p className="text-emerald-400 text-lg font-bold font-display">{formatCurrency(selectedClient.totalDeposited)}</p>
                </div>
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <p className="text-[#444] text-[10px] mb-1">Total Withdrawn</p>
                  <p className="text-red-400 text-lg font-bold font-display">{formatCurrency(selectedClient.totalWithdrawn)}</p>
                </div>
                <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-4">
                  <p className="text-[#444] text-[10px] mb-1">Net Balance</p>
                  <p className="text-[#D4AF37] text-lg font-bold font-display">{formatCurrency(selectedClient.totalDeposited - selectedClient.totalWithdrawn)}</p>
                </div>
              </div>

              {/* Deposits */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 mb-4">
                <h3 className="text-white text-sm font-semibold mb-4">Deposits</h3>
                {selectedClient.deposits.length === 0 ? (
                  <p className="text-[#333] text-xs text-center py-6">No deposits from this client</p>
                ) : (
                  <div className="space-y-2.5">
                    {selectedClient.deposits.map((dep) => (
                      <div key={dep.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            dep.status === "confirmed" ? "bg-emerald-500/10" :
                            dep.status === "pending" ? "bg-amber-500/10" :
                            "bg-red-500/10"
                          }`}>
                            {dep.status === "confirmed" ? <CheckCircle2 size={14} className="text-emerald-400" /> :
                             dep.status === "pending" ? <Clock size={14} className="text-amber-400" /> :
                             <Ban size={14} className="text-red-400" />}
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">{formatCurrency(dep.amount)}</p>
                            <p className="text-[#444] text-[10px]">{dep.walletType} • {dep.date}</p>
                            <p className="text-[#333] text-[9px] font-mono">{dep.txHash}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full capitalize ${
                            dep.status === "confirmed" ? "text-emerald-400 bg-emerald-500/10" :
                            dep.status === "pending" ? "text-amber-400 bg-amber-500/10" :
                            "text-red-400 bg-red-500/10"
                          }`}>{dep.status}</span>
                          {dep.status === "pending" && (
                            <>
                              <button onClick={() => updateDepositStatus(dep.id, "confirmed")} className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                                <Check size={12} className="text-emerald-400" />
                              </button>
                              <button onClick={() => updateDepositStatus(dep.id, "rejected")} className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                                <X size={12} className="text-red-400" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Withdrawals */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5">
                <h3 className="text-white text-sm font-semibold mb-4">Withdrawals</h3>
                {selectedClient.withdrawals.length === 0 ? (
                  <p className="text-[#333] text-xs text-center py-6">No withdrawals from this client</p>
                ) : (
                  <div className="space-y-2.5">
                    {selectedClient.withdrawals.map((wd) => (
                      <div key={wd.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            wd.status === "completed" ? "bg-emerald-500/10" :
                            wd.status === "pending" || wd.status === "processing" ? "bg-amber-500/10" :
                            "bg-red-500/10"
                          }`}>
                            {wd.status === "completed" ? <CheckCircle2 size={14} className="text-emerald-400" /> :
                             wd.status === "pending" || wd.status === "processing" ? <Clock size={14} className="text-amber-400" /> :
                             <Ban size={14} className="text-red-400" />}
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">{formatCurrency(wd.amount)}</p>
                            <p className="text-[#444] text-[10px]">{wd.walletType} • {wd.date}</p>
                            <p className="text-[#333] text-[9px] font-mono">{wd.walletAddress.slice(0, 20)}...</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full capitalize ${
                            wd.status === "completed" ? "text-emerald-400 bg-emerald-500/10" :
                            wd.status === "pending" || wd.status === "processing" ? "text-amber-400 bg-amber-500/10" :
                            "text-red-400 bg-red-500/10"
                          }`}>{wd.status}</span>
                          {(wd.status === "pending" || wd.status === "processing") && (
                            <>
                              <button onClick={() => updateWithdrawalStatus(wd.id, "completed")} className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                                <Check size={12} className="text-emerald-400" />
                              </button>
                              <button onClick={() => updateWithdrawalStatus(wd.id, "rejected")} className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                                <X size={12} className="text-red-400" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ═══════════ DEPOSITS TAB ═══════════ */}
          {activeTab === "deposits" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Filter */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  {(["all", "pending", "confirmed", "rejected"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setDepositFilter(f)}
                      className={`px-3 py-1.5 text-[10px] font-medium rounded-lg transition-all capitalize ${
                        depositFilter === f
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "text-[#555] hover:text-white border border-transparent"
                      }`}
                    >
                      {f}
                      {f === "pending" && pendingDeposits > 0 && (
                        <span className="ml-1.5 text-[8px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">{pendingDeposits}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl overflow-hidden">
                <div className="hidden md:grid grid-cols-7 gap-4 px-5 py-3 border-b border-white/[0.04] text-[10px] text-[#444] uppercase tracking-wider font-medium">
                  <span className="col-span-2">Client</span>
                  <span>Amount</span>
                  <span>Wallet</span>
                  <span>TX Hash</span>
                  <span>Status</span>
                  <span className="text-right">Actions</span>
                </div>
                {filteredDeposits.length === 0 ? (
                  <div className="text-center py-12">
                    <ArrowDownRight size={32} className="text-[#222] mx-auto mb-3" />
                    <p className="text-[#444] text-sm">No deposits found</p>
                  </div>
                ) : filteredDeposits.map((dep) => (
                  <div key={dep.id} className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 px-4 md:px-5 py-4 border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                    <div className="col-span-2">
                      <p className="text-white text-xs font-medium">{dep.userEmail}</p>
                      <p className="text-[#444] text-[10px]">{dep.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white text-xs font-semibold">{formatCurrency(dep.amount)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#888] text-xs">{dep.walletType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#555] text-[10px] font-mono truncate">{dep.txHash}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full capitalize ${
                        dep.status === "confirmed" ? "text-emerald-400 bg-emerald-500/10" :
                        dep.status === "pending" ? "text-amber-400 bg-amber-500/10" :
                        "text-red-400 bg-red-500/10"
                      }`}>{dep.status}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      {dep.status === "pending" && (
                        <>
                          <button onClick={() => updateDepositStatus(dep.id, "confirmed")} className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors" title="Approve">
                            <Check size={12} className="text-emerald-400" />
                          </button>
                          <button onClick={() => updateDepositStatus(dep.id, "rejected")} className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors" title="Reject">
                            <X size={12} className="text-red-400" />
                          </button>
                        </>
                      )}
                      {dep.status !== "pending" && (
                        <span className="text-[#333] text-[10px]">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════ WITHDRAWALS TAB ═══════════ */}
          {activeTab === "withdrawals" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Filter */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04] overflow-x-auto">
                  {(["all", "pending", "processing", "completed", "rejected"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setWithdrawalFilter(f)}
                      className={`px-3 py-1.5 text-[10px] font-medium rounded-lg transition-all capitalize whitespace-nowrap ${
                        withdrawalFilter === f
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "text-[#555] hover:text-white border border-transparent"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl overflow-hidden">
                <div className="hidden md:grid grid-cols-7 gap-4 px-5 py-3 border-b border-white/[0.04] text-[10px] text-[#444] uppercase tracking-wider font-medium">
                  <span className="col-span-2">Client</span>
                  <span>Amount</span>
                  <span>Wallet Type</span>
                  <span>Wallet Address</span>
                  <span>Status</span>
                  <span className="text-right">Actions</span>
                </div>
                {filteredWithdrawals.length === 0 ? (
                  <div className="text-center py-12">
                    <ArrowUpRight size={32} className="text-[#222] mx-auto mb-3" />
                    <p className="text-[#444] text-sm">No withdrawals found</p>
                  </div>
                ) : filteredWithdrawals.map((wd) => (
                  <div key={wd.id} className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 px-4 md:px-5 py-4 border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                    <div className="col-span-2">
                      <p className="text-white text-xs font-medium">{wd.userEmail}</p>
                      <p className="text-[#444] text-[10px]">{wd.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white text-xs font-semibold">{formatCurrency(wd.amount)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#888] text-xs">{wd.walletType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#555] text-[10px] font-mono truncate" title={wd.walletAddress}>{wd.walletAddress.slice(0, 16)}...</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full capitalize ${
                        wd.status === "completed" ? "text-emerald-400 bg-emerald-500/10" :
                        wd.status === "pending" || wd.status === "processing" ? "text-amber-400 bg-amber-500/10" :
                        "text-red-400 bg-red-500/10"
                      }`}>{wd.status}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      {(wd.status === "pending" || wd.status === "processing") && (
                        <>
                          {wd.status === "pending" && (
                            <button onClick={() => updateWithdrawalStatus(wd.id, "processing")} className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors" title="Mark Processing">
                              <RefreshCw size={12} className="text-blue-400" />
                            </button>
                          )}
                          <button onClick={() => updateWithdrawalStatus(wd.id, "completed")} className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors" title="Mark Completed">
                            <Check size={12} className="text-emerald-400" />
                          </button>
                          <button onClick={() => updateWithdrawalStatus(wd.id, "rejected")} className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors" title="Reject">
                            <X size={12} className="text-red-400" />
                          </button>
                        </>
                      )}
                      {wd.status !== "pending" && wd.status !== "processing" && (
                        <span className="text-[#333] text-[10px]">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════ SETTINGS TAB ═══════════ */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
              {/* Crypto Wallet Addresses */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6">
                <h3 className="text-white text-sm font-semibold mb-4">Crypto Wallet Addresses (Displayed to Users)</h3>
                <p className="text-[#555] text-xs mb-4">These are the wallet addresses shown to users when they make a deposit.</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Bitcoin (BTC)</label>
                    <input
                      type="text"
                      defaultValue="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Ethereum (ETH)</label>
                    <input
                      type="text"
                      defaultValue="0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">USDT (TRC20)</label>
                    <input
                      type="text"
                      defaultValue="TQn9Y2khEsLJW1ChNWShFYKwxhA5sR7CiB"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500/30 transition-colors"
                    />
                  </div>
                </div>
                <button className="mt-4 bg-red-500/10 text-red-400 text-[11px] font-semibold px-5 py-2 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20">
                  Save Wallet Addresses
                </button>
              </div>

              {/* Admin Info */}
              <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6">
                <h3 className="text-white text-sm font-semibold mb-4">Admin Account</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <UserCheck size={15} className="text-red-400" />
                      <div>
                        <p className="text-white text-xs font-medium">{user.name}</p>
                        <p className="text-[#444] text-[10px]">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-red-400 text-[10px] bg-red-500/10 px-2.5 py-1 rounded-full font-medium">Admin</span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-[#0a0a0e] border border-red-500/[0.08] rounded-xl p-5 md:p-6">
                <h3 className="text-red-400 text-sm font-semibold mb-2">Danger Zone</h3>
                <p className="text-[#444] text-xs mb-4">Administrative actions that cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (confirm("Are you sure? This will clear ALL demo data.")) {
                        localStorage.removeItem("gb_admin_seeded");
                        localStorage.removeItem("gb_deposits");
                        localStorage.removeItem("gb_withdrawals");
                        localStorage.removeItem("gb_investments");
                        setRefreshKey(k => k + 1);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/[0.06] transition-colors"
                  >
                    <Ban size={13} />
                    Reset Demo Data
                  </button>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/[0.06] transition-colors">
                    <LogOut size={13} />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
