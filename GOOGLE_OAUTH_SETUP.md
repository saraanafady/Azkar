# Google OAuth Setup Guide

## 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Copy the Client ID and Client Secret

## 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database
DATABASE_URL="file:./dev.db"
```

## 3. Generate NextAuth Secret

You can generate a secure secret using:
```bash
openssl rand -base64 32
```

Or use an online generator like: https://generate-secret.vercel.app/32

## 4. Features Added

✅ **Google OAuth Integration**
- Sign in with Google button on both signin and signup pages
- Automatic account creation for new Google users
- Seamless integration with existing authentication system

✅ **Hybrid Authentication**
- Users can sign in with email/password OR Google
- Existing users continue to work with their current accounts
- Google users get automatic account creation

✅ **User Experience**
- Clean UI with Google branding
- Proper error handling
- Loading states during authentication

## 5. Testing

1. Start your development server: `npm run dev`
2. Go to `/auth/signin` or `/auth/signup`
3. Click "تسجيل الدخول بحساب Google" or "إنشاء حساب بحساب Google"
4. Complete the Google OAuth flow
5. You should be redirected back to the home page as a logged-in user

## 6. Production Deployment

When deploying to production:
1. Update the `NEXTAUTH_URL` to your production domain
2. Add your production domain to Google OAuth authorized redirect URIs
3. Update the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` if needed
4. Ensure your production environment has the same environment variables

## 7. Troubleshooting

- **"Invalid redirect URI"**: Make sure the redirect URI in Google Console matches exactly
- **"Client ID not found"**: Verify the GOOGLE_CLIENT_ID is correct
- **"Invalid client secret"**: Verify the GOOGLE_CLIENT_SECRET is correct
- **"NEXTAUTH_URL not set"**: Make sure NEXTAUTH_URL is set in your environment variables
