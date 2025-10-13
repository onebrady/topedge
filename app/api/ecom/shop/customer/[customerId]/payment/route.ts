/**
 * POST /api/ecom/shop/customer/[customerId]/payment
 * Process payment for authenticated customer
 */

import { NextRequest, NextResponse } from 'next/server';
import { processCustomerPayment } from '@/lib/sonnys/ecom';
import { AuthenticatedPaymentSchema } from '@/lib/sonnys/validators';
import { requireAuth } from '@/lib/sonnys/session';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';
import { ZodError } from 'zod';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  try {
    const { customerId } = await params;

    // Require authentication
    const session = await requireAuth();

    // Verify customer ID matches session
    if (session.customerId !== customerId) {
      return NextResponse.json(
        createError('NotAuthorizedError', 'Customer ID mismatch'),
        { status: 403 }
      );
    }

    const json = await req.json();

    // Validate request body
    const body = AuthenticatedPaymentSchema.parse(json);

    // Process payment
    const result = await processCustomerPayment(
      customerId,
      session.customerToken!,
      body.pendingOrderToken
    );

    return NextResponse.json(createSuccess(result));
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        createError('NotAuthorizedError', 'Authentication required'),
        { status: 401 }
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        createError('PayloadValidationError', 'Invalid request data', error.issues),
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
