import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ServerAuthStorage } from '@/lib/server-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('=== AUTHORIZE DEBUG ===')
        console.log('Received credentials:', { 
          email: credentials?.email, 
          password: credentials?.password,
          hasEmail: !!credentials?.email,
          hasPassword: !!credentials?.password
        })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials - throwing error')
          throw new Error('Missing credentials')
        }

        try {
          // Verify user using server-side storage
          const result = await ServerAuthStorage.verifyUser(credentials.email, credentials.password)
          
          if (!result.success) {
            console.log(`❌ Authentication failed: ${result.error}`)
            throw new Error(result.error || 'Invalid credentials')
          }

          if (result.user) {
            console.log('✅ CREDENTIALS MATCH! Returning user:', result.user.email)
            return {
              id: result.user.id,
              email: result.user.email,
              name: result.user.name,
              image: null,
            }
          } else {
            console.log('❌ No user returned from verification')
            throw new Error('Invalid credentials')
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw error
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback:', { tokenId: token.id, userId: user?.id })
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session callback:', { sessionUser: session.user?.email, tokenId: token.id })
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
      console.log('SignIn callback:', { userEmail: user.email, provider: account?.provider })
      return account?.provider === 'credentials'
    }
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug mode only in development
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development-only',
  // Simplified error handling
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('Sign in successful:', { email: user.email, provider: account?.provider })
    },
    async signOut() {
      console.log('Sign out successful')
    },
  },
  // Add error pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}
