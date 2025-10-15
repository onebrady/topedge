/**
 * DEV ONLY: Login Bypass for Testing
 * Manually create a session with any customer ID
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginBypassPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState('864:1005'); // Pre-fill with one from the list
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/dev/login-bypass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId }),
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Redirect to dashboard
      router.push('/portal/dashboard');
      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testCustomers = [
    { id: '864:1005', name: 'Silver Plan (Oct 15)' },
    { id: '865:1002', name: 'Diamond Plan (Oct 15) - ERIK MARTIN' },
    { id: '863:1005', name: 'Silver Plan (Oct 15)' },
    { id: '862:1005', name: 'Silver Plan (Oct 15)' },
    { id: '861:1002', name: 'Graphene X4 (Oct 15)' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <h1 className="text-2xl font-bold text-red-900 mb-2">
          ⚠️ DEV ONLY - Login Bypass
        </h1>
        <p className="text-red-700">
          This bypasses authentication and creates a session with any customer ID.
          DELETE before production deployment!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Test Session</CardTitle>
          <CardDescription>
            Enter a customer ID to create a session and view their dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Customer ID</label>
            <Input
              placeholder="864:1005"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: XXX:XXXX (e.g., 864:1005)
            </p>
          </div>

          <div className="border rounded-lg p-3 bg-blue-50">
            <p className="text-sm font-semibold text-blue-900 mb-2">Quick Select:</p>
            <div className="space-y-1">
              {testCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setCustomerId(customer.id)}
                  className="block w-full text-left px-3 py-2 text-sm bg-white rounded hover:bg-blue-100 border border-blue-200"
                >
                  <span className="font-mono font-semibold">{customer.id}</span>
                  <span className="text-gray-600 ml-2">- {customer.name}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={loading || !customerId}
            className="w-full"
            size="lg"
          >
            {loading ? 'Creating Session...' : 'Login & View Dashboard'}
          </Button>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> This creates a session without a customerToken, so you won't be able to
              make authenticated purchases. This is only for viewing the dashboard data from BackOffice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
