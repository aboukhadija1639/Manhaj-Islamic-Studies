import type { Degree } from '@/domain';

/**
 * بيانات الدرجات الأكاديمية
 * Academic Degrees Data
 * 
 * كلية العلوم الإسلامية - جامعة الوادي
 */

export const degreesData: Degree[] = [
  {
    id: 'licence-islamic-sciences',
    type: 'licence',
    nameAr: 'ليسانس العلوم الإسلامية',
    nameEn: 'Bachelor in Islamic Sciences',
    description:
      'برنامج الليسانس في العلوم الإسلامية يمتد لثلاث سنوات (ستة سداسيات) ويهدف إلى تكوين طلبة متخصصين في مختلف فروع العلوم الإسلامية. يتيح البرنامج للطلبة اختيار تخصص من بين سبعة تخصصات متنوعة تغطي علوم القرآن، الحديث، الفقه، العقيدة، الدعوة، الشريعة والقانون، واللغة العربية والدراسات القرآنية.',
    duration: {
      years: 3,
      semesters: 6,
    },
    specialtyIds: [
      'quran-sciences',
      'hadith-sciences',
      'fiqh',
      'aqidah',
      'dawah',
      'sharia-law',
      'arabic-quran',
    ],
    metadata: {
      faculty: 'كلية العلوم الإسلامية',
      university: 'جامعة الوادي',
      system: 'LMD',
    },
  },
  {
    id: 'master-islamic-sciences',
    type: 'master',
    nameAr: 'ماستر العلوم الإسلامية',
    nameEn: 'Master in Islamic Sciences',
    description:
      'برنامج الماستر في العلوم الإسلامية يمتد لسنتين (أربعة سداسيات) ويهدف إلى تعميق المعرفة والبحث العلمي في مجالات العلوم الإسلامية المتخصصة. يركز البرنامج على تطوير مهارات البحث الأكاديمي وإعداد الطلبة للمساهمة في الدراسات الإسلامية المعاصرة من خلال أبحاث ودراسات معمقة.',
    duration: {
      years: 2,
      semesters: 4,
    },
    specialtyIds: [
      'quran-sciences-master',
      'hadith-sciences-master',
      'fiqh-master',
      'aqidah-master',
    ],
    metadata: {
      faculty: 'كلية العلوم الإسلامية',
      university: 'جامعة الوادي',
      system: 'LMD',
    },
  },
];
