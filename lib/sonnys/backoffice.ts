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
    throw await formatError(res);
  }

  return res.json() as Promise<T>;
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
 */
export const getRecurringAccount = (customerId: string) =>
  boFetch<RecurringAccount>(`/recurring/account/${customerId}`);

/**
 * Get recurring billings for a customer
 */
export const getRecurringBillings = (customerId: string, limit = 24) =>
  boFetch<RecurringBilling[]>(
    `/recurring/account/${customerId}/billings?limit=${limit}`
  );

// ==================== Sites ====================

/**
 * List all sites
 */
export const listSites = () => boFetch<Site[]>('/site/list');
