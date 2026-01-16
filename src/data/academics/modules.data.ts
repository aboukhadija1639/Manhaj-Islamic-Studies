import type { Module } from '@/domain';

/**
 * بيانات المقاييس الأكاديمية
 * Academic Modules Data
 * 
 * كلية العلوم الإسلامية - جامعة الوادي
 * 
 * ملاحظة: هذا ملف نموذجي يحتوي على مقاييس السنة الأولى لتخصص علوم القرآن
 * يجب توسيعه ليشمل جميع المقاييس لكل التخصصات والسنوات
 */

export const modulesData: Module[] = [
  // ========== السنة الأولى - السداسي الأول - علوم القرآن ==========
  {
    id: 'ulum-al-quran',
    code: 'UEF-111',
    nameAr: 'علوم القرآن',
    nameEn: 'Quranic Sciences',
    description:
      'مقياس يتناول علوم القرآن الكريم من حيث النزول والجمع والرسم والقراءات، ويهدف إلى تعريف الطالب بأهم علوم القرآن وأصولها.',
    type: 'fundamental',
    credits: 6,
    weeklyHours: {
      lecture: 3,
      tutorial: 1.5,
      practical: 0,
    },
    semesterId: 'licence-1-s1',
    prerequisiteIds: [],
    objectives: [
      'التعرف على علوم القرآن الأساسية',
      'فهم تاريخ جمع القرآن ونزوله',
      'دراسة القراءات القرآنية',
    ],
    outcomes: [
      'القدرة على شرح علوم القرآن',
      'فهم مراحل جمع القرآن',
      'التمييز بين القراءات',
    ],
    keywords: ['قرآن', 'علوم القرآن', 'تفسير'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'tafsir-1',
    code: 'UEF-112',
    nameAr: 'التفسير 1',
    nameEn: 'Tafsir 1',
    description:
      'مقياس يتناول مقدمات علم التفسير ومناهج المفسرين، مع دراسة تطبيقية لتفسير جزء عم.',
    type: 'fundamental',
    credits: 5,
    weeklyHours: {
      lecture: 3,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s1',
    prerequisiteIds: [],
    objectives: [
      'التعرف على علم التفسير وأصوله',
      'فهم مناهج المفسرين',
      'دراسة تفسير جزء عم',
    ],
    outcomes: [
      'القدرة على تفسير الآيات',
      'فهم مناهج التفسير',
      'التطبيق العملي للتفسير',
    ],
    keywords: ['تفسير', 'جزء عم', 'مناهج المفسرين'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'qiraat-1',
    code: 'UEF-113',
    nameAr: 'القراءات 1',
    nameEn: 'Quranic Readings 1',
    description:
      'مقياس يتناول مقدمات علم القراءات والقراءات السبع، مع التطبيق العملي لقراءة نافع.',
    type: 'fundamental',
    credits: 4,
    weeklyHours: {
      lecture: 2,
      tutorial: 0,
      practical: 2,
    },
    semesterId: 'licence-1-s1',
    prerequisiteIds: [],
    objectives: [
      'التعرف على علم القراءات',
      'دراسة القراءات السبع',
      'إتقان قراءة نافع',
    ],
    outcomes: [
      'القدرة على القراءة بقراءة نافع',
      'فهم أصول القراءات',
      'التمييز بين القراءات المختلفة',
    ],
    keywords: ['قراءات', 'نافع', 'تجويد'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'practical'],
    },
  },
  {
    id: 'hadith-1',
    code: 'UEM-114',
    nameAr: 'الحديث 1',
    nameEn: 'Hadith 1',
    description:
      'مقياس يتناول مقدمات علم الحديث ومصطلحه، مع دراسة أحاديث مختارة من صحيح البخاري.',
    type: 'methodology',
    credits: 4,
    weeklyHours: {
      lecture: 2,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s1',
    prerequisiteIds: [],
    objectives: [
      'التعرف على علم الحديث',
      'فهم مصطلح الحديث',
      'دراسة أحاديث من صحيح البخاري',
    ],
    outcomes: [
      'القدرة على تمييز الحديث الصحيح',
      'فهم مصطلحات الحديث',
      'القدرة على شرح الأحاديث',
    ],
    keywords: ['حديث', 'مصطلح الحديث', 'البخاري'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'fiqh-1',
    code: 'UEM-115',
    nameAr: 'الفقه 1 (العبادات)',
    nameEn: 'Fiqh 1 (Worship)',
    description:
      'مقياس يتناول أحكام العبادات في الفقه الإسلامي (الطهارة، الصلاة، الزكاة، الصيام، الحج).',
    type: 'methodology',
    credits: 4,
    weeklyHours: {
      lecture: 2,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s1',
    prerequisiteIds: [],
    objectives: [
      'فهم أحكام العبادات',
      'دراسة أدلة الأحكام',
      'التطبيق العملي للعبادات',
    ],
    outcomes: [
      'القدرة على أداء العبادات بشكل صحيح',
      'فهم أدلة الأحكام الفقهية',
      'القدرة على الإفتاء في العبادات',
    ],
    keywords: ['فقه', 'عبادات', 'طهارة', 'صلاة'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'arabic-1',
    code: 'UET-116',
    nameAr: 'اللغة العربية 1 (النحو)',
    nameEn: 'Arabic Language 1 (Grammar)',
    description:
      'مقياس يتناول أساسيات النحو العربي والإعراب، ويهدف إلى تمكين الطالب من فهم التراكيب اللغوية.',
    type: 'transversal',
    credits: 3,
    weeklyHours: {
      lecture: 2,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s1',
    prerequisiteIds: [],
    objectives: [
      'إتقان أساسيات النحو العربي',
      'القدرة على الإعراب',
      'فهم التراكيب اللغوية',
    ],
    outcomes: [
      'القدرة على إعراب الجمل',
      'فهم القواعد النحوية',
      'التطبيق العملي للنحو',
    ],
    keywords: ['نحو', 'إعراب', 'لغة عربية'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },

  // ========== السنة الأولى - السداسي الثاني - علوم القرآن ==========
  {
    id: 'tafsir-2',
    code: 'UEF-121',
    nameAr: 'التفسير 2',
    nameEn: 'Tafsir 2',
    description:
      'مقياس يتناول تفسير جزء تبارك وجزء قد سمع، مع التركيز على المناهج التفسيرية المختلفة.',
    type: 'fundamental',
    credits: 5,
    weeklyHours: {
      lecture: 3,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s2',
    prerequisiteIds: ['tafsir-1'],
    objectives: [
      'التعمق في علم التفسير',
      'دراسة تفسير أجزاء جديدة',
      'فهم المناهج التفسيرية',
    ],
    outcomes: [
      'القدرة على تفسير آيات متنوعة',
      'فهم اختلافات المفسرين',
      'التطبيق العملي للمناهج',
    ],
    keywords: ['تفسير', 'جزء تبارك', 'جزء قد سمع'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'qiraat-2',
    code: 'UEF-122',
    nameAr: 'القراءات 2',
    nameEn: 'Quranic Readings 2',
    description:
      'مقياس يتناول قراءة ورش عن نافع وقراءة قالون، مع التطبيق العملي والمقارنة بين القراءات.',
    type: 'fundamental',
    credits: 4,
    weeklyHours: {
      lecture: 2,
      tutorial: 0,
      practical: 2,
    },
    semesterId: 'licence-1-s2',
    prerequisiteIds: ['qiraat-1'],
    objectives: [
      'إتقان قراءة ورش وقالون',
      'المقارنة بين القراءات',
      'فهم أصول الرواة',
    ],
    outcomes: [
      'القدرة على القراءة بروايتي ورش وقالون',
      'التمييز بين الروايات',
      'التطبيق العملي للقراءات',
    ],
    keywords: ['قراءات', 'ورش', 'قالون'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'practical'],
    },
  },
  {
    id: 'usul-tafsir',
    code: 'UEF-123',
    nameAr: 'أصول التفسير',
    nameEn: 'Principles of Tafsir',
    description:
      'مقياس يتناول القواعد والأصول التي يعتمد عليها المفسر في تفسير القرآن الكريم.',
    type: 'fundamental',
    credits: 4,
    weeklyHours: {
      lecture: 2,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s2',
    prerequisiteIds: ['tafsir-1'],
    objectives: [
      'فهم أصول التفسير',
      'دراسة قواعد التفسير',
      'التطبيق العملي للأصول',
    ],
    outcomes: [
      'القدرة على تطبيق أصول التفسير',
      'فهم منهجية التفسير',
      'القدرة على النقد التفسيري',
    ],
    keywords: ['أصول التفسير', 'قواعد التفسير'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'hadith-2',
    code: 'UEM-124',
    nameAr: 'الحديث 2',
    nameEn: 'Hadith 2',
    description:
      'مقياس يتناول دراسة أحاديث مختارة من صحيح مسلم، مع التركيز على شرح الأحاديث وفقهها.',
    type: 'methodology',
    credits: 4,
    weeklyHours: {
      lecture: 2,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s2',
    prerequisiteIds: ['hadith-1'],
    objectives: [
      'دراسة صحيح مسلم',
      'فهم فقه الأحاديث',
      'القدرة على الشرح',
    ],
    outcomes: [
      'القدرة على شرح أحاديث مسلم',
      'فهم الفقه الحديثي',
      'التطبيق العملي للأحاديث',
    ],
    keywords: ['حديث', 'مسلم', 'شرح الحديث'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'aqidah-1',
    code: 'UEM-125',
    nameAr: 'العقيدة 1',
    nameEn: 'Islamic Creed 1',
    description:
      'مقياس يتناول أصول العقيدة الإسلامية (الإيمان بالله وأسمائه وصفاته، الإيمان بالملائكة والكتب).',
    type: 'methodology',
    credits: 3,
    weeklyHours: {
      lecture: 2,
      tutorial: 0.5,
      practical: 0,
    },
    semesterId: 'licence-1-s2',
    prerequisiteIds: [],
    objectives: [
      'فهم أصول العقيدة',
      'دراسة أسماء الله وصفاته',
      'الإيمان بالملائكة والكتب',
    ],
    outcomes: [
      'القدرة على شرح العقيدة الصحيحة',
      'فهم أدلة العقيدة',
      'الرد على الشبهات',
    ],
    keywords: ['عقيدة', 'إيمان', 'أسماء الله'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
  {
    id: 'arabic-2',
    code: 'UET-126',
    nameAr: 'اللغة العربية 2 (الصرف)',
    nameEn: 'Arabic Language 2 (Morphology)',
    description:
      'مقياس يتناول علم الصرف العربي والميزان الصرفي، ويهدف إلى تمكين الطالب من فهم بنية الكلمات.',
    type: 'transversal',
    credits: 3,
    weeklyHours: {
      lecture: 2,
      tutorial: 1,
      practical: 0,
    },
    semesterId: 'licence-1-s2',
    prerequisiteIds: ['arabic-1'],
    objectives: [
      'إتقان علم الصرف',
      'فهم الميزان الصرفي',
      'القدرة على التصريف',
    ],
    outcomes: [
      'القدرة على تصريف الأفعال',
      'فهم بنية الكلمات',
      'التطبيق العملي للصرف',
    ],
    keywords: ['صرف', 'ميزان صرفي', 'لغة عربية'],
    unitIds: [],
    resourceIds: [],
    assessment: {
      continuous: 40,
      exam: 60,
      types: ['continuous', 'exam'],
    },
  },
];
