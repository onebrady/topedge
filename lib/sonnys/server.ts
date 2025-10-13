/**
 * Server-side API Client
 * Used by Server Components to fetch from our BFF API routes
 * DO NOT use this in Client Components - use direct fetch instead
 */

import { RecurringAccount, RecurringBilling, Site } from './backoffice';

const API_BASE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Generic fetch wrapper for our BFF API routes
 */
async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const fullUrl = `${API_BASE}${path}`;

  const res = await fetch(fullUrl, {
    ...init,
    cache: 'no-store',
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorText = await res.text();

    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = {
        message: `HTTP ${res.status}: ${res.statusText}`,
        code: 'FetchError',
        raw: errorText.substring(0, 200)
      };
    }

    const error: any = new Error(errorData.message || 'Failed to fetch data');
    error.status = res.status;
    error.code = errorData.code;
    throw error;
  }

  const data = await res.json();

  // Extract data from our BFF wrapper { ok: true, data: ... }
  if (data.ok && data.data !== undefined) {
    return data.data;
  }

  return data;
}

// ==================== Recurring Accounts ====================

/**
 * Get recurring account details for a customer
 * @param customerId - Customer entity ID (e.g., "876:999")
 */
export const getRecurringAccount = (customerId: string) =>
  apiFetch<RecurringAccount>(`/api/backoffice/recurring/account/${customerId}`);

/**
 * Get recurring billings for a customer
 * @param customerId - Customer entity ID (e.g., "876:999")
 * @param limit - Number of billings to return (default: 24)
 */
export const getRecurringBillings = (customerId: string, limit = 24) =>
  apiFetch<RecurringBilling[]>(
    `/api/backoffice/recurring/account/${customerId}/billings?limit=${limit}`
  );

// ==================== Sites ====================

/**
 * List all sites
 */
export const listSites = () =>
  apiFetch<Site[]>('/api/backoffice/site/list');
