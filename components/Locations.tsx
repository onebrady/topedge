"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Navigation, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const locations = [
  {
    name: "Wesley Chapel",
    address: "28221 STATE ROAD 54 Wesley Chapel, FL 33543",
    phone: "(813) 295-7000",
    hours: "Mon-Sat: 8am-8pm, Sun: 9am-7pm",
    status: "Open Now",
    isOpen: true,
    directionsUrl: "https://maps.app.goo.gl/P5kspr14SdXJTyX27",
    locationUrl: "/locations/wesley-chapel-florida",
  },
  {
    name: "Tampa",
    address: "5416 West Waters Avenue, Tampa, FL 33634",
    phone: "(813) 295-7000",
    hours: "Mon-Sat: 8am-8pm, Sun: 9am-7pm",
    status: "Open Now",
    isOpen: true,
    directionsUrl: "https://maps.app.goo.gl/1ZhEajSRtuzTAG4h9",
    locationUrl: "/locations/tampa-florida",
  },
  {
    name: "Port Richey",
    address: "8326 US 19, Port Richey, FL 34668",
    phone: "(813) 295-7000",
    hours: "Mon-Sat: 8am-8pm, Sun: 9am-7pm",
    status: "Open Now",
    isOpen: true,
    directionsUrl: "https://maps.app.goo.gl/xhPh7ZmvLjDHo3YUA",
    locationUrl: "/locations/port-richey-florida",
  },
];

const Locations = () => {
  return (
    <section id="locations" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Nearest <span className="text-gradient">Top Edge</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three convenient Tampa Bay locations to serve you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {locations.map((location) => (
            <Card key={location.name} className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-2xl">{location.name}</CardTitle>
                  <Badge variant={location.isOpen ? "default" : "secondary"} className="bg-success">
                    {location.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{location.phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{location.hours}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 gradient-primary"
                    onClick={() => window.open(location.directionsUrl, '_blank')}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.location.href = location.locationUrl}
                  >
                    Choose Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted border-2 border-dashed border-border">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-2 text-center">Expanding Across Tampa Bay</h3>
            <p className="text-muted-foreground mb-6 text-center">Be the first to know</p>
            <div className="w-full">
              <iframe
                src="https://links.resultreach.com/widget/form/AyOi0bVE2C8WGE5sCuzy"
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                id="inline-AyOi0bVE2C8WGE5sCuzy" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="New Locations"
                data-height="472"
                data-layout-iframe-id="inline-AyOi0bVE2C8WGE5sCuzy"
                data-form-id="AyOi0bVE2C8WGE5sCuzy"
                title="New Locations"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Locations;
