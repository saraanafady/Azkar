# Deployment Guide

## Environment Variables for Vercel

Set these environment variables in your Vercel dashboard:

### Required Variables:
```
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://azkar-jade.vercel.app
```

### How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the variables above

## Test Users Available:

1. **Email:** `test@azkar.com` **Password:** `test123`
2. **Email:** `sara@gmail.com` **Password:** `1234`
3. **Email:** `demo@azkar.com` **Password:** `demo123`

## Testing Authentication:

Visit `/api/test-auth` to test if authentication is working.

## Common Issues:

1. **401 Unauthorized**: Check if NEXTAUTH_SECRET is set
2. **Callback URL mismatch**: Ensure NEXTAUTH_URL matches your domain
3. **Browser extension errors**: Can be ignored, they don't affect functionality
