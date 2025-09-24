import bcrypt from 'bcryptjs'

export interface LocalUser {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

export class LocalStorageAuth {
  private static USERS_KEY = 'azkar-users'
  private static CURRENT_USER_KEY = 'azkar-current-user'

  // Get all users from localStorage
  static getUsers(): LocalUser[] {
    if (typeof window === 'undefined') return []
    try {
      const users = localStorage.getItem(this.USERS_KEY)
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error('Error loading users from localStorage:', error)
      return []
    }
  }

  // Save users to localStorage
  static saveUsers(users: LocalUser[]): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
    } catch (error) {
      console.error('Error saving users to localStorage:', error)
    }
  }

  // Create a new user
  static async createUser(name: string, email: string, password: string): Promise<{ success: boolean; error?: string; user?: LocalUser }> {
    try {
      const users = this.getUsers()
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === email)
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' }
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create new user
      const newUser: LocalUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      }

      // Save to localStorage
      users.push(newUser)
      this.saveUsers(users)

      console.log('✅ User created successfully:', newUser.email)

      return { 
        success: true, 
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password: '', // Don't return password
          createdAt: newUser.createdAt
        }
      }
    } catch (error) {
      console.error('Error creating user:', error)
      return { success: false, error: 'Failed to create user' }
    }
  }

  // Find user by email
  static findUserByEmail(email: string): LocalUser | null {
    const users = this.getUsers()
    return users.find(user => user.email === email) || null
  }

  // Verify user credentials
  static async verifyUser(email: string, password: string): Promise<{ success: boolean; user?: LocalUser; error?: string }> {
    try {
      const user = this.findUserByEmail(email)
      if (!user) {
        return { success: false, error: 'User not found' }
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return { success: false, error: 'Invalid password' }
      }

      return { 
        success: true, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: '', // Don't return password
          createdAt: user.createdAt
        }
      }
    } catch (error) {
      console.error('Error verifying user:', error)
      return { success: false, error: 'Authentication failed' }
    }
  }

  // Set current user in localStorage
  static setCurrentUser(user: LocalUser): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Error setting current user:', error)
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): LocalUser | null {
    if (typeof window === 'undefined') return null
    try {
      const user = localStorage.getItem(this.CURRENT_USER_KEY)
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // Clear current user
  static clearCurrentUser(): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(this.CURRENT_USER_KEY)
    } catch (error) {
      console.error('Error clearing current user:', error)
    }
  }
}
