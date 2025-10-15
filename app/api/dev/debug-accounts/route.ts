/**
 * DEV ONLY: Debug recurring accounts raw data
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSuccess, createError } from '@/lib/sonnys/errors';

const BO_BASE = process.env.SONNYS_BACKOFFICE_BASE!;
const BO_API_KEY = process.env.SONNYS_BACKOFFICE_API_KEY!;
const BO_API_ID = process.env.SONNYS_BACKOFFICE_API_ID!;

export async function GET(req: NextRequest) {
  try {
    console.log('[DEV DEBUG] Fetching recurring accounts list...');

    // Get list of recurring accounts
    const listRes = await fetch(`${BO_BASE}/recurring/account/list?limit=10`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Sonnys-API-Key': BO_API_KEY,
        'X-Sonnys-API-ID': BO_API_ID,
      },
    });

    const listData = await listRes.json();
    console.log('[DEV DEBUG] List response:', JSON.stringify(listData, null, 2));

    if (!listRes.ok) {
      return NextResponse.json(createSuccess({
        error: 'List request failed',
        status: listRes.status,
        response: listData
      }));
    }

    // Try to get detail for first account
    const accounts = listData.data?.accounts || [];
    const firstAccount = accounts[0];

    if (!firstAccount) {
      return NextResponse.json(createSuccess({
        message: 'No accounts found in list',
        listResponse: listData
      }));
    }

    console.log('[DEV DEBUG] First account ID:', firstAccount.id);

    // Get account detail
    const detailRes = await fetch(`${BO_BASE}/recurring/account/${firstAccount.id}/detail`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Sonnys-API-Key': BO_API_KEY,
        'X-Sonnys-API-ID': BO_API_ID,
      },
    });

    const detailData = await detailRes.json();
    console.log('[DEV DEBUG] Detail response:', JSON.stringify(detailData, null, 2));

    // Get billings
    const billingsRes = await fetch(`${BO_BASE}/recurring/account/${firstAccount.id}/billings?limit=5`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Sonnys-API-Key': BO_API_KEY,
        'X-Sonnys-API-ID': BO_API_ID,
      },
    });

    const billingsData = await billingsRes.json();
    console.log('[DEV DEBUG] Billings response:', JSON.stringify(billingsData, null, 2));

    // Try to get customer if we have customer ID
    let customerData = null;
    const customerId = detailData.data?.customer?.id;
    if (customerId) {
      console.log('[DEV DEBUG] Fetching customer:', customerId);
      const customerRes = await fetch(`${BO_BASE}/customer/${customerId}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Sonnys-API-Key': BO_API_KEY,
          'X-Sonnys-API-ID': BO_API_ID,
        },
      });
      customerData = await customerRes.json();
      console.log('[DEV DEBUG] Customer response:', JSON.stringify(customerData, null, 2));
    }

    return NextResponse.json(createSuccess({
      listResponse: listData,
      firstAccountId: firstAccount.id,
      detailResponse: detailData,
      billingsResponse: billingsData,
      customerResponse: customerData,
      summary: {
        totalAccounts: accounts.length,
        firstAccountStatus: detailData.data?.currentRecurringStatusName,
        hasVehicles: detailData.data?.vehicles?.length > 0,
        hasTags: detailData.data?.tags?.length > 0,
        hasBillings: billingsData.data?.length > 0,
        customerEmail: customerData?.data?.email,
      }
    }));
  } catch (error: any) {
    console.error('[DEV DEBUG] Error:', error);
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', error.message || 'Failed'),
      { status: 500 }
    );
  }
}
