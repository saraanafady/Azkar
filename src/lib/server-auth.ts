import bcrypt from 'bcryptjs'

export interface ServerUser {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

// In-memory storage for server-side (works in production)
class ServerAuthStorage {
  private static users: ServerUser[] = []
  private static initialized = false

  static initialize() {
    if (this.initialized) return
    this.initialized = true
    
    // Add some default test users for production
    // Note: These are pre-hashed passwords for demo purposes
    this.users = [
      {
        id: 'test-user-1',
        name: 'Test User',
        email: 'test@azkar.com',
        password: '$2b$12$HwwfDOatoLwR8t62lcDBOeivPvKAmqSJSFCc/fE459rpekaK0gPYq', // 'test123'
        createdAt: new Date().toISOString()
      },
      {
        id: 'sara-user-1',
        name: 'Sara',
        email: 'sara@gmail.com',
        password: '$2b$12$1dGGR/kS2FXh3fJdFwdJduf1fKjgoH5FMPjnh2k3Gb3Kx38HZvhCq', // '1234'
        createdAt: new Date().toISOString()
      },
      {
        id: 'demo-user-1',
        name: 'Demo User',
        email: 'demo@azkar.com',
        password: '$2b$12$kKP6hXWhUqK.199aG1mJFuOV1QzYkOC48bPG.DJ8.BKnPFDZvxaRW', // 'demo123'
        createdAt: new Date().toISOString()
      }
    ]
  }

  static getUsers(): ServerUser[] {
    this.initialize()
    return this.users
  }

  static async createUser(name: string, email: string, password: string): Promise<{ success: boolean; error?: string; user?: ServerUser }> {
    this.initialize()
    
    try {
      // Check if user already exists
      const existingUser = this.users.find(user => user.email === email)
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' }
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create new user
      const newUser: ServerUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      }

      // Add to users array
      this.users.push(newUser)

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

  static async verifyUser(email: string, password: string): Promise<{ success: boolean; user?: ServerUser; error?: string }> {
    this.initialize()
    
    try {
      const user = this.users.find(u => u.email === email)
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
}

export { ServerAuthStorage }
