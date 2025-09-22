"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Calculator, 
  Target, 
  TrendingUp, 
  Calendar,
  Star,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalAzkarCompleted: number
  totalTasbihCount: number
  streakDays: number
  todayAzkarProgress: Array<{
    categoryName: string
    completed: number
    total: number
    percentage: number
  }>
  recentTasbihCounts: Array<{
    id: string
    count: number
    date: string
  }>
  bookmarkedAzkar: Array<{
    id: string
    title: string
    titleAr: string
    categoryName: string
  }>
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (user) {
      fetchDashboardStats()
    }
  }, [user])

  const fetchDashboardStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      }
      
      // For localStorage-based auth, create mock stats
      const mockStats: DashboardStats = {
        totalAzkarCompleted: 0,
        totalTasbihCount: 0,
        streakDays: 0,
        todayAzkarProgress: [],
        recentTasbihCounts: [],
        bookmarkedAzkar: []
      }
      
      setStats(mockStats)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
      if (isRefresh) {
        setRefreshing(false)
      }
    }
  }

  const handleRefresh = () => {
    fetchDashboardStats(true)
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            مرحباً بك في لوحة تحكم الأذكار
          </h1>
          <p className="text-muted-foreground mb-6">
            أنت تشاهد النسخة التجريبية. سجل الدخول للوصول إلى بياناتك الشخصية.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/auth/signup"
              className="bg-success hover:bg-success/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            خطأ في تحميل لوحة التحكم
          </h1>
          <button
            onClick={() => fetchDashboardStats()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-2"
              >
                مرحباً بعودتك، {user?.name}!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                إليك نظرة عامة على تقدمك الروحي
              </motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => handleRefresh()}
              disabled={refreshing}
              className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  الأذكار المكتملة
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalAzkarCompleted}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-success/10 p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  إجمالي السبحة
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalTasbihCount}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  أيام متتالية
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.streakDays}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-info/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-info" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  هذا الأسبوع
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.recentTasbihCounts.length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              تقدم اليوم
            </h3>
            
            {stats.todayAzkarProgress.length > 0 ? (
              <div className="space-y-4">
                {stats.todayAzkarProgress.map((progress, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">
                        {progress.categoryName}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <motion.div
                        className="bg-primary h-3 rounded-full transition-all duration-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress.percentage, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      ></motion.div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-muted-foreground">
                        {Math.round(progress.percentage)}% مكتمل
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="text-primary font-semibold">
                          {progress.completed}
                        </span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="text-muted-foreground">
                          {progress.total}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  لا تقدم اليوم. ابدأ رحلة الذكر!
                </p>
                <Link
                  href="/azkar"
                  className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  ابدأ الأذكار
                </Link>
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
              Recent Activity
            </h3>
            
            {stats.recentTasbihCounts.length > 0 ? (
              <div className="space-y-3">
                {stats.recentTasbihCounts.slice(0, 5).map((count) => (
                  <motion.div
                    key={count.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between bg-card border border-border rounded-lg p-3 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <div>
                        <p className="font-semibold text-foreground">
                          {count.count} dhikr
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(count.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-success font-bold">
                      ✓
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No recent activity. Start using the tasbih counter!
                </p>
                <Link
                  href="/tasbih"
                  className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Use Tasbih
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bookmarked Azkar */}
        {stats.bookmarkedAzkar.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 bg-card rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-primary" />
              Bookmarked Azkar
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.bookmarkedAzkar.map((azkar) => (
                <Link
                  key={azkar.id}
                  href="/azkar"
                  className="block bg-muted rounded-lg p-4 hover:bg-accent transition-colors border border-border"
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {azkar.title}
                  </h4>
                  <p className="text-primary text-sm mb-2" dir="rtl">
                    {azkar.titleAr}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {azkar.categoryName}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <Link
            href="/azkar"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Browse Azkar</h3>
            <p className="text-sm opacity-90">Explore our collection of authentic azkar</p>
          </Link>

          <Link
            href="/tasbih"
            className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <Calculator className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Digital Tasbih</h3>
            <p className="text-sm opacity-90">Use our modern tasbih counter</p>
          </Link>

          <Link
            href="/azkar"
            className="bg-gradient-to-r from-info to-info/80 hover:from-info/90 hover:to-info/70 text-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <Target className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Set Goals</h3>
            <p className="text-sm opacity-90">Track your daily dhikr goals</p>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
