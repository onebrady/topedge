import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MembershipBanner from "@/components/MembershipBanner";
import Locations from "@/components/Locations";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import StructuredData from "@/components/seo/StructuredData";
import { generateOrganizationSchema } from "@/lib/seo/schemas";

// Lazy load below-the-fold components for better performance
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96" />,
});
const Community = dynamic(() => import("@/components/Community"), {
  loading: () => <div className="h-96" />,
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />
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
    </>
  );
}
