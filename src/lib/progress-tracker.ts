// Progress tracking utilities for localStorage-based user data

export interface AzkarProgress {
  categoryName: string
  completed: number
  total: number
  lastCompleted?: string
  percentage: number
}

export interface TasbihProgress {
  id: string
  count: number
  date: string
  category?: string
  textAr?: string
}

export interface UserProgress {
  totalAzkarCompleted: number
  totalTasbihCount: number
  streakDays: number
  todayAzkarProgress: AzkarProgress[]
  recentTasbihCounts: TasbihProgress[]
  bookmarkedAzkar: Array<{
    id: string
    title: string
    titleAr: string
    categoryName: string
  }>
  lastActivityDate?: string
}

const PROGRESS_KEY = 'azkar-user-progress'

export class ProgressTracker {
  private static loadProgress(userId: string): UserProgress | null {
    if (typeof window === 'undefined') return null
    
    try {
      const allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
      return allProgress[userId] || null
    } catch (error) {
      console.error('Error loading progress:', error)
      return null
    }
  }

  private static saveProgress(userId: string, progress: UserProgress): void {
    if (typeof window === 'undefined') return
    
    try {
      const allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
      allProgress[userId] = progress
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress))
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  static getOrCreateProgress(userId: string): UserProgress {
    let progress = this.loadProgress(userId)
    
    if (!progress) {
      progress = {
        totalAzkarCompleted: 0,
        totalTasbihCount: 0,
        streakDays: 0,
        todayAzkarProgress: [],
        recentTasbihCounts: [],
        bookmarkedAzkar: [],
        lastActivityDate: new Date().toISOString().split('T')[0]
      }
      this.saveProgress(userId, progress)
    }

    // Check if we need to reset daily progress
    this.updateDailyProgress(userId, progress)
    return progress
  }

  static updateAzkarProgress(userId: string, categoryName: string, completed: number, total: number): void {
    const progress = this.getOrCreateProgress(userId)
    
    // Find or create category progress
    let categoryProgress = progress.todayAzkarProgress.find(p => p.categoryName === categoryName)
    if (!categoryProgress) {
      categoryProgress = {
        categoryName,
        completed: 0,
        total: 0,
        percentage: 0
      }
      progress.todayAzkarProgress.push(categoryProgress)
    }

    // Update progress - increment completed count
    categoryProgress.completed += completed
    categoryProgress.total = Math.max(categoryProgress.total, total)
    categoryProgress.percentage = categoryProgress.total > 0 ? (categoryProgress.completed / categoryProgress.total) * 100 : 0
    categoryProgress.lastCompleted = new Date().toISOString()

    // Update total completed
    progress.totalAzkarCompleted = progress.todayAzkarProgress.reduce((sum, p) => sum + p.completed, 0)
    
    this.saveProgress(userId, progress)
  }

  static updateTasbihProgress(userId: string, count: number, category?: string, textAr?: string): void {
    const progress = this.getOrCreateProgress(userId)
    
    const tasbihEntry: TasbihProgress = {
      id: Date.now().toString(),
      count,
      date: new Date().toISOString(),
      category,
      textAr
    }

    // Add to recent counts (keep last 30 entries)
    progress.recentTasbihCounts.unshift(tasbihEntry)
    if (progress.recentTasbihCounts.length > 30) {
      progress.recentTasbihCounts = progress.recentTasbihCounts.slice(0, 30)
    }

    // Update total tasbih count
    progress.totalTasbihCount += count
    
    this.saveProgress(userId, progress)
  }

  static addBookmark(userId: string, azkar: { id: string, title: string, titleAr: string, categoryName: string }): void {
    const progress = this.getOrCreateProgress(userId)
    
    // Check if already bookmarked
    if (!progress.bookmarkedAzkar.find(b => b.id === azkar.id)) {
      progress.bookmarkedAzkar.push(azkar)
      this.saveProgress(userId, progress)
    }
  }

  static removeBookmark(userId: string, azkarId: string): void {
    const progress = this.getOrCreateProgress(userId)
    progress.bookmarkedAzkar = progress.bookmarkedAzkar.filter(b => b.id !== azkarId)
    this.saveProgress(userId, progress)
  }

  static updateStreak(userId: string): void {
    const progress = this.getOrCreateProgress(userId)
    const today = new Date().toISOString().split('T')[0]
    const lastActivity = progress.lastActivityDate

    if (lastActivity !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      if (lastActivity === yesterdayStr) {
        // Consecutive day - increment streak
        progress.streakDays += 1
      } else if (lastActivity !== today) {
        // Break in streak - reset
        progress.streakDays = 1
      }

      progress.lastActivityDate = today
      this.saveProgress(userId, progress)
    }
  }

  private static updateDailyProgress(userId: string, progress: UserProgress): void {
    const today = new Date().toISOString().split('T')[0]
    
    // If it's a new day, reset daily progress but keep totals
    if (progress.lastActivityDate !== today) {
      progress.todayAzkarProgress = []
      progress.lastActivityDate = today
      this.saveProgress(userId, progress)
    }
  }

  static getProgress(userId: string): UserProgress {
    return this.getOrCreateProgress(userId)
  }
}
