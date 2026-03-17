"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  time: string;
  followUp?: string[];
}

interface BotReply {
  content: string;
  followUp?: string[];
}

interface KnowledgeItem {
  keywords: string[];
  reply: BotReply;
}

const quickReplies = [
  "How do I get started?",
  "What is the minimum investment?",
  "How do deposits work?",
  "How do withdrawals work?",
  "What is KYC verification?",
  "What risks are involved?",
];

const fallbackPrompts = [
  "What markets do you invest in?",
  "Are returns guaranteed?",
  "What fees may apply?",
];

const knowledgeBase: KnowledgeItem[] = [
  {
    keywords: ["start", "begin", "onboarding", "join", "signup", "sign up", "register"],
    reply: {
      content:
        "To get started, complete the onboarding process and then follow the deposit instructions provided on the platform.\n\nA typical flow is:\n1. Create or access your account\n2. Review the available investment tier\n3. Complete KYC if required\n4. Send your deposit to the official wallet provided during onboarding",
      followUp: ["How do deposits work?", "What is the minimum investment?"],
    },
  },
  {
    keywords: ["deposit", "fund", "send", "wallet", "usdt", "erc20", "erc-20"],
    reply: {
      content:
        "Deposits are made by transferring Tether (USDT) on the Ethereum ERC-20 network to the official Gold Bridge Capital wallet address provided during onboarding.\n\nDeposits are typically confirmed once the blockchain transaction is verified, which usually takes a few minutes depending on Ethereum network activity.",
      followUp: ["How long do deposits take?", "What fees may apply?"],
    },
  },
  {
    keywords: ["confirm", "confirmation", "how long", "minutes", "deposit take"],
    reply: {
      content:
        "Deposit timing depends on blockchain confirmation. In most cases it takes a few minutes, but it can vary based on Ethereum network activity.",
      followUp: ["How do deposits work?", "What cryptocurrency is accepted?"],
    },
  },
  {
    keywords: ["withdraw", "withdrawal", "cash out", "take out", "payout"],
    reply: {
      content:
        "Withdrawal requests can be submitted through the platform. Once approved, funds are processed and transferred back according to the applicable withdrawal procedure.\n\nWithdrawal availability may depend on the investment structure or cycle tied to your selected tier.",
      followUp: ["Can I withdraw anytime?", "What is KYC verification?"],
    },
  },
  {
    keywords: ["minimum", "smallest", "least", "entry", "start amount"],
    reply: {
      content:
        "The minimum investment amount may vary depending on the selected investment tier. Each tier represents a different level of capital allocation and strategic exposure.",
      followUp: ["What are investment tiers?", "How do I get started?"],
    },
  },
  {
    keywords: ["tier", "tiers", "plan", "package", "level"],
    reply: {
      content:
        "Investment tiers represent different levels of capital participation. Each tier may provide different strategic exposure depending on the amount of capital allocated.",
      followUp: ["What is the minimum investment?", "Can I withdraw anytime?"],
    },
  },
  {
    keywords: ["return", "returns", "profit", "guarantee", "guaranteed", "roi"],
    reply: {
      content:
        "Returns are not guaranteed. All investments carry risk, and outcomes depend on market conditions, strategy performance, and capital allocation.",
      followUp: ["What risks are involved?", "What markets do you invest in?"],
    },
  },
  {
    keywords: ["risk", "safe", "security", "secure", "volatility", "loss"],
    reply: {
      content:
        "As with any investment, there are risks associated with market volatility, economic conditions, and digital asset fluctuations.\n\nCryptocurrency transactions are secured through blockchain technology, and clients should also follow wallet-security best practices when sending funds.",
      followUp: ["Are returns guaranteed?", "How do withdrawals work?"],
    },
  },
  {
    keywords: ["kyc", "verify", "verification", "identity", "document", "id"],
    reply: {
      content:
        "KYC verification is used to confirm identity and support compliance procedures. It is typically part of the onboarding flow and may be required for access to full account functionality or withdrawal processing.",
      followUp: ["How do I get started?", "How do withdrawals work?"],
    },
  },
  {
    keywords: ["market", "markets", "sector", "ecommerce", "e-commerce", "digital asset", "financial instruments"],
    reply: {
      content:
        "Gold Bridge Capital participates across three primary sectors:\n- E-commerce investments\n- Digital assets\n- Global financial markets",
      followUp: ["How does Gold Bridge Capital generate returns?", "What risks are involved?"],
    },
  },
  {
keywords: ["safe", "secure", "trust", "legit", "scam", "real", "protection"],
    reply: {
      content: "Your security is our top priority! 🛡️\n\n✅ **Bank-grade encryption** (256-bit SSL)\n✅ **Regulated & compliant** (KYC/AML)\n✅ **Cold storage** for digital assets\n✅ **24/7 monitoring** & fraud detection\n✅ **25+ years** in business since 2000\n\nOver 12,000 investors trust us with $10M+ in assets.",
      followUp: ["How long in business?", "Where are you based?"]
    }
  },
  {
    keywords: ["fee", "fees", "charge", "cost", "gas", "transaction cost"],
    reply: {
      content:
        "Certain operational or transaction fees may apply depending on the investment structure or blockchain transaction costs. The exact impact can vary by tier and by network conditions.",
      followUp: ["How do deposits work?", "How do withdrawals work?"],
    },
  },
  {
    keywords: ["track", "dashboard", "report", "performance", "updates"],
    reply: {
      content:
        "Clients are typically able to track investment activity and performance through platform updates and reporting cycles provided by Gold Bridge Capital.",
      followUp: ["How do I get started?", "What are investment tiers?"],
    },
  },
  {
    keywords: ["support", "contact", "help", "email", "phone", "whatsapp"],
    reply: {
      content:
        "For support, use the official communication channels provided on the website or in your onboarding materials. If you are already registered, the fastest route is usually through your platform support path or account contact details.",
      followUp: ["How do I get started?", "How do withdrawals work?"],
    },
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    reply: {
      content:
        "Welcome to Gold Bridge Capital. I can help with onboarding, deposits, withdrawals, tiers, KYC, and general investment questions.",
      followUp: ["How do I get started?", "How do deposits work?"],
    },
  },
];

function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function normalizeInput(input: string) {
  return input.toLowerCase().replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function getBotReply(input: string): BotReply {
  const normalized = normalizeInput(input);

  if (!normalized) {
    return {
      content: "Please type a question and I will point you to the most relevant information.",
      followUp: ["How do I get started?", "How do deposits work?"],
    };
  }

  if (/(thank|thanks|appreciate)/.test(normalized)) {
    return {
      content: "You are welcome. If you want, ask about deposits, withdrawals, tiers, risks, or onboarding.",
      followUp: ["How do withdrawals work?", "What risks are involved?"],
    };
  }

  if (/(bye|goodbye|see you|later|exit|quit)/.test(normalized)) {
    return {
      content: "You can return anytime if you need help with Gold Bridge Capital information or onboarding guidance.",
    };
  }

  let bestMatch: KnowledgeItem | null = null;
  let bestScore = 0;

  for (const item of knowledgeBase) {
    const score = item.keywords.reduce((total, keyword) => {
      return total + (normalized.includes(keyword) ? keyword.split(" ").length : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch) {
    return bestMatch.reply;
  }

  return {
    content:
      "I can help with onboarding, deposits, withdrawals, tiers, risks, KYC, and general platform questions. Try asking something more specific.",
    followUp: fallbackPrompts,
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      content:
        "Welcome to Gold Bridge Capital. Ask about onboarding, deposits, withdrawals, KYC, investment tiers, or platform risks.",
      time: getCurrentTime(),
      followUp: quickReplies.slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeSuggestions = useMemo(() => {
    const latestBotMessage = [...messages].reverse().find((message) => message.role === "bot");
    return latestBotMessage?.followUp?.length ? latestBotMessage.followUp : quickReplies.slice(0, 4);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = getBotReply(trimmed);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: reply.content,
        time: getCurrentTime(),
        followUp: reply.followUp,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 520);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-14 right-4 md:bottom-16 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center hover:scale-105 transition-transform"
            aria-label="Open chat"
          >
            <MessageCircle size={22} className="text-[#060608]" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#060608]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-14 right-0 md:bottom-16 md:right-6 z-50 w-full md:w-[390px] h-[60vh] md:h-[540px] max-h-[540px] bg-[#0a0a0e] border border-white/[0.06] md:rounded-2xl rounded-t-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#09090c]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">GoldBridge Assistant</p>
                  <p className="text-emerald-400 text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={16} className="text-[#666]" />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-white/[0.04] bg-[#0c0c10]">
              <p className="text-[#777] text-[11px] leading-relaxed">
                Quick guidance for common questions. For account-specific actions, use the platform flow or official support channels.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "bot"
                        ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20"
                        : "bg-blue-500/10 border border-blue-500/20"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot size={14} className="text-[#D4AF37]" />
                    ) : (
                      <User size={14} className="text-blue-400" />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl ${
                      msg.role === "bot"
                        ? "bg-white/[0.04] rounded-tl-sm"
                        : "bg-[#D4AF37]/10 rounded-tr-sm"
                    }`}
                  >
                    <p className="text-[#ccc] text-xs leading-relaxed whitespace-pre-line">
                      {msg.content}
                    </p>
                    <p className="text-[#444] text-[9px] mt-1.5 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                    <Bot size={14} className="text-[#D4AF37]" />
                  </div>
                  <div className="bg-white/[0.04] px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 pb-2">
              <p className="text-[#444] text-[9px] mb-2 uppercase tracking-wider">
                Suggested questions
              </p>
              <div className="flex gap-2 flex-wrap">
                {activeSuggestions.slice(0, 4).map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="text-[10px] px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#888] hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-white/[0.06] bg-[#09090c]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about deposits, tiers, withdrawals, KYC..."
                  className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-[#444] outline-none focus:border-[#D4AF37]/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-[#D4AF37] hover:bg-[#C9A84C] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Send size={16} className="text-[#060608]" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
