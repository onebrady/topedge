import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationHero from "@/components/location/LocationHero";
import FoundersClubBanner from "@/components/location/FoundersClubBanner";
import LocationInfoBar from "@/components/location/LocationInfoBar";
import FoundersClubSection from "@/components/location/FoundersClubSection";
import LocationPricing from "@/components/location/LocationPricing";
import FreeAmenities from "@/components/location/FreeAmenities";
import HowItWorks from "@/components/HowItWorks";
import { locationsData } from "@/lib/data/locationsData";

const location = locationsData.find(loc => loc.id === "port-richey")!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

export default function PortRicheyLocation() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <LocationHero location={location} heroImage="/assets/location-bg.webp" />
        <FoundersClubBanner />
        <LocationInfoBar location={location} />
        <FoundersClubSection />
        <LocationPricing isFoundersClub={true} locationName={location.name} />
        <FreeAmenities />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}
