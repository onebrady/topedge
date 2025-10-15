/**
 * DEV ONLY: Debug Page
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDebugData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dev/debug-accounts');
      const result = await response.json();
      setData(result);
    } catch (error) {
      setData({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <h1 className="text-2xl font-bold text-red-900 mb-2">
          ⚠️ DEV ONLY - Debug Account Data
        </h1>
        <p className="text-red-700">
          This shows raw API responses. DELETE before production deployment.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Fetch Raw Account Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchDebugData} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Debug Data'}
          </Button>
        </CardContent>
      </Card>

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Raw Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-[600px] text-xs">
              {JSON.stringify(data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
