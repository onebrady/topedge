/**
 * Session management for Sonny's Customer Portal
 * Uses iron-session for secure, encrypted cookies
 */

import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  customerId?: string;
  customerToken?: string;
  email?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: process.env.SESSION_COOKIE_NAME || 'sonnys_portal',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '28800'), // 8 hours default
    path: '/',
  },
};

/**
 * Get the current session
 */
export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

/**
 * Set session data
 */
export async function setSession(data: SessionData): Promise<void> {
  const session = await getSession();
  session.customerId = data.customerId;
  session.customerToken = data.customerToken;
  session.email = data.email;
  await session.save();
}

/**
 * Clear session data
 */
export async function clearSession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!(session.customerId && session.customerToken);
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();

  if (!session.customerId || !session.customerToken) {
    throw new Error('Authentication required');
  }

  return {
    customerId: session.customerId,
    customerToken: session.customerToken,
    email: session.email,
  };
}
