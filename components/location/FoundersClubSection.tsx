"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Gift, Check, Sparkles } from "lucide-react";
import { useEffect } from "react";

const FoundersClubSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://links.resultreach.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="founders-club" className="py-16 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-400 text-black text-lg px-6 py-3 mb-4">
            <Sparkles className="mr-2 h-5 w-5" />
            PORT RICHEY EXCLUSIVE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Become a Port Richey Founder<br />Lock In Lifetime Savings!
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of our founding member program and enjoy exclusive pricing for life. Only at our Port Richey location.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Offer 1: Text-to-Claim */}
          <Card className="border-2 border-yellow-400">
            <CardHeader className="text-center">
              <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Get Your First Wash FREE - Worth $30!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full">
                <iframe
                  src="https://links.resultreach.com/widget/form/3F9lPl7vI1R0yapdUAHb"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                  id="inline-3F9lPl7vI1R0yapdUAHb" 
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Free Wash"
                  data-height="492"
                  data-layout-iframe-id="inline-3F9lPl7vI1R0yapdUAHb"
                  data-form-id="3F9lPl7vI1R0yapdUAHb"
                  title="Free Wash"
                />
              </div>
            </CardContent>
          </Card>

          {/* Offer 2: Founder's Club Membership */}
          <Card className="border-2 border-primary shadow-elegant">
            <CardHeader className="text-center">
              <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">First 3 Months Only $10/Month<br />for New Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="font-semibold text-center mb-4">Founder's Club Benefits:</p>

                {[
                  'First 3 Months Only $10/Month for New Members',
                  'Unlimited car washes — come as often as you want',
                  'Dedicated member express lane for faster service',
                  'Easy license plate recognition — no stickers or cards needed',
                  'Free vacuums, towels, air guns & cleaning stations',
                  'No contracts — cancel anytime',
                  'Use your membership at all Top Edge locations',
                  'Eco-friendly water recycling and safe cleaning products'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-center font-bold text-lg mb-2 text-primary">
                  Limited-time founding member offer!
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Lock in your savings today
                </p>
              </div>

              <Button size="lg" className="w-full gradient-primary" asChild>
                <a href="https://topedgecarwash.mywashaccount.com/">
                  Founders Club Special
                </a>
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Founder pricing locked in for life - as long as membership remains active. Silver package not eligible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FoundersClubSection;
