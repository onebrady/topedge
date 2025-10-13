/**
 * Customer Portal Landing Page
 * Two primary CTAs: New Customer and Existing Customer
 */

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/sonnys/session';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, LogIn } from 'lucide-react';

export default async function PortalPage() {
  // If already authenticated, redirect to dashboard
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect('/portal/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Car Wash Portal
        </h2>
        <p className="text-xl text-gray-600">
          Choose an option below to get started
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* New Customer Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 mx-auto">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-center">New Customer</CardTitle>
            <CardDescription className="text-center">
              Sign up for a new membership plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/portal/join">
              <Button className="w-full" size="lg">
                Get Started
              </Button>
            </Link>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Choose from multiple membership plans</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Instant activation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Manage your account online</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Existing Customer Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4 mx-auto">
              <LogIn className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center">Existing Customer</CardTitle>
            <CardDescription className="text-center">
              Sign in to manage your membership
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/portal/login">
              <Button className="w-full" size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>View membership details</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Check billing history</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Purchase add-ons</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
