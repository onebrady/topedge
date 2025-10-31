"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const FoundersClubBanner = () => {
  const scrollToFoundersClub = () => {
    document.getElementById('founders-club')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-4 border-y-4 border-black animate-pulse">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-black font-bold text-lg md:text-xl flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="h-5 w-5" />
              <span>PORT RICHEY EXCLUSIVE</span>
              <Sparkles className="h-5 w-5" />
            </p>
            <p className="text-black font-semibold">
              First 3 Months Only $10/Month + $10 OFF for Life
            </p>
          </div>
          <Button 
            onClick={scrollToFoundersClub}
            size="lg" 
            className="bg-black text-yellow-400 hover:bg-gray-900 font-bold"
          >
            Claim Your Founder's Club Benefits
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoundersClubBanner;
