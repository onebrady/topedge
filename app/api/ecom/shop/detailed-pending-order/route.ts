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

    console.log('[API] Creating pending order:', {
      siteCode: body.siteCode,
      planId: body.orderItems[0]?.id,
      hasLicensePlate: !!body.orderItems[0]?.licensePlate,
      hasDiscountCode: !!body.discountCode,
    });

    // Create pending order
    const pendingOrder = await createDetailedPendingOrder(body);

    console.log('[API] Pending order response type:', typeof pendingOrder);
    console.log('[API] Pending order keys:', Object.keys(pendingOrder || {}));
    console.log('[API] Full pending order:', JSON.stringify(pendingOrder, null, 2));

    console.log('[API] Pending order created:', {
      token: pendingOrder?.token ? pendingOrder.token.substring(0, 10) + '...' : 'NO TOKEN',
      totalAmount: pendingOrder?.totalAmount,
      expiresAt: pendingOrder?.expiresAt,
    });

    return NextResponse.json(createSuccess(pendingOrder));
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        createError('PayloadValidationError', 'Invalid request data', error.issues),
        { status: 422 }
      );
    }

    console.error('[API] Pending order error:', {
      code: error.code,
      message: error.message,
      status: error.status,
      details: error.details,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
