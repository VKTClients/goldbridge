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
    summary: "Set up your Luno account before you try to fund or send anything.",
    bullets: [
      "Open the Luno app and tap Create Account.",
      "Enter your email and create a password.",
      "Confirm your email via the link sent to you.",
      "Set your security PIN.",
      "Add and verify your phone number.",
      "Select your country of residence.",
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
    summary: "Add money to your Luno wallet before buying Tether.",
    bullets: [
      "Log in and go to Wallets.",
      "Select your local currency wallet.",
      "Tap Deposit.",
      "Choose your payment method.",
      "Use the exact reference number provided.",
      "Complete payment via your banking app.",
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
    summary: "Convert your funded balance into Tether inside Luno.",
    bullets: [
      "Go to Portfolio and tap Buy Crypto.",
      "Select Tether (USDT).",
      "Choose One-Time or Recurring Purchase.",
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
    summary: "Send your USDT to the official Gold Bridge Capital wallet below.",
    bullets: [
      "Open your USDT wallet.",
      "Tap Send or Withdraw.",
      "Paste the wallet address shown on this screen.",
      "Select Ethereum (ERC-20).",
      "Enter the amount and confirm the transfer.",
    ],
  },
  {
    id: "confirmation",
    icon: BadgeCheck,
    title: "Confirmation / Final Step",
    summary: "Finish the handoff after your transfer has been sent.",
    bullets: [
      "Keep your transaction hash or screenshot as proof of payment.",
      "Submit Proof of Payment once your transfer is complete.",
      "Proceed to Investment to continue your onboarding.",
      "Contact support if you need help at any point.",
    ],
    panelTitle: "Security tips",
    panelItems: [
      "Always double-check the wallet address",
      "Ensure ERC-20 network is selected",
      "Never share your PIN or login details",
      "Only use official Gold Bridge Capital details",
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
          className="relative flex h-full flex-col"
        >
          <header className="border-b border-white/[0.05] bg-[#050507]/92 backdrop-blur-xl">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-5 max-[740px]:py-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-sm font-medium text-[#C9C9C9] hover:border-white/[0.14] hover:text-white transition-colors"
                >
                  <X size={16} />
                  <span className="hidden sm:inline">Exit</span>
                </button>

                <div className="min-w-0 flex-1">
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.26em] mb-1.5">
                    Gold Bridge Capital - Luno USDT Guide
                  </p>
                  <h2
                    id="deposit-guide-title"
                    ref={titleRef}
                    tabIndex={-1}
                    className="text-white text-lg sm:text-xl md:text-2xl max-[740px]:text-base font-display font-semibold tracking-tight outline-none"
                  >
                    Immersive 5-step deposit flow
                  </h2>
                  <p className="text-[#666] text-xs sm:text-sm mt-1.5 max-w-2xl max-[740px]:hidden">
                    One step is shown at a time for a focused, mobile-first flow.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onNeedHelp}
                  className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 text-sm font-semibold text-[#F3D889] hover:border-[#D4AF37]/40 hover:text-white transition-colors"
                >
                  <HelpCircle size={16} />
                  <span className="hidden sm:inline">Need Help?</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 max-[740px]:mt-3">
                <div>
                  <p className="text-white text-sm font-semibold">
                    Step {activeStep + 1} of {GUIDE_STEPS.length}
                  </p>
                  <p className="text-[#555] text-[10px] uppercase tracking-[0.18em] mt-1">
                    Guided progress
                  </p>
                </div>
                <p className="text-white text-xl md:text-2xl font-display font-semibold">{progress}%</p>
              </div>

              <div
                className="mt-3 h-2.5 rounded-full bg-white/[0.05] overflow-hidden"
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

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 max-[740px]:mt-3">
                {GUIDE_STEPS.map((step, index) => {
                  const isActive = index === activeStep;
                  const isComplete = index < activeStep;

                  return (
                    <div
                      key={step.id}
                      className={`min-w-fit rounded-full border px-3 py-2 max-[740px]:px-2.5 max-[740px]:py-1.5 text-[10px] max-[740px]:text-[9px] uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? "border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#F3D889]"
                          : isComplete
                            ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300"
                            : "border-white/[0.08] bg-transparent text-[#666]"
                      }`}
                    >
                      {index + 1}. {step.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6 max-[740px]:py-3">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="mx-auto max-w-4xl"
              >
                <section className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0B0B0E] p-5 sm:p-6 md:p-8 lg:p-10 max-[740px]:p-4 shadow-[0_14px_36px_rgba(0,0,0,0.28)]">

                  <div className="relative z-10 flex items-start gap-4 mb-6 max-[740px]:mb-4 max-[740px]:gap-3">
                    <div className="w-14 h-14 max-[740px]:w-11 max-[740px]:h-11 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <currentStep.icon size={24} className="text-[#D4AF37]" />
                    </div>
                    <div className="max-w-2xl">
                      <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.28em] mb-2">
                        Guided step {activeStep + 1}
                      </p>
                      <h3 className="text-white text-2xl sm:text-3xl md:text-[2.5rem] max-[740px]:text-xl font-display font-semibold tracking-tight mb-3 max-[740px]:mb-2">
                        {currentStep.title}
                      </h3>
                      <p className="text-[#BEBEBE] text-sm sm:text-base max-[740px]:text-[13px] leading-relaxed">
                        {currentStep.summary}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 rounded-2xl border border-white/[0.07] bg-[#070709] p-4 sm:p-5 md:p-6 max-[740px]:p-3.5">
                    <ul className="space-y-3 md:space-y-4 max-[740px]:space-y-2.5">
                      {currentStep.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 max-[740px]:gap-2.5 text-[#D5D5D5] text-sm md:text-[15px] max-[740px]:text-[13px] leading-relaxed"
                        >
                          <span className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-400">
                            <Check size={12} />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative z-10 mt-4 max-[740px]:mt-3 rounded-2xl border border-white/[0.07] bg-[#09090B] p-4 sm:p-5 md:p-6 max-[740px]:p-3.5">
                    {currentStep.id === "send-usdt" ? (
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.08] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-red-300 mb-4">
                          <ShieldAlert size={12} />
                          ERC-20 only
                        </div>

                        <h4 className="text-white text-xl max-[740px]:text-lg font-semibold mb-2">Wallet address</h4>
                        <p className="text-[#666] text-sm max-[740px]:text-[13px] leading-relaxed mb-5 max-[740px]:mb-4">
                          Send your USDT to the official Gold Bridge Capital wallet below and confirm the network is Ethereum ERC-20 before you send.
                        </p>

                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 sm:p-5 mb-4">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
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
                        <div className="space-y-3">
                          {currentStep.panelItems?.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#0A0A0C] px-4 py-3.5"
                            >
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                                <Check size={14} />
                              </span>
                              <span className="text-white text-sm leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#070709] p-4">
                          <p className="text-white text-sm font-semibold mb-2">
                            {currentStep.id === "confirmation" ? "Finish strong" : "Why this step matters"}
                          </p>
                          <p className="text-[#666] text-sm leading-relaxed">
                            {currentStep.id === "confirmation"
                              ? "When the transfer is done, keep your proof of payment ready and use the final actions below to move straight into the next stage."
                              : "This flow stays linear on purpose: one clear action at a time, a visible sense of progress, and no long scrolling page to keep track of."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </motion.div>
            </div>
          </div>

          <footer className="border-t border-white/[0.05] bg-[#050507]/94 backdrop-blur-xl">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-4">
              <div className="flex flex-col gap-3 max-[740px]:gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-[#555] text-xs leading-relaxed">
                  {activeStep === GUIDE_STEPS.length - 1
                    ? "Review the transfer details one last time before moving forward."
                    : "Complete the current step, then continue when you are ready."}
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:items-center">
                  {activeStep > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-outline w-full sm:w-auto px-6 py-3.5 text-sm gap-2"
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
                        className="btn-gold w-full sm:w-auto px-7 py-3.5 text-sm gap-2"
                      >
                        Submit Proof of Payment
                        <ArrowRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={onProceedToInvestment}
                        className="btn-outline w-full sm:w-auto px-6 py-3.5 text-sm"
                      >
                        Proceed to Investment
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-gold w-full sm:w-auto px-7 py-3.5 text-sm gap-2"
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
