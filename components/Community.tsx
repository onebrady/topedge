import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import Link from "next/link";

const Community = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Community Story */}
          <Card className="overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src="/assets/community-hero.webp"
                alt="Top Edge Car Wash Location"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Locally Owned, Tampa Bay Proud</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We're a family-owned business dedicated to providing Tampa Bay with the best car wash
                experience. Our commitment to the community, environmental stewardship, and exceptional
                service sets us apart from national chains.
              </p>
              <p className="text-muted-foreground">
                Every wash supports local jobs and local families. Thank you for choosing Top Edge!
              </p>
            </CardContent>
          </Card>

          {/* Right: Fundraising Program */}
          <Card className="border-2 border-accent/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold">Support Your Organization</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Schools, sports teams, and nonprofits can earn funds through our Wash-to-Give program.
                It's an easy way to raise money while providing a valuable service to supporters.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm">Easy fundraising for schools and teams</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm">No upfront costs or commitments</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm">Simple online tracking and management</span>
                </div>
              </div>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/fundraising">Apply for Wash-to-Give Event</Link>
              </Button>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Also interested in:</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Fleet Services
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Partnerships
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Community;
