import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import WeatherBar from "@/components/WeatherBar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Top Edge Car Wash | Tampa Bay - Unlimited $25/mo",
  description: "Tampa Bay's premier car wash! Unlimited plans from $25/mo with license plate recognition, members-only lanes, free vacuums. 3 locations serving you.",
  authors: [{ name: "Top Edge Car Washes" }],
  icons: {
    icon: [
      { url: "/assets/cropped-favicon-192x192.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: [
      { url: "/assets/cropped-favicon-192x192.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    shortcut: "/assets/cropped-favicon-192x192.jpg",
  },
  alternates: {
    canonical: "https://topedgecarwashes.com",
  },
  openGraph: {
    title: "Top Edge Car Wash | Tampa Bay - Unlimited $25/mo",
    description: "Tampa Bay's premier car wash! Unlimited plans from $25/mo with license plate recognition, members-only lanes, free vacuums. 3 locations serving you.",
    url: "https://topedgecarwashes.com",
    siteName: "Top Edge Car Washes",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://topedgecarwashes.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Top Edge Car Washes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Edge Car Wash | Tampa Bay - Unlimited $25/mo",
    description: "Tampa Bay's premier car wash! Unlimited plans from $25/mo with license plate recognition, members-only lanes, free vacuums.",
    images: ["https://topedgecarwashes.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <WeatherBar />
          {children}
        </Providers>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6EJD5FZC4E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6EJD5FZC4E');
          `}
        </Script>

        <Script
          src="https://links.resultreach.com/js/form_embed.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://links.resultreach.com/js/external-tracking.js"
          data-tracking-id="tk_a5dbd432a6e44042ba3a92c34f1bbee7"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
