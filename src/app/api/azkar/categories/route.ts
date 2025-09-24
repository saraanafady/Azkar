import { NextResponse } from "next/server"
import { completeAzkarData } from "@/lib/azkar-data"

export async function GET() {
  try {
    // Extract categories from complete data
    const categories = Object.values(completeAzkarData).map(data => ({
      ...data.category,
      _count: {
        azkar: data.azkar.length
      }
    }))

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
