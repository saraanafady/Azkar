"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSession, signOut } from 'next-auth/react'

interface User {
  id: string
  name: string
  email: string
  image?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Convert NextAuth session to our user format
  useEffect(() => {
    if (session?.user) {
      const userData = {
        id: session.user.id || session.user.email || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || undefined,
        createdAt: new Date().toISOString()
      }
      setUser(userData)
    } else {
      setUser(null)
    }
    setIsLoading(status === 'loading')
  }, [session, status])

  // Handle hydration properly - only run on client side
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (status === 'unauthenticated') {
      const savedUser = localStorage.getItem('azkar-user')
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('azkar-user')
        }
      }
      setIsLoading(false)
    }
  }, [status])

  // Save user to localStorage whenever user changes (for non-NextAuth users)
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (user && !session?.user) {
      localStorage.setItem('azkar-user', JSON.stringify(user))
    } else if (!user) {
      localStorage.removeItem('azkar-user')
    }
  }, [user, session])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (typeof window === 'undefined') {
        return { success: false, error: 'Not available on server' }
      }

      // Use localStorage for login (simpler and more reliable for demo)
      const users = JSON.parse(localStorage.getItem('azkar-users') || '[]')
      
      // Find user by email
      const foundUser = users.find((u: any) => u.email === email)
      
      if (!foundUser) {
        return { success: false, error: 'User not found' }
      }

      // For localStorage users, we store plain passwords (not hashed)
      // This is for demo purposes only
      if (foundUser.password !== password) {
        return { success: false, error: 'Invalid password' }
      }

      // Set user (without password)
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (typeof window === 'undefined') {
        return { success: false, error: 'Not available on server' }
      }

      // Always use localStorage for registration to ensure consistency with login
      return await registerWithLocalStorage(name, email, password)
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed' }
    }
  }

  // Fallback registration using localStorage
  const registerWithLocalStorage = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (typeof window === 'undefined') {
        return { success: false, error: 'Not available on server' }
      }

      // Get existing users
      const users = JSON.parse(localStorage.getItem('azkar-users') || '[]')
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return { success: false, error: 'User already exists' }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app, hash this
        createdAt: new Date().toISOString()
      }

      // Save to localStorage
      users.push(newUser)
      localStorage.setItem('azkar-users', JSON.stringify(users))

      // Set user (without password)
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      
      return { success: true }
    } catch (error) {
      console.error('LocalStorage registration error:', error)
      return { success: false, error: 'Registration failed' }
    }
  }

  const logout = async () => {
    if (session?.user) {
      // NextAuth user - use NextAuth signOut
      await signOut({ callbackUrl: '/' })
    } else {
      // Local user - just clear local state
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
