import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveMarkets from "@/components/LiveMarkets";
import About from "@/components/About";
import Ecommerce from "@/components/Ecommerce";
import Services from "@/components/Services";
import GetStartedSteps from "@/components/GetStartedSteps";
import WhyMoonPay from "@/components/WhyMoonPay";
import Performance from "@/components/Performance";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import WhyTrustUs from "@/components/WhyTrustUs";
import CTA from "@/components/CTA";
import MarketTicker from "@/components/MarketTicker";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import AuthModal from "@/components/AuthModal";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CursorGlow />
      <ScrollProgress />
      <AuthModal />
      <Chatbot />
      <Navbar />
      <MarketTicker />
      <main className="relative noise-overlay pt-[108px]">
        <Hero />
        <LiveMarkets />
        <About />
        <Ecommerce />
        <Services />
        <GetStartedSteps />
        <WhyMoonPay />
        <Performance />
        <InvestmentCalculator />
        <Plans />
        <WhyTrustUs />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
