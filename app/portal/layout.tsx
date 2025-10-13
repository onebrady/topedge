/**
 * Customer Portal Layout
 */

import { ReactNode } from 'react';

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Customer Portal</h1>
          <p className="text-gray-600">Manage your car wash membership</p>
        </div>
        {children}
      </div>
    </div>
  );
}
