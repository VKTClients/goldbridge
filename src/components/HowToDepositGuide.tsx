"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Copy,
  HelpCircle,
  Landmark,
  ShieldAlert,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DEPOSIT_WALLET_ADDRESS,
  DEPOSIT_WALLET_NAME,
  DEPOSIT_WALLET_NETWORK,
} from "@/lib/depositWallet";

interface HowToDepositGuideProps {
  onClose: () => void;
  onNeedHelp: () => void;
  onProceedToInvestment: () => void;
  onSubmitProof: () => void;
}

const GUIDE_STEPS = [
  {
    id: "create-account",
    icon: Smartphone,
    title: "Create Luno Account",
    summary: "Set up your Luno account first.",
    bullets: [
      "Open Luno and tap Create Account.",
      "Enter email and create a password.",
      "Confirm your email link.",
      "Set your security PIN.",
      "Verify your phone number.",
      "Select your country.",
    ],
    panelTitle: "Ready to use",
    panelItems: [
      "Email confirmed",
      "Phone number verified",
      "Security PIN created",
      "Account ready to fund",
    ],
  },
  {
    id: "deposit-funds",
    icon: Landmark,
    title: "Deposit Funds",
    summary: "Add money to your local wallet.",
    bullets: [
      "Go to Wallets.",
      "Choose your local currency wallet.",
      "Tap Deposit and pick payment method.",
      "Use the exact reference number.",
      "Complete transfer in your banking app.",
    ],
    panelTitle: "Before you continue",
    panelItems: [
      "Use the exact Luno reference",
      "Wait for the transfer to process",
      "Confirm the balance reflects in your wallet",
      "Keep a payment record if you want a backup",
    ],
  },
  {
    id: "buy-usdt",
    icon: BadgeCheck,
    title: "Buy USDT",
    summary: "Convert your balance to USDT.",
    bullets: [
      "Go to Portfolio and tap Buy Crypto.",
      "Select Tether (USDT).",
      "Choose one-time or recurring buy.",
      "Enter your amount and confirm.",
    ],
    panelTitle: "Success check",
    panelItems: [
      "USDT selected",
      "Amount confirmed",
      "Purchase completed",
      "USDT visible in your portfolio",
    ],
  },
  {
    id: "send-usdt",
    icon: Wallet,
    title: "Send USDT",
    summary: "Send USDT to the official wallet below.",
    bullets: [
      "Open your USDT wallet.",
      "Tap Send or Withdraw.",
      "Paste the wallet address shown here.",
      "Select Ethereum (ERC-20).",
      "Enter the amount and confirm the transfer.",
    ],
  },
  {
    id: "sell-withdraw",
    icon: Landmark,
    title: "Sell & Withdraw",
    summary: "Optional: convert your USDT back to local currency and withdraw to your bank.",
    bullets: [
      "Go to your USDT wallet.",
      "Tap Sell and convert to your local currency.",
      "Go to your local currency wallet.",
      "Tap Withdraw.",
      "Select your bank account and confirm.",
    ],
    panelTitle: "Optional cash-out",
    panelItems: [
      "USDT converted to local currency",
      "Balance available in your currency wallet",
      "Bank account selected",
      "Funds sent to your bank account",
    ],
  },
  {
    id: "confirmation",
    icon: BadgeCheck,
    title: "Complete Your Investment",
    summary: "Finish once your transfer is complete.",
    bullets: [
      "Submit Proof of Payment.",
      "Proceed to Investment.",
      "Contact support if needed.",
    ],
    panelTitle: "Security tips",
    panelItems: [
      "Double-check the wallet address",
      "Use ERC-20 only",
      "Never share PIN/login details",
      "Use official Gold Bridge details",
    ],
  },
] as const;

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function HowToDepositGuide({
  onClose,
  onNeedHelp,
  onProceedToInvestment,
  onSubmitProof,
}: HowToDepositGuideProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const currentStep = GUIDE_STEPS[activeStep];
  const progress = useMemo(
    () => Math.round(((activeStep + 1) / GUIDE_STEPS.length) * 100),
    [activeStep]
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    titleRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleNext = () => {
    if (activeStep < GUIDE_STEPS.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(DEPOSIT_WALLET_ADDRESS);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      setCopiedAddress(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-[#050507]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(0,0,0,0))]" />

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="deposit-guide-title"
          className="relative flex h-full min-h-0 flex-col"
        >
          <header className="border-b border-white/[0.05] bg-[#050507]/96 backdrop-blur-xl">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-2.5">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 min-w-[36px] items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 text-xs font-medium text-[#C9C9C9] hover:border-white/[0.14] hover:text-white transition-colors"
                >
                  <X size={14} />
                  <span className="hidden sm:inline">Exit</span>
                </button>

                <div className="min-w-0 flex-1">
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.26em] mb-1.5">
                    Gold Bridge Capital - Luno USDT Guide
                  </p>
                  <h2 id="deposit-guide-title" ref={titleRef} tabIndex={-1} className="sr-only">
                    Deposit guide
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onNeedHelp}
                  className="inline-flex h-9 min-w-[36px] items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 text-xs font-semibold text-[#F3D889] hover:border-[#D4AF37]/40 hover:text-white transition-colors"
                >
                  <HelpCircle size={14} />
                  <span className="hidden sm:inline">Need Help?</span>
                </button>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-white text-xs font-semibold">
                    Step {activeStep + 1} of {GUIDE_STEPS.length}
                  </p>
                  <p className="text-[#555] text-[9px] uppercase tracking-[0.16em] mt-0.5">
                    Guided progress
                  </p>
                </div>
                <p className="text-white text-lg font-display font-semibold">{progress}%</p>
              </div>

              <div
                className="mt-2 h-2 rounded-full bg-white/[0.05] overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Deposit guide progress"
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4DA8A] to-emerald-400"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                />
              </div>

              <div className="mt-2.5 flex gap-2 overflow-x-auto sm:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {GUIDE_STEPS.map((step, index) => {
                  const isActive = index === activeStep;
                  const isComplete = index < activeStep;

                  return (
                    <div
                      key={step.id}
                      className={`shrink-0 rounded-full border px-2.5 py-1.5 text-[9px] uppercase tracking-[0.12em] transition-[max-width,color,border-color,background-color] duration-250 whitespace-nowrap overflow-hidden ${
                        isActive
                          ? "border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#F3D889]"
                          : isComplete
                            ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300"
                            : "border-white/[0.08] bg-transparent text-[#666]"
                      } ${isActive ? "max-w-[14rem] sm:max-w-none" : "max-w-[4.5rem] sm:max-w-none"}`}
                    >
                      <span className="sm:hidden">{isActive ? `${index + 1}. ${step.title}` : `${index + 1}.`}</span>
                      <span className="hidden sm:inline">{index + 1}. {step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </header>

          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-3 overflow-y-auto sm:overflow-hidden">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="mx-auto h-full w-full max-w-6xl"
              >
                <section className="relative h-full overflow-y-auto sm:overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0B0B0E] p-4 sm:p-5 md:p-6 shadow-[0_14px_36px_rgba(0,0,0,0.28)]">

                  <div className="relative z-10 flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <currentStep.icon size={24} className="text-[#D4AF37]" />
                    </div>
                    <div className="max-w-2xl">
                      <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.28em] mb-2">
                        Guided step {activeStep + 1}
                      </p>
                      <h3 className="text-white text-xl sm:text-2xl md:text-[2rem] font-display font-semibold tracking-tight mb-2">
                        {currentStep.title}
                      </h3>
                      <p className="text-[#BEBEBE] text-sm leading-relaxed">
                        {currentStep.summary}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-3 grid gap-3 lg:grid-cols-[1.12fr_0.88fr]">
                    <div className="rounded-2xl border border-white/[0.07] bg-[#070709] p-3.5 sm:p-4">
                      <ul className="space-y-2.5">
                        {currentStep.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-[#D5D5D5] text-[13px] sm:text-sm leading-relaxed"
                          >
                            <span className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-400">
                              <Check size={12} />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-[#09090B] p-3.5 sm:p-4">
                      {currentStep.id === "send-usdt" ? (
                        <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.08] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-red-300 mb-4">
                          <ShieldAlert size={12} />
                          ERC-20 only
                        </div>

                        <h4 className="text-white text-lg font-semibold mb-2">Wallet address</h4>
                        <p className="text-[#666] text-[13px] leading-relaxed mb-4">
                          Send your USDT to the official Gold Bridge Capital wallet below and confirm the network is Ethereum ERC-20 before you send.
                        </p>

                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 sm:p-5 mb-4">
                          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                            <div>
                              <p className="text-emerald-300 text-[10px] uppercase tracking-[0.2em] mb-1">
                                Gold Bridge wallet
                              </p>
                              <p className="text-white text-sm font-semibold">{DEPOSIT_WALLET_NAME}</p>
                              <p className="text-[#A6A6A6] text-xs mt-1">{DEPOSIT_WALLET_NETWORK}</p>
                            </div>
                            <button
                              type="button"
                              onClick={handleCopyAddress}
                              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                                copiedAddress
                                  ? "border-emerald-400/35 bg-emerald-500/15 text-emerald-300"
                                  : "border-white/[0.08] bg-white/[0.04] text-white hover:border-[#D4AF37]/30"
                              }`}
                            >
                              {copiedAddress ? <Check size={14} /> : <Copy size={14} />}
                              {copiedAddress ? "Copied" : "Copy Address"}
                            </button>
                          </div>

                          <div className="rounded-2xl border border-white/[0.07] bg-[#050507] p-4">
                            <p className="text-[#888] text-[10px] uppercase tracking-[0.2em] mb-2">
                              Wallet address
                            </p>
                            <p className="text-white text-[13px] md:text-sm font-mono break-all leading-relaxed">
                              {DEPOSIT_WALLET_ADDRESS}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-red-500/25 bg-red-500/[0.08] p-4" role="alert">
                          <div className="flex items-start gap-3">
                            <ShieldAlert size={18} className="text-red-300 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-white text-sm font-semibold mb-1">Important warning</p>
                              <p className="text-red-100/85 text-sm leading-relaxed">
                                Only use ERC-20 network. Sending incorrectly may result in loss of funds.
                              </p>
                            </div>
                          </div>
                        </div>
                        </div>
                      ) : (
                        <div>
                        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.22em] mb-3">
                          {currentStep.panelTitle}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {currentStep.panelItems?.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0A0A0C] px-3 py-2.5"
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                                <Check size={12} />
                              </span>
                              <span className="text-white text-xs leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 rounded-2xl border border-white/[0.07] bg-[#070709] p-3">
                          <p className="text-white text-xs font-semibold mb-1.5">
                            {currentStep.id === "confirmation" ? "Finish strong" : "Why this step matters"}
                          </p>
                          <p className="text-[#666] text-xs leading-relaxed">
                            {currentStep.id === "confirmation"
                              ? "When the transfer is done, keep your proof of payment ready and use the final actions below to move straight into the next stage."
                              : "This flow stays linear on purpose: one clear action at a time, a visible sense of progress, and no long scrolling page to keep track of."}
                          </p>
                        </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </motion.div>
            </div>
          </div>

          <footer className="border-t border-white/[0.05] bg-[#050507]/97 backdrop-blur-xl">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-2.5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="hidden sm:block text-[#555] text-xs leading-relaxed">
                  {activeStep === GUIDE_STEPS.length - 1
                    ? "Review the transfer details one last time before moving forward."
                    : "Complete the current step, then continue when you are ready."}
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:items-center">
                  {activeStep > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-outline w-full sm:w-auto px-5 py-2.5 text-xs gap-2"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  )}

                  {activeStep === GUIDE_STEPS.length - 1 ? (
                    <div className="flex w-full flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={onSubmitProof}
                        className="btn-gold w-full sm:w-auto px-6 py-2.5 text-xs gap-2"
                      >
                        Submit Proof of Payment
                        <ArrowRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={onProceedToInvestment}
                        className="btn-outline w-full sm:w-auto px-5 py-2.5 text-xs"
                      >
                        Proceed to Investment
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-gold w-full sm:w-auto px-6 py-2.5 text-xs gap-2"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </div>
    </motion.div>
  );
}
