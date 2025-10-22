import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Three Tampa Bay Locations | Top Edge Car Washes",
  description: "Find your nearest Top Edge Car Wash: Wesley Chapel, Tampa, or Port Richey. Signature light show, free vacuums, unlimited membership from $25/mo!",
  alternates: {
    canonical: "https://topedgecarwashes.com/locations",
  },
  openGraph: {
    title: "Three Tampa Bay Locations | Top Edge Car Washes",
    description: "Find your nearest Top Edge Car Wash: Wesley Chapel, Tampa, or Port Richey. Signature light show, free vacuums, unlimited membership from $25/mo!",
    url: "https://topedgecarwashes.com/locations",
    type: "website",
    images: [
      {
        url: "https://topedgecarwashes.com/og-image.jpg",
        alt: "Top Edge Car Wash Locations",
      },
    ],
  },
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
