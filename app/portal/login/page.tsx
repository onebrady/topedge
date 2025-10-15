/**
 * Existing Customer Login Page
 * Verify account with email, agent (RFID/LPR), and last 4 of card
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(64, 'Email must not exceed 64 characters'),
  productCode: z.string()
    .min(3, 'RFID/License plate must be at least 3 characters')
    .max(50, 'RFID/License plate must not exceed 50 characters')
    .regex(/^[A-Za-z0-9-]+$/, 'RFID/License plate must contain only letters, numbers, and hyphens'),
  lastFourCreditCard: z.string()
    .length(4, 'Must be exactly 4 digits')
    .regex(/^\d{4}$/, 'Must be 4 numeric digits'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ecom/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.ok) {
        setError(result.message || 'Login failed. Please check your information and try again.');
        return;
      }

      // Success - redirect to dashboard
      router.push('/portal/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sign In to Your Account</CardTitle>
          <CardDescription>
            Enter your account details to access your membership dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Product Code (RFID or License Plate) */}
            <div className="space-y-2">
              <Label htmlFor="productCode">RFID Number or License Plate</Label>
              <Input
                id="productCode"
                type="text"
                placeholder="ABC123 or RFID number"
                {...register('productCode')}
                disabled={isLoading}
                className="uppercase"
              />
              {errors.productCode && (
                <p className="text-sm text-red-600">{errors.productCode.message}</p>
              )}
              <p className="text-sm text-gray-500">
                This is the RFID tag or license plate associated with your account
              </p>
            </div>

            {/* Last 4 of Credit Card */}
            <div className="space-y-2">
              <Label htmlFor="lastFourCreditCard">Last 4 Digits of Credit Card</Label>
              <Input
                id="lastFourCreditCard"
                type="text"
                placeholder="####"
                maxLength={4}
                {...register('lastFourCreditCard')}
                disabled={isLoading}
              />
              {errors.lastFourCreditCard && (
                <p className="text-sm text-red-600">{errors.lastFourCreditCard.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Use the last 4 digits of the card on file with your membership
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                <strong>Security Notice:</strong> We use your email, vehicle identifier, and last 4
                digits of your card to securely verify your identity. We will issue a secure session
                just for you.
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
