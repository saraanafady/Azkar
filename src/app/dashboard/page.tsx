"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Calculator, 
  Target, 
  TrendingUp, 
  Calendar,
  Star,
  CheckCircle,
  Clock
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
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboardStats()
    }
  }, [status])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Azkar Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You're viewing the demo version. Sign in to access your personal data.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Sign Up
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error loading dashboard
          </h1>
          <button
            onClick={fetchDashboardStats}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Welcome back, {session?.user?.name}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Here's your spiritual progress overview
          </motion.p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Azkar Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalAzkarCompleted}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Tasbih
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalTasbihCount}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Streak Days
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.streakDays}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  This Week
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Today's Progress
            </h3>
            
            {stats.todayAzkarProgress.length > 0 ? (
              <div className="space-y-4">
                {stats.todayAzkarProgress.map((progress, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {progress.categoryName}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {Math.round(progress.percentage)}% complete
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No progress today. Start your dhikr journey!
                </p>
                <Link
                  href="/azkar"
                  className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Start Azkar
                </Link>
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
              Recent Activity
            </h3>
            
            {stats.recentTasbihCounts.length > 0 ? (
              <div className="space-y-3">
                {stats.recentTasbihCounts.slice(0, 5).map((count) => (
                  <div key={count.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {count.count} dhikr
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(count.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-bold">
                      ✓
                    </div>
                  </div>
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
            className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
              Bookmarked Azkar
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.bookmarkedAzkar.map((azkar) => (
                <Link
                  key={azkar.id}
                  href="/azkar"
                  className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {azkar.title}
                  </h4>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-2" dir="rtl">
                    {azkar.titleAr}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Browse Azkar</h3>
            <p className="text-sm opacity-90">Explore our collection of authentic azkar</p>
          </Link>

          <Link
            href="/tasbih"
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <Calculator className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Digital Tasbih</h3>
            <p className="text-sm opacity-90">Use our modern tasbih counter</p>
          </Link>

          <Link
            href="/azkar"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
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
