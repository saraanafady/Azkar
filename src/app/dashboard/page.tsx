"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { BookOpen, Calculator, Target, TrendingUp, Clock, CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { ProgressTracker, UserProgress } from "@/lib/progress-tracker"

export default function SimpleDashboard() {
  const { user, isLoading } = useAuth()
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const loadProgress = () => {
    if (user) {
      const userProgress = ProgressTracker.getProgress(user.id)
      setProgress(userProgress)
      ProgressTracker.updateStreak(user.id)
    }
  }

  useEffect(() => {
    loadProgress()
  }, [user])

  const handleRefresh = () => {
    setRefreshing(true)
    loadProgress()
    setTimeout(() => setRefreshing(false), 500)
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
            أنت تشاهد النسخة التجريبية. سجل الدخول للوصول إلى بياناتك الشخصية.
          </p>
          <div className="space-x-4 p-5">
          <span className="w-full p-5">
            <Link
              href="/auth/signin"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors p-5 w-full"
            >
              تسجيل الدخول
            </Link>
            </span>
            <span>
            <Link
              href="/auth/signup"
              className="bg-success hover:bg-success/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors p-5"
            >
              إنشاء حساب
            </Link>
            </span>
          </div>
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                مرحباً بعودتك، {user?.name}!
              </h1>
              <p className="text-xl text-muted-foreground">
                إليك نظرة عامة على تقدمك الروحي
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
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
                  {progress?.totalAzkarCompleted || 0}
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
                  {progress?.totalTasbihCount || 0}
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
                  {progress?.streakDays || 0}
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
                  {progress?.recentTasbihCounts.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        {progress && (progress.recentTasbihCounts.length > 0 || progress.todayAzkarProgress.length > 0) && (
          <div className="mb-8 bg-card rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              النشاط الأخير
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Tasbih */}
              {progress.recentTasbihCounts.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Calculator className="w-4 h-4 mr-2 text-success" />
                    آخر استخدام للسبحة
                  </h4>
                  <div className="space-y-2">
                    {progress.recentTasbihCounts.slice(0, 3).map((tasbih) => (
                      <div key={tasbih.id} className="flex items-center justify-between bg-muted rounded-lg p-3">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-success mr-2" />
                          <div>
                            <p className="font-medium text-foreground" dir="rtl">
                              {tasbih.textAr || tasbih.category || 'ذكر عام'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(tasbih.date).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                        </div>
                        <span className="text-success font-bold">
                          {tasbih.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Today's Azkar Progress */}
              {progress.todayAzkarProgress.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-primary" />
                    تقدم اليوم في الأذكار
                  </h4>
                  <div className="space-y-2">
                    {progress.todayAzkarProgress.slice(0, 3).map((azkar, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-3">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-primary mr-2" />
                          <div>
                            <p className="font-medium text-foreground">
                              {azkar.categoryName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {azkar.completed}/{azkar.total} مكتمل
                            </p>
                          </div>
                        </div>
                        <span className="text-primary font-bold">
                          {Math.round(azkar.percentage)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  )
}
