/**
 * بيانات مقياس أصول الفقه - محتوى كامل
 * Principles of Jurisprudence (Usul al-Fiqh) Module - Complete Content Data
 * 
 * هذا الملف يحتوي على البيانات الكاملة لمقياس أصول الفقه
 * بما في ذلك الوحدات، الدروس، والموارد
 */

export interface UsulModuleUnit {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: number; // in minutes
  lessons: UsulModuleLesson[];
}

export interface UsulModuleLesson {
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

export interface UsulModuleResource {
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
 * الوحدات التعليمية لمقياس أصول الفقه
 */
export const usulModuleUnits: UsulModuleUnit[] = [
  {
    id: 'usul-unit-1-intro',
    title: 'الوحدة الأولى: مدخل إلى علم أصول الفقه',
    description: 'تعريف أصول الفقه، موضوعه، غايته، ونشأته وتطوره.',
    order: 1,
    estimatedDuration: 180,
    lessons: [
      {
        id: 'usul-lesson-1-1',
        title: 'تعريف أصول الفقه ومبادئه',
        description: 'تعريف أصول الفقه لغة واصطلاحاً، والفرق بينه وبين الفقه.',
        order: 1,
        type: 'md',
        contentPath: '/content/usul-al-fiqh/unit-1/lesson-1.md',
        estimatedDuration: 60,
        objectives: ['تعريف أصول الفقه', 'معرفة موضوع العلم', 'فهم استمداد العلم'],
        keywords: ['تعريف', 'أصول الفقه', 'مبادئ'],
      },
      {
        id: 'usul-lesson-1-2',
        title: 'نشأة علم أصول الفقه وتدوينه',
        description: 'تاريخ العلم منذ عصر الصحابة حتى التدوين الرسمي مع الإمام الشافعي.',
        order: 2,
        type: 'md',
        contentPath: '/content/usul-al-fiqh/unit-1/lesson-2.md',
        estimatedDuration: 60,
        objectives: ['تتبع تاريخ العلم', 'معرفة أول من دون في الأصول', 'فهم طرق التأليف'],
        keywords: ['تاريخ', 'تدوين', 'الشافعي', 'الرسالة'],
      },
    ],
  },
  {
    id: 'usul-unit-2-rulings',
    title: 'الوحدة الثانية: الحكم الشرعي',
    description: 'دراسة الحكم التكليفي والحكم الوضعي وأقسامهما.',
    order: 2,
    estimatedDuration: 240,
    lessons: [
      {
        id: 'usul-lesson-2-1',
        title: 'الحكم التكليفي',
        description: 'أقسام الحكم التكليفي الخمسة: الواجب، المندوب، المحرم، المكروه، المباح.',
        order: 1,
        type: 'md',
        contentPath: '/content/usul-al-fiqh/unit-2/lesson-1.md',
        estimatedDuration: 120,
        objectives: ['معرفة أقسام الحكم التكليفي', 'فهم الفروق بين الأحكام'],
        keywords: ['واجب', 'محرم', 'مباح', 'تكليف'],
      },
      {
        id: 'usul-lesson-2-2',
        title: 'الحكم الوضعي',
        description: 'أقسام الحكم الوضعي: السبب، الشرط، المانع، الصحة، البطلان.',
        order: 2,
        type: 'md',
        contentPath: '/content/usul-al-fiqh/unit-2/lesson-2.md',
        estimatedDuration: 120,
        objectives: ['فهم الحكم الوضعي', 'التمييز بين السبب والشرط'],
        keywords: ['سبب', 'شرط', 'مانع', 'صحة'],
      },
    ],
  },
  {
    id: 'usul-unit-3-sources',
    title: 'الوحدة الثالثة: الأدلة الشرعية (المصادر)',
    description: 'دراسة الأدلة المتفق عليها والأدلة المختلف فيها.',
    order: 3,
    estimatedDuration: 300,
    lessons: [
      {
        id: 'usul-lesson-3-1',
        title: 'القرآن الكريم والسنة النبوية',
        description: 'حجية الكتاب والسنة ومنزلتهما في التشريع.',
        order: 1,
        type: 'md',
        contentPath: '/content/usul-al-fiqh/unit-3/lesson-1.md',
        estimatedDuration: 100,
        objectives: ['إثبات حجية القرآن', 'فهم حجية السنة'],
        keywords: ['قرآن', 'سنة', 'حجية'],
      },
      {
        id: 'usul-lesson-3-2',
        title: 'الإجماع والقياس',
        description: 'تعريف الإجماع والقياس وأركانهما وشروطهما.',
        order: 2,
        type: 'md',
        contentPath: '/content/usul-al-fiqh/unit-3/lesson-2.md',
        estimatedDuration: 100,
        objectives: ['فهم أركان القياس', 'معرفة أنواع الإجماع'],
        keywords: ['إجماع', 'قياس', 'علة'],
      },
      {
        id: 'usul-lesson-3-3',
        title: 'الأدلة التبعية (المختلف فيها)',
        description: 'الاستصحاب، المصالح المرسلة، سد الذرائع، عرف، قول الصحابي.',
        order: 3,
        type: 'md',
        contentPath: '/content/usul-al-fiqh/unit-3/lesson-3.md',
        estimatedDuration: 100,
        objectives: ['التعرف على الأدلة التبعية', 'فهم مواضع الخلاف'],
        keywords: ['استصحاب', 'مصلحة', 'عرف'],
      },
    ],
  },
];

/**
 * الموارد التعليمية لمقياس أصول الفقه
 */
export const usulModuleResources: UsulModuleResource[] = [
  {
    id: 'usul-res-1',
    title: 'الورقات في أصول الفقه - الجويني',
    type: 'book',
    description: 'متن مختصر ومبارك في أصول الفقه، يعتبر مدخلاً أساسياً لطلاب العلم.',
    author: 'إمام الحرمين الجويني',
    category: 'textbook',
  },
  {
    id: 'usul-res-2',
    title: 'مذكرة أصول الفقه - الشنقيطي',
    type: 'book',
    description: 'شرح ميسر وقوي على روضة الناظر، يتميز بالدقة والوضوح.',
    author: 'محمد الأمين الشنقيطي',
    category: 'reference',
  },
  {
    id: 'usul-res-3',
    title: 'الوجيز في أصول الفقه - عبد الكريم زيدان',
    type: 'book',
    description: 'كتاب معاصر يجمع بين الأصالة والمعاصرة في عرض المادة الأصولية.',
    author: 'د. عبد الكريم زيدان',
    category: 'textbook',
  },
  {
    id: 'usul-res-4',
    title: 'أصول الفقه الذي لا يسع الفقيه جهله',
    type: 'pdf',
    description: 'ملخص مركز لأهم القواعد الأصولية.',
    author: 'د. عياض السلمي',
    category: 'supplementary',
  },
];

/**
 * معلومات عامة عن المقياس
 */
export const usulModuleOverview = {
  importance:
    'يعد علم أصول الفقه من أهم العلوم الآلية التي تضبط منهجية الاستنباط لدى الفقيه، وهو العلم الذي يبحث في أدلة الفقه الإجمالية وكيفية الاستفادة منها وحال المستفيد. بدونه يظل الفقه مجرد فروع مبعثرة لا رابط بينها.',
  objectives: [
    'فهم منهجية استنباط الأحكام الشرعية من أدلتها',
    'التعرف على القواعد الأصولية الكلية وتطبيقاتها',
    'التمييز بين الأدلة المتفق عليها والمختلف فيها',
    'بناء الملكة الفقهية لدى الطالب',
  ],
  outcomes: [
    'القدرة على ربط الفروع الفقهية بأصولها',
    'فهم أسباب اختلاف الفقهاء',
    'التمكن من استخدام الأدلة الشرعية في الاستدلال',
  ],
  prerequisites: [
    'مدخل إلى الفقه الإسلامي',
    'اللغة العربية (النحو والصرف)',
  ],
  assessmentCriteria: [
    'التقييم المستمر (40%): حضور، مشاركة، اختبارات قصيرة',
    'الامتحان النهائي (60%): اختبار شامل للمقرر',
  ],
};
