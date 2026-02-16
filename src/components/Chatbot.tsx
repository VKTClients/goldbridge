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
  "How do I invest?",
  "What are the returns?",
  "How do withdrawals work?",
  "Contact support",
];

const botResponses: Record<string, string> = {
  "how do i invest": "Getting started is easy! Click 'Make an Investment' from your dashboard or visit our /invest page. Choose your package (Starter, Growth, or Premium), enter your amount, select your payment method (Card or MoonPay), and confirm. Your investment will be active immediately!",
  "what are the returns": "Our weekly returns vary by package:\n\n• **Starter** (R1,000–R4,999): 15–20% per week\n• **Growth** (R5,000–R9,999): 25–35% per week\n• **Premium** (R10,000+): 40–50% per week\n\nReturns are paid out every Monday directly to your account.",
  "how do withdrawals work": "Withdrawals are processed within 24 hours on business days. Simply go to your Dashboard → Transactions → Request Withdrawal. Enter the amount and your bank details. There are no lock-up periods — you can withdraw anytime!",
  "contact support": "You can reach our support team via:\n\n• **Email**: support@goldbridge.capital\n• **WhatsApp**: +27 12 345 6789\n• **Live Chat**: Available 24/7\n\nPremium clients have access to a dedicated account manager.",
  "default": "Thanks for your message! I'm here to help with any questions about investing with GoldBridge Capital. You can ask about our packages, returns, how to get started, or withdrawals. For complex queries, our support team is available 24/7.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(botResponses)) {
    if (key !== "default" && lower.includes(key)) {
      return botResponses[key];
    }
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! 👋 Welcome to GoldBridge Capital. How can I assist you today? Feel free to ask about our investment packages, returns, or how to get started.";
  }
  if (lower.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  return botResponses["default"];
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
            {messages.length < 3 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="text-[10px] px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#888] hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors"
                  >
                    {reply}
                  </button>
                ))}
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
