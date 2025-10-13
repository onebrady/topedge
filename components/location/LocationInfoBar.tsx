import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationData } from "@/lib/data/locationsData";

interface LocationInfoBarProps {
  location: LocationData;
}

const LocationInfoBar = ({ location }: LocationInfoBarProps) => {
  const getDirectionsUrl = () => {
    // Use specific URL for Port Richey location
    if (location.id === "port-richey") {
      return "https://www.google.com/maps/dir/?api=1&destination=8326%20US%20Highway%2019%2C%20Port%20Richey%2C%20FL%2034668";
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${location.address}, ${location.city}, ${location.state} ${location.zip}`
    )}`;
  };

  return (
    <section className="bg-secondary/30 py-6 border-b">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Address</p>
              <p className="text-sm text-muted-foreground mb-2">
                {location.address}<br />
                {location.city}, {location.state} {location.zip}
              </p>
              <Button 
                size="sm" 
                variant="link" 
                className="p-0 h-auto"
                asChild
              >
                <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
                  Get Directions →
                </a>
              </Button>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Hours</p>
              <p className="text-sm text-muted-foreground">
                Open Today: 8:00 AM - 8:00 PM
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Contact</p>
              <a 
                href={`tel:${location.phone}`} 
                className="text-sm text-muted-foreground hover:text-primary block"
              >
                {location.phone}
              </a>
              <a 
                href={`mailto:${location.email}`} 
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {location.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationInfoBar;
