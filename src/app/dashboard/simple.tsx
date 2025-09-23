"use client"

import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { BookOpen, Calculator, Target, TrendingUp } from "lucide-react"

export default function SimpleDashboard() {
  const { user, isLoading } = useAuth()

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            مرحباً بعودتك، {user?.name}!
          </h1>
          <p className="text-xl text-muted-foreground">
            إليك نظرة عامة على تقدمك الروحي
          </p>
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
                <p className="text-2xl font-bold text-foreground">0</p>
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
                <p className="text-2xl font-bold text-foreground">0</p>
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
                <p className="text-2xl font-bold text-foreground">0</p>
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
                <p className="text-2xl font-bold text-foreground">0</p>
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
