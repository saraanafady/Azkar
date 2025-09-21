import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock data for demo mode
const mockDashboardStats = {
  totalAzkarCompleted: 15,
  totalTasbihCount: 250,
  streakDays: 7,
  todayAzkarProgress: [
    {
      categoryName: "Morning",
      completed: 2,
      total: 3,
      percentage: 66.67
    },
    {
      categoryName: "Evening", 
      completed: 1,
      total: 2,
      percentage: 50
    }
  ],
  recentTasbihCounts: [
    {
      id: "1",
      count: 33,
      date: new Date().toISOString()
    },
    {
      id: "2", 
      count: 100,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  bookmarkedAzkar: [
    {
      id: "1",
      title: "Morning Tasbih",
      titleAr: "تسبيح الصباح",
      categoryName: "Morning"
    }
  ]
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      // Return mock data for demo mode
      return NextResponse.json(mockDashboardStats)
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 400 }
      )
    }

    const userId = session.user.id

    try {
      // Get today's date range
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      // Get total azkar completed (count of completed azkar items)
      const totalAzkarCompleted = await prisma.azkarProgress.count({
        where: {
          userId,
          completed: {
            gte: 1
          }
        }
      })

      // Get total tasbih count
      const totalTasbihCount = await prisma.tasbihCount.aggregate({
        where: {
          userId
        },
        _sum: {
          count: true
        }
      })

      // Get streak days (simplified - count days with any activity)
      const activityDays = await prisma.azkarProgress.groupBy({
        by: ['date'],
        where: {
          userId
        },
        _count: {
          id: true
        }
      })

      const streakDays = activityDays.length

      // Get today's azkar progress by category
      const todayAzkarProgress = await prisma.azkarProgress.findMany({
        where: {
          userId,
          date: {
            gte: today,
            lt: tomorrow
          }
        },
        include: {
          azkar: {
            include: {
              category: true
            }
          }
        }
      })

      // Group by category and calculate progress
      const categoryProgress = todayAzkarProgress.reduce((acc: any, progress: any) => {
        const categoryName = progress.azkar.category.name
        if (!acc[categoryName]) {
          acc[categoryName] = {
            completed: 0,
            total: 0,
            categoryName
          }
        }
        acc[categoryName].completed += progress.completed
        acc[categoryName].total += progress.azkar.times
        return acc
      }, {} as Record<string, { completed: number; total: number; categoryName: string }>)

      // Calculate percentages
      const todayAzkarProgressArray = Object.values(categoryProgress).map((category: any) => ({
        ...category,
        percentage: category.total > 0 ? (category.completed / category.total) * 100 : 0
      }))

      // Get today's tasbih progress
      const todayTasbihCounts = await prisma.tasbihCount.findMany({
        where: {
          userId,
          date: {
            gte: today,
            lt: tomorrow
          }
        }
      })

      // Add tasbih progress to today's progress
      if (todayTasbihCounts.length > 0) {
        const totalTasbihToday = todayTasbihCounts.reduce((sum, count) => sum + count.count, 0)
        todayAzkarProgressArray.push({
          categoryName: "Tasbih",
          completed: totalTasbihToday,
          total: 100, // Default target
          percentage: Math.min((totalTasbihToday / 100) * 100, 100)
        })
      }

      // Get recent tasbih counts
      const recentTasbihCounts = await prisma.tasbihCount.findMany({
        where: {
          userId
        },
        orderBy: {
          date: 'desc'
        },
        take: 7
      })

      // Get bookmarked azkar
      const bookmarkedAzkar = await prisma.bookmark.findMany({
        where: {
          userId
        },
        include: {
          azkar: {
            include: {
              category: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 6
      })

      const bookmarkedAzkarArray = bookmarkedAzkar.map((bookmark: any) => ({
        id: bookmark.azkar.id,
        title: bookmark.azkar.title,
        titleAr: bookmark.azkar.titleAr,
        categoryName: bookmark.azkar.category.name
      }))

      return NextResponse.json({
        totalAzkarCompleted: totalAzkarCompleted,
        totalTasbihCount: totalTasbihCount._sum.count || 0,
        streakDays,
        todayAzkarProgress: todayAzkarProgressArray,
        recentTasbihCounts: recentTasbihCounts.map((count: any) => ({
          id: count.id,
          count: count.count,
          date: count.date.toISOString()
        })),
        bookmarkedAzkar: bookmarkedAzkarArray
      })
    } catch (dbError) {
      console.error('Database error, returning mock data:', dbError)
      return NextResponse.json(mockDashboardStats)
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
