/**
 * POST /api/auth/logout
 * Logout and clear session
 */

import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/sonnys/session';
import { createSuccess } from '@/lib/sonnys/errors';

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json(createSuccess({ message: 'Logged out successfully' }));
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}
