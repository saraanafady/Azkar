import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Mock data for when database is not available
const mockCategories = [
  {
    id: "1",
    name: "Morning",
    nameAr: "أذكار الصباح",
    description: "Morning remembrance and supplications",
    descriptionAr: "أذكار الصباح والدعوات",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      azkar: 3
    }
  },
  {
    id: "2",
    name: "Evening",
    nameAr: "أذكار المساء",
    description: "Evening remembrance and supplications",
    descriptionAr: "أذكار المساء والدعوات",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      azkar: 2
    }
  },
  {
    id: "3",
    name: "Prayer",
    nameAr: "أذكار الصلاة",
    description: "Remembrance during and after prayer",
    descriptionAr: "أذكار الصلاة وبعدها",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      azkar: 2
    }
  },
  {
    id: "4",
    name: "General",
    nameAr: "أذكار عامة",
    description: "General remembrance and supplications",
    descriptionAr: "أذكار عامة ودعوات",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      azkar: 2
    }
  }
]

export async function GET() {
  try {
    const categories = await prisma.azkarCategory.findMany({
      include: {
        _count: {
          select: {
            azkar: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories from database:', error)
    console.log('Returning mock data instead')
    
    // Return mock data when database is not available
    return NextResponse.json(mockCategories)
  }
}
