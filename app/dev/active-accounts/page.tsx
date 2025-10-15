/**
 * DEV ONLY: Active Accounts with Login Credentials
 * Shows testable accounts with email, license/tag, and last 4 CC
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Copy, CheckCircle2 } from 'lucide-react';

export default function ActiveAccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/dev/active-accounts');
      const data = await response.json();

      if (!data.ok) {
        setError(data.message || 'Failed to fetch accounts');
        return;
      }

      setAccounts(data.data || []);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <h1 className="text-2xl font-bold text-red-900 mb-2">
          ⚠️ DEV ONLY - Active Accounts with Login Credentials
        </h1>
        <p className="text-red-700">
          This page shows production customer data. DELETE before production deployment.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Active Recurring Accounts</CardTitle>
          <CardDescription>
            These accounts have all the information needed to test login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchAccounts} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Refresh Accounts'
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!loading && accounts.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700">
            No active accounts found with complete login information.
          </p>
        </div>
      )}

      {accounts.length > 0 && (
        <div className="space-y-6">
          {accounts.map((account, idx) => {
            const productCode = account.vehicles?.[0]?.plate || account.tags?.[0]?.number || 'N/A';
            const productType = account.vehicles?.[0]?.plate ? 'License Plate' : 'RFID Tag';

            return (
              <Card key={idx} className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg">
                    {account.firstName} {account.lastName} - {account.planName}
                  </CardTitle>
                  <CardDescription>
                    Customer ID: {account.customerId} | Status: {account.status}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    {/* Login Credentials Section */}
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                      <h3 className="font-bold text-green-900 mb-4 text-lg">
                        🔐 Login Credentials (Copy these to test login)
                      </h3>

                      <div className="space-y-3">
                        {/* Email */}
                        <div className="flex items-center justify-between bg-white p-3 rounded border border-green-200">
                          <div className="flex-1">
                            <p className="text-xs text-gray-600 mb-1">Email</p>
                            <p className="font-mono font-semibold text-lg">{account.email}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(account.email, `email-${idx}`)}
                          >
                            {copiedField === `email-${idx}` ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Product Code */}
                        <div className="flex items-center justify-between bg-white p-3 rounded border border-green-200">
                          <div className="flex-1">
                            <p className="text-xs text-gray-600 mb-1">{productType}</p>
                            <p className="font-mono font-semibold text-lg">{productCode}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(productCode, `product-${idx}`)}
                          >
                            {copiedField === `product-${idx}` ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Last 4 CC */}
                        <div className="flex items-center justify-between bg-white p-3 rounded border border-green-200">
                          <div className="flex-1">
                            <p className="text-xs text-gray-600 mb-1">Last 4 of Credit Card</p>
                            <p className="font-mono font-semibold text-lg">
                              {account.lastFourCC?.slice(-4) || account.lastFourCC}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(account.lastFourCC?.slice(-4) || account.lastFourCC, `cc-${idx}`)}
                          >
                            {copiedField === `cc-${idx}` ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded">
                        <p className="text-sm text-blue-900 font-semibold mb-2">
                          To test login:
                        </p>
                        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                          <li>Go to <a href="/portal/login" className="underline font-mono">/portal/login</a></li>
                          <li>Enter the email, {productType.toLowerCase()}, and last 4 shown above</li>
                          <li>You should see the dashboard with real data</li>
                        </ol>
                      </div>
                    </div>

                    {/* Account Details */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 mb-3">Account Details</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Plan:</span>{' '}
                          <span className="font-medium">{account.planName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Billing Amount:</span>{' '}
                          <span className="font-medium">${account.billingAmount?.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Next Bill:</span>{' '}
                          <span className="font-medium">
                            {account.nextBillDate ? new Date(account.nextBillDate).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Vehicles:</span>{' '}
                          <span className="font-medium">{account.vehicles?.length || 0}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tags:</span>{' '}
                          <span className="font-medium">{account.tags?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
