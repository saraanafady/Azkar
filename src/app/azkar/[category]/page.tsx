"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { Bookmark, CheckCircle, Circle, Star, ArrowLeft, Quote, ArrowRight, Sparkles, Crown } from "lucide-react"
import Link from "next/link"
import { ProgressTracker } from "@/lib/progress-tracker"

interface Azkar {
  id: string
  title: string
  titleAr: string
  arabicText: string
  translation: string
  reference: string | null
  times: number
  progress?: {
    completed: number
  }
  isBookmarked?: boolean
}

interface Category {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
}

const islamicQuotes = [
  {
    text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
    reference: "Quran 65:3"
  },
  {
    text: "And remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    reference: "Quran 2:152"
  },
  {
    text: "And whoever does righteous deeds - whether male or female - while being a believer, they will enter Paradise and will not be wronged even as much as the speck on a date seed.",
    arabic: "وَمَن يَعْمَلْ مِنَ الصَّالِحَاتِ مِن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَأُولَٰئِكَ يَدْخُلُونَ الْجَنَّةَ وَلَا يُظْلَمُونَ نَقِيرًا",
    reference: "Quran 4:124"
  },
  {
    text: "Indeed, Allah is with those who are patient.",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    reference: "Quran 2:153"
  },
  {
    text: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    reference: "Quran 65:2-3"
  },
  {
    text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
    arabic: "وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ۖ وَيَوْمَ يَقُولُ كُن فَيَكُونُ ۚ قَوْلُهُ الْحَقُّ",
    reference: "Quran 6:73"
  }
]

export default function AzkarCategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [azkar, setAzkar] = useState<Azkar[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [localProgress, setLocalProgress] = useState<Record<string, number>>({})
  const [clickAnimations, setClickAnimations] = useState<Record<string, boolean>>({})
  const [currentQuote, setCurrentQuote] = useState(islamicQuotes[0])
  const [showQuote, setShowQuote] = useState(false)
  const [autoProgress, setAutoProgress] = useState(true)
  const [currentAzkarIndex, setCurrentAzkarIndex] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState("")
  const [highlightId, setHighlightId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  useEffect(() => {
    if (params.category) {
      fetchAzkar(params.category as string)
    }
  }, [params.category])

  // Handle URL parameters for search and highlight
  useEffect(() => {
    const highlight = searchParams.get('highlight')
    const search = searchParams.get('search')
    
    if (highlight) {
      setHighlightId(highlight)
      // Scroll to the highlighted item after a short delay
      setTimeout(() => {
        const element = document.getElementById(`azkar-${highlight}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Add highlight effect
          element.classList.add('ring-2', 'ring-primary', 'ring-opacity-50')
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50')
          }, 3000)
        }
      }, 500)
    }
    
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const fetchAzkar = async (categoryName: string) => {
    try {
      const response = await fetch(`/api/azkar/category/${categoryName}`)
      const data = await response.json()
      
      // Restore progress and bookmarks from localStorage
      const azkarWithLocalData = data.azkar.map((item: Azkar) => {
        const progressKey = `azkar_progress_${item.id}`
        const bookmarkKey = `azkar_bookmark_${item.id}`
        
        const localProgress = localStorage.getItem(progressKey)
        const isBookmarked = localStorage.getItem(bookmarkKey) === 'true'
        
        return {
          ...item,
          progress: localProgress ? { completed: parseInt(localProgress) } : null,
          isBookmarked: isBookmarked
        }
      })
      
      setAzkar(azkarWithLocalData)
      setCategory(data.category)
      
      // Initialize progress state from localStorage
      const progressState: Record<string, number> = {}
      azkarWithLocalData.forEach((item: Azkar) => {
        progressState[item.id] = item.progress?.completed || 0
      })
      setProgress(progressState)
    } catch (error) {
      console.error('Error fetching azkar:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (azkarId: string, completed: number) => {
    // Since we're using mock data, store progress in localStorage for all users
    try {
      const progressKey = `azkar_progress_${azkarId}`
      localStorage.setItem(progressKey, completed.toString())
      
      setProgress(prev => ({
        ...prev,
        [azkarId]: completed
      }))
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  // Animation functions
  const triggerClickAnimation = (azkarId: string) => {
    setClickAnimations(prev => ({
      ...prev,
      [azkarId]: true
    }))
    setTimeout(() => {
      setClickAnimations(prev => ({
        ...prev,
        [azkarId]: false
      }))
    }, 300)
  }

  // Local progress functions for non-logged in users
  const incrementLocalProgress = (azkarId: string) => {
    const currentCount = localProgress[azkarId] || 0
    const azkarItem = azkar.find(a => a.id === azkarId)
    if (azkarItem && currentCount < azkarItem.times) {
      setLocalProgress(prev => ({
        ...prev,
        [azkarId]: currentCount + 1
      }))
      triggerClickAnimation(azkarId)
    }
  }

  const resetLocalProgress = (azkarId: string) => {
    setLocalProgress(prev => ({
      ...prev,
      [azkarId]: 0
    }))
  }

  const getCurrentProgress = (azkarId: string) => {
    if (user) {
      return progress[azkarId] || 0
    }
    return localProgress[azkarId] || 0
  }

  const toggleBookmark = async (azkarId: string) => {
    // Since we're using mock data, store bookmarks in localStorage for all users
    try {
      const bookmarkKey = `azkar_bookmark_${azkarId}`
      const isCurrentlyBookmarked = localStorage.getItem(bookmarkKey) === 'true'
      const newBookmarkState = !isCurrentlyBookmarked
      
      if (newBookmarkState) {
        localStorage.setItem(bookmarkKey, 'true')
      } else {
        localStorage.removeItem(bookmarkKey)
      }
      
      setAzkar(prev => prev.map(item => 
        item.id === azkarId 
          ? { ...item, isBookmarked: newBookmarkState }
          : item
      ))
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  const incrementProgress = async (azkarId: string) => {
    const current = progress[azkarId] || 0
    const azkarItem = azkar.find(item => item.id === azkarId)
    if (azkarItem && current < azkarItem.times) {
      const newCount = current + 1
      await updateProgress(azkarId, newCount)
      
      // Check if completed
      if (newCount >= azkarItem.times) {
        handleCompletion(azkarId, azkarItem)
      }
    }
  }

  const handleCompletion = async (azkarId: string, azkarItem: Azkar) => {
    // Track progress for authenticated users
    if (user) {
      ProgressTracker.updateAzkarProgress(user.id, category?.name || 'Unknown', 1, 1)
    }
    
    // Show beautiful quote
    showBeautifulQuote()
    
    // Show celebration
    showCompletionCelebration()
    
    // Auto-progress to next azkar if enabled
    if (autoProgress) {
      setTimeout(() => {
        moveToNextAzkar()
      }, 3000) // Wait 3 seconds to show quote
    }
  }

  const showBeautifulQuote = () => {
    const randomQuote = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)]
    setCurrentQuote(randomQuote)
    setShowQuote(true)
    setTimeout(() => setShowQuote(false), 5000) // Show quote for 5 seconds
  }

  const showCompletionCelebration = () => {
    const messages = [
      "ما شاء الله! أحسنت!",
      "الحمد لله! لقد أكملتها!",
      "بارك الله فيك! رائع!",
      "سبحان الله! عمل ممتاز!",
      "الله أكبر! مذهل!"
    ]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setCelebrationMessage(randomMessage)
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 3000)
  }

  const moveToNextAzkar = () => {
    const nextIndex = (currentAzkarIndex + 1) % azkar.length
    setCurrentAzkarIndex(nextIndex)
    
    // Scroll to next azkar
    const nextElement = document.getElementById(`azkar-${azkar[nextIndex].id}`)
    if (nextElement) {
      nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const resetProgress = (azkarId: string) => {
    updateProgress(azkarId, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Category not found
          </h1>
          <Link href="/azkar" className="text-primary">
            Back to Azkar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/azkar" 
            className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Azkar
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {category.name}
            </h1>
            <h2 className="text-2xl font-semibold text-primary mb-4" dir="rtl">
              {category.nameAr}
            </h2>
            <p className="text-muted-foreground">
              {category.description}
            </p>
          </motion.div>
        </div>

        {/* Azkar List */}
        <div className="space-y-6">
          {azkar.map((item, index) => {
            const completed = getCurrentProgress(item.id)
            const percentage = (completed / item.times) * 100
            const isComplete = completed >= item.times
            const isAnimating = clickAnimations[item.id] || false
            
            return (
              <motion.div
                key={item.id}
                id={`azkar-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-card rounded-xl shadow-lg p-6 transition-all duration-200 cursor-pointer select-none border border-border ${
                  isComplete ? 'ring-2 ring-green-500 ring-opacity-50' : 'hover:shadow-xl hover:bg-accent/50'
                } ${
                  isAnimating ? 'scale-105 bg-accent' : ''
                } ${
                  highlightId === item.id ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' : ''
                }`}
                onClick={() => !isComplete && (user ? incrementProgress(item.id) : incrementLocalProgress(item.id))}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <h4 className="text-lg font-medium text-primary mb-3" dir="rtl">
                      {item.titleAr}
                    </h4>
                  </div>
                  
                  {user && (
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.isBookmarked
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${item.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Arabic Text */}
                <div className="mb-4">
                  <p className={`text-2xl font-medium text-center leading-relaxed transition-all duration-200 ${
                    isComplete 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-foreground'
                  }`} dir="rtl">
                    {item.arabicText}
                  </p>
                  {!isComplete && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      اضغط في أي مكان على هذه البطاقة للعد
                    </p>
                  )}
                </div>

                {/* Translation */}
                <div className="mb-4">
                  <p className="text-muted-foreground text-center italic">
                    {item.translation}
                  </p>
                </div>

                {/* Reference */}
                {item.reference && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground text-center">
                      المرجع: {item.reference}
                    </p>
                  </div>
                )}

                {/* Progress Section */}
                <div className="border-t border-border pt-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">
                      التقدم: {completed} / {item.times}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-3 mb-4">
                    <motion.div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        isComplete ? 'bg-green-500' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                      animate={isAnimating ? { scaleX: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          if (user) {
                            incrementProgress(item.id)
                          } else {
                            incrementLocalProgress(item.id)
                          }
                        }}
                        disabled={isComplete}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isComplete
                            ? 'bg-green-500 text-white cursor-not-allowed'
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 active:scale-95'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {isComplete ? '✓ مكتمل' : 'عد +1'}
                      </button>
                      
                      <button
                        onClick={() => {
                          if (user) {
                            resetProgress(item.id)
                          } else {
                            resetLocalProgress(item.id)
                          }
                        }}
                        className="flex items-center px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg font-medium transition-colors hover:scale-105 active:scale-95"
                      >
                        <Circle className="w-4 h-4 mr-2" />
                        إعادة تعيين
                      </button>
                    </div>

                    {isComplete && (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <Star className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium">مكتمل!</span>
                      </div>
                    )}
                  </div>
                </div>

                {!user && (
                  <div className="border-t border-border pt-4 text-center">
                    <p className="text-muted-foreground text-sm">
                      سجل الدخول لتتبع تقدمك وحفظ الأذكار
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {azkar.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              لم يتم العثور على أذكار في هذه الفئة.
            </p>
          </div>
        )}

        {/* Celebration Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: showCelebration ? 1 : 0, scale: showCelebration ? 1 : 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl text-2xl font-bold text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 0.6,
                repeat: 2
              }}
            >
              {celebrationMessage}
            </motion.div>
            <motion.div
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                repeat: 2
              }}
              className="mt-2"
            >
              <Sparkles className="w-8 h-8 mx-auto" />
            </motion.div>
          </div>
        </motion.div>

        {/* Beautiful Quote Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showQuote ? 1 : 0, y: showQuote ? 0 : 50 }}
          className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
        >
          <div className="bg-card border-2 border-primary/30 px-8 py-6 rounded-2xl shadow-2xl text-center max-w-2xl mx-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: showQuote ? 1 : 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <Quote className="w-8 h-8 text-primary mx-auto" />
            </motion.div>
            <div className="font-arabic text-xl mb-4" dir="rtl">
              {currentQuote.arabic}
            </div>
            <div className="text-lg text-foreground mb-2">
              {currentQuote.text}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentQuote.reference}
            </div>
            {autoProgress && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showQuote ? 1 : 0 }}
                transition={{ delay: 1 }}
                className="mt-4 flex items-center justify-center text-primary"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                <span className="text-sm">الانتقال إلى الذكر التالي...</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Auto-Progression Controls */}
        <div className="fixed bottom-4 right-4 z-30">
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ArrowRight className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm font-medium text-foreground">التقدم التلقائي</span>
              </div>
              <button
                onClick={() => setAutoProgress(!autoProgress)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoProgress ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    autoProgress ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {autoProgress 
                ? "سيتقدم تلقائياً إلى الذكر التالي بعد الإكمال" 
                : "تقدم يدوي - ستبقى على الذكر الحالي"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
