import { NextRequest, NextResponse } from "next/server"
import { ServerDataStorage } from "@/lib/server-data"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryName: string }> }
) {
  try {
    const { categoryName } = await params

    // Find the category
    const categories = ServerDataStorage.getCategories()
    const category = categories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase() ||
      cat.id.toLowerCase() === categoryName.toLowerCase()
    )

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      )
    }

    // Get azkar for this category
    const azkar = ServerDataStorage.getAzkarByCategory(category.id)

    return NextResponse.json({
      category,
      azkar
    })
  } catch (error) {
    console.error("Error fetching azkar category:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
