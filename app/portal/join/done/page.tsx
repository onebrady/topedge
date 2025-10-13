/**
 * Confirmation Page - Step 4 of Join Flow
 * Show receipt and offer to create portal session
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function DonePage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get order info from sessionStorage
    if (typeof window !== 'undefined') {
      const id = sessionStorage.getItem('customerId');
      const receipt = sessionStorage.getItem('receiptId');
      const email = sessionStorage.getItem('customerEmail');

      if (!id || !receipt) {
        router.push('/portal/join');
        return;
      }

      setCustomerId(id);
      setReceiptId(receipt);
      setCustomerEmail(email);
    }
  }, []);

  const handleCreateSession = async () => {
    const licensePlate = sessionStorage.getItem('licensePlate');

    if (!customerEmail || !licensePlate) {
      setError('Missing required information. Please contact support.');
      return;
    }

    setIsCreatingSession(true);
    setError(null);

    try {
      // Get the last 4 digits of card from user
      const lastFour = prompt('Please enter the last 4 digits of the credit card you just used:');

      if (!lastFour || lastFour.length !== 4) {
        setError('Invalid card information');
        setIsCreatingSession(false);
        return;
      }

      const response = await fetch('/api/ecom/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerEmail,
          productCode: licensePlate,
          lastFourCreditCard: lastFour,
        }),
      });

      const result = await response.json();

      if (!result.ok) {
        setError(result.message || 'Failed to create session. You can log in later using the login page.');
        return;
      }

      // Clear sessionStorage
      sessionStorage.clear();

      // Redirect to dashboard
      router.push('/portal/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. You can log in later using the login page.');
    } finally {
      setIsCreatingSession(false);
    }
  };

  const handleSkip = () => {
    // Clear sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
    router.push('/portal');
  };

  if (!customerId || !receiptId) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Club!</h2>
        <p className="text-lg text-gray-600">Your membership has been activated</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Confirmation</CardTitle>
          <CardDescription>Your purchase was successful</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Customer ID</p>
              <p className="font-mono font-semibold">{customerId}</p>
            </div>
            <div>
              <p className="text-gray-600">Receipt ID</p>
              <p className="font-mono font-semibold">{receiptId}</p>
            </div>
          </div>

          {customerEmail && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                A confirmation email has been sent to <strong>{customerEmail}</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Creation Offer */}
      <Card>
        <CardHeader>
          <CardTitle>Create Your Portal Account</CardTitle>
          <CardDescription>
            Manage your membership online anytime
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Create a portal session now to:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>View your membership details</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Check billing history</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Purchase additional services</span>
            </li>
          </ul>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleSkip}
              disabled={isCreatingSession}
            >
              Skip for Now
            </Button>
            <Button
              className="flex-1"
              onClick={handleCreateSession}
              disabled={isCreatingSession}
            >
              {isCreatingSession ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Session...
                </>
              ) : (
                'Create Portal Session'
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            You can always log in later from the portal home page
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
