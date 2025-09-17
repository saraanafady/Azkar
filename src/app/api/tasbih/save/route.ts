import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { count } = await request.json()

    if (!count || count <= 0) {
      return NextResponse.json(
        { error: 'Invalid count' },
        { status: 400 }
      )
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 400 }
      )
    }

    // Get today's date (start of day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if there's already a count for today
    const existingCount = await prisma.tasbihCount.findFirst({
      where: {
        userId: session.user.id,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    })

    let tasbihCount
    if (existingCount) {
      // Update existing count
      tasbihCount = await prisma.tasbihCount.update({
        where: { id: existingCount.id },
        data: { count }
      })
    } else {
      // Create new count
      tasbihCount = await prisma.tasbihCount.create({
        data: {
          userId: session.user.id,
          count,
          date: today
        }
      })
    }

    return NextResponse.json(tasbihCount)
  } catch (error) {
    console.error('Error saving tasbih count:', error)
    return NextResponse.json(
      { error: 'Failed to save count' },
      { status: 500 }
    )
  }
}
