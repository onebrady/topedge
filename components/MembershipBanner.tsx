"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const MembershipBanner = () => {
  return (
    <section className="gradient-primary py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-primary-foreground">
            <Sparkles className="h-6 w-6 flex-shrink-0" />
            <div className="text-center md:text-left">
              <p className="text-xl md:text-2xl font-bold">
                Unlimited Washes Starting at $25/month
              </p>
              <p className="text-sm md:text-base opacity-90">
                No Contract • Members-Only Lane • No Stickers • Cancel anytime online
              </p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-background text-primary hover:bg-background/90 shadow-lg px-8 whitespace-nowrap"
            onClick={() => window.location.href = '/contact'}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MembershipBanner;
