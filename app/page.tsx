import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MembershipBanner from "@/components/MembershipBanner";
import Locations from "@/components/Locations";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Community from "@/components/Community";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <MembershipBanner />
        <Locations />
        <Pricing />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Community />
        <FAQ />
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}
