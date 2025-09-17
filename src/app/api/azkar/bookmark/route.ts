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

    const { azkarId } = await request.json()

    if (!azkarId) {
      return NextResponse.json(
        { error: 'Missing azkarId' },
        { status: 400 }
      )
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 400 }
      )
    }

    // Check if bookmark already exists
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_azkarId: {
          userId: session.user.id,
          azkarId
        }
      }
    })

    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: {
          userId_azkarId: {
            userId: session.user.id,
            azkarId
          }
        }
      })
      return NextResponse.json({ bookmarked: false })
    } else {
      // Add bookmark
      await prisma.bookmark.create({
        data: {
          userId: session.user.id,
          azkarId
        }
      })
      return NextResponse.json({ bookmarked: true })
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    return NextResponse.json(
      { error: 'Failed to toggle bookmark' },
      { status: 500 }
    )
  }
}
