export interface LocalAzkarCategory {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
}

export interface LocalAzkar {
  id: string
  title: string
  titleAr: string
  arabicText: string
  translation: string
  reference?: string
  times: number
  categoryId: string
}

export interface LocalAzkarProgress {
  id: string
  userId: string
  azkarId: string
  completed: number
  date: string
}

export interface LocalTasbihCount {
  id: string
  userId: string
  count: number
  date: string
}

export interface LocalBookmark {
  id: string
  userId: string
  azkarId: string
  createdAt: string
}

export class LocalStorageData {
  private static AZKAR_CATEGORIES_KEY = 'azkar-categories'
  private static AZKAR_KEY = 'azkar'
  private static AZKAR_PROGRESS_KEY = 'azkar-progress'
  private static TASBIH_COUNTS_KEY = 'tasbih-counts'
  private static BOOKMARKS_KEY = 'azkar-bookmarks'

  // Initialize default data if not exists
  static initializeDefaultData(): void {
    if (typeof window === 'undefined') return

    // Initialize categories
    if (!localStorage.getItem(this.AZKAR_CATEGORIES_KEY)) {
      const defaultCategories: LocalAzkarCategory[] = [
        {
          id: 'morning',
          name: 'Morning',
          nameAr: 'أذكار الصباح',
          description: 'Morning remembrance and supplications',
          descriptionAr: 'أذكار الصباح والدعوات'
        },
        {
          id: 'evening',
          name: 'Evening',
          nameAr: 'أذكار المساء',
          description: 'Evening remembrance and supplications',
          descriptionAr: 'أذكار المساء والدعوات'
        },
        {
          id: 'prayer',
          name: 'Prayer',
          nameAr: 'أذكار الصلاة',
          description: 'Remembrance during and after prayer',
          descriptionAr: 'أذكار الصلاة وبعدها'
        },
        {
          id: 'general',
          name: 'General',
          nameAr: 'أذكار عامة',
          description: 'General remembrance and supplications',
          descriptionAr: 'أذكار عامة ودعوات'
        }
      ]
      localStorage.setItem(this.AZKAR_CATEGORIES_KEY, JSON.stringify(defaultCategories))
    }

    // Initialize azkar
    if (!localStorage.getItem(this.AZKAR_KEY)) {
      const defaultAzkar: LocalAzkar[] = [
        // Morning Azkar
        {
          id: 'morning-tasbih',
          title: 'Morning Tasbih',
          titleAr: 'تسبيح الصباح',
          arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
          translation: 'Glory be to Allah and praise be to Him',
          reference: 'Sahih Muslim 2691',
          times: 100,
          categoryId: 'morning'
        },
        {
          id: 'morning-shahada',
          title: 'Morning Shahada',
          titleAr: 'شهادة الصباح',
          arabicText: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
          translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger',
          reference: 'Sahih Muslim 2691',
          times: 1,
          categoryId: 'morning'
        },
        {
          id: 'morning-istighfar',
          title: 'Morning Istighfar',
          titleAr: 'استغفار الصباح',
          arabicText: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
          translation: 'I seek forgiveness from Allah and repent to Him',
          reference: 'Sahih Bukhari 6307',
          times: 100,
          categoryId: 'morning'
        },
        // Evening Azkar
        {
          id: 'evening-tasbih',
          title: 'Evening Tasbih',
          titleAr: 'تسبيح المساء',
          arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
          translation: 'Glory be to Allah and praise be to Him',
          reference: 'Sahih Muslim 2691',
          times: 100,
          categoryId: 'evening'
        },
        {
          id: 'evening-shahada',
          title: 'Evening Shahada',
          titleAr: 'شهادة المساء',
          arabicText: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
          translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger',
          reference: 'Sahih Muslim 2691',
          times: 1,
          categoryId: 'evening'
        },
        // Prayer Azkar
        {
          id: 'after-prayer-tasbih',
          title: 'After Prayer Tasbih',
          titleAr: 'تسبيح بعد الصلاة',
          arabicText: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
          translation: 'Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest',
          reference: 'Sahih Muslim 2691',
          times: 33,
          categoryId: 'prayer'
        },
        {
          id: 'istighfar-after-prayer',
          title: 'Istighfar After Prayer',
          titleAr: 'استغفار بعد الصلاة',
          arabicText: 'أَسْتَغْفِرُ اللَّهَ',
          translation: 'I seek forgiveness from Allah',
          reference: 'Sahih Bukhari 6307',
          times: 33,
          categoryId: 'prayer'
        },
        // General Azkar
        {
          id: 'la-ilaha-illa-allah',
          title: 'La Ilaha Illa Allah',
          titleAr: 'لا إله إلا الله',
          arabicText: 'لَا إِلَهَ إِلَّا اللَّهُ',
          translation: 'There is no god but Allah',
          reference: 'Sahih Bukhari 6307',
          times: 100,
          categoryId: 'general'
        },
        {
          id: 'subhan-allah',
          title: 'Subhan Allah',
          titleAr: 'سبحان الله',
          arabicText: 'سُبْحَانَ اللَّهِ',
          translation: 'Glory be to Allah',
          reference: 'Sahih Bukhari 6307',
          times: 100,
          categoryId: 'general'
        }
      ]
      localStorage.setItem(this.AZKAR_KEY, JSON.stringify(defaultAzkar))
    }

    // Initialize empty arrays for user data
    if (!localStorage.getItem(this.AZKAR_PROGRESS_KEY)) {
      localStorage.setItem(this.AZKAR_PROGRESS_KEY, JSON.stringify([]))
    }
    if (!localStorage.getItem(this.TASBIH_COUNTS_KEY)) {
      localStorage.setItem(this.TASBIH_COUNTS_KEY, JSON.stringify([]))
    }
    if (!localStorage.getItem(this.BOOKMARKS_KEY)) {
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify([]))
    }
  }

  // Get all categories
  static getCategories(): LocalAzkarCategory[] {
    if (typeof window === 'undefined') return []
    try {
      const categories = localStorage.getItem(this.AZKAR_CATEGORIES_KEY)
      return categories ? JSON.parse(categories) : []
    } catch (error) {
      console.error('Error loading categories:', error)
      return []
    }
  }

  // Get all azkar
  static getAzkar(): LocalAzkar[] {
    if (typeof window === 'undefined') return []
    try {
      const azkar = localStorage.getItem(this.AZKAR_KEY)
      return azkar ? JSON.parse(azkar) : []
    } catch (error) {
      console.error('Error loading azkar:', error)
      return []
    }
  }

  // Get azkar by category
  static getAzkarByCategory(categoryId: string): LocalAzkar[] {
    const allAzkar = this.getAzkar()
    return allAzkar.filter(azkar => azkar.categoryId === categoryId)
  }

  // Get azkar progress for user
  static getAzkarProgress(userId: string): LocalAzkarProgress[] {
    if (typeof window === 'undefined') return []
    try {
      const progress = localStorage.getItem(this.AZKAR_PROGRESS_KEY)
      const allProgress: LocalAzkarProgress[] = progress ? JSON.parse(progress) : []
      return allProgress.filter(p => p.userId === userId)
    } catch (error) {
      console.error('Error loading azkar progress:', error)
      return []
    }
  }

  // Update azkar progress
  static updateAzkarProgress(userId: string, azkarId: string, completed: number): void {
    if (typeof window === 'undefined') return
    try {
      const progress = localStorage.getItem(this.AZKAR_PROGRESS_KEY)
      const allProgress: LocalAzkarProgress[] = progress ? JSON.parse(progress) : []
      
      const existingIndex = allProgress.findIndex(p => p.userId === userId && p.azkarId === azkarId)
      const today = new Date().toISOString().split('T')[0]
      
      if (existingIndex >= 0) {
        allProgress[existingIndex].completed = completed
        allProgress[existingIndex].date = today
      } else {
        allProgress.push({
          id: `progress-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId,
          azkarId,
          completed,
          date: today
        })
      }
      
      localStorage.setItem(this.AZKAR_PROGRESS_KEY, JSON.stringify(allProgress))
    } catch (error) {
      console.error('Error updating azkar progress:', error)
    }
  }

  // Get tasbih counts for user
  static getTasbihCounts(userId: string): LocalTasbihCount[] {
    if (typeof window === 'undefined') return []
    try {
      const counts = localStorage.getItem(this.TASBIH_COUNTS_KEY)
      const allCounts: LocalTasbihCount[] = counts ? JSON.parse(counts) : []
      return allCounts.filter(c => c.userId === userId)
    } catch (error) {
      console.error('Error loading tasbih counts:', error)
      return []
    }
  }

  // Update tasbih count
  static updateTasbihCount(userId: string, count: number): void {
    if (typeof window === 'undefined') return
    try {
      const counts = localStorage.getItem(this.TASBIH_COUNTS_KEY)
      const allCounts: LocalTasbihCount[] = counts ? JSON.parse(counts) : []
      const today = new Date().toISOString().split('T')[0]
      
      const existingIndex = allCounts.findIndex(c => c.userId === userId && c.date === today)
      
      if (existingIndex >= 0) {
        allCounts[existingIndex].count = count
      } else {
        allCounts.push({
          id: `tasbih-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId,
          count,
          date: today
        })
      }
      
      localStorage.setItem(this.TASBIH_COUNTS_KEY, JSON.stringify(allCounts))
    } catch (error) {
      console.error('Error updating tasbih count:', error)
    }
  }

  // Get bookmarks for user
  static getBookmarks(userId: string): LocalBookmark[] {
    if (typeof window === 'undefined') return []
    try {
      const bookmarks = localStorage.getItem(this.BOOKMARKS_KEY)
      const allBookmarks: LocalBookmark[] = bookmarks ? JSON.parse(bookmarks) : []
      return allBookmarks.filter(b => b.userId === userId)
    } catch (error) {
      console.error('Error loading bookmarks:', error)
      return []
    }
  }

  // Toggle bookmark
  static toggleBookmark(userId: string, azkarId: string): boolean {
    if (typeof window === 'undefined') return false
    try {
      const bookmarks = localStorage.getItem(this.BOOKMARKS_KEY)
      const allBookmarks: LocalBookmark[] = bookmarks ? JSON.parse(bookmarks) : []
      
      const existingIndex = allBookmarks.findIndex(b => b.userId === userId && b.azkarId === azkarId)
      
      if (existingIndex >= 0) {
        // Remove bookmark
        allBookmarks.splice(existingIndex, 1)
        localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(allBookmarks))
        return false
      } else {
        // Add bookmark
        allBookmarks.push({
          id: `bookmark-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId,
          azkarId,
          createdAt: new Date().toISOString()
        })
        localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(allBookmarks))
        return true
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      return false
    }
  }

  // Check if azkar is bookmarked
  static isBookmarked(userId: string, azkarId: string): boolean {
    if (typeof window === 'undefined') return false
    try {
      const bookmarks = localStorage.getItem(this.BOOKMARKS_KEY)
      const allBookmarks: LocalBookmark[] = bookmarks ? JSON.parse(bookmarks) : []
      return allBookmarks.some(b => b.userId === userId && b.azkarId === azkarId)
    } catch (error) {
      console.error('Error checking bookmark:', error)
      return false
    }
  }
}
