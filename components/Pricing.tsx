"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StructuredData from "@/components/seo/StructuredData";
import { generateProductSchema } from "@/lib/seo/schemas";

const Pricing = () => {
  const unlimitedSchema = generateProductSchema(
    "Unlimited Club",
    25,
    [
      "Unlimited daily washes",
      "License Plate Recognition",
      "Members-Only express lane",
      "No long-term contract",
      "Valid at all 3 Tampa Bay locations",
      "Free vacuums and air included"
    ]
  );

  return (
    <>
      <StructuredData data={unlimitedSchema} />
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple Pricing, <span className="text-gradient">No Hidden Fees</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Unlimited Club - Highlighted */}
          <Card className="border-2 border-primary shadow-glow relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="gradient-primary px-6 py-1 shadow-lg">
                <Star className="h-4 w-4 mr-1 fill-current" />
                MOST POPULAR
              </Badge>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-3xl mb-2">Unlimited Club</CardTitle>
              <CardDescription className="text-lg">Wash every day</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gradient">$25</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Wash every day - unlimited washes</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>No long-term contract required</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>License Plate Recognition - no stickers</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Members-Only express lane</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Cancel anytime online</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Works at all 3 Tampa Bay locations</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full gradient-primary hover:opacity-90 shadow-glow mt-6"
                onClick={() => window.location.href = '/contact'}
              >
                Join Unlimited Club
              </Button>
            </CardContent>
          </Card>

          {/* Single Wash Options */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Single Wash</CardTitle>
              <CardDescription className="text-lg">Pay as you go</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold">$12</span>
                <span className="text-muted-foreground">+</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Multiple wash levels available</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Premium protection & shine</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Free vacuums & air included</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Rain-repellent coating</span>
                </div>
              </div>
              <div className="bg-muted border border-border rounded-lg p-4 mt-4">
                <p className="text-sm font-medium text-foreground text-center">
                  💡 Wash 2x per month? Unlimited pays for itself!
                </p>
              </div>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full mt-6"
                onClick={() => window.location.href = '/locations'}
              >
                View Locations
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
