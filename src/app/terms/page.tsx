"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketTicker from "@/components/MarketTicker";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#060608]">
      <Navbar />
      <MarketTicker />
      <main className="relative pt-[108px]">
        <section className="section-padding">
          <div className="max-w-[900px] mx-auto px-5 md:px-0">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="pill-gold mb-5 mx-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Legal
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Terms & <span className="gold-text">Conditions</span>
              </h1>
              <p className="text-[#555] text-sm">
                Gold Bridge Capital
              </p>
              <p className="text-[#444] text-xs mt-2">
                Last Updated: 17/02/26
              </p>
            </div>

            {/* Content */}
            <div className="glass p-6 md:p-10 space-y-8">
              {/* Intro */}
              <p className="text-[#888] text-sm leading-relaxed">
                These Terms and Conditions ("Agreement") form a legally binding agreement between you ("User", "you", or "your") and Gold Bridge Capital ("Company", "we", "our", or "us").
              </p>
              <p className="text-[#888] text-sm leading-relaxed">
                By accessing or using our website, services, or any related platform (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>

              <div className="divider-gold" />

              {/* PART 1 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 1 — Access & Eligibility
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white text-lg font-semibold font-display mb-3">
                      1. Eligibility
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-3">
                      To use our Services, you must:
                    </p>
                    <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Be at least 18 years of age</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Have the legal capacity to enter into binding agreements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Provide accurate and complete information during onboarding</span>
                      </li>
                    </ul>
                    <p className="text-[#888] text-sm leading-relaxed">
                      We may refuse or restrict access where required by law or where risk, compliance, or operational concerns arise.
                    </p>
                  </div>

                  <div className="divider" />

                  <div>
                    <h3 className="text-white text-lg font-semibold font-display mb-3">
                      2. Amendments
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed">
                      We reserve the right to modify these Terms at any time by updating them on our website. Continued use of the Services after updates constitutes acceptance of the revised Terms.
                    </p>
                  </div>

                  <div className="divider" />

                  <div>
                    <h3 className="text-white text-lg font-semibold font-display mb-3">
                      3. Account Registration
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-3">
                      Certain Services require account registration. When creating an account, you agree to:
                    </p>
                    <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Provide accurate information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Maintain account security</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Keep login credentials confidential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Accept responsibility for all activity under your account</span>
                      </li>
                    </ul>
                    <p className="text-[#888] text-sm leading-relaxed">
                      We may request identity verification or additional compliance information where required.
                    </p>
                  </div>

                  <div className="divider" />

                  <div>
                    <h3 className="text-white text-lg font-semibold font-display mb-3">
                      4. Risks & No Guarantee
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-3">
                      You acknowledge and understand that:
                    </p>
                    <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Investment and market participation involves risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Loss of capital may occur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Market conditions may change rapidly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Past performance does not guarantee future outcomes</span>
                      </li>
                    </ul>
                    <p className="text-[#D4AF37] text-sm font-semibold mb-3">
                      Gold Bridge Capital does not guarantee profits, returns, or specific results.
                    </p>
                    <p className="text-[#888] text-sm leading-relaxed">
                      You agree that participation in any strategy or service is entirely at your own risk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divider-gold" />

              {/* PART 2 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 2 — Limitation of Liability & Disclaimer
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  To the maximum extent permitted by law:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Services are provided on an "as is" and "as available" basis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>We make no warranties regarding uninterrupted or error-free operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>We are not liable for indirect, incidental, or consequential damages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>We are not responsible for losses resulting from market volatility, technology issues, or third-party services</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  Nothing in these Terms excludes liability where exclusion is prohibited by law.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 3 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 3 — Services
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white text-lg font-semibold font-display mb-3">
                      1. General Services
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-3">
                      Gold Bridge Capital provides structured access to investment-related services and educational information.
                    </p>
                    <p className="text-[#888] text-sm leading-relaxed mb-3">
                      We are:
                    </p>
                    <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Not a bank</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Not a broker-dealer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Not a tax advisor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Not providing personalized financial advice unless explicitly stated in writing</span>
                      </li>
                    </ul>
                    <p className="text-[#888] text-sm leading-relaxed">
                      Users remain responsible for their own financial decisions.
                    </p>
                  </div>

                  <div className="divider" />

                  <div>
                    <h3 className="text-white text-lg font-semibold font-display mb-3">
                      2. Platform Functionality
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-3">
                      Our Services may include:
                    </p>
                    <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Account onboarding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Capital allocation processes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Portfolio monitoring or reporting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1.5">•</span>
                        <span>Educational or informational materials</span>
                      </li>
                    </ul>
                    <p className="text-[#888] text-sm leading-relaxed">
                      We may modify or discontinue features at any time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divider-gold" />

              {/* PART 4 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 4 — Transactions & Execution
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  All instructions submitted by users are considered final once processed. You agree that:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Transactions may be irreversible once executed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Processing times may vary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Market conditions may affect execution or pricing</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  Gold Bridge Capital does not guarantee execution timing or outcomes.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 5 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 5 — User Responsibilities
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  You agree NOT to:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Use the Services for unlawful purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Provide false or misleading information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Attempt unauthorized access to systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Disrupt website functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Engage in fraudulent, abusive, or harmful activity</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  We may suspend or terminate accounts violating these Terms.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 6 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 6 — Intellectual Property
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  All website content, branding, logos, and materials remain the property of Gold Bridge Capital. You may not:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Copy or redistribute content without permission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Reverse engineer or modify website materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Use branding without written consent</span>
                  </li>
                </ul>
              </div>

              <div className="divider-gold" />

              {/* PART 7 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 7 — Website Information
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  Information provided on the website:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Is for informational purposes only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>May not always be complete or current</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Should not be solely relied upon for financial decisions</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  Users remain responsible for independent evaluation.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 8 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 8 — Account Suspension or Termination
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  We may suspend, restrict, or terminate access where:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Required by law or regulatory request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Fraud or misuse is suspected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Compliance concerns arise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Terms are violated</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  Where possible, notice will be provided.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 9 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 9 — Fees & Tax Responsibility
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  Users are solely responsible for:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Taxes arising from their activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Reporting obligations required by law</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  Gold Bridge Capital does not provide tax advice.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 10 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 10 — Communications
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  By using our Services, you agree to receive electronic communications including:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Account notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Policy updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Service announcements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Legal notices</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  You are responsible for maintaining accurate contact information.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 11 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 11 — Third-Party Services
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  Our Services may rely on third-party providers. We are not responsible for:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Third-party platform performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>External websites or services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Actions of independent service providers</span>
                  </li>
                </ul>
              </div>

              <div className="divider-gold" />

              {/* PART 12 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 12 — Prohibited Activities
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  Users may not engage in:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Illegal activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Fraudulent schemes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Misrepresentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Market abuse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Unauthorized commercial activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Activities that create excessive risk to the platform</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  We reserve the right to determine prohibited activities at our discretion.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 13 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 13 — Data & Privacy
                </h2>
                <p className="text-[#888] text-sm leading-relaxed">
                  Your use of the Services is also governed by our <a href="/privacy" className="text-[#D4AF37] hover:underline">Privacy Policy</a>, which explains how information is collected and processed.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 14 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 14 — Governing Law
                </h2>
                <p className="text-[#888] text-sm leading-relaxed">
                  These Terms shall be governed by applicable laws in the jurisdiction in which Gold Bridge Capital operates, unless otherwise required by law.
                </p>
              </div>

              <div className="divider-gold" />

              {/* PART 15 */}
              <div>
                <h2 className="text-[#D4AF37] text-base font-bold uppercase tracking-wider mb-6">
                  Part 15 — Entire Agreement
                </h2>
                <p className="text-[#888] text-sm leading-relaxed">
                  These Terms, together with our Privacy Policy and related legal notices, constitute the full agreement between you and Gold Bridge Capital.
                </p>
              </div>

              <div className="divider-gold" />

              {/* Contact */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  Contact Information
                </h2>
                <p className="text-[#D4AF37] text-sm font-semibold">
                  Gold Bridge Capital
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
