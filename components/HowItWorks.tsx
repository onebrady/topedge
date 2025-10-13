import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "1",
    title: "Roll Onto the Belt",
    description: "Our dual belt system gently guides your vehicle - safer than traditional tracks",
    image: "/assets/roll-onto-the-belt.webp",
  },
  {
    number: "2",
    title: "Enjoy the Tunnel Experience",
    description: "Sit back and enjoy our unique light & music show while we wash",
    image: "/assets/enjoy-the-tunnel-experience.webp",
  },
  {
    number: "3",
    title: "Free Vacuums & Finish",
    description: "Complete your clean with complimentary vacuums, air guns, and towels",
    image: "/assets/free-vacuums-and-finish.webp",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Getting Your Wash <span className="text-gradient">is Easy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            In and out in under 10 minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <Card key={step.number} className="relative overflow-hidden group hover:shadow-elegant transition-shadow">
              {step.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      step.number === "1" ? "object-bottom" : ""
                    }`}
                  />
                </div>
              )}
              <CardContent className={step.image ? "p-6" : "p-6 min-h-[240px] flex flex-col"}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary text-primary-foreground text-2xl font-bold mb-4 shadow-glow">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Large vehicles welcome • Average time: In and out in under 10 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
