"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketTicker from "@/components/MarketTicker";

export default function PrivacyPolicy() {
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
                Privacy <span className="gold-text">Policy</span>
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
                Gold Bridge Capital ("Gold Bridge", "we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us through our website and services ("Service"). This Privacy Policy explains what information we collect, how we use it, and how we protect it.
              </p>

              <div className="divider-gold" />

              {/* Section 1 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  1. Information You Provide to Us
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-4">
                  We collect information you choose to provide when using our website or services.
                </p>

                <h3 className="text-[#D4AF37] text-sm font-semibold mb-3">
                  Registration & Account Information
                </h3>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  When registering or submitting information through our platform, you may be required to provide:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Full name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Phone number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Country of residence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Login credentials (username and password)</span>
                  </li>
                </ul>

                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  Where required for onboarding or compliance purposes, we may also request:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Date of birth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Residential address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Government-issued identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Financial suitability or verification information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Proof of identity or supporting documentation</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed mb-6">
                  This information helps us maintain regulatory compliance and verify user identity.
                </p>

                <h3 className="text-[#D4AF37] text-sm font-semibold mb-3">
                  Investment & Financial Information
                </h3>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  To support participation in investment activities or related services, we may collect:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Bank account details (such as account or routing numbers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Wallet addresses or payment information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Transaction details related to deposits or withdrawals</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed mb-6">
                  Financial data is used solely to facilitate platform activity and service functionality.
                </p>

                <h3 className="text-[#D4AF37] text-sm font-semibold mb-3">
                  Communications
                </h3>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  If you contact us directly, we may collect:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Email correspondence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Messages or attachments you send</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Customer support communication records</span>
                  </li>
                </ul>
              </div>

              <div className="divider" />

              {/* Section 2 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  2. Information Collected Automatically
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  When you use our Service, certain information may be collected automatically through cookies and similar technologies, including:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>IP address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Browser type and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Device type and identifiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Operating system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Pages visited and time spent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Referral links or sources</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  This information helps us:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Improve website performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Maintain security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Detect fraud or misuse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Understand user behaviour and trends</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  You may disable cookies through your browser settings, although some site functions may be affected.
                </p>
              </div>

              <div className="divider" />

              {/* Section 3 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  We may use collected information to:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Verify user identity and eligibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Facilitate onboarding and account management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Operate, maintain, and improve our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Respond to enquiries and provide support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Communicate updates, policy changes, or service notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Improve platform functionality and user experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Conduct analytics and performance measurement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Maintain compliance with applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Prevent fraud and enhance security</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  We may also use aggregated, anonymised data for business analysis and reporting.
                </p>
              </div>

              <div className="divider" />

              {/* Section 4 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  4. How We Share Information
                </h2>
                <p className="text-[#D4AF37] text-sm font-semibold mb-3">
                  We do not sell personal information.
                </p>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  We may share information only where necessary with:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Trusted service providers supporting website hosting, analytics, security, or operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Compliance, identity verification, or anti-fraud partners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Professional advisors (legal, accounting, compliance)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Regulatory or governmental authorities when required by law</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>A successor entity in the event of a merger, acquisition, or business restructuring</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  All third parties are required to maintain confidentiality and protect your data.
                </p>
              </div>

              <div className="divider" />

              {/* Section 5 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  5. Analytics & Third-Party Services
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  We may use third-party analytics tools to understand website performance and user activity. These providers may use cookies or similar tracking technologies to collect anonymous usage information.
                </p>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  Such tools help us:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Analyse trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Improve usability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Enhance site performance</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  Third-party services operate under their own privacy policies.
                </p>
              </div>

              <div className="divider" />

              {/* Section 6 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  6. Data Security
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  We implement reasonable technical, organisational, and administrative safeguards to protect information against:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Unauthorised access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Loss, misuse, or alteration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Unlawful disclosure</span>
                  </li>
                </ul>
                <p className="text-[#888] text-sm leading-relaxed">
                  While we take security seriously, no system can guarantee absolute protection. Users are responsible for maintaining the confidentiality of their login credentials.
                </p>
              </div>

              <div className="divider" />

              {/* Section 7 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  7. Your Choices
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-3">
                  You may:
                </p>
                <ul className="text-[#888] text-sm leading-relaxed space-y-1.5 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Decline to provide certain information (which may limit access to some features)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Opt out of marketing communications via the unsubscribe link provided in emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1.5">•</span>
                    <span>Contact us to update or correct personal information</span>
                  </li>
                </ul>
              </div>

              <div className="divider" />

              {/* Section 8 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  8. Use by Minors
                </h2>
                <p className="text-[#888] text-sm leading-relaxed">
                  Our services are not intended for individuals under the age of eighteen (18). We do not knowingly collect personal information from minors.
                </p>
              </div>

              <div className="divider" />

              {/* Section 9 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  9. International Data Transfers
                </h2>
                <p className="text-[#888] text-sm leading-relaxed">
                  Your information may be stored or processed in countries outside your country of residence. By using our Service, you consent to the transfer and processing of your data in such jurisdictions.
                </p>
              </div>

              <div className="divider" />

              {/* Section 10 */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="text-[#888] text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date. Continued use of the Service indicates acceptance of the updated policy.
                </p>
              </div>

              <div className="divider-gold" />

              {/* Contact */}
              <div>
                <h2 className="text-white text-lg font-semibold font-display mb-4">
                  Contact Us
                </h2>
                <p className="text-[#888] text-sm leading-relaxed">
                  For questions regarding this Privacy Policy or data handling practices:
                </p>
                <p className="text-[#D4AF37] text-sm font-semibold mt-2">
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
