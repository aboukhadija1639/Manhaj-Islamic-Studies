/**
 * Course Modules Data Structure
 * Based on 1st Bachelor Degree - Semester 1
 * University of El-Oued - Islamic Studies
 */

export type ModuleCategory = 'sharia' | 'supporting' | 'technical';

export interface Module {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  category: ModuleCategory;
  credits: number;
  hours: number;
  icon: string;
  color: string;
  topics: string[];
  objectives: string[];
}

export const moduleCategories = {
  sharia: {
    id: 'sharia',
    title: 'العلوم الشرعية الأساسية',
    description: 'العلوم الإسلامية الأصيلة من قرآن وحديث وفقه',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    icon: '📖',
  },
  supporting: {
    id: 'supporting',
    title: 'العلوم المساعدة',
    description: 'علوم اللغة والمنهجية والتربية',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    icon: '📚',
  },
  technical: {
    id: 'technical',
    title: 'العلوم التقنية واللغوية',
    description: 'الإعلام الآلي واللغات الأجنبية',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '💻',
  },
};

export const semester1Modules: Module[] = [
  // 🟢 Sharia Sciences
  {
    id: 'ulum-al-quran',
    title: 'Quranic Sciences',
    titleAr: 'علوم القرآن',
    description: 'دراسة علوم القرآن الكريم من الوحي والجمع والمكي والمدني وأسباب النزول والناسخ والمنسوخ',
    category: 'sharia',
    credits: 6,
    hours: 45,
    icon: '📖',
    color: 'emerald',
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
  },
  {
    id: 'fiqh-al-ibadat',
    title: 'Fiqh of Worship',
    titleAr: 'فقه العبادات',
    description: 'دراسة أحكام العبادات من طهارة وصلاة وزكاة وصيام وحج وفق المذاهب الفقهية',
    category: 'sharia',
    credits: 6,
    hours: 45,
    icon: '🕌',
    color: 'emerald',
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
  },
  {
    id: 'aqeedah',
    title: 'Islamic Creed',
    titleAr: 'العقيدة',
    description: 'دراسة أصول الإيمان والتوحيد والعقيدة الإسلامية الصحيحة',
    category: 'sharia',
    credits: 5,
    hours: 37.5,
    icon: '☪️',
    color: 'emerald',
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
  },
  {
    id: 'sirah',
    title: 'Prophetic Biography',
    titleAr: 'السيرة النبوية',
    description: 'دراسة سيرة النبي محمد ﷺ من المولد إلى الوفاة والدروس المستفادة',
    category: 'sharia',
    credits: 4,
    hours: 30,
    icon: '🌙',
    color: 'emerald',
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
  },
  {
    id: 'usul-al-fiqh',
    title: 'Principles of Jurisprudence',
    titleAr: 'أصول الفقه',
    description: 'دراسة القواعد والأصول التي يُبنى عليها الفقه الإسلامي',
    category: 'sharia',
    credits: 5,
    hours: 37.5,
    icon: '⚖️',
    color: 'emerald',
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
  },

  // 🟡 Supporting Sciences
  {
    id: 'arabic-language',
    title: 'Arabic Language',
    titleAr: 'لغة عربية',
    description: 'دراسة قواعد اللغة العربية من نحو وصرف وبلاغة لفهم النصوص الشرعية',
    category: 'supporting',
    credits: 5,
    hours: 37.5,
    icon: '✍️',
    color: 'amber',
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
  },
  {
    id: 'methodology',
    title: 'Research Methodology',
    titleAr: 'المنهجية',
    description: 'تعلم مناهج البحث العلمي وكيفية إعداد البحوث الأكاديمية',
    category: 'supporting',
    credits: 4,
    hours: 30,
    icon: '🔍',
    color: 'amber',
    topics: [
      'مفهوم البحث العلمي',
      'خطوات البحث',
      'التوثيق والمراجع',
      'كتابة البحث',
      'أخلاقيات البحث',
    ],
    objectives: [
      'فهم المنهج العلمي',
      'القدرة على إعداد بحث',
      'معرفة التوثيق الصحيح',
      'الالتزام بأخلاقيات البحث',
    ],
  },
  {
    id: 'education-science',
    title: 'Educational Sciences',
    titleAr: 'علم التربية',
    description: 'دراسة أصول التربية والتعليم والنظريات التربوية',
    category: 'supporting',
    credits: 3,
    hours: 22.5,
    icon: '🎓',
    color: 'amber',
    topics: [
      'مفهوم التربية',
      'النظريات التربوية',
      'طرق التدريس',
      'التقويم التربوي',
      'التربية الإسلامية',
    ],
    objectives: [
      'فهم أصول التربية',
      'معرفة النظريات التربوية',
      'إدراك طرق التدريس',
      'القدرة على التقويم',
    ],
  },

  // 🔵 Technical Sciences
  {
    id: 'computer-science',
    title: 'Computer Science',
    titleAr: 'إعلام آلي',
    description: 'تعلم أساسيات الحاسوب والبرمجة والتطبيقات المكتبية',
    category: 'technical',
    credits: 3,
    hours: 22.5,
    icon: '💻',
    color: 'blue',
    topics: [
      'مقدمة في الحاسوب',
      'نظام التشغيل',
      'معالج النصوص',
      'الجداول الإلكترونية',
      'الإنترنت',
    ],
    objectives: [
      'إتقان استخدام الحاسوب',
      'معرفة التطبيقات المكتبية',
      'القدرة على البحث الإلكتروني',
      'استخدام الإنترنت بفعالية',
    ],
  },
  {
    id: 'english-language',
    title: 'English Language',
    titleAr: 'لغة إنجليزية',
    description: 'تعلم أساسيات اللغة الإنجليزية للتواصل والبحث العلمي',
    category: 'technical',
    credits: 3,
    hours: 22.5,
    icon: '🌐',
    color: 'blue',
    topics: [
      'Grammar Basics',
      'Vocabulary',
      'Reading Comprehension',
      'Writing Skills',
      'Academic English',
    ],
    objectives: [
      'فهم القواعد الأساسية',
      'بناء مفردات كافية',
      'القدرة على القراءة',
      'الكتابة الأكاديمية',
    ],
  },
];

export const getSemester1Stats = () => {
  const totalCredits = semester1Modules.reduce((sum, m) => sum + m.credits, 0);
  const totalHours = semester1Modules.reduce((sum, m) => sum + m.hours, 0);
  const byCategory = {
    sharia: semester1Modules.filter(m => m.category === 'sharia').length,
    supporting: semester1Modules.filter(m => m.category === 'supporting').length,
    technical: semester1Modules.filter(m => m.category === 'technical').length,
  };

  return { totalCredits, totalHours, byCategory };
};
