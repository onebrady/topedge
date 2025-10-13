"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Navigation, Phone, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { locationsData } from "@/lib/data/locationsData";
import Link from "next/link";

export default function LocationsHub() {
  const getDirectionsUrl = (address: string, city: string, state: string, zip: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${address}, ${city}, ${state} ${zip}`
    )}`;
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section
          className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-cover bg-center -mt-[83px] pt-[83px]"
          style={{ backgroundImage: "url(/assets/location-bg.webp)" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-[780px] mx-auto">
              Three Tampa Bay Locations Serving You
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Find your nearest Top Edge Car Wash - Wesley Chapel, Tampa, or Port Richey.
              All locations feature our signature light show experience, free vacuums, and Unlimited membership options.
            </p>

            <Button
              size="lg"
              className="gradient-primary"
              onClick={() => {
                document.getElementById('locations-section')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Find My Nearest Location
            </Button>
          </div>
        </section>

        {/* Interactive Location Cards */}
        <section id="locations-section" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {locationsData.map((location) => (
                <Card key={location.id} className="hover:shadow-elegant transition-all duration-300 flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-2xl">{location.name}</CardTitle>
                        {location.badge && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {location.badge}
                          </Badge>
                        )}
                      </div>
                      <Badge variant="default" className="bg-success">
                        {location.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {location.address}, {location.city}, {location.state} {location.zip}
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{location.hours}</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-sm text-muted-foreground hover:text-primary">
                        {location.phone}
                      </a>
                    </div>

                    {/* Amenities Icons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-muted-foreground">
                      {location.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <Check className="h-3 w-3 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 mt-auto">
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="flex-1 gradient-primary"
                      >
                        <a
                          href={getDirectionsUrl(location.address, location.city, location.state, location.zip)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="mr-2 h-4 w-4" />
                          Directions
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={`/locations/${location.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Benefits Snapshot */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                One Membership, All Locations
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Works Everywhere</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your membership at all three Tampa Bay locations
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Check className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">No Contracts</h3>
                  <p className="text-sm text-muted-foreground">
                    Cancel anytime online - no hassle, no phone calls
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Navigation className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">License Plate Recognition</h3>
                  <p className="text-sm text-muted-foreground">
                    No stickers, no cards - just drive through
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Members-Only Lane</h3>
                  <p className="text-sm text-muted-foreground">
                    Skip the wait with dedicated member entrance
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="gradient-primary">
                <Link href="/contact">Join Unlimited - Starting at $25/mo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Coming Soon Locations */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Expanding Across Tampa Bay
              </h2>
              <p className="text-xl text-muted-foreground">
                Be the first to know
              </p>
            </div>

            <Card className="bg-muted border-2 border-dashed border-border max-w-2xl mx-auto">
              <CardContent className="py-12">
                <h3 className="text-2xl font-bold mb-4 text-center">Be the First to Know</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Sign up to receive exclusive opening day offers when we expand to your area
                </p>
                <div className="w-full">
                  <iframe
                    src="https://links.resultreach.com/widget/form/AyOi0bVE2C8WGE5sCuzy"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                    id="inline-AyOi0bVE2C8WGE5sCuzy"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="New Locations"
                    data-height="472"
                    data-layout-iframe-id="inline-AyOi0bVE2C8WGE5sCuzy"
                    data-form-id="AyOi0bVE2C8WGE5sCuzy"
                    title="New Locations"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
