/**
 * DEV ONLY: Login Bypass API
 * Creates a session with any customer ID without authentication
 * DELETE THIS FILE BEFORE PRODUCTION DEPLOYMENT
 */

import { NextRequest, NextResponse } from 'next/server';
import { setSession } from '@/lib/sonnys/session';
import { createSuccess, createError } from '@/lib/sonnys/errors';

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        createError('PayloadValidationError', 'Customer ID is required'),
        { status: 400 }
      );
    }

    console.log('[DEV] Creating bypass session for customer:', customerId);

    // Create session without customerToken (won't be able to make purchases, but can view dashboard)
    await setSession({
      customerId,
      customerToken: 'DEV_BYPASS_TOKEN', // Placeholder token for dev testing
      email: undefined,
    });

    console.log('[DEV] Session created successfully');

    return NextResponse.json(createSuccess({ customerId }));
  } catch (error: any) {
    console.error('[DEV] Login bypass error:', error);
    return NextResponse.json(
      createError('UnexpectedFailure', error.message || 'Failed to create session'),
      { status: 500 }
    );
  }
}
