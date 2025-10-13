"use client";

import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden -mt-[83px] pt-[83px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-car-wash.jpg"
          alt="Top Edge Car Wash Experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 dark:from-background/98 dark:via-background/90 dark:to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Shine Fast. Free Vacuums.{" "}
            <span className="text-gradient">Three Tampa Bay Locations.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl">
            Exterior express wash with license-plate recognition. Join the Unlimited Club and wash every day.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="gradient-primary hover:opacity-90 shadow-glow text-lg px-8"
              onClick={() => window.location.href = '/contact'}
            >
              Join Unlimited
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8"
              onClick={() => window.location.href = '/locations'}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Find a Location
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
              <span className="text-foreground/90">Locally Owned</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
              <span className="text-foreground/90">Members-Only Lane</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
              <span className="text-foreground/90">Free Vacuums & Air</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
              <span className="text-foreground/90">Eco-Friendly Tech</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
