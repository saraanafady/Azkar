import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Azkar Categories
  const morningCategory = await prisma.azkarCategory.upsert({
    where: { name: 'Morning' },
    update: {},
    create: {
      name: 'Morning',
      nameAr: 'أذكار الصباح',
      description: 'Morning remembrance and supplications',
      descriptionAr: 'أذكار الصباح والدعوات'
    }
  })

  const eveningCategory = await prisma.azkarCategory.upsert({
    where: { name: 'Evening' },
    update: {},
    create: {
      name: 'Evening',
      nameAr: 'أذكار المساء',
      description: 'Evening remembrance and supplications',
      descriptionAr: 'أذكار المساء والدعوات'
    }
  })

  const prayerCategory = await prisma.azkarCategory.upsert({
    where: { name: 'Prayer' },
    update: {},
    create: {
      name: 'Prayer',
      nameAr: 'أذكار الصلاة',
      description: 'Remembrance during and after prayer',
      descriptionAr: 'أذكار الصلاة وبعدها'
    }
  })

  const generalCategory = await prisma.azkarCategory.upsert({
    where: { name: 'General' },
    update: {},
    create: {
      name: 'General',
      nameAr: 'أذكار عامة',
      description: 'General remembrance and supplications',
      descriptionAr: 'أذكار عامة ودعوات'
    }
  })

  // Sample Morning Azkar
  const morningAzkar = [
    {
      title: 'Morning Tasbih',
      titleAr: 'تسبيح الصباح',
      arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      translation: 'Glory be to Allah and praise be to Him',
      reference: 'Sahih Muslim 2691',
      times: 100,
      categoryId: morningCategory.id
    },
    {
      title: 'Morning Shahada',
      titleAr: 'شهادة الصباح',
      arabicText: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger',
      reference: 'Sahih Muslim 2691',
      times: 1,
      categoryId: morningCategory.id
    },
    {
      title: 'Morning Istighfar',
      titleAr: 'استغفار الصباح',
      arabicText: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      translation: 'I seek forgiveness from Allah and repent to Him',
      reference: 'Sahih Bukhari 6307',
      times: 100,
      categoryId: morningCategory.id
    }
  ]

  // Sample Evening Azkar
  const eveningAzkar = [
    {
      title: 'Evening Tasbih',
      titleAr: 'تسبيح المساء',
      arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      translation: 'Glory be to Allah and praise be to Him',
      reference: 'Sahih Muslim 2691',
      times: 100,
      categoryId: eveningCategory.id
    },
    {
      title: 'Evening Shahada',
      titleAr: 'شهادة المساء',
      arabicText: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger',
      reference: 'Sahih Muslim 2691',
      times: 1,
      categoryId: eveningCategory.id
    }
  ]

  // Sample Prayer Azkar
  const prayerAzkar = [
    {
      title: 'After Prayer Tasbih',
      titleAr: 'تسبيح بعد الصلاة',
      arabicText: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
      translation: 'Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest',
      reference: 'Sahih Muslim 2691',
      times: 33,
      categoryId: prayerCategory.id
    },
    {
      title: 'Istighfar After Prayer',
      titleAr: 'استغفار بعد الصلاة',
      arabicText: 'أَسْتَغْفِرُ اللَّهَ',
      translation: 'I seek forgiveness from Allah',
      reference: 'Sahih Bukhari 6307',
      times: 33,
      categoryId: prayerCategory.id
    }
  ]

  // Sample General Azkar
  const generalAzkar = [
    {
      title: 'La Ilaha Illa Allah',
      titleAr: 'لا إله إلا الله',
      arabicText: 'لَا إِلَهَ إِلَّا اللَّهُ',
      translation: 'There is no god but Allah',
      reference: 'Sahih Bukhari 6307',
      times: 100,
      categoryId: generalCategory.id
    },
    {
      title: 'Subhan Allah',
      titleAr: 'سبحان الله',
      arabicText: 'سُبْحَانَ اللَّهِ',
      translation: 'Glory be to Allah',
      reference: 'Sahih Bukhari 6307',
      times: 100,
      categoryId: generalCategory.id
    }
  ]

  // Insert all azkar
  const allAzkar = [...morningAzkar, ...eveningAzkar, ...prayerAzkar, ...generalAzkar]
  
  for (const azkar of allAzkar) {
    await prisma.azkar.upsert({
      where: { 
        title_categoryId: {
          title: azkar.title,
          categoryId: azkar.categoryId
        }
      },
      update: {},
      create: azkar
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
