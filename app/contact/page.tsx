import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MembershipBanner from "@/components/MembershipBanner";
import Locations from "@/components/Locations";
import StructuredData from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Contact Us - Top Edge Car Wash | Tampa Bay Locations",
  description: "Get in touch with Top Edge Car Wash. Contact us for questions about memberships, locations, or car wash services across Tampa Bay.",
};

export default function Contact() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://topedgecarwashes.com' },
    { name: 'Contact', url: 'https://topedgecarwashes.com/contact' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
        <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions about memberships, services, or locations? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-lg shadow-elegant overflow-hidden border border-border">
              <div className="p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Send Us a Message</h2>
                <div className="w-full" style={{ minHeight: '492px' }}>
                  <iframe
                    src="https://links.resultreach.com/widget/form/1A2IIZRUaTvbz2pQ7SUu"
                    style={{ width: '100%', height: '492px', border: 'none', borderRadius: '3px' }}
                    id="inline-1A2IIZRUaTvbz2pQ7SUu"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Contact"
                    data-height="492"
                    data-layout-iframe-id="inline-1A2IIZRUaTvbz2pQ7SUu"
                    data-form-id="1A2IIZRUaTvbz2pQ7SUu"
                    title="Contact Form"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Banner */}
      <MembershipBanner />

      {/* Locations */}
      <Locations />

        <Footer />
      </div>
    </>
  );
}
