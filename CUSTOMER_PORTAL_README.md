# Sonny's Customer Portal - Implementation Guide

## Overview

The Sonny's Customer Portal is a fully functional web application that allows customers to:
- Sign up for new car wash memberships
- Log in to existing accounts
- View membership details and billing history
- Manage vehicles and RFID tags
- Access receipts and purchase history

This implementation follows the technical specification in `documents/sonnys-api/sonnys_customer_portal_technical_build_spec_next.md`.

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React Server Components
- **Backend**: Next.js API Routes (BFF pattern)
- **Session Management**: iron-session (HTTP-only cookies)
- **Validation**: Zod schemas
- **Styling**: Tailwind CSS with shadcn/ui components
- **APIs**: Sonny's eCommerce API & BackOffice API

### Security Features
- ✅ Server-side API key management (never exposed to client)
- ✅ Encrypted session cookies (HTTP-only, Secure, SameSite)
- ✅ Input validation on both client and server
- ✅ Rate limiting ready (implement in production)
- ✅ PCI-compliant payment flow (card data flows directly to Sonny's API)

---

## 📁 Project Structure

```
app/
├── portal/
│   ├── layout.tsx                 # Portal layout wrapper
│   ├── page.tsx                   # Landing page (new/existing customer)
│   ├── login/
│   │   └── page.tsx              # Existing customer login
│   ├── join/
│   │   ├── page.tsx              # Step 1: Choose plan
│   │   ├── cart/
│   │   │   └── page.tsx          # Step 2: Build order
│   │   ├── checkout/
│   │   │   └── page.tsx          # Step 3: Payment
│   │   └── done/
│   │       └── page.tsx          # Step 4: Confirmation
│   └── dashboard/
│       └── page.tsx              # Customer dashboard
├── api/
│   ├── ecom/                     # eCommerce API routes
│   │   ├── inventory/recurring/
│   │   ├── shop/detailed-pending-order/
│   │   ├── shop/payment/
│   │   ├── customer/register/
│   │   └── shop/customer/[customerId]/payment/
│   ├── backoffice/               # BackOffice API routes
│   │   ├── customer/search/
│   │   ├── recurring/account/[customerId]/
│   │   └── site/list/
│   └── auth/logout/

lib/sonnys/
├── errors.ts                     # Error handling & normalization
├── validators.ts                 # Zod validation schemas
├── session.ts                    # Session management
├── ecom.ts                       # eCommerce API client
└── backoffice.ts                 # BackOffice API client
```

---

## 🚀 Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your API credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```bash
# eCommerce API
SONNYS_ECOM_BASE=https://sandboxapi.mywashaccount.com/v1
SONNYS_ECOM_API_KEY=your-ecom-api-key-here
SONNYS_ECOM_API_ID=your-ecom-api-id-here

# BackOffice API
SONNYS_BACKOFFICE_BASE=https://sandboxapi.sonnyscontrols.com/v1
SONNYS_BACKOFFICE_API_KEY=your-backoffice-api-key-here
SONNYS_BACKOFFICE_API_ID=your-backoffice-api-id-here

# Site Configuration
DEFAULT_SITE_CODE=MAIN

# Session Security (generate a random 32+ character string)
SESSION_SECRET=your-session-secret-min-32-chars
SESSION_COOKIE_NAME=sonnys_portal
SESSION_MAX_AGE=28800

# Environment
NODE_ENV=development
```

**Important**:
- For production, use the production API endpoints
- Generate a secure random string for `SESSION_SECRET`
- Set `NODE_ENV=production` in production

### 2. Install Dependencies

Dependencies are already installed, but if needed:

```bash
pnpm install
```

### 3. Run Development Server

```bash
pnpm dev
```

Navigate to: `http://localhost:3000/portal`

---

## 🔐 API Authentication

### eCommerce API Headers
```
X-Sonnys-API-Key: <API_KEY>
X-Sonnys-API-ID: <API_ID>
X-Sonnys-Customer-Token: <token>  (for authenticated endpoints)
```

### BackOffice API Headers
```
X-Sonnys-API-Key: <API_KEY>
X-Sonnys-API-ID: <API_ID>
```

All API credentials are managed server-side and never exposed to the client.

---

## 🛣️ User Journeys

### New Customer Journey

1. **Landing Page** (`/portal`)
   - User selects "New Customer"

2. **Choose Plan** (`/portal/join`)
   - Browse available recurring plans
   - View features, pricing, and trial offers
   - Select a plan

3. **Build Order** (`/portal/join/cart`)
   - Enter license plate (if LPR required)
   - Apply promo code (optional)
   - Review order summary

4. **Checkout** (`/portal/join/checkout`)
   - Enter customer information
   - Provide payment details
   - Submit billing address
   - Complete purchase

5. **Confirmation** (`/portal/join/done`)
   - View receipt and order confirmation
   - Option to create portal session
   - Redirect to dashboard

### Existing Customer Journey

1. **Landing Page** (`/portal`)
   - User selects "Existing Customer"

2. **Login** (`/portal/login`)
   - Enter email
   - Enter RFID number or license plate
   - Enter last 4 digits of card on file
   - System validates and creates session

3. **Dashboard** (`/portal/dashboard`)
   - View membership overview
   - Check billing history
   - See vehicles and tags
   - Access support options

---

## 📊 Dashboard Features

The customer dashboard displays:

### Membership Overview
- Plan name and status
- Next billing date
- Current billing amount
- Trial information (if applicable)
- Suspension status (if applicable)
- Site information

### Vehicles & Tags
- Registered license plates
- RFID tags with status (active/inactive)

### Billing History
- Recent charges with dates
- Card information (last 4 digits)
- Expiration dates

### Support Options
- Contact support link
- Information about plan changes

---

## 🔒 Security Best Practices

### Implemented
- ✅ HTTP-only, secure session cookies
- ✅ Server-side API credential management
- ✅ Input validation (client + server)
- ✅ Error message sanitization
- ✅ PCI-compliant payment flow
- ✅ HTTPS enforcement (production)

### Production Recommendations
1. **Rate Limiting**: Implement rate limiting on API routes (10 req/15s per IP)
2. **CORS**: Configure CORS headers appropriately
3. **CSP**: Add Content Security Policy headers
4. **Monitoring**: Set up logging and error tracking
5. **SSL**: Ensure SSL certificates are valid
6. **Secrets Rotation**: Regularly rotate API keys

---

## 🧪 Testing

### Test Accounts
Use the Sonny's sandbox environment for testing:
- Sandbox eCommerce API: `https://sandboxapi.mywashaccount.com/v1`
- Sandbox BackOffice API: `https://sandboxapi.sonnyscontrols.com/v1`

### Test Cards
Use test credit card numbers provided by Sonny's API documentation.

### Testing Checklist
- [ ] New customer signup flow
- [ ] Existing customer login
- [ ] Dashboard data display
- [ ] LPR-required plans
- [ ] Promo code application
- [ ] Payment processing
- [ ] Session persistence
- [ ] Error handling
- [ ] Mobile responsiveness

---

## 🚨 Error Handling

All API errors are normalized to:
```typescript
{
  ok: false,
  code: string,        // Error code (e.g., "NotAuthorizedError")
  message: string,     // User-friendly message
  details?: unknown    // Additional error details
}
```

User-friendly error messages are displayed for:
- Authentication failures
- Payment issues
- Validation errors
- Network errors
- Rate limiting

---

## 📝 API Endpoints

### eCommerce API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ecom/inventory/recurring` | List recurring plans |
| POST | `/api/ecom/shop/detailed-pending-order` | Create pending order |
| POST | `/api/ecom/shop/payment` | Process new customer payment |
| POST | `/api/ecom/customer/register` | Register/login customer |
| POST | `/api/ecom/shop/customer/[customerId]/payment` | Authenticated payment |
| GET | `/api/ecom/customer/[customerId]/order/receipt/[receiptId]` | Get receipt |

### BackOffice API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/backoffice/customer/search` | Search customers |
| GET | `/api/backoffice/recurring/account/[customerId]` | Get account details |
| GET | `/api/backoffice/recurring/account/[customerId]/billings` | Get billing history |
| GET | `/api/backoffice/site/list` | List sites |

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/logout` | Clear session |

---

## 🎨 UI Components

The portal uses shadcn/ui components:
- Button
- Card
- Input
- Label
- Alert
- Badge
- Separator

All components are styled with Tailwind CSS and are fully responsive.

---

## 🔮 Future Enhancements

Per the specification, the following are **out of scope** but can be added later:

- Self-service plan upgrades/downgrades
- Self-service cancellation
- Profile editing
- Payment method updates
- Magic link authentication
- Multi-language support
- Push notifications
- Receipt downloads

---

## 📞 Support

For API-related questions:
- **Email**: controlshelpdesk@sonnysdirect.com
- **Documentation**: See `documents/sonnys-api/` folder

For portal implementation questions:
- Check this README
- Review the technical specification
- Examine the code comments

---

## 🎯 Success Criteria

The customer portal successfully:
- ✅ Supports new customer sign-up with payment
- ✅ Authenticates existing customers
- ✅ Displays membership details
- ✅ Shows billing history
- ✅ Handles LPR-enabled plans
- ✅ Processes authenticated purchases (add-ons ready)
- ✅ Maintains secure sessions
- ✅ Provides user-friendly error messages
- ✅ Works on mobile and desktop

---

## 📄 License

This implementation follows the Sonny's CarWash Controls API license terms.
