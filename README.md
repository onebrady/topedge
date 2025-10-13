# TopEdge Car Wash - Customer Portal

A modern, Next.js-based customer portal integrated with Sonny's Car Wash APIs for membership management, billing, and customer self-service.

## Features

- 🚗 **Membership Management** - View and manage car wash memberships
- 💳 **Online Purchases** - Buy new memberships with secure payment processing
- 📊 **Dashboard** - View billing history, vehicle tags, and account details
- 🔐 **Secure Authentication** - Session-based authentication with iron-session
- 📱 **Responsive Design** - Mobile-friendly UI built with Tailwind CSS and shadcn/ui
- 🏢 **Multi-location Support** - Location pages with details and maps
- 🎁 **Fundraising** - Community fundraising program information

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation
- **Session Management**: iron-session
- **API Integration**: Sonny's eCommerce & BackOffice APIs

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── api/                  # BFF API routes
│   │   ├── ecom/            # eCommerce API endpoints
│   │   └── backoffice/      # BackOffice API endpoints
│   ├── portal/              # Customer portal pages
│   │   ├── dashboard/       # Member dashboard
│   │   ├── join/            # New member signup flow
│   │   └── login/           # Authentication
│   ├── locations/           # Location pages
│   ├── contact/             # Contact page
│   └── fundraising/         # Fundraising program
├── lib/                     # Shared utilities and helpers
│   └── sonnys/              # Sonny's API clients and types
│       ├── ecom.ts          # eCommerce API client
│       ├── backoffice.ts    # BackOffice API client
│       ├── server.ts        # Server-side API wrapper
│       ├── session.ts       # Session management
│       ├── errors.ts        # Error handling
│       └── validators.ts    # Zod schemas
├── components/              # Reusable React components
│   └── ui/                  # shadcn/ui components
└── public/                  # Static assets

```

## Architecture

### Backend-for-Frontend (BFF) Pattern

The app uses a BFF pattern where Next.js API routes act as a proxy between the frontend and Sonny's APIs:

```
Frontend → BFF Routes (/api/*) → Sonny's APIs
```

This approach:
- Hides API credentials from the client
- Provides consistent error handling
- Enables request/response transformation
- Simplifies frontend API calls

### API Integration

**eCommerce API** (`SONNYS_ECOM_*`)
- Customer registration and authentication
- Plan inventory and pricing
- Order creation and payment processing
- Receipt retrieval

**BackOffice API** (`SONNYS_BACKOFFICE_*`)
- Customer account details
- Recurring billing history
- Vehicle and RFID tag information
- Site listings

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Sonny's API credentials (eCommerce and BackOffice)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```bash
   # See .env.example for all required variables
   SONNYS_ECOM_API_KEY=your-key-here
   SONNYS_BACKOFFICE_API_KEY=your-key-here
   SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   ```

5. Start development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Key Files

- `.env` - Environment variables (never commit!)
- `.env.example` - Environment variables template
- `lib/sonnys/` - API integration code
- `app/api/` - BFF API routes
- `app/portal/` - Customer portal pages

## Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy!

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for pre-deployment checklist.

## Environment Variables

All required environment variables are documented in `.env.example`.

### Critical Variables

- `SONNYS_ECOM_API_KEY` - eCommerce API key
- `SONNYS_BACKOFFICE_API_KEY` - BackOffice API key
- `SESSION_SECRET` - Session encryption key (32+ characters)
- `NEXT_PUBLIC_APP_URL` - Application URL for server-side calls

### Sandbox vs Production

Default configuration uses sandbox APIs. Update these for production:

**Sandbox:**
- eCommerce: `https://sandboxapi.mywashaccount.com/v1`
- BackOffice: `https://sandboxapi.sonnyscontrols.com/v1`

**Production:**
- eCommerce: `https://api.mywashaccount.com/v1`
- BackOffice: `https://api.sonnyscontrols.com/v1`

## Security

- All API keys are server-side only (never exposed to client)
- Session cookies are HTTP-only and secure
- Input validation with Zod schemas
- Error messages sanitized (no system details exposed)
- No sensitive data logged

## Customer Journey

### New Customer Flow

1. **Browse Plans** (`/portal/join`) - View available membership plans
2. **Select Plan** (`/portal/join/cart`) - Choose plan and location
3. **Checkout** (`/portal/join/checkout`) - Enter payment details
4. **Confirmation** (`/portal/join/done`) - Registration complete, receive credentials
5. **Login** (`/portal/login`) - Authenticate with email and credentials
6. **Dashboard** (`/portal/dashboard`) - View membership details

### Existing Customer Flow

1. **Login** (`/portal/login`) - Email + last 4 of credit card
2. **Dashboard** (`/portal/dashboard`) - View membership, billing, vehicles
3. **Manage Account** - View billing history, active tags, etc.

## Known Limitations

### Sandbox Environment

When using Sonny's sandbox APIs:
- eCommerce and BackOffice have separate test databases
- Customer created via eCommerce may not exist in BackOffice
- Dashboard will show informative message for sandbox-only customers
- Use production APIs for full functionality

## Support & Documentation

- **Next.js**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs
- **Sonny's API**: https://sonnyscontrols.com/api-docs
- **shadcn/ui**: https://ui.shadcn.com

## License

Proprietary - TopEdge Car Wash

---

**Note**: This is a production application handling customer payments. Always follow security best practices and test thoroughly before deploying changes.
