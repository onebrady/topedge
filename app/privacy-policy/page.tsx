import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Top Edge Car Washes",
  description: "Privacy Policy for Top Edge Car Washes. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                Top Edge Car Washes ("we," "us," or "our") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website or use our services.
              </p>
            </section>

            <section className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">SMS and Mobile Communications Privacy</h2>
              <p className="text-muted-foreground mb-4">
                <strong className="text-blue-900 dark:text-blue-100">Your mobile information is protected:</strong> We want to be clear about how we handle your phone number and SMS opt-in data.
              </p>
              <div className="bg-white dark:bg-slate-900 p-4 rounded border border-blue-300 dark:border-blue-700 mb-4">
                <p className="font-bold text-blue-900 dark:text-blue-100">
                  Mobile information (phone numbers and SMS opt-in data) will NOT be shared with third parties or affiliates for marketing or promotional purposes.
                </p>
              </div>
              <p className="text-muted-foreground mb-4">
                When you provide your mobile phone number and opt-in to receive SMS communications from Top Edge Car Washes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>You consent to receive text messages about service updates, promotional offers, appointment reminders, and other information related to Top Edge Car Washes</li>
                <li>Message frequency varies based on your membership and preferences</li>
                <li>Message and data rates may apply from your mobile carrier</li>
                <li>Your phone number is stored securely and used only for direct communications from Top Edge Car Washes</li>
                <li>You can opt-out at any time by texting <strong>STOP</strong> to any message you receive from us</li>
                <li>For help, text <strong>HELP</strong> or contact us at (813) 295-7000</li>
              </ul>
              <p className="text-muted-foreground">
                We respect your privacy and will never sell, rent, or share your mobile phone number with third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Contact Information:</strong> Email addresses and phone numbers when you sign up for our services or contact us</li>
                <li><strong>Communication Preferences:</strong> Your preferences for receiving communications from us</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website through Google Analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide, maintain, and improve our services</li>
                <li>Communicate with you via SMS and email about our services, promotions, and updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Customer Relationship Management</h2>
              <p className="text-muted-foreground">
                We use ResultReach as our Customer Relationship Management (CRM) platform to manage
                customer data and communications. Your email addresses and phone numbers are stored
                securely in this system to facilitate our communications with you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Analytics and Tracking</h2>
              <p className="text-muted-foreground">
                We use Google Analytics to track and analyze website activity. This helps us understand
                how visitors use our website and improve user experience. Google Analytics collects
                information such as your IP address, browser type, pages visited, and time spent on pages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Communications</h2>
              <p className="text-muted-foreground mb-4">
                By providing your email address and/or phone number, you consent to receive communications
                from us via email and SMS. These communications may include service updates, promotional
                offers, and other information related to Top Edge Car Washes.
              </p>
              <p className="text-muted-foreground">
                <strong>Important:</strong> As stated in our SMS and Mobile Communications Privacy section above,
                your mobile phone number and SMS opt-in data will NOT be shared with third parties or affiliates
                for marketing purposes. You can opt-out of marketing communications at any time by following the
                unsubscribe instructions in our emails or replying <strong>STOP</strong> to our SMS messages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However,
                no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not directed to children under the age of 13. We do not knowingly collect
                personal information from children under 13. If you believe we have collected information
                from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground mt-4">
                <li><strong>Email:</strong> info@topedgecarwashes.com</li>
                <li><strong>Phone:</strong> (813) 295-7000</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
