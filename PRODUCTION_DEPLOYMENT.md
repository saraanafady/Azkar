# Production Deployment Guide for Google OAuth

## 1. Vercel Environment Variables

You need to set these environment variables in your Vercel dashboard:

### Required Environment Variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://azkar-jade.vercel.app
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database (if using external database)
DATABASE_URL=your-production-database-url
```

### How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project (azkar-jade)
3. Go to "Settings" tab
4. Click on "Environment Variables"
5. Add each variable:
   - `NEXTAUTH_URL` = `https://azkar-jade.vercel.app`
   - `NEXTAUTH_SECRET` = Generate a secure secret (see below)
   - `GOOGLE_CLIENT_ID` = Your Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET` = Your Google OAuth Client Secret

## 2. Generate NEXTAUTH_SECRET

Generate a secure secret using one of these methods:

### Method 1: Online Generator
Visit: https://generate-secret.vercel.app/32

### Method 2: Command Line
```bash
openssl rand -base64 32
```

### Method 3: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 3. Google OAuth Setup for Production

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Edit your OAuth 2.0 Client ID
5. Add these Authorized Redirect URIs:
   - `https://azkar-jade.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

## 4. Database Configuration

### Option A: Use Vercel Postgres (Recommended)
1. In Vercel dashboard, go to "Storage" tab
2. Create a new Postgres database
3. Copy the connection string to `DATABASE_URL`

### Option B: Use External Database
1. Set up a PostgreSQL database (e.g., Supabase, PlanetScale, etc.)
2. Add the connection string to `DATABASE_URL`

### Option C: No Database (Demo Mode)
If you don't want to set up a database, the app will work in demo mode with localStorage.

## 5. Deploy and Test

1. After setting all environment variables, redeploy your app:
   ```bash
   vercel --prod
   ```

2. Test the Google OAuth flow:
   - Go to `https://azkar-jade.vercel.app/auth/signin`
   - Click "تسجيل الدخول بحساب Google"
   - Complete the OAuth flow

## 6. Troubleshooting

### Common Issues:

1. **500 Error on OAuth Callback**
   - Check that all environment variables are set correctly
   - Verify `NEXTAUTH_URL` matches your domain exactly
   - Ensure `NEXTAUTH_SECRET` is set

2. **"Invalid redirect URI" Error**
   - Check Google Console redirect URIs
   - Make sure the URL matches exactly (including https://)

3. **Database Connection Errors**
   - Verify `DATABASE_URL` is correct
   - Check if database is accessible from Vercel

4. **"Client ID not found" Error**
   - Verify `GOOGLE_CLIENT_ID` is correct
   - Check that the OAuth consent screen is configured

### Debug Steps:

1. Check Vercel function logs:
   - Go to Vercel dashboard > Functions tab
   - Look for error logs in the `/api/auth/[...nextauth]` function

2. Enable debug mode:
   - Add `NEXTAUTH_DEBUG=true` to environment variables
   - This will show more detailed error messages

3. Test locally first:
   - Set up `.env.local` with the same values
   - Test OAuth flow locally before deploying

## 7. Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets for `NEXTAUTH_SECRET`
- Regularly rotate your Google OAuth credentials
- Monitor your OAuth usage in Google Console

## 8. Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Google OAuth redirect URIs configured
- [ ] Database connection working (if using database)
- [ ] OAuth flow tested end-to-end
- [ ] Error handling working properly
- [ ] User sessions persisting correctly
