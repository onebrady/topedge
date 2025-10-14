import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Three Tampa Bay Locations | Top Edge Car Washes",
  description: "Find your nearest Top Edge Car Wash - Wesley Chapel, Tampa, or Port Richey. All locations feature our signature light show, free vacuums, and Unlimited membership options.",
  alternates: {
    canonical: "https://topedgecarwashes.com/locations",
  },
  openGraph: {
    title: "Three Tampa Bay Locations | Top Edge Car Washes",
    description: "Find your nearest Top Edge Car Wash - Wesley Chapel, Tampa, or Port Richey. All locations feature our signature light show, free vacuums, and Unlimited membership options.",
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
