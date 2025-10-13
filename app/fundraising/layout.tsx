import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Wash Fundraiser - Top Edge Car Washes",
  description: "Raise funds for your organization with Top Edge Car Wash. No upfront costs, 50% commission, easy online platform. Perfect for schools, sports teams, and nonprofits.",
};

export default function FundraisingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
