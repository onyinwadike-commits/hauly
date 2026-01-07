# Vercel Deployment Guide

## Prerequisites

1. Vercel account at [vercel.com](https://vercel.com)
2. Vercel CLI installed:
   ```bash
   npm install -g vercel
   ```
3. Domain registered (hauly.app)

## Option 1: Deploy via CLI

### Marketing Website (apps/web)

```bash
cd apps/web

# Login to Vercel (first time only)
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Admin Dashboard (apps/admin)

```bash
cd apps/admin

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Option 2: Deploy via GitHub Integration (Recommended)

### Step 1: Push to GitHub

```bash
git remote add origin https://github.com/your-org/hauly.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository

### Step 3: Configure Marketing Website

| Setting | Value |
|---------|-------|
| Project Name | hauly-web |
| Framework | Next.js |
| Root Directory | `apps/web` |
| Build Command | `pnpm build` |
| Install Command | `pnpm install` |
| Output Directory | `.next` |

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...
```

### Step 4: Configure Admin Dashboard

| Setting | Value |
|---------|-------|
| Project Name | hauly-admin |
| Framework | Next.js |
| Root Directory | `apps/admin` |
| Build Command | `pnpm build` |
| Install Command | `pnpm install` |
| Output Directory | `.next` |

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Custom Domains

### Configure in Vercel Dashboard

**Marketing Website (hauly-web):**
1. Go to Project Settings > Domains
2. Add `hauly.app`
3. Add `www.hauly.app`

**Admin Dashboard (hauly-admin):**
1. Go to Project Settings > Domains
2. Add `admin.hauly.app`

### DNS Configuration

At your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 300 |
| CNAME | www | cname.vercel-dns.com | 300 |
| CNAME | admin | cname.vercel-dns.com | 300 |

## Environment Variables

### Production Variables (in Vercel Dashboard)

Navigate to **Project > Settings > Environment Variables**

**Required for apps/web:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`

**Required for apps/admin:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Environment Scopes

Set variables for specific environments:
- **Production**: Live site (hauly.app)
- **Preview**: PR deployments
- **Development**: Local development

## Monorepo Configuration

Vercel automatically detects pnpm workspaces. The `vercel.json` in each app specifies:
- Build commands
- Install commands
- Security headers
- Region (sfo1 - San Francisco, closest to Henderson, NV)

## Deployment Triggers

With GitHub integration:
- **Push to main**: Auto-deploy to production
- **Push to other branches**: Deploy preview
- **Pull requests**: Generate preview URL

## Preview Deployments

Each PR gets a unique preview URL:
```
https://hauly-web-[hash]-[team].vercel.app
https://hauly-admin-[hash]-[team].vercel.app
```

## Monitoring & Analytics

### Vercel Analytics (Optional)

1. Go to Project > Analytics
2. Enable Web Analytics
3. Add to `apps/web/src/app/layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Speed Insights (Optional)

1. Enable Speed Insights in dashboard
2. Add to layout:
   ```tsx
   import { SpeedInsights } from '@vercel/speed-insights/next';

   <SpeedInsights />
   ```

## Troubleshooting

### Build Fails

Check build logs in Vercel dashboard. Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

### 404 Errors

Ensure `vercel.json` rewrites are configured correctly.

### Environment Variable Not Found

1. Verify variable is set in Vercel dashboard
2. Check it's scoped to correct environment
3. Redeploy after adding variables

### Monorepo Issues

If Vercel doesn't detect the monorepo:
1. Ensure `pnpm-workspace.yaml` exists
2. Check Root Directory is set correctly
3. Verify `turbo.json` configuration

## Rollback

To rollback a deployment:
1. Go to Project > Deployments
2. Find the previous working deployment
3. Click "..." menu > "Promote to Production"

## Security Headers

Both apps include security headers via `vercel.json`:
- `X-Frame-Options: DENY` - Prevent clickjacking
- `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Control referrer info
- `X-XSS-Protection: 1; mode=block` - XSS filter
