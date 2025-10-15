/**
 * DEV ONLY: Customer Search Utility
 * Search for existing customers in BackOffice to test login
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CustomerSearchPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const params = new URLSearchParams();
      if (email) params.set('email', email);
      if (firstName) params.set('firstName', firstName);
      if (lastName) params.set('lastName', lastName);

      const response = await fetch(`/api/dev/search-customers?${params.toString()}`);
      const data = await response.json();

      if (!data.ok) {
        setError(data.message || 'Search failed');
        return;
      }

      setResults(data.data || []);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <h1 className="text-2xl font-bold text-red-900 mb-2">
          ⚠️ DEV ONLY - Customer Search Utility
        </h1>
        <p className="text-red-700">
          This page is for development testing only. DELETE before production deployment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search BackOffice Customers</CardTitle>
          <CardDescription>
            Find existing customers in the BackOffice database to test login functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleSearch} disabled={loading || (!email && !firstName && !lastName)}>
            {loading ? 'Searching...' : 'Search Customers'}
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Found {results.length} customer(s):</h3>
              <div className="space-y-3">
                {results.map((customer, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-semibold">ID:</span>{' '}
                        <code className="bg-white px-2 py-1 rounded">{customer.id}</code>
                      </div>
                      <div>
                        <span className="font-semibold">Number:</span> {customer.number}
                      </div>
                      <div>
                        <span className="font-semibold">Name:</span> {customer.firstName} {customer.lastName}
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span> {customer.email}
                      </div>
                      <div>
                        <span className="font-semibold">Phone:</span> {customer.phone}
                      </div>
                      <div>
                        <span className="font-semibold">Active:</span>{' '}
                        {customer.isActive ? '✅ Yes' : '❌ No'}
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-xs text-blue-800 mb-2">
                        <strong>To test login with this customer:</strong>
                      </p>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>1. You'll need their product code (RFID/plate) and last 4 of credit card</li>
                        <li>2. Try searching BackOffice for recurring accounts with this customer ID</li>
                        <li>3. Use the login form at /portal/login</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && results.length === 0 && (email || firstName || lastName) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-yellow-700">
              No customers found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
