"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('azkar-user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('azkar-user')
        }
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('azkar-user', JSON.stringify(user))
      } else {
        localStorage.removeItem('azkar-user')
      }
    }
  }, [user])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (typeof window === 'undefined') {
        return { success: false, error: 'Not available on server' }
      }

      // For now, use localStorage for login (since we don't have a login API endpoint)
      // In a real app, you'd call a login API endpoint
      const users = JSON.parse(localStorage.getItem('azkar-users') || '[]')
      
      // Find user by email
      const foundUser = users.find((u: any) => u.email === email)
      
      if (!foundUser) {
        return { success: false, error: 'User not found' }
      }

      // Simple password check (in real app, you'd hash passwords)
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

      // Call the API endpoint for registration
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.error('API returned non-JSON response:', response.status, response.statusText)
        // Fallback to localStorage registration
        return await registerWithLocalStorage(name, email, password)
      }

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.message || 'Registration failed' }
      }

      // Set user from API response
      if (data.user) {
        setUser(data.user)
      }
      
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      // Fallback to localStorage registration
      return await registerWithLocalStorage(name, email, password)
    }
  }

  // Fallback registration using localStorage
  const registerWithLocalStorage = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
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

  const logout = () => {
    setUser(null)
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
