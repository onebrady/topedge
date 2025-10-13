"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DollarSign,
  Smartphone,
  CreditCard,
  BarChart3,
  CarFront,
  CheckCircle2,
  FileText,
  Settings,
  Megaphone,
  Trophy,
  GraduationCap,
  Music,
  Users,
  Church,
  School,
  Sparkles,
  Heart,
} from "lucide-react";
import { useEffect } from "react";

export default function Fundraising() {
  useEffect(() => {
    // Load Fillout embed script
    const script = document.createElement('script');
    script.src = 'https://server.fillout.com/embed/v1/';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                CARWASH FUNDRAISER
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground italic mb-8">
                Bringing the community together one wash at a time
              </p>
              <Button size="lg" className="gradient-primary" asChild>
                <a href="#apply">Start Your Fundraiser Today</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                About Our Fundraising Program
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Top Edge Car Wash is dedicated to making a positive impact in the community beyond just washing cars. As a business that is locally owned and operated, we are deeply invested in the well-being of the communities we serve. That's why Top Edge Car Wash is now providing a simple way for organizations to raise funds. Through our car wash fundraising program, you can avoid the challenges of organizing a traditional fundraiser car wash and entrust our team to take care of everything!
              </p>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">No Upfront Costs</h3>
                    <p className="text-sm text-muted-foreground">
                      Start fundraising with zero investment
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <DollarSign className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">50% Commission</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep half of every sale
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <Smartphone className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">Easy Online Platform</h3>
                    <p className="text-sm text-muted-foreground">
                      Sell washes digitally
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <CreditCard className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">Weekly Payouts</h3>
                    <p className="text-sm text-muted-foreground">
                      Get funds deposited automatically
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <BarChart3 className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">Real-time Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your progress instantly
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <CarFront className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">No Physical Work</h3>
                    <p className="text-sm text-muted-foreground">
                      We handle all the washing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

              <div className="space-y-8">
                {/* Step 1 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        1
                      </div>
                      <CardTitle className="text-2xl">Complete a Fundraising Request Form</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3 mb-4">
                      <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Submit Your Application</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Fill out the form below and share some details about your organization and the purpose behind your fundraising efforts</li>
                          <li>• <strong>Approval Time:</strong> Within 3 business days</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        2
                      </div>
                      <CardTitle className="text-2xl">Set Up Your Account</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3 mb-4">
                      <Settings className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Get Connected</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Once your request is given the green light, you'll receive a confirmation email with instructions for the next steps</li>
                          <li>• You will be connected to a secure payment platform (Stripe) that will deposit funds straight into your account weekly</li>
                          <li>• No dealing with checks or any upfront costs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        3
                      </div>
                      <CardTitle className="text-2xl">Spread the Word and Begin Selling Washes!</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3 mb-4">
                      <Megaphone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Launch Your Campaign</h4>
                        <ul className="space-y-1 text-muted-foreground mb-4">
                          <li>• Receive a personalized webpage link featuring your organization's name</li>
                          <li>• Easy method for supporters to buy car washes that support your cause</li>
                        </ul>
                        <h5 className="font-semibold mb-2">Get shareable promotional materials:</h5>
                        <ul className="space-y-1 text-muted-foreground mb-4">
                          <li>• Custom promotional flyer</li>
                          <li>• Social media graphics</li>
                          <li>• QR Code for easy sharing</li>
                          <li>• Access to live dashboard</li>
                        </ul>
                        <h5 className="font-semibold mb-2">Track your success:</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Monitor your fundraising progress</li>
                          <li>• Identify top sellers</li>
                          <li>• Track your goal achievement</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Perfect For</h2>
              <p className="text-center text-muted-foreground mb-12">Who Can Participate?</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Trophy className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Sports Teams</h3>
                    <p className="text-sm text-muted-foreground">
                      Fund uniforms, equipment, and travel
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Nonprofit Organizations</h3>
                    <p className="text-sm text-muted-foreground">
                      Support your mission
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Clubs & Groups</h3>
                    <p className="text-sm text-muted-foreground">
                      Finance activities and events
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Music className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Bands</h3>
                    <p className="text-sm text-muted-foreground">
                      Cover instrument and performance costs
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Church className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Churches</h3>
                    <p className="text-sm text-muted-foreground">
                      Support community programs
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <GraduationCap className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Fraternities & Sororities</h3>
                    <p className="text-sm text-muted-foreground">
                      Fund chapter activities
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <School className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Schools</h3>
                    <p className="text-sm text-muted-foreground">
                      Support educational programs
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Sparkles className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Community Groups</h3>
                    <p className="text-sm text-muted-foreground">
                      Make a positive impact
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Apply Today</h2>
              <p className="text-center text-muted-foreground mb-8">
                Ready to start your fundraiser? Complete the application form below:
              </p>

              <Card>
                <CardContent className="p-6">
                  <div
                    style={{width: '100%', height: '500px'}}
                    data-fillout-id="cYpa2rm6Qmus"
                    data-fillout-embed-type="standard"
                    data-fillout-inherit-parameters
                    data-fillout-dynamic-resize
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How soon can I start the fundraiser?</AccordionTrigger>
                  <AccordionContent>
                    Your customer webpage will be activated within 3 business days of approval.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do we receive our funds?</AccordionTrigger>
                  <AccordionContent>
                    As part of the setup process, you will connect a Stripe account to your bank account. Stripe deposits funds weekly throughout the length of the fundraiser event. You will receive any funds collected from the previous Wednesday through the upcoming Thursday on the following Friday. The funds will be deposited directly from Stripe into whatever account the fundraiser enters when signing up for Stripe.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How do we track our progress?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">You'll have access to a real-time dashboard where you can:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>View total sales and earnings</li>
                      <li>Track individual supporter contributions</li>
                      <li>Monitor progress toward your goal</li>
                      <li>Export reports for your records</li>
                      <li>See top performers in your organization</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What payment forms are accepted?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Your supporters can purchase washes using all major credit and debit cards, including:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Visa</li>
                      <li>Mastercard</li>
                      <li>American Express</li>
                      <li>Discover</li>
                      <li>Digital wallets (Apple Pay, Google Pay)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Are there any upfront costs?</AccordionTrigger>
                  <AccordionContent>
                    No! There are absolutely no upfront costs or hidden fees.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>What percentage of sales do we receive?</AccordionTrigger>
                  <AccordionContent>
                    The fundraiser makes 50% of the sales! This is one of the highest commission rates in the industry.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>How long can our fundraiser run?</AccordionTrigger>
                  <AccordionContent>
                    Fundraisers can run for 30-90 days, with extensions available upon request.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>Is there a minimum sales requirement?</AccordionTrigger>
                  <AccordionContent>
                    No minimum sales required! Every wash sold helps your organization.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>Which locations participate?</AccordionTrigger>
                  <AccordionContent>
                    All Top Edge Car Wash locations in the Tampa Bay area participate in the fundraising program.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>What type of washes can supporters purchase?</AccordionTrigger>
                  <AccordionContent>
                    Supporters can purchase our standard wash packages at regular retail prices, with your organization receiving 50% commission on each sale.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Making a Difference in Our Community
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic mb-4">
                      "Our soccer team raised $3,000 in just one month!"
                    </p>
                    <p className="font-semibold">- Wesley Chapel Youth Soccer</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic mb-4">
                      "The easiest fundraiser we've ever done. No car washing in the hot sun!"
                    </p>
                    <p className="font-semibold">- Local High School Band</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic mb-4">
                      "Weekly deposits made budgeting so simple for our organization."
                    </p>
                    <p className="font-semibold">- Community Nonprofit</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid sm:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">$50,000+</p>
                  <p className="text-muted-foreground">Raised for Local Organizations</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">100+</p>
                  <p className="text-muted-foreground">Successful Fundraisers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
                  <p className="text-muted-foreground">Car Washes Sold for Good Causes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Get Started Today!</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ready to raise funds the easy way?
              </p>

              <Button size="lg" className="gradient-primary mb-12" asChild>
                <a href="#apply">Apply Now</a>
              </Button>

              <div className="border-t border-border pt-8">
                <h3 className="font-bold text-xl mb-4">Have questions before applying?</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>📧 Email: info@topedgecarwashes.com</p>
                  <p>📱 Call: (813) 295-7000</p>
                  <p>📍 Visit any Top Edge Car Wash Location</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}
