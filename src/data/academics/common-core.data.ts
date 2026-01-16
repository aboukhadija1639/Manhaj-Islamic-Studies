import type { CommonCoreInfo } from '@/domain';

/**
 * معلومات الجذع المشترك
 * Common Core Information
 * 
 * السنة الأولى - كلية العلوم الإسلامية
 */

export const commonCoreInfo: CommonCoreInfo = {
  title: 'الجذع المشترك - السنة الأولى',
  description:
    'السنة الأولى من برنامج الليسانس في العلوم الإسلامية هي سنة الجذع المشترك، حيث يدرس جميع الطلبة نفس المقاييس الأساسية في مختلف فروع العلوم الإسلامية. تهدف هذه السنة إلى تكوين قاعدة معرفية صلبة تمكن الطالب من اختيار تخصصه بوعي في السنة الثانية.',
  duration: {
    years: 1,
    semesters: 2,
  },
  objectives: [
    'بناء قاعدة معرفية صلبة في مختلف فروع العلوم الإسلامية',
    'تمكين الطالب من فهم العلاقة بين مختلف التخصصات الإسلامية',
    'إكساب الطالب المهارات الأساسية في البحث العلمي',
    'مساعدة الطالب على اكتشاف ميوله العلمية والتخصصية',
    'تطوير مهارات اللغة العربية والقراءة والكتابة الأكاديمية',
  ],
  requiredModules: [
    'ulum-al-quran',
    'tafsir-tahlili',
    'hadith-nabawi',
    'fiqh-islami',
    'usul-fiqh',
    'aqidah-islamiyah',
    'sirah-nabawiyah',
    'arabic-language',
    'research-methodology',
    'foreign-language-1',
  ],
  availableSpecialties: [
    'quran-sciences',
    'hadith-sciences',
    'fiqh',
    'aqidah',
    'dawah',
    'sharia-law',
    'arabic-quran',
  ],
  specializationChoiceDeadline: 'نهاية السداسي الثاني من السنة الأولى',
};

/**
 * معلومات تفصيلية عن الجذع المشترك
 */
export const commonCoreDetails = {
  /**
   * السداسي الأول (S1)
   */
  semester1: {
    title: 'السداسي الأول',
    modules: [
      {
        id: 'ulum-al-quran',
        nameAr: 'علوم القرآن',
        credits: 6,
        type: 'fundamental' as const,
        description: 'دراسة علوم القرآن الكريم من حيث النزول والجمع والقراءات',
      },
      {
        id: 'tafsir-tahlili',
        nameAr: 'التفسير التحليلي',
        credits: 5,
        type: 'fundamental' as const,
        description: 'تفسير سور مختارة من القرآن الكريم بالمنهج التحليلي',
      },
      {
        id: 'hadith-nabawi',
        nameAr: 'الحديث النبوي',
        credits: 5,
        type: 'fundamental' as const,
        description: 'دراسة أحاديث مختارة من كتب السنة',
      },
      {
        id: 'fiqh-islami',
        nameAr: 'الفقه الإسلامي',
        credits: 5,
        type: 'fundamental' as const,
        description: 'دراسة أحكام العبادات والمعاملات',
      },
      {
        id: 'usul-fiqh',
        nameAr: 'أصول الفقه',
        credits: 4,
        type: 'fundamental' as const,
        description: 'مدخل إلى أصول الفقه ومصادر التشريع',
      },
      {
        id: 'aqidah-islamiyah',
        nameAr: 'العقيدة الإسلامية',
        credits: 4,
        type: 'fundamental' as const,
        description: 'دراسة أصول العقيدة الإسلامية',
      },
      {
        id: 'sirah-nabawiyah',
        nameAr: 'السيرة النبوية',
        credits: 3,
        type: 'fundamental' as const,
        description: 'دراسة سيرة النبي صلى الله عليه وسلم',
      },
      {
        id: 'arabic-language',
        nameAr: 'اللغة العربية',
        credits: 4,
        type: 'methodology' as const,
        description: 'النحو والصرف والبلاغة',
      },
      {
        id: 'research-methodology',
        nameAr: 'منهجية البحث',
        credits: 3,
        type: 'methodology' as const,
        description: 'مناهج البحث العلمي في العلوم الإسلامية',
      },
      {
        id: 'foreign-language-1',
        nameAr: 'اللغة الأجنبية 1',
        credits: 2,
        type: 'transversal' as const,
        description: 'اللغة الإنجليزية أو الفرنسية',
      },
    ],
    totalCredits: 41,
  },

  /**
   * السداسي الثاني (S2)
   */
  semester2: {
    title: 'السداسي الثاني',
    modules: [
      {
        id: 'hadith-sciences',
        nameAr: 'علوم الحديث',
        credits: 6,
        type: 'fundamental' as const,
        description: 'مصطلح الحديث وعلم الرواية والدراية',
      },
      {
        id: 'tafsir-mawdui',
        nameAr: 'التفسير الموضوعي',
        credits: 5,
        type: 'fundamental' as const,
        description: 'التفسير الموضوعي لموضوعات قرآنية مختارة',
      },
      {
        id: 'fiqh-muqaran',
        nameAr: 'الفقه المقارن',
        credits: 5,
        type: 'fundamental' as const,
        description: 'دراسة مقارنة للمذاهب الفقهية',
      },
      {
        id: 'usul-fiqh-advanced',
        nameAr: 'أصول الفقه المتقدم',
        credits: 4,
        type: 'fundamental' as const,
        description: 'القواعد الأصولية والاجتهاد',
      },
      {
        id: 'aqidah-madhahib',
        nameAr: 'العقيدة والمذاهب',
        credits: 4,
        type: 'fundamental' as const,
        description: 'الفرق والمذاهب الإسلامية',
      },
      {
        id: 'dawah-culture',
        nameAr: 'الدعوة والثقافة الإسلامية',
        credits: 4,
        type: 'fundamental' as const,
        description: 'أصول الدعوة والثقافة الإسلامية',
      },
      {
        id: 'arabic-grammar',
        nameAr: 'النحو والصرف',
        credits: 4,
        type: 'methodology' as const,
        description: 'قواعد اللغة العربية المتقدمة',
      },
      {
        id: 'computer-science',
        nameAr: 'الإعلام الآلي',
        credits: 2,
        type: 'transversal' as const,
        description: 'مهارات الحاسوب الأساسية',
      },
      {
        id: 'human-rights',
        nameAr: 'حقوق الإنسان',
        credits: 2,
        type: 'transversal' as const,
        description: 'حقوق الإنسان في الإسلام والقانون الدولي',
      },
      {
        id: 'foreign-language-2',
        nameAr: 'اللغة الأجنبية 2',
        credits: 2,
        type: 'transversal' as const,
        description: 'اللغة الإنجليزية أو الفرنسية (متقدم)',
      },
    ],
    totalCredits: 38,
  },

  /**
   * إرشادات اختيار التخصص
   */
  specializationGuidance: {
    title: 'كيف تختار تخصصك؟',
    description:
      'في نهاية السنة الأولى، سيُطلب منك اختيار تخصص من بين سبعة تخصصات متاحة. اختيارك يجب أن يعتمد على:',
    criteria: [
      {
        title: 'الميول العلمية',
        description: 'ما هي المقاييس التي استمتعت بدراستها أكثر في السنة الأولى؟',
      },
      {
        title: 'الأداء الأكاديمي',
        description: 'في أي المقاييس حصلت على أفضل النتائج؟',
      },
      {
        title: 'الأهداف المهنية',
        description: 'ما هي المهنة أو المجال الذي ترغب في العمل فيه بعد التخرج؟',
      },
      {
        title: 'الآفاق البحثية',
        description: 'هل ترغب في مواصلة الدراسات العليا (الماستر والدكتوراه)؟',
      },
    ],
    process: [
      'مراجعة نتائجك الأكاديمية في السنة الأولى',
      'استشارة الأساتذة والمرشدين الأكاديميين',
      'حضور جلسات التوجيه حول التخصصات',
      'تقديم طلب اختيار التخصص قبل الموعد النهائي',
      'الحصول على الموافقة بناءً على المعدل والمقاعد المتاحة',
    ],
  },
};
