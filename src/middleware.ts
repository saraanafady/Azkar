import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith('/api/auth') ||
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.startsWith('/azkar') ||
            req.nextUrl.pathname.startsWith('/tasbih') ||
            req.nextUrl.pathname.startsWith('/auth') ||
            req.nextUrl.pathname.startsWith('/dashboard')) {
          return true
        }
        
        // Require authentication for other protected routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/azkar/progress',
    '/api/azkar/bookmark',
    '/api/tasbih/:path*',
    '/api/dashboard/:path*'
  ]
}
