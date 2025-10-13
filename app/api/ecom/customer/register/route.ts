/**
 * POST /api/ecom/customer/register
 * Register/mint customer token for authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { registerCustomer } from '@/lib/sonnys/ecom';
import { CustomerRegisterSchema } from '@/lib/sonnys/validators';
import { setSession } from '@/lib/sonnys/session';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // Validate request body
    const body = CustomerRegisterSchema.parse(json);

    // Register customer and get token
    const result = await registerCustomer(body);

    // Store in secure session
    await setSession({
      customerId: result.id,
      customerToken: result.customerToken,
      email: body.email,
    });

    // Return only the customer ID (token is in session)
    return NextResponse.json(createSuccess({ id: result.id }));
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
