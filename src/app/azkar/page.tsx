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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            خطأ في تحميل الفئات
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={fetchCategories}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            مجموعة الأذكار
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            استكشف مجموعتنا الشاملة من الأذكار والدعوات الإسلامية الموثوقة
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
                className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/azkar/${category.name.toLowerCase()}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-1" />
                        {category._count.azkar}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <h4 className="text-lg font-medium text-primary mb-3" dir="rtl">
                      {category.nameAr}
                    </h4>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      {/* <span className="text-sm text-muted-foreground">
                        {category._count.azkar} أذكار
                      </span> */}
                      <div className="flex items-center text-primary text-sm font-medium">
                        استكشف
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
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                لا توجد فئات متاحة
              </h3>
              <p className="text-muted-foreground">
                ستظهر الفئات هنا بمجرد تحميلها.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-border"
          >
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              تذكير يومي
            </h3>
            <p className="text-muted-foreground mb-6">
              قم بإعداد تذكيرات يومية لأذكار الصباح والمساء للحفاظ على الاستمرارية في ممارستك الروحية.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
              إعداد التذكيرات
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
