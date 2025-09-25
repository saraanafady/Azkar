"use client"

import { useState, useEffect, Suspense } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Save, History, Target, Trophy, Star, Zap, Heart, Crown, Sparkles, Quote, ArrowRight } from "lucide-react"
import { ProgressTracker } from "@/lib/progress-tracker"

interface TasbihOption {
  id: string
  text: string
  textAr: string
  defaultTarget: number
  description: string
  completed: boolean
  bestStreak: number
  totalCompleted: number
  lastCompleted?: string
  isCurrent?: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  unlocked: boolean
  progress: number
  maxProgress: number
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
    text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
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
    text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
    arabic: "وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ۖ وَيَوْمَ يَقُولُ كُن فَيَكُونُ ۚ قَوْلُهُ الْحَقُّ",
    reference: "Quran 6:73"
  },
  {
    text: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    reference: "Quran 65:2-3"
  },
  {
    text: "And whoever relies upon Allah - then He is sufficient for him.",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    reference: "Quran 65:3"
  }
]

const achievements: Achievement[] = [
  {
    id: "first_completion",
    title: "الخطوات الأولى",
    description: "أكمل سبحتك الأولى",
    icon: Star,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: "daily_warrior",
    title: "محارب يومي",
    description: "أكمل 7 سبح مختلفة في يوم واحد",
    icon: Zap,
    unlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: "hundred_club",
    title: "نادي المائة",
    description: "أكمل 100 تكرار من أي سبحة",
    icon: Trophy,
    unlocked: false,
    progress: 0,
    maxProgress: 100
  },
  {
    id: "master_collector",
    title: "جامع الخبير",
    description: "أكمل جميع السبح التسع مرة واحدة على الأقل",
    icon: Crown,
    unlocked: false,
    progress: 0,
    maxProgress: 9
  },
  {
    id: "streak_master",
    title: "سيد المتتالية",
    description: "حافظ على سلسلة 30 يوم",
    icon: Heart,
    unlocked: false,
    progress: 0,
    maxProgress: 30
  }
]

const getInitialTasbihOptions = (): TasbihOption[] => [
  {
    id: "subhanallah",
    text: "Subhan Allah",
    textAr: "سبحان الله",
    defaultTarget: 33,
    description: "Glory be to Allah",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: true
  },
  {
    id: "alhamdulillah",
    text: "Alhamdulillah",
    textAr: "الحمدلله",
    defaultTarget: 33,
    description: "Praise be to Allah",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: false
  },
  {
    id: "la_ilaha_illallah",
    text: "La ilaha illa Allah",
    textAr: "لا اله الا الله",
    defaultTarget: 33,
    description: "There is no god but Allah",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: false
  },
  {
    id: "allahu_akbar",
    text: "Allahu Akbar",
    textAr: "الله أكبر",
    defaultTarget: 34,
    description: "Allah is the Greatest",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: false
  },
  {
    id: "la_hawla",
    text: "La hawla wa la quwwata illa billah",
    textAr: "لا حول ولا قوة إلا بالله",
    defaultTarget: 100,
    description: "There is no power except with Allah",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: false
  },
  {
    id: "astaghfirullah",
    text: "Astaghfirullah",
    textAr: "استغفر الله",
    defaultTarget: 100,
    description: "I seek forgiveness from Allah",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: false
  },
  {
    id: "salawat",
    text: "Allahumma salli ala Muhammad",
    textAr: "اللهم صلي علي سيدنا محمد و علي آل سيدنا محمد كما صليت علي سيدنا ابراهيم و علي آل سيدنا إبراهيم",
    defaultTarget: 1,
    description: "O Allah, send blessings upon Muhammad",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: false
  },
  {
    id: "subhanallah_bihamdihi",
    text: "Subhan Allah wa bihamdihi",
    textAr: "سبحان الله و بحمده سبحان الله العظيم",
    defaultTarget: 100,
    description: "Glory be to Allah and praise be to Him",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0
  },
  {
    id: "la_ilaha_anta",
    text: "La ilaha anta subhanaka",
    textAr: "لا اله الا انت سبحانك اني كنت من الظالمين",
    defaultTarget: 3,
    description: "There is no god but You, glory be to You",
    completed: false,
    bestStreak: 0,
    totalCompleted: 0,
    isCurrent: false
  }
]

function TasbihContent() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [tasbihOptions, setTasbihOptions] = useState<TasbihOption[]>(getInitialTasbihOptions())
  const [selectedTasbih, setSelectedTasbih] = useState<TasbihOption>(getInitialTasbihOptions()[0])
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(33)
  const [isAnimating, setIsAnimating] = useState(false)
  const [savedCounts, setSavedCounts] = useState<Array<{id: string, count: number, date: string}>>([])
  const [showHistory, setShowHistory] = useState(false)
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState("")
  const [streak, setStreak] = useState(0)
  const [dailyCompleted, setDailyCompleted] = useState<string[]>([])
  const [currentQuote, setCurrentQuote] = useState(islamicQuotes[0])
  const [showQuote, setShowQuote] = useState(false)
  const [autoProgress, setAutoProgress] = useState(true)
  const [currentTasbihIndex, setCurrentTasbihIndex] = useState(0)

  useEffect(() => {
    if (user) {
      fetchSavedCounts()
    }
  }, [user])

  // Handle URL parameter for specific tasbih option
  useEffect(() => {
    const option = searchParams.get('option')
    if (option) {
      const optionToSelect = tasbihOptions.find(opt => opt.id === option)
      if (optionToSelect) {
        setSelectedTasbih(optionToSelect)
        // Scroll to the tasbih section
        setTimeout(() => {
          const element = document.getElementById('tasbih-counter')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 500)
      }
    }
  }, [searchParams, tasbihOptions])

  useEffect(() => {
    setTarget(selectedTasbih.defaultTarget)
    setCount(0)
  }, [selectedTasbih])

  const handleTasbihChange = (tasbih: TasbihOption) => {
    setSelectedTasbih(tasbih)
    setCount(0)
    setTarget(tasbih.defaultTarget)
    
    // Update the current tasbih index
    const newIndex = tasbihOptions.findIndex(t => t.id === tasbih.id)
    setCurrentTasbihIndex(newIndex)
    
    // Update isCurrent property for all tasbih options
    setTasbihOptions(prev => prev.map(t => ({
      ...t,
      isCurrent: t.id === tasbih.id
    })))
  }

  const fetchSavedCounts = async () => {
    try {
      if (typeof window !== 'undefined') {
        // For localStorage-based auth, we'll store counts in localStorage
        const saved = localStorage.getItem('azkar-tasbih-counts')
        if (saved) {
          setSavedCounts(JSON.parse(saved))
        }
      }
    } catch (error) {
      console.error('Error fetching saved counts:', error)
    }
  }

  const incrementCount = () => {
    const newCount = count + 1
    setCount(newCount)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)

    // Track progress for authenticated users
    if (user) {
      console.log('📿 Tasbih increment:', { userId: user.id, count: newCount, tasbih: selectedTasbih?.textAr })
      ProgressTracker.updateTasbihProgress(user.id, 1, 'Tasbih', selectedTasbih?.textAr)
      
      // Debug: Show current progress after increment
      const currentProgress = ProgressTracker.getProgress(user.id)
      console.log('📊 Progress after tasbih increment:', {
        totalTasbihCount: currentProgress.totalTasbihCount,
        recentCounts: currentProgress.recentTasbihCounts.length
      })
    } else {
      console.log('⚠️ No user found for tasbih tracking')
    }

    // Check for completion
    if (newCount >= target) {
      handleCompletion()
    }
  }

  const handleCompletion = async () => {
    const now = new Date().toISOString()
    const today = new Date().toDateString()
    
    // Update tasbih completion status
    setTasbihOptions(prev => prev.map(tasbih => 
      tasbih.id === selectedTasbih.id 
        ? { 
            ...tasbih, 
            completed: true, 
            totalCompleted: tasbih.totalCompleted + 1,
            lastCompleted: now
          }
        : tasbih
    ))

    // Update selected tasbih
    setSelectedTasbih(prev => ({
      ...prev,
      completed: true,
      totalCompleted: prev.totalCompleted + 1,
      lastCompleted: now
    }))

    // Add to daily completed if not already there
    if (!dailyCompleted.includes(selectedTasbih.id)) {
      setDailyCompleted(prev => [...prev, selectedTasbih.id])
    }

    // Update streak for authenticated users
    if (user) {
      console.log('🎯 Tasbih completion! Updating streak for user:', user.id)
      ProgressTracker.updateStreak(user.id)
      
      // Debug: Show final progress
      const finalProgress = ProgressTracker.getProgress(user.id)
      console.log('📊 Final progress after tasbih completion:', {
        totalTasbihCount: finalProgress.totalTasbihCount,
        streak: finalProgress.streakDays,
        recentCounts: finalProgress.recentTasbihCounts.length
      })
    } else {
      console.log('⚠️ No user found for streak update')
    }

    // Auto-save progress
    await autoSaveProgress()

    // Check achievements
    checkAchievements()

    // Show beautiful quote
    showBeautifulQuote()

    // Auto-progress to next tasbih if enabled
    if (autoProgress) {
      setTimeout(() => {
        moveToNextTasbih()
      }, 2000) // Reduced to 2 seconds for faster flow
    }

    // Show celebration
    showCompletionCelebration()
  }

  const autoSaveProgress = async () => {
    if (!user || typeof window === 'undefined') return

    try {
      // For localStorage-based auth, save to localStorage
      const saved = localStorage.getItem('azkar-tasbih-counts') || '[]'
      const counts = JSON.parse(saved)
      
      const newCount = {
        id: Date.now().toString(),
        count,
        tasbihId: selectedTasbih.id,
        tasbihText: selectedTasbih.text,
        tasbihTextAr: selectedTasbih.textAr,
        completed: true,
        target: target,
        date: new Date().toISOString()
      }
      
      counts.push(newCount)
      localStorage.setItem('azkar-tasbih-counts', JSON.stringify(counts))
      setSavedCounts(counts)
    } catch (error) {
      console.error('Error auto-saving progress:', error)
    }
  }

  const showBeautifulQuote = () => {
    const randomQuote = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)]
    setCurrentQuote(randomQuote)
    setShowQuote(true)
    setTimeout(() => setShowQuote(false), 2500) // Show quote for 2.5 seconds (optimized for better UX)
  }

  const moveToNextTasbih = () => {
    const nextIndex = (currentTasbihIndex + 1) % tasbihOptions.length
    const nextTasbih = tasbihOptions[nextIndex]
    
    setCurrentTasbihIndex(nextIndex)
    setSelectedTasbih(nextTasbih)
    setCount(0)
    setTarget(nextTasbih.defaultTarget)
    
    // Update the tasbih options state to reflect the new current index
    setTasbihOptions(prev => prev.map((tasbih, index) => ({
      ...tasbih,
      isCurrent: index === nextIndex
    })))
  }

  const showCompletionCelebration = () => {
    const messages = [
      "MashaAllah! Well done!",
      "Alhamdulillah! You did it!",
      "Barakallahu feeki! Amazing!",
      "SubhanAllah! Excellent work!",
      "Allahu Akbar! Outstanding!"
    ]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setCelebrationMessage(randomMessage)
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 1000) // Reduced to 1.5 seconds for better UX
  }

  const checkAchievements = () => {
    setUserAchievements(prev => prev.map((achievement: Achievement) => {
      let newProgress = achievement.progress
      let unlocked = achievement.unlocked

      switch (achievement.id) {
        case "first_completion":
          if (!unlocked && selectedTasbih.completed) {
            newProgress = 1
            unlocked = true
          }
          break
        case "daily_warrior":
          newProgress = dailyCompleted.length + (dailyCompleted.includes(selectedTasbih.id) ? 0 : 1)
          if (newProgress >= achievement.maxProgress) {
            unlocked = true
          }
          break
        case "hundred_club":
          if (count >= 100) {
            newProgress = 100
            unlocked = true
          }
          break
        case "master_collector":
          newProgress = tasbihOptions.filter(t => t.completed).length
          if (newProgress >= achievement.maxProgress) {
            unlocked = true
          }
          break
      }

      return { ...achievement, progress: newProgress, unlocked }
    }))
  }

  const resetCount = () => {
    setCount(0)
  }

  const saveCount = async () => {
    if (!user || count === 0 || typeof window === 'undefined') return

    try {
      // For localStorage-based auth, save to localStorage
      const saved = localStorage.getItem('azkar-tasbih-counts') || '[]'
      const counts = JSON.parse(saved)
      
      const newCount = {
        id: Date.now().toString(),
        count,
        tasbihId: selectedTasbih.id,
        tasbihText: selectedTasbih.text,
        tasbihTextAr: selectedTasbih.textAr,
        date: new Date().toISOString()
      }
      
      counts.push(newCount)
      localStorage.setItem('azkar-tasbih-counts', JSON.stringify(counts))
      setSavedCounts(counts)
    } catch (error) {
      console.error('Error saving count:', error)
    }
  }

  const getProgressPercentage = () => {
    return Math.min((count / target) * 100, 100)
  }

  const getCompletionMessage = () => {
    if (count === 0) return "Start your dhikr"
    if (count < target) return `${target - count} more to reach your target`
    if (count === target) return "Target reached! Alhamdulillah!"
    return "Target exceeded! MashaAllah!"
  }

  const getMotivationalMessage = () => {
    if (count === 0) return "Begin with Bismillah"
    if (count < 10) return "Keep going, every dhikr counts"
    if (count < target) return "You're doing great!"
    if (count === target) return "Perfect! Alhamdulillah!"
    return "MashaAllah! Keep up the good work"
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent"
          >
            السبحة الرقمية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            تتبع ذكرك مع عداد السبحة الرقمي الحديث
          </motion.p>
        </div>

        {/* Tasbih Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">اختر السبحة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tasbihOptions.map((tasbih) => (
                <motion.button
                  key={tasbih.id}
                  onClick={() => handleTasbihChange(tasbih)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl text-left transition-all duration-200 relative overflow-hidden ${
                    tasbih.isCurrent
                      ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/50'
                      : tasbih.completed
                      ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-2 border-green-500/30 dark:bg-green-500/10 hover:bg-green-500/30 dark:hover:bg-green-500/20'
                      : 'bg-muted hover:bg-muted/80 text-foreground border border-border'
                  }`}
                >
                  {tasbih.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Crown className="w-4 h-4 text-green-500" />
                    </motion.div>
                  )}
                  
                  {tasbih.isCurrent && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 left-2"
                    >
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    </motion.div>
                  )}
                  
                  <div className="font-arabic text-lg mb-1 text-foreground" dir="rtl">
                    {tasbih.textAr}
                  </div>
                  <div className="text-sm opacity-80 text-muted-foreground">
                    {tasbih.text}
                  </div>
                  <div className="text-xs opacity-60 mt-1 text-muted-foreground">
                    {tasbih.description}
                  </div>
                  
                  {tasbih.completed && (
                    <div className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">
                      ✓ مكتمل {tasbih.totalCompleted} مرة
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Counter */}
          <motion.div
            id="tasbih-counter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-2xl shadow-2xl p-8 text-center border border-border"
          >
            {/* Selected Tasbih Display */}
            <div className={`mb-8 p-6 rounded-xl transition-all duration-500 ${
              selectedTasbih.completed 
                ? 'bg-green-500/10 border-2 border-green-500/30 dark:bg-green-500/20 dark:border-green-500/50' 
                : 'bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30'
            }`}>
              <div className="font-arabic text-2xl mb-2 text-foreground" dir="rtl">
                {selectedTasbih.textAr}
              </div>
              <div className="text-lg text-primary font-medium mb-1">
                {selectedTasbih.text}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedTasbih.description}
              </div>
              {selectedTasbih.completed && (
                <div className="mt-2 flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                  <Crown className="w-4 h-4 mr-1" />
                  مكتمل {selectedTasbih.totalCompleted} مرة
                </div>
              )}
            </div>

            {/* Target Setting */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                العدد المستهدف
              </label>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setTarget(Math.max(1, target - 1))}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-all duration-200 border border-border"
                >
                  -
                </button>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center text-2xl font-bold text-foreground bg-transparent border-none outline-none"
                />
                <button
                  onClick={() => setTarget(target + 1)}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-all duration-200 border border-border"
                >
                  +
                </button>
              </div>
            </div>

            {/* Auto-Progression Controls */}
            <div className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
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
              <p className="text-xs text-muted-foreground mt-2">
                {autoProgress 
                  ? "سيتقدم تلقائياً إلى السبحة التالية بعد الإكمال" 
                  : "تقدم يدوي - ستبقى على السبحة الحالية"
                }
              </p>
            </div>

            {/* Main Counter - Clickable */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={incrementCount}
              className="mb-8 cursor-pointer select-none"
            >
              {/* Counter Display */}
              <div className="mb-6">
                <motion.div
                  key={count}
                  initial={{ scale: 1 }}
                  animate={{ scale: isAnimating ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-8xl md:text-9xl font-bold text-primary mb-4"
                >
                  {count}
                </motion.div>
                
                <div className="text-lg text-muted-foreground mb-2">
                  {getCompletionMessage()}
                </div>
                
                <div className="text-sm text-primary font-medium">
                  {getMotivationalMessage()}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-muted rounded-full h-4">
                  <motion.div
                    className="bg-primary h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-2 text-center">
                  {Math.round(getProgressPercentage())}% مكتمل
                </div>
              </div>

              {/* Tap Instruction */}
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  اضغط للعد
                </div>
                <div className="text-sm text-muted-foreground">
                  {count >= target ? 'مكتمل! اضغط للمتابعة...' : `اضغط في أي مكان للعد (${target - count} أخرى)`}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCount}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center border border-border"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  إعادة تعيين
                </motion.button>

                {user && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveCount}
                    disabled={count === 0}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-muted disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    حفظ
                  </motion.button>
                )}
              </div>
            </div>

            {!user && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-primary">
                  سجل الدخول لحفظ عداداتك وتتبع تقدمك
                </p>
              </div>
            )}
          </motion.div>

          {/* History Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card rounded-2xl shadow-2xl p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                تقدمك
              </h3>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <History className="w-5 h-5 mr-2" />
                {showHistory ? 'إخفاء' : 'إظهار'} السجل
              </button>
            </div>

            {/* Today's Stats */}
            <div className="mb-6">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                <h4 className="text-lg font-semibold text-foreground">
                  عد اليوم
                </h4>
                <p className="text-3xl font-bold text-primary">
                  {count}
                </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <Target className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">
                        {count >= target ? 'تم الوصول للهدف!' : `${target - count} متبقي`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            {showHistory && user && (
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  الأعداد الأخيرة
                </h4>
                {savedCounts.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {savedCounts.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-muted rounded-lg p-3 border border-border"
                      >
                        <div>
                          <p className="font-semibold text-foreground">
                            {item.count} ذكر
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-primary font-bold">
                          {item.count >= target ? '✓' : '○'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      لا توجد أعداد محفوظة بعد. ابدأ العد واحفظ تقدمك!
                    </p>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  سجل الدخول لعرض سجل تقدمك
                </p>
                <a
                  href="/auth/signin"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  تسجيل الدخول
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
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
          )}
        </AnimatePresence>

        {/* Beautiful Quote Display */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
            >
              <div className="bg-card border-2 border-primary/30 px-8 py-6 rounded-2xl shadow-2xl text-center max-w-2xl mx-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <Quote className="w-8 h-8 text-primary mx-auto" />
                </motion.div>
                <div className="font-arabic text-xl mb-4 text-foreground" dir="rtl">
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
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-4 flex items-center justify-center text-primary"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <span className="text-sm text-muted-foreground">Moving to next tasbih...</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievements Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-card rounded-2xl shadow-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
                <h3 className="text-2xl font-bold text-foreground">Achievements</h3>
              </div>
              <button
                onClick={() => setShowAchievements(!showAchievements)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium text-sm"
              >
                {showAchievements ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {userAchievements.map((achievement: Achievement) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-muted border-border text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <Icon className={`w-5 h-5 mr-2 ${
                        achievement.unlocked ? 'text-green-400' : 'text-muted-foreground'
                      }`} />
                      <h4 className={`font-semibold text-sm ${
                        achievement.unlocked ? 'text-green-400' : 'text-foreground'
                      }`}>{achievement.title}</h4>
                    </div>
                    <p className={`text-xs mb-3 ${
                      achievement.unlocked ? 'text-green-300' : 'text-muted-foreground'
                    }`}>{achievement.description}</p>
                    <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          achievement.unlocked ? 'bg-green-400' : 'bg-yellow-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className={`text-xs ${
                      achievement.unlocked ? 'text-green-300' : 'text-muted-foreground'
                    }`}>
                      {achievement.progress}/{achievement.maxProgress}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {showAchievements && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-border"
              >
                <h4 className="text-lg font-semibold text-foreground mb-4">Progress Summary</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center bg-muted rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-400">
                      {tasbihOptions.filter(t => t.completed).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center bg-muted rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">
                      {userAchievements.filter((a: Achievement) => a.unlocked).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                  <div className="text-center bg-muted rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">
                      {streak}
                    </div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center bg-muted rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      {dailyCompleted.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Today</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function TasbihPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <TasbihContent />
    </Suspense>
  )
}
