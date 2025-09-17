# Deployment Guide

This guide will help you deploy the Azkar application to various platforms.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Domain name (optional)

## Environment Variables

Create a production `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# NextAuth.js
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Vercel Deployment

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

2. **Set up PostgreSQL database**
   - Use Vercel Postgres or external service like Supabase
   - Add `DATABASE_URL` to environment variables

3. **Deploy**
   - Vercel will automatically build and deploy
   - Run database migrations after deployment

## Railway Deployment

1. **Connect your repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Add PostgreSQL service**
   - Add PostgreSQL database service
   - Copy the connection string to `DATABASE_URL`

3. **Deploy**
   - Railway will build and deploy automatically
   - Run database migrations

## Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build and run**
   ```bash
   docker build -t azkar .
   docker run -p 3000:3000 azkar
   ```

## Database Setup

After deployment, run these commands to set up the database:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

## Environment-Specific Configuration

### Development
- Use local PostgreSQL instance
- Set `NEXTAUTH_URL` to `http://localhost:3000`
- Use development Google OAuth credentials

### Production
- Use managed PostgreSQL service
- Set `NEXTAUTH_URL` to your production domain
- Use production Google OAuth credentials
- Set strong `NEXTAUTH_SECRET`

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use strong, unique secrets for production
   - Rotate secrets regularly

2. **Database Security**
   - Use connection pooling
   - Enable SSL connections
   - Restrict database access by IP

3. **Authentication**
   - Configure proper OAuth redirect URLs
   - Use HTTPS in production
   - Set secure session cookies

## Monitoring

1. **Application Monitoring**
   - Use Vercel Analytics or similar
   - Monitor error rates and performance
   - Set up alerts for critical issues

2. **Database Monitoring**
   - Monitor connection counts
   - Track query performance
   - Set up backup schedules

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check `DATABASE_URL` format
   - Verify database is accessible
   - Check firewall settings

2. **Authentication Issues**
   - Verify OAuth configuration
   - Check redirect URLs
   - Ensure HTTPS in production

3. **Build Errors**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debug Mode

Enable debug mode by setting:
```env
DEBUG=true
```

## Performance Optimization

1. **Database**
   - Add indexes for frequently queried fields
   - Use connection pooling
   - Monitor slow queries

2. **Application**
   - Enable Next.js optimizations
   - Use CDN for static assets
   - Implement caching strategies

3. **Images**
   - Optimize images
   - Use Next.js Image component
   - Consider WebP format

## Backup Strategy

1. **Database Backups**
   - Set up automated daily backups
   - Test restore procedures
   - Store backups securely

2. **Code Backups**
   - Use Git for version control
   - Tag stable releases
   - Keep deployment history

## Scaling

1. **Horizontal Scaling**
   - Use load balancers
   - Implement session storage
   - Consider microservices

2. **Database Scaling**
   - Use read replicas
   - Implement connection pooling
   - Consider database sharding

## Support

For deployment issues:
1. Check the logs in your hosting platform
2. Verify environment variables
3. Test locally first
4. Check the documentation for your hosting platform
