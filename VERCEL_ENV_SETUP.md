# Vercel Environment Variables Setup

## Required Environment Variables for NextAuth

Set these environment variables in your Vercel dashboard:

### 1. NEXTAUTH_SECRET
- **Value**: A random string (at least 32 characters)
- **Example**: `your-super-secret-key-123456789-abcdef`
- **How to generate**: Use `openssl rand -base64 32` or any secure random string generator

### 2. NEXTAUTH_URL
- **Value**: Your production domain
- **Example**: `https://your-app.vercel.app`
- **Note**: This should match your Vercel deployment URL

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:

```
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app
```

## Local Development

For local development, create a `.env.local` file:

```env
NEXTAUTH_SECRET=your-local-secret-key-123456789
NEXTAUTH_URL=http://localhost:3000
```

## Security Notes

- Never commit `.env.local` to version control
- Use different secrets for development and production
- The secret should be at least 32 characters long
- Consider using a password manager to generate secure secrets
