import { NextRequest, NextResponse } from "next/server"
import { completeAzkarData } from "@/lib/azkar-data"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryName: string }> }
) {
  try {
    const { categoryName } = await params

    // Find the category in the complete data structure
    let category: any = null
    let azkar: any[] = []

    // Check each category type
    for (const [key, data] of Object.entries(completeAzkarData)) {
      if (data.category.name.toLowerCase() === categoryName.toLowerCase()) {
        category = data.category
        azkar = data.azkar
        break
      }
    }

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      )
    }

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
