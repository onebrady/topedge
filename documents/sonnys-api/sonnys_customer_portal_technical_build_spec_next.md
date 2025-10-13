# Sonny’s Customer Portal — Build Spec (Next.js)

> **Goal:** Ship a production‑ready customer portal embedded in your website that supports **new customer sign‑up**, **existing customer sign‑in (token based)**, **membership visibility**, **receipts/history**, and **authenticated purchases** of add‑ons. This spec uses Sonny’s **eCommerce API** (checkout, token, inventory) and **BackOffice API** (read‑only customer + recurring account details). We explicitly exclude plan cancel/upgrade/downgrade operations.

---

## 0) High‑Level Architecture

- **Frontend:** Next.js (App Router), React Server Components for data fetch where possible, Client Components for forms.
- **Backend (within Next.js):** Route handlers `/app/api/*` acting as a thin BFF (Backend‑For‑Frontend) that:
  - Injects required headers/keys for eCom/BackOffice
  - Validates input, rate‑limits, and shields API secrets
  - Normalizes responses for the UI
- **Auth model (customer):** Token mint via **eCom `POST /customer/register`** using **email + agent productCode (RFID/LPR) + last 4 of card**. Store `customerId` + `customerToken` server‑side in a secure session (HTTP‑only cookie + server store)
- **Data sources:**
  - **eCommerce:** inventory, cart/pending order, payment/checkout, receipts, customer‑scoped purchases
  - **BackOffice:** customer profile (read), recurring account detail (read), recurring billings (read), site list
- **State & caching:** ISR/route‑cache for public catalog; no caching for personalized endpoints; short TTL (30–60s) for BackOffice reads on dashboards

---

## 1) Environment & Secrets (.env)

```bash
# API base URLs (examples — match client’s environment)
SONNYS_ECOM_BASE=https://ecom.api.sonnysdirect.com
SONNYS_BACKOFFICE_BASE=https://backoffice.api.sonnysdirect.com

# API Keys / tenant identifiers
SONNYS_ECOM_API_KEY=***
SONNYS_BACKOFFICE_API_KEY=***

# Multi‑site deployments (optional default)
DEFAULT_SITE_CODE=MAIN-001

# App security
NEXTAUTH_SECRET=***  # if using next-auth for session crypto; else your own secret
SESSION_COOKIE_NAME=sonnys_portal
```

> All credentials are **server‑only**. Never expose keys in client bundles. All direct API calls happen inside Next.js **route handlers**.

---

## 2) Global Conventions (Headers, Errors, Rate Limits)

### eCommerce
- **Auth header:** `X-Api-Key: <SONNYS_ECOM_API_KEY>` (server‑to‑server)
- **Customer auth header (after token mint):** `X-Sonnys-Customer-Token: <token>`
- **Content-Type:** `application/json`

### BackOffice
- **Auth header:** `X-Api-Key: <SONNYS_BACKOFFICE_API_KEY>`
- **Content-Type:** `application/json`

### Error handling
- Normalize to `{ ok: boolean, code, message, details? }`
- Log server‑side; present friendly messages client‑side; never echo raw vendor errors to UI.

### Rate limiting (recommendation)
- In `/app/api/*`, apply token bucket (e.g., 10 req/15s per IP) using KV/Upstash/Edge runtime.

---

## 3) User Journeys (Wireflow)

### Landing: `/portal`
- Two primary CTAs: **New Customer** and **Existing Customer**
- Optional site picker if multiple sites (pre‑select via geolocation or cookie)

#### Public (Unauthenticated) → New Customer Path
1) **Choose Plan** (`/portal/join`)
   - Fetch recurring plans from eCom: `GET /inventory/recurring`
   - Card grid w/ price, benefits, LPR requirements badge
   - CTA: **Continue** (select plan)
2) **Build Order** (`/portal/join/cart`)
   - Create detailed pending order: `POST /shop/detailed-pending-order`
   - Required body:
     - `siteCode`
     - `orderItems: [{ id: <planId>, quantity: 1, licensePlate? }]`
   - If plan requires LPR → prompt for `licensePlate`
   - Show tax/total; promo code input (optional)
3) **Checkout** (`/portal/join/checkout`)
   - `POST /shop/payment` with `pendingOrderToken` + customer + card + billing address
   - On success: capture `{ customerId, secretToken, receipt }`
4) **Confirmation & Session Offer** (`/portal/join/done`)
   - Show receipt/URI
   - Offer **Create Portal Session** → call `POST /customer/register` with `(email, productCode=RFID_or_LPR, lastFourCreditCard)` to mint **customerToken**
   - Store `(customerId, customerToken)` in secure session → redirect to **Dashboard**

#### Existing Customer Path
1) **Verify Account** (`/portal/login`)
   - Form inputs: `email`, `agent` (RFID or license plate), `cardLast4`
   - `POST /customer/register` → returns `{ id, customerToken }`
   - Store in session and redirect to **Dashboard**
2) **Dashboard** (`/portal`) — Auth required
   - **Membership overview (BackOffice)**: plan name, status, next bill date, vehicles/tags, trial flags
   - **Recurring billings (BackOffice)**: list recent charges (date, amount, last4, exp)
   - **Receipts (eCom)**: order history / receipt links if available
   - **Buy Add‑Ons (eCom)**: CTA to product catalog; purchase with customer token

> Excluded: cancel/upgrade/downgrade. Provide a "Request change" contact if desired.

---

## 4) Endpoint Map & Example Payloads

### 4.1 eCommerce — Catalog & Cart

**List Recurring Plans**
```
GET /inventory/recurring
Headers: X-Api-Key
```
_Response (shape excerpt)_
```json
[
  {
    "id": "PLAN_UNLTD_01",
    "name": "Unlimited Exterior",
    "price": 24.99,
    "requiresLicensePlate": true,
    "description": "Unlimited exterior washes per month",
    "tags": ["popular", "lpr"]
  }
]
```

**Create Detailed Pending Order**
```
POST /shop/detailed-pending-order
Headers: X-Api-Key
Body:
{
  "siteCode": "MAIN-001",
  "orderItems": [
    { "id": "PLAN_UNLTD_01", "quantity": 1, "licensePlate": "ABC123" }
  ],
  "discountCode": "WELCOME10"   // optional
}
```
_Response_
```json
{
  "pendingOrderToken": "eyJhbGci...",
  "subtotal": 24.99,
  "tax": 2.00,
  "total": 26.99
}
```

### 4.2 eCommerce — Checkout (New Customer)

**Take Payment & Create Customer**
```
POST /shop/payment
Headers: X-Api-Key
Body:
{
  "pendingOrderToken": "eyJhbGci...",
  "customer": {
    "firstName": "Jamie",
    "lastName": "Rivera",
    "email": "jamie@example.com",
    "phone": "+19015551234"
  },
  "payment": {
    "cardNumber": "4242424242424242",
    "expMonth": 10,
    "expYear": 2028,
    "securityCode": "123",
    "cardFullName": "JAMIE RIVERA",
    "billingAddress": {
      "street": "100 Main St",
      "city": "Memphis",
      "state": "TN",
      "postalCode": "38103",
      "phone": "+19015551234"
    }
  }
}
```
_Response (shape excerpt)_
```json
{
  "customerId": 123456,
  "secretToken": "c3VwZXJzZWNyZXQ...",
  "receipt": {
    "receiptId": "RCP-7890",
    "uri": "/customer/123456/order/receipt/RCP-7890"
  }
}
```

### 4.3 eCommerce — Customer Token (Login/Verify)

**Register (Issue/Reissue Customer Token)**
```
POST /customer/register
Headers: X-Api-Key
Body:
{
  "email": "jamie@example.com",
  "productCode": "ABC123",        // RFID or License Plate associated to the account
  "lastFourCreditCard": "4242"
}
```
_Response_
```json
{
  "id": 123456,
  "customerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Use the returned `id` + `customerToken` in subsequent **customer‑scoped eCom** calls via header `X-Sonnys-Customer-Token`.

### 4.4 eCommerce — Customer Purchases & Receipts

**Pay as Authenticated Customer**
```
POST /shop/customer/{customerId}/payment
Headers:
  X-Api-Key: <...>
  X-Sonnys-Customer-Token: <token>
Body:
{
  "pendingOrderToken": "eyJhbGci..."
}
```

**Get Receipt (example)**
```
GET /customer/{customerId}/order/receipt/{receiptId}
Headers:
  X-Api-Key
  X-Sonnys-Customer-Token
```

### 4.5 BackOffice — Read Customer & Recurring

**Search Customer** (for admin/CS or to enrich dashboard names)
```
GET /customer/search?email=jamie@example.com
Headers: X-Api-Key
```

**Get Recurring Account (by customer)**
```
GET /recurring/account/{customerId}
Headers: X-Api-Key
```
_Response (shape excerpt)_
```json
{
  "planName": "Unlimited Exterior",
  "status": "Active",
  "nextBillDate": "2025-11-01",
  "vehicles": [{ "licensePlate": "ABC123" }],
  "tags": [{ "type": "RFID", "code": "RFID-000111" }],
  "trial": false,
  "suspended": false
}
```

**List Recurring Billings**
```
GET /recurring/account/{customerId}/billings?limit=24
Headers: X-Api-Key
```
_Response (shape excerpt)_
```json
[
  { "date": "2025-10-01", "amountCharged": 26.99, "lastFourCC": "4242", "exp": "10/28" },
  { "date": "2025-09-01", "amountCharged": 26.99, "lastFourCC": "4242", "exp": "10/28" }
]
```

**List Sites** (for picker)
```
GET /site/list
Headers: X-Api-Key
```

> BackOffice endpoints are **read‑only** for our scope. Use them to populate the dashboard and history.

---

## 5) Next.js File Structure (App Router)

```
/app
  /portal
    page.tsx                 # Landing (choose new vs existing)
    layout.tsx
    /join
      page.tsx               # Choose plan
      /cart
        page.tsx             # Build order (pending order)
      /checkout
        page.tsx             # Payment form
      /done
        page.tsx             # Confirmation + token offer
    /login
      page.tsx               # Issue customer token (register)
    /dashboard
      page.tsx               # Membership overview + billings + receipts + add-ons

/api
  /ecom
    inventory/recurring/route.ts
    shop/detailed-pending-order/route.ts
    shop/payment/route.ts
    customer/register/route.ts
    shop/customer/[customerId]/payment/route.ts
    customer/[customerId]/order/receipt/[receiptId]/route.ts
  /backoffice
    customer/search/route.ts
    recurring/account/[customerId]/route.ts
    recurring/account/[customerId]/billings/route.ts
    site/list/route.ts

/lib
  ecom.ts           # typed fetchers for eCom
  backoffice.ts     # typed fetchers for BackOffice
  session.ts        # secure cookie/session helpers
  validators.ts     # zod schemas for inputs
  errors.ts         # normalize errors
```

---

## 6) Server Fetch Helpers (Pseudo‑TS)

```ts
// lib/ecom.ts
const ECOM = process.env.SONNYS_ECOM_BASE!;
const ECOM_KEY = process.env.SONNYS_ECOM_API_KEY!;

async function ecomFetch<T>(path: string, init: RequestInit = {}) {
  const res = await fetch(`${ECOM}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': ECOM_KEY,
      ...(init.headers || {})
    },
    cache: 'no-store'
  });
  if (!res.ok) throw await formatError(res);
  return res.json() as Promise<T>;
}

export const listRecurring = () => ecomFetch('/inventory/recurring');
export const createPendingOrder = (body: any) => ecomFetch('/shop/detailed-pending-order', { method: 'POST', body: JSON.stringify(body) });
export const payNew = (body: any) => ecomFetch('/shop/payment', { method: 'POST', body: JSON.stringify(body) });
export const registerToken = (body: any) => ecomFetch('/customer/register', { method: 'POST', body: JSON.stringify(body) });
export const payAsCustomer = (customerId: number, token: string, body: any) =>
  ecomFetch(`/shop/customer/${customerId}/payment`, { method: 'POST', body: JSON.stringify(body), headers: { 'X-Sonnys-Customer-Token': token } });
```

```ts
// lib/backoffice.ts
const BO = process.env.SONNYS_BACKOFFICE_BASE!;
const BO_KEY = process.env.SONNYS_BACKOFFICE_API_KEY!;

async function boFetch<T>(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BO}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': BO_KEY,
      ...(init.headers || {})
    },
    cache: 'no-store'
  });
  if (!res.ok) throw await formatError(res);
  return res.json() as Promise<T>;
}

export const searchCustomer = (q: string) => boFetch(`/customer/search?${q}`);
export const getRecurring = (customerId: number) => boFetch(`/recurring/account/${customerId}`);
export const getRecurringBillings = (customerId: number, limit = 24) => boFetch(`/recurring/account/${customerId}/billings?limit=${limit}`);
export const listSites = () => boFetch('/site/list');
```

---

## 7) Forms & Validation

- Use **zod** schemas on both client and server to validate:
  - New checkout: customer identity + card + address
  - Existing login: `{ email: z.string().email(), productCode: z.string().min(3), last4: z.string().length(4) }`
- If plan requires LPR: enforce `licensePlate` capture before creating pending order

---

## 8) Sessions & Security

- Store `{ customerId, customerToken }` in a server‑side session (e.g., iron‑session or next‑auth custom) with **HTTP‑only**, **Secure**, **SameSite=Lax/Strict** cookies
- Expire session on server after N hours; on each dashboard load, optionally **probe** a lightweight authenticated endpoint to ensure token still valid
- Never persist `customerToken` in localStorage; never expose in client JS logs

---

## 9) Dashboard Composition

- **Top summary:** plan name, status, next bill date (BackOffice)
- **Vehicles / Tags:** license plates + RFID tags (BackOffice)
- **Recent charges:** last 6–12 entries (BackOffice)
- **Receipts:** link out or fetch receipt details (eCom)
- **Add‑ons:** grid of purchasable items (eCom inventory) with **Add** → pending order → `POST /shop/customer/{id}/payment`

> All reads are safe even if eCom token is stale; BackOffice is independent. Authenticated purchases require a fresh eCom token.

---

## 10) Edge Cases & Guardrails

- **Multi‑site:** A price may depend on `siteCode`. Capture site early; persist in cookie.
- **LPR required:** Block checkout if license plate missing; the pending order step will fail otherwise.
- **Register failures:** If `POST /customer/register` fails due to wrong agent or last4, allow customer to retry; provide hint to contact support.
- **PCI handling:** Card data must only flow from client → our server → eCom `POST /shop/payment` over TLS. Do not store PAN/CSC; log redaction enabled server‑side.
- **Race conditions:** Serialise order → pay; do not re‑use `pendingOrderToken` after success.
- **Token lifecycle:** If token appears invalid on a purchase flow, redirect to `/portal/login` to re‑issue.

---

## 11) Example Next.js Route Handlers

**Create Pending Order** — `/app/api/ecom/shop/detailed-pending-order/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { createPendingOrder } from '@/lib/ecom';
import { z } from 'zod';

const Body = z.object({
  siteCode: z.string(),
  orderItems: z.array(z.object({ id: z.string(), quantity: z.number().int().positive(), licensePlate: z.string().optional() })),
  discountCode: z.string().optional()
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const body = Body.parse(json);
  const res = await createPendingOrder(body);
  return NextResponse.json({ ok: true, ...res });
}
```

**Checkout** — `/app/api/ecom/shop/payment/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { payNew } from '@/lib/ecom';
import { z } from 'zod';

const Body = z.object({
  pendingOrderToken: z.string(),
  customer: z.object({ firstName: z.string(), lastName: z.string(), email: z.string().email(), phone: z.string() }),
  payment: z.object({
    cardNumber: z.string(), expMonth: z.number(), expYear: z.number(), securityCode: z.string(), cardFullName: z.string(),
    billingAddress: z.object({ street: z.string(), city: z.string(), state: z.string(), postalCode: z.string(), phone: z.string() })
  })
});

export async function POST(req: NextRequest) {
  const body = Body.parse(await req.json());
  const res = await payNew(body);
  return NextResponse.json({ ok: true, ...res });
}
```

**Register (Token Mint)** — `/app/api/ecom/customer/register/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { registerToken } from '@/lib/ecom';
import { z } from 'zod';
import { setSession } from '@/lib/session';

const Body = z.object({ email: z.string().email(), productCode: z.string(), lastFourCreditCard: z.string().length(4) });

export async function POST(req: NextRequest) {
  const body = Body.parse(await req.json());
  const res = await registerToken(body); // { id, customerToken }
  await setSession({ customerId: res.id, customerToken: res.customerToken });
  return NextResponse.json({ ok: true, id: res.id });
}
```

**Authenticated Pay** — `/app/api/ecom/shop/customer/[customerId]/payment/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { payAsCustomer } from '@/lib/ecom';
import { getSession } from '@/lib/session';

export async function POST(_: NextRequest, { params }: { params: { customerId: string } }) {
  const { customerId } = params;
  const { customerToken } = await getSession();
  const { pendingOrderToken } = await _.json();
  const res = await payAsCustomer(Number(customerId), customerToken, { pendingOrderToken });
  return NextResponse.json({ ok: true, ...res });
}
```

**Dashboard reads (BackOffice)** — `/app/api/backoffice/recurring/account/[customerId]/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getRecurring } from '@/lib/backoffice';

export async function GET(_: NextRequest, { params }: { params: { customerId: string } }) {
  const data = await getRecurring(Number(params.customerId));
  return NextResponse.json({ ok: true, data });
}
```

---

## 12) UI Notes (Practical)

- **Forms:** simple, single column, immediate validation, mask for `####` last four, plate uppercase auto‑format
- **Empty states:** “No recent charges” / “No receipts yet” handling
- **Security copy:** On login form, add helper text: _“Use the plate/RFID on your account and the last 4 digits of your card to verify yourself. We’ll issue a secure session just for you.”_
- **Fallback:** If verification fails ×3, route to support request form

---

## 13) QA Checklist

- [ ] New plan → pending order → checkout creates customer; receipt renders
- [ ] Existing login issues token; dashboard loads BackOffice data
- [ ] LPR‑required plan enforces plate
- [ ] Auth purchase flow works with `X-Sonnys-Customer-Token`
- [ ] Keys never exposed in client; network panel shows only BFF endpoints
- [ ] Session cookie is httpOnly/secure; logout clears it

---

## 14) Deployment & Observability

- **Vercel**: mark `/app/api/*` as dynamic; set env vars per environment
- **Logging:** redact card, token, and PII; capture request IDs; structured logs (json)
- **Metrics:** error rate per endpoint; checkout conversion; login success rate; avg dashboard load (BackOffice latency)

---

## 15) Future Enhancements (Out of scope now)

- Self‑serve plan changes if/when write endpoints are available
- Profile edits & card‑on‑file updates if exposed
- Magic‑link login if the vendor provides OIDC/SAML or email token mints

---

### Final Notes
- BackOffice is **read‑only** for our scope (excellent for dashboards/history).
- eCommerce handles **catalog → cart → pay** and **customer token mint** via `POST /customer/register`.
- Keep all vendor calls server‑side; never ship keys/tokens to the browser.

