/**
 * Manhaj Data Structure
 * Comprehensive Islamic Epistemology Framework
 * Based on Phase 2 Curriculum Map
 */

export interface ManhajPrinciple {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  icon: string;
  color: string;
}

export interface ScienceConnection {
  targetId: string;
  relationship: 'governs' | 'unlocks' | 'contextualizes' | 'structures' | 'applies' | 'protects' | 'enables' | 'depends';
  relationshipAr: string;
  description: string;
}

export interface EpistemologicalPosition {
  type: 'revealed' | 'rational' | 'instrumental' | 'applied' | 'spiritual';
  typeAr: string;
  description: string;
}

export interface Science {
  id: string;
  title: string;
  titleAr: string;
  shortDesc: string;
  purpose: string;
  educationalGoal: string;
  functionalRole: string;
  practicalOutcome: string;
  epistemologicalPosition: EpistemologicalPosition;
  category: 'core' | 'supporting' | 'technical';
  credits: number;
  hours: number;
  icon: string;
  color: string;
  gradient: string;
  topics: string[];
  objectives: string[];
  connections: ScienceConnection[];
  prerequisites: string[];
  enables: string[];
}

export const manhajPrinciples: ManhajPrinciple[] = [
  {
    id: 'knowledge-worship',
    title: 'Knowledge is Worship',
    titleAr: 'العلم عبادة',
    description: 'Seeking knowledge is an act of worship (\'ibadah). Every science studied is a means of drawing closer to Allah through understanding His revelation, implementing His commands, and purifying the soul.',
    icon: '🤲',
    color: 'purple',
  },
  {
    id: 'integration',
    title: 'Integration Over Fragmentation',
    titleAr: 'التكامل لا التفرق',
    description: 'Islamic knowledge forms a unified whole under the framework of Tawhid. Aqeedah governs all sciences, Arabic unlocks revelation, Usul structures jurisprudence, and Seerah contextualizes texts.',
    icon: '🔗',
    color: 'teal',
  },
  {
    id: 'purpose-first',
    title: 'Purpose Before Content',
    titleAr: 'الغاية قبل المادة',
    description: 'We do not study for degrees but to become scholars who understand correctly, worship correctly, and live correctly. Every science has a clear purpose, educational goal, and practical outcome.',
    icon: '🎯',
    color: 'emerald',
  },
  {
    id: 'text-centered',
    title: 'Text-Centered Epistemology',
    titleAr: 'النص أساس المعرفة',
    description: 'Our knowledge begins with revelation (Quran and Sunnah), accessed through Arabic, understood through context (Seerah), structured through methodology (Usul), and applied through jurisprudence (Fiqh).',
    icon: '📖',
    color: 'blue',
  },
  {
    id: 'spiritual-balance',
    title: 'Spiritual-Intellectual Balance',
    titleAr: 'التوازن بين العلم والعمل',
    description: 'Knowledge without purification (Tazkiyah) breeds arrogance. Practice without knowledge breeds innovation. Our Manhaj unifies belief, knowledge, and action.',
    icon: '⚖️',
    color: 'gold',
  },
];

export const manhajSciences: Science[] = [
  {
    id: 'aqeedah',
    title: 'Islamic Creed',
    titleAr: 'العقيدة',
    shortDesc: 'Foundation of correct belief in Allah, His attributes, and the unseen',
    purpose: 'To establish correct belief in Allah, His attributes, His messengers, and the unseen realities. Aqeedah is the foundation of all Islamic knowledge because belief governs how we understand and practice everything else.',
    educationalGoal: 'A student with sound Tawhid (monotheism), correct understanding of Allah\'s attributes, firm belief in the unseen, and the ability to distinguish orthodox belief from deviant sects.',
    functionalRole: 'Aqeedah governs all other sciences. It is the lens through which we understand Quran, Hadith, Fiqh, and all knowledge. Sound Aqeedah prevents misinterpretation and protects from deviation.',
    practicalOutcome: 'The student worships Allah correctly, avoids shirk (polytheism) in all its forms, has firm faith in trials, distinguishes truth from falsehood, and protects others from deviant beliefs.',
    epistemologicalPosition: {
      type: 'rational',
      typeAr: 'معرفة عقلية',
      description: 'Text-based with rational support. Aqeedah is primarily derived from Quran and Sunnah, but uses reason to support and defend revealed truths.',
    },
    category: 'core',
    credits: 5,
    hours: 37.5,
    icon: '☪️',
    color: 'gold',
    gradient: 'from-yellow-600 to-amber-600',
    topics: [
      'التوحيد وأقسامه',
      'أركان الإيمان',
      'القضاء والقدر',
      'الأسماء والصفات',
      'الإيمان بالغيب',
    ],
    objectives: [
      'فهم معنى التوحيد',
      'معرفة أركان الإيمان',
      'إدراك عقيدة أهل السنة',
      'التمييز بين العقيدة الصحيحة والمنحرفة',
    ],
    connections: [
      {
        targetId: 'ulum-al-quran',
        relationship: 'governs',
        relationshipAr: 'يحكم',
        description: 'Aqeedah governs how we understand Quranic revelation',
      },
      {
        targetId: 'fiqh-al-ibadat',
        relationship: 'governs',
        relationshipAr: 'يحكم',
        description: 'Correct belief determines correct worship',
      },
      {
        targetId: 'usul-al-fiqh',
        relationship: 'governs',
        relationshipAr: 'يحكم',
        description: 'Belief in Allah\'s wisdom affects how we derive rulings',
      },
    ],
    prerequisites: [],
    enables: ['All sciences - Aqeedah is the foundation'],
  },
  {
    id: 'arabic-language',
    title: 'Arabic Language',
    titleAr: 'اللغة العربية',
    shortDesc: 'The key tool for accessing Quran, Hadith, and all Islamic texts',
    purpose: 'Arabic is the key that unlocks revelation. The Quran was revealed in Arabic, the Prophet spoke Arabic, and Islamic scholarship is conducted in Arabic. Without Arabic mastery, students are dependent on translations.',
    educationalGoal: 'A student who reads classical Arabic texts, understands Quranic grammar, appreciates linguistic beauty, and thinks in Arabic when studying Islamic sciences.',
    functionalRole: 'Arabic unlocks all text-based sciences. Cannot understand Quran, Hadith, Fiqh, or Usul without Arabic grammar. It is the foundational instrumental science.',
    practicalOutcome: 'The student can read Islamic texts independently, understand Quranic verses correctly, avoid mistranslations, appreciate linguistic miracles, and teach others.',
    epistemologicalPosition: {
      type: 'instrumental',
      typeAr: 'معرفة آلية',
      description: 'Instrumental science - a tool for accessing other sciences. Foundational for all text-based knowledge.',
    },
    category: 'supporting',
    credits: 5,
    hours: 37.5,
    icon: '✍️',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    topics: [
      'النحو',
      'الصرف',
      'البلاغة',
      'الإملاء',
      'التعبير',
    ],
    objectives: [
      'إتقان قواعد النحو',
      'فهم الصرف العربي',
      'معرفة البلاغة',
      'القدرة على التعبير الصحيح',
    ],
    connections: [
      {
        targetId: 'ulum-al-quran',
        relationship: 'unlocks',
        relationshipAr: 'يفتح',
        description: 'Arabic unlocks the Quran - cannot understand without grammar',
      },
      {
        targetId: 'hadith-sciences',
        relationship: 'unlocks',
        relationshipAr: 'يفتح',
        description: 'Hadith are in classical Arabic - requires language mastery',
      },
      {
        targetId: 'usul-al-fiqh',
        relationship: 'enables',
        relationshipAr: 'يمكّن',
        description: 'Linguistic principles are central to Usul al-Fiqh',
      },
    ],
    prerequisites: [],
    enables: ['Quran', 'Hadith', 'Fiqh', 'Usul', 'Tafsir'],
  },
  {
    id: 'ulum-al-quran',
    title: 'Quranic Sciences',
    titleAr: 'علوم القرآن',
    shortDesc: 'Understanding the nature, compilation, and context of divine revelation',
    purpose: 'To provide foundational knowledge necessary to approach the Quran with proper understanding, reverence, and methodology. Quranic Sciences is the gateway to all Islamic knowledge.',
    educationalGoal: 'A student who understands the nature of divine revelation, recognizes the miraculous preservation of the Quran, can distinguish Makki from Madani revelation, and comprehends the significance of asbab al-nuzul.',
    functionalRole: 'Serves Tafsir, Fiqh, and Aqeedah. Provides the foundational knowledge for Quranic exegesis and understanding how Allah communicated with humanity.',
    practicalOutcome: 'The student develops reverence for the Quran, understands its historical context, can distinguish authentic from weak interpretations, and approaches Quranic study with proper methodology.',
    epistemologicalPosition: {
      type: 'revealed',
      typeAr: 'معرفة وحيية',
      description: 'Text-based, revelatory, foundational. Deals with the ultimate source of Islamic knowledge.',
    },
    category: 'core',
    credits: 6,
    hours: 45,
    icon: '📖',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600',
    topics: [
      'تعريف علوم القرآن',
      'الوحي',
      'جمع القرآن',
      'المكي والمدني',
      'أسباب النزول',
      'الناسخ والمنسوخ',
    ],
    objectives: [
      'فهم طبيعة الوحي القرآني',
      'معرفة تاريخ جمع القرآن',
      'التمييز بين المكي والمدني',
      'فهم أسباب النزول وأهميتها',
    ],
    connections: [
      {
        targetId: 'arabic-language',
        relationship: 'depends',
        relationshipAr: 'يعتمد على',
        description: 'Requires Arabic grammar to understand Quranic language',
      },
      {
        targetId: 'sirah',
        relationship: 'contextualizes',
        relationshipAr: 'يُسَيِّق',
        description: 'Seerah provides context for understanding revelation',
      },
    ],
    prerequisites: ['Arabic Language'],
    enables: ['Tafsir', 'Fiqh', 'Usul al-Fiqh'],
  },
  {
    id: 'hadith-sciences',
    title: 'Hadith Sciences',
    titleAr: 'علوم الحديث',
    shortDesc: 'Methodology for authenticating and understanding Prophetic traditions',
    purpose: 'To equip students with the methodology to distinguish authentic Prophetic traditions from fabricated ones, ensuring that the Sunnah is properly understood and applied.',
    educationalGoal: 'A student who can evaluate hadith authenticity, understands the science of narrators, recognizes categories of hadith, and appreciates the meticulous preservation of the Sunnah.',
    functionalRole: 'Serves Fiqh and Aqeedah. Authentic hadiths are the basis for jurisprudential rulings and clarify matters of belief.',
    practicalOutcome: 'The student can distinguish authentic from weak hadiths, avoid acting on fabrications, understand the Sunnah correctly, and defend against those who reject hadith.',
    epistemologicalPosition: {
      type: 'revealed',
      typeAr: 'معرفة وحيية',
      description: 'Text-based, historical-critical, foundational. Deals with the second source of revelation.',
    },
    category: 'core',
    credits: 5,
    hours: 37.5,
    icon: '📜',
    color: 'teal',
    gradient: 'from-cyan-500 to-blue-600',
    topics: [
      'أقسام الحديث',
      'علم الرجال',
      'مصطلح الحديث',
      'الكتب الستة',
      'منهج النقد',
    ],
    objectives: [
      'معرفة أقسام الحديث',
      'فهم علم الرجال',
      'إدراك منهج النقد',
      'التمييز بين الصحيح والضعيف',
    ],
    connections: [
      {
        targetId: 'arabic-language',
        relationship: 'depends',
        relationshipAr: 'يعتمد على',
        description: 'Requires Arabic to understand hadith texts',
      },
      {
        targetId: 'sirah',
        relationship: 'contextualizes',
        relationshipAr: 'يُسَيِّق',
        description: 'Seerah provides context for when and why hadiths were said',
      },
    ],
    prerequisites: ['Arabic Language', 'Seerah'],
    enables: ['Fiqh', 'Aqeedah', 'Usul al-Fiqh'],
  },
  {
    id: 'sirah',
    title: 'Prophetic Biography',
    titleAr: 'السيرة النبوية',
    shortDesc: 'The living context for understanding revelation and the practical model of Islamic life',
    purpose: 'To provide the living context for understanding revelation and to present the practical model of Islamic life. The Prophet ﷺ is the walking Quran.',
    educationalGoal: 'A student who loves the Prophet ﷺ, understands his character, emulates his example, and contextualizes revelation through his life.',
    functionalRole: 'Contextualizes Quran and Hadith. Provides the historical and biographical context necessary for understanding when and why revelation came.',
    practicalOutcome: 'The student loves the Prophet more deeply, defends him against attacks, emulates his character, understands Islamic history, and contextualizes current challenges through historical precedent.',
    epistemologicalPosition: {
      type: 'revealed',
      typeAr: 'معرفة تاريخية',
      description: 'Historical-contextual, inspirational, integrative. Provides background for understanding texts.',
    },
    category: 'core',
    credits: 4,
    hours: 30,
    icon: '🌙',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    topics: [
      'المولد والنشأة',
      'البعثة',
      'الهجرة',
      'الغزوات',
      'فتح مكة',
      'حجة الوداع',
    ],
    objectives: [
      'معرفة سيرة النبي ﷺ',
      'فهم مراحل الدعوة',
      'استخلاص الدروس والعبر',
      'الاقتداء بالنبي ﷺ',
    ],
    connections: [
      {
        targetId: 'ulum-al-quran',
        relationship: 'contextualizes',
        relationshipAr: 'يُسَيِّق',
        description: 'Provides context for asbab al-nuzul',
      },
      {
        targetId: 'hadith-sciences',
        relationship: 'contextualizes',
        relationshipAr: 'يُسَيِّق',
        description: 'Explains when and why hadiths were said',
      },
    ],
    prerequisites: [],
    enables: ['Understanding Quran and Hadith in context'],
  },
  {
    id: 'usul-al-fiqh',
    title: 'Principles of Jurisprudence',
    titleAr: 'أصول الفقه',
    shortDesc: 'The methodology for deriving Islamic rulings from textual sources',
    purpose: 'To provide the methodology for deriving Islamic rulings from textual sources. Without Usul al-Fiqh, scholars would have no systematic way to extract rulings.',
    educationalGoal: 'A student who understands how rulings are derived, can evaluate scholarly opinions, recognizes different methodologies, and appreciates the rigor of Islamic jurisprudence.',
    functionalRole: 'Structures Fiqh. Provides the methodology for deriving all jurisprudential rulings from Quran and Sunnah.',
    practicalOutcome: 'The student can understand scholarly reasoning, evaluate fatwas, appreciate different schools of thought, and avoid blind following.',
    epistemologicalPosition: {
      type: 'rational',
      typeAr: 'معرفة منهجية',
      description: 'Methodological, rational-textual, meta-science. Provides tools for understanding texts.',
    },
    category: 'core',
    credits: 5,
    hours: 37.5,
    icon: '⚖️',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    topics: [
      'تعريف أصول الفقه',
      'الأدلة الشرعية',
      'القياس',
      'الاجتهاد',
      'التعارض والترجيح',
    ],
    objectives: [
      'فهم أصول الاستنباط',
      'معرفة الأدلة الشرعية',
      'إدراك مناهج الفقهاء',
      'القدرة على الاستدلال',
    ],
    connections: [
      {
        targetId: 'arabic-language',
        relationship: 'depends',
        relationshipAr: 'يعتمد على',
        description: 'Linguistic principles are central to Usul',
      },
      {
        targetId: 'ulum-al-quran',
        relationship: 'applies',
        relationshipAr: 'يطبق',
        description: 'Applies principles of interpretation to Quran',
      },
      {
        targetId: 'fiqh-al-ibadat',
        relationship: 'structures',
        relationshipAr: 'يُنظِّم',
        description: 'Provides methodology for deriving Fiqh rulings',
      },
    ],
    prerequisites: ['Arabic Language', 'Quranic Sciences'],
    enables: ['Fiqh', 'Ijtihad', 'Understanding scholarly differences'],
  },
  {
    id: 'fiqh-al-ibadat',
    title: 'Fiqh of Worship',
    titleAr: 'فقه العبادات',
    shortDesc: 'Practical rulings for correct worship according to Quran and Sunnah',
    purpose: 'To teach Muslims how to worship Allah correctly according to the Quran and Sunnah. Worship is the purpose of human creation.',
    educationalGoal: 'A student who performs worship correctly, understands the wisdom behind rulings, can teach others how to worship, and recognizes the spiritual dimensions of ritual acts.',
    functionalRole: 'Applies Aqeedah, Usul, Quran, and Hadith. Demonstrates how principles are used to derive practical rulings for worship.',
    practicalOutcome: 'The student prays correctly, fasts correctly, pays zakat correctly, performs hajj correctly, and can teach others. Correct worship leads to spiritual growth.',
    epistemologicalPosition: {
      type: 'applied',
      typeAr: 'معرفة تطبيقية',
      description: 'Applied knowledge derived from texts through methodology. Focused on actions.',
    },
    category: 'core',
    credits: 6,
    hours: 45,
    icon: '🕌',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    topics: [
      'الطهارة',
      'الصلاة',
      'الزكاة',
      'الصيام',
      'الحج والعمرة',
    ],
    objectives: [
      'معرفة أحكام الطهارة',
      'فهم أركان وشروط الصلاة',
      'إدراك أحكام الزكاة والصيام',
      'معرفة مناسك الحج',
    ],
    connections: [
      {
        targetId: 'aqeedah',
        relationship: 'applies',
        relationshipAr: 'يطبق',
        description: 'Worship is the practical manifestation of belief',
      },
      {
        targetId: 'usul-al-fiqh',
        relationship: 'depends',
        relationshipAr: 'يعتمد على',
        description: 'Uses Usul methodology to derive rulings',
      },
      {
        targetId: 'hadith-sciences',
        relationship: 'depends',
        relationshipAr: 'يعتمد على',
        description: 'Most worship rulings come from Sunnah',
      },
    ],
    prerequisites: ['Aqeedah', 'Arabic', 'Usul al-Fiqh', 'Hadith'],
    enables: ['Correct worship', 'Teaching others', 'Spiritual growth'],
  },
  {
    id: 'tazkiyah',
    title: 'Islamic Ethics & Tazkiyah',
    titleAr: 'الأخلاق الإسلامية والتزكية',
    shortDesc: 'Purification of the soul and perfection of character',
    purpose: 'To purify the soul and perfect character. Knowledge without purification breeds arrogance, hypocrisy, and spiritual corruption.',
    educationalGoal: 'A student with humility, sincerity, God-consciousness, good character, and spiritual awareness. Someone whose knowledge increases their humility.',
    functionalRole: 'Protects all sciences. Prevents knowledge from corrupting the soul. Ensures that learning is worship and knowledge leads to spiritual growth.',
    practicalOutcome: 'The student has good character, treats others well, avoids sins, purifies intentions, remains humble, and grows spiritually.',
    epistemologicalPosition: {
      type: 'spiritual',
      typeAr: 'معرفة روحية',
      description: 'Spiritual-practical, character-based, integrative. Deals with the heart and manifests in behavior.',
    },
    category: 'supporting',
    credits: 3,
    hours: 22.5,
    icon: '💜',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    topics: [
      'تزكية النفس',
      'أمراض القلوب',
      'الأخلاق الحميدة',
      'آداب طلب العلم',
      'العبادات الروحية',
    ],
    objectives: [
      'تزكية النفس',
      'معرفة أمراض القلوب',
      'اكتساب الأخلاق الحميدة',
      'التحلي بآداب العلم',
    ],
    connections: [
      {
        targetId: 'aqeedah',
        relationship: 'protects',
        relationshipAr: 'يحمي',
        description: 'Pure hearts protect correct belief',
      },
      {
        targetId: 'fiqh-al-ibadat',
        relationship: 'protects',
        relationshipAr: 'يحمي',
        description: 'Good character makes worship sincere',
      },
    ],
    prerequisites: [],
    enables: ['Spiritual growth', 'Sincere worship', 'Humble scholarship'],
  },
  {
    id: 'manhaj-al-talab',
    title: 'Methodology of Seeking Knowledge',
    titleAr: 'منهج طلب العلم',
    shortDesc: 'How to learn effectively and conduct research properly',
    purpose: 'To teach students how to learn effectively and how to conduct research properly. Islamic scholarship has a rich tradition of methodology.',
    educationalGoal: 'A student who studies systematically, conducts research properly, documents sources correctly, thinks critically, and produces quality scholarship.',
    functionalRole: 'Enables all sciences. Proper methodology improves learning in every field and prepares students for advanced study.',
    practicalOutcome: 'The student can study effectively, write research papers, document sources, evaluate arguments, manage time, and produce quality work.',
    epistemologicalPosition: {
      type: 'instrumental',
      typeAr: 'معرفة منهجية',
      description: 'Methodological, meta-cognitive, instrumental. Teaches how to learn and think.',
    },
    category: 'supporting',
    credits: 4,
    hours: 30,
    icon: '🔍',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-600',
    topics: [
      'آداب طلب العلم',
      'تقنيات الدراسة',
      'منهجية البحث',
      'التوثيق',
      'التفكير النقدي',
    ],
    objectives: [
      'فهم المنهج العلمي',
      'القدرة على إعداد بحث',
      'معرفة التوثيق الصحيح',
      'الالتزام بأخلاقيات البحث',
    ],
    connections: [],
    prerequisites: [],
    enables: ['Effective learning in all sciences', 'Research capability'],
  },
];

export const learningPhases = [
  {
    id: 1,
    title: 'Foundation',
    titleAr: 'المرحلة الأولى: الأساس',
    weeks: '1-4',
    sciences: ['aqeedah', 'arabic-language', 'manhaj-al-talab'],
    description: 'Establish correct belief, build language foundation, and learn how to learn effectively.',
  },
  {
    id: 2,
    title: 'Sources',
    titleAr: 'المرحلة الثانية: المصادر',
    weeks: '5-8',
    sciences: ['ulum-al-quran', 'sirah'],
    description: 'Study the primary sources of knowledge and contextualize revelation.',
  },
  {
    id: 3,
    title: 'Methodology',
    titleAr: 'المرحلة الثالثة: المنهجية',
    weeks: '9-12',
    sciences: ['usul-al-fiqh', 'hadith-sciences'],
    description: 'Learn the methodologies for deriving rulings and authenticating traditions.',
  },
  {
    id: 4,
    title: 'Application',
    titleAr: 'المرحلة الرابعة: التطبيق',
    weeks: '13-16',
    sciences: ['fiqh-al-ibadat', 'tazkiyah'],
    description: 'Apply knowledge to worship and integrate spiritual purification.',
  },
];
