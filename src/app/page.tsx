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
            {user ? (
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
                  إنشاء حساب
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