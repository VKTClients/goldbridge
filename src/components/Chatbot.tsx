"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  time: string;
}

const quickReplies = [
  "💰 How do I start investing?",
  "📈 What returns can I expect?",
  "🏦 How do withdrawals work?",
  "🔐 What is KYC verification?",
  "💳 Payment methods accepted?",
  "📞 Contact support",
];

const suggestedQuestions = [
  "What's the minimum investment?",
  "How often are payouts?",
  "Is my money safe?",
  "How long until I see returns?",
];

// Keyword-based response system
interface KeywordResponse {
  keywords: string[];
  response: string;
  followUp?: string[];
}

const keywordResponses: KeywordResponse[] = [
  {
    keywords: ["invest", "start", "begin", "deposit", "put money", "get started"],
    response: "Getting started is easy! 🚀\n\n**3 Simple Steps:**\n1. Sign up or log in to your account\n2. Choose your investment package (Starter, Growth, or Premium)\n3. Fund via Card or MoonPay\n\nYour investment activates immediately and you'll start earning weekly returns!",
    followUp: ["What's the minimum?", "Which package is best?"]
  },
  {
    keywords: ["return", "profit", "earn", "make money", "roi", "percentage", "weekly"],
    response: "Our weekly returns vary by tier:\n\n💎 **Starter** (R1,000–R4,999): 15–20% weekly\n🥇 **Growth** (R5,000–R9,999): 25–35% weekly\n👑 **Premium** (R10,000+): 40–50% weekly\n\nReturns are paid every Monday directly to your account balance.",
    followUp: ["How do I upgrade?", "When are payouts?"]
  },
  {
    keywords: ["withdraw", "cash out", "take out", "get my money", "payout", "bank"],
    response: "Withdrawals are quick and easy! 💸\n\n• **Processing time:** 1-2 business days\n• **No lock-up periods** — withdraw anytime\n• **No hidden fees** on withdrawals\n\nGo to Dashboard → Click 'Withdraw' → Enter amount and bank details. That's it!",
    followUp: ["What's the minimum withdrawal?", "Which banks supported?"]
  },
  {
    keywords: ["kyc", "verify", "verification", "identity", "document", "id"],
    response: "KYC (Know Your Customer) verification unlocks full features! 🔐\n\n**What you need:**\n• Valid ID (passport, national ID, or driver's license)\n• Proof of address (utility bill or bank statement)\n• A selfie photo\n\n**Benefits:** Higher withdrawal limits, faster processing, full account access.\n\nVerification takes 1-2 business days.",
    followUp: ["How do I verify?", "Is it mandatory?"]
  },
  {
    keywords: ["payment", "pay", "card", "moonpay", "crypto", "fund", "method"],
    response: "We accept multiple payment methods! 💳\n\n• **Credit/Debit Card** — Visa, Mastercard (instant)\n• **MoonPay** — Pay with crypto or bank transfer\n• **EFT** — Direct bank transfer (1-2 days)\n\nAll payments are secured with bank-grade encryption.",
    followUp: ["Is MoonPay safe?", "Any fees?"]
  },
  {
    keywords: ["safe", "secure", "trust", "legit", "scam", "real", "protection"],
    response: "Your security is our top priority! 🛡️\n\n✅ **Bank-grade encryption** (256-bit SSL)\n✅ **Regulated & compliant** (KYC/AML)\n✅ **Cold storage** for digital assets\n✅ **24/7 monitoring** & fraud detection\n✅ **25+ years** in business since 2000\n\nOver 12,000 investors trust us with $1.8B+ in assets.",
    followUp: ["How long in business?", "Where are you based?"]
  },
  {
    keywords: ["minimum", "min", "least", "smallest", "start with"],
    response: "You can start investing with as little as **R1,000** (about $54 USD)! 💰\n\n**Minimum by tier:**\n• Starter: R1,000\n• Growth: R5,000\n• Premium: R10,000\n\nNo maximum limit — invest as much as you're comfortable with.",
    followUp: ["What tier is best?", "Can I upgrade later?"]
  },
  {
    keywords: ["fee", "charge", "cost", "commission", "hidden"],
    response: "We believe in transparency! 📋\n\n• **No deposit fees**\n• **No withdrawal fees**\n• **No hidden charges**\n• **No management fees**\n\nWhat you invest is what works for you. Returns are calculated on your full investment amount.",
    followUp: ["How do you make money?", "Any catches?"]
  },
  {
    keywords: ["support", "help", "contact", "email", "phone", "whatsapp", "chat"],
    response: "We're here to help! 📞\n\n• **Email:** support@goldbridge.capital\n• **WhatsApp:** +27 12 345 6789\n• **Live Chat:** Available 24/7 (that's me! 🤖)\n\nPremium clients get a dedicated account manager for personalized support.",
    followUp: ["Response time?", "Premium benefits?"]
  },
  {
    keywords: ["referral", "refer", "invite", "friend", "bonus", "affiliate"],
    response: "Earn by sharing! 🎁\n\n**Referral Program:**\n• Get a unique referral link from your dashboard\n• Earn **5% bonus** on every friend's first investment\n• No limit on referrals!\n\nYour friends also get a welcome bonus when they sign up.",
    followUp: ["How do I get my link?", "When do I get paid?"]
  },
  {
    keywords: ["package", "plan", "tier", "level", "upgrade", "difference"],
    response: "We offer 3 investment tiers:\n\n💎 **Starter** (R1K–R5K)\n→ 15-20% weekly returns\n→ Perfect for beginners\n\n🥇 **Growth** (R5K–R10K)\n→ 25-35% weekly returns\n→ Best value tier\n\n👑 **Premium** (R10K+)\n→ 40-50% weekly returns\n→ Priority support & features\n\nYou can upgrade anytime by adding more funds!",
    followUp: ["Which is most popular?", "Can I have multiple?"]
  },
  {
    keywords: ["when", "payout", "monday", "paid", "receive", "schedule"],
    response: "Payouts are processed every **Monday**! 📅\n\n• Returns calculated on Sunday night\n• Credited to your account Monday morning\n• Withdraw anytime or reinvest\n\nYou'll receive a notification when your payout is ready.",
    followUp: ["Can I auto-reinvest?", "What time Monday?"]
  },
  {
    keywords: ["account", "login", "password", "sign", "register", "forgot"],
    response: "Account help:\n\n🔑 **Forgot password?** Click 'Forgot Password' on login page\n📧 **Can't login?** Check your email for verification\n🆕 **New user?** Click 'Sign Up' to create account\n\nNeed more help? Contact support@goldbridge.capital",
    followUp: ["Reset my password", "Delete my account"]
  },
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  
  // Check for greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup)/.test(lower)) {
    return "Hello! 👋 Welcome to GoldBridge Capital. I'm here to help you with:\n\n• Investment packages & returns\n• Deposits & withdrawals\n• Account & KYC verification\n• General questions\n\nWhat would you like to know?";
  }
  
  // Check for thanks
  if (/thank|thanks|thx|appreciate/.test(lower)) {
    return "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about investments, withdrawals, or anything else.";
  }
  
  // Check for goodbye
  if (/bye|goodbye|see you|later|exit|quit/.test(lower)) {
    return "Goodbye! 👋 Thanks for chatting with GoldBridge. We're here 24/7 whenever you need us. Happy investing! 💰";
  }
  
  // Find best matching keyword response
  let bestMatch: KeywordResponse | null = null;
  let maxMatches = 0;
  
  for (const kr of keywordResponses) {
    const matches = kr.keywords.filter(kw => lower.includes(kw)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = kr;
    }
  }
  
  if (bestMatch && maxMatches > 0) {
    return bestMatch.response;
  }
  
  // Default response with suggestions
  return "I'm not sure I understood that, but I'm here to help! 🤔\n\nTry asking about:\n• How to start investing\n• Weekly returns & payouts\n• Withdrawals & bank transfers\n• KYC verification\n• Payment methods\n\nOr type 'support' to contact our team directly.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      content: "Hi there! 👋 I'm your GoldBridge assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: getBotResponse(text),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
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
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#060608]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-14 right-0 md:bottom-16 md:right-6 z-50 w-full md:w-[380px] h-[60vh] md:h-[500px] max-h-[500px] bg-[#0a0a0e] border border-white/[0.06] md:rounded-2xl rounded-t-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
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

            {/* Messages */}
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
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl ${
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

              {/* Typing indicator */}
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

            {/* Quick Replies */}
            {messages.length < 4 && (
              <div className="px-4 pb-2">
                <p className="text-[#444] text-[9px] mb-2 uppercase tracking-wider">Quick questions:</p>
                <div className="flex gap-2 flex-wrap">
                  {quickReplies.slice(0, 4).map((reply) => (
                    <button
                      key={reply}
                      onClick={() => sendMessage(reply)}
                      className="text-[10px] px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#888] hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Suggested Questions after some messages */}
            {messages.length >= 4 && messages.length < 8 && (
              <div className="px-4 pb-2">
                <p className="text-[#444] text-[9px] mb-2 uppercase tracking-wider">You might also ask:</p>
                <div className="flex gap-2 flex-wrap">
                  {suggestedQuestions.slice(0, 3).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[10px] px-3 py-1.5 rounded-full bg-[#D4AF37]/[0.05] border border-[#D4AF37]/[0.15] text-[#D4AF37]/80 hover:bg-[#D4AF37]/[0.1] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/[0.06] bg-[#09090c]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
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
