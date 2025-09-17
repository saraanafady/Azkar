import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 400 }
      )
    }

    const counts = await prisma.tasbihCount.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        date: 'desc'
      },
      take: 30 // Last 30 days
    })

    return NextResponse.json(counts)
  } catch (error) {
    console.error('Error fetching tasbih counts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch counts' },
      { status: 500 }
    )
  }
}
