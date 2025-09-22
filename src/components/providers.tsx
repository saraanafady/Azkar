"use client"

import { ThemeProvider } from "./theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { NotificationProvider } from "./notification-provider"
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
