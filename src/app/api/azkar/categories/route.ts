import { NextResponse } from "next/server"
import { ServerDataStorage } from "@/lib/server-data"

export async function GET() {
  try {
    const categories = ServerDataStorage.getCategories()
    const azkar = ServerDataStorage.getAzkar()

    // Add count of azkar for each category
    const categoriesWithCount = categories.map(category => ({
      ...category,
      _count: {
        azkar: azkar.filter(azkar => azkar.categoryId === category.id).length
      }
    }))

    return NextResponse.json(categoriesWithCount)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
