"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Bookmark, CheckCircle, Circle, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Azkar {
  id: string
  title: string
  titleAr: string
  arabicText: string
  translation: string
  reference: string | null
  times: number
  progress?: {
    completed: number
  }
  isBookmarked?: boolean
}

interface Category {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
}

export default function AzkarCategoryPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [azkar, setAzkar] = useState<Azkar[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    if (params.category) {
      fetchAzkar(params.category as string)
    }
  }, [params.category])

  const fetchAzkar = async (categoryName: string) => {
    try {
      const response = await fetch(`/api/azkar/category/${categoryName}`)
      const data = await response.json()
      setAzkar(data.azkar)
      setCategory(data.category)
      
      // Initialize progress state
      const progressState: Record<string, number> = {}
      data.azkar.forEach((item: Azkar) => {
        progressState[item.id] = item.progress?.completed || 0
      })
      setProgress(progressState)
    } catch (error) {
      console.error('Error fetching azkar:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (azkarId: string, completed: number) => {
    if (!session) return

    try {
      await fetch('/api/azkar/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          azkarId,
          completed,
        }),
      })

      setProgress(prev => ({
        ...prev,
        [azkarId]: completed
      }))
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const toggleBookmark = async (azkarId: string) => {
    if (!session) return

    try {
      const response = await fetch('/api/azkar/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ azkarId }),
      })

      if (response.ok) {
        setAzkar(prev => prev.map(item => 
          item.id === azkarId 
            ? { ...item, isBookmarked: !item.isBookmarked }
            : item
        ))
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  const incrementProgress = (azkarId: string) => {
    const current = progress[azkarId] || 0
    const azkarItem = azkar.find(item => item.id === azkarId)
    if (azkarItem && current < azkarItem.times) {
      updateProgress(azkarId, current + 1)
    }
  }

  const resetProgress = (azkarId: string) => {
    updateProgress(azkarId, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Category not found
          </h1>
          <Link href="/azkar" className="text-indigo-600 dark:text-indigo-400">
            Back to Azkar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/azkar" 
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Azkar
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {category.name}
            </h1>
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4" dir="rtl">
              {category.nameAr}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {category.description}
            </p>
          </motion.div>
        </div>

        {/* Azkar List */}
        <div className="space-y-6">
          {azkar.map((item, index) => {
            const completed = progress[item.id] || 0
            const percentage = (completed / item.times) * 100
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-3" dir="rtl">
                      {item.titleAr}
                    </h4>
                  </div>
                  
                  {session && (
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.isBookmarked
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${item.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Arabic Text */}
                <div className="mb-4">
                  <p className="text-2xl font-medium text-gray-900 dark:text-white text-center leading-relaxed" dir="rtl">
                    {item.arabicText}
                  </p>
                </div>

                {/* Translation */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-center italic">
                    {item.translation}
                  </p>
                </div>

                {/* Reference */}
                {item.reference && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Reference: {item.reference}
                    </p>
                  </div>
                )}

                {/* Progress Section */}
                {session && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progress: {completed} / {item.times}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => incrementProgress(item.id)}
                          disabled={completed >= item.times}
                          className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {completed >= item.times ? 'Completed' : 'Mark Complete'}
                        </button>
                        
                        <button
                          onClick={() => resetProgress(item.id)}
                          className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                        >
                          <Circle className="w-4 h-4 mr-2" />
                          Reset
                        </button>
                      </div>

                      {completed >= item.times && (
                        <div className="flex items-center text-green-600 dark:text-green-400">
                          <Star className="w-5 h-5 mr-1" />
                          <span className="text-sm font-medium">Completed!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!session && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Sign in to track your progress and bookmark azkar
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {azkar.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No azkar found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
