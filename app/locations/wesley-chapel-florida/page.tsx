import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationHero from "@/components/location/LocationHero";
import LocationInfoBar from "@/components/location/LocationInfoBar";
import LocationPricing from "@/components/location/LocationPricing";
import FreeAmenities from "@/components/location/FreeAmenities";
import HowItWorks from "@/components/HowItWorks";
import MembershipBanner from "@/components/MembershipBanner";
import { locationsData } from "@/lib/data/locationsData";

const location = locationsData.find(loc => loc.id === "wesley-chapel")!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

export default function WesleyChapelLocation() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <LocationHero location={location} heroImage="/assets/wesley-chapel-hero.webp" />
        <MembershipBanner />
        <LocationInfoBar location={location} />
        <LocationPricing locationName={location.name} />
        <FreeAmenities />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}
