export interface ServerAzkarCategory {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
}

export interface ServerAzkar {
  id: string
  title: string
  titleAr: string
  arabicText: string
  translation: string
  reference?: string
  times: number
  categoryId: string
}

export class ServerDataStorage {
  private static initialized = false

  static initialize() {
    if (this.initialized) return
    this.initialized = true
  }

  static getCategories(): ServerAzkarCategory[] {
    this.initialize()
    return [
      {
        id: 'morning',
        name: 'Morning',
        nameAr: 'أذكار الصباح',
        description: 'Morning remembrance and supplications',
        descriptionAr: 'أذكار الصباح والدعوات'
      },
      {
        id: 'evening',
        name: 'Evening',
        nameAr: 'أذكار المساء',
        description: 'Evening remembrance and supplications',
        descriptionAr: 'أذكار المساء والدعوات'
      },
      {
        id: 'prayer',
        name: 'Prayer',
        nameAr: 'أذكار الصلاة',
        description: 'Remembrance during and after prayer',
        descriptionAr: 'أذكار الصلاة وبعدها'
      },
      {
        id: 'general',
        name: 'General',
        nameAr: 'أذكار عامة',
        description: 'General remembrance and supplications',
        descriptionAr: 'أذكار عامة ودعوات'
      }
    ]
  }

  static getAzkar(): ServerAzkar[] {
    this.initialize()
    return [
      // Morning Azkar
      {
        id: 'morning-tasbih',
        title: 'Morning Tasbih',
        titleAr: 'تسبيح الصباح',
        arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        translation: 'Glory be to Allah and praise be to Him',
        reference: 'Sahih Muslim 2691',
        times: 100,
        categoryId: 'morning'
      },
      {
        id: 'morning-shahada',
        title: 'Morning Shahada',
        titleAr: 'شهادة الصباح',
        arabicText: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger',
        reference: 'Sahih Muslim 2691',
        times: 1,
        categoryId: 'morning'
      },
      {
        id: 'morning-istighfar',
        title: 'Morning Istighfar',
        titleAr: 'استغفار الصباح',
        arabicText: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
        translation: 'I seek forgiveness from Allah and repent to Him',
        reference: 'Sahih Bukhari 6307',
        times: 100,
        categoryId: 'morning'
      },
      // Evening Azkar
      {
        id: 'evening-tasbih',
        title: 'Evening Tasbih',
        titleAr: 'تسبيح المساء',
        arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        translation: 'Glory be to Allah and praise be to Him',
        reference: 'Sahih Muslim 2691',
        times: 100,
        categoryId: 'evening'
      },
      {
        id: 'evening-shahada',
        title: 'Evening Shahada',
        titleAr: 'شهادة المساء',
        arabicText: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger',
        reference: 'Sahih Muslim 2691',
        times: 1,
        categoryId: 'evening'
      },
      // Prayer Azkar
      {
        id: 'after-prayer-tasbih',
        title: 'After Prayer Tasbih',
        titleAr: 'تسبيح بعد الصلاة',
        arabicText: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
        translation: 'Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest',
        reference: 'Sahih Muslim 2691',
        times: 33,
        categoryId: 'prayer'
      },
      {
        id: 'istighfar-after-prayer',
        title: 'Istighfar After Prayer',
        titleAr: 'استغفار بعد الصلاة',
        arabicText: 'أَسْتَغْفِرُ اللَّهَ',
        translation: 'I seek forgiveness from Allah',
        reference: 'Sahih Bukhari 6307',
        times: 33,
        categoryId: 'prayer'
      },
      // General Azkar
      {
        id: 'la-ilaha-illa-allah',
        title: 'La Ilaha Illa Allah',
        titleAr: 'لا إله إلا الله',
        arabicText: 'لَا إِلَهَ إِلَّا اللَّهُ',
        translation: 'There is no god but Allah',
        reference: 'Sahih Bukhari 6307',
        times: 100,
        categoryId: 'general'
      },
      {
        id: 'subhan-allah',
        title: 'Subhan Allah',
        titleAr: 'سبحان الله',
        arabicText: 'سُبْحَانَ اللَّهِ',
        translation: 'Glory be to Allah',
        reference: 'Sahih Bukhari 6307',
        times: 100,
        categoryId: 'general'
      }
    ]
  }

  static getAzkarByCategory(categoryId: string): ServerAzkar[] {
    const allAzkar = this.getAzkar()
    return allAzkar.filter(azkar => azkar.categoryId === categoryId)
  }
}
