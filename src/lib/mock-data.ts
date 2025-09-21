// This file contains the shared mock data for azkar
// It's extracted from the main route file to be used by both the category API and search API

export const mockAzkarData = {
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
        id: "100",
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
        id: "101",
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
        id: "200",
        title: "Prayer Tasbih",
        titleAr: "تسبيح الصلاة",
        arabicText: "سُـبْحانَ اللهِ، والحَمْـدُ لله ، واللهُ أكْـبَر",
        translation: "Glory be to Allah, and praise be to Allah, and Allah is the Greatest",
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
        id: "300",
        title: "Wearing Clothes",
        titleAr: "لبس الثوب",
        arabicText: "الحمدُ للهِ الّذي كَساني هذا (الثّوب) وَرَزَقَنيه مِنْ غَـيـْرِ حَولٍ مِنّي وَلا قـوّة",
        translation: "Praise be to Allah who has clothed me with this (garment) and provided it for me without any power or strength from me",
        reference: "Sahih Muslim 2715",
        times: 1,
        categoryId: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      }
    ]
  }
}
