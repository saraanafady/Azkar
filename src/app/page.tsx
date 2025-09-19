"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Calculator, BarChart3, Heart, Star, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

interface AzkarItem {
  id: string
  text: string
  counter: number
}

export default function Home() {
  const { data: session } = useSession()
  const [morningAzkar, setMorningAzkar] = useState<AzkarItem[]>([])
  const [eveningAzkar, setEveningAzkar] = useState<AzkarItem[]>([])
  const [loading, setLoading] = useState(false)
  const [morningCounters, setMorningCounters] = useState<Record<string, number>>({})
  const [eveningCounters, setEveningCounters] = useState<Record<string, number>>({})
  const [clickAnimations, setClickAnimations] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Initialize with static fallback data
    setMorningAzkar(getFallbackMorningAzkar())
    setEveningAzkar(getFallbackEveningAzkar())
  }, [])


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

  // Counter functions with animations
  const incrementMorningCounter = (azkarId: string) => {
    const currentCount = morningCounters[azkarId] || 0
    const azkar = morningAzkar.find(a => a.id === azkarId)
    if (azkar && currentCount < azkar.counter) {
      setMorningCounters(prev => ({
        ...prev,
        [azkarId]: currentCount + 1
      }))
      triggerClickAnimation(azkarId)
    }
  }

  const incrementEveningCounter = (azkarId: string) => {
    const currentCount = eveningCounters[azkarId] || 0
    const azkar = eveningAzkar.find(a => a.id === azkarId)
    if (azkar && currentCount < azkar.counter) {
      setEveningCounters(prev => ({
        ...prev,
        [azkarId]: currentCount + 1
      }))
      triggerClickAnimation(azkarId)
    }
  }

  const resetMorningCounter = (azkarId: string) => {
    setMorningCounters(prev => ({
      ...prev,
      [azkarId]: 0
    }))
  }

  const resetEveningCounter = (azkarId: string) => {
    setEveningCounters(prev => ({
      ...prev,
      [azkarId]: 0
    }))
  }

  // Fallback data functions
  const getFallbackMorningAzkar = (): AzkarItem[] => [
    {
      id: "morning-1",
      text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      counter: 1
    },
    {
      id: "morning-2", 
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      counter: 1
    },
    {
      id: "morning-3",
      text: "اللَّهُمَّ أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      counter: 1
    },
    {
      id: "morning-4",
      text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      counter: 100
    },
    {
      id: "morning-5",
      text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      counter: 10
    },
    {
      id: "morning-6",
      text: "اللَّهُمَّ أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      counter: 1
    },
    {
      id: "morning-7",
      text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      counter: 33
    },
    {
      id: "morning-8",
      text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      counter: 10
    },
    {
      id: "morning-9",
      text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ",
      counter: 3
    },
    {
      id: "morning-10",
      text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
      counter: 1
    }
  ]

  const getFallbackEveningAzkar = (): AzkarItem[] => [
    {
      id: "evening-1",
      text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      counter: 1
    },
    {
      id: "evening-2",
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", 
      counter: 1
    },
    {
      id: "evening-3",
      text: "اللَّهُمَّ أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      counter: 1
    },
    {
      id: "evening-4",
      text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      counter: 100
    },
    {
      id: "evening-5",
      text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      counter: 10
    },
    {
      id: "evening-6",
      text: "اللَّهُمَّ أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      counter: 1
    },
    {
      id: "evening-7",
      text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      counter: 33
    },
    {
      id: "evening-8",
      text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ",
      counter: 3
    },
    {
      id: "evening-9",
      text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
      counter: 1
    },
    {
      id: "evening-10",
      text: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      counter: 1
    }
  ]

  const features = [
    {
      icon: BookOpen,
      title: "مجموعة الأذكار",
      description: "مجموعة شاملة من أذكار الصباح والمساء والصلاة مع النص العربي والترجمة والمراجع.",
      href: "/azkar"
    },
    {
      icon: Calculator,
      title: "السبحة الرقمية",
      description: "عداد سبحة رقمي حديث مع رسوم متحركة سلسة وحفظ تلقائي لتتبع تقدمك في الذكر.",
      href: "/tasbih"
    },
    {
      icon: BarChart3,
      title: "تتبع التقدم",
      description: "راقب تقدمك اليومي والأسبوعي والشهري مع إحصائيات مفصلة ونسب الإنجاز.",
      href: "/dashboard"
    }
  ]

  const benefits = [
    "تتبع تقدمك اليومي في الذكر",
    "الوصول إلى أذكار موثوقة مع المراجع",
    "واجهة حديثة متوافقة مع الهواتف المحمولة",
    "دعم الوضع المظلم والفاتح",
    "مصادقة آمنة للمستخدمين",
    "احفظ أذكارك المفضلة"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/mousq.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-background/60" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Arabic Calligraphy - Bismillah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 text-center ph-5"
          >
            <div className="text-2xl md:text-3xl text-foreground font-arabic leading-relaxed text-center">
             <h1 >بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1> 
             <h1 className="p-3">قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.</h1>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-2 font-light text-center">
           
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 text-center"
          >
            <div className="text-2xl md:text-3xl text-foreground font-arabic leading-relaxed text-center">
             <h1 >بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1> 
             <h1 className="p-3">
             قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.
             </h1>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-2 font-light text-center">
           
            </div>
          </motion.div>

          {/* Subtitle */}
     
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 text-center"
          >
            <div className="text-2xl md:text-3xl text-foreground font-arabic leading-relaxed text-center">
             <h1 >بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1> 
             <h1 className="p-3">
             قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.             </h1>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-2 font-light text-center">
           
            </div>
          </motion.div>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {session ? (
              <Link
                href="/dashboard"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                تتبع تقدمك اليومي
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  القرآن الكريم
                </Link>
                <Link
                  href="/auth/signin"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105"
                >
                  تسجيل الدخول
                </Link>
              </>
            )}
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-32 border-2 border-primary/30 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.4 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-20 border border-primary/50 rounded-full"
          />
        </div>
      </section>

      {/* Azkar Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              الأذكار اليومية
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              أذكار الصباح والمساء من المصادر الموثوقة
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
              {/* Morning Azkar */}
              <div className="bg-card rounded-xl p-8 shadow-lg min-h-[600px]">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Sun className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">أذكار الصباح</h3>
                </div>
                <div className="space-y-6">
                  {morningAzkar.slice(0, 5).map((azkar, index) => {
                    const currentCount = morningCounters[azkar.id] || 0
                    const isComplete = currentCount >= azkar.counter
                    const isAnimating = clickAnimations[azkar.id] || false
                    return (
                      <motion.div
                        key={azkar.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`border-l-4 border-primary pl-4 py-3 bg-card rounded-r-lg cursor-pointer select-none transition-all duration-200 ${
                          isComplete 
                            ? 'ring-2 ring-success ring-opacity-50' 
                            : 'hover:bg-primary/5 hover:shadow-md'
                        } ${
                          isAnimating ? 'scale-105 bg-primary/10' : ''
                        }`}
                        onClick={() => !isComplete && incrementMorningCounter(azkar.id)}
                      >
                        <p className="text-lg text-foreground font-arabic leading-relaxed mb-3 break-words overflow-wrap-anywhere whitespace-normal">
                          {azkar.text}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mb-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-muted-foreground">
                              التقدم: {currentCount} / {azkar.counter}
                            </span>
                            <span className="text-sm font-medium text-primary">
                              {Math.round((currentCount / azkar.counter) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                isComplete ? 'bg-success' : 'bg-primary'
                              }`}
                              style={{ width: `${Math.min((currentCount / azkar.counter) * 100, 100)}%` }}
                              animate={isAnimating ? { scaleX: [1, 1.05, 1] } : {}}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </div>

                        {/* Counter Buttons */}
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => incrementMorningCounter(azkar.id)}
                            disabled={isComplete}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                              isComplete
                                ? 'bg-success text-white cursor-not-allowed'
                                : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 active:scale-95'
                            }`}
                          >
                            {isComplete ? '✓ مكتمل' : 'عد +1'}
                          </button>
                          <button
                            onClick={() => resetMorningCounter(azkar.id)}
                            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors"
                          >
                            إعادة تعيين
                          </button>
                        </div>

                        {/* Tap to count hint */}
                        {!isComplete && (
                          <div className="mt-2 text-center">
                            <p className="text-xs text-muted-foreground">
                              اضغط في أي مكان على هذه البطاقة للعد
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/azkar/morning"
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    عرض جميع أذكار الصباح ←
                  </Link>
                </div>
              </div>

              {/* Evening Azkar */}
              <div className="bg-card rounded-xl p-8 shadow-lg min-h-[600px]">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Moon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">أذكار المساء</h3>
                </div>
                <div className="space-y-6">
                  {eveningAzkar.slice(0, 5).map((azkar, index) => {
                    const currentCount = eveningCounters[azkar.id] || 0
                    const isComplete = currentCount >= azkar.counter
                    const isAnimating = clickAnimations[azkar.id] || false
                    return (
                      <motion.div
                        key={azkar.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`border-l-4 border-primary pl-4 py-3 bg-card rounded-r-lg cursor-pointer select-none transition-all duration-200 ${
                          isComplete 
                            ? 'ring-2 ring-success ring-opacity-50' 
                            : 'hover:bg-primary/5 hover:shadow-md'
                        } ${
                          isAnimating ? 'scale-105 bg-primary/10' : ''
                        }`}
                        onClick={() => !isComplete && incrementEveningCounter(azkar.id)}
                      >
                        <p className="text-lg text-foreground font-arabic leading-relaxed mb-3 break-words overflow-wrap-anywhere whitespace-normal">
                          {azkar.text}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mb-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Progress: {currentCount} / {azkar.counter}
                            </span>
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                              {Math.round((currentCount / azkar.counter) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                isComplete ? 'bg-green-500' : 'bg-indigo-500'
                              }`}
                              style={{ width: `${Math.min((currentCount / azkar.counter) * 100, 100)}%` }}
                              animate={isAnimating ? { scaleX: [1, 1.05, 1] } : {}}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </div>

                        {/* Counter Buttons */}
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => incrementEveningCounter(azkar.id)}
                            disabled={isComplete}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                              isComplete
                                ? 'bg-green-500 text-white cursor-not-allowed'
                                : 'bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-105 active:scale-95'
                            }`}
                          >
                            {isComplete ? '✓ مكتمل' : 'عد +1'}
                          </button>
                          <button
                            onClick={() => resetEveningCounter(azkar.id)}
                            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors"
                          >
                            إعادة تعيين
                          </button>
                        </div>

                        {/* Tap to count hint */}
                        {!isComplete && (
                          <div className="mt-2 text-center">
                            <p className="text-xs text-muted-foreground">
                              اضغط في أي مكان على هذه البطاقة للعد
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/azkar/evening"
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    عرض جميع أذكار المساء ←
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كل ما تحتاجه لرحلتك الروحية
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة شاملة مصممة لمساعدتك في الحفاظ على الذكر المستمر وتتبع تقدمك الروحي.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-card p-8 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground ml-4">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    استكشف ←
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                لماذا تختار أذكار؟
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                مبني بأحدث التقنيات والمبادئ الإسلامية في الاعتبار، 
                يوفر أذكار تجربة سلسة لممارستك الروحية.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="bg-success/10 p-2 rounded-full mr-4">
                      <Heart className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-card p-8 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    ابدأ رحلتك اليوم
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    انضم إلى آلاف المسلمين الذين يستخدمون أذكار بالفعل لتعزيز ممارستهم الروحية.
                  </p>
                  {!session && (
                    <Link
                      href="/auth/signup"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                    >
                      إنشاء حساب مجاني
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Azkar</h3>
            <p className="text-muted-foreground mb-6">
              رفيقك الرقمي للذكر الإسلامي والنمو الروحي.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center text-muted-foreground">
                <Moon className="w-4 h-4 mr-2" />
                <span>الوضع المظلم</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Sun className="w-4 h-4 mr-2" />
                <span>الوضع الفاتح</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}