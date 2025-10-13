/**
 * Zod validation schemas for Sonny's API requests
 */

import { z } from 'zod';

// Entity Identifier pattern (e.g., "45678:1001")
export const EntityIdSchema = z.string().regex(/^\d+:\d+$/, 'Invalid entity ID format');

// Address Schema (matches Sonny's API AddressObject)
export const AddressSchema = z.object({
  address1: z.string().min(1).max(50),
  address2: z.string().max(50).optional().default(''),
  city: z.string().min(1).max(50),
  state: z.string().regex(/^[A-Z]{2}$/, 'State must be 2 uppercase letters'),
  postalCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid postal code'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits').optional(),
});

// Customer Schema
export const CustomerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
});

// Payment Schema (matches Sonny's API PaymentBillingObject)
export const PaymentSchema = z.object({
  cardNumber: z.string().regex(/^[\d]{13,19}$/, 'Card number must be 13-19 digits'),
  expMonth: z.number().int().min(1).max(12),
  expYear: z.number().int().min(0).max(99), // 2-digit year (e.g., 25 for 2025)
  securityCode: z.string().regex(/^[\d]{3,4}$/, 'Security code must be 3-4 digits'),
  cardFullName: z.string().min(2).max(50),
  address: AddressSchema,
});

// Order Item Schema
export const OrderItemSchema = z.object({
  id: EntityIdSchema,
  quantity: z.number().int().positive(),
  licensePlate: z.string().regex(/^[A-Za-z0-9]{3,10}$/).optional(),
});

// Detailed Pending Order Request Schema
export const DetailedPendingOrderSchema = z.object({
  siteCode: z.string().min(3).max(4),
  orderItems: z.array(OrderItemSchema).min(1),
  discountCode: z.string().optional(),
});

// Payment Request Schema (New Customer) - matches Sonny's API OrderObject
export const PaymentRequestSchema = z.object({
  pendingOrderToken: z.string().min(1),
  customer: CustomerSchema,
  paymentInfo: PaymentSchema,
});

// Customer Register/Login Schema
export const CustomerRegisterSchema = z.object({
  email: z.string().email(),
  productCode: z.string().min(3, 'Product code must be at least 3 characters'),
  lastFourCreditCard: z.string().length(4, 'Last 4 digits must be exactly 4 characters').regex(/^\d+$/, 'Must be numeric'),
});

// Authenticated Payment Request Schema
export const AuthenticatedPaymentSchema = z.object({
  pendingOrderToken: z.string().min(1),
});

// Site Code Schema
export const SiteCodeSchema = z.string().min(3).max(4);

// Customer ID Parameter Schema
export const CustomerIdParamSchema = z.object({
  customerId: EntityIdSchema,
});

// Receipt ID Parameter Schema
export const ReceiptIdParamSchema = z.object({
  receiptId: EntityIdSchema,
});

// Query parameter schemas
export const BillingsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional().default(24),
});

export const CustomerSearchQuerySchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
}).refine(data => data.email || (data.firstName && data.lastName), {
  message: 'Either email or both firstName and lastName are required',
});
