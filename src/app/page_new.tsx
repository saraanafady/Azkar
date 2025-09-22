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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Islamic Geometric Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-slate-900 dark:via-slate-800 dark:to-amber-900">
          {/* Animated Light Rays */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-10 w-16 h-16 border border-amber-300/30 rounded-full animate-bounce" style={{ animationDuration: '6s' }}></div>
          <div className="absolute top-40 right-20 w-12 h-12 border border-amber-400/40 rounded-full animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 border border-amber-300/20 rounded-full animate-bounce" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-10 w-14 h-14 border border-amber-400/30 rounded-full animate-bounce" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-800 dark:text-amber-200 mb-4" 
                style={{ fontFamily: 'Amiri, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
              أسماء الله الحسنى
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Names Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent"
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + (index * 0.05),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)"
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/50 dark:border-amber-700/50 hover:border-amber-400 dark:hover:border-amber-500">
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-amber-800 dark:text-amber-200 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors"
                         style={{ fontFamily: 'Amiri, serif' }}>
                      {name}
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            {user ? (
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25"
              >
                تتبع تقدمك اليومي
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25"
                >
                  إنشاء حساب
                </Link>
                <Link
                  href="/auth/signin"
                  className="border-2 border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105"
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
            transition={{ duration: 2, delay: 2.5 }}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-32 border-2 border-amber-300/30 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.7 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-20 border border-amber-400/50 rounded-full"
          />
        </div>
      </section>

      {/* Azkar Section */}
      <section className="py-20 bg-card">
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
                className="block bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-border hover:border-primary/50"
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
                className="block bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-border hover:border-primary/50"
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
