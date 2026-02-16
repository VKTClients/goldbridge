"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff, ArrowRight, User, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  // Load referral code from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("gb_referral_code");
    if (stored) {
      setReferralCode(stored);
      // Clear it after loading
      localStorage.removeItem("gb_referral_code");
    }
  }, []);

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setShowPassword(false);
    // Don't reset referral code - keep it for the session
  };

  const switchMode = (m: "login" | "signup") => {
    setMode(m);
    reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let success: boolean;
      if (mode === "login") {
        success = await login(email, password);
        if (!success) setError("Invalid credentials. Please try again.");
      } else {
        if (!name.trim()) {
          setError("Please enter your name.");
          setLoading(false);
          return;
        }
        success = await signup(name, email, password);
        if (!success) setError("Please fill in all fields (password min 4 chars).");
      }

      if (success) {
        reset();
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => { setShowAuthModal(false); reset(); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-[420px] max-h-[90vh] sm:max-h-none overflow-y-auto bg-[#0a0a0e] border border-white/[0.06] rounded-2xl sm:rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Close button */}
            <button
              onClick={() => { setShowAuthModal(false); reset(); }}
              className="absolute top-4 right-4 text-[#444] hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="p-5 sm:p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C9A84C] to-[#B8942E] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/10">
                  <span className="text-[#060608] font-bold text-sm">G</span>
                </div>
                <h2 className="text-white text-xl font-display font-semibold mb-1">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-[#555] text-xs">
                  {mode === "login"
                    ? "Sign in to access your portfolio"
                    : "Start your investment journey"}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.04] mb-6">
                <button
                  onClick={() => switchMode("login")}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                    mode === "login"
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-[#555] hover:text-white border border-transparent"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => switchMode("signup")}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                    mode === "signup"
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-[#555] hover:text-white border border-transparent"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === "signup" && (
                  <>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-9 pr-4 py-3 text-[16px] sm:text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                      />
                    </div>
                    
                    {referralCode && (
                      <div className="bg-[#D4AF37]/[0.05] border border-[#D4AF37]/[0.15] rounded-xl p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                            <span className="text-[#D4AF37] text-[10px] font-bold">✓</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#D4AF37] text-xs font-medium">Referral Code Applied</p>
                            <p className="text-[#555] text-[10px]">{referralCode}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    inputMode="email"
                    autoComplete="email"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-9 pr-4 py-3 text-[16px] sm:text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={4}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-9 pr-10 py-3 text-[16px] sm:text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] transition-colors"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {error && (
                  <p className="text-red-400/80 text-xs text-center py-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-3 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-[#060608]/30 border-t-[#060608] rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === "login" ? "Sign In" : "Create Account"}
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="text-[#333] text-[10px] text-center mt-5 leading-relaxed">
                {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>

              <p className="text-[#222] text-[9px] text-center mt-3">
                Test mode — any email & password (min 4 chars) works
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
