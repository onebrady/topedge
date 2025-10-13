# Pre-Deployment Checklist

Use this checklist before deploying to Vercel to ensure everything is configured correctly.

## Security ✅

- [ ] `.env` file is in `.gitignore`
- [ ] No API keys or secrets in `.env.example`
- [ ] Generated a strong `SESSION_SECRET` (32+ characters)
- [ ] Different `SESSION_SECRET` for production vs development
- [ ] No credentials committed to git repository
- [ ] Reviewed all files for sensitive data

## Environment Variables ✅

- [ ] `SONNYS_ECOM_BASE` configured
- [ ] `SONNYS_ECOM_API_KEY` configured
- [ ] `SONNYS_ECOM_API_ID` configured
- [ ] `SONNYS_BACKOFFICE_BASE` configured
- [ ] `SONNYS_BACKOFFICE_API_KEY` configured
- [ ] `SONNYS_BACKOFFICE_API_ID` configured
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL
- [ ] `SESSION_SECRET` set (32+ chars)
- [ ] `SESSION_COOKIE_NAME` set
- [ ] `SESSION_MAX_AGE` set
- [ ] All variables added to Vercel dashboard

## Code Review ✅

- [ ] No console.logs with sensitive data
- [ ] Error messages don't expose system details
- [ ] All TODO comments addressed or documented
- [ ] TypeScript errors resolved (`pnpm build` succeeds)
- [ ] No unused dependencies

## Testing ✅

### Local Testing
- [ ] Homepage loads (`/`)
- [ ] Portal home page loads (`/portal`)
- [ ] Login page works (`/portal/login`)
- [ ] Join flow works (`/portal/join`)
- [ ] Plan selection works (`/portal/join/cart`)
- [ ] Checkout form submits (`/portal/join/checkout`)
- [ ] Confirmation page displays (`/portal/join/done`)
- [ ] Dashboard loads for authenticated users (`/portal/dashboard`)
- [ ] Logout works
- [ ] All location pages load (`/locations/*`)
- [ ] Contact page loads (`/contact`)
- [ ] Fundraising page loads (`/fundraising`)

### API Testing
- [ ] eCommerce API connection working
- [ ] BackOffice API connection working
- [ ] Session authentication working
- [ ] Error handling working properly

## Build & Deploy ✅

- [ ] Local build succeeds: `pnpm build`
- [ ] No TypeScript errors
- [ ] No build warnings (critical ones addressed)
- [ ] Git repository is clean
- [ ] All changes committed
- [ ] Code pushed to remote repository

## Post-Deployment Verification ✅

- [ ] Production site loads
- [ ] All routes accessible
- [ ] Environment variables applied correctly
- [ ] Session authentication works
- [ ] API calls succeed
- [ ] Error pages display correctly (404, 500)
- [ ] SSL certificate is valid (HTTPS)
- [ ] Custom domain configured (if applicable)

## Documentation ✅

- [ ] README or deployment guide created
- [ ] Environment variables documented
- [ ] API configuration documented
- [ ] Known issues documented

## Optional but Recommended ✅

- [ ] Analytics configured (Vercel Analytics)
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] Performance monitoring
- [ ] Custom domain configured
- [ ] Email notifications setup
- [ ] Backup/recovery plan documented

## Production API Migration (When Ready) ✅

When moving from sandbox to production APIs:

- [ ] Updated `SONNYS_ECOM_BASE` to production URL
- [ ] Updated `SONNYS_BACKOFFICE_BASE` to production URL
- [ ] Updated API keys for production
- [ ] Tested with production APIs
- [ ] Verified customer data access
- [ ] Confirmed payment processing

---

## Quick Commands

Generate secure session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Test local build:
```bash
pnpm build
pnpm start
```

Check for TypeScript errors:
```bash
pnpm run type-check
```

Run linter:
```bash
pnpm lint
```
