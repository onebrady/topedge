import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Top Edge Car Washes",
  description: "Terms of Service for Top Edge Car Washes. Review our terms and conditions for using our services.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Top Edge Car Washes services, you agree to be bound by these Terms
                of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Services</h2>
              <p className="text-muted-foreground">
                Top Edge Car Washes provides express tunnel car wash services at multiple locations across
                Tampa Bay. We offer both single-wash options and unlimited membership plans. Services are
                subject to availability and may vary by location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Membership Terms</h2>
              <p className="text-muted-foreground mb-4">
                Our unlimited membership plans include the following terms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Memberships are billed monthly on a recurring basis</li>
                <li>No long-term contracts required - cancel anytime</li>
                <li>Valid at all Top Edge Car Wash locations</li>
                <li>License plate recognition technology for convenient access</li>
                <li>Membership is non-transferable and for personal use only</li>
                <li>One vehicle per membership</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Payment and Billing</h2>
              <p className="text-muted-foreground mb-4">
                By signing up for a membership, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete payment information</li>
                <li>Authorize recurring monthly charges to your payment method</li>
                <li>Update your payment information as needed to ensure uninterrupted service</li>
                <li>Pay all applicable taxes and fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Cancellation and Refunds</h2>
              <p className="text-muted-foreground">
                You may cancel your membership at any time through your account or by contacting customer
                service. Cancellations will be effective at the end of your current billing period. We do
                not provide refunds for partial months or unused washes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Vehicle Eligibility and Restrictions</h2>
              <p className="text-muted-foreground mb-4">
                Our car wash facilities accommodate most standard vehicles. However, we reserve the right
                to refuse service for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Vehicles with excessive height, width, or length</li>
                <li>Vehicles with loose, damaged, or protruding parts</li>
                <li>Vehicles with aftermarket modifications that may be damaged by the wash process</li>
                <li>Vehicles that may damage our equipment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                While we take great care in providing quality car wash services, we are not liable for
                damage to vehicles that occurs as a result of pre-existing conditions, including but not
                limited to loose trim, damaged antennas, cracked windshields, or loose emblems. We recommend
                customers inspect their vehicles and secure or remove any loose items before entering the wash.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Communications</h2>
              <p className="text-muted-foreground">
                By providing your contact information, you consent to receive communications from us via
                email and SMS. These communications may include service updates, promotional offers, and
                account information. We use ResultReach as our CRM platform to manage these communications.
                You can opt-out of marketing communications at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Follow all posted instructions and safety guidelines</li>
                <li>Respect our staff and other customers</li>
                <li>Not interfere with our equipment or operations</li>
                <li>Use our facilities only for their intended purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Privacy</h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy Policy to understand how we
                collect, use, and protect your personal information. We use Google Analytics to track
                website activity and improve user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on our website, including text, graphics, logos, and images, is the property
                of Top Edge Car Washes and is protected by copyright and trademark laws. You may not use,
                reproduce, or distribute any content without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Modifications to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately
                upon posting to our website. Your continued use of our services after any changes constitutes
                acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the State of Florida, without regard to its conflict
                of law provisions. Any disputes arising from these Terms or your use of our services shall be
                resolved in the courts of Tampa Bay, Florida.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground mt-4">
                <li><strong>Email:</strong> info@topedgecarwashes.com</li>
                <li><strong>Phone:</strong> (813) 295-7000</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be unenforceable or invalid, that provision
                shall be limited or eliminated to the minimum extent necessary so that these Terms shall
                otherwise remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
