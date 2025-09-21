import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { completeAzkarData } from "@/lib/azkar-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim()
    
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    const session = await getServerSession(authOptions)
    
    // Get all azkar from comprehensive project data
    const allAzkar = []
    const allPages = []
    const allFeatures = []
    const allTasbihOptions = []
    
    // Add pages and features for search
    allPages.push(
      {
        id: "home",
        title: "Home",
        titleAr: "الرئيسية",
        description: "Welcome to Azkar - Islamic Remembrance & Tasbih Counter",
        descriptionAr: "مرحباً بك في أذكار - منصة الذكر الإسلامي والسبحة الرقمية",
        href: "/",
        type: "page"
      },
      {
        id: "azkar",
        title: "Azkar Collection",
        titleAr: "مجموعة الأذكار",
        description: "Comprehensive collection of morning, evening, and prayer remembrance",
        descriptionAr: "مجموعة شاملة من أذكار الصباح والمساء والصلاة",
        href: "/azkar",
        type: "page"
      },
      {
        id: "tasbih",
        title: "Digital Tasbih",
        titleAr: "السبحة الرقمية",
        description: "Modern digital tasbih counter with smooth animations",
        descriptionAr: "عداد سبحة رقمي حديث مع رسوم متحركة سلسة",
        href: "/tasbih",
        type: "page"
      },
      {
        id: "dashboard",
        title: "Dashboard",
        titleAr: "لوحة التحكم",
        description: "Track your progress and view detailed statistics",
        descriptionAr: "تتبع تقدمك وعرض الإحصائيات المفصلة",
        href: "/dashboard",
        type: "page"
      },
      {
        id: "signin",
        title: "Sign In",
        titleAr: "تسجيل الدخول",
        description: "Sign in to your account to track progress",
        descriptionAr: "سجل دخولك لتتبع تقدمك",
        href: "/auth/signin",
        type: "page"
      },
      {
        id: "signup",
        title: "Sign Up",
        titleAr: "إنشاء حساب",
        description: "Create a new account to start your journey",
        descriptionAr: "أنشئ حساباً جديداً لتبدأ رحلتك",
        href: "/auth/signup",
        type: "page"
      }
    )
    
    // Add features for search
    allFeatures.push(
      {
        id: "bookmark",
        title: "Bookmark System",
        titleAr: "نظام الإشارات المرجعية",
        description: "Save your favorite azkar for quick access",
        descriptionAr: "احفظ أذكارك المفضلة للوصول السريع",
        type: "feature"
      },
      {
        id: "progress",
        title: "Progress Tracking",
        titleAr: "تتبع التقدم",
        description: "Monitor your daily, weekly, and monthly progress",
        descriptionAr: "راقب تقدمك اليومي والأسبوعي والشهري",
        type: "feature"
      },
      {
        id: "themes",
        title: "Dark/Light Theme",
        titleAr: "الوضع المظلم/الفاتح",
        description: "Switch between dark and light themes",
        descriptionAr: "التبديل بين الوضع المظلم والفاتح",
        type: "feature"
      },
      {
        id: "achievements",
        title: "Achievement System",
        titleAr: "نظام الإنجازات",
        description: "Unlock achievements as you complete your daily goals",
        descriptionAr: "افتح الإنجازات عند إكمال أهدافك اليومية",
        type: "feature"
      },
      {
        id: "statistics",
        title: "Statistics Dashboard",
        titleAr: "لوحة الإحصائيات",
        description: "View detailed statistics about your progress",
        descriptionAr: "عرض إحصائيات مفصلة عن تقدمك",
        type: "feature"
      }
    )
    
    // Add tasbih options for search
    allTasbihOptions.push(
      {
        id: "subhanallah",
        title: "Subhan Allah",
        titleAr: "سبحان الله",
        description: "Glory be to Allah",
        descriptionAr: "سبحان الله",
        times: 33,
        type: "tasbih"
      },
      {
        id: "alhamdulillah",
        title: "Alhamdulillah",
        titleAr: "الحمدلله",
        description: "Praise be to Allah",
        descriptionAr: "الحمد لله",
        times: 33,
        type: "tasbih"
      },
      {
        id: "la_ilaha_illallah",
        title: "La ilaha illa Allah",
        titleAr: "لا اله الا الله",
        description: "There is no god but Allah",
        descriptionAr: "لا إله إلا الله",
        times: 33,
        type: "tasbih"
      },
      {
        id: "allahu_akbar",
        title: "Allahu Akbar",
        titleAr: "الله أكبر",
        description: "Allah is the Greatest",
        descriptionAr: "الله أكبر",
        times: 34,
        type: "tasbih"
      },
      {
        id: "astaghfirullah",
        title: "Astaghfirullah",
        titleAr: "استغفر الله",
        description: "I seek forgiveness from Allah",
        descriptionAr: "أستغفر الله",
        times: 100,
        type: "tasbih"
      }
    )
    
    // Use comprehensive azkar data from the project
    const azkarData = completeAzkarData
    
    // Extract all azkar from the comprehensive data
    Object.values(azkarData).forEach(category => {
      if (category.azkar) {
        category.azkar.forEach(azkar => {
          allAzkar.push({
            ...azkar,
            category: {
              id: category.category.id,
              name: category.category.name,
              nameAr: category.category.nameAr
            }
          })
        })
      }
    })
    
    // Combine all content for comprehensive search
    const allSearchableContent = [
      ...allAzkar.map(item => ({ ...item, resultType: 'azkar' })),
      ...allPages.map(item => ({ ...item, resultType: 'page' })),
      ...allFeatures.map(item => ({ ...item, resultType: 'feature' })),
      ...allTasbihOptions.map(item => ({ ...item, resultType: 'tasbih' }))
    ]

    // Normalize Arabic text for better matching
    const normalizeArabic = (text: string): string => {
      if (!text) return ''
      return text
        .replace(/[آأإ]/g, 'ا') // Normalize alef variations
        .replace(/[ة]/g, 'ه') // Normalize ta marbuta
        .replace(/[ي]/g, 'ي') // Normalize ya
        .replace(/[ى]/g, 'ي') // Normalize alif maksura
        .replace(/[ؤ]/g, 'و') // Normalize waw with hamza
        .replace(/[ئ]/g, 'ي') // Normalize ya with hamza
        .replace(/[ء]/g, '') // Remove hamza
        .replace(/[ً-ٟ]/g, '') // Remove diacritics
        .toLowerCase()
        .trim()
    }

    // Search function with Arabic normalization
    const searchInText = (text: string, query: string): boolean => {
      if (!text) return false
      const normalizedText = normalizeArabic(text)
      const normalizedQuery = normalizeArabic(query)
      return normalizedText.includes(normalizedQuery)
    }

    // Filter all content based on query - more comprehensive search
    const searchResults = allSearchableContent.filter(item => {
      const searchableFields = [
        item.title,
        item.titleAr,
        item.arabicText,
        item.translation,
        item.description,
        item.descriptionAr,
        item.reference,
        item.text, // For tasbih options
        item.textAr, // For tasbih options
        item.category?.name,
        item.category?.nameAr,
        item.type
      ].filter(Boolean)
      
      return searchableFields.some(field => searchInText(field, query))
    })

    // Limit results to 20 for performance (increased to accommodate different types)
    const limitedResults = searchResults.slice(0, 20)

    // If user is logged in, try to fetch progress and bookmarks from database for azkar results
    if (session) {
      try {
        const azkar = await prisma.azkar.findMany({
          where: {
            OR: [
              { title: { contains: query } },
              { titleAr: { contains: query } },
              { arabicText: { contains: query } },
              { translation: { contains: query } },
              { reference: { contains: query } }
            ]
          },
          include: {
            category: true,
            progress: {
              where: {
                userId: session.user.id
              }
            },
            bookmarks: {
              where: {
                userId: session.user.id
              }
            }
          }
        })

        // Create a map of progress and bookmarks for quick lookup
        const progressMap: Record<string, number> = {}
        const bookmarkMap: Record<string, boolean> = {}

        azkar.forEach((item: any) => {
          if (item.progress?.[0]) {
            progressMap[item.title] = item.progress[0].completed
          }
          if (item.bookmarks?.[0]) {
            bookmarkMap[item.title] = true
          }
        })

        // Update azkar results with user's progress and bookmarks
        const updatedResults = limitedResults.map(item => {
          if (item.resultType === 'azkar') {
            return {
              ...item,
              progress: progressMap[item.title] ? { completed: progressMap[item.title] } : null,
              isBookmarked: bookmarkMap[item.title] || false
            }
          }
          return item
        })

        return NextResponse.json({ results: updatedResults })
      } catch (dbError) {
        console.error('Database error for search, using mock data:', dbError)
      }
    }

    return NextResponse.json({ results: limitedResults })
  } catch (error) {
    console.error('Error searching azkar:', error)
    return NextResponse.json(
      { error: 'Failed to search azkar' },
      { status: 500 }
    )
  }
}
