import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Wash Fundraiser - Top Edge Car Washes",
  description: "Raise funds for your organization with Top Edge Car Wash. No upfront costs, 50% commission, easy online platform. Perfect for schools, sports teams, and nonprofits.",
  alternates: {
    canonical: "https://topedgecarwashes.com/fundraising",
  },
  openGraph: {
    title: "Car Wash Fundraiser - Top Edge Car Washes",
    description: "Raise funds for your organization with Top Edge Car Wash. No upfront costs, 50% commission, easy online platform. Perfect for schools, sports teams, and nonprofits.",
    url: "https://topedgecarwashes.com/fundraising",
    type: "website",
    images: [
      {
        url: "https://topedgecarwashes.com/og-image.jpg",
        alt: "Top Edge Car Wash Fundraising Program",
      },
    ],
  },
};

export default function FundraisingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
