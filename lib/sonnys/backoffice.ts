/**
 * Sonny's BackOffice API Client
 * Handles all BackOffice API requests (read-only)
 */

import { formatError } from './errors';

const BO_BASE = process.env.SONNYS_BACKOFFICE_BASE!;
const BO_API_KEY = process.env.SONNYS_BACKOFFICE_API_KEY!;
const BO_API_ID = process.env.SONNYS_BACKOFFICE_API_ID!;

/**
 * Generic fetch wrapper for BackOffice API
 */
async function boFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Sonnys-API-Key': BO_API_KEY,
    'X-Sonnys-API-ID': BO_API_ID,
    ...(init.headers || {}),
  };

  const res = await fetch(`${BO_BASE}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
    // Short TTL for dashboard reads (30-60s as per spec)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error('[BO] API error response:', {
      path,
      status: res.status,
      statusText: res.statusText,
    });
    throw await formatError(res);
  }

  const data = await res.json();
  console.log('[BO] API response for', path, ':', JSON.stringify(data, null, 2).substring(0, 300));

  return data as T;
}

// ==================== Types ====================

export interface Customer {
  id: string;
  number: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  loyaltyNumber?: string;
  address?: {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  phone?: string;
  email?: string;
  birthDate?: string;
  isActive: boolean;
  allowSms: boolean;
  recurringSmsSignupDate?: string;
  loyaltySmsSignupDate?: string;
  modifyDate: string;
}

export interface RecurringAccount {
  id: string;
  planName: string;
  status: string;
  billingSiteCode: string;
  creationSiteCode: string;
  nextBillDate: string;
  lastBillDate?: string;
  billingAmount?: number;
  isOnTrial: boolean;
  trialAmount?: number;
  isSuspended: boolean;
  suspendedUntil?: string;
  currentRecurringStatusName: string;
  tags: Array<{
    id: string;
    number: string;
    enabled: boolean;
  }>;
  vehicles: Array<{
    id: string;
    plate?: string;
  }>;
  customer?: {
    id?: string;
    number?: string;
    firstName?: string;
    lastName?: string;
  };
  recurringStatuses: Array<{
    status: string;
    date: string;
  }>;
  recurringBillings: Array<{
    amountCharged: number;
    date: string;
    lastFourCC: string;
    creditCardExpirationDate?: string;
  }>;
  additionalTagPrice?: number;
}

export interface RecurringBilling {
  amountCharged: number;
  date: string;
  lastFourCC: string;
  creditCardExpirationDate?: string;
}

export interface Site {
  code: string;
  name: string;
  timezone?: string;
}

// ==================== Customer ====================

/**
 * Search for a customer
 */
export const searchCustomer = (params: {
  email?: string;
  firstName?: string;
  lastName?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params.email) searchParams.set('email', params.email);
  if (params.firstName) searchParams.set('firstName', params.firstName);
  if (params.lastName) searchParams.set('lastName', params.lastName);

  return boFetch<Customer[]>(`/customer/search?${searchParams.toString()}`);
};

/**
 * Get customer by ID
 */
export const getCustomer = (customerId: string) =>
  boFetch<Customer>(`/customer/${customerId}`);

// ==================== Recurring Accounts ====================

/**
 * Get recurring account details for a customer
 * Note: This finds the account by customer ID, then fetches details by account ID
 */
export const getRecurringAccount = async (customerId: string): Promise<RecurringAccount> => {
  // First, find the account ID for this customer
  const listResponse = await boFetch<{
    data: {
      accounts: Array<{ id: string; customerId: string; statusName: string }>;
    };
  }>(`/recurring/account/list?limit=100`);

  // Find the account for this customer (prefer Active status)
  const customerAccounts = listResponse.data.accounts.filter(
    (acc) => acc.customerId === customerId
  );

  if (customerAccounts.length === 0) {
    const error: any = new Error('No recurring account found for this customer');
    error.status = 404;
    error.code = 'EntityNotFoundError';
    throw error;
  }

  // Get the first active account, or just the first one
  const account =
    customerAccounts.find((acc) => acc.statusName === 'Active' || acc.statusName === 'ACTIVE') ||
    customerAccounts[0];

  const accountId = account.id;

  console.log('[BO] Found account ID for customer:', { customerId, accountId });

  // Now fetch the full account details using the account ID
  const detailResponse = await boFetch<{ data: RecurringAccount }>(`/recurring/account/${accountId}/detail`);
  return detailResponse.data;
};

/**
 * Get recurring billings for a customer
 * Note: This finds the account by customer ID, then fetches billings by account ID
 */
export const getRecurringBillings = async (customerId: string, limit = 24): Promise<RecurringBilling[]> => {
  // First, find the account ID for this customer
  const listResponse = await boFetch<{
    data: {
      accounts: Array<{ id: string; customerId: string; statusName: string }>;
    };
  }>(`/recurring/account/list?limit=100`);

  // Find the account for this customer
  const customerAccounts = listResponse.data.accounts.filter(
    (acc) => acc.customerId === customerId
  );

  if (customerAccounts.length === 0) {
    // No account found, return empty array
    return [];
  }

  // Get the first active account, or just the first one
  const account =
    customerAccounts.find((acc) => acc.statusName === 'Active' || acc.statusName === 'ACTIVE') ||
    customerAccounts[0];

  const accountId = account.id;

  console.log('[BO] Found account ID for billings:', { customerId, accountId });

  // Now fetch billings using the account ID - billings endpoint may return empty array or error for new accounts
  try {
    const billingsResponse = await boFetch<{ data: RecurringBilling[] }>(
      `/recurring/account/${accountId}/billings?limit=${limit}`
    );
    return billingsResponse.data || [];
  } catch (error) {
    // If billings endpoint fails (e.g., for new accounts with no billing history), return empty array
    console.log('[BO] No billings found for account:', accountId);
    return [];
  }
};

// ==================== Sites ====================

/**
 * List all sites
 */
export const listSites = () => boFetch<Site[]>('/site/list');
