import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveMarkets from "@/components/LiveMarkets";
import About from "@/components/About";
import Ecommerce from "@/components/Ecommerce";
import Services from "@/components/Services";
import GetStartedSteps from "@/components/GetStartedSteps";
import WhyLuno from "@/components/WhyLuno";
import Performance from "@/components/Performance";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import WhyTrustUs from "@/components/WhyTrustUs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import MarketTicker from "@/components/MarketTicker";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import AuthModal from "@/components/AuthModal";
import Chatbot from "@/components/Chatbot";
import Newsletter from "@/components/Newsletter";
import HashScroller from "@/components/HashScroller";
import { absoluteUrl, buildMetadata, defaultDescription, siteName } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Premium Asset Management",
  description: defaultDescription,
  path: "/",
  keywords: [
    "Goldbridge Capital",
    "premium asset management",
    "wealth management",
    "investment platform",
    "capital growth",
  ],
});

export default function Home() {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/#webpage"),
    name: `${siteName} | Premium Asset Management`,
    url: absoluteUrl("/"),
    description: defaultDescription,
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    about: {
      "@id": absoluteUrl("/#organization"),
    },
  };

  return (
    <div className="min-h-screen bg-[#060608]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema),
        }}
      />
      <HashScroller />
      <PageLoader />
      <CursorGlow />
      <ScrollProgress />
      <AuthModal />
      <Chatbot />
      <Navbar />
      <MarketTicker />
      <main className="relative pt-[108px]">
        <Hero />
        <LiveMarkets />
        <About />
        <Ecommerce />
        <Services />
        <GetStartedSteps />
        <WhyLuno />
        <Performance />
        <InvestmentCalculator />
        <Plans />
        <WhyTrustUs />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
