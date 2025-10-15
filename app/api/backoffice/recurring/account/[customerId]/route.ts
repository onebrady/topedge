/**
 * GET /api/backoffice/recurring/account/[customerId]
 * Get recurring account details for a customer
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecurringAccount } from '@/lib/sonnys/backoffice';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  const { customerId } = await params;

  try {
    console.log('[BO API] Fetching recurring account for:', customerId);

    // Get recurring account
    const account = await getRecurringAccount(customerId);

    console.log('[BO API] Recurring account fetched:', JSON.stringify(account, null, 2).substring(0, 500));

    return NextResponse.json(createSuccess(account));
  } catch (error: any) {
    console.error('[BO API] Recurring account error:', {
      customerId,
      code: error.code,
      message: error.message,
      status: error.status,
      details: error.details,
    });
    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
