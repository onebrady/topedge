/**
 * DEV ONLY: Search customers in BackOffice
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchCustomer } from '@/lib/sonnys/backoffice';
import { createSuccess, createError } from '@/lib/sonnys/errors';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');

    if (!email && !firstName && !lastName) {
      return NextResponse.json(
        createError('PayloadValidationError', 'At least one search parameter is required'),
        { status: 400 }
      );
    }

    const params: any = {};
    if (email) params.email = email;
    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;

    console.log('[DEV] Searching customers with params:', params);

    const customers = await searchCustomer(params);

    console.log('[DEV] Found customers:', customers?.length || 0);

    return NextResponse.json(createSuccess(customers));
  } catch (error: any) {
    console.error('[DEV] Search error:', error);
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', error.message || 'Search failed'),
      { status: error.status || 500 }
    );
  }
}
