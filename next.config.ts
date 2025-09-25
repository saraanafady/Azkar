import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  async redirects() {
    return [
      {
        source: '/api/auth/error',
        destination: '/auth/signin?error=auth',
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
