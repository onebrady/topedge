"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, DollarSign, Check } from "lucide-react";
import { LocationData } from "@/lib/data/locationsData";

interface LocationHeroProps {
  location: LocationData;
  heroImage: string;
}

const LocationHero = ({ location, heroImage }: LocationHeroProps) => {
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${location.address}, ${location.city}, ${location.state} ${location.zip}`
    )}`;
  };

  return (
    <section 
      className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-cover bg-center -mt-[83px] pt-[83px]"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Badge variant="outline" className="text-white border-white/50 bg-white/10 backdrop-blur-sm">
            {location.name}, {location.state}
          </Badge>
          {location.badge && (
            <Badge className="bg-primary text-primary-foreground">
              {location.badge}
            </Badge>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-[780px] mx-auto">
          {location.description}
        </h1>

        <p className="text-xl text-white/90 mb-8">
          {location.address} • Free Vacuums • Light & Music Show • Members-Only Lane
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {location.id === "port-richey" ? (
            <Button size="lg" className="gradient-primary text-lg px-8" asChild>
              <a href="https://topedgecarwash.mywashaccount.com/">
                Join Today - Special Pricing
              </a>
            </Button>
          ) : (
            <Button size="lg" className="gradient-primary text-lg px-8" asChild>
              <a href="/contact">
                Join Unlimited - Starting at $25/mo
              </a>
            </Button>
          )}
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white/20"
            asChild
          >
            <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
              <Navigation className="mr-2 h-5 w-5" />
              Get Directions
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white/20"
            onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Pricing
          </Button>
        </div>

        <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-success" />
            <span>Locally Owned</span>
          </div>
          {location.id === "port-richey" && (
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>First 3 Months $10/Month for New Members</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-success" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-success" />
            <span>Works at All 3 Locations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
