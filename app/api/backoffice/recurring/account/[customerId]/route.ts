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
  try {
    const { customerId } = await params;

    // Get recurring account
    const account = await getRecurringAccount(customerId);

    return NextResponse.json(createSuccess(account));
  } catch (error: any) {
    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
