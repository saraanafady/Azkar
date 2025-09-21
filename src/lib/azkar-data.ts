// This file contains the complete azkar data shared between the main route and search API
// It's extracted from the main route file to ensure consistency

export const completeAzkarData = {
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
        title: "Ayat al-Kursi",
        titleAr: "آية الكرسي",
        arabicText: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        translation: "I seek refuge in Allah from Satan, the accursed. Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        reference: "Al-Baqarah 2:255",
        times: 1,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "2",
        title: "Surah Al-Ikhlas",
        titleAr: "سورة الإخلاص",
        arabicText: "قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
        translation: "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'",
        reference: "Al-Ikhlas 112:1-4",
        times: 3,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "3",
        title: "Surah Al-Falaq",
        titleAr: "سورة الفلق",
        arabicText: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        translation: "Say, 'I seek refuge in the Lord of daybreak from the evil of that which He created and from the evil of darkness when it settles and from the evil of the blowers in knots and from the evil of an envier when he envies.'",
        reference: "Al-Falaq 113:1-5",
        times: 3,
        categoryId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: null,
        isBookmarked: false
      },
      {
        id: "4",
        title: "Surah An-Nas",
        titleAr: "سورة الناس",
        arabicText: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
        translation: "Say, 'I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer who whispers [evil] into the breasts of mankind from among the jinn and mankind.'",
        reference: "An-Nas 114:1-6",
        times: 3,
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
        arabicText: "أَصْبَـحْنا وَأَصْبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر",
        translation: "We have entered the morning and the morning belongs to Allah, and all praise is due to Allah. There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things competent. O Lord, I ask You for the good of this day and the good of what comes after it, and I seek refuge in You from the evil of this day and the evil of what comes after it. O Lord, I seek refuge in You from laziness and the evil of old age. O Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.",
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
        title: "Evening Du'a",
        titleAr: "دعاء المساء",
        arabicText: "أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَهـا ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلةِ وَشَرِّ ما بَعْـدَهـا ، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر",
        translation: "We have entered the evening and the evening belongs to Allah, and all praise is due to Allah. There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things competent. O Lord, I ask You for the good of this night and the good of what comes after it, and I seek refuge in You from the evil of this night and the evil of what comes after it. O Lord, I seek refuge in You from laziness and the evil of old age. O Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.",
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
      },
      {
        id: "301",
        title: "Distress Du'a",
        titleAr: "دعاء الكرب",
        arabicText: "لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم، لا إله إلا الله رب السماوات، ورب الأرض ورب العرش الكريم اللهم رحمتك أرجو فلا تكلني إلى نفسي طرفة عين وأصلح لي شأني كله ، لا إله إلا أنت لا إله إلا أنت سبحانك إني كنت من الظالمين الله الله رب لا أشرك به شيئا",
        translation: "There is no god but Allah, the Great, the Forbearing. There is no god but Allah, Lord of the Mighty Throne. There is no god but Allah, Lord of the heavens and Lord of the earth and Lord of the Noble Throne. O Allah, I hope for Your mercy, so do not leave me to myself for even the blink of an eye, and set right all my affairs. There is no god but You. There is no god but You. Glory be to You, I was indeed among the wrongdoers. Allah, Allah, my Lord, I do not associate anything with Him.",
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
