/**
 * Choose Plan Page - Step 1 of Join Flow
 * Display recurring plans and allow selection
 */

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RecurringPlan {
  id: string;
  name: string;
  price: number;
  sku: string;
  lprEnabled: boolean;
  isAnnual: boolean;
  applicableWash: string;
  redemptionIsUnlimited: boolean;
  redemptionLimit?: number;
  hasTrial: boolean;
  trialPrice?: number;
  trialLength?: number;
  frequencyLimit: number;
  frequencyLimitType?: string;
  additionalTagPrice?: number;
}

function JoinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<RecurringPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    searchParams.get('planId')
  );

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/ecom/inventory/recurring');
      const result = await response.json();

      // Check if response is successful
      if (!result.ok) {
        setError(result.message || 'Failed to load plans');
        setPlans([]); // Ensure plans is set to empty array
        return;
      }

      // Ensure data is an array
      if (Array.isArray(result.data)) {
        setPlans(result.data);
      } else {
        console.error('API returned non-array data:', result.data);
        setError('Invalid data format received from server');
        setPlans([]);
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load plans. Please try again.');
      setPlans([]); // Ensure plans is set to empty array
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;
    router.push(`/portal/join/cart?planId=${selectedPlan}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-lg text-gray-600">
          Select the membership plan that works best for you
        </p>
      </div>

      {/* No plans available message */}
      {!plans || plans.length === 0 ? (
        <div className="text-center py-12">
          <Alert>
            <AlertDescription>
              No membership plans are currently available. Please contact support for assistance.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPlan === plan.id
                ? 'ring-2 ring-blue-600 shadow-lg'
                : 'hover:ring-1 hover:ring-gray-300'
            }`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {selectedPlan === plan.id && (
                  <div className="bg-blue-600 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <CardDescription>{plan.applicableWash}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price */}
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  ${plan.price.toFixed(2)}
                  <span className="text-sm text-gray-600 font-normal">
                    /{plan.isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {plan.hasTrial && plan.trialPrice && (
                  <p className="text-sm text-green-600 mt-1">
                    First {plan.trialLength} months at ${plan.trialPrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    {plan.redemptionIsUnlimited
                      ? 'Unlimited washes'
                      : `${plan.redemptionLimit} washes per ${plan.isAnnual ? 'year' : 'month'}`}
                  </span>
                </li>
                {plan.lprEnabled && (
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>License Plate Recognition enabled</span>
                  </li>
                )}
                {plan.frequencyLimit && plan.frequencyLimitType && (
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Up to {plan.frequencyLimit} washes per {plan.frequencyLimitType}
                    </span>
                  </li>
                )}
                {plan.additionalTagPrice && (
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Additional tags: ${plan.additionalTagPrice.toFixed(2)}/month
                    </span>
                  </li>
                )}
              </ul>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {plan.isAnnual && <Badge variant="secondary">Annual Plan</Badge>}
                {plan.lprEnabled && <Badge variant="default">LPR</Badge>}
                {plan.hasTrial && <Badge variant="outline" className="border-green-600 text-green-600">Trial Available</Badge>}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={selectedPlan === plan.id ? 'default' : 'outline'}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedPlan}
          className="px-12"
        >
          Continue to Cart
        </Button>
      </div>
      </>
      )}
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <JoinPageContent />
    </Suspense>
  );
}
