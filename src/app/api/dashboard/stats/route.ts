import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ServerDataStorage } from '@/lib/server-data'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id || session.user.email || ''

    // Get real progress data from localStorage (client-side) or server-side storage
    // For now, we'll simulate some progress data based on user activity
    const today = new Date().toISOString().split('T')[0]
    
    // Simulate some realistic progress data
    const stats = {
      totalAzkarCompleted: Math.floor(Math.random() * 50) + 10, // 10-60 azkar completed
      totalTasbihCount: Math.floor(Math.random() * 1000) + 100, // 100-1100 tasbih counts
      streakDays: Math.floor(Math.random() * 30) + 1, // 1-30 day streak
      todayAzkarProgress: [
        {
          categoryName: "Morning",
          completed: Math.floor(Math.random() * 15) + 5,
          total: 31,
          percentage: Math.floor(Math.random() * 50) + 20
        },
        {
          categoryName: "Evening", 
          completed: Math.floor(Math.random() * 10) + 3,
          total: 25,
          percentage: Math.floor(Math.random() * 40) + 15
        }
      ],
      recentTasbihCounts: [
        {
          id: "1",
          count: Math.floor(Math.random() * 100) + 50,
          date: today
        },
        {
          id: "2", 
          count: Math.floor(Math.random() * 80) + 30,
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0] // yesterday
        }
      ],
      bookmarkedAzkar: [
        {
          id: "1",
          title: "Ayat al-Kursi",
          titleAr: "آية الكرسي",
          categoryName: "Morning"
        },
        {
          id: "2",
          title: "Surah Al-Ikhlas", 
          titleAr: "سورة الإخلاص",
          categoryName: "Morning"
        }
      ]
    }

    console.log(`📊 Dashboard stats for user ${userId}:`, {
      totalAzkar: stats.totalAzkarCompleted,
      totalTasbih: stats.totalTasbihCount,
      streak: stats.streakDays
    })

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
