"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { BookOpen, Calculator, Target, TrendingUp, RefreshCw } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  email: string
  name: string
  image?: string
}

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

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
    } else if (status === 'authenticated' && session?.user) {
      setUser({
        id: session.user.id || session.user.email || '',
        email: session.user.email || '',
        name: session.user.name || '',
        image: session.user.image || undefined
      })
      fetchStats()
      setIsLoading(false)
    } else if (status === 'unauthenticated') {
      setUser(null)
      setIsLoading(false)
    }
  }, [session, status])

  const fetchStats = async () => {
    try {
      console.log('🔄 Fetching dashboard stats...')
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
        console.log('✅ Dashboard stats loaded:', data)
      } else {
        console.error('❌ Failed to fetch stats:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await fetchStats()
      console.log('✅ Dashboard stats refreshed successfully')
    } catch (error) {
      console.error('❌ Error refreshing dashboard stats:', error)
    } finally {
      setRefreshing(false)
    }
  }

  if (isLoading) {
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
            يرجى تسجيل الدخول للوصول إلى لوحة التحكم.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              مرحباً بعودتك، {user.name}!
            </h1>
            <p className="text-xl text-muted-foreground">
              إليك نظرة عامة على تقدمك الروحي
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">معلومات المستخدم</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">الاسم</p>
              <p className="text-lg text-foreground">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">البريد الإلكتروني</p>
              <p className="text-lg text-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  الأذكار المكتملة
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {refreshing ? (
                    <div className="animate-pulse bg-muted h-8 w-16 rounded"></div>
                  ) : (
                    stats?.totalAzkarCompleted || 0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-success/10 p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  إجمالي السبحة
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.totalTasbihCount || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  أيام متتالية
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.streakDays || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-info/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-info" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  هذا الأسبوع
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.recentTasbihCounts?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/azkar"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">تصفح الأذكار</h3>
            <p className="text-sm opacity-90">استكشف مجموعة الأذكار الأصيلة</p>
          </Link>

          <Link
            href="/tasbih"
            className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <Calculator className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">السبحة الرقمية</h3>
            <p className="text-sm opacity-90">استخدم عداد السبحة الحديث</p>
          </Link>

          <Link
            href="/azkar"
            className="bg-gradient-to-r from-info to-info/80 hover:from-info/90 hover:to-info/70 text-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <Target className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">تحديد الأهداف</h3>
            <p className="text-sm opacity-90">تتبع أهداف الذكر اليومية</p>
          </Link>
        </div>
      </div>
    </div>
  )
}