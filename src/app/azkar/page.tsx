"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Clock, Star } from "lucide-react"

interface AzkarCategory {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  _count: {
    azkar: number
  }
}

export default function AzkarPage() {
  const [categories, setCategories] = useState<AzkarCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...')
      const response = await fetch('/api/azkar/categories')
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Categories data:', data)
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError(`Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchCategories}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Azkar Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore our comprehensive collection of authentic Islamic remembrance and supplications
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/azkar/${category.name.toLowerCase()}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                        <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Star className="w-4 h-4 mr-1" />
                        {category._count.azkar}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-3" dir="rtl">
                      {category.nameAr}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {category._count.azkar} azkar
                      </span>
                      <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                        Explore
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Categories Available
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Categories will appear here once they are loaded.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto"
          >
            <Clock className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Daily Reminder
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Set up daily reminders for morning and evening azkar to maintain consistency in your spiritual practice.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Set Reminders
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
