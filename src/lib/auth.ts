import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

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
          console.log('Missing credentials - returning null')
          return null
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            console.log('❌ User not found in database')
            return null
          }

          if (!user.password) {
            console.log('❌ User has no password set')
            return null
          }

          // Verify password
          const passwordMatch = await bcrypt.compare(credentials.password, user.password)
          console.log(`Password verification for ${user.email}: ${passwordMatch}`)

          if (passwordMatch) {
            console.log('✅ CREDENTIALS MATCH! Returning user:', user.email)
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            }
          } else {
            console.log('❌ Password does not match')
            return null
          }
        } catch (error) {
          console.error('Database error during authentication:', error)
          return null
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
  debug: true, // Enable debug mode
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-for-development-change-in-production',
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
