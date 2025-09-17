# Database Setup Guide

The Azkar application is currently running with mock data, but you can set up a real database for full functionality.

## Option 1: Local PostgreSQL (Recommended for Development)

### Install PostgreSQL
1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Create a database named `azkar_db`
3. Note your database credentials

### Update Environment Variables
Create or update your `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/azkar_db?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Set up the Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

## Option 2: Supabase (Recommended for Production)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

### Update Environment Variables
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

### Set up the Database
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Option 3: Railway (Easy Deployment)

### Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add PostgreSQL service
4. Copy the connection string

### Update Environment Variables
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/railway"
```

### Set up the Database
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Option 4: Vercel Postgres

### Add Vercel Postgres
1. Go to your Vercel project dashboard
2. Go to Storage tab
3. Add Postgres database
4. Copy the connection string

### Update Environment Variables
```env
DATABASE_URL="postgres://default:[PASSWORD]@[HOST]:5432/verceldb"
```

### Set up the Database
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Current Status

The application is currently running with **mock data** which includes:

- ✅ 4 Azkar categories (Morning, Evening, Prayer, General)
- ✅ Sample azkar with Arabic text and translations
- ✅ All UI functionality works
- ❌ User authentication (requires database)
- ❌ Progress tracking (requires database)
- ❌ Bookmarking (requires database)
- ❌ Dashboard statistics (requires database)

## Next Steps

1. Choose one of the database options above
2. Set up your database
3. Update the `.env.local` file with your database URL
4. Run the database setup commands
5. Restart the development server

Once the database is set up, you'll have access to:
- User registration and authentication
- Progress tracking for azkar
- Bookmarking system
- Dashboard with statistics
- Data persistence across sessions

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Ensure the database server is running
- Check firewall settings
- Verify credentials

### Prisma Issues
- Run `npm run db:generate` after schema changes
- Run `npm run db:push` to sync schema
- Check Prisma logs for detailed error messages

### Authentication Issues
- Ensure `NEXTAUTH_SECRET` is set
- Verify OAuth credentials if using Google login
- Check that the database is accessible

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify your environment variables
3. Ensure all dependencies are installed
4. Try running the setup commands again
