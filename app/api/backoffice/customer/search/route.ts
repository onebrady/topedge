/**
 * GET /api/backoffice/customer/search
 * Search for customers by email, firstName, or lastName
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchCustomer } from '@/lib/sonnys/backoffice';
import { CustomerSearchQuerySchema } from '@/lib/sonnys/validators';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';
import { ZodError } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const params = {
      email: searchParams.get('email') || undefined,
      firstName: searchParams.get('firstName') || undefined,
      lastName: searchParams.get('lastName') || undefined,
    };

    // Validate query parameters
    const validated = CustomerSearchQuerySchema.parse(params);

    // Search customers
    const customers = await searchCustomer(validated);

    return NextResponse.json(createSuccess(customers));
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
