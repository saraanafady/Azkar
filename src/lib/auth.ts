import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Simple in-memory user store for demo purposes
// In production, this should be replaced with a proper database
let users = [
  {
    id: 'demo-user-1',
    email: 'demo@azkar.com',
    password: 'demo123',
    name: 'Demo User',
    image: null,
  },
  {
    id: 'demo-user-2', 
    email: 'sara@azkar.com',
    password: 'sara123',
    name: 'Sara Ashraf',
    image: null,
  }
]

// Function to get users (this would be replaced with database queries in production)
export function getUsers() {
  return users
}

// Function to add user (this would be replaced with database operations in production)
export function addUser(user: any) {
  users.push(user)
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
          console.log('Missing credentials:', { email: !!credentials?.email, password: !!credentials?.password })
          return null
        }

        try {
          // Find user in our simple user store
          const currentUsers = getUsers()
          const user = currentUsers.find(u => u.email === credentials.email)
          
          console.log('User lookup:', { 
            email: credentials.email, 
            userFound: !!user, 
            passwordMatch: user ? user.password === credentials.password : false 
          })
          
          if (user && user.password === credentials.password) {
            const userObject = {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            }
            console.log('Authentication successful for:', user.email)
            return userObject
          }
          
          console.log('Authentication failed for:', credentials.email)
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
