import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import WeatherBar from "@/components/WeatherBar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Top Edge Car Washes | Premium Express Car Wash - Tampa Bay",
  description: "Experience Florida's premier car wash with unlimited plans starting at $25/month. License plate recognition, members-only lanes, and free vacuums at 3 Tampa Bay locations.",
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
    title: "Top Edge Car Washes | Premium Express Car Wash - Tampa Bay",
    description: "Experience Florida's premier car wash with unlimited plans starting at $25/month. Three convenient Tampa Bay locations.",
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
    title: "Top Edge Car Washes | Premium Express Car Wash",
    description: "Experience Florida's premier car wash with unlimited plans starting at $25/month.",
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
        <Script
          src="https://links.resultreach.com/js/form_embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
