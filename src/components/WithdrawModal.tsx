"use client";

import { useState } from "react";
import { X, ArrowRight, Wallet, Building2, AlertCircle, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export default function WithdrawModal({ isOpen, onClose, availableBalance }: WithdrawModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<"amount" | "details" | "confirm" | "success">("amount");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const amountNum = parseFloat(amount) || 0;
  const minWithdraw = 500;
  const maxWithdraw = user?.kycStatus === "verified" ? availableBalance : Math.min(availableBalance, 10000);

  const reset = () => {
    setStep("amount");
    setAmount("");
    setBankName("");
    setAccountNumber("");
    setAccountHolder("");
    setBranchCode("");
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validateAmount = () => {
    if (amountNum < minWithdraw) {
      setError(`Minimum withdrawal is R${minWithdraw.toLocaleString()}`);
      return false;
    }
    if (amountNum > maxWithdraw) {
      setError(`Maximum withdrawal is R${maxWithdraw.toLocaleString()}`);
      return false;
    }
    setError("");
    return true;
  };

  const handleContinue = () => {
    if (validateAmount()) {
      setStep("details");
    }
  };

  const handleSubmit = async () => {
    if (!bankName || !accountNumber || !accountHolder) {
      setError("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStep("success");
    setIsSubmitting(false);
  };

  const quickAmounts = [1000, 2500, 5000, 10000].filter(a => a <= maxWithdraw);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            className="relative w-full max-w-[450px] max-h-[90vh] overflow-y-auto bg-[#0a0a0e] border border-white/[0.06] rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#444] hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="p-6 md:p-8">
              {/* Amount Step */}
              {step === "amount" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Wallet size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-white text-lg font-display font-semibold">Withdraw Funds</h2>
                      <p className="text-[#555] text-xs">Available: R{availableBalance.toLocaleString()}</p>
                    </div>
                  </div>

                  {user?.kycStatus !== "verified" && (
                    <div className="p-3 bg-amber-500/[0.05] border border-amber-500/[0.15] rounded-xl mb-5">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-[#888] text-[10px] leading-relaxed">
                          Complete KYC verification to unlock unlimited withdrawals. 
                          Current limit: R10,000 per withdrawal.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mb-5">
                    <label className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-2 block">
                      Amount to Withdraw
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-lg">R</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value); setError(""); }}
                        placeholder="0.00"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-4 text-white text-2xl font-bold font-display outline-none focus:border-emerald-500/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mb-5">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                          amountNum === amt
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-white/[0.02] border-white/[0.06] text-[#666] hover:border-white/[0.1]"
                        }`}
                      >
                        R{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {error && (
                    <p className="text-red-400/80 text-xs text-center mb-4">{error}</p>
                  )}

                  <button
                    onClick={handleContinue}
                    disabled={!amount || amountNum <= 0}
                    className="w-full btn-gold py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-30"
                  >
                    Continue
                    <ArrowRight size={14} />
                  </button>

                  <p className="text-[#333] text-[10px] text-center mt-4">
                    Min: R{minWithdraw.toLocaleString()} · Max: R{maxWithdraw.toLocaleString()}
                  </p>
                </motion.div>
              )}

              {/* Bank Details Step */}
              {step === "details" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Building2 size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-white text-lg font-display font-semibold">Bank Details</h2>
                      <p className="text-[#555] text-xs">Enter your bank account information</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <label className="text-[#555] text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
                        Bank Name *
                      </label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]/30 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0a0a0e]">Select bank</option>
                        <option value="fnb" className="bg-[#0a0a0e]">FNB (First National Bank)</option>
                        <option value="standard" className="bg-[#0a0a0e]">Standard Bank</option>
                        <option value="absa" className="bg-[#0a0a0e]">ABSA</option>
                        <option value="nedbank" className="bg-[#0a0a0e]">Nedbank</option>
                        <option value="capitec" className="bg-[#0a0a0e]">Capitec</option>
                        <option value="investec" className="bg-[#0a0a0e]">Investec</option>
                        <option value="african" className="bg-[#0a0a0e]">African Bank</option>
                        <option value="tymebank" className="bg-[#0a0a0e]">TymeBank</option>
                        <option value="discovery" className="bg-[#0a0a0e]">Discovery Bank</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[#555] text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[#555] text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="1234567890"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[#555] text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
                        Branch Code (Optional)
                      </label>
                      <input
                        type="text"
                        value={branchCode}
                        onChange={(e) => setBranchCode(e.target.value)}
                        placeholder="250655"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]/30 transition-colors"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400/80 text-xs text-center mb-4">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("amount")}
                      className="flex-1 py-2.5 text-sm text-[#666] border border-white/[0.06] rounded-xl hover:bg-white/[0.02]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("confirm")}
                      disabled={!bankName || !accountNumber || !accountHolder}
                      className="flex-1 btn-gold py-2.5 text-sm disabled:opacity-30"
                    >
                      Review
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Confirm Step */}
              {step === "confirm" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-white text-lg font-display font-semibold mb-2">Confirm Withdrawal</h2>
                  <p className="text-[#555] text-xs mb-5">Please review the details below</p>

                  <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-4 mb-5">
                    <div className="text-center mb-4 pb-4 border-b border-white/[0.06]">
                      <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Withdrawal Amount</p>
                      <p className="text-emerald-400 text-3xl font-bold font-display">R{amountNum.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#555]">Bank</span>
                        <span className="text-white capitalize">{bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#555]">Account Holder</span>
                        <span className="text-white">{accountHolder}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#555]">Account Number</span>
                        <span className="text-white">****{accountNumber.slice(-4)}</span>
                      </div>
                      {branchCode && (
                        <div className="flex justify-between">
                          <span className="text-[#555]">Branch Code</span>
                          <span className="text-white">{branchCode}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                        <span className="text-[#555]">Processing Time</span>
                        <span className="text-[#D4AF37]">1-2 Business Days</span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400/80 text-xs text-center mb-4">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("details")}
                      className="flex-1 py-2.5 text-sm text-[#666] border border-white/[0.06] rounded-xl hover:bg-white/[0.02]"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Withdrawal
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Success Step */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h2 className="text-white text-xl font-display font-semibold mb-2">
                    Withdrawal Requested!
                  </h2>
                  <p className="text-[#555] text-sm mb-6 leading-relaxed">
                    Your withdrawal of <span className="text-emerald-400 font-semibold">R{amountNum.toLocaleString()}</span> has been submitted. 
                    Funds will arrive in 1-2 business days.
                  </p>

                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] mb-6 text-left">
                    <p className="text-[#888] text-xs mb-2">
                      <span className="text-[#D4AF37]">Reference:</span> WD-{Date.now().toString(36).toUpperCase()}
                    </p>
                    <p className="text-[#888] text-xs">
                      <span className="text-[#D4AF37]">Status:</span> Processing
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full btn-gold py-3 text-sm font-semibold"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
