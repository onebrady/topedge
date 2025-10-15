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
import { Loader2, Check, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

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
  locations?: Array<{
    siteCode: string;
    taxRate?: number;
    additionalFeeRate?: number;
    retailPrice?: number;
  }>;
}

function JoinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<RecurringPlan[]>([]);
  const [selectedSite] = useState<string>('DEF'); // Fixed location: Top Edge Car Wash
  const [planType, setPlanType] = useState<'monthly' | 'annual'>('monthly');
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

  // Filter plans based on selected type
  const filteredPlans = plans.filter(plan =>
    planType === 'annual' ? plan.isAnnual : !plan.isAnnual
  );

  // Get location-specific price for a plan
  const getPlanPrice = (plan: RecurringPlan): number => {
    if (!selectedSite || !plan.locations) {
      return plan.price;
    }

    const locationData = plan.locations.find(loc => loc.siteCode === selectedSite);
    return locationData?.retailPrice ?? plan.price;
  };

  // Calculate annual savings
  const calculateAnnualSavings = (plan: RecurringPlan): number | null => {
    if (!plan.isAnnual) return null;
    const monthlyEquivalent = (plan.price / 12);
    // Find a similar monthly plan to compare
    const monthlyPlan = plans.find(p => !p.isAnnual && p.applicableWash === plan.applicableWash);
    if (monthlyPlan) {
      const annualCostOfMonthly = monthlyPlan.price * 12;
      return annualCostOfMonthly - plan.price;
    }
    return null;
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (!selectedPlan || !selectedSite) return;
    router.push(`/portal/join/cart?planId=${selectedPlan}&siteCode=${selectedSite}`);
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
          Select your membership plan for Top Edge Car Wash
        </p>
      </div>

      {/* Plan Type Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setPlanType('monthly')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              planType === 'monthly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly Plans
          </button>
          <button
            onClick={() => setPlanType('annual')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              planType === 'annual'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual Plans
          </button>
        </div>
      </div>

      {/* No plans available message */}
      {!filteredPlans || filteredPlans.length === 0 ? (
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
            {filteredPlans.map((plan) => {
              const savings = calculateAnnualSavings(plan);
              return (
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
                  ${getPlanPrice(plan).toFixed(2)}
                  <span className="text-sm text-gray-600 font-normal">
                    /{plan.isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {plan.hasTrial && plan.trialPrice && (
                  <p className="text-sm text-green-600 mt-1">
                    First {plan.trialLength} months at ${plan.trialPrice.toFixed(2)}
                  </p>
                )}
                {plan.isAnnual && savings !== null && savings > 0 && (
                  <div className="mt-2 inline-block">
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Save ${savings.toFixed(2)}/year
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    {plan.redemptionIsUnlimited || !plan.redemptionLimit
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
              );
            })}
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
      {!selectedPlan && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Please select a plan above
        </p>
      )}
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
