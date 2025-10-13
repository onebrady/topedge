# Vercel Deployment Guide

This guide will help you deploy the TopEdge Car Wash customer portal to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Sonny's API credentials (eCommerce and BackOffice)
3. Git repository with your code

## Step 1: Prepare Your Repository

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub/GitLab/Bitbucket:
   ```bash
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `next build` (leave as default)
   - **Output Directory**: `.next` (leave as default)

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

## Step 3: Configure Environment Variables

In the Vercel dashboard, go to your project settings > Environment Variables and add:

### Required Variables

#### Sonny's eCommerce API
- **Variable**: `SONNYS_ECOM_BASE`
- **Value**: `https://sandboxapi.mywashaccount.com/v1` (or production URL)
- **Environment**: Production, Preview, Development

- **Variable**: `SONNYS_ECOM_API_KEY`
- **Value**: Your eCommerce API key
- **Environment**: Production, Preview, Development

- **Variable**: `SONNYS_ECOM_API_ID`
- **Value**: Your API ID
- **Environment**: Production, Preview, Development

#### Sonny's BackOffice API
- **Variable**: `SONNYS_BACKOFFICE_BASE`
- **Value**: `https://sandboxapi.sonnyscontrols.com/v1` (or production URL)
- **Environment**: Production, Preview, Development

- **Variable**: `SONNYS_BACKOFFICE_API_KEY`
- **Value**: Your BackOffice API key
- **Environment**: Production, Preview, Development

- **Variable**: `SONNYS_BACKOFFICE_API_ID`
- **Value**: Your API ID
- **Environment**: Production, Preview, Development

#### Application Configuration
- **Variable**: `NEXT_PUBLIC_APP_URL`
- **Value**: Your production URL (e.g., `https://your-domain.vercel.app`)
- **Environment**: Production, Preview, Development
- **Note**: For preview deployments, Vercel automatically sets `VERCEL_URL` which can be used as fallback

#### Session Security (CRITICAL)
- **Variable**: `SESSION_SECRET`
- **Value**: A random 32+ character string
- **Environment**: Production, Preview, Development
- **Generate with**: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- ⚠️ **IMPORTANT**: Use a different secret for production than development!

- **Variable**: `SESSION_COOKIE_NAME`
- **Value**: `sonnys_portal`
- **Environment**: Production, Preview, Development

- **Variable**: `SESSION_MAX_AGE`
- **Value**: `28800` (8 hours in seconds)
- **Environment**: Production, Preview, Development

### Optional Variables

- **Variable**: `DEFAULT_SITE_CODE`
- **Value**: `MAIN` (or your site code)
- **Environment**: Production, Preview, Development

- **Variable**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Production only

## Step 4: Domain Configuration (Optional)

1. In Vercel dashboard, go to your project > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_APP_URL` environment variable with your custom domain

## Step 5: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Test the following:
   - Homepage loads correctly
   - Portal login page accessible (`/portal/login`)
   - Join flow works (`/portal/join`)
   - Customer registration and checkout flow
   - Dashboard loads after login (`/portal/dashboard`)

## Important Notes

### Sandbox vs Production APIs

The default configuration uses Sonny's sandbox APIs:
- eCommerce: `https://sandboxapi.mywashaccount.com/v1`
- BackOffice: `https://sandboxapi.sonnyscontrols.com/v1`

For production, update these to:
- eCommerce: `https://api.mywashaccount.com/v1`
- BackOffice: `https://api.sonnyscontrols.com/v1`

### Session Security

- Always use a strong, randomly generated `SESSION_SECRET`
- Use different secrets for development, preview, and production
- Never commit secrets to your repository
- Rotate secrets periodically for security

### Cache Configuration

The app uses Next.js caching with:
- `cache: 'no-store'` for real-time data
- `revalidate: 60` for data that can be cached for 60 seconds

Vercel automatically handles Next.js cache at the edge.

### Error Monitoring

Consider setting up error monitoring:
- Vercel Analytics (built-in)
- Sentry
- LogRocket
- Datadog

## Troubleshooting

### Environment Variables Not Working

1. Check that variables are set for the correct environment (Production/Preview/Development)
2. Redeploy after adding/changing environment variables
3. Check Vercel logs for any environment variable errors

### Session Issues

- Ensure `SESSION_SECRET` is at least 32 characters
- Check that `SESSION_COOKIE_NAME` is set
- Verify secure cookie settings work with your domain

### API Connection Issues

- Verify API credentials are correct
- Check API base URLs are accessible from Vercel's servers
- Review Vercel function logs for detailed error messages

### Build Failures

- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript types are valid

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Sonny's API Documentation](https://sonnyscontrols.com/api-docs)

## Support

For issues related to:
- **Deployment**: Vercel Support
- **Sonny's API**: Sonny's API Support
- **Application Code**: Your development team
