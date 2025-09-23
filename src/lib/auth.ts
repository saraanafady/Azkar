import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  // Disable adapter for now to avoid database connection issues
  adapter: undefined,
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

        try {
          // Use localStorage for authentication (works in both development and production)
          if (typeof window !== 'undefined') {
            const storedUsers = localStorage.getItem('azkar-users')
            if (storedUsers) {
              const users = JSON.parse(storedUsers)
              const user = users.find((u: any) => u.email === credentials.email)
              if (user && user.password === credentials.password) {
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  image: user.image,
                }
              }
            }
          }
          
          // Fallback: create a demo user if none exists
          if (typeof window !== 'undefined') {
            const demoUser = {
              id: 'demo-user-1',
              email: credentials.email,
              name: credentials.email.split('@')[0],
              image: null,
            }
            
            // Store demo user in localStorage
            const existingUsers = JSON.parse(localStorage.getItem('azkar-users') || '[]')
            if (!existingUsers.find((u: any) => u.email === credentials.email)) {
              existingUsers.push({
                ...demoUser,
                password: credentials.password
              })
              localStorage.setItem('azkar-users', JSON.stringify(existingUsers))
            }
            
            return demoUser
          }
          
          return null
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      try {
        // Allow credentials sign in
        if (account?.provider === 'credentials') {
          return true
        }
        return false
      } catch (error) {
        console.error('SignIn callback error:', error)
        return false
      }
    }
  },
  debug: false, // Disable debug to reduce console logs
  secret: 'demo-secret-for-development-change-in-production',
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
