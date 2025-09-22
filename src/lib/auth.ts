import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  // Use adapter only if database is available and properly configured
  adapter: process.env.DATABASE_URL && process.env.NODE_ENV === 'production' ? PrismaAdapter(prisma) as any : undefined,
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
          // For demo mode, use localStorage fallback
          if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL) {
            // Check localStorage for demo users
            const storedUsers = typeof window !== 'undefined' ? localStorage.getItem('demo-users') : null
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
            return null
          }

          // Production database authentication
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
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
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-for-development',
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
