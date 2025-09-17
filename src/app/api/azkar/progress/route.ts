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

    const { azkarId, completed } = await request.json()

    if (!azkarId || completed === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Upsert progress record
    const progress = await prisma.azkarProgress.upsert({
      where: {
        userId_azkarId_date: {
          userId: session.user.id,
          azkarId,
          date: today
        }
      },
      update: {
        completed
      },
      create: {
        userId: session.user.id,
        azkarId,
        completed,
        date: today
      }
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
