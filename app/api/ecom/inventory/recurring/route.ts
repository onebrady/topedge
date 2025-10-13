/**
 * GET /api/ecom/inventory/recurring
 * List all recurring plans available for purchase
 */

import { NextResponse } from 'next/server';
import { listRecurringPlans } from '@/lib/sonnys/ecom';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';

export async function GET() {
  try {
    const plans = await listRecurringPlans();
    return NextResponse.json(createSuccess(plans));
  } catch (error: any) {
    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
