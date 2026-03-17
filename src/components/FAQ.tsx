"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

type FAQItem = {
  question: string;
  answer: string[];
};

const faqs: FAQItem[] = [
  {
    question: "What is Gold Bridge Capital?",
    answer: [
      "Gold Bridge Capital is a structured investment platform that focuses on opportunities across global markets, including e-commerce ventures, digital assets, and selected financial instruments.",
      "Our goal is to provide investors with a disciplined and strategic approach to capital participation.",
    ],
  },
  {
    question: "How does Gold Bridge Capital generate returns?",
    answer: [
      "Returns are generated through strategic participation in scalable markets such as e-commerce operations, digital asset markets, and selected global financial instruments.",
      "Capital is allocated through structured strategies designed to identify growth opportunities.",
    ],
  },
  {
    question: "Who can invest with Gold Bridge Capital?",
    answer: [
      "Individuals who meet the platform requirements and complete the onboarding process may participate.",
      "Investors should ensure they understand the structure of the investment before committing capital.",
    ],
  },
  {
    question: "What is the minimum investment amount?",
    answer: [
      "The minimum investment amount may vary depending on the selected investment tier.",
      "Each tier represents a different level of capital allocation and strategic exposure.",
    ],
  },
  {
    question: "How do I deposit funds?",
    answer: [
      "Funds can be deposited by transferring Tether (USDT - ERC-20) to the official Gold Bridge Capital wallet address provided during onboarding.",
    ],
  },
  {
    question: "What cryptocurrency is used for deposits?",
    answer: [
      "Gold Bridge Capital currently accepts Tether (USDT) on the Ethereum ERC-20 network for deposits.",
    ],
  },
  {
    question: "How long does it take for deposits to be confirmed?",
    answer: [
      "Deposits are confirmed once the transaction has been verified on the blockchain.",
      "This typically takes a few minutes depending on Ethereum network activity.",
    ],
  },
  {
    question: "How do withdrawals work?",
    answer: [
      "Withdrawal requests can be submitted through the platform.",
      "Once approved, funds are processed and transferred back to the client's designated wallet or account according to the withdrawal procedure.",
    ],
  },
  {
    question: "Are returns guaranteed?",
    answer: [
      "No. All investments carry risk, and returns depend on market conditions, strategy performance, and capital allocation.",
    ],
  },
  {
    question: "What are investment tiers?",
    answer: [
      "Investment tiers represent different levels of capital participation.",
      "Each tier may provide different strategic exposure depending on the amount of capital allocated.",
    ],
  },
  {
    question: "Is my capital actively managed?",
    answer: [
      "Yes. Capital is deployed through structured strategies that involve market research, allocation planning, execution, and ongoing monitoring.",
    ],
  },
  {
    question: "How do I track my investment?",
    answer: [
      "Clients are typically able to track their investment activity and performance through updates and reporting cycles provided by the platform.",
    ],
  },
  {
    question: "What markets does Gold Bridge Capital operate in?",
    answer: [
      "Gold Bridge Capital participates in three primary sectors:",
      "E-commerce investments",
      "Digital assets",
      "Global financial markets",
    ],
  },
  {
    question: "What makes Gold Bridge Capital different?",
    answer: [
      "Gold Bridge Capital focuses on structured strategy, disciplined execution, and long-term participation rather than speculation or short-term hype.",
    ],
  },
  {
    question: "Are there any fees involved?",
    answer: [
      "Certain operational or transaction fees may apply depending on the investment structure or blockchain transaction costs.",
    ],
  },
  {
    question: "How secure are transactions?",
    answer: [
      "All cryptocurrency transactions are secured through blockchain technology.",
      "Clients are also encouraged to follow security best practices when sending funds.",
    ],
  },
  {
    question: "Can I withdraw my capital at any time?",
    answer: [
      "Withdrawal policies may depend on the investment structure or cycle.",
      "Investors should review the withdrawal terms associated with their selected tier.",
    ],
  },
  {
    question: "What risks are involved?",
    answer: [
      "As with any investment, there are risks associated with market volatility, economic conditions, and digital asset fluctuations.",
    ],
  },
  {
    question: "How do I get started?",
    answer: [
      "To begin, complete the onboarding process and follow the instructions provided for depositing funds into the official Gold Bridge Capital wallet.",
    ],
  },
  {
    question: "Who can I contact for support?",
    answer: [
      "Clients can contact the Gold Bridge Capital support team through the official communication channels provided on the website or onboarding materials.",
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="aurora aurora-gold top-[16%] left-[8%] w-[170px] md:w-[340px] h-[140px] md:h-[280px] opacity-[0.05] md:opacity-[0.08]" />
      <div className="aurora aurora-white top-[52%] right-[10%] w-[140px] md:w-[280px] h-[120px] md:h-[220px] opacity-[0.03] md:opacity-[0.05]" />

      <div className="max-w-[1100px] mx-auto relative z-10 px-5 md:px-0">
        <AnimateOnScroll scale blur>
          <div className="text-center mb-10 md:mb-14">
            <div className="pill-gold mb-5 mx-auto">
              <HelpCircle size={12} className="text-[#D4AF37]" />
              Frequently Asked Questions
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Investment Questions, <span className="gold-text">Clearly Answered</span>
            </h2>
            <p className="text-[#555] text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
              A concise overview of how Gold Bridge Capital handles onboarding,
              deposits, withdrawals, investment structure, and investor support.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <AnimateOnScroll key={item.question} delay={index * 0.03} scale>
                <div className="glass overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-start justify-between gap-4 text-left p-5 md:p-6"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <div>
                      <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.28em] mb-2">
                        FAQ {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-white text-sm md:text-base font-semibold leading-relaxed">
                        {item.question}
                      </h3>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`mt-1 shrink-0 text-[#D4AF37] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-panel-${index}`}
                      className="px-5 md:px-6 pb-5 md:pb-6"
                    >
                      <div className="divider-gold mb-4" />
                      <div className="space-y-3">
                        {item.answer.map((paragraph) => {
                          const isListItem =
                            paragraph === "E-commerce investments" ||
                            paragraph === "Digital assets" ||
                            paragraph === "Global financial markets";

                          return (
                            <div
                              key={paragraph}
                              className={`text-sm leading-relaxed ${
                                isListItem ? "text-[#777] flex items-start gap-3" : "text-[#666]"
                              }`}
                            >
                              {isListItem && (
                                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                              )}
                              <p>{paragraph}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
