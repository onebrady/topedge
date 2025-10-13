import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Leaf, Music, Users, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Top Edge Car Wash | Family-Owned Tampa Bay Car Wash",
  description: "Learn about Top Edge Car Wash, a locally owned, family-operated business serving Tampa Bay with state-of-the-art technology, eco-friendly practices, and exceptional customer service.",
};

export default function AboutUs() {
  const values = [
    {
      icon: Sparkles,
      title: "State-of-the-Art Technology",
      description: "We've invested in the latest car wash equipment, featuring an innovative Dual Belt system that replaces conventional conveyors to keep your wheels and tires safe. Our facilities utilize license plate recognition technology for seamless member access—no ugly windshield stickers required!"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Commitment",
      description: "Environmental responsibility is at the heart of everything we do. We employ advanced water recycling techniques and use top-of-the-line branded chemicals that are gentle on your vehicle while being tough on road grime."
    },
    {
      icon: Music,
      title: "Unique Entertainment Experience",
      description: "We've created a one-of-a-kind light and music show that transforms a routine car wash into an entertaining experience. It's an experience that keeps families coming back time and time again."
    },
    {
      icon: Users,
      title: "Exceptional Customer Service",
      description: "Our friendly, on-site attendants are always ready to assist you. We pride ourselves on providing fast, friendly, and customer-centric service with every visit."
    }
  ];

  const locations = [
    { name: "Wesley Chapel", address: "28221 State Road 54, Wesley Chapel, FL 33543", link: "/locations/wesley-chapel-florida" },
    { name: "Tampa", address: "5416 West Waters Avenue, Tampa, FL 33634", link: "/locations/tampa-florida" },
    { name: "Port Richey", address: "8326 US 19, Port Richey, FL 34668", link: "/locations/port-richey-florida" }
  ];

  const comingSoon = [
    "Wesley Chapel (SR 56)",
    "Zephyrhills",
    "Lutz",
    "Tampa (North Palms Village Place)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to Top Edge Car Wash
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              A locally owned, family-operated business proudly serving the Tampa Bay area
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're more than just a car wash—we're a community partner dedicated to providing an exceptional customer experience while caring for your vehicle and our environment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                Founded with a vision to revolutionize the car wash experience, Top Edge Car Wash combines cutting-edge technology with old-fashioned customer service. As a local family-owned business, we understand the importance of treating every customer like family and every vehicle with the care it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Sets Us Apart</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Monthly Wash Club Membership</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Treat your vehicle right with our Monthly Unlimited Wash Club, starting at just $25 per month.
            </p>
            <Card className="mb-8">
              <CardContent className="pt-6">
                <ul className="space-y-3 text-left max-w-2xl mx-auto">
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Unlimited washes every day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>No long-term contracts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Priority access through our "Members Only" lane</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Convenient license plate recognition technology</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Button asChild size="lg">
              <Link href="/contact">Join the Wash Club Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Locations</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We currently serve the Tampa Bay community with multiple locations
              </p>
            </div>

            <div className="grid gap-6 mb-12">
              {locations.map((location, index) => (
                <Card key={index} className="hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2">{location.name}</h3>
                        <p className="text-muted-foreground">{location.address}</p>
                      </div>
                      <Button asChild variant="outline">
                        <Link href={location.link}>View Location</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-bold text-2xl mb-4 text-center">Coming Soon</h3>
                <p className="text-center text-muted-foreground mb-4">
                  We're expanding to better serve you with upcoming locations in:
                </p>
                <ul className="space-y-2 max-w-md mx-auto">
                  {comingSoon.map((location, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{location}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-muted-foreground">(813) 295-7000</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-muted-foreground">info@topedgecarwashes.com</p>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://www.facebook.com/TopEdgeCarWashWesleyChapel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-8 w-8" />
              </a>
              <a
                href="https://www.instagram.com/topedgecarwashwesleychapel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-8 w-8" />
              </a>
            </div>
            <p className="text-muted-foreground italic">
              Thank you for supporting a local family-owned business. We look forward to serving you and keeping your vehicle looking its best!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
