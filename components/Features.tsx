import { Settings, Camera, Shield, Wind, Zap, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Settings,
    title: "Safer, Easier Entry",
    description: "Dual belt system protects wheels - no track damage",
  },
  {
    icon: Camera,
    title: "Automatic Check-In",
    description: "No windshield stickers, no cards - just drive through",
  },
  {
    icon: Shield,
    title: "Premium Protection",
    description: "Rain-repellent, shine enhancer, and protective coating",
  },
  {
    icon: Wind,
    title: "Complete Interior Finish",
    description: "High-suction vacuums and air stations at every location",
  },
  {
    icon: Zap,
    title: "Skip the Wait",
    description: "In and out fast with dedicated member entrance",
  },
  {
    icon: Music,
    title: "Light & Music Show",
    description: "Unique tunnel experience the whole family will love",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why <span className="text-gradient">Top Edge</span> Stands Out
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our premium features and technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group hover:shadow-elegant hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
