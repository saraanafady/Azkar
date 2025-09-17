import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock data for when database is not available
const mockAzkarData = {
  morning: {
    category: {
      id: "1",
      name: "Morning",
      nameAr: "أذكار الصباح",
      description: "Morning remembrance and supplications",
      descriptionAr: "أذكار الصباح والدعوات"
    },
    azkar: [
      {
        id: "1",
        title: "Morning Tasbih",
        titleAr: "تسبيح الصباح",
        arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        translation: "Glory be to Allah and praise be to Him",
        reference: "Sahih Muslim 2691",
        times: 100,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "2",
        title: "Morning Shahada",
        titleAr: "شهادة الصباح",
        arabicText: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        translation: "I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger",
        reference: "Sahih Muslim 2691",
        times: 1,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      }
    ]
  },
  evening: {
    category: {
      id: "2",
      name: "Evening",
      nameAr: "أذكار المساء",
      description: "Evening remembrance and supplications",
      descriptionAr: "أذكار المساء والدعوات"
    },
    azkar: [
      {
        id: "3",
        title: "Evening Tasbih",
        titleAr: "تسبيح المساء",
        arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        translation: "Glory be to Allah and praise be to Him",
        reference: "Sahih Muslim 2691",
        times: 100,
        categoryId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      }
    ]
  },
  prayer: {
    category: {
      id: "3",
      name: "Prayer",
      nameAr: "أذكار الصلاة",
      description: "Remembrance during and after prayer",
      descriptionAr: "أذكار الصلاة وبعدها"
    },
    azkar: [
      {
        id: "4",
        title: "After Prayer Tasbih",
        titleAr: "تسبيح بعد الصلاة",
        arabicText: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ",
        translation: "Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest",
        reference: "Sahih Muslim 2691",
        times: 33,
        categoryId: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      }
    ]
  },
  general: {
    category: {
      id: "4",
      name: "General",
      nameAr: "أذكار عامة",
      description: "General remembrance and supplications",
      descriptionAr: "أذكار عامة ودعوات"
    },
    azkar: [
      {
        id: "5",
        title: "La Ilaha Illa Allah",
        titleAr: "لا إله إلا الله",
        arabicText: "لَا إِلَهَ إِلَّا اللَّهُ",
        translation: "There is no god but Allah",
        reference: "Sahih Bukhari 6307",
        times: 100,
        categoryId: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      }
    ]
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryName: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { categoryName: rawCategoryName } = await params
    const categoryName = rawCategoryName.toLowerCase()

    // Try to fetch from database first
    try {
      const category = await prisma.azkarCategory.findFirst({
        where: {
          name: {
            equals: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
            mode: 'insensitive'
          }
        }
      })

      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }

      const azkar = await prisma.azkar.findMany({
        where: {
          categoryId: category.id
        },
        include: {
          progress: session ? {
            where: {
              userId: session.user.id
            }
          } : false,
          bookmarks: session ? {
            where: {
              userId: session.user.id
            }
          } : false
        },
        orderBy: {
          title: 'asc'
        }
      })

      // Transform the data to include progress and bookmark status
      const transformedAzkar = azkar.map((item: any) => ({
        ...item,
        progress: item.progress?.[0] || null,
        isBookmarked: item.bookmarks?.[0] ? true : false
      }))

      return NextResponse.json({
        category,
        azkar: transformedAzkar
      })
    } catch (dbError) {
      console.error('Database error, using mock data:', dbError)
      
      // Use mock data when database is not available
      const mockData = mockAzkarData[categoryName as keyof typeof mockAzkarData]
      
      if (!mockData) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(mockData)
    }
  } catch (error) {
    console.error('Error fetching azkar:', error)
    return NextResponse.json(
      { error: 'Failed to fetch azkar' },
      { status: 500 }
    )
  }
}
