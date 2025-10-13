/**
 * GET /api/ecom/customer/[customerId]/order/receipt/[receiptId]
 * Get order receipt for authenticated customer
 */

import { NextRequest, NextResponse } from 'next/server';
import { getReceipt } from '@/lib/sonnys/ecom';
import { requireAuth } from '@/lib/sonnys/session';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string; receiptId: string }> }
) {
  try {
    const { customerId, receiptId } = await params;

    // Require authentication
    const session = await requireAuth();

    // Verify customer ID matches session
    if (session.customerId !== customerId) {
      return NextResponse.json(
        createError('NotAuthorizedError', 'Customer ID mismatch'),
        { status: 403 }
      );
    }

    // Get receipt
    const receipt = await getReceipt(customerId, receiptId, session.customerToken!);

    return NextResponse.json(createSuccess(receipt));
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        createError('NotAuthorizedError', 'Authentication required'),
        { status: 401 }
      );
    }

    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
