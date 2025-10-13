/**
 * GET /api/backoffice/recurring/account/[customerId]/billings
 * Get recurring billings for a customer
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecurringBillings } from '@/lib/sonnys/backoffice';
import { BillingsQuerySchema } from '@/lib/sonnys/validators';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';
import { ZodError } from 'zod';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  try {
    const { customerId } = await params;
    const { searchParams } = new URL(req.url);

    // Validate query parameters
    const { limit } = BillingsQuerySchema.parse({
      limit: searchParams.get('limit'),
    });

    // Get billings
    const billings = await getRecurringBillings(customerId, limit);

    return NextResponse.json(createSuccess(billings));
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        createError('PayloadValidationError', 'Invalid query parameters', error.issues),
        { status: 422 }
      );
    }

    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
