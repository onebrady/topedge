import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { CreditCard, UserCircle, Pause, XCircle, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Manage Your Membership - Top Edge Car Wash",
  description: "Manage your Top Edge Car Wash unlimited membership. Update payment methods, pause or cancel your membership, and modify vehicle information.",
};

export default function ManageMembership() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://topedgecarwashes.com' },
    { name: 'Manage Membership', url: 'https://topedgecarwashes.com/manage-membership' },
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Manage Your <span className="text-gradient">Membership</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Update your account details, payment information, or make changes to your unlimited membership
              </p>

              {/* Port Richey Callout */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-sm text-blue-900 mb-3">
                  For Port Richey location use this link
                </p>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <a
                    href="https://topedgecarwash.mywashaccount.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Port Richey Member Login
                  </a>
                </Button>
              </div>
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
                      <h2 className="text-2xl font-bold mb-4 text-center">Request Changes</h2>
                      <p className="text-muted-foreground text-center mb-6">
                        Fill out the form below and we'll process your request within 1-2 business days
                      </p>
                      <div className="w-full" style={{ minHeight: '1093px' }}>
                        <iframe
                          src="https://links.resultreach.com/widget/form/AJTJKgD8vVo78JdS9LSG"
                          style={{ width: '100%', height: '1093px', border: 'none', borderRadius: '3px' }}
                          id="inline-AJTJKgD8vVo78JdS9LSG"
                          data-layout="{'id':'INLINE'}"
                          data-trigger-type="alwaysShow"
                          data-trigger-value=""
                          data-activation-type="alwaysActivated"
                          data-activation-value=""
                          data-deactivation-type="neverDeactivate"
                          data-deactivation-value=""
                          data-form-name="Manage My Unlimited Membership"
                          data-height="1093"
                          data-layout-iframe-id="inline-AJTJKgD8vVo78JdS9LSG"
                          data-form-id="AJTJKgD8vVo78JdS9LSG"
                          title="Manage My Unlimited Membership"
                        />
                      </div>
                      <Script src="https://links.resultreach.com/js/form_embed.js" strategy="lazyOnload" />
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
