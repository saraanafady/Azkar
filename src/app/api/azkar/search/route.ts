import { NextRequest, NextResponse } from "next/server"
import { completeAzkarData } from "@/lib/azkar-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { message: "Query parameter 'q' is required" },
        { status: 400 }
      )
    }

    // Collect all azkar from all categories
    const allAzkar = []
    const allCategories = []
    
    for (const [key, data] of Object.entries(completeAzkarData)) {
      allAzkar.push(...data.azkar)
      allCategories.push(data.category)
    }

    // Search through azkar
    const searchResults = allAzkar.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.titleAr.includes(query) ||
      item.arabicText.includes(query) ||
      item.translation.toLowerCase().includes(query.toLowerCase())
    )

    // Get unique categories from results
    const categoryIds = [...new Set(searchResults.map(item => item.categoryId))]
    const categories = allCategories.filter(cat => 
      categoryIds.includes(cat.id)
    )

    // Add category information to each result
    const resultsWithCategory = searchResults.map(item => {
      const category = allCategories.find(cat => cat.id === item.categoryId)
      return {
        ...item,
        category: category ? {
          id: category.id,
          name: category.name,
          nameAr: category.nameAr
        } : null,
        resultType: 'azkar'
      }
    })

    return NextResponse.json({
      query,
      results: resultsWithCategory,
      categories,
      total: resultsWithCategory.length
    })
  } catch (error) {
    console.error("Error searching azkar:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
