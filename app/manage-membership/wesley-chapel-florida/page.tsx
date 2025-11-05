import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { CreditCard, UserCircle, Pause, XCircle, Car } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Your Membership - Wesley Chapel, FL - Top Edge Car Wash",
  description: "Manage your Top Edge Car Wash unlimited membership at our Wesley Chapel, Florida location. Update payment methods, pause or cancel your membership, and modify vehicle information.",
};

export default function ManageMembershipWesleyChapel() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://topedgecarwashes.com' },
    { name: 'Manage Membership', url: 'https://topedgecarwashes.com/manage-membership' },
    { name: 'Wesley Chapel', url: 'https://topedgecarwashes.com/manage-membership/wesley-chapel-florida' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-lg text-primary font-semibold mb-4">Wesley Chapel, Florida</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Manage Your <span className="text-gradient">Membership</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Update your account details, payment information, or make changes to your unlimited membership
              </p>
            </div>
          </div>
        </section>

        {/* Main Content - Two Column Layout */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-start">

                {/* Left Column - Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Member Services</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      We make it easy to manage your membership online. Fill out the form to request changes to your account.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Update Payment Method</h3>
                        <p className="text-muted-foreground">
                          Change your credit card or update billing information for your monthly membership
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Update Vehicle Information</h3>
                        <p className="text-muted-foreground">
                          Add a new vehicle, update license plate numbers, or manage RFID tags
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Pause className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Pause Membership</h3>
                        <p className="text-muted-foreground">
                          Temporarily pause your membership if you're traveling or won't be using the service
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <XCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Cancel Membership</h3>
                        <p className="text-muted-foreground">
                          No contracts, no hassle. Cancel your membership anytime with no phone calls required
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Account Updates</h3>
                        <p className="text-muted-foreground">
                          Update your email, phone number, or other account information
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2 text-blue-900">Need Immediate Help?</h3>
                    <p className="text-blue-800 mb-3">
                      For urgent issues, visit any of our locations or call us directly during business hours.
                    </p>
                    <a href="/locations" className="text-primary font-semibold hover:underline">
                      View All Locations →
                    </a>
                  </div>
                </div>

                {/* Right Column - Form Embed */}
                <div className="lg:sticky lg:top-24">
                  <div className="bg-card rounded-lg shadow-elegant overflow-hidden border border-border">
                    <div className="p-6">
                      <div className="w-full">
                        <iframe
                          src="https://topedge.app.rinsed.co/ticket_forms/100"
                          className="rinsed-frame"
                          style={{ border: 'none', display: 'block', width: '100%', height: '1075px' }}
                          title="Manage Membership - Wesley Chapel"
                          scrolling="no"
                        />
                      </div>
                      <Script src="https://riptidetopedge.app.rinsed.co/frame_parent.js" strategy="afterInteractive" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
