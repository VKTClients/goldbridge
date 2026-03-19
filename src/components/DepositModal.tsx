"use client";

import { useState } from "react";
import { X, Copy, Check, Wallet, AlertCircle, ArrowRight, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LUNO_DEPOSIT_ADDRESS = "0x2E6e0c9712a2bEa561A561D579E27ADa74C26887";

const DEPOSIT_WALLET = {
  id: "usdt",
  name: "USDT (ERC-20)",
  symbol: "USDT",
  address: LUNO_DEPOSIT_ADDRESS,
  network: "ERC-20 Network",
  color: "text-emerald-400",
  bgColor: "bg-emerald-500/10",
  borderColor: "border-emerald-500/20",
  icon: "₮",
};

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { user } = useAuth();
  const wallet = DEPOSIT_WALLET;
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [step, setStep] = useState<"select" | "confirm">("select");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setStep("select");
    setCopiedAddress(false);
    setAmount("");
    setTxHash("");
    setIsSubmitting(false);
    setSubmitted(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmitDeposit = async () => {
    if (!amount || !user) return;
    setIsSubmitting(true);

    // Store deposit record in localStorage
    const existingDeposits = JSON.parse(localStorage.getItem("gb_deposits") || "[]");
    const newDeposit = {
      id: `dep-${Date.now()}`,
      amount: parseFloat(amount),
      currency: "ZAR",
      walletType: wallet.symbol,
      txHash: txHash || "Pending verification",
      proofImage: "",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      userEmail: user.email,
    };
    existingDeposits.push(newDeposit);
    localStorage.setItem("gb_deposits", JSON.stringify(existingDeposits));

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

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
            className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-[#0a0a0e] border border-white/[0.06] rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#444] hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="p-6 md:p-8">
              {/* Success State */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h2 className="text-white text-lg font-display font-semibold mb-2">
                    Deposit Submitted!
                  </h2>
                  <p className="text-[#555] text-sm mb-4">
                    Your deposit of R{parseFloat(amount).toLocaleString()} via {wallet.name} has been submitted for verification.
                  </p>
                  <div className="bg-amber-500/[0.05] border border-amber-500/[0.15] rounded-xl p-3 mb-5">
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[#888] text-[11px] leading-relaxed">
                        Deposits are usually confirmed within 1-24 hours. You will be notified once your deposit is verified by our admin team.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="btn-gold w-full py-3 text-sm font-semibold justify-center"
                  >
                    Done
                  </button>
                </motion.div>
              ) : step === "select" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                      <Wallet size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h2 className="text-white text-lg font-display font-semibold">
                        Deposit Funds
                      </h2>
                      <p className="text-[#555] text-xs">
                        Send USDT via ERC-20 network
                      </p>
                    </div>
                  </div>

                  {/* Info Banner */}
                  <div className="p-3 bg-[#D4AF37]/[0.04] border border-[#D4AF37]/[0.12] rounded-xl mb-5">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <p className="text-[#888] text-[10px] leading-relaxed">
                        Send <span className="text-emerald-400 font-semibold">USDT (ERC-20)</span> to the wallet address below. After sending, enter the amount and submit. Our team will verify and credit your account.
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Payment Method</h4>
                    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${wallet.bgColor} ${wallet.borderColor} ${wallet.color}`}>
                      <span className="text-2xl font-bold">{wallet.icon}</span>
                      <span className="text-sm font-semibold">{wallet.name}</span>
                      <span className="text-xs opacity-80">{wallet.network}</span>
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="mb-5">
                    <label className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-2 block">
                      {wallet.name} Wallet Address
                    </label>
                    <div className="relative">
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 pr-12">
                        <p className="text-white text-[11px] font-mono break-all leading-relaxed">
                          {wallet.address}
                        </p>
                      </div>
                      <button
                        onClick={copyAddress}
                        className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          copiedAddress
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-white/[0.05] text-[#555] hover:text-white hover:bg-white/[0.1]"
                        }`}
                      >
                        {copiedAddress ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>

                    {/* Luno Deposit Button */}
                    <a
                      href={`https://www.luno.com/wallet/send?to=${LUNO_DEPOSIT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        navigator.clipboard.writeText(LUNO_DEPOSIT_ADDRESS);
                        setCopiedAddress(true);
                        setTimeout(() => setCopiedAddress(false), 2000);
                      }}
                      className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 px-4 bg-[#0055FF]/10 border border-[#0055FF]/30 rounded-xl text-[#4A90FF] text-xs font-medium hover:bg-[#0055FF]/20 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Deposit via Luno (Address copied)
                    </a>
                    <p className="text-[#444] text-[9px] mt-1.5">
                      Only send <span className={wallet.color}>{wallet.symbol}</span> on the <span className="text-white">{wallet.network}</span>. Sending other assets may result in permanent loss.
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="mb-5">
                    <label className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-2 block">
                      Amount (ZAR Equivalent)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold text-lg">
                        R
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3.5 text-white text-xl font-bold font-display outline-none focus:border-[#D4AF37]/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Quick Amounts */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {[1000, 5000, 10000, 25000, 50000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(String(v))}
                        className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#666] text-[10px] font-medium hover:border-[#D4AF37]/20 hover:text-[#D4AF37] transition-all"
                      >
                        R{v.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (parseFloat(amount) >= 500) setStep("confirm");
                    }}
                    disabled={!amount || parseFloat(amount) < 500}
                    className="btn-gold w-full py-3.5 text-sm font-semibold gap-2 justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight size={14} />
                  </button>
                  {amount && parseFloat(amount) < 500 && (
                    <p className="text-red-400 text-[10px] mt-2 text-center">Minimum deposit is R500</p>
                  )}
                </motion.div>
              ) : (
                /* Confirm Step */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-full ${wallet.bgColor} border ${wallet.borderColor} flex items-center justify-center`}>
                      <span className={`text-lg font-bold ${wallet.color}`}>{wallet.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-white text-lg font-display font-semibold">
                        Confirm Deposit
                      </h2>
                      <p className="text-[#555] text-xs">
                        Verify your {wallet.name} deposit
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 mb-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#555] text-xs">Amount</span>
                      <span className="text-white text-sm font-semibold">R{parseFloat(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#555] text-xs">Cryptocurrency</span>
                      <span className={`text-sm font-semibold ${wallet.color}`}>{wallet.name} ({wallet.symbol})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#555] text-xs">Network</span>
                      <span className="text-white text-sm">{wallet.network}</span>
                    </div>
                  </div>

                  {/* Transaction Hash (optional) */}
                  <div className="mb-5">
                    <label className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-2 block">
                      Transaction Hash (Optional)
                    </label>
                    <input
                      type="text"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="Paste your transaction hash here..."
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[13px] text-white font-mono placeholder:text-[#333] outline-none focus:border-[#D4AF37]/30 transition-colors"
                    />
                    <p className="text-[#444] text-[9px] mt-1.5">
                      Providing a TX hash helps speed up verification
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("select")}
                      className="flex-1 py-3 text-sm font-medium text-[#888] border border-white/[0.06] rounded-xl hover:bg-white/[0.03] transition-colors text-center"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmitDeposit}
                      disabled={isSubmitting}
                      className="btn-gold flex-1 py-3 text-sm font-semibold gap-2 justify-center disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#060608]/30 border-t-[#060608] rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Deposit
                          <Check size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
