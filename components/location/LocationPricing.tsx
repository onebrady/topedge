import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { pricingPackages } from "@/lib/data/locationsData";

interface LocationPricingProps {
  isFoundersClub?: boolean;
  locationName: string;
}

const LocationPricing = ({ isFoundersClub = false, locationName }: LocationPricingProps) => {
  // Separate premiere package from others
  const premierePackage = pricingPackages.find(pkg => pkg.name === "Graphene X4");
  const otherPackages = pricingPackages.filter(pkg => pkg.name !== "Graphene X4");

  // Helper to get location-specific pricing
  const getPackagePrice = (pkg: any, priceType: 'single' | 'monthly' | 'founderMonthly') => {
    if (pkg.locationPricing && pkg.locationPricing[locationName]) {
      return pkg.locationPricing[locationName][priceType] ?? pkg[priceType];
    }
    return pkg[priceType];
  };

  return (
    <section id="pricing" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {locationName} Car Wash Pricing
          </h2>
          {isFoundersClub && (
            <p className="text-xl text-muted-foreground">
              Founder's Club Pricing Available
            </p>
          )}
        </div>

        {/* Premiere Package - Full Width */}
        {premierePackage && (
          <Card className="border-primary border-2 shadow-glow mb-8 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary text-primary-foreground text-base px-4 py-1.5">
                      ⭐ PREMIERE PACKAGE
                    </Badge>
                  </div>
                  <CardTitle className="text-4xl mb-3">{premierePackage.name}</CardTitle>
                  <p className="text-muted-foreground mb-6">Our ultimate protection and shine package</p>
                  
                  <div className="flex gap-8 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Single Wash</p>
                      <p className="text-3xl font-bold">${premierePackage.single} <span className="text-sm font-normal text-muted-foreground">+ tax</span></p>
                    </div>
                    
                    {premierePackage.monthly && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Monthly Unlimited</p>
                        {isFoundersClub && premierePackage.founderMonthly ? (
                          <div>
                            <p className="text-sm line-through text-muted-foreground">${premierePackage.monthly}/mo</p>
                            <p className="text-4xl font-bold text-primary">
                              ${premierePackage.founderMonthly}<span className="text-sm font-normal">/mo</span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-4xl font-bold">${premierePackage.monthly}<span className="text-sm font-normal text-muted-foreground">/mo + tax</span></p>
                        )}
                      </div>
                    )}
                  </div>

                  {isFoundersClub && premierePackage.founderMonthly && premierePackage.monthly && (
                    <Badge variant="outline" className="border-primary text-primary mb-4">
                      Save ${premierePackage.monthly - premierePackage.founderMonthly}/mo for life
                    </Badge>
                  )}
                </div>

                <div>
                  <div className="space-y-3 mb-6">
                    <p className="font-semibold mb-4">Premium Features Include:</p>
                    {premierePackage.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </div>
                    ))}
                  </div>

                  {premierePackage.monthly && (
                    <Button size="lg" className="w-full gradient-primary text-lg py-6" asChild>
                      <a href="/contact">
                        {isFoundersClub ? 'Join as Founder Member' : 'Join Unlimited'}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Packages - Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherPackages.map((pkg, index) => (
            <Card 
              key={index} 
              className="flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">Single Wash</p>
                    <p className="text-2xl font-bold">${getPackagePrice(pkg, 'single')} <span className="text-sm font-normal">+ tax</span></p>
                  </div>
                  
                  {(pkg.monthly || getPackagePrice(pkg, 'monthly')) && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Monthly Unlimited</p>
                      {isFoundersClub && (pkg.founderMonthly || getPackagePrice(pkg, 'founderMonthly')) ? (
                        <div>
                          <p className="text-sm line-through text-muted-foreground">${getPackagePrice(pkg, 'monthly')}/mo</p>
                          <p className="text-3xl font-bold text-primary">
                            ${getPackagePrice(pkg, 'founderMonthly')}<span className="text-sm font-normal">/mo + tax</span>
                          </p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            Save ${(getPackagePrice(pkg, 'monthly') || 0) - (getPackagePrice(pkg, 'founderMonthly') || 0)}/mo for life
                          </Badge>
                        </div>
                      ) : (
                        <p className="text-3xl font-bold">${getPackagePrice(pkg, 'monthly')}<span className="text-sm font-normal">/mo + tax</span></p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <p className="font-semibold text-sm mb-3">Includes:</p>
                  {pkg.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  {(pkg.monthly || getPackagePrice(pkg, 'monthly')) ? (
                    <Button className="w-full gradient-primary" asChild>
                      <a href="/contact">
                        {isFoundersClub ? 'Join as Founder Member' : 'Join Unlimited'}
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/contact">
                        Buy Single Wash
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {isFoundersClub && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              * Founder pricing locked in for life - as long as membership remains active
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationPricing;
