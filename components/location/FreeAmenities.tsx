import { Card, CardContent } from "@/components/ui/card";
import { Fan, Bug, Sparkles, SprayCanIcon, Droplets, Wind } from "lucide-react";

const amenities = [
  {
    icon: Fan,
    title: "High-Suction Vacuums",
    description: "Large, shaded vacuum area with powerful suction",
  },
  {
    icon: Bug,
    title: "Self-Service Bug Cleaning",
    description: "Pre-wash bug prep stations",
  },
  {
    icon: Sparkles,
    title: "Mat & Rug Cleaners",
    description: "Clean your floor mats while you wait",
  },
  {
    icon: SprayCanIcon,
    title: "Air Fresheners & Towels",
    description: "Complimentary finishing touches",
  },
  {
    icon: Droplets,
    title: "Window Cleaner Dispensers",
    description: "Streak-free window cleaning supplies",
  },
  {
    icon: Wind,
    title: "Air Guns",
    description: "Clean air vents and hard-to-reach spots",
  },
];

const FreeAmenities = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Every Wash Includes Free Extras
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <Card key={index} className="hover:shadow-elegant transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{amenity.title}</h3>
                  <p className="text-sm text-muted-foreground">{amenity.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreeAmenities;
