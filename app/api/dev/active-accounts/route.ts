/**
 * DEV ONLY: Get active recurring accounts with login details
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSuccess, createError } from '@/lib/sonnys/errors';

const BO_BASE = process.env.SONNYS_BACKOFFICE_BASE!;
const BO_API_KEY = process.env.SONNYS_BACKOFFICE_API_KEY!;
const BO_API_ID = process.env.SONNYS_BACKOFFICE_API_ID!;

export async function GET(req: NextRequest) {
  try {
    console.log('[DEV] Fetching active recurring accounts...');

    // Get list of recurring accounts
    const listRes = await fetch(`${BO_BASE}/recurring/account/list?limit=50`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Sonnys-API-Key': BO_API_KEY,
        'X-Sonnys-API-ID': BO_API_ID,
      },
    });

    if (!listRes.ok) {
      throw new Error(`Failed to fetch accounts: ${listRes.status}`);
    }

    const listData = await listRes.json();
    console.log('[DEV] Got accounts list:', JSON.stringify(listData, null, 2).substring(0, 500));

    // Get details for first few accounts
    const accounts = listData.data?.accounts || [];
    const detailedAccounts = [];

    for (const account of accounts.slice(0, 10)) {
      try {
        // Get account details
        const detailRes = await fetch(`${BO_BASE}/recurring/account/${account.id}/detail`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Sonnys-API-Key': BO_API_KEY,
            'X-Sonnys-API-ID': BO_API_ID,
          },
        });

        if (!detailRes.ok) continue;

        const detail = await detailRes.json();
        const accountDetail = detail.data;

        // Get billings to get last 4 CC
        const billingsRes = await fetch(`${BO_BASE}/recurring/account/${account.id}/billings?limit=1`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Sonnys-API-Key': BO_API_KEY,
            'X-Sonnys-API-ID': BO_API_ID,
          },
        });

        let billings = [];
        if (billingsRes.ok) {
          const billingsData = await billingsRes.json();
          billings = billingsData.data || [];
        }

        // Get customer details
        const customerId = accountDetail.customer?.id;
        let customerEmail = null;

        if (customerId) {
          const customerRes = await fetch(`${BO_BASE}/customer/${customerId}`, {
            headers: {
              'Content-Type': 'application/json',
              'X-Sonnys-API-Key': BO_API_KEY,
              'X-Sonnys-API-ID': BO_API_ID,
            },
          });

          if (customerRes.ok) {
            const customerData = await customerRes.json();
            customerEmail = customerData.data?.email;
          }
        }

        // Only include if we have email and either a vehicle or tag
        const hasVehicle = accountDetail.vehicles?.length > 0;
        const hasTag = accountDetail.tags?.length > 0;
        const lastFourCC = billings[0]?.lastFourCC;

        if (customerEmail && (hasVehicle || hasTag) && lastFourCC && accountDetail.currentRecurringStatusName === 'Active') {
          detailedAccounts.push({
            accountId: account.id,
            customerId: customerId,
            email: customerEmail,
            firstName: accountDetail.customer?.firstName,
            lastName: accountDetail.customer?.lastName,
            planName: accountDetail.planName,
            status: accountDetail.currentRecurringStatusName,
            vehicles: accountDetail.vehicles,
            tags: accountDetail.tags,
            lastFourCC: lastFourCC,
            billingAmount: accountDetail.billingAmount,
            nextBillDate: accountDetail.nextBillDate,
          });
        }

        // Stop after finding 5 complete accounts
        if (detailedAccounts.length >= 5) break;
      } catch (err) {
        console.error('[DEV] Error fetching account detail:', err);
        continue;
      }
    }

    console.log('[DEV] Found detailed accounts:', detailedAccounts.length);

    return NextResponse.json(createSuccess(detailedAccounts));
  } catch (error: any) {
    console.error('[DEV] Error:', error);
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', error.message || 'Failed to fetch accounts'),
      { status: error.status || 500 }
    );
  }
}
