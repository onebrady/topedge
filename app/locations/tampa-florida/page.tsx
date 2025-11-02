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
import StructuredData from "@/components/seo/StructuredData";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";

const location = locationsData.find(loc => loc.id === "tampa")!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
  alternates: {
    canonical: `https://topedgecarwashes.com/locations/${location.slug}`,
  },
  openGraph: {
    title: location.metaTitle,
    description: location.metaDescription,
    url: `https://topedgecarwashes.com/locations/${location.slug}`,
    type: 'website',
    images: [
      {
        url: 'https://topedgecarwashes.com/og-image.jpg',
        alt: `Top Edge Car Wash - ${location.name}`,
      },
    ],
  },
  other: {
    'geo.position': `${location.coordinates.lat};${location.coordinates.lng}`,
    'geo.placename': `${location.city}, ${location.state}`,
    'geo.region': `US-${location.state}`,
  },
};

export default function TampaLocation() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://topedgecarwashes.com' },
    { name: 'Locations', url: 'https://topedgecarwashes.com/locations' },
    { name: location.name, url: `https://topedgecarwashes.com/locations/${location.slug}` },
  ]);

  const localBusiness = generateLocalBusinessSchema(location);

  return (
    <>
      <StructuredData data={localBusiness} />
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen bg-background">
        <Header />
        <LocationHero location={location} heroImage="/assets/tampa-hero.webp" />
        <MembershipBanner />
        <LocationInfoBar location={location} />
        <LocationPricing locationName={location.name} joinUrl="/contact" />
        <FreeAmenities />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}
