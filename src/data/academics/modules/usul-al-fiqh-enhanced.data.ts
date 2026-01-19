/**
 * بيانات مقياس أصول الفقه المحسّنة - محتوى تفاعلي كامل
 * Enhanced Principles of Jurisprudence (Usul al-Fiqh) Module - Complete Interactive Content
 * 
 * المصدر: محاضرات في مدخل إلى أصول الفقه الإسلامي
 * د. مصطفى باجو - جامعة الأمير عبد القادر للعلوم الإسلامية
 * 
 * Source: Lectures in Introduction to Islamic Jurisprudence Principles
 * Dr. Mustafa Baju - Prince Abdulqader University for Islamic Sciences
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
  ibmKhaldon: {
    id: 'ibn-khaldun-muqaddima',
    author: 'عبد الرحمن بن خلدون',
    title: 'مقدمة ابن خلدون',
    source: 'المقدمة',
    page: '435',
    year: '1377',
    note: 'المرجع الأساسي لتعريف أصول الفقه',
  } as Citation,
  
  ibmManzur: {
    id: 'ibn-manzur-lisan',
    author: 'محمد بن مكرم ابن منظور',
    title: 'لسان العرب',
    source: 'لسان العرب',
    volume: '11',
    page: '522',
    note: 'مادة: فقه',
  } as Citation,

  ibmQayyim: {
    id: 'ibn-qayyim-ialam',
    author: 'محمد بن أبي بكر ابن القيم الجوزية',
    title: 'إعلام الموقعين عن رب العالمين',
    source: 'إعلام الموقعين',
    volume: '1',
    page: '214',
  } as Citation,

  alGhazali: {
    id: 'al-ghazali-mustasfa',
    author: 'أبو حامد محمد بن محمد الغزالي',
    title: 'المستصفى من علم الأصول',
    source: 'المستصفى',
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

  alShatibi: {
    id: 'al-shatibi-muwafaqat',
    author: 'إبراهيم بن موسى الشاطبي',
    title: 'الموافقات في أصول الشريعة',
    source: 'الموافقات',
  } as Citation,

  alShanqiti: {
    id: 'al-shanqiti-mudhakkira',
    author: 'محمد الأمين الشنقيطي',
    title: 'مذكرة في أصول الفقه',
    source: 'مذكرة أصول الفقه',
  } as Citation,

  abdulKarimZaydan: {
    id: 'abdul-karim-zaydan-wajiz',
    author: 'د. عبد الكريم زيدان',
    title: 'الوجيز في أصول الفقه',
    source: 'الوجيز في أصول الفقه',
  } as Citation,

  alQur'an: {
    id: 'quran-reference',
    author: 'القرآن الكريم',
    title: 'القرآن الكريم',
    source: 'القرآن الكريم',
    note: 'الآيات المذكورة في المحاضرات',
  } as Citation,

  hadith: {
    id: 'hadith-reference',
    author: 'السنة النبوية',
    title: 'صحيح البخاري وصحيح مسلم',
    source: 'الأحاديث الشريفة',
  } as Citation,
};

// ============================================================================
// UNIT 1: INTRODUCTION TO USUL AL-FIQH
// ============================================================================

const unit1Lesson1: Lesson = {
  id: 'usul-u1-l1',
  titleAr: 'تعريف أصول الفقه ومبادئه',
  title: 'Definition of Usul al-Fiqh and Its Principles',
  descriptionAr: 'تعريف أصول الفقه لغة واصطلاحاً، والفرق بينه وبين الفقه، وموضوع العلم وغايته.',
  description: 'Linguistic and technical definitions of Usul al-Fiqh, differences from Fiqh, and the subject and purpose of the science.',
  order: 1,
  estimatedDuration: 60,
  objectivesAr: [
    'فهم تعريف أصول الفقه بمعنييه الإضافي واللقبي',
    'التمييز بين أصول الفقه والفقه',
    'معرفة موضوع العلم وغايته',
    'فهم أهمية دراسة أصول الفقه',
  ],
  objectives: [
    'Understand the definition of Usul al-Fiqh in both additive and nominal meanings',
    'Distinguish between Usul al-Fiqh and Fiqh',
    'Know the subject and purpose of the science',
    'Understand the importance of studying Usul al-Fiqh',
  ],
  definitions: [
    {
      id: 'def-usul',
      term: 'Usul (Principles)',
      termAr: 'الأصول',
      linguistic: 'What something is built upon; foundation. The plural of "asl" (root).',
      technical: 'In Islamic jurisprudence, refers to the foundational rules and evidence from which legal rulings are derived.',
      examples: [
        'The root of a tree (from which branches grow)',
        'The foundation of a building',
        'The principles of a science',
      ],
      relatedTerms: ['Furu (branches)', 'Dalalah (indication)', 'Hujjah (proof)'],
      citations: [citations.ibmManzur, citations.ibmKhaldon],
    },
    {
      id: 'def-fiqh',
      term: 'Fiqh (Jurisprudence)',
      termAr: 'الفقه',
      linguistic: 'Deep understanding and comprehension of something.',
      technical: 'Knowledge of practical Islamic legal rulings derived from their detailed evidence.',
      examples: [
        'Understanding the rulings of prayer (Salah)',
        'Comprehending the laws of commerce and transactions',
      ],
      relatedTerms: ['Istinbat (derivation)', 'Ahkam (rulings)', 'Adillah (evidence)'],
      citations: [citations.ibmManzur, citations.ibmQayyim],
    },
  ],
  summary: {
    id: 'sum-u1-l1',
    titleAr: 'ملخص الدرس الأول',
    title: 'Summary of Lesson One',
    contentAr: `أصول الفقه هو العلم الذي يبحث في القواعد الكلية والأدلة الإجمالية التي يستنبط منها الفقيه الأحكام الشرعية. يختلف أصول الفقه عن الفقه في أن الأول يبحث في القواعد والأدلة الكلية، بينما الثاني يبحث في الأحكام الجزئية. أهمية دراسة أصول الفقه تكمن في أنها تضبط منهجية الاستنباط وتحمي الفقيه من الخطأ في الاستدلال.`,
    content: `Usul al-Fiqh is the science that investigates the general principles and comprehensive evidence from which jurists derive Islamic legal rulings. Usul al-Fiqh differs from Fiqh in that the former examines general principles and evidence, while the latter examines specific rulings. The importance of studying Usul al-Fiqh lies in regulating the methodology of derivation and protecting the jurist from error in reasoning.`,
    keyPointsAr: [
      'أصول الفقه = القواعد الكلية + الأدلة الإجمالية',
      'الفقه = الأحكام الجزئية المستنبطة',
      'العلاقة بينهما: الأصول هي الأساس والفقه هو الفرع',
    ],
    keyPoints: [
      'Usul al-Fiqh = General principles + Comprehensive evidence',
      'Fiqh = Derived specific rulings',
      'Relationship: Usul are the foundation, Fiqh are the branches',
    ],
    citations: [citations.ibmKhaldon, citations.alJuwayni],
  },
  animatedContent: [
    {
      id: 'anim-u1-l1-hierarchy',
      titleAr: 'العلاقة بين أصول الفقه والفقه',
      title: 'Relationship between Usul al-Fiqh and Fiqh',
      type: 'hierarchy',
      descriptionAr: 'توضيح الهرمية والعلاقة بين أصول الفقه كأساس والفقه كفروع',
      description: 'Illustrating the hierarchy and relationship between Usul al-Fiqh as foundation and Fiqh as branches',
      animationDelay: 300,
      elements: [
        {
          id: 'elem-usul',
          labelAr: 'أصول الفقه',
          label: 'Usul al-Fiqh',
          descriptionAr: 'القواعد الكلية والأدلة الإجمالية',
          description: 'General principles and comprehensive evidence',
          color: '#4F46E5',
        },
        {
          id: 'elem-fiqh',
          labelAr: 'الفقه',
          label: 'Fiqh',
          descriptionAr: 'الأحكام الجزئية المستنبطة',
          description: 'Derived specific rulings',
          color: '#7C3AED',
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u1-l1-q1',
      type: 'multiple-choice',
      questionAr: 'ما هو تعريف أصول الفقه اللقبي (الاصطلاحي)؟',
      question: 'What is the technical definition of Usul al-Fiqh?',
      optionsAr: [
        'العلم بالقواعد التي يتوصل بها إلى استنباط الأحكام الشرعية من أدلتها التفصيلية',
        'معرفة الأحكام الشرعية الجزئية',
        'دراسة تاريخ الفقه الإسلامي',
        'حفظ الأحاديث الشريفة',
      ],
      options: [
        'The science of principles through which Islamic legal rulings are derived from their detailed evidence',
        'Knowledge of specific Islamic legal rulings',
        'Study of the history of Islamic jurisprudence',
        'Memorization of prophetic traditions',
      ],
      correctAnswer: 0,
      correctAnswerAr: 'العلم بالقواعد التي يتوصل بها إلى استنباط الأحكام الشرعية من أدلتها التفصيلية',
      explanation: 'This is the most accurate technical definition as it encompasses both the principles (rules) and the process of derivation.',
      explanationAr: 'هذا هو التعريف الاصطلاحي الأدق لأنه يشمل القواعد وعملية الاستنباط معاً.',
      difficulty: 'easy',
      relatedTopics: ['تعريف أصول الفقه', 'موضوع العلم'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
    {
      id: 'quiz-u1-l1-q2',
      type: 'true-false',
      questionAr: 'أصول الفقه والفقه مترادفان ولهما نفس المعنى',
      question: 'Usul al-Fiqh and Fiqh are synonymous and have the same meaning',
      correctAnswer: 0,
      correctAnswerAr: 'خطأ',
      explanation: 'They are not synonymous. Usul al-Fiqh deals with general principles and evidence, while Fiqh deals with specific derived rulings.',
      explanationAr: 'هما ليسا مترادفين. أصول الفقه يتناول القواعد والأدلة الكلية، بينما الفقه يتناول الأحكام الجزئية المستنبطة.',
      difficulty: 'easy',
      relatedTopics: ['الفرق بين أصول الفقه والفقه'],
      citations: [citations.ibmKhaldon],
    },
  ],
  citations: [citations.ibmKhaldon, citations.ibmManzur, citations.alJuwayni],
};

const unit1Lesson2: Lesson = {
  id: 'usul-u1-l2',
  titleAr: 'نشأة علم أصول الفقه وتدوينه',
  title: 'Origins and Documentation of Usul al-Fiqh',
  descriptionAr: 'تاريخ نشأة العلم منذ عصر الصحابة حتى التدوين الرسمي مع الإمام الشافعي.',
  description: 'History of the science from the era of the Companions until formal documentation with Imam al-Shafi\'i.',
  order: 2,
  estimatedDuration: 60,
  objectivesAr: [
    'تتبع مراحل نشأة علم أصول الفقه',
    'معرفة دور الصحابة والتابعين في تطور العلم',
    'فهم دور الإمام الشافعي في تدوين الأصول',
    'التعرف على المدارس الأصولية الرئيسية',
  ],
  objectives: [
    'Trace the stages of development of Usul al-Fiqh',
    'Understand the role of Companions and Successors in the science\'s development',
    'Comprehend Imam al-Shafi\'i\'s role in documenting the principles',
    'Recognize the main jurisprudential schools',
  ],
  definitions: [
    {
      id: 'def-tawthiq',
      term: 'Documentation (Tawthiq)',
      termAr: 'التوثيق',
      linguistic: 'Recording and preserving information in written form.',
      technical: 'The formal compilation and organization of jurisprudential principles into systematic treatises.',
      examples: [
        'Al-Shafi\'i\'s compilation of Usul al-Fiqh in his work "Al-Risalah"',
        'Later scholars\' organization of jurisprudential methodology',
      ],
      relatedTerms: ['Tadwin (compilation)', 'Taalif (authoring)'],
      citations: [citations.alJuwayni],
    },
  ],
  summary: {
    id: 'sum-u1-l2',
    titleAr: 'ملخص الدرس الثاني',
    title: 'Summary of Lesson Two',
    contentAr: `نشأ علم أصول الفقه بشكل تدريجي عبر ثلاث مراحل رئيسية: المرحلة الأولى (عصر الصحابة) كانت تطبيقاً عملياً دون تدوين، والمرحلة الثانية (عصر التابعين) شهدت ظهور الحاجة للتقعيد والتنظير، والمرحلة الثالثة (التدوين الرسمي) بدأت مع الإمام الشافعي الذي ألف كتاب "الرسالة" وهو يعتبر أول تدوين منهجي لأصول الفقه.`,
    content: `Usul al-Fiqh developed gradually through three main stages: The first stage (era of Companions) was practical application without documentation; the second stage (era of Successors) witnessed the emergence of the need for systematization and theorization; and the third stage (formal documentation) began with Imam al-Shafi\'i, who authored "Al-Risalah," considered the first systematic compilation of Usul al-Fiqh.`,
    keyPointsAr: [
      'المرحلة الأولى: التطبيق العملي (عصر الصحابة)',
      'المرحلة الثانية: التنظير والتقعيد (عصر التابعين)',
      'المرحلة الثالثة: التدوين الرسمي (الإمام الشافعي)',
    ],
    keyPoints: [
      'First Stage: Practical Application (Era of Companions)',
      'Second Stage: Theorization and Systematization (Era of Successors)',
      'Third Stage: Formal Documentation (Imam al-Shafi\'i)',
    ],
    citations: [citations.alJuwayni, citations.alShawkani],
  },
  animatedContent: [
    {
      id: 'anim-u1-l2-timeline',
      titleAr: 'مراحل تطور علم أصول الفقه',
      title: 'Stages of Development of Usul al-Fiqh',
      type: 'timeline',
      descriptionAr: 'خط زمني يوضح تطور علم أصول الفقه عبر العصور',
      description: 'Timeline showing the development of Usul al-Fiqh through the ages',
      animationDelay: 400,
      elements: [
        {
          id: 'stage-1',
          labelAr: 'عصر الصحابة',
          label: 'Era of Companions',
          descriptionAr: 'التطبيق العملي للأصول دون تدوين',
          description: 'Practical application of principles without documentation',
          color: '#059669',
        },
        {
          id: 'stage-2',
          labelAr: 'عصر التابعين',
          label: 'Era of Successors',
          descriptionAr: 'بداية التنظير والتقعيد',
          description: 'Beginning of theorization and systematization',
          color: '#0891B2',
        },
        {
          id: 'stage-3',
          labelAr: 'الإمام الشافعي',
          label: 'Imam al-Shafi\'i',
          descriptionAr: 'التدوين الرسمي في كتاب الرسالة',
          description: 'Formal documentation in "Al-Risalah"',
          color: '#7C3AED',
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u1-l2-q1',
      type: 'multiple-choice',
      questionAr: 'من هو أول من دون علم أصول الفقه بشكل منهجي مستقل؟',
      question: 'Who was the first to systematically document Usul al-Fiqh independently?',
      optionsAr: [
        'الإمام الشافعي',
        'الإمام مالك',
        'الإمام أبو حنيفة',
        'الإمام أحمد بن حنبل',
      ],
      options: [
        'Imam al-Shafi\'i',
        'Imam Malik',
        'Imam Abu Hanifah',
        'Imam Ahmad ibn Hanbal',
      ],
      correctAnswer: 0,
      correctAnswerAr: 'الإمام الشافعي',
      explanation: 'Imam al-Shafi\'i authored "Al-Risalah," which is recognized as the first systematic compilation of Usul al-Fiqh principles.',
      explanationAr: 'الإمام الشافعي ألف كتاب الرسالة الذي يعتبر أول تدوين منهجي لأصول الفقه.',
      difficulty: 'easy',
      relatedTopics: ['التدوين الرسمي', 'الإمام الشافعي'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
  ],
  citations: [citations.alJuwayni, citations.alShawkani],
};

export const unit1: Unit = {
  id: 'usul-unit-1',
  titleAr: 'الوحدة الأولى: مدخل إلى علم أصول الفقه',
  title: 'Unit 1: Introduction to Usul al-Fiqh',
  descriptionAr: 'تعريف أصول الفقه، موضوعه، غايته، ونشأته وتطوره عبر العصور الإسلامية.',
  description: 'Definition of Usul al-Fiqh, its subject, purpose, and development through Islamic history.',
  order: 1,
  estimatedDuration: 120,
  lessons: [unit1Lesson1, unit1Lesson2],
};

// ============================================================================
// UNIT 2: AL-HUKM AL-SHARI (ISLAMIC LEGAL RULINGS)
// ============================================================================

const unit2Lesson1: Lesson = {
  id: 'usul-u2-l1',
  titleAr: 'الحكم التكليفي',
  title: 'Taklifi Rulings (Obligatory Rulings)',
  descriptionAr: 'أقسام الحكم التكليفي الخمسة: الواجب، المندوب، المحرم، المكروه، المباح.',
  description: 'Five categories of obligatory rulings: Obligatory, Recommended, Prohibited, Disliked, Permissible.',
  order: 1,
  estimatedDuration: 120,
  objectivesAr: [
    'معرفة أقسام الحكم التكليفي الخمسة',
    'فهم الفروق بين الأحكام التكليفية',
    'تطبيق الأحكام على الحالات العملية',
    'معرفة الآثار المترتبة على كل حكم',
  ],
  objectives: [
    'Know the five categories of obligatory rulings',
    'Understand the differences between obligatory rulings',
    'Apply rulings to practical cases',
    'Know the consequences of each ruling',
  ],
  definitions: [
    {
      id: 'def-wajib',
      term: 'Obligatory (Wajib)',
      termAr: 'الواجب',
      linguistic: 'That which is necessary and must be done.',
      technical: 'What the Lawgiver has commanded to be done with a binding command.',
      examples: [
        'Prayer (Salah) is obligatory for every Muslim',
        'Fasting during Ramadan is obligatory',
        'Paying Zakat is obligatory',
      ],
      relatedTerms: ['Fard (duty)', 'Dharuri (necessary)'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
    {
      id: 'def-mandub',
      term: 'Recommended (Mandub)',
      termAr: 'المندوب',
      linguistic: 'That which is encouraged or suggested.',
      technical: 'What the Lawgiver has encouraged to be done without binding obligation.',
      examples: [
        'Performing additional voluntary prayers',
        'Giving extra charity beyond Zakat',
      ],
      relatedTerms: ['Mustahabb (desirable)', 'Nafl (supererogatory)'],
      citations: [citations.alJuwayni],
    },
    {
      id: 'def-haram',
      term: 'Prohibited (Haram)',
      termAr: 'المحرم',
      linguistic: 'That which is forbidden and must be avoided.',
      technical: 'What the Lawgiver has forbidden with a binding prohibition.',
      examples: [
        'Consuming alcohol is prohibited',
        'Stealing is prohibited',
        'Lying is prohibited',
      ],
      relatedTerms: ['Muharram (forbidden)', 'Qat\'i (definitive)'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
    {
      id: 'def-makruh',
      term: 'Disliked (Makruh)',
      termAr: 'المكروه',
      linguistic: 'That which is disliked or unpleasant.',
      technical: 'What the Lawgiver has discouraged without binding prohibition.',
      examples: [
        'Excessive talking is disliked',
        'Certain times for prayer are disliked',
      ],
      relatedTerms: ['Tanz\'ih (impropriety)', 'Makruh Tahrimi (strongly disliked)'],
      citations: [citations.alJuwayni],
    },
    {
      id: 'def-mubah',
      term: 'Permissible (Mubah)',
      termAr: 'المباح',
      linguistic: 'That which is allowed and permitted.',
      technical: 'What the Lawgiver has permitted equally whether done or left undone.',
      examples: [
        'Eating different types of halal food',
        'Wearing different colors of clothing',
      ],
      relatedTerms: ['Halal (lawful)', 'Jaiz (permissible)'],
      citations: [citations.alJuwayni],
    },
  ],
  summary: {
    id: 'sum-u2-l1',
    titleAr: 'ملخص الحكم التكليفي',
    title: 'Summary of Taklifi Rulings',
    contentAr: `الحكم التكليفي هو خطاب الله المتعلق بأفعال المكلفين بالاقتضاء أو التخيير. ينقسم إلى خمسة أقسام: الواجب (ما طلب الشارع فعله طلباً جازماً)، المندوب (ما طلب الشارع فعله طلباً غير جازم)، المحرم (ما طلب الشارع الكف عنه طلباً جازماً)، المكروه (ما طلب الشارع الكف عنه طلباً غير جازم)، والمباح (ما خير الشارع المكلف بين فعله وتركه). كل حكم له آثاره الشرعية والأخلاقية المختلفة.`,
    content: `Taklifi ruling is God's command concerning the actions of the obligated with demand or choice. It is divided into five categories: Obligatory (what the Lawgiver commanded to be done with binding command), Recommended (what the Lawgiver encouraged without binding obligation), Prohibited (what the Lawgiver forbade with binding prohibition), Disliked (what the Lawgiver discouraged without binding prohibition), and Permissible (what the Lawgiver permitted equally). Each ruling has different legal and ethical consequences.`,
    keyPointsAr: [
      'الواجب: ما طلب الشارع فعله طلباً جازماً',
      'المندوب: ما طلب الشارع فعله طلباً غير جازم',
      'المحرم: ما طلب الشارع الكف عنه طلباً جازماً',
      'المكروه: ما طلب الشارع الكف عنه طلباً غير جازم',
      'المباح: ما خير الشارع المكلف بين فعله وتركه',
    ],
    keyPoints: [
      'Obligatory: Binding command to do',
      'Recommended: Non-binding encouragement to do',
      'Prohibited: Binding command to abstain',
      'Disliked: Non-binding discouragement to do',
      'Permissible: Equal choice between doing and abstaining',
    ],
    citations: [citations.alJuwayni, citations.alShawkani],
  },
  animatedContent: [
    {
      id: 'anim-u2-l1-comparison',
      titleAr: 'مقارنة أقسام الحكم التكليفي',
      title: 'Comparison of Taklifi Rulings',
      type: 'comparison',
      descriptionAr: 'مقارنة توضح الفروقات بين أقسام الحكم التكليفي الخمسة',
      description: 'Comparison illustrating differences between the five taklifi rulings',
      animationDelay: 500,
      elements: [
        {
          id: 'elem-wajib',
          labelAr: 'الواجب',
          label: 'Obligatory',
          descriptionAr: 'طلب جازم للفعل',
          description: 'Binding demand to do',
          color: '#DC2626',
        },
        {
          id: 'elem-mandub',
          labelAr: 'المندوب',
          label: 'Recommended',
          descriptionAr: 'طلب غير جازم للفعل',
          description: 'Non-binding encouragement to do',
          color: '#F59E0B',
        },
        {
          id: 'elem-mubah',
          labelAr: 'المباح',
          label: 'Permissible',
          descriptionAr: 'تخيير بين الفعل والترك',
          description: 'Choice between doing and abstaining',
          color: '#10B981',
        },
        {
          id: 'elem-makruh',
          labelAr: 'المكروه',
          label: 'Disliked',
          descriptionAr: 'طلب غير جازم للترك',
          description: 'Non-binding discouragement to do',
          color: '#3B82F6',
        },
        {
          id: 'elem-haram',
          labelAr: 'المحرم',
          label: 'Prohibited',
          descriptionAr: 'طلب جازم للترك',
          description: 'Binding command to abstain',
          color: '#8B5CF6',
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u2-l1-q1',
      type: 'multiple-choice',
      questionAr: 'ما هو تعريف الحكم التكليفي الصحيح؟',
      question: 'What is the correct definition of a Taklifi ruling?',
      optionsAr: [
        'خطاب الله المتعلق بأفعال المكلفين بالاقتضاء أو التخيير',
        'القواعد الفقهية الكلية',
        'الأحاديث النبوية الشريفة',
        'آراء الفقهاء المختلفة',
      ],
      options: [
        'God\'s command concerning the actions of the obligated with demand or choice',
        'General jurisprudential rules',
        'Prophetic traditions',
        'Different opinions of jurists',
      ],
      correctAnswer: 0,
      correctAnswerAr: 'خطاب الله المتعلق بأفعال المكلفين بالاقتضاء أو التخيير',
      explanation: 'This is the precise technical definition of Taklifi ruling as established by jurisprudential scholars.',
      explanationAr: 'هذا هو التعريف الاصطلاحي الدقيق للحكم التكليفي كما أقره علماء الأصول.',
      difficulty: 'medium',
      relatedTopics: ['الحكم التكليفي', 'أقسام الأحكام'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
    {
      id: 'quiz-u2-l1-q2',
      type: 'fill-blank',
      questionAr: 'الصلاة المفروضة حكمها _______ لأن الشارع طلبها طلباً جازماً.',
      question: 'The obligatory prayer is _______ because the Lawgiver commanded it with a binding command.',
      correctAnswer: 'واجب',
      correctAnswerAr: 'واجب',
      explanation: 'Prayer is classified as obligatory (Wajib) because it is a binding command from the Lawgiver.',
      explanationAr: 'الصلاة المفروضة واجبة لأن الشارع أمر بها أمراً جازماً.',
      difficulty: 'easy',
      relatedTopics: ['الواجب', 'الحكم التكليفي'],
      citations: [citations.alQur'an],
    },
  ],
  citations: [citations.alJuwayni, citations.alShawkani, citations.alQur'an],
};

const unit2Lesson2: Lesson = {
  id: 'usul-u2-l2',
  titleAr: 'الحكم الوضعي',
  title: 'Wadi\'i Rulings (Declaratory Rulings)',
  descriptionAr: 'أقسام الحكم الوضعي: السبب، الشرط، المانع، الصحة، البطلان.',
  description: 'Categories of declaratory rulings: Cause, Condition, Impediment, Validity, Invalidity.',
  order: 2,
  estimatedDuration: 120,
  objectivesAr: [
    'فهم مفهوم الحكم الوضعي وأقسامه',
    'التمييز بين السبب والشرط والمانع',
    'معرفة الصحة والبطلان وآثارهما',
    'تطبيق الأحكام الوضعية على الحالات العملية',
  ],
  objectives: [
    'Understand the concept and categories of declaratory rulings',
    'Distinguish between cause, condition, and impediment',
    'Know validity and invalidity and their effects',
    'Apply declaratory rulings to practical cases',
  ],
  definitions: [
    {
      id: 'def-sabab',
      term: 'Cause (Sabab)',
      termAr: 'السبب',
      linguistic: 'That which leads to or brings about something.',
      technical: 'What necessitates the existence of a ruling by its existence and its non-existence by its non-existence.',
      examples: [
        'Reaching puberty is a cause for legal responsibility',
        'Possession is a cause for ownership',
      ],
      relatedTerms: ['Illah (effective cause)', 'Muallal (caused)'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
    {
      id: 'def-shart',
      term: 'Condition (Shart)',
      termAr: 'الشرط',
      linguistic: 'Something required for the completion of something else.',
      technical: 'What necessitates the non-existence of a ruling by its non-existence but not its existence by its existence.',
      examples: [
        'Ablution (Wudu) is a condition for the validity of prayer',
        'Intention is a condition for fasting',
      ],
      relatedTerms: ['Mushtarat (conditional)', 'Shariti (conditional)'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
    {
      id: 'def-mani',
      term: 'Impediment (Mani)',
      termAr: 'المانع',
      linguistic: 'That which prevents or hinders something.',
      technical: 'What necessitates the non-existence of a ruling by its existence but not its non-existence by its non-existence.',
      examples: [
        'Insanity is an impediment to legal responsibility',
        'Menstruation is an impediment to prayer',
      ],
      relatedTerms: ['Mani (preventive)', 'Manuah (prevented)'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
  ],
  summary: {
    id: 'sum-u2-l2',
    titleAr: 'ملخص الحكم الوضعي',
    title: 'Summary of Wadi\'i Rulings',
    contentAr: `الحكم الوضعي هو ما جعله الشارع سبباً أو شرطاً أو مانعاً لحكم آخر. ينقسم إلى ثلاثة أقسام رئيسية: السبب (ما يستلزم وجود الحكم بوجوده وعدمه بعدمه)، الشرط (ما يستلزم عدم الحكم بعدمه دون أن يستلزم وجوده بوجوده)، والمانع (ما يستلزم عدم الحكم بوجوده دون أن يستلزم وجوده بعدمه). كما يشمل الحكم الوضعي الصحة والبطلان.`,
    content: `Wadi\'i ruling is what the Lawgiver has made a cause, condition, or impediment for another ruling. It is divided into three main categories: Cause (what necessitates the existence of a ruling by its existence and non-existence by its non-existence), Condition (what necessitates non-existence of a ruling by its non-existence without necessitating existence by its existence), and Impediment (what necessitates non-existence of a ruling by its existence without necessitating existence by its non-existence). It also includes validity and invalidity.`,
    keyPointsAr: [
      'السبب: يستلزم الوجود والعدم',
      'الشرط: يستلزم العدم فقط',
      'المانع: يستلزم العدم بالوجود',
      'الصحة: ترتب الآثار الشرعية',
      'البطلان: عدم ترتب الآثار الشرعية',
    ],
    keyPoints: [
      'Cause: Necessitates existence and non-existence',
      'Condition: Necessitates non-existence only',
      'Impediment: Necessitates non-existence by existence',
      'Validity: Attachment of legal effects',
      'Invalidity: Non-attachment of legal effects',
    ],
    citations: [citations.alJuwayni, citations.alShawkani],
  },
  animatedContent: [
    {
      id: 'anim-u2-l2-flowchart',
      titleAr: 'العلاقات بين السبب والشرط والمانع',
      title: 'Relationships between Cause, Condition, and Impediment',
      type: 'flowchart',
      descriptionAr: 'رسم توضيحي يبين العلاقات المنطقية بين السبب والشرط والمانع',
      description: 'Diagram showing logical relationships between cause, condition, and impediment',
      animationDelay: 600,
      elements: [
        {
          id: 'elem-sabab-flow',
          labelAr: 'السبب',
          label: 'Cause',
          descriptionAr: 'وجود = وجود الحكم، عدم = عدم الحكم',
          description: 'Existence = Ruling exists, Non-existence = Ruling absent',
          color: '#EF4444',
        },
        {
          id: 'elem-shart-flow',
          labelAr: 'الشرط',
          label: 'Condition',
          descriptionAr: 'عدم = عدم الحكم، وجود = ؟',
          description: 'Non-existence = Ruling absent, Existence = ?',
          color: '#3B82F6',
        },
        {
          id: 'elem-mani-flow',
          labelAr: 'المانع',
          label: 'Impediment',
          descriptionAr: 'وجود = عدم الحكم، عدم = ؟',
          description: 'Existence = Ruling absent, Non-existence = ?',
          color: '#8B5CF6',
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-u2-l2-q1',
      type: 'multiple-choice',
      questionAr: 'ما هو الفرق الأساسي بين السبب والشرط؟',
      question: 'What is the fundamental difference between a cause and a condition?',
      optionsAr: [
        'السبب يستلزم الوجود والعدم، الشرط يستلزم العدم فقط',
        'السبب والشرط متطابقان تماماً',
        'الشرط أهم من السبب',
        'السبب يتعلق بالعقائد والشرط بالعبادات',
      ],
      options: [
        'Cause necessitates existence and non-existence; condition necessitates non-existence only',
        'Cause and condition are identical',
        'Condition is more important than cause',
        'Cause relates to beliefs and condition to worship',
      ],
      correctAnswer: 0,
      correctAnswerAr: 'السبب يستلزم الوجود والعدم، الشرط يستلزم العدم فقط',
      explanation: 'This is the precise distinction: a cause works both ways (presence brings the ruling, absence removes it), while a condition only works one way (absence removes the ruling, but presence doesn\'t guarantee it).',
      explanationAr: 'هذا هو التمييز الدقيق: السبب يعمل في الاتجاهين (وجوده يجلب الحكم، عدمه يرفعه)، بينما الشرط يعمل في اتجاه واحد فقط (عدمه يرفع الحكم، لكن وجوده لا يضمنه).',
      difficulty: 'hard',
      relatedTopics: ['السبب', 'الشرط', 'الحكم الوضعي'],
      citations: [citations.alJuwayni, citations.alShawkani],
    },
  ],
  citations: [citations.alJuwayni, citations.alShawkani],
};

export const unit2: Unit = {
  id: 'usul-unit-2',
  titleAr: 'الوحدة الثانية: الحكم الشرعي',
  title: 'Unit 2: Islamic Legal Rulings',
  descriptionAr: 'دراسة الحكم التكليفي والحكم الوضعي وأقسامهما وآثارهما.',
  description: 'Study of obligatory and declaratory rulings, their categories, and effects.',
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
