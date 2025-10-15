/**
 * Customer Dashboard
 * Shows membership overview, billing history, and purchase options
 */

import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/sonnys/session';
import { getRecurringAccount, getRecurringBillings } from '@/lib/sonnys/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, CreditCard, Car, Tag, AlertCircle } from 'lucide-react';
import { ErrorActionButtons, LogoutButton } from '@/components/refresh-button';
import Link from 'next/link';

export default async function DashboardPage() {
  let session;
  try {
    session = await requireAuth();
  } catch {
    redirect('/portal/login');
  }

  const { customerId } = session;

  // Fetch account and billing data
  let account;
  let billings: any[] = [];
  let accountError = null;
  let errorStatus = null;

  try {
    account = await getRecurringAccount(customerId!);
  } catch (error: any) {
    accountError = error.message || 'Failed to load account details';
    errorStatus = error.status;
  }

  try {
    billings = await getRecurringBillings(customerId!, 12);
  } catch (error) {
    billings = [];
  }

  if (accountError) {
    // Check if this is a 404 error (customer not found in BackOffice sandbox)
    const is404 = errorStatus === 404;
    // Check if this is a 500 error (newly created account not yet synced)
    const is500 = errorStatus === 500;

    return (
      <div className="max-w-4xl mx-auto">
        <div className={`border rounded-lg p-6 text-center ${
          is404 || is500 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'
        }`}>
          <AlertCircle className={`h-12 w-12 mx-auto mb-4 ${
            is404 || is500 ? 'text-blue-600' : 'text-red-600'
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            is404 || is500 ? 'text-blue-900' : 'text-red-900'
          }`}>
            {is404 ? 'Sandbox Limitation' : is500 ? 'Account Setup In Progress' : 'Unable to Load Dashboard'}
          </h3>
          <p className={`mb-4 ${is404 || is500 ? 'text-blue-700' : 'text-red-700'}`}>
            {is404 ? (
              <>
                Your customer account (ID: <code className="font-mono bg-blue-100 px-2 py-1 rounded">{customerId}</code>) exists in the eCommerce sandbox, but not in the BackOffice sandbox.
                <br /><br />
                <strong>This is expected behavior in Sonny's sandbox environment.</strong>
                <br /><br />
                To see real customer data, you'll need to:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Use production API credentials</li>
                  <li>Log in with an existing customer account</li>
                </ul>
              </>
            ) : is500 ? (
              <>
                Your account (ID: <code className="font-mono bg-blue-100 px-2 py-1 rounded">{customerId}</code>) was just created and is being set up in our system.
                <br /><br />
                <strong>This usually takes a few minutes.</strong>
                <br /><br />
                Please check back shortly. If you continue to see this message after 10 minutes, please contact support.
              </>
            ) : accountError}
          </p>
          <ErrorActionButtons showRefresh={is500} />
        </div>
      </div>
    );
  }

  const statusColor = account?.currentRecurringStatusName === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back{account?.customer?.firstName ? `, ${account.customer.firstName}` : ''}!
          </h2>
          <p className="text-gray-600">Manage your car wash membership</p>
        </div>
        <LogoutButton />
      </div>

      {/* Membership Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{account?.planName || 'Membership Plan'}</CardTitle>
              <CardDescription>Your current membership details</CardDescription>
            </div>
            <Badge className={statusColor}>
              {account?.currentRecurringStatusName || 'Unknown'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Next Bill Date</p>
                <p className="font-semibold">
                  {account?.nextBillDate
                    ? new Date(account.nextBillDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Billing Amount</p>
                <p className="font-semibold">
                  ${account?.billingAmount ? (typeof account.billingAmount === 'string' ? parseFloat(account.billingAmount) : account.billingAmount).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Active Tags</p>
                <p className="font-semibold">
                  {account?.tags?.filter((t) => t.enabled).length || 0}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Trial Info */}
          {account?.isOnTrial && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm text-green-800">
                <strong>Trial Price Active:</strong> You're currently on a trial price of ${account.trialAmount ? (typeof account.trialAmount === 'string' ? parseFloat(account.trialAmount) : account.trialAmount).toFixed(2) : '0.00'}
              </p>
            </div>
          )}

          {/* Suspended Info */}
          {account?.isSuspended && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                <strong>Account Suspended:</strong> Your account is suspended
                {account.suspendedUntil && ` until ${new Date(account.suspendedUntil).toLocaleDateString()}`}
              </p>
            </div>
          )}

          {/* Sites */}
          {(account?.billingSiteCode || account?.creationSiteCode) && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Site Information</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {account.billingSiteCode && (
                  <div>
                    <p className="text-gray-600">Billing Site</p>
                    <p className="font-medium">{account.billingSiteCode}</p>
                  </div>
                )}
                {account.creationSiteCode && (
                  <div>
                    <p className="text-gray-600">Creation Site</p>
                    <p className="font-medium">{account.creationSiteCode}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vehicles & Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicles & Tags
            </CardTitle>
            <CardDescription>Your registered vehicles and RFID tags</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vehicles */}
            {account?.vehicles && account.vehicles.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Vehicles</h4>
                <div className="space-y-2">
                  {account.vehicles.map((vehicle, idx) => (
                    <div key={vehicle.id || idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono text-sm">
                        {vehicle.plate || 'No plate'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RFID Tags */}
            {account?.tags && account.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">RFID Tags</h4>
                <div className="space-y-2">
                  {account.tags.map((tag, idx) => (
                    <div key={tag.id || idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono text-sm">{tag.number}</span>
                      <Badge variant={tag.enabled ? 'default' : 'secondary'}>
                        {tag.enabled ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!account?.vehicles || account.vehicles.length === 0) &&
              (!account?.tags || account.tags.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No vehicles or tags registered
                </p>
              )}
          </CardContent>
        </Card>

        {/* Recent Charges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recent Charges
            </CardTitle>
            <CardDescription>Your billing history</CardDescription>
          </CardHeader>
          <CardContent>
            {billings && billings.length > 0 ? (
              <div className="space-y-3">
                {billings.slice(0, 6).map((billing, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">
                        ${typeof billing.amountCharged === 'number' ? billing.amountCharged.toFixed(2) : parseFloat(billing.amountCharged).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(billing.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        •••• {billing.lastFourCC}
                      </p>
                      {billing.creditCardExpirationDate && (
                        <p className="text-xs text-gray-500">
                          Exp: {billing.creditCardExpirationDate}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No billing history available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            We're here to assist with any questions or changes to your membership
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-800 mb-3">
              <strong>Note:</strong> Plan upgrades, downgrades, and cancellations are not available through the portal at this time.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="w-full md:w-auto">
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
