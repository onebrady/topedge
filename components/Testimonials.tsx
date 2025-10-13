import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Wesley Chapel",
    rating: 5,
    text: "The light show is amazing! My kids love it and beg to go through the car wash now. Plus my car looks incredible.",
  },
  {
    name: "Mike Rodriguez",
    location: "Tampa",
    rating: 5,
    text: "Best car wash I've ever used. The belt system is genius and the members-only lane saves so much time. Worth every penny!",
  },
  {
    name: "Jennifer K.",
    location: "Port Richey",
    rating: 5,
    text: "Love the license plate recognition - no stickers on my windshield! The unlimited plan is perfect for Florida weather.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What <span className="text-gradient">Tampa Bay Drivers</span> Are Saying
          </h2>
          <div className="flex items-center justify-center gap-2 text-xl">
            <Star className="h-6 w-6 fill-primary text-primary" />
            <span className="font-bold">4.8</span>
            <span className="text-muted-foreground">Average Rating Across All Locations</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">500+ Five-Star Reviews</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
