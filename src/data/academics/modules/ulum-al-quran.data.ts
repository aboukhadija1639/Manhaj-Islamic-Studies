/**
 * بيانات مقياس علوم القرآن - محتوى كامل
 * Quranic Sciences Module - Complete Content Data
 * 
 * هذا الملف يحتوي على البيانات الكاملة لمقياس علوم القرآن
 * بما في ذلك الوحدات، الدروس، والموارد
 */

export interface QuranModuleUnit {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: number; // in minutes
  lessons: QuranModuleLesson[];
}

export interface QuranModuleLesson {
  id: string;
  title: string;
  description: string;
  order: number;
  type: 'pdf' | 'md' | 'video' | 'audio';
  contentPath: string;
  estimatedDuration: number; // in minutes
  objectives: string[];
  keywords: string[];
}

export interface QuranModuleResource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'book' | 'article';
  url?: string;
  filePath?: string;
  author?: string;
  description: string;
  category: 'textbook' | 'reference' | 'supplementary' | 'audio' | 'video';
}

/**
 * الوحدات التعليمية لمقياس علوم القرآن
 */
export const quranModuleUnits: QuranModuleUnit[] = [
  {
    id: 'unit-1-introduction',
    title: 'الوحدة الأولى: مقدمة في علوم القرآن',
    description:
      'تعريف علوم القرآن، أهميتها، وأقسامها. نشأة علوم القرآن وتطورها عبر العصور.',
    order: 1,
    estimatedDuration: 180, // 3 hours
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'تعريف علوم القرآن وأهميتها',
        description:
          'تعريف علوم القرآن لغة واصطلاحًا، وبيان أهميتها في فهم كتاب الله تعالى.',
        order: 1,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-1/lesson-1.md',
        estimatedDuration: 45,
        objectives: [
          'تعريف علوم القرآن لغة واصطلاحًا',
          'بيان أهمية علوم القرآن',
          'معرفة فوائد دراسة علوم القرآن',
        ],
        keywords: ['علوم القرآن', 'التعريف', 'الأهمية', 'الفوائد'],
      },
      {
        id: 'lesson-1-2',
        title: 'أقسام علوم القرآن',
        description:
          'بيان الأقسام الرئيسية لعلوم القرآن: علوم تتعلق بالنزول، الجمع، الرسم، القراءات، والتفسير.',
        order: 2,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-1/lesson-2.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة أقسام علوم القرآن الرئيسية',
          'فهم العلاقة بين هذه الأقسام',
          'التمييز بين أنواع علوم القرآن',
        ],
        keywords: ['أقسام', 'النزول', 'الجمع', 'الرسم', 'القراءات', 'التفسير'],
      },
      {
        id: 'lesson-1-3',
        title: 'نشأة علوم القرآن وتطورها',
        description:
          'تاريخ نشأة علوم القرآن منذ عصر النبوة حتى العصر الحديث، وأهم المؤلفات فيها.',
        order: 3,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-1/lesson-3.md',
        estimatedDuration: 75,
        objectives: [
          'معرفة تاريخ نشأة علوم القرآن',
          'التعرف على مراحل تطور علوم القرآن',
          'معرفة أهم المؤلفات في علوم القرآن',
        ],
        keywords: ['النشأة', 'التطور', 'التاريخ', 'المؤلفات', 'العلماء'],
      },
    ],
  },
  {
    id: 'unit-2-revelation',
    title: 'الوحدة الثانية: نزول القرآن الكريم',
    description:
      'دراسة كيفية نزول القرآن، أسباب النزول، المكي والمدني، وأول ما نزل وآخر ما نزل.',
    order: 2,
    estimatedDuration: 240, // 4 hours
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'كيفية نزول القرآن',
        description:
          'بيان كيفية نزول القرآن على النبي صلى الله عليه وسلم، والوحي وأنواعه.',
        order: 1,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-2/lesson-1.md',
        estimatedDuration: 60,
        objectives: [
          'فهم كيفية نزول الوحي على النبي',
          'معرفة أنواع الوحي',
          'التمييز بين أنواع النزول',
        ],
        keywords: ['النزول', 'الوحي', 'جبريل', 'النبي'],
      },
      {
        id: 'lesson-2-2',
        title: 'أسباب النزول',
        description:
          'تعريف أسباب النزول، أهميتها، وأمثلة عليها من القرآن الكريم.',
        order: 2,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-2/lesson-2.md',
        estimatedDuration: 60,
        objectives: [
          'تعريف أسباب النزول',
          'معرفة أهمية أسباب النزول في التفسير',
          'دراسة أمثلة على أسباب النزول',
        ],
        keywords: ['أسباب النزول', 'التفسير', 'السياق', 'الأحداث'],
      },
      {
        id: 'lesson-2-3',
        title: 'المكي والمدني',
        description:
          'تعريف المكي والمدني، ضوابط التمييز بينهما، وخصائص كل منهما.',
        order: 3,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-2/lesson-3.md',
        estimatedDuration: 60,
        objectives: [
          'تعريف المكي والمدني',
          'معرفة ضوابط التمييز بينهما',
          'فهم خصائص كل من المكي والمدني',
        ],
        keywords: ['المكي', 'المدني', 'الضوابط', 'الخصائص'],
      },
      {
        id: 'lesson-2-4',
        title: 'أول ما نزل وآخر ما نزل',
        description:
          'بيان أول ما نزل من القرآن وآخر ما نزل، مع الأدلة والخلاف في ذلك.',
        order: 4,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-2/lesson-4.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة أول ما نزل من القرآن',
          'معرفة آخر ما نزل من القرآن',
          'فهم الخلاف في ذلك',
        ],
        keywords: ['أول ما نزل', 'آخر ما نزل', 'الترتيب', 'النزول'],
      },
    ],
  },
  {
    id: 'unit-3-compilation',
    title: 'الوحدة الثالثة: جمع القرآن الكريم',
    description:
      'دراسة مراحل جمع القرآن في عهد النبي وأبي بكر وعثمان، وكتابة المصحف.',
    order: 3,
    estimatedDuration: 240, // 4 hours
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'جمع القرآن في عهد النبي',
        description:
          'بيان كيفية حفظ القرآن وكتابته في عهد النبي صلى الله عليه وسلم.',
        order: 1,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-3/lesson-1.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة كيفية حفظ القرآن في عهد النبي',
          'فهم دور الكتاب في كتابة الوحي',
          'معرفة المواد المستخدمة في الكتابة',
        ],
        keywords: ['الجمع', 'النبي', 'الحفظ', 'الكتابة', 'الصحابة'],
      },
      {
        id: 'lesson-3-2',
        title: 'جمع القرآن في عهد أبي بكر',
        description:
          'دراسة جمع القرآن في مصحف واحد في عهد أبي بكر الصديق رضي الله عنه.',
        order: 2,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-3/lesson-2.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة سبب جمع القرآن في عهد أبي بكر',
          'فهم منهج زيد بن ثابت في الجمع',
          'معرفة نتيجة هذا الجمع',
        ],
        keywords: ['أبو بكر', 'زيد بن ثابت', 'الجمع', 'المصحف'],
      },
      {
        id: 'lesson-3-3',
        title: 'جمع القرآن في عهد عثمان',
        description:
          'دراسة نسخ المصاحف وتوحيد القراءة في عهد عثمان بن عفان رضي الله عنه.',
        order: 3,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-3/lesson-3.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة سبب نسخ المصاحف في عهد عثمان',
          'فهم منهج اللجنة في النسخ',
          'معرفة المصاحف العثمانية',
        ],
        keywords: ['عثمان', 'المصاحف', 'النسخ', 'التوحيد'],
      },
      {
        id: 'lesson-3-4',
        title: 'الرسم العثماني',
        description:
          'دراسة الرسم العثماني، قواعده، وحكم الالتزام به.',
        order: 4,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-3/lesson-4.md',
        estimatedDuration: 60,
        objectives: [
          'تعريف الرسم العثماني',
          'معرفة قواعد الرسم العثماني',
          'فهم حكم الالتزام بالرسم العثماني',
        ],
        keywords: ['الرسم', 'العثماني', 'القواعد', 'الحكم'],
      },
    ],
  },
  {
    id: 'unit-4-readings',
    title: 'الوحدة الرابعة: القراءات القرآنية',
    description:
      'دراسة القراءات القرآنية، أنواعها، القراءات العشر، وأصول القراءة.',
    order: 4,
    estimatedDuration: 300, // 5 hours
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'تعريف القراءات وأنواعها',
        description:
          'تعريف القراءات القرآنية، أنواعها (المتواترة، الآحاد، الشاذة).',
        order: 1,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-4/lesson-1.md',
        estimatedDuration: 60,
        objectives: [
          'تعريف القراءات القرآنية',
          'معرفة أنواع القراءات',
          'التمييز بين المتواتر والآحاد والشاذ',
        ],
        keywords: ['القراءات', 'المتواتر', 'الآحاد', 'الشاذ'],
      },
      {
        id: 'lesson-4-2',
        title: 'القراءات العشر',
        description:
          'دراسة القراءات العشر المتواترة والقراء العشرة ورواتهم.',
        order: 2,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-4/lesson-2.md',
        estimatedDuration: 90,
        objectives: [
          'معرفة القراءات العشر',
          'التعرف على القراء العشرة',
          'معرفة رواة كل قراءة',
        ],
        keywords: ['القراءات العشر', 'القراء', 'الرواة', 'التواتر'],
      },
      {
        id: 'lesson-4-3',
        title: 'أصول القراءة',
        description:
          'دراسة أصول القراءة: الاستعاذة، البسملة، المد، الإدغام، الإمالة.',
        order: 3,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-4/lesson-3.md',
        estimatedDuration: 90,
        objectives: [
          'معرفة أصول القراءة',
          'فهم أحكام الاستعاذة والبسملة',
          'دراسة أحكام المد والإدغام',
        ],
        keywords: ['أصول', 'الاستعاذة', 'البسملة', 'المد', 'الإدغام'],
      },
      {
        id: 'lesson-4-4',
        title: 'فرش الحروف',
        description:
          'دراسة الاختلافات الجزئية بين القراءات في الكلمات والحروف.',
        order: 4,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-4/lesson-4.md',
        estimatedDuration: 60,
        objectives: [
          'تعريف فرش الحروف',
          'معرفة أمثلة على الاختلافات',
          'فهم أثر الاختلاف على المعنى',
        ],
        keywords: ['فرش الحروف', 'الاختلافات', 'المعنى'],
      },
    ],
  },
  {
    id: 'unit-5-tafsir',
    title: 'الوحدة الخامسة: مقدمة في علم التفسير',
    description:
      'تعريف التفسير، أنواعه، شروط المفسر، ومناهج التفسير.',
    order: 5,
    estimatedDuration: 240, // 4 hours
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'تعريف التفسير وأهميته',
        description:
          'تعريف التفسير لغة واصطلاحًا، وبيان أهميته في فهم القرآن.',
        order: 1,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-5/lesson-1.md',
        estimatedDuration: 60,
        objectives: [
          'تعريف التفسير لغة واصطلاحًا',
          'بيان أهمية التفسير',
          'معرفة الفرق بين التفسير والتأويل',
        ],
        keywords: ['التفسير', 'التأويل', 'الأهمية', 'التعريف'],
      },
      {
        id: 'lesson-5-2',
        title: 'أنواع التفسير',
        description:
          'دراسة أنواع التفسير: التفسير بالمأثور والتفسير بالرأي.',
        order: 2,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-5/lesson-2.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة أنواع التفسير',
          'فهم التفسير بالمأثور',
          'فهم التفسير بالرأي',
        ],
        keywords: ['التفسير بالمأثور', 'التفسير بالرأي', 'الأنواع'],
      },
      {
        id: 'lesson-5-3',
        title: 'شروط المفسر وآدابه',
        description:
          'بيان الشروط الواجب توفرها في المفسر، وآداب التفسير.',
        order: 3,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-5/lesson-3.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة شروط المفسر',
          'فهم آداب التفسير',
          'معرفة ما يجب تجنبه في التفسير',
        ],
        keywords: ['شروط المفسر', 'الآداب', 'التفسير'],
      },
      {
        id: 'lesson-5-4',
        title: 'مناهج التفسير',
        description:
          'دراسة مناهج التفسير المختلفة: التحليلي، الإجمالي، المقارن، الموضوعي.',
        order: 4,
        type: 'md',
        contentPath: '/content/ulum-al-quran/unit-5/lesson-4.md',
        estimatedDuration: 60,
        objectives: [
          'معرفة مناهج التفسير المختلفة',
          'فهم خصائص كل منهج',
          'معرفة أمثلة على كل منهج',
        ],
        keywords: [
          'مناهج التفسير',
          'التحليلي',
          'الإجمالي',
          'المقارن',
          'الموضوعي',
        ],
      },
    ],
  },
];

/**
 * الموارد التعليمية لمقياس علوم القرآن
 */
export const quranModuleResources: QuranModuleResource[] = [
  {
    id: 'resource-1',
    title: 'مباحث في علوم القرآن - مناع القطان',
    type: 'book',
    description:
      'كتاب شامل في علوم القرآن يغطي جميع الموضوعات الأساسية بأسلوب واضح ومنهجي.',
    author: 'د. مناع القطان',
    category: 'textbook',
  },
  {
    id: 'resource-2',
    title: 'الإتقان في علوم القرآن - السيوطي',
    type: 'book',
    description:
      'موسوعة شاملة في علوم القرآن، تعتبر من أهم المراجع في هذا المجال.',
    author: 'جلال الدين السيوطي',
    category: 'reference',
  },
  {
    id: 'resource-3',
    title: 'البرهان في علوم القرآن - الزركشي',
    type: 'book',
    description:
      'كتاب موسوعي في علوم القرآن، يتميز بالتفصيل والدقة العلمية.',
    author: 'بدر الدين الزركشي',
    category: 'reference',
  },
  {
    id: 'resource-4',
    title: 'دروس في علوم القرآن - د. غانم قدوري الحمد',
    type: 'pdf',
    filePath: '/resources/ulum-al-quran/ghanum-qaduri.pdf',
    description:
      'مجموعة دروس مبسطة في علوم القرآن مناسبة للمبتدئين.',
    author: 'د. غانم قدوري الحمد',
    category: 'supplementary',
  },
  {
    id: 'resource-5',
    title: 'محاضرات في علوم القرآن - صوتيات',
    type: 'link',
    url: 'https://example.com/quran-lectures',
    description:
      'سلسلة محاضرات صوتية في علوم القرآن لكبار العلماء.',
    category: 'audio',
  },
  {
    id: 'resource-6',
    title: 'القراءات القرآنية - مقدمة وتطبيق',
    type: 'pdf',
    filePath: '/resources/ulum-al-quran/qiraat-intro.pdf',
    description:
      'ملف تعريفي بالقراءات القرآنية مع أمثلة تطبيقية.',
    author: 'د. أيمن سويد',
    category: 'supplementary',
  },
  {
    id: 'resource-7',
    title: 'تاريخ جمع القرآن - وثائقي',
    type: 'link',
    url: 'https://example.com/quran-compilation-documentary',
    description:
      'فيلم وثائقي يشرح مراحل جمع القرآن الكريم بالصوت والصورة.',
    category: 'video',
  },
  {
    id: 'resource-8',
    title: 'معجم مصطلحات علوم القرآن',
    type: 'pdf',
    filePath: '/resources/ulum-al-quran/terminology-glossary.pdf',
    description:
      'معجم شامل لمصطلحات علوم القرآن مع الشرح والأمثلة.',
    category: 'reference',
  },
];

/**
 * معلومات عامة عن المقياس
 */
export const quranModuleOverview = {
  importance:
    'علوم القرآن من أهم العلوم الشرعية التي يجب على طالب العلم الشرعي إتقانها، فهي المفتاح لفهم كتاب الله تعالى وتدبر آياته. تشمل علوم القرآن مباحث متعددة تتعلق بنزول القرآن، جمعه، قراءاته، وتفسيره، وكل ذلك يساعد على فهم القرآن فهمًا صحيحًا.',
  objectives: [
    'إتقان علوم القرآن الكريم من حيث النزول والجمع والقراءات',
    'دراسة القراءات العشر المتواترة وأصولها',
    'فهم مناهج التفسير وعلومه',
    'التمكن من الإعجاز القرآني بأنواعه',
    'القدرة على البحث في الدراسات القرآنية',
  ],
  outcomes: [
    'القدرة على تدريس علوم القرآن وتفسيره',
    'إتقان تلاوة القرآن الكريم بالقراءات المختلفة',
    'القدرة على البحث في الدراسات القرآنية',
    'المساهمة في نشر علوم القرآن في المجتمع',
    'فهم عميق لتاريخ القرآن وجمعه',
  ],
  prerequisites: [
    'معرفة أساسية باللغة العربية (النحو والصرف)',
    'القدرة على قراءة القرآن الكريم بشكل صحيح',
    'الرغبة في التعلم والبحث',
  ],
  assessmentCriteria: [
    'التقييم المستمر (40%): حضور، مشاركة، واجبات، عروض تقديمية',
    'الامتحان النهائي (60%): اختبار شامل لجميع الوحدات',
    'يجب الحصول على 50% على الأقل في كل من التقييم المستمر والامتحان النهائي',
  ],
};

/**
 * Get all units
 */
export function getAllUnits(): QuranModuleUnit[] {
  return quranModuleUnits;
}

/**
 * Get unit by ID
 */
export function getUnitById(unitId: string): QuranModuleUnit | undefined {
  return quranModuleUnits.find((u) => u.id === unitId);
}

/**
 * Get lesson by ID
 */
export function getLessonById(
  lessonId: string
): QuranModuleLesson | undefined {
  for (const unit of quranModuleUnits) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

/**
 * Get all resources
 */
export function getAllResources(): QuranModuleResource[] {
  return quranModuleResources;
}

/**
 * Get resources by category
 */
export function getResourcesByCategory(
  category: QuranModuleResource['category']
): QuranModuleResource[] {
  return quranModuleResources.filter((r) => r.category === category);
}

/**
 * Get total lessons count
 */
export function getTotalLessonsCount(): number {
  return quranModuleUnits.reduce((total, unit) => total + unit.lessons.length, 0);
}

/**
 * Get total estimated duration (in hours)
 */
export function getTotalEstimatedDuration(): number {
  const totalMinutes = quranModuleUnits.reduce(
    (total, unit) => total + unit.estimatedDuration,
    0
  );
  return Math.round(totalMinutes / 60);
}
