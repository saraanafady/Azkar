"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useNotification } from "@/hooks/use-notification"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Calculator, BarChart3, Heart, Star, Moon, Sun, ArrowRight } from "lucide-react"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function WelcomeMessages() {
  const { user } = useAuth()
  const { success } = useNotification()
  const searchParams = useSearchParams()

  // Show welcome messages for users
  useEffect(() => {
    const isNewUser = searchParams.get('welcome')
    const isLogin = searchParams.get('login')
    
    if (isNewUser === 'true' && user) {
      success(`مرحباً ${user.name}! تم إنشاء حسابك بنجاح. ابدأ رحلتك الروحية الآن.`)
    } else if (isLogin === 'true' && user) {
      success(`مرحباً بعودتك ${user.name}! استمر في رحلتك الروحية.`)
    }
  }, [searchParams, user, success])

  return null
}

export default function Home() {
  const { user } = useAuth()

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
      <Suspense fallback={null}>
        <WelcomeMessages />
      </Suspense>
      
      {/* Hero Section - 99 Beautiful Names of Allah */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-5">
        {/* Premium Islamic Background */}
        <div className="absolute inset-0 bg-gradient-radial from-amber-50/80 via-white to-blue-50/60 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/40">
          {/* Animated Glowing Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => {
              // Use deterministic positioning based on index to avoid hydration mismatch
              const positions = [
                { left: 18.2, top: 36.2 },
                { left: 42.7, top: 37.7 },
                { left: 65.1, top: 27.3 },
                { left: 19.6, top: 51.3 },
                { left: 88.5, top: 42.7 },
                { left: 66.6, top: 87.1 },
                { left: 55.4, top: 26.0 },
                { left: 57.3, top: 5.6 },
                { left: 44.9, top: 69.3 },
                { left: 55.5, top: 29.6 },
                { left: 42.2, top: 39.2 },
                { left: 23.2, top: 60.8 },
                { left: 2.1, top: 61.1 },
                { left: 33.2, top: 26.4 },
                { left: 10.5, top: 31.3 },
                { left: 98.5, top: 29.5 },
                { left: 34.2, top: 29.0 },
                { left: 87.7, top: 35.2 },
                { left: 66.3, top: 90.9 },
                { left: 59.8, top: 59.9 }
              ]
              const pos = positions[i] || { left: 50, top: 50 }
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400/30 dark:bg-amber-400/40 rounded-full"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + (i % 3) * 0.5,
                    repeat: Infinity,
                    delay: (i % 5) * 0.4,
                  }}
                />
              )
            })}
          </div>
          
          {/* Soft Light Rays */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-px h-2/3 bg-gradient-to-b from-transparent via-amber-300/40 dark:via-amber-400/50 to-transparent animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-amber-400/30 dark:via-amber-500/40 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-amber-300/50 dark:via-amber-400/60 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
          
          {/* Islamic Geometric Patterns */}
          <div className="absolute top-20 left-10 w-20 h-20 border border-amber-300/20 dark:border-amber-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-amber-400/25 dark:border-amber-500/35 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 border border-amber-300/15 dark:border-amber-400/25 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 border border-amber-400/30 dark:border-amber-500/40 rounded-full animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title with Gradient Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500 bg-clip-text text-transparent"
                style={{ 
                  fontFamily: 'Amiri, serif', 
                  textShadow: '0 4px 8px rgba(245, 158, 11, 0.3)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}>
              أسماء الله الحسنى
            </h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              من أحصاها دخل الجنة
            </motion.p>
            
            {/* Decorative Islamic Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="flex justify-center items-center mb-12"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400 dark:to-amber-500"></div>
                <div className="w-3 h-3 bg-amber-500 dark:bg-amber-400 rounded-full"></div>
                <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 dark:from-amber-500 dark:via-amber-400 dark:to-amber-500"></div>
                <div className="w-3 h-3 bg-amber-500 dark:bg-amber-400 rounded-full"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent dark:from-amber-500"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Flowing Animated Names Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 md:gap-6 lg:gap-8 w-full"
          >
            {[
              "الرَّحْمَنُ", "الرَّحِيمُ", "الْمَلِكُ", "الْقُدُّوسُ", "السَّلَامُ", "الْمُؤْمِنُ",
              "الْمُهَيْمِنُ", "الْعَزِيزُ", "الْجَبَّارُ", "الْمُتَكَبِّرُ", "الْخَالِقُ", "الْبَارِئُ",
              "الْمُصَوِّرُ", "الْغَفَّارُ", "الْقَهَّارُ", "الْوَهَّابُ", "الرَّزَّاقُ", "الْفَتَّاحُ",
              "الْعَلِيمُ", "الْقَابِضُ", "الْبَاسِطُ", "الْخَافِضُ", "الرَّافِعُ", "الْمُعِزُّ",
              "الْمُذِلُّ", "السَّمِيعُ", "الْبَصِيرُ", "الْحَكَمُ", "الْعَدْلُ", "اللَّطِيفُ",
              "الْخَبِيرُ", "الْحَلِيمُ", "الْعَظِيمُ", "الْغَفُورُ", "الشَّكُورُ", "الْعَلِيُّ",
              "الْكَبِيرُ", "الْحَفِيظُ", "الْمُقِيتُ", "الْحَسِيبُ", "الْجَلِيلُ", "الْكَرِيمُ",
              "الرَّقِيبُ", "الْمُجِيبُ", "الْوَاسِعُ", "الْحَكِيمُ", "الْوَدُودُ", "الْمَجِيدُ",
              "الْبَاعِثُ", "الشَّهِيدُ", "الْحَقُّ", "الْوَكِيلُ", "الْقَوِيُّ", "الْمَتِينُ",
              "الْوَلِيُّ", "الْحَمِيدُ", "الْمُحْصِي", "الْمُبْدِئُ", "الْمُعِيدُ", "الْمُحْيِي",
              "الْمُمِيتُ", "الْحَيُّ", "الْقَيُّومُ", "الْوَاجِدُ", "الْمَاجِدُ", "الْوَاحِدُ",
              "الصَّمَدُ", "الْقَادِرُ", "الْمُقْتَدِرُ", "الْمُقَدِّمُ", "الْمُؤَخِّرُ", "الْأَوَّلُ",
              "الْآخِرُ", "الظَّاهِرُ", "الْبَاطِنُ", "الْوَالِي", "الْمُتَعَالِي", "الْبَرُّ",
              "التَّوَّابُ", "الْمُنْتَقِمُ", "الْعَفُوُّ", "الرَّءُوفُ", "مَالِكُ الْمُلْكِ", "ذُو الْجَلَالِ",
              "وَالْإِكْرَامِ", "الْمُقْسِطُ", "الْجَامِعُ", "الْغَنِيُّ", "الْمُغْنِي", "الْمَانِعُ",
              "الضَّارُّ", "النَّافِعُ", "النُّورُ", "الْهَادِي", "الْبَدِيعُ", "الْبَاقِي",
              "الْوَارِثُ", "الرَّشِيدُ", "الصَّبُورُ"
            ].map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 2 + (index * 0.05),
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <div className="relative">
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-amber-500/30 to-amber-400/20 dark:from-amber-400/30 dark:via-amber-500/40 dark:to-amber-400/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200/50 dark:border-amber-700/50 group-hover:border-amber-400/70 dark:group-hover:border-amber-500/70">
                    <div className="text-center">
                      {/* Name with Premium Typography */}
                      <div className="text-base md:text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300"
                           style={{ fontFamily: 'Amiri, serif' }}>
                        {name}
                      </div>
                      
                      {/* Islamic Decorative Pattern */}
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-1 h-1 bg-amber-400 dark:bg-amber-500 rounded-full group-hover:bg-amber-500 dark:group-hover:bg-amber-400 transition-colors"></div>
                        <div className="w-6 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-400 rounded-full group-hover:from-amber-500 group-hover:to-amber-600 dark:group-hover:from-amber-400 dark:group-hover:to-amber-300 transition-all"></div>
                        <div className="w-1 h-1 bg-amber-400 dark:bg-amber-500 rounded-full group-hover:bg-amber-500 dark:group-hover:bg-amber-400 transition-colors"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16"
          >
            {user ? (
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25 border border-amber-400/20"
              >
                تتبع تقدمك اليومي
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25 border border-amber-400/20"
                >
                  إنشاء حساب
                </Link>
                <Link
                  href="/auth/signin"
                  className="border-2 border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50"
                >
                  تسجيل الدخول
                </Link>
              </>
            )}
          </motion.div>

          {/* Decorative Bottom Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 8 }}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-40 h-40 border-2 border-amber-300/20 dark:border-amber-400/30 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 8.5 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-24 h-24 border border-amber-400/30 dark:border-amber-500/40 rounded-full"
          />
        </div>
      </section>

      {/* Azkar Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              الأذكار اليومية
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              أذكار الصباح والمساء من المصادر الموثوقة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Morning Azkar Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Link
                href="/azkar/morning"
                className="block bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-border hover:border-primary/50 group"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Sun className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground text-center mb-4">
                  أذكار الصباح
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  ابدأ يومك بالأذكار الصباحية المباركة
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center text-primary font-semibold group-hover:text-primary/80 transition-colors">
                    ابدأ الآن
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Evening Azkar Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <Link
                href="/azkar/evening"
                className="block bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-border hover:border-primary/50 group"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Moon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground text-center mb-4">
                  أذكار المساء
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  أنهِ يومك بالأذكار المسائية المباركة
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center text-primary font-semibold group-hover:text-primary/80 transition-colors">
                    ابدأ الآن
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
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
      <section className="py-20 bg-background">
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
                  {!user && (
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
      <footer className="bg-card py-12 border-t border-border">
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
