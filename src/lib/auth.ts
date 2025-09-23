import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Static test users - no database needed
const TEST_USERS = [
  {
    id: 'test-user-1',
    email: 'test@azkar.com',
    password: 'test123',
    name: 'Test User',
    image: null,
  },
  {
    id: 'sara-user-1',
    email: 'sara@gmail.com',
    password: '1234',
    name: 'Sara',
    image: null,
  }
]

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
        console.log('Available test users:', TEST_USERS.map(u => ({ email: u.email, password: u.password })))
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials - returning null')
          return null
        }

        // Check against all test users
        const user = TEST_USERS.find(u => {
          const emailMatch = u.email === credentials.email
          const passwordMatch = u.password === credentials.password
          console.log(`Checking user ${u.email}: emailMatch=${emailMatch}, passwordMatch=${passwordMatch}`)
          return emailMatch && passwordMatch
        })
        
        if (user) {
          console.log('✅ CREDENTIALS MATCH! Returning user:', user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        }
        
        console.log('❌ Credentials do not match any test user')
        return null
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
