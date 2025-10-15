/**
 * Checkout Page - Step 3 of Join Flow
 * Payment form for new customer checkout
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock } from 'lucide-react';

const checkoutSchema = z.object({
  // Customer Info
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must not exceed 50 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(100, 'Last name must not exceed 100 characters'),
  email: z.string().email('Please enter a valid email address').max(64, 'Email must not exceed 64 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be exactly 10 digits'),

  // Payment Info
  cardNumber: z.string().regex(/^[\d]{15,16}$/, 'Card number must be 15-16 digits (Visa, MasterCard, Amex, or Discover)'),
  expMonth: z.number().int().min(1, 'Month must be 1-12').max(12, 'Month must be 1-12'),
  expYear: z.number().int().min(new Date().getFullYear(), 'Card has expired'),
  securityCode: z.string().regex(/^[\d]{3,4}$/, 'CVV must be 3-4 digits'),
  cardFullName: z.string().min(2, 'Cardholder name must be at least 2 characters').max(50, 'Cardholder name must not exceed 50 characters'),

  // Billing Address
  street: z.string().min(1, 'Street address is required').max(50, 'Street address must not exceed 50 characters'),
  city: z.string().min(1, 'City is required').max(50, 'City must not exceed 50 characters'),
  state: z.string().regex(/^[A-Z]{2}$/, 'State must be 2 uppercase letters (e.g., FL, CA)'),
  postalCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Postal code must be 5 digits or 5+4 format (e.g., 12345 or 12345-6789)'),
  billingPhone: z.string().regex(/^[0-9]{10}$/, 'Phone must be exactly 10 digits'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [pendingOrderToken, setPendingOrderToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    // Get pending order token from sessionStorage
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('pendingOrderToken');
      if (!token) {
        router.push('/portal/join');
        return;
      }
      setPendingOrderToken(token);
    }
  }, []);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!pendingOrderToken) {
      setError('Order token not found. Please start over.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      // Convert 4-digit year to 2-digit year (e.g., 2025 -> 25)
      const twoDigitYear = data.expYear % 100;

      const payload = {
        pendingOrderToken,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        paymentInfo: {
          cardNumber: data.cardNumber.replace(/\s/g, ''),
          expMonth: data.expMonth,
          expYear: twoDigitYear,
          securityCode: data.securityCode,
          cardFullName: data.cardFullName,
          address: {
            address1: data.street,
            address2: '',
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            phone: data.billingPhone,
          },
        },
      };

      const response = await fetch('/api/ecom/shop/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.ok) {
        // Handle validation errors with details
        if (result.code === 'PayloadValidationError' && result.details) {
          if (Array.isArray(result.details)) {
            const errors = result.details.map((err: any) => ({
              field: err.path?.join('.') || 'unknown',
              message: err.message
            }));
            setValidationErrors(errors);
            setError('Please correct the validation errors below:');
          } else if (typeof result.details === 'object') {
            // Extract validation error messages from details object
            const errorMessages = Object.entries(result.details).map(([field, message]) => ({
              field: field,
              message: message as string
            }));
            setValidationErrors(errorMessages);
            setError('Please correct the following errors:');
          } else {
            setError(result.message || 'Payment failed. Please check your information and try again.');
          }
        } else {
          setError(result.message || 'Payment failed. Please check your information and try again.');
        }

        // Scroll to top to show error
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Store receipt info for confirmation page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('customerId', result.data.customerId);
        sessionStorage.setItem('receiptId', result.data.receiptId);
        sessionStorage.setItem('customerEmail', data.email);
      }

      // Redirect to confirmation
      router.push('/portal/join/done');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!pendingOrderToken) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h2>
        <p className="text-lg text-gray-600">Enter your payment information to finalize your membership</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register('firstName')} disabled={isLoading} />
                {errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register('lastName')} disabled={isLoading} />
                {errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register('email')} disabled={isLoading} />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="1234567890"
                maxLength={10}
                {...register('phone')}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Payment Information
            </CardTitle>
            <CardDescription>Your payment details are secure and encrypted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardFullName">Cardholder Name</Label>
              <Input
                id="cardFullName"
                placeholder="Name as it appears on card"
                {...register('cardFullName')}
                disabled={isLoading}
              />
              {errors.cardFullName && (
                <p className="text-sm text-red-600">{errors.cardFullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                {...register('cardNumber')}
                disabled={isLoading}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-600">{errors.cardNumber.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expMonth">Exp Month</Label>
                <Input
                  id="expMonth"
                  type="number"
                  placeholder="MM"
                  min="1"
                  max="12"
                  {...register('expMonth', { valueAsNumber: true })}
                  disabled={isLoading}
                />
                {errors.expMonth && (
                  <p className="text-sm text-red-600">{errors.expMonth.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="expYear">Exp Year</Label>
                <Input
                  id="expYear"
                  type="number"
                  placeholder="YYYY"
                  min={new Date().getFullYear()}
                  {...register('expYear', { valueAsNumber: true })}
                  disabled={isLoading}
                />
                {errors.expYear && (
                  <p className="text-sm text-red-600">{errors.expYear.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityCode">CVV</Label>
                <Input
                  id="securityCode"
                  type="text"
                  placeholder="123"
                  maxLength={4}
                  {...register('securityCode')}
                  disabled={isLoading}
                />
                {errors.securityCode && (
                  <p className="text-sm text-red-600">{errors.securityCode.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Address */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
            <CardDescription>Address associated with your payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input id="street" {...register('street')} disabled={isLoading} />
              {errors.street && (
                <p className="text-sm text-red-600">{errors.street.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city')} disabled={isLoading} />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="FL"
                  maxLength={2}
                  className="uppercase"
                  {...register('state')}
                  disabled={isLoading}
                />
                {errors.state && (
                  <p className="text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">ZIP Code</Label>
                <Input
                  id="postalCode"
                  placeholder="12345"
                  {...register('postalCode')}
                  disabled={isLoading}
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-600">{errors.postalCode.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingPhone">Phone</Label>
                <Input
                  id="billingPhone"
                  type="tel"
                  placeholder="1234567890"
                  maxLength={10}
                  {...register('billingPhone')}
                  disabled={isLoading}
                />
                {errors.billingPhone && (
                  <p className="text-sm text-red-600">{errors.billingPhone.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">{error}</p>
                {validationErrors.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {validationErrors.map((err, idx) => (
                      <li key={idx} className="text-sm">
                        <strong>{err.field}:</strong> {err.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              'Complete Purchase'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
