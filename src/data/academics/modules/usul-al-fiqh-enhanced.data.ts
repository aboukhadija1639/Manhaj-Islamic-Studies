/**
 * بيانات مقياس أصول الفقه المحسّنة - محتوى تفاعلي كامل مستخلص من محاضرات د. مصطفى باجو
 * Enhanced Principles of Jurisprudence (Usul al-Fiqh) Module - Complete Interactive Content
 */

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

export interface Citation {
  id: string;
  author: string;
  title: string;
  source: string;
  page?: string;
  volume?: string;
  year?: string;
  note?: string;
}

export interface Definition {
  id: string;
  term: string;
  termAr: string;
  linguistic: string;
  technical: string;
  examples?: string[];
  relatedTerms?: string[];
  citations: Citation[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'essay';
  questionAr: string;
  question: string;
  options?: string[];
  optionsAr?: string[];
  correctAnswer: string | number;
  correctAnswerAr?: string;
  explanation: string;
  explanationAr: string;
  difficulty: 'easy' | 'medium' | 'hard';
  relatedTopics: string[];
  citations: Citation[];
}

export interface Summary {
  id: string;
  titleAr: string;
  title: string;
  contentAr: string;
  content: string;
  keyPoints: string[];
  keyPointsAr: string[];
  citations: Citation[];
}

export interface AnimatedContent {
  id: string;
  titleAr: string;
  title: string;
  type: 'definition' | 'comparison' | 'hierarchy' | 'timeline' | 'flowchart';
  descriptionAr: string;
  description: string;
  animationDelay: number;
  elements: {
    id: string;
    labelAr: string;
    label: string;
    descriptionAr: string;
    description: string;
    color?: string;
  }[];
}

export interface Lesson {
  id: string;
  titleAr: string;
  title: string;
  descriptionAr: string;
  description: string;
  order: number;
  estimatedDuration: number;
  objectives: string[];
  objectivesAr: string[];
  definitions: Definition[];
  summary: Summary;
  animatedContent: AnimatedContent[];
  quizzes: QuizQuestion[];
  citations: Citation[];
}

export interface Unit {
  id: string;
  titleAr: string;
  title: string;
  descriptionAr: string;
  description: string;
  order: number;
  estimatedDuration: number;
  lessons: Lesson[];
}

// ============================================================================
// CITATIONS & REFERENCES
// ============================================================================

const citations = {
  mustafaBaju: {
    id: 'mustafa-baju-lectures',
    author: 'د. مصطفى باجو',
    title: 'محاضرات في مدخل إلى أصول الفقه الإسلامي',
    source: 'جامعة الأمير عبد القادر للعلوم الإسلامية',
    note: 'المصدر الرئيسي للمحتوى',
  } as Citation,

  ibmKhaldon: {
    id: 'ibn-khaldun-muqaddima',
    author: 'عبد الرحمن بن خلدون',
    title: 'مقدمة ابن خلدون',
    source: 'المقدمة',
    page: '435',
    year: '1377',
  } as Citation,
  
  ibmManzur: {
    id: 'ibn-manzur-lisan',
    author: 'محمد بن مكرم ابن منظور',
    title: 'لسان العرب',
    source: 'لسان العرب',
    volume: '11',
    page: '522',
    note: 'مادة: فقه، أصل',
  } as Citation,

  alJuwayni: {
    id: 'al-juwayni-burhan',
    author: 'عبد الملك بن عبد الله الجويني',
    title: 'البرهان في أصول الفقه',
    source: 'البرهان',
    volume: '1',
    page: '2',
  } as Citation,

  alShawkani: {
    id: 'al-shawkani-irshad',
    author: 'محمد بن علي الشوكاني',
    title: 'إرشاد الفحول إلى تحقيق الحق من علم الأصول',
    source: 'إرشاد الفحول',
    page: '2',
  } as Citation,

  alBaydawi: {
    id: 'al-baydawi-minhaj',
    author: 'ناصر الدين البيضاوي',
    title: 'منهاج الوصول إلى علم الأصول',
    source: 'منهاج الوصول',
  } as Citation,

  abdulKarimZaydan: {
    id: 'abdul-karim-zaydan-wajiz',
    author: 'د. عبد الكريم زيدان',
    title: 'الوجيز في أصول الفقه',
    source: 'الوجيز في أصول الفقه',
  } as Citation,

  alQuran: {
    id: 'quran-reference',
    author: 'القرآن الكريم',
    title: 'القرآن الكريم',
    source: 'القرآن الكريم',
  } as Citation,
};

// ============================================================================
// UNIT 1: INTRODUCTION TO USUL AL-FIQH
// ============================================================================

const unit1Lesson1: Lesson = {
  id: 'usul-u1-l1',
  titleAr: 'تعريف أصول الفقه وموضوعه',
  title: 'Definition and Subject of Usul al-Fiqh',
  descriptionAr: 'تعريف أصول الفقه بالاعتبارين الإضافي واللقبي، وموضوع العلم وغايته.',
  description: 'Definition of Usul al-Fiqh in both additive and nominal meanings, and the subject and purpose of the science.',
  order: 1,
  estimatedDuration: 60,
  objectivesAr: [
    'فهم تعريف أصول الفقه لغة واصطلاحاً',
    'التمييز بين المعنى الإضافي والمعنى اللقبي',
    'معرفة موضوع علم أصول الفقه وغايته',
  ],
  objectives: [
    'Understand the linguistic and technical definitions of Usul al-Fiqh',
    'Distinguish between additive and nominal meanings',
    'Know the subject and purpose of Usul al-Fiqh',
  ],
  definitions: [
    {
      id: 'def-asl',
      term: 'Asl (Root/Foundation)',
      termAr: 'الأصل',
      linguistic: 'ما يبنى عليه غيره، كأصل الجدار وأصل الشجرة.',
      technical: 'يطلق على الدليل، والقاعدة المستمرة، والراجح، والمقيس عليه.',
      examples: ['أصل الجدار (أساسه)', 'أصل الشجرة (جذعها)'],
      citations: [citations.ibmManzur, citations.mustafaBaju],
    },
    {
      id: 'def-fiqh-detailed',
      term: 'Fiqh (Jurisprudence)',
      termAr: 'الفقه',
      linguistic: 'الفهم الدقيق والعميق للشيء.',
      technical: 'العلم بالأحكام الشرعية العملية المكتسب من أدلتها التفصيلية.',
      citations: [citations.ibmManzur, citations.mustafaBaju],
    },
  ],
  summary: {
    id: 'sum-u1-l1',
    titleAr: 'ملخص تعريف أصول الفقه',
    title: 'Summary of Usul al-Fiqh Definition',
    contentAr: `أصول الفقه هو العلم بالقواعد التي يتوصل بها إلى استنباط الأحكام الشرعية العملية من أدلتها التفصيلية. موضوعه هو الأدلة الشرعية الكلية، وغايته الوصول إلى الأحكام الشرعية على وجه صحيح.`,
    content: `Usul al-Fiqh is the science of principles through which Islamic legal rulings are derived from their detailed evidence. Its subject is the general legal evidence, and its purpose is to reach correct legal rulings.`,
    keyPointsAr: [
      'الأصل لغة: ما يبنى عليه غيره',
      'الفقه لغة: الفهم الدقيق',
      'موضوع الأصول: الأدلة الكلية',
    ],
    keyPoints: [
      'Asl linguistically: What something is built upon',
      'Fiqh linguistically: Deep understanding',
      'Subject of Usul: General evidence',
    ],
    citations: [citations.mustafaBaju, citations.alBaydawi],
  },
  animatedContent: [
    {
      id: 'anim-u1-l1-def',
      titleAr: 'مكونات تعريف أصول الفقه',
      title: 'Components of Usul al-Fiqh Definition',
      type: 'definition',
      descriptionAr: 'توضيح المعنى الإضافي واللقبي لأصول الفقه',
      description: 'Illustrating the additive and nominal meanings of Usul al-Fiqh',
      animationDelay: 300,
      elements: [
        {
          id: 'elem-idafi',
          labelAr: 'المعنى الإضافي',
          label: 'Additive Meaning',
          descriptionAr: 'مركب من كلمتي (أصول) و (فقه)',
          description: 'Composed of the words (Usul) and (Fiqh)',
          color: '#4F46E5',
        },
        {
          id: 'elem-laqabi',
          labelAr: 'المعنى اللقبي',
          label: 'Nominal Meaning',
          descriptionAr: 'العلم ككل كفن مستقل',
          description: 'The science as a whole as an independent art',
          color: '#7C3AED',
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u1-l1-q1',
      type: 'multiple-choice',
      questionAr: 'ما هو موضوع علم أصول الفقه؟',
      question: 'What is the subject of Usul al-Fiqh?',
      optionsAr: [
        'الأدلة الشرعية الكلية',
        'الأحكام الشرعية الجزئية',
        'تاريخ التشريع الإسلامي',
        'اللغة العربية فقط',
      ],
      options: [
        'General legal evidence',
        'Specific legal rulings',
        'History of Islamic legislation',
        'Arabic language only',
      ],
      correctAnswer: 0,
      correctAnswerAr: 'الأدلة الشرعية الكلية',
      explanation: 'موضوع أصول الفقه هو الأدلة الكلية (مثل الأمر والنهي) وليس الأحكام الجزئية التي هي موضوع الفقه.',
      explanationAr: 'The subject of Usul al-Fiqh is general evidence (like commands and prohibitions), not specific rulings which are the subject of Fiqh.',
      difficulty: 'medium',
      relatedTopics: ['موضوع العلم'],
      citations: [citations.mustafaBaju],
    },
  ],
  citations: [citations.mustafaBaju, citations.ibmKhaldon],
};

const unit1Lesson2: Lesson = {
  id: 'usul-u1-l2',
  titleAr: 'نشأة علم أصول الفقه وتدوينه',
  title: 'Origins and Documentation of Usul al-Fiqh',
  descriptionAr: 'تاريخ العلم منذ عصر الصحابة حتى التدوين الرسمي مع الإمام الشافعي.',
  description: 'History of the science from the era of the Companions until formal documentation with Imam al-Shafi\'i.',
  order: 2,
  estimatedDuration: 60,
  objectivesAr: [
    'تتبع مراحل نشأة علم أصول الفقه',
    'معرفة دور الإمام الشافعي في تدوين العلم',
    'التعرف على كتاب الرسالة',
  ],
  objectives: [
    'Trace the stages of development of Usul al-Fiqh',
    'Know Imam al-Shafi\'i\'s role in documenting the science',
    'Recognize the book "Al-Risalah"',
  ],
  definitions: [
    {
      id: 'def-risalah',
      term: 'Al-Risalah',
      termAr: 'كتاب الرسالة',
      linguistic: 'A message or treatise.',
      technical: 'أول كتاب دون في علم أصول الفقه بشكل منهجي مستقل، ألفه الإمام الشافعي.',
      citations: [citations.mustafaBaju],
    },
  ],
  summary: {
    id: 'sum-u1-l2',
    titleAr: 'ملخص نشأة العلم',
    title: 'Summary of Science Origins',
    contentAr: `مر علم أصول الفقه بمراحل: عصر الصحابة (تطبيق عملي)، عصر التابعين (بداية التقعيد)، ثم التدوين الرسمي مع الإمام الشافعي في كتابه "الرسالة".`,
    content: `Usul al-Fiqh went through stages: Era of Companions (practical application), Era of Successors (beginning of systematization), then formal documentation with Imam al-Shafi'i in his book "Al-Risalah".`,
    keyPointsAr: [
      'الصحابة طبقوا الأصول بسليقتهم',
      'الإمام الشافعي هو أول من دون العلم',
      'كتاب الرسالة هو المرجع الأول',
    ],
    keyPoints: [
      'Companions applied principles naturally',
      'Imam al-Shafi\'i was the first to document the science',
      'Al-Risalah is the first reference',
    ],
    citations: [citations.mustafaBaju],
  },
  animatedContent: [
    {
      id: 'anim-u1-l2-stages',
      titleAr: 'مراحل تدوين أصول الفقه',
      title: 'Stages of Usul al-Fiqh Documentation',
      type: 'timeline',
      descriptionAr: 'تطور العلم من التطبيق إلى التدوين',
      description: 'Development of the science from application to documentation',
      animationDelay: 400,
      elements: [
        {
          id: 'stage-1',
          labelAr: 'عصر الصحابة',
          label: 'Companions',
          descriptionAr: 'تطبيق عملي سليقي',
          description: 'Natural practical application',
          color: '#059669',
        },
        {
          id: 'stage-2',
          labelAr: 'عصر التدوين',
          label: 'Documentation',
          descriptionAr: 'الإمام الشافعي وكتاب الرسالة',
          description: 'Imam al-Shafi\'i and Al-Risalah',
          color: '#7C3AED',
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u1-l2-q1',
      type: 'true-false',
      questionAr: 'يعتبر الإمام الشافعي أول من دون علم أصول الفقه بشكل مستقل.',
      question: 'Imam al-Shafi\'i is considered the first to document Usul al-Fiqh independently.',
      correctAnswer: 1,
      correctAnswerAr: 'صح',
      explanation: 'نعم، الإمام الشافعي هو واضع حجر الأساس لهذا العلم في كتابه الرسالة.',
      explanationAr: 'Yes, Imam al-Shafi\'i laid the foundation of this science in his book Al-Risalah.',
      difficulty: 'easy',
      relatedTopics: ['نشأة العلم'],
      citations: [citations.mustafaBaju],
    },
  ],
  citations: [citations.mustafaBaju],
};

export const unit1: Unit = {
  id: 'usul-unit-1',
  titleAr: 'الوحدة الأولى: مدخل إلى علم أصول الفقه',
  title: 'Unit 1: Introduction to Usul al-Fiqh',
  descriptionAr: 'تعريف العلم، موضوعه، غايته، ونشأته وتطوره.',
  description: 'Definition of the science, its subject, purpose, and development.',
  order: 1,
  estimatedDuration: 120,
  lessons: [unit1Lesson1, unit1Lesson2],
};

// ============================================================================
// UNIT 2: AL-HUKM AL-SHARI
// ============================================================================

const unit2Lesson1: Lesson = {
  id: 'usul-u2-l1',
  titleAr: 'الحكم التكليفي وأقسامه',
  title: 'Taklifi Ruling and Its Categories',
  descriptionAr: 'تعريف الحكم الشرعي وأقسام الحكم التكليفي الخمسة.',
  description: 'Definition of legal ruling and the five categories of taklifi ruling.',
  order: 1,
  estimatedDuration: 120,
  objectivesAr: [
    'تعريف الحكم الشرعي',
    'معرفة أقسام الحكم التكليفي الخمسة',
    'التمييز بين الواجب والمندوب والمحرم والمكروه والمباح',
  ],
  objectives: [
    'Define legal ruling',
    'Know the five categories of taklifi ruling',
    'Distinguish between Wajib, Mandub, Haram, Makruh, and Mubah',
  ],
  definitions: [
    {
      id: 'def-hukm',
      term: 'Legal Ruling (Hukm)',
      termAr: 'الحكم الشرعي',
      linguistic: 'The judgment or ruling.',
      technical: 'خطاب الله المتعلق بأفعال المكلفين بالاقتضاء أو التخيير أو الوضع.',
      citations: [citations.mustafaBaju, citations.alJuwayni],
    },
  ],
  summary: {
    id: 'sum-u2-l1',
    titleAr: 'ملخص الحكم التكليفي',
    title: 'Summary of Taklifi Ruling',
    contentAr: `ينقسم الحكم التكليفي إلى خمسة: الواجب (طلب جازم)، المندوب (طلب غير جازم)، المحرم (نهي جازم)، المكروه (نهي غير جازم)، والمباح (تخيير).`,
    content: `Taklifi ruling is divided into five: Wajib (binding demand), Mandub (non-binding demand), Haram (binding prohibition), Makruh (non-binding prohibition), and Mubah (choice).`,
    keyPointsAr: [
      'الواجب يثاب فاعله ويعاقب تاركه',
      'المحرم يعاقب فاعله ويثاب تاركه',
      'المباح لا ثواب ولا عقاب فيه لذاته',
    ],
    keyPoints: [
      'Wajib: Reward for doing, punishment for leaving',
      'Haram: Punishment for doing, reward for leaving',
      'Mubah: No reward or punishment in itself',
    ],
    citations: [citations.mustafaBaju],
  },
  animatedContent: [
    {
      id: 'anim-u2-l1-comp',
      titleAr: 'الأحكام التكليفية الخمسة',
      title: 'The Five Taklifi Rulings',
      type: 'comparison',
      descriptionAr: 'مقارنة بين الأحكام من حيث الطلب والترك',
      description: 'Comparison between rulings in terms of demand and abstention',
      animationDelay: 500,
      elements: [
        { id: 'wajib', labelAr: 'الواجب', label: 'Wajib', descriptionAr: 'فعل جازم', description: 'Binding do', color: '#DC2626' },
        { id: 'haram', labelAr: 'المحرم', label: 'Haram', descriptionAr: 'ترك جازم', description: 'Binding don\'t', color: '#8B5CF6' },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u2-l1-q1',
      type: 'fill-blank',
      questionAr: 'ما طلب الشارع فعله طلباً غير جازم يسمى _______ .',
      question: 'What the Lawgiver encouraged without binding obligation is called _______ .',
      correctAnswer: 'مندوب',
      correctAnswerAr: 'مندوب',
      explanation: 'المندوب هو ما طلب الشارع فعله طلباً غير جازم، ويثاب فاعله ولا يعاقب تاركه.',
      explanationAr: 'Mandub is what the Lawgiver encouraged without binding obligation; the doer is rewarded and the leaver is not punished.',
      difficulty: 'easy',
      relatedTopics: ['المندوب'],
      citations: [citations.mustafaBaju],
    },
  ],
  citations: [citations.mustafaBaju],
};

const unit2Lesson2: Lesson = {
  id: 'usul-u2-l2',
  titleAr: 'الحكم الوضعي وأقسامه',
  title: 'Wadi\'i Ruling and Its Categories',
  descriptionAr: 'دراسة السبب والشرط والمانع والصحة والبطلان.',
  description: 'Study of Cause, Condition, Impediment, Validity, and Invalidity.',
  order: 2,
  estimatedDuration: 120,
  objectivesAr: [
    'فهم معنى الحكم الوضعي',
    'التمييز بين السبب والشرط والمانع',
    'معرفة آثار الصحة والبطلان',
  ],
  objectives: [
    'Understand the meaning of Wadi\'i ruling',
    'Distinguish between Cause, Condition, and Impediment',
    'Know the effects of Validity and Invalidity',
  ],
  definitions: [
    {
      id: 'def-sabab-detailed',
      term: 'Cause (Sabab)',
      termAr: 'السبب',
      linguistic: 'ما يتوصل به إلى غيره.',
      technical: 'ما يلزم من وجوده الوجود ومن عدمه العدم لذاته.',
      examples: ['دلوك الشمس سبب لوجوب الظهر'],
      citations: [citations.mustafaBaju],
    },
  ],
  summary: {
    id: 'sum-u2-l2',
    titleAr: 'ملخص الحكم الوضعي',
    title: 'Summary of Wadi\'i Ruling',
    contentAr: `الحكم الوضعي يشمل السبب والشرط والمانع. السبب يؤدي للحكم، الشرط يلزم لصحته، والمانع يمنع ترتبه.`,
    content: `Wadi'i ruling includes Cause, Condition, and Impediment. Cause leads to the ruling, Condition is necessary for its validity, and Impediment prevents its occurrence.`,
    keyPointsAr: [
      'السبب: وجوده يوجب الحكم',
      'الشرط: عدمه يمنع الحكم',
      'المانع: وجوده يمنع الحكم',
    ],
    keyPoints: [
      'Cause: Its existence necessitates the ruling',
      'Condition: Its absence prevents the ruling',
      'Impediment: Its existence prevents the ruling',
    ],
    citations: [citations.mustafaBaju],
  },
  animatedContent: [
    {
      id: 'anim-u2-l2-flow',
      titleAr: 'علاقة الحكم الوضعي بالتكليفي',
      title: 'Relation between Wadi\'i and Taklifi Rulings',
      type: 'flowchart',
      descriptionAr: 'كيف تؤثر الأسباب والشروط على الأحكام',
      description: 'How causes and conditions affect rulings',
      animationDelay: 600,
      elements: [
        { id: 'sabab', labelAr: 'السبب', label: 'Cause', descriptionAr: 'يؤدي للحكم', description: 'Leads to ruling', color: '#EF4444' },
        { id: 'shart', labelAr: 'الشرط', label: 'Condition', descriptionAr: 'يصحح الحكم', description: 'Validates ruling', color: '#3B82F6' },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u2-l2-q1',
      type: 'multiple-choice',
      questionAr: 'ما يلزم من عدمه العدم ولا يلزم من وجوده وجود ولا عدم لذاته هو:',
      question: 'What necessitates non-existence by its non-existence but not existence by its existence is:',
      optionsAr: ['السبب', 'الشرط', 'المانع', 'المباح'],
      options: ['Cause', 'Condition', 'Impediment', 'Mubah'],
      correctAnswer: 1,
      correctAnswerAr: 'الشرط',
      explanation: 'هذا هو تعريف الشرط، مثل الوضوء للصلاة؛ فعدم الوضوء يمنع الصلاة، لكن وجوده لا يوجبها.',
      explanationAr: 'This is the definition of a condition, like wudu for prayer; its absence prevents prayer, but its presence doesn\'t necessitate it.',
      difficulty: 'hard',
      relatedTopics: ['الشرط'],
      citations: [citations.mustafaBaju],
    },
  ],
  citations: [citations.mustafaBaju],
};

export const unit2: Unit = {
  id: 'usul-unit-2',
  titleAr: 'الوحدة الثانية: مباحث الحكم الشرعي',
  title: 'Unit 2: Islamic Legal Rulings',
  descriptionAr: 'دراسة الحكم التكليفي والوضعي وأقسامهما.',
  description: 'Study of Taklifi and Wadi\'i rulings and their categories.',
  order: 2,
  estimatedDuration: 240,
  lessons: [unit2Lesson1, unit2Lesson2],
};

// ============================================================================
// EXPORT ALL DATA
// ============================================================================

export const usulModuleUnitsEnhanced: Unit[] = [unit1, unit2];

export const usulModuleAllCitations = citations;

export const usulModuleStatistics = {
  totalUnits: usulModuleUnitsEnhanced.length,
  totalLessons: usulModuleUnitsEnhanced.reduce((sum, unit) => sum + unit.lessons.length, 0),
  totalDefinitions: usulModuleUnitsEnhanced.reduce(
    (sum, unit) => sum + unit.lessons.reduce((lsum, lesson) => lsum + lesson.definitions.length, 0),
    0
  ),
  totalQuizzes: usulModuleUnitsEnhanced.reduce(
    (sum, unit) => sum + unit.lessons.reduce((lsum, lesson) => lsum + lesson.quizzes.length, 0),
    0
  ),
  totalEstimatedHours: Math.round(
    usulModuleUnitsEnhanced.reduce((sum, unit) => sum + unit.estimatedDuration, 0) / 60
  ),
};
