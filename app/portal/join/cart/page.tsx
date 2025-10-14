/**
 * Build Order Page - Step 2 of Join Flow
 * Create detailed pending order, handle LPR if required
 */

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MapPin } from 'lucide-react';

const cartSchema = z.object({
  licensePlate: z.string()
    .regex(/^[A-Za-z0-9]{3,10}$/, 'License plate must be 3-10 alphanumeric characters')
    .optional()
    .or(z.literal('')),
  discountCode: z.string().optional(),
  siteCode: z.string().min(1, 'Please select a site'),
});

type CartFormData = z.infer<typeof cartSchema>;

interface PendingOrder {
  token: string;
  totalAmount: number;
  subTotal: number;
  totalTax: number;
  proratedDiscountAmount?: number;
}

function CartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const siteCodeFromUrl = searchParams.get('siteCode');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null);
  const [requiresLPR, setRequiresLPR] = useState(false);
  const [sites, setSites] = useState<Array<{ code: string; name: string }>>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CartFormData>({
    resolver: zodResolver(cartSchema),
    defaultValues: {
      siteCode: siteCodeFromUrl || 'DEF', // Default to Top Edge Car Wash
    },
  });

  useEffect(() => {
    if (!planId) {
      router.push('/portal/join');
      return;
    }
    fetchSites();
    checkPlanRequirements();
  }, [planId]);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/backoffice/site/list');
      const result = await response.json();
      // Extract sites from nested structure: result.data.data.sites
      const sitesData = result.ok && result.data?.data?.sites;
      if (sitesData && Array.isArray(sitesData)) {
        setSites(sitesData);
      }
    } catch (err) {
      console.error('Failed to fetch sites:', err);
    }
  };

  const checkPlanRequirements = async () => {
    try {
      const response = await fetch('/api/ecom/inventory/recurring');
      const result = await response.json();

      if (result.ok) {
        const plan = result.data.find((p: any) => p.id === planId);
        if (plan?.lprEnabled) {
          setRequiresLPR(true);
        }
      }
    } catch (err) {
      console.error('Failed to check plan requirements:', err);
    }
  };

  const onSubmit = async (data: CartFormData) => {
    if (requiresLPR && !data.licensePlate) {
      setError('License plate is required for this plan');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderPayload = {
        siteCode: data.siteCode,
        orderItems: [
          {
            id: planId,
            quantity: 1,
            ...(data.licensePlate && { licensePlate: data.licensePlate.toUpperCase() }),
          },
        ],
        ...(data.discountCode && { discountCode: data.discountCode }),
      };

      const response = await fetch('/api/ecom/shop/detailed-pending-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();

      if (!result.ok) {
        setError(result.message || 'Failed to create order');
        return;
      }

      setPendingOrder(result.data);

      // Store pending order token in sessionStorage for checkout
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingOrderToken', result.data.token);
        if (data.licensePlate) {
          sessionStorage.setItem('licensePlate', data.licensePlate.toUpperCase());
        }
      }

      // Redirect to checkout
      router.push('/portal/join/checkout');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!planId) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Order</h2>
        <p className="text-lg text-gray-600">Complete the details below to continue</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>
            Please provide the required information for your membership
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Site Selection - Only show if not pre-selected or if multiple sites */}
            {sites.length > 1 && !siteCodeFromUrl && (
              <div className="space-y-2">
                <Label htmlFor="siteCode">Car Wash Location</Label>
                <select
                  id="siteCode"
                  {...register('siteCode')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isLoading}
                >
                  {sites.map((site) => (
                    <option key={site.code} value={site.code}>
                      {site.name}
                    </option>
                  ))}
                </select>
                {errors.siteCode && (
                  <p className="text-sm text-red-600">{errors.siteCode.message}</p>
                )}
              </div>
            )}

            {/* Show selected location if pre-selected */}
            {siteCodeFromUrl && sites.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Selected Location</p>
                    <p className="text-blue-700">
                      {sites.find(s => s.code === siteCodeFromUrl)?.name || siteCodeFromUrl}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* License Plate (if LPR enabled) */}
            {requiresLPR && (
              <div className="space-y-2">
                <Label htmlFor="licensePlate">
                  License Plate <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="licensePlate"
                  type="text"
                  placeholder="ABC123"
                  {...register('licensePlate')}
                  disabled={isLoading}
                  className="uppercase"
                  maxLength={10}
                />
                {errors.licensePlate && (
                  <p className="text-sm text-red-600">{errors.licensePlate.message}</p>
                )}
                <p className="text-sm text-gray-500">
                  This plan uses License Plate Recognition (LPR). Enter your vehicle's license plate.
                </p>
              </div>
            )}

            {/* Discount Code */}
            <div className="space-y-2">
              <Label htmlFor="discountCode">Promo Code (Optional)</Label>
              <Input
                id="discountCode"
                type="text"
                placeholder="Enter promo code"
                {...register('discountCode')}
                disabled={isLoading}
              />
              {errors.discountCode && (
                <p className="text-sm text-red-600">{errors.discountCode.message}</p>
              )}
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Order Summary Preview */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Order Summary</h4>
              <Separator />
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">
                  Final pricing will be calculated on the next page
                </p>
              </div>
            </div>

            {/* Submit Button */}
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
                    Processing...
                  </>
                ) : (
                  'Continue to Checkout'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <CartPageContent />
    </Suspense>
  );
}
