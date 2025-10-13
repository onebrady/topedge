/**
 * POST /api/ecom/shop/detailed-pending-order
 * Create a detailed pending order with pricing details
 */

import { NextRequest, NextResponse } from 'next/server';
import { createDetailedPendingOrder } from '@/lib/sonnys/ecom';
import { DetailedPendingOrderSchema } from '@/lib/sonnys/validators';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // Validate request body
    const body = DetailedPendingOrderSchema.parse(json);

    // Create pending order
    const pendingOrder = await createDetailedPendingOrder(body);

    return NextResponse.json(createSuccess(pendingOrder));
  } catch (error: any) {
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
