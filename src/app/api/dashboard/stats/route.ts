import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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

    // Since ProgressTracker is client-side only, we'll return a default structure
    // The real progress will be fetched client-side in the dashboard component
    const today = new Date().toISOString().split('T')[0]
    
    const stats = {
      totalAzkarCompleted: 0,
      totalTasbihCount: 0,
      streakDays: 0,
      todayAzkarProgress: [],
      recentTasbihCounts: [],
      bookmarkedAzkar: []
    }

    console.log(`📊 Dashboard stats for user ${userId}:`, {
      totalAzkar: stats.totalAzkarCompleted,
      totalTasbih: stats.totalTasbihCount,
      streak: stats.streakDays,
      note: 'Progress data will be loaded client-side'
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
