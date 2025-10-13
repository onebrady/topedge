import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Three Tampa Bay Locations | Top Edge Car Washes",
  description: "Find your nearest Top Edge Car Wash - Wesley Chapel, Tampa, or Port Richey. All locations feature our signature light show, free vacuums, and Unlimited membership options.",
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
