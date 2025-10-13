/**
 * POST /api/ecom/shop/payment
 * Process payment for new customer checkout
 */

import { NextRequest, NextResponse } from 'next/server';
import { processPayment } from '@/lib/sonnys/ecom';
import { PaymentRequestSchema } from '@/lib/sonnys/validators';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // Validate request body
    const body = PaymentRequestSchema.parse(json);

    // Process payment
    const result = await processPayment(body);

    return NextResponse.json(createSuccess(result));
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        createError('PayloadValidationError', 'Invalid request data', error.issues),
        { status: 422 }
      );
    }

    console.error('[API] Payment error:', error);
    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
