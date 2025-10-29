# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TopEdge Car Wash customer portal - a Next.js 15 application integrating with Sonny's Car Wash APIs for membership management, billing, and customer self-service.

**Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, iron-session, React Hook Form + Zod

**Package Manager**: pnpm (not npm or yarn)

## Development Commands

```bash
# Development
pnpm dev                    # Start dev server at http://localhost:3000

# Build & Production
pnpm build                  # Build for production
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Run ESLint
```

## Architecture

### Backend-for-Frontend (BFF) Pattern

The application uses a BFF pattern where Next.js API routes (`/app/api/*`) act as a secure proxy between the frontend and Sonny's APIs:

```
Frontend → BFF API Routes (/api/*) → Sonny's APIs (eCommerce & BackOffice)
```

**Why BFF?**
- Hides API credentials from client (server-side only)
- Provides consistent error handling via `lib/sonnys/errors.ts`
- Enables request/response transformation
- Simplifies frontend API calls

### Two Sonny's APIs

1. **eCommerce API** (`lib/sonnys/ecom.ts`)
   - Customer registration and authentication
   - Plan inventory and pricing
   - Order creation and payment processing
   - Receipt retrieval
   - Env vars: `SONNYS_ECOM_*`

2. **BackOffice API** (`lib/sonnys/backoffice.ts`)
   - Customer account details
   - Recurring billing history
   - Vehicle and RFID tag information
   - Site listings
   - Env vars: `SONNYS_BACKOFFICE_*`

### API Client Architecture

Three layers of API interaction:

1. **Direct API Clients** (`lib/sonnys/ecom.ts` & `lib/sonnys/backoffice.ts`)
   - Low-level API wrappers with authentication
   - Used ONLY in API routes (`app/api/*/route.ts`)
   - Never import these in client components

2. **BFF API Routes** (`app/api/*/route.ts`)
   - Next.js route handlers that proxy to Sonny's APIs
   - Handle validation (Zod schemas from `lib/sonnys/validators.ts`)
   - Manage sessions via `lib/sonnys/session.ts`
   - Return standardized responses via `lib/sonnys/errors.ts`

3. **Server Component API Client** (`lib/sonnys/server.ts`)
   - Used ONLY in Server Components (not Client Components)
   - Fetches from BFF routes (not directly from Sonny's)
   - Client Components should use `fetch()` directly to BFF routes

### Session Management

Sessions use `iron-session` for encrypted, HTTP-only cookies:

```typescript
// lib/sonnys/session.ts provides:
getSession()           // Get current session
setSession(data)       // Set session data
clearSession()         // Destroy session
isAuthenticated()      // Check auth status
requireAuth()          // Throw if not authenticated
```

**Session Data**:
- `customerId` - Customer entity ID (e.g., "876:999")
- `customerToken` - API authentication token
- `email` - Customer email

### Error Handling Pattern

All BFF routes follow this pattern:

```typescript
import { createSuccess, createError, getFriendlyErrorMessage } from '@/lib/sonnys/errors';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = SomeSchema.parse(await req.json());
    const result = await someApiCall(body);
    return NextResponse.json(createSuccess(result));
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        createError('PayloadValidationError', 'Invalid request data', error.issues),
        { status: 422 }
      );
    }
    const message = getFriendlyErrorMessage(error.code || 'UnexpectedFailure');
    return NextResponse.json(
      createError(error.code || 'UnexpectedFailure', message, error.details),
      { status: error.status || 500 }
    );
  }
}
```

## Project Structure

```
app/
├── api/                           # BFF API routes (proxy to Sonny's)
│   ├── auth/logout/              # Session management
│   ├── ecom/                     # eCommerce API proxy routes
│   │   ├── customer/register/    # Customer registration
│   │   ├── inventory/recurring/  # List membership plans
│   │   └── shop/                 # Order and payment processing
│   └── backoffice/               # BackOffice API proxy routes
│       ├── customer/search/      # Customer lookup
│       ├── recurring/account/    # Billing and account data
│       └── site/list/            # Site listings
├── portal/                       # Customer portal pages
│   ├── login/                    # Authentication
│   ├── join/                     # New member signup flow
│   │   ├── cart/                 # Plan selection
│   │   ├── checkout/             # Payment form
│   │   └── done/                 # Confirmation
│   └── dashboard/                # Member dashboard
├── locations/                    # Location pages with details
└── [other marketing pages]

lib/
├── sonnys/                       # Sonny's API integration
│   ├── ecom.ts                   # eCommerce API client (server-only)
│   ├── backoffice.ts             # BackOffice API client (server-only)
│   ├── server.ts                 # Server Component API client
│   ├── session.ts                # iron-session management
│   ├── errors.ts                 # Error handling utilities
│   └── validators.ts             # Zod validation schemas
├── data/locationsData.ts         # Location information
├── seo/schemas.ts                # SEO structured data generators
├── redirects.ts                  # 301 redirects (used in next.config.ts)
└── utils.ts                      # General utilities

components/
└── ui/                           # shadcn/ui components
```

## Key Conventions

### Path Aliases
- Use `@/` prefix for imports: `import { foo } from '@/lib/utils'`

### API Route Pattern
- BFF routes mirror Sonny's API structure under `/api/ecom/*` and `/api/backoffice/*`
- All routes validate with Zod schemas
- All routes use error handling from `lib/sonnys/errors.ts`

### Environment Variables
- Never commit `.env` file
- Use `.env.example` as template
- Required vars documented in README.md
- `NEXT_PUBLIC_APP_URL` needed for server-side BFF calls

### Sandbox vs Production
- Default uses sandbox APIs
- Sandbox limitation: eCommerce and BackOffice have separate test databases
  - Customer created via eCommerce may not exist in BackOffice
  - Dashboard shows informative message for sandbox-only customers
- Production URLs differ (see README.md or .env.example)

## Location & Pricing Data

Location and pricing data is centralized in `lib/data/locationsData.ts`:

- **locationsData** - Array of location objects with address, hours, coordinates, features, and SEO metadata
- **pricingPackages** - Wash packages with pricing (single, monthly, founderMonthly)
  - Some packages have location-specific pricing (see `locationPricing` property)
- **freeAmenities** - List of complimentary services (vacuums, mat cleaners, etc.)

When working with locations:
- Location pages use `app/locations/[slug]/page.tsx` pattern
- SEO structured data generated via `lib/seo/schemas.ts`
- Each location has unique slug, metadata, and optional badges

## Customer Flows

### New Customer Signup
1. Browse plans: `/portal/join`
2. Select plan: `/portal/join/cart`
3. Checkout: `/portal/join/checkout` → creates pending order → processes payment
4. Confirmation: `/portal/join/done` → registers customer → creates session
5. Redirect to dashboard: `/portal/dashboard`

### Existing Customer Login
1. Login: `/portal/login` → email + last 4 of credit card
2. Calls: `/api/ecom/customer/register` → creates session
3. Dashboard: `/portal/dashboard` → fetches account data from BackOffice

## Important Files to Check

When working on:
- **Authentication**: `lib/sonnys/session.ts`, `app/api/auth/logout/route.ts`
- **API Integration**: `lib/sonnys/ecom.ts`, `lib/sonnys/backoffice.ts`, `lib/sonnys/errors.ts`
- **Validation**: `lib/sonnys/validators.ts`
- **Server Components**: `lib/sonnys/server.ts` (fetches from BFF routes)
- **Redirects**: `lib/redirects.ts` (imported by `next.config.ts`)
- **SEO**: `lib/seo/schemas.ts` (structured data for location pages)
- **Locations**: `lib/data/locationsData.ts` (location details, pricing, amenities)

## Security Notes

- API keys are server-side only (never exposed to client)
- Session cookies are HTTP-only and secure (production)
- All inputs validated with Zod
- Error messages sanitized (no system details exposed to client)
- Never commit `.env` file
