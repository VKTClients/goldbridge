"use client";

import { useState } from "react";
import { X, ArrowRight, Wallet, AlertCircle, Check, Loader2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

const WITHDRAW_WALLET_TYPE = {
  id: "usdt",
  name: "USDT (ERC-20)",
  symbol: "USDT",
  color: "text-emerald-400",
  bgColor: "bg-emerald-500/10",
  borderColor: "border-emerald-500/20",
  icon: "₮",
  placeholder: "0x742d35Cc6634C0532925a3b...",
};

export default function WithdrawModal({ isOpen, onClose, availableBalance }: WithdrawModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<"amount" | "wallet" | "confirm" | "success">("amount");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const amountNum = parseFloat(amount) || 0;
  const minWithdraw = 500;
  const maxWithdraw = user?.kycStatus === "verified" ? availableBalance : Math.min(availableBalance, 10000);
  const wallet = WITHDRAW_WALLET_TYPE;

  const reset = () => {
    setStep("amount");
    setAmount("");
    setWalletAddress("");
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
      setStep("wallet");
    }
  };

  const isValidERC20Address = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async () => {
    if (!walletAddress) {
      setError("Please enter your wallet address");
      return;
    }
    if (!isValidERC20Address(walletAddress)) {
      setError("Invalid ERC-20 address. Must start with 0x and be 42 characters.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    // Store withdrawal record in localStorage
    const existingWithdrawals = JSON.parse(localStorage.getItem("gb_withdrawals") || "[]");
    const newWithdrawal = {
      id: `wd-${Date.now()}`,
      amount: amountNum,
      walletAddress,
      walletType: wallet.symbol,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      userEmail: user?.email || "",
    };
    existingWithdrawals.push(newWithdrawal);
    localStorage.setItem("gb_withdrawals", JSON.stringify(existingWithdrawals));
    
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

              {/* Crypto Wallet Step */}
              {step === "wallet" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Wallet size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-white text-lg font-display font-semibold">Your Crypto Wallet</h2>
                      <p className="text-[#555] text-xs">Enter the wallet address to receive funds</p>
                    </div>
                  </div>

                  {/* ERC-20 Badge */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-500/[0.04] border border-emerald-500/[0.12] rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <span className="text-emerald-400 text-sm font-bold">₮</span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">USDT — Tether</p>
                      <p className="text-emerald-400 text-[10px] font-medium">Withdrawals via ERC-20 Network Only</p>
                    </div>
                  </div>

                  {/* Wallet Address Input */}
                  <div className="mb-5">
                    <label className="text-[#555] text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
                      Your USDT (ERC-20) Wallet Address *
                    </label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => { setWalletAddress(e.target.value); setError(""); }}
                      placeholder={wallet.placeholder}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm font-mono outline-none focus:border-emerald-500/30 transition-colors"
                    />
                    <p className="text-[#444] text-[9px] mt-1.5">
                      Enter a valid <span className="text-emerald-400">ERC-20</span> wallet address. Funds will be sent as <span className="text-white">USDT</span> on the Ethereum network. Using an incorrect address may result in <span className="text-red-400">permanent loss</span>.
                    </p>
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
                      onClick={() => {
                        if (!walletAddress) {
                          setError("Please enter your wallet address");
                          return;
                        }
                        if (!isValidERC20Address(walletAddress)) {
                          setError("Invalid ERC-20 address. Must start with 0x and be 42 characters.");
                          return;
                        }
                        setError("");
                        setStep("confirm");
                      }}
                      disabled={!walletAddress}
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
                        <span className="text-[#555]">Cryptocurrency</span>
                        <span className={`font-semibold ${wallet.color}`}>{wallet.name} ({wallet.symbol})</span>
                      </div>
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-[#555] flex-shrink-0">Wallet Address</span>
                        <span className="text-white font-mono text-[11px] text-right break-all">{walletAddress}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                        <span className="text-[#555]">Processing Time</span>
                        <span className="text-[#D4AF37]">1-24 Hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/[0.04] border border-amber-500/[0.12] rounded-xl mb-5">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[#777] text-[10px] leading-relaxed">
                        Please double-check the wallet address. Crypto transactions are irreversible.
                      </p>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400/80 text-xs text-center mb-4">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("wallet")}
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
                  <p className="text-[#555] text-sm mb-4 leading-relaxed">
                    Your withdrawal of <span className="text-emerald-400 font-semibold">R{amountNum.toLocaleString()}</span> to your {wallet.symbol} wallet has been submitted.
                  </p>

                  <div className="p-3 bg-amber-500/[0.05] border border-amber-500/[0.15] rounded-xl mb-5">
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[#888] text-[11px] leading-relaxed">
                        Withdrawals are processed within 1-24 hours. You&apos;ll receive your {wallet.symbol} once confirmed by our admin team.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] mb-6 text-left">
                    <p className="text-[#888] text-xs mb-2">
                      <span className="text-[#D4AF37]">Reference:</span> WD-{Date.now().toString(36).toUpperCase()}
                    </p>
                    <p className="text-[#888] text-xs mb-2">
                      <span className="text-[#D4AF37]">Wallet:</span>{" "}
                      <span className="font-mono text-[11px]">{walletAddress.slice(0, 12)}...{walletAddress.slice(-6)}</span>
                    </p>
                    <p className="text-[#888] text-xs">
                      <span className="text-[#D4AF37]">Status:</span> Pending Admin Approval
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
