import { NextResponse } from "next/server"
import { LocalStorageData } from "@/lib/localStorage-data"

export async function GET() {
  try {
    // Initialize default data if needed
    LocalStorageData.initializeDefaultData()
    
    const categories = LocalStorageData.getCategories()
    const azkar = LocalStorageData.getAzkar()

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
