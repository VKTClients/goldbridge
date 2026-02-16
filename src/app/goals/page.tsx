"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, Plus, Target, Shield, TrendingUp, Trash2,
  Edit3, Check, X, DollarSign, Home as HomeIcon, Briefcase, GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const goalIcons = [
  { key: "shield", icon: Shield, label: "Emergency" },
  { key: "home", icon: HomeIcon, label: "Property" },
  { key: "trending", icon: TrendingUp, label: "Retirement" },
  { key: "briefcase", icon: Briefcase, label: "Business" },
  { key: "grad", icon: GraduationCap, label: "Education" },
  { key: "target", icon: Target, label: "Custom" },
];

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  iconKey: string;
  createdAt: string;
}

const defaultGoals: Goal[] = [
  { id: "1", name: "Emergency Fund", target: 100000, current: 72500, iconKey: "shield", createdAt: "2025-11-01" },
  { id: "2", name: "Property Deposit", target: 500000, current: 180000, iconKey: "home", createdAt: "2025-10-15" },
  { id: "3", name: "Retirement Fund", target: 2000000, current: 350000, iconKey: "trending", createdAt: "2025-09-01" },
];

function formatCurrency(amount: number) {
  return "R" + amount.toLocaleString("en-ZA");
}

export default function GoalsPage() {
  const { user, isLoading } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newCurrent, setNewCurrent] = useState("");
  const [newIcon, setNewIcon] = useState("target");

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/";
      return;
    }
    const stored = localStorage.getItem("gb_goals");
    if (stored) {
      setGoals(JSON.parse(stored));
    } else {
      setGoals(defaultGoals);
      localStorage.setItem("gb_goals", JSON.stringify(defaultGoals));
    }
  }, [user, isLoading]);

  const saveGoals = (updated: Goal[]) => {
    setGoals(updated);
    localStorage.setItem("gb_goals", JSON.stringify(updated));
  };

  const addGoal = () => {
    if (!newName || !newTarget) return;
    const goal: Goal = {
      id: Date.now().toString(),
      name: newName,
      target: Number(newTarget),
      current: Number(newCurrent) || 0,
      iconKey: newIcon,
      createdAt: new Date().toISOString().split("T")[0],
    };
    saveGoals([...goals, goal]);
    resetForm();
  };

  const deleteGoal = (id: string) => {
    saveGoals(goals.filter((g) => g.id !== id));
  };

  const updateGoalCurrent = (id: string, value: number) => {
    saveGoals(goals.map((g) => (g.id === id ? { ...g, current: value } : g)));
    setEditId(null);
  };

  const resetForm = () => {
    setShowAdd(false);
    setNewName("");
    setNewTarget("");
    setNewCurrent("");
    setNewIcon("target");
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalCurrent = goals.reduce((s, g) => s + g.current, 0);
  const overallPct = totalTarget > 0 ? Math.min((totalCurrent / totalTarget) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-[#060608]">
      {/* Header */}
      <div className="bg-[#09090c]/95 backdrop-blur-xl border-b border-white/[0.04] sticky top-0 z-40">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="text-[#555] hover:text-white transition-colors p-1.5">
              <ArrowLeft size={18} />
            </a>
            <h1 className="text-white text-base md:text-lg font-display font-semibold">Financial Goals</h1>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="btn-gold text-[11px] font-semibold px-4 py-2 gap-1.5"
          >
            <Plus size={13} />
            New Goal
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Overall Progress */}
        <div className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[#555] text-[10px] uppercase tracking-wider">Overall Progress</p>
              <p className="text-white text-2xl font-bold font-display mt-1">{formatCurrency(totalCurrent)}</p>
            </div>
            <div className="text-right">
              <p className="text-[#555] text-[10px] uppercase tracking-wider">Total Target</p>
              <p className="text-[#888] text-lg font-semibold font-display mt-1">{formatCurrency(totalTarget)}</p>
            </div>
          </div>
          <div className="w-full h-3 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37]/60 to-[#D4AF37] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-[#555] text-xs mt-2">{overallPct.toFixed(1)}% of total goals reached</p>
        </div>

        {/* Add Goal Form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              className="bg-[#0a0a0e] border border-[#D4AF37]/[0.12] rounded-xl p-5 md:p-6 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-sm font-semibold">Create New Goal</h3>
                <button onClick={resetForm} className="text-[#555] hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Icon Selection */}
              <div className="flex gap-2 mb-4">
                {goalIcons.map((gi) => (
                  <button
                    key={gi.key}
                    onClick={() => setNewIcon(gi.key)}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all ${
                      newIcon === gi.key
                        ? "bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]"
                        : "bg-white/[0.02] border-white/[0.06] text-[#555] hover:border-white/[0.1]"
                    }`}
                  >
                    <gi.icon size={16} />
                    <span className="text-[8px] font-medium">{gi.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Goal Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. New Car"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Target Amount (R)</label>
                  <input
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    placeholder="500000"
                    inputMode="numeric"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#444] text-[10px] uppercase tracking-wider mb-1.5 block">Current Saved (R)</label>
                  <input
                    type="number"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.value)}
                    placeholder="0"
                    inputMode="numeric"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                  />
                </div>
              </div>

              <button onClick={addGoal} className="btn-gold text-[11px] font-semibold px-6 py-2.5 gap-1.5">
                <Check size={13} />
                Create Goal
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const pct = Math.min((goal.current / goal.target) * 100, 100);
            const iconDef = goalIcons.find((gi) => gi.key === goal.iconKey) || goalIcons[5];
            const IconComp = iconDef.icon;

            return (
              <motion.div
                key={goal.id}
                layout
                className="bg-[#0a0a0e] border border-white/[0.04] rounded-xl p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/[0.1] flex items-center justify-center">
                      <IconComp size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-semibold">{goal.name}</h3>
                      <p className="text-[#444] text-[10px]">Created {goal.createdAt}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-[#333] hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-end justify-between mb-2">
                  {editId === goal.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[#D4AF37] text-sm font-bold">R</span>
                      <input
                        type="number"
                        defaultValue={goal.current}
                        inputMode="numeric"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") updateGoalCurrent(goal.id, Number((e.target as HTMLInputElement).value));
                          if (e.key === "Escape") setEditId(null);
                        }}
                        className="w-28 bg-white/[0.03] border border-[#D4AF37]/30 rounded-lg px-2 py-1 text-[16px] sm:text-sm text-white focus:outline-none"
                      />
                      <button
                        onClick={() => setEditId(null)}
                        className="text-[#555] hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-[#D4AF37] text-lg font-bold font-display">{formatCurrency(goal.current)}</span>
                      <button
                        onClick={() => setEditId(goal.id)}
                        className="text-[#333] hover:text-[#D4AF37] transition-colors"
                      >
                        <Edit3 size={12} />
                      </button>
                    </div>
                  )}
                  <span className="text-[#555] text-xs">{formatCurrency(goal.target)}</span>
                </div>

                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#D4AF37]/60 to-[#D4AF37] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#555] text-[10px]">{pct.toFixed(1)}% reached</span>
                  <span className="text-[#444] text-[10px]">{formatCurrency(goal.target - goal.current)} remaining</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-16">
            <Target size={40} className="text-[#222] mx-auto mb-4" />
            <p className="text-[#444] text-sm mb-2">No financial goals yet</p>
            <p className="text-[#333] text-xs mb-6">Set goals to track your progress towards financial milestones</p>
            <button onClick={() => setShowAdd(true)} className="btn-gold text-[11px] font-semibold px-6 py-2.5 gap-1.5">
              <Plus size={13} />
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
