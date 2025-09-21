"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Clock, BookOpen, Home, Calculator, BarChart3, Star, Settings } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface SearchResult {
  id: string
  title: string
  titleAr: string
  arabicText?: string
  translation?: string
  reference?: string | null
  times?: number
  category?: {
    id: string
    name: string
    nameAr: string
  }
  progress?: {
    completed: number
  } | null
  isBookmarked?: boolean
  resultType?: 'azkar' | 'page' | 'feature' | 'tasbih'
  description?: string
  descriptionAr?: string
  href?: string
  type?: string
  textAr?: string
  text?: string
}

interface SearchProps {
  className?: string
}

export default function SearchComponent({ className = "" }: SearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [localSuggestions, setLocalSuggestions] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Local suggestions for immediate results - comprehensive content
  const localSuggestionsData: SearchResult[] = [
    // Azkar content
    {
      id: "1",
      title: "Ayat al-Kursi",
      titleAr: "آية الكرسي",
      arabicText: "اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ",
      translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence",
      reference: "Al-Baqarah 2:255",
      times: 1,
      category: { id: "1", name: "Morning", nameAr: "أذكار الصباح" },
      resultType: "azkar"
    },
    {
      id: "2",
      title: "Surah Al-Ikhlas",
      titleAr: "سورة الإخلاص",
      arabicText: "قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ",
      translation: "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge",
      reference: "Al-Ikhlas 112:1-4",
      times: 3,
      category: { id: "1", name: "Morning", nameAr: "أذكار الصباح" },
      resultType: "azkar"
    },
    {
      id: "3",
      title: "Morning Tasbih",
      titleAr: "تسبيح الصباح",
      arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      translation: "Glory be to Allah and praise be to Him",
      reference: "Sahih Muslim 2691",
      times: 100,
      category: { id: "1", name: "Morning", nameAr: "أذكار الصباح" },
      resultType: "azkar"
    },
    // Pages
    {
      id: "azkar",
      title: "Azkar Collection",
      titleAr: "مجموعة الأذكار",
      description: "Comprehensive collection of morning, evening, and prayer remembrance",
      descriptionAr: "مجموعة شاملة من أذكار الصباح والمساء والصلاة",
      href: "/azkar",
      resultType: "page"
    },
    {
      id: "tasbih",
      title: "Digital Tasbih",
      titleAr: "السبحة الرقمية",
      description: "Modern digital tasbih counter with smooth animations",
      descriptionAr: "عداد سبحة رقمي حديث مع رسوم متحركة سلسة",
      href: "/tasbih",
      resultType: "page"
    },
    {
      id: "dashboard",
      title: "Dashboard",
      titleAr: "لوحة التحكم",
      description: "Track your progress and view detailed statistics",
      descriptionAr: "تتبع تقدمك وعرض الإحصائيات المفصلة",
      href: "/dashboard",
      resultType: "page"
    },
    // Tasbih options
    {
      id: "subhanallah",
      title: "Subhan Allah",
      titleAr: "سبحان الله",
      textAr: "سبحان الله",
      description: "Glory be to Allah",
      times: 33,
      resultType: "tasbih"
    },
    {
      id: "alhamdulillah",
      title: "Alhamdulillah",
      titleAr: "الحمدلله",
      textAr: "الحمد لله",
      description: "Praise be to Allah",
      times: 33,
      resultType: "tasbih"
    },
    // Features
    {
      id: "bookmark",
      title: "Bookmark System",
      titleAr: "نظام الإشارات المرجعية",
      description: "Save your favorite azkar for quick access",
      descriptionAr: "احفظ أذكارك المفضلة للوصول السريع",
      resultType: "feature"
    },
    {
      id: "progress",
      title: "Progress Tracking",
      titleAr: "تتبع التقدم",
      description: "Monitor your daily, weekly, and monthly progress",
      descriptionAr: "راقب تقدمك اليومي والأسبوعي والشهري",
      resultType: "feature"
    }
  ]

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('azkar-recent-searches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading recent searches:', error)
      }
    }
  }, [])

  // Save recent searches to localStorage
  const saveRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('azkar-recent-searches', JSON.stringify(updated))
  }

  // Local search function for immediate suggestions
  const searchLocalSuggestions = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return []
    
    const normalizedQuery = searchQuery.toLowerCase().trim()
    return localSuggestionsData.filter(item => {
      const searchableText = [
        item.title,
        item.titleAr,
        item.arabicText,
        item.translation,
        item.description,
        item.descriptionAr,
        item.reference
      ].filter(Boolean).join(' ').toLowerCase()
      
      return searchableText.includes(normalizedQuery)
    }).slice(0, 5) // Limit to 5 local suggestions
  }

  // Search function with immediate suggestions
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLocalSuggestions([])
      setShowResults(true) // Show suggestions even when empty
      return
    }

    // Immediate local search for instant suggestions
    const localResults = searchLocalSuggestions(query)
    setLocalSuggestions(localResults)

    // API search with shorter debounce for comprehensive results
    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/azkar/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        console.log('Search query:', query)
        console.log('Search results:', data.results)
        setResults(data.results || [])
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 200) // Slightly longer debounce for API calls

    return () => clearTimeout(timeoutId)
  }, [query])

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm)
    saveRecentSearch(searchTerm)
    inputRef.current?.focus()
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
    inputRef.current?.focus()
  }

  const getCategoryHref = (categoryName: string) => {
    const categoryMap: Record<string, string> = {
      'Morning': '/azkar/morning',
      'Evening': '/azkar/evening',
      'Prayer': '/azkar/prayer',
      'General': '/azkar/general'
    }
    return categoryMap[categoryName] || '/azkar'
  }

  const getResultIcon = (resultType: string, id: string) => {
    if (resultType === 'page') {
      const iconMap: Record<string, any> = {
        'home': Home,
        'azkar': BookOpen,
        'tasbih': Calculator,
        'dashboard': BarChart3,
        'signin': Settings,
        'signup': Settings
      }
      return iconMap[id] || BookOpen
    } else if (resultType === 'feature') {
      return Star
    } else if (resultType === 'tasbih') {
      return Calculator
    } else {
      return BookOpen
    }
  }

  const getResultHref = (result: SearchResult) => {
    // Direct href for pages
    if (result.href) return result.href
    
    // For azkar content, navigate to specific category with search parameter
    if (result.resultType === 'azkar' && result.category) {
      const categoryHref = getCategoryHref(result.category.name)
      // Add search parameter to highlight the specific azkar
      return `${categoryHref}?search=${encodeURIComponent(result.title)}&highlight=${result.id}`
    }
    
    // For tasbih options, go to tasbih page with specific option
    if (result.resultType === 'tasbih') {
      return `/tasbih?option=${result.id}`
    }
    
    // For features, go to relevant page
    if (result.resultType === 'feature') {
      if (result.id === 'bookmark' || result.id === 'progress') {
        return '/dashboard'
      } else if (result.id === 'themes') {
        return '/dashboard?tab=settings'
      } else if (result.id === 'achievements') {
        return '/dashboard?tab=achievements'
      } else if (result.id === 'statistics') {
        return '/dashboard?tab=statistics'
      }
    }
    
    // Default fallback
    return '/azkar'
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="البحث في الأذكار..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setShowResults(true)
            // Show local suggestions immediately when focused
            if (query.trim()) {
              const localResults = searchLocalSuggestions(query)
              setLocalSuggestions(localResults)
            }
          }}
          className="block w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          dir="rtl"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            style={{ display: 'block' }}
          >
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                جاري البحث...
              </div>
            ) : (results.length > 0 || localSuggestions.length > 0) ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
                  {results.length > 0 ? `Found ${results.length} results` : `${localSuggestions.length} suggestions`} for "{query}"
                </div>
                
                {/* Show local suggestions first if no API results yet */}
                {results.length === 0 && localSuggestions.length > 0 && (
                  <>
                    <div className="px-4 py-1 text-xs font-medium text-muted-foreground bg-accent/50">
                      Quick suggestions
                    </div>
                    {localSuggestions.map((result) => {
                      const Icon = getResultIcon(result.resultType || 'azkar', result.id)
                      const href = getResultHref(result)
                      
                      return (
                        <Link
                          key={`local-${result.id}`}
                          href={href}
                          onClick={() => setShowResults(false)}
                          className="block px-4 py-3 hover:bg-accent transition-colors duration-200 border-b border-border last:border-b-0"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm font-medium text-foreground">
                                  {result.title}
                                </span>
                                {result.resultType === 'azkar' && result.category && (
                                  <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                                    {result.category.nameAr}
                                  </span>
                                )}
                                {result.resultType && result.resultType !== 'azkar' && (
                                  <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                                    {result.resultType === 'page' ? 'صفحة' : 'ميزة'}
                                  </span>
                                )}
                              </div>
                              
                              {result.resultType === 'azkar' ? (
                                <>
                                  <p className="text-sm text-muted-foreground mb-1" dir="rtl">
                                    {result.arabicText && truncateText(result.arabicText, 60)}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {result.translation && truncateText(result.translation, 80)}
                                  </p>
                                  {result.reference && (
                                    <p className="text-xs text-primary mt-1">
                                      {result.reference}
                                    </p>
                                  )}
                                </>
                              ) : (
                                <>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {result.description && truncateText(result.description, 80)}
                                  </p>
                                  {result.descriptionAr && (
                                    <p className="text-xs text-muted-foreground" dir="rtl">
                                      {truncateText(result.descriptionAr, 60)}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                            {result.resultType === 'azkar' && result.times && (
                              <div className="text-xs text-muted-foreground ml-2">
                                {result.times}x
                              </div>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </>
                )}
                
                {/* Show API results when available */}
                {results.map((result) => {
                  const Icon = getResultIcon(result.resultType || 'azkar', result.id)
                  const href = getResultHref(result)
                  
                  return (
                    <Link
                      key={result.id}
                      href={href}
                      onClick={() => setShowResults(false)}
                      className="block px-4 py-3 hover:bg-accent transition-colors duration-200 border-b border-border last:border-b-0"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm font-medium text-foreground">
                              {result.title}
                            </span>
                            {result.resultType === 'azkar' && result.category && (
                              <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                                {result.category.nameAr}
                              </span>
                            )}
                            {result.resultType && result.resultType !== 'azkar' && (
                              <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                                {result.resultType === 'page' ? 'صفحة' : 
                                 result.resultType === 'feature' ? 'ميزة' :
                                 result.resultType === 'tasbih' ? 'تسبيح' : 'محتوى'}
                              </span>
                            )}
                          </div>
                          
                          {result.resultType === 'azkar' ? (
                            <>
                              <p className="text-sm text-muted-foreground mb-1" dir="rtl">
                                {result.arabicText && truncateText(result.arabicText, 60)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {result.translation && truncateText(result.translation, 80)}
                              </p>
                              {result.reference && (
                                <p className="text-xs text-primary mt-1">
                                  {result.reference}
                                </p>
                              )}
                            </>
                          ) : result.resultType === 'tasbih' ? (
                            <>
                              <p className="text-sm text-muted-foreground mb-1" dir="rtl">
                                {result.textAr && truncateText(result.textAr, 60)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {result.description && truncateText(result.description, 80)}
                              </p>
                              {result.times && (
                                <p className="text-xs text-primary mt-1">
                                  {result.times} times
                                </p>
                              )}
                            </>
                          ) : (
                            <>
                              <p className="text-sm text-muted-foreground mb-1">
                                {result.description && truncateText(result.description, 80)}
                              </p>
                              {result.descriptionAr && (
                                <p className="text-xs text-muted-foreground" dir="rtl">
                                  {truncateText(result.descriptionAr, 60)}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                        {(result.resultType === 'azkar' || result.resultType === 'tasbih') && result.times && (
                          <div className="text-xs text-muted-foreground ml-2">
                            {result.times}x
                          </div>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : query ? (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>لم يتم العثور على نتائج</p>
                <p className="text-sm">جرب البحث بكلمات مختلفة</p>
                <p className="text-xs mt-2">Query: "{query}"</p>
              </div>
            ) : recentSearches.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                  <Clock className="h-3 w-3 inline mr-1" />
                  البحث الأخير
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full text-right px-4 py-2 hover:bg-accent transition-colors duration-200 text-sm text-foreground"
                  >
                    {search}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                  <Search className="h-3 w-3 inline mr-1" />
                  {query.trim() ? 'اقتراحات البحث' : 'ابدأ الكتابة للبحث'}
                </div>
                {query.trim() ? (
                  // Show search suggestions when typing
                  [
                    'آية الكرسي',
                    'ايه الكرسي',
                    'تسبيح الصباح',
                    'السبحة الرقمية',
                    'لوحة التحكم',
                    'أذكار المساء',
                    'سورة الإخلاص',
                    'استغفار',
                    'شهادة',
                    'دعاء'
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-right px-4 py-2 hover:bg-accent transition-colors duration-200 text-sm text-foreground"
                    >
                      {suggestion}
                    </button>
                  ))
                ) : (
                  // Show popular searches when empty
                  recentSearches.length > 0 ? (
                    <>
                      <div className="px-4 py-1 text-xs font-medium text-muted-foreground bg-accent/50">
                        البحث الأخير
                      </div>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-right px-4 py-2 hover:bg-accent transition-colors duration-200 text-sm text-foreground"
                        >
                          {search}
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-4 text-center text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>ابدأ الكتابة للبحث في الأذكار</p>
                    </div>
                  )
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
