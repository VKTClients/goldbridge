"use client";

import { useState, useRef } from "react";
import { X, Upload, Check, AlertCircle, FileText, Camera, Home, ArrowRight, Shield, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "intro" | "id" | "address" | "selfie" | "review" | "submitted";

export default function KYCModal({ isOpen, onClose }: KYCModalProps) {
  const { updateKycStatus } = useAuth();
  const [step, setStep] = useState<Step>("intro");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const idInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store document names (in real app, would upload to server)
    const documents = {
      idDocument: idDocument?.name,
      proofOfAddress: proofOfAddress?.name,
      selfie: selfie?.name,
    };
    
    updateKycStatus("submitted", documents);
    setStep("submitted");
    setIsSubmitting(false);
  };

  const reset = () => {
    setStep("intro");
    setIdDocument(null);
    setProofOfAddress(null);
    setSelfie(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const steps = [
    { key: "id", label: "ID Document" },
    { key: "address", label: "Proof of Address" },
    { key: "selfie", label: "Selfie" },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step);

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
            className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#0a0a0e] border border-white/[0.06] rounded-2xl shadow-2xl"
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
              {/* Intro Step */}
              {step === "intro" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-5">
                    <Shield size={24} className="text-[#D4AF37]" />
                  </div>
                  <h2 className="text-white text-xl font-display font-semibold mb-2">
                    Verify Your Identity
                  </h2>
                  <p className="text-[#555] text-sm mb-6 leading-relaxed">
                    Complete KYC verification to unlock higher withdrawal limits and access all features. This process takes about 2 minutes.
                  </p>

                  <div className="space-y-3 mb-6 text-left">
                    <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <FileText size={14} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">ID Document</p>
                        <p className="text-[#444] text-[10px]">Passport, National ID, or Driver's License</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Home size={14} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">Proof of Address</p>
                        <p className="text-[#444] text-[10px]">Utility bill or bank statement (last 3 months)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Camera size={14} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">Selfie Verification</p>
                        <p className="text-[#444] text-[10px]">A clear photo of your face</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("id")}
                    className="w-full btn-gold py-3 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    Start Verification
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Progress Bar */}
              {["id", "address", "selfie", "review"].includes(step) && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    {steps.map((s, i) => (
                      <div key={s.key} className="flex items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                            i < currentStepIndex || step === "review"
                              ? "bg-emerald-500 text-white"
                              : i === currentStepIndex
                              ? "bg-[#D4AF37] text-[#060608]"
                              : "bg-white/[0.05] text-[#444]"
                          }`}
                        >
                          {i < currentStepIndex || step === "review" ? <Check size={12} /> : i + 1}
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className={`w-16 md:w-24 h-0.5 mx-1 transition-colors ${
                              i < currentStepIndex || step === "review" ? "bg-emerald-500" : "bg-white/[0.06]"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[#555] text-[10px] text-center">
                    {step === "review" ? "Review & Submit" : steps[currentStepIndex]?.label}
                  </p>
                </div>
              )}

              {/* ID Document Step */}
              {step === "id" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-white text-lg font-semibold mb-2">Upload ID Document</h3>
                  <p className="text-[#555] text-xs mb-5">
                    Upload a clear photo of your passport, national ID, or driver's license.
                  </p>

                  <input
                    ref={idInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, setIdDocument)}
                    className="hidden"
                  />

                  <div
                    onClick={() => idInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      idDocument
                        ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                        : "border-white/[0.08] hover:border-[#D4AF37]/30 bg-white/[0.01]"
                    }`}
                  >
                    {idDocument ? (
                      <div className="flex items-center justify-center gap-3">
                        <Check size={20} className="text-emerald-400" />
                        <div className="text-left">
                          <p className="text-white text-sm font-medium">{idDocument.name}</p>
                          <p className="text-[#555] text-[10px]">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="text-[#444] mx-auto mb-3" />
                        <p className="text-white text-sm mb-1">Click to upload</p>
                        <p className="text-[#444] text-[10px]">PNG, JPG, or PDF up to 10MB</p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep("intro")}
                      className="flex-1 py-2.5 text-sm text-[#666] border border-white/[0.06] rounded-xl hover:bg-white/[0.02]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("address")}
                      disabled={!idDocument}
                      className="flex-1 btn-gold py-2.5 text-sm disabled:opacity-30"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Proof of Address Step */}
              {step === "address" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-white text-lg font-semibold mb-2">Proof of Address</h3>
                  <p className="text-[#555] text-xs mb-5">
                    Upload a utility bill or bank statement from the last 3 months.
                  </p>

                  <input
                    ref={addressInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, setProofOfAddress)}
                    className="hidden"
                  />

                  <div
                    onClick={() => addressInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      proofOfAddress
                        ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                        : "border-white/[0.08] hover:border-[#D4AF37]/30 bg-white/[0.01]"
                    }`}
                  >
                    {proofOfAddress ? (
                      <div className="flex items-center justify-center gap-3">
                        <Check size={20} className="text-emerald-400" />
                        <div className="text-left">
                          <p className="text-white text-sm font-medium">{proofOfAddress.name}</p>
                          <p className="text-[#555] text-[10px]">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="text-[#444] mx-auto mb-3" />
                        <p className="text-white text-sm mb-1">Click to upload</p>
                        <p className="text-[#444] text-[10px]">PNG, JPG, or PDF up to 10MB</p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep("id")}
                      className="flex-1 py-2.5 text-sm text-[#666] border border-white/[0.06] rounded-xl hover:bg-white/[0.02]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("selfie")}
                      disabled={!proofOfAddress}
                      className="flex-1 btn-gold py-2.5 text-sm disabled:opacity-30"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Selfie Step */}
              {step === "selfie" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-white text-lg font-semibold mb-2">Selfie Verification</h3>
                  <p className="text-[#555] text-xs mb-5">
                    Take or upload a clear photo of your face. Make sure your face is well-lit and visible.
                  </p>

                  <input
                    ref={selfieInputRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => handleFileChange(e, setSelfie)}
                    className="hidden"
                  />

                  <div
                    onClick={() => selfieInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      selfie
                        ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                        : "border-white/[0.08] hover:border-[#D4AF37]/30 bg-white/[0.01]"
                    }`}
                  >
                    {selfie ? (
                      <div className="flex items-center justify-center gap-3">
                        <Check size={20} className="text-emerald-400" />
                        <div className="text-left">
                          <p className="text-white text-sm font-medium">{selfie.name}</p>
                          <p className="text-[#555] text-[10px]">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Camera size={32} className="text-[#444] mx-auto mb-3" />
                        <p className="text-white text-sm mb-1">Take or upload selfie</p>
                        <p className="text-[#444] text-[10px]">PNG or JPG up to 10MB</p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep("address")}
                      className="flex-1 py-2.5 text-sm text-[#666] border border-white/[0.06] rounded-xl hover:bg-white/[0.02]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("review")}
                      disabled={!selfie}
                      className="flex-1 btn-gold py-2.5 text-sm disabled:opacity-30"
                    >
                      Review
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Review Step */}
              {step === "review" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-white text-lg font-semibold mb-2">Review & Submit</h3>
                  <p className="text-[#555] text-xs mb-5">
                    Please review your documents before submitting.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-blue-400" />
                        <div>
                          <p className="text-white text-xs font-medium">ID Document</p>
                          <p className="text-[#444] text-[10px]">{idDocument?.name}</p>
                        </div>
                      </div>
                      <Check size={14} className="text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <Home size={16} className="text-purple-400" />
                        <div>
                          <p className="text-white text-xs font-medium">Proof of Address</p>
                          <p className="text-[#444] text-[10px]">{proofOfAddress?.name}</p>
                        </div>
                      </div>
                      <Check size={14} className="text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <Camera size={16} className="text-emerald-400" />
                        <div>
                          <p className="text-white text-xs font-medium">Selfie</p>
                          <p className="text-[#444] text-[10px]">{selfie?.name}</p>
                        </div>
                      </div>
                      <Check size={14} className="text-emerald-400" />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/[0.05] border border-amber-500/[0.15] rounded-xl mb-6">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[#888] text-[10px] leading-relaxed">
                        By submitting, you confirm that all documents are authentic and belong to you. 
                        Verification typically takes 1-2 business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("selfie")}
                      className="flex-1 py-2.5 text-sm text-[#666] border border-white/[0.06] rounded-xl hover:bg-white/[0.02]"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 btn-gold py-2.5 text-sm disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit for Review
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Submitted Step */}
              {step === "submitted" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h2 className="text-white text-xl font-display font-semibold mb-2">
                    Documents Submitted!
                  </h2>
                  <p className="text-[#555] text-sm mb-6 leading-relaxed">
                    Your verification documents have been submitted successfully. 
                    We'll review them and notify you within 1-2 business days.
                  </p>

                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] mb-6">
                    <p className="text-[#888] text-xs">
                      <span className="text-[#D4AF37]">Status:</span> Under Review
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
