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
      },
      {
        id: "3",
        title: "Morning Istighfar",
        titleAr: "استغفار الصباح",
        arabicText: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
        translation: "I seek forgiveness from Allah and repent to Him",
        reference: "Sahih Bukhari 6307",
        times: 100,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "4",
        title: "Morning Tahlil",
        titleAr: "تهليل الصباح",
        arabicText: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things competent",
        reference: "Sahih Muslim 2691",
        times: 10,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "5",
        title: "Morning Du'a",
        titleAr: "دعاء الصباح",
        arabicText: "اللَّهُمَّ أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        translation: "O Allah, we have entered the morning and the morning belongs to Allah, and all praise is due to Allah. There is no god but Allah alone, with no partner",
        reference: "Sahih Muslim 2691",
        times: 1,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "6",
        title: "Morning Health Du'a",
        titleAr: "دعاء الصحة الصباحي",
        arabicText: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ",
        translation: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no god but You",
        reference: "Abu Dawud 5090",
        times: 3,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "7",
        title: "Morning Witness",
        titleAr: "شهادة الصباح",
        arabicText: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
        translation: "O Allah, I have entered the morning bearing witness to You and to the bearers of Your Throne and Your angels and all Your creation that You are Allah, there is no god but You alone, with no partner, and that Muhammad is Your servant and messenger",
        reference: "Abu Dawud 5070",
        times: 1,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "8",
        title: "Morning Tasbih 33",
        titleAr: "تسبيح 33",
        arabicText: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
        translation: "Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest",
        reference: "Sahih Muslim 2691",
        times: 33,
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
        id: "9",
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
      },
      {
        id: "10",
        title: "Evening Shahada",
        titleAr: "شهادة المساء",
        arabicText: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        translation: "I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger",
        reference: "Sahih Muslim 2691",
        times: 1,
        categoryId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "11",
        title: "Evening Istighfar",
        titleAr: "استغفار المساء",
        arabicText: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
        translation: "I seek forgiveness from Allah and repent to Him",
        reference: "Sahih Bukhari 6307",
        times: 100,
        categoryId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "12",
        title: "Evening Tahlil",
        titleAr: "تهليل المساء",
        arabicText: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things competent",
        reference: "Sahih Muslim 2691",
        times: 10,
        categoryId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "13",
        title: "Evening Du'a",
        titleAr: "دعاء المساء",
        arabicText: "اللَّهُمَّ أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        translation: "O Allah, we have entered the evening and the evening belongs to Allah, and all praise is due to Allah. There is no god but Allah alone, with no partner",
        reference: "Sahih Muslim 2691",
        times: 1,
        categoryId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "14",
        title: "Evening Health Du'a",
        titleAr: "دعاء الصحة المسائي",
        arabicText: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ",
        translation: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no god but You",
        reference: "Abu Dawud 5090",
        times: 3,
        categoryId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "15",
        title: "Evening Witness",
        titleAr: "شهادة المساء",
        arabicText: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
        translation: "O Allah, I have entered the evening bearing witness to You and to the bearers of Your Throne and Your angels and all Your creation that You are Allah, there is no god but You alone, with no partner, and that Muhammad is Your servant and messenger",
        reference: "Abu Dawud 5070",
        times: 1,
        categoryId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "16",
        title: "Evening Tasbih 33",
        titleAr: "تسبيح 33",
        arabicText: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
        translation: "Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest",
        reference: "Sahih Muslim 2691",
        times: 33,
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
            equals: categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
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
