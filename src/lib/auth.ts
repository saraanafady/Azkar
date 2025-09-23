import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Static test user - no database needed
const TEST_USER = {
  id: 'test-user-1',
  email: 'test@azkar.com',
  password: 'test123',
  name: 'Test User',
  image: null,
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check against static test user
        if (credentials.email === TEST_USER.email && credentials.password === TEST_USER.password) {
          return {
            id: TEST_USER.id,
            email: TEST_USER.email,
            name: TEST_USER.name,
            image: TEST_USER.image,
          }
        }
        
        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.image as string,
        }
      }
      return session
    },
    async signIn({ user, account }) {
      return account?.provider === 'credentials'
    }
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-for-development-change-in-production',
  // Simplified error handling
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Sign in successful:', { email: user.email, provider: account?.provider })
      }
    },
    async signOut() {
      if (process.env.NODE_ENV === 'development') {
        console.log('Sign out successful')
      }
    },
  },
  // Add error pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Add error page
  },
}
