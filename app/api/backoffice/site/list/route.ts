/**
 * GET /api/backoffice/site/list
 * List all sites
 */

import { NextResponse } from 'next/server';
import { listSites } from '@/lib/sonnys/backoffice';
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';

export async function GET() {
  try {
    const sites = await listSites();
    return NextResponse.json(createSuccess(sites));
  } catch (error: any) {
    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
