import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import WeatherBar from "@/components/WeatherBar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Top Edge Car Washes | Premium Express Car Wash - Tampa Bay",
  description: "Experience Florida's premier car wash with unlimited plans starting at $25/month. License plate recognition, members-only lanes, and free vacuums at 3 Tampa Bay locations.",
  keywords: ["car wash", "Tampa Bay", "Wesley Chapel", "unlimited car wash", "express car wash", "eco-friendly car wash"],
  authors: [{ name: "Top Edge Car Washes" }],
  openGraph: {
    title: "Top Edge Car Washes | Premium Express Car Wash - Tampa Bay",
    description: "Experience Florida's premier car wash with unlimited plans starting at $25/month. Three convenient Tampa Bay locations.",
    type: "website",
    images: [
      {
        url: "https://topedgecarwashes.com/og-image.jpg",
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
        <Script src="https://links.resultreach.com/js/form_embed.js" />
      </body>
    </html>
  );
}
