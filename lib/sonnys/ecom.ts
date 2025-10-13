/**
 * Sonny's eCommerce API Client
 * Handles all eCommerce API requests with proper authentication
 */

import { formatError } from './errors';

const ECOM_BASE = process.env.SONNYS_ECOM_BASE!;
const ECOM_API_KEY = process.env.SONNYS_ECOM_API_KEY!;
const ECOM_API_ID = process.env.SONNYS_ECOM_API_ID!;

/**
 * Generic fetch wrapper for eCommerce API
 */
async function ecomFetch<T>(
  path: string,
  init: RequestInit = {},
  customerToken?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Sonnys-API-Key': ECOM_API_KEY,
    'X-Sonnys-API-ID': ECOM_API_ID,
    ...(init.headers as Record<string, string> || {}),
  };

  // Add customer token if provided
  if (customerToken) {
    headers['X-Sonnys-Customer-Token'] = customerToken;
  }

  const res = await fetch(`${ECOM_BASE}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw await formatError(res);
  }

  return res.json() as Promise<T>;
}

// ==================== Types ====================

export interface RecurringPlan {
  id: string;
  name: string;
  price: number;
  sku: string;
  lprEnabled: boolean;
  canBeUpgraded: boolean;
  canBeCancelled: boolean;
  isAnnual: boolean;
  applicableWash: string;
  redemptionIsUnlimited: boolean;
  redemptionLimit?: number;
  hasTrial: boolean;
  trialPrice?: number;
  trialLength?: number;
  frequencyLimit: number;
  frequencyLimitType?: string;
  locations?: Location[];
  additionalTagPrice?: number;
}

export interface Location {
  siteCode: string;
  taxRate?: number;
  additionalFeeRate?: number;
  retailPrice?: number;
}

export interface PendingOrder {
  token: string;
  expiresAt: string;
  skipTrialPriceForRecurring: boolean;
}

export interface DetailedPendingOrder extends PendingOrder {
  totalAmount: number;
  subTotal: number;
  totalTax: number;
  proratedDiscountAmount?: number;
  proratedDays?: number;
}

export interface PaymentResponse {
  customerId: string;
  secretToken: string;
  receiptId: string;
  uri: string;
}

export interface CustomerRegisterResponse {
  id: string;
  customerToken: string;
}

export interface OrderReceipt {
  receiptNumber: number;
  transId: string;
  transType: string;
  itemCount: number;
  total: number;
  date: string;
  transItems: Array<{
    id: string;
    name: string;
    quantity: number;
    total: number;
    taxRate: number;
  }>;
  tenders: Array<{
    tender: string;
    amount: number;
  }>;
}

// ==================== Inventory ====================

/**
 * List all recurring plans available for purchase
 */
export const listRecurringPlans = async () => {
  const response = await ecomFetch<{ data: RecurringPlan[] }>('/inventory/recurring');
  return response.data;
};

// ==================== Cart/Order ====================

export interface CreatePendingOrderRequest {
  siteCode: string;
  orderItems: Array<{
    id: string;
    quantity: number;
    licensePlate?: string;
  }>;
  discountCode?: string;
}

/**
 * Create a detailed pending order
 */
export const createDetailedPendingOrder = (body: CreatePendingOrderRequest) =>
  ecomFetch<DetailedPendingOrder>('/shop/detailed-pending-order', {
    method: 'POST',
    body: JSON.stringify(body),
  });

// ==================== Payment ====================

export interface PaymentRequest {
  pendingOrderToken: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  paymentInfo: {
    cardNumber: string;
    expMonth: number;
    expYear: number;
    securityCode: string;
    cardFullName: string;
    address: {
      address1: string;
      address2?: string;
      city: string;
      state: string;
      postalCode: string;
      phone?: string;
    };
  };
}

/**
 * Process payment for new customer
 */
export const processPayment = async (body: PaymentRequest): Promise<PaymentResponse> => {
  const response = await ecomFetch<{ data: PaymentResponse[] }>('/shop/payment', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  // API returns data as an array with one element, extract it
  return response.data[0];
};

/**
 * Process payment for authenticated customer
 */
export const processCustomerPayment = (
  customerId: string,
  customerToken: string,
  pendingOrderToken: string
) =>
  ecomFetch<PaymentResponse>(
    `/shop/customer/${customerId}/payment`,
    {
      method: 'POST',
      body: JSON.stringify({ pendingOrderToken }),
    },
    customerToken
  );

// ==================== Customer Authentication ====================

export interface RegisterRequest {
  email: string;
  productCode: string;
  lastFourCreditCard: string;
}

/**
 * Register/mint customer token for authentication
 */
export const registerCustomer = (body: RegisterRequest) =>
  ecomFetch<CustomerRegisterResponse>('/customer/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });

// ==================== Receipts ====================

/**
 * Get order receipt
 */
export const getReceipt = (
  customerId: string,
  receiptId: string,
  customerToken: string
) =>
  ecomFetch<OrderReceipt>(
    `/customer/${customerId}/order/receipt/${receiptId}`,
    {},
    customerToken
  );
