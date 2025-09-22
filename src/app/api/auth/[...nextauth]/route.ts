import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

// Add error handling wrapper
const wrappedHandler = async (req: Request, context: any) => {
  try {
    return await handler(req, context)
  } catch (error) {
    console.error('NextAuth error:', error)
    return new Response(
      JSON.stringify({ error: 'Authentication service temporarily unavailable' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}

export { wrappedHandler as GET, wrappedHandler as POST }