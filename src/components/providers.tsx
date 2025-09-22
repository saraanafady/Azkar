"use client"

import { ThemeProvider } from "./theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { NotificationProvider } from "./notification-provider"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
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
  )
}
