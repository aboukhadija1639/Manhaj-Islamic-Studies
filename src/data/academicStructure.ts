// Academic Structure Data for Hamah Lakhdar University - Islamic Studies
// Based on LMD System (Licence-Master-Doctorate)

export interface Subject {
  id: string;
  code?: string;
  name: string;
  nameAr: string;
  type: 'أساسي' | 'منهجي' | 'استكشافي' | 'اختياري';
  credit: number;
  coefficient: number;
  description?: string;
  descriptionAr?: string;
  summary?: string;
  summaryAr?: string;
  objectives?: string[];
  objectivesAr?: string[];
  references?: string[];
  referencesAr?: string[];
  lectures?: Lecture[];
  programId?: string;
  semesterId?: string;
  prerequisites?: string[];
}

export interface Lecture {
  id: string;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  duration?: string;
  fileUrl?: string;
  videoUrl?: string;
  order: number;
}

export interface Semester {
  id: string;
  number: number;
  name: string;
  nameAr: string;
  subjects: Subject[];
}

export interface AcademicYear {
  id: string;
  level: string;
  levelAr: string;
  semesters: Semester[];
}

export interface Program {
  id: string;
  name: string;
  nameAr: string;
  degree: 'ليسانس' | 'ماستر' | 'دكتوراه';
  duration: string;
  durationAr: string;
  description: string;
  years?: AcademicYear[];
  semesters?: Semester[];
  credits?: number;
}

// Licence Program - Common Core (3 years / 6 semesters)
export const licenceProgram: Program = {
  id: 'licence-islamic-studies',
  name: 'Licence in Islamic Studies',
  nameAr: 'ليسانس العلوم الإسلامية',
  degree: 'ليسانس',
  duration: '3 years / 6 semesters',
  durationAr: '3 سنوات / 6 سداسيات',
  description: 'جذع مشترك في العلوم الإسلامية',
  years: [
    // Year 1 (L1)
    {
      id: 'l1',
      level: 'L1',
      levelAr: 'السنة الأولى',
      semesters: [
        {
          id: 'l1-s1',
          number: 1,
          name: 'Semester 1',
          nameAr: 'السداسي الأول',
          subjects: [
            {
              id: 'l1-s1-quran-sciences',
              name: 'Quranic Sciences',
              nameAr: 'علوم القرآن',
              type: 'أساسي',
              credit: 6,
              coefficient: 3,
              description: 'مدخل إلى علوم القرآن الكريم وتاريخه وجمعه',
              objectives: ['فهم تاريخ القرآن', 'معرفة علوم القرآن الأساسية'],
              references: ['مباحث في علوم القرآن - مناع القطان', 'البرهان في علوم القرآن - الزركشي']
            },
            {
              id: 'l1-s1-creed',
              name: 'Islamic Creed',
              nameAr: 'العقيدة الإسلامية',
              type: 'أساسي',
              credit: 6,
              coefficient: 3,
              description: 'أصول العقيدة الإسلامية وأركان الإيمان',
              objectives: ['معرفة أركان الإيمان', 'فهم أصول العقيدة الإسلامية'],
              references: ['شرح العقيدة الطحاوية', 'كتاب التوحيد - محمد بن عبد الوهاب']
            },
            {
              id: 'l1-s1-worship-fiqh',
              name: 'Fiqh of Worship',
              nameAr: 'فقه العبادات',
              type: 'أساسي',
              credit: 6,
              coefficient: 3,
              description: 'أحكام العبادات من طهارة وصلاة وصيام وزكاة وحج',
              objectives: ['معرفة أحكام الطهارة والصلاة', 'فهم أحكام الصيام والزكاة والحج'],
              references: ['فقه السنة - السيد سابق', 'المغني - ابن قدامة']
            },
            {
              id: 'l1-s1-seerah',
              name: 'Prophetic Biography',
              nameAr: 'السيرة النبوية',
              type: 'أساسي',
              credit: 5,
              coefficient: 2,
              description: 'سيرة النبي محمد صلى الله عليه وسلم',
              objectives: ['معرفة حياة النبي', 'فهم الدروس المستفادة من السيرة'],
              references: ['الرحيق المختوم - المباركفوري', 'السيرة النبوية - ابن هشام']
            },
            {
              id: 'l1-s1-arabic',
              name: 'Arabic Language (Grammar & Morphology)',
              nameAr: 'اللغة العربية (نحو وصرف)',
              type: 'منهجي',
              credit: 4,
              coefficient: 2,
              description: 'قواعد النحو والصرف الأساسية',
              objectives: ['إتقان قواعد النحو', 'فهم الصرف العربي'],
              references: ['النحو الواضح', 'شذا العرف في فن الصرف']
            },
            {
              id: 'l1-s1-methodology',
              name: 'Research Methodology',
              nameAr: 'منهجية البحث',
              type: 'منهجي',
              credit: 4,
              coefficient: 2,
              description: 'أساسيات البحث العلمي ومناهجه',
              objectives: ['معرفة مناهج البحث', 'القدرة على كتابة بحث علمي'],
              references: ['أصول البحث العلمي ومناهجه - أحمد بدر']
            },
            {
              id: 'l1-s1-computer',
              name: 'Computer Science',
              nameAr: 'إعلام آلي',
              type: 'استكشافي',
              credit: 2,
              coefficient: 1,
              description: 'مبادئ الحاسوب والبرمجيات الأساسية',
              objectives: ['استخدام الحاسوب', 'التعامل مع البرمجيات الأساسية'],
              references: []
            },
            {
              id: 'l1-s1-foreign-language',
              name: 'Foreign Language',
              nameAr: 'لغة أجنبية (إنجليزية/فرنسية)',
              type: 'استكشافي',
              credit: 2,
              coefficient: 1,
              description: 'اللغة الأجنبية للأغراض الأكاديمية',
              objectives: ['القراءة الأكاديمية', 'الكتابة الأكاديمية'],
              references: []
            },
            {
              id: 'l1-s1-education',
              name: 'Education Science',
              nameAr: 'علم التربية',
              type: 'استكشافي',
              credit: 2,
              coefficient: 1,
              description: 'مبادئ علم التربية والتعليم',
              objectives: ['فهم أساسيات التربية', 'معرفة نظريات التعلم'],
              references: []
            }
          ]
        },
        {
          id: 'l1-s2',
          number: 2,
          name: 'Semester 2',
          nameAr: 'السداسي الثاني',
          subjects: [
            {
              id: 'l1-s2-tafsir-intro',
              name: 'Introduction to Tafsir',
              nameAr: 'مدخل إلى التفسير',
              type: 'أساسي',
              credit: 6,
              coefficient: 3,
              description: 'مقدمة في علم التفسير ومناهجه',
              objectives: ['معرفة مناهج التفسير', 'القدرة على فهم التفسير'],
              references: ['التفسير والمفسرون - الذهبي', 'أصول التفسير - ابن عثيمين']
            },
            {
              id: 'l1-s2-hadith-intro',
              name: 'Introduction to Hadith',
              nameAr: 'مدخل إلى الحديث',
              type: 'أساسي',
              credit: 6,
              coefficient: 3,
              description: 'مقدمة في علم الحديث ومصطلحاته',
              objectives: ['معرفة مصطلحات الحديث', 'فهم علوم الحديث'],
              references: ['نزهة النظر - ابن حجر', 'تيسير مصطلح الحديث - الطحان']
            },
            {
              id: 'l1-s2-transactions-fiqh',
              name: 'Fiqh of Transactions',
              nameAr: 'فقه المعاملات',
              type: 'أساسي',
              credit: 6,
              coefficient: 3,
              description: 'أحكام المعاملات المالية والتجارية',
              objectives: ['معرفة أحكام البيوع', 'فهم المعاملات المالية'],
              references: ['فقه السنة - السيد سابق', 'المحلى - ابن حزم']
            },
            {
              id: 'l1-s2-usul-intro',
              name: 'Introduction to Usul al-Fiqh',
              nameAr: 'أصول الفقه (مدخل)',
              type: 'أساسي',
              credit: 5,
              coefficient: 2,
              description: 'مقدمة في علم أصول الفقه',
              objectives: ['معرفة مبادئ أصول الفقه', 'فهم الأدلة الشرعية'],
              references: ['الورقات - الجويني', 'مذكرة أصول الفقه - الشنقيطي']
            },
            {
              id: 'l1-s2-legislation-history',
              name: 'History of Islamic Legislation',
              nameAr: 'تاريخ التشريع الإسلامي',
              type: 'أساسي',
              credit: 4,
              coefficient: 2,
              description: 'تاريخ التشريع الإسلامي وتطوره',
              objectives: ['معرفة مراحل التشريع', 'فهم تطور الفقه الإسلامي'],
              references: ['تاريخ التشريع الإسلامي - مناع القطان']
            },
            {
              id: 'l1-s2-rhetoric',
              name: 'Arabic Rhetoric',
              nameAr: 'البلاغة العربية',
              type: 'منهجي',
              credit: 4,
              coefficient: 2,
              description: 'علوم البلاغة: المعاني والبيان والبديع',
              objectives: ['فهم علوم البلاغة', 'القدرة على التحليل البلاغي'],
              references: ['البلاغة الواضحة', 'جواهر البلاغة']
            },
            {
              id: 'l1-s2-methodology-applied',
              name: 'Applied Research Methodology',
              nameAr: 'منهجية البحث (تطبيقي)',
              type: 'منهجي',
              credit: 4,
              coefficient: 2,
              description: 'تطبيقات عملية في البحث العلمي',
              objectives: ['كتابة بحث علمي', 'التوثيق والمراجع'],
              references: []
            },
            {
              id: 'l1-s2-foreign-language-2',
              name: 'Foreign Language 2',
              nameAr: 'لغة أجنبية 2',
              type: 'استكشافي',
              credit: 2,
              coefficient: 1,
              description: 'تطوير مهارات اللغة الأجنبية',
              objectives: ['تحسين القراءة', 'تحسين الكتابة'],
              references: []
            }
          ]
        }
      ]
    },
    // Year 2 (L2)
    {
      id: 'l2',
      level: 'L2',
      levelAr: 'السنة الثانية',
      semesters: [
        {
          id: 'l2-s3',
          number: 3,
          name: 'Semester 3',
          nameAr: 'السداسي الثالث',
          subjects: [
            {
              id: 'l2-s3-thematic-tafsir',
              name: 'Thematic Tafsir',
              nameAr: 'التفسير الموضوعي',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l2-s3-hadith-terminology',
              name: 'Hadith Terminology',
              nameAr: 'مصطلح الحديث',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l2-s3-usul-evidence',
              name: 'Usul al-Fiqh (Legislative Evidence)',
              nameAr: 'أصول الفقه (الأدلة الشرعية)',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l2-s3-maqasid',
              name: 'Objectives of Shariah',
              nameAr: 'مقاصد الشريعة',
              type: 'أساسي',
              credit: 5,
              coefficient: 2
            },
            {
              id: 'l2-s3-advanced-grammar',
              name: 'Advanced Grammar',
              nameAr: 'النحو المتقدم',
              type: 'منهجي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l2-s3-family-fiqh',
              name: 'Family Fiqh',
              nameAr: 'فقه الأسرة',
              type: 'أساسي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l2-s3-islamic-sects',
              name: 'History of Islamic Sects',
              nameAr: 'تاريخ الفرق الإسلامية',
              type: 'أساسي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l2-s3-foreign-language',
              name: 'Foreign Language',
              nameAr: 'لغة أجنبية',
              type: 'استكشافي',
              credit: 2,
              coefficient: 1
            }
          ]
        },
        {
          id: 'l2-s4',
          number: 4,
          name: 'Semester 4',
          nameAr: 'السداسي الرابع',
          subjects: [
            {
              id: 'l2-s4-tafsir-methods',
              name: 'Quranic Sciences (Methods of Interpreters)',
              nameAr: 'علوم القرآن (مناهج المفسرين)',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l2-s4-hadith-authentication',
              name: 'Hadith Authentication',
              nameAr: 'تخريج الحديث',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l2-s4-fiqh-rules',
              name: 'Jurisprudential Rules',
              nameAr: 'القواعد الفقهية',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l2-s4-usul-qiyas',
              name: 'Usul al-Fiqh (Analogy and Presumption)',
              nameAr: 'أصول الفقه (القياس والاستصحاب)',
              type: 'أساسي',
              credit: 5,
              coefficient: 2
            },
            {
              id: 'l2-s4-kalam',
              name: 'Islamic Theology',
              nameAr: 'علم الكلام',
              type: 'أساسي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l2-s4-islamic-thought',
              name: 'Islamic Thought',
              nameAr: 'الفكر الإسلامي',
              type: 'أساسي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l2-s4-research-project',
              name: 'Research Methodology (Project)',
              nameAr: 'منهجية البحث (مشروع)',
              type: 'منهجي',
              credit: 4,
              coefficient: 2
            }
          ]
        }
      ]
    },
    // Year 3 (L3)
    {
      id: 'l3',
      level: 'L3',
      levelAr: 'السنة الثالثة',
      semesters: [
        {
          id: 'l3-s5',
          number: 5,
          name: 'Semester 5',
          nameAr: 'السداسي الخامس',
          subjects: [
            {
              id: 'l3-s5-analytical-tafsir',
              name: 'Analytical Tafsir',
              nameAr: 'التفسير التحليلي',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l3-s5-hadith-defects',
              name: 'Hadith Defects',
              nameAr: 'علل الحديث',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l3-s5-contemporary-fiqh',
              name: 'Contemporary Fiqh Issues',
              nameAr: 'فقه النوازل',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l3-s5-siyasah',
              name: 'Islamic Governance',
              nameAr: 'السياسة الشرعية',
              type: 'أساسي',
              credit: 5,
              coefficient: 2
            },
            {
              id: 'l3-s5-comparative-religion',
              name: 'Comparative Religion',
              nameAr: 'مقارنة الأديان',
              type: 'أساسي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l3-s5-media-dawah',
              name: 'Media and Dawah',
              nameAr: 'الإعلام والدعوة',
              type: 'أساسي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l3-s5-elective',
              name: 'Elective Courses',
              nameAr: 'مقاييس اختيارية',
              type: 'اختياري',
              credit: 4,
              coefficient: 2
            }
          ]
        },
        {
          id: 'l3-s6',
          number: 6,
          name: 'Semester 6',
          nameAr: 'السداسي السادس',
          subjects: [
            {
              id: 'l3-s6-maqasid-applied',
              name: 'Objectives of Shariah (Applied)',
              nameAr: 'مقاصد الشريعة (تطبيقي)',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l3-s6-jihad-fiqh',
              name: 'Fiqh of Jihad and International Relations',
              nameAr: 'فقه الجهاد والعلاقات الدولية',
              type: 'أساسي',
              credit: 6,
              coefficient: 3
            },
            {
              id: 'l3-s6-orientalism',
              name: 'Orientalist Thought',
              nameAr: 'الفكر الاستشراقي',
              type: 'أساسي',
              credit: 5,
              coefficient: 2
            },
            {
              id: 'l3-s6-islamic-ethics',
              name: 'Islamic Ethics',
              nameAr: 'الأخلاق الإسلامية',
              type: 'أساسي',
              credit: 4,
              coefficient: 2
            },
            {
              id: 'l3-s6-thesis',
              name: 'Graduation Thesis',
              nameAr: 'مذكرة تخرج',
              type: 'منهجي',
              credit: 10,
              coefficient: 5
            }
          ]
        }
      ]
    }
  ]
};

// Master Programs (2 years / 4 semesters each)
export const masterPrograms: Program[] = [
  {
    id: 'master-tafsir',
    name: 'Master in Tafsir and Quranic Sciences',
    nameAr: 'ماستر: التفسير وعلوم القرآن',
    degree: 'ماستر',
    duration: '2 years / 4 semesters',
    durationAr: 'سنتان / 4 سداسيات',
    description: 'تخصص في التفسير وعلوم القرآن الكريم',
    years: [
      {
        id: 'm-tafsir-y1',
        level: 'M1',
        levelAr: 'السنة الأولى',
        semesters: [
          {
            id: 'm-tafsir-s1',
            number: 1,
            name: 'Semester 1',
            nameAr: 'السداسي الأول',
            subjects: [
              { id: 'm-tafsir-s1-1', name: 'Methods of Interpreters', nameAr: 'مناهج المفسرين', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-tafsir-s1-2', name: 'Quranic Miracles', nameAr: 'إعجاز القرآن', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-tafsir-s1-3', name: 'Quranic Readings', nameAr: 'القراءات القرآنية', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-tafsir-s1-4', name: 'Advanced Quranic Sciences', nameAr: 'علوم القرآن المتقدمة', type: 'أساسي', credit: 6, coefficient: 2 },
              { id: 'm-tafsir-s1-5', name: 'Quranic Research Methodology', nameAr: 'منهجية البحث القرآني', type: 'منهجي', credit: 5, coefficient: 2 }
            ]
          },
          {
            id: 'm-tafsir-s2',
            number: 2,
            name: 'Semester 2',
            nameAr: 'السداسي الثاني',
            subjects: [
              { id: 'm-tafsir-s2-1', name: 'In-depth Thematic Tafsir', nameAr: 'التفسير الموضوعي المعمق', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-tafsir-s2-2', name: 'Interpretive Rules', nameAr: 'القواعد التفسيرية', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-tafsir-s2-3', name: 'Contemporary Quranic Studies', nameAr: 'الدراسات القرآنية المعاصرة', type: 'أساسي', credit: 6, coefficient: 2 },
              { id: 'm-tafsir-s2-4', name: 'Doubts about the Quran', nameAr: 'شبهات حول القرآن', type: 'أساسي', credit: 6, coefficient: 2 },
              { id: 'm-tafsir-s2-5', name: 'Research Project', nameAr: 'مشروع بحث', type: 'منهجي', credit: 5, coefficient: 2 }
            ]
          }
        ]
      },
      {
        id: 'm-tafsir-y2',
        level: 'M2',
        levelAr: 'السنة الثانية',
        semesters: [
          {
            id: 'm-tafsir-s3',
            number: 3,
            name: 'Semester 3',
            nameAr: 'السداسي الثالث',
            subjects: [
              { id: 'm-tafsir-s3-1', name: 'Comparative Tafsir', nameAr: 'التفسير المقارن', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-tafsir-s3-2', name: 'Orientalist Methods in Quran', nameAr: 'مناهج المستشرقين في القرآن', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-tafsir-s3-3', name: 'Contemporary Quranic Issues', nameAr: 'قضايا قرآنية معاصرة', type: 'أساسي', credit: 6, coefficient: 2 },
              { id: 'm-tafsir-s3-4', name: 'Field Research', nameAr: 'بحث ميداني', type: 'منهجي', credit: 11, coefficient: 4 }
            ]
          },
          {
            id: 'm-tafsir-s4',
            number: 4,
            name: 'Semester 4',
            nameAr: 'السداسي الرابع',
            subjects: [
              { id: 'm-tafsir-s4-1', name: 'Master Thesis', nameAr: 'مذكرة ماستر', type: 'منهجي', credit: 30, coefficient: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'master-hadith',
    name: 'Master in Hadith Sciences',
    nameAr: 'ماستر: الحديث وعلومه',
    degree: 'ماستر',
    duration: '2 years / 4 semesters',
    durationAr: 'سنتان / 4 سداسيات',
    description: 'تخصص في الحديث النبوي الشريف وعلومه',
    years: [
      {
        id: 'm-hadith-y1',
        level: 'M1',
        levelAr: 'السنة الأولى',
        semesters: [
          {
            id: 'm-hadith-s1',
            number: 1,
            name: 'Semester 1',
            nameAr: 'السداسي الأول',
            subjects: [
              { id: 'm-hadith-s1-1', name: 'Advanced Hadith Terminology', nameAr: 'مصطلح الحديث المتقدم', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-hadith-s1-2', name: 'Criticism and Authentication', nameAr: 'الجرح والتعديل', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-hadith-s1-3', name: 'Methods of Hadith Scholars', nameAr: 'مناهج المحدثين', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-hadith-s1-4', name: 'Applied Hadith Authentication', nameAr: 'تخريج الحديث (تطبيقي)', type: 'أساسي', credit: 11, coefficient: 3 }
            ]
          },
          {
            id: 'm-hadith-s2',
            number: 2,
            name: 'Semester 2',
            nameAr: 'السداسي الثاني',
            subjects: [
              { id: 'm-hadith-s2-1', name: 'Hadith Defects', nameAr: 'علل الحديث', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-hadith-s2-2', name: 'Fabricated Hadith', nameAr: 'الحديث الموضوع', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-hadith-s2-3', name: 'Sunnah and Its Legislative Status', nameAr: 'السنة ومكانتها التشريعية', type: 'أساسي', credit: 6, coefficient: 2 },
              { id: 'm-hadith-s2-4', name: 'Doubts about Sunnah', nameAr: 'شبهات حول السنة', type: 'أساسي', credit: 11, coefficient: 4 }
            ]
          }
        ]
      },
      {
        id: 'm-hadith-y2',
        level: 'M2',
        levelAr: 'السنة الثانية',
        semesters: [
          {
            id: 'm-hadith-s3',
            number: 3,
            name: 'Semester 3',
            nameAr: 'السداسي الثالث',
            subjects: [
              { id: 'm-hadith-s3-1', name: 'Methods of Critics', nameAr: 'مناهج النقاد', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-hadith-s3-2', name: 'Contemporary Hadith Studies', nameAr: 'الدراسات الحديثية المعاصرة', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-hadith-s3-3', name: 'Hadith and Orientalism', nameAr: 'الحديث والاستشراق', type: 'أساسي', credit: 17, coefficient: 6 }
            ]
          },
          {
            id: 'm-hadith-s4',
            number: 4,
            name: 'Semester 4',
            nameAr: 'السداسي الرابع',
            subjects: [
              { id: 'm-hadith-s4-1', name: 'Master Thesis', nameAr: 'مذكرة ماستر', type: 'منهجي', credit: 30, coefficient: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'master-fiqh',
    name: 'Master in Fiqh and Usul al-Fiqh',
    nameAr: 'ماستر: الفقه وأصوله',
    degree: 'ماستر',
    duration: '2 years / 4 semesters',
    durationAr: 'سنتان / 4 سداسيات',
    description: 'تخصص في الفقه الإسلامي وأصوله',
    years: [
      {
        id: 'm-fiqh-y1',
        level: 'M1',
        levelAr: 'السنة الأولى',
        semesters: [
          {
            id: 'm-fiqh-s1',
            number: 1,
            name: 'Semester 1',
            nameAr: 'السداسي الأول',
            subjects: [
              { id: 'm-fiqh-s1-1', name: 'Comparative Usul al-Fiqh', nameAr: 'أصول الفقه المقارن', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-fiqh-s1-2', name: 'Objectives of Shariah', nameAr: 'مقاصد الشريعة', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-fiqh-s1-3', name: 'Major Jurisprudential Rules', nameAr: 'القواعد الفقهية الكبرى', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-fiqh-s1-4', name: 'Fiqh of Disagreement', nameAr: 'فقه الخلاف', type: 'أساسي', credit: 11, coefficient: 3 }
            ]
          },
          {
            id: 'm-fiqh-s2',
            number: 2,
            name: 'Semester 2',
            nameAr: 'السداسي الثاني',
            subjects: [
              { id: 'm-fiqh-s2-1', name: 'Contemporary Fiqh Issues', nameAr: 'فقه النوازل', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-fiqh-s2-2', name: 'Islamic Governance', nameAr: 'السياسة الشرعية', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-fiqh-s2-3', name: 'Fiqh of Minorities', nameAr: 'فقه الأقليات', type: 'أساسي', credit: 6, coefficient: 2 },
              { id: 'm-fiqh-s2-4', name: 'Contemporary Financial Transactions', nameAr: 'فقه المعاملات المعاصرة', type: 'أساسي', credit: 11, coefficient: 4 }
            ]
          }
        ]
      },
      {
        id: 'm-fiqh-y2',
        level: 'M2',
        levelAr: 'السنة الثانية',
        semesters: [
          {
            id: 'm-fiqh-s3',
            number: 3,
            name: 'Semester 3',
            nameAr: 'السداسي الثالث',
            subjects: [
              { id: 'm-fiqh-s3-1', name: 'Comparative Fiqh', nameAr: 'الفقه المقارن', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-fiqh-s3-2', name: 'Ijtihad and Renewal', nameAr: 'الاجتهاد والتجديد', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-fiqh-s3-3', name: 'Contemporary Fiqh Issues', nameAr: 'قضايا فقهية معاصرة', type: 'أساسي', credit: 17, coefficient: 6 }
            ]
          },
          {
            id: 'm-fiqh-s4',
            number: 4,
            name: 'Semester 4',
            nameAr: 'السداسي الرابع',
            subjects: [
              { id: 'm-fiqh-s4-1', name: 'Master Thesis', nameAr: 'مذكرة ماستر', type: 'منهجي', credit: 30, coefficient: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'master-creed',
    name: 'Master in Creed and Islamic Thought',
    nameAr: 'ماستر: العقيدة والفكر الإسلامي',
    degree: 'ماستر',
    duration: '2 years / 4 semesters',
    durationAr: 'سنتان / 4 سداسيات',
    description: 'تخصص في العقيدة الإسلامية والفكر الإسلامي',
    years: [
      {
        id: 'm-creed-y1',
        level: 'M1',
        levelAr: 'السنة الأولى',
        semesters: [
          {
            id: 'm-creed-s1',
            number: 1,
            name: 'Semester 1',
            nameAr: 'السداسي الأول',
            subjects: [
              { id: 'm-creed-s1-1', name: 'Advanced Islamic Creed', nameAr: 'العقيدة الإسلامية المتقدمة', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-creed-s1-2', name: 'Theological Sects', nameAr: 'الفرق الكلامية', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-creed-s1-3', name: 'Modern Islamic Thought', nameAr: 'الفكر الإسلامي الحديث', type: 'أساسي', credit: 17, coefficient: 6 }
            ]
          },
          {
            id: 'm-creed-s2',
            number: 2,
            name: 'Semester 2',
            nameAr: 'السداسي الثاني',
            subjects: [
              { id: 'm-creed-s2-1', name: 'Contemporary Atheism', nameAr: 'الإلحاد المعاصر', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-creed-s2-2', name: 'Comparative Religion', nameAr: 'مقارنة الأديان', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-creed-s2-3', name: 'Creedal Doubts', nameAr: 'الشبهات العقدية', type: 'أساسي', credit: 17, coefficient: 6 }
            ]
          }
        ]
      },
      {
        id: 'm-creed-y2',
        level: 'M2',
        levelAr: 'السنة الثانية',
        semesters: [
          {
            id: 'm-creed-s3',
            number: 3,
            name: 'Semester 3',
            nameAr: 'السداسي الثالث',
            subjects: [
              { id: 'm-creed-s3-1', name: 'Contemporary Philosophies', nameAr: 'الفلسفات المعاصرة', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-creed-s3-2', name: 'Methods of Refuting Opponents', nameAr: 'مناهج الرد على المخالفين', type: 'أساسي', credit: 23, coefficient: 9 }
            ]
          },
          {
            id: 'm-creed-s4',
            number: 4,
            name: 'Semester 4',
            nameAr: 'السداسي الرابع',
            subjects: [
              { id: 'm-creed-s4-1', name: 'Master Thesis', nameAr: 'مذكرة ماستر', type: 'منهجي', credit: 30, coefficient: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'master-dawah',
    name: 'Master in Dawah and Islamic Media',
    nameAr: 'ماستر: الدعوة والإعلام الإسلامي',
    degree: 'ماستر',
    duration: '2 years / 4 semesters',
    durationAr: 'سنتان / 4 سداسيات',
    description: 'تخصص في الدعوة الإسلامية والإعلام',
    years: [
      {
        id: 'm-dawah-y1',
        level: 'M1',
        levelAr: 'السنة الأولى',
        semesters: [
          {
            id: 'm-dawah-s1',
            number: 1,
            name: 'Semester 1',
            nameAr: 'السداسي الأول',
            subjects: [
              { id: 'm-dawah-s1-1', name: 'Fiqh of Dawah', nameAr: 'فقه الدعوة', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-dawah-s1-2', name: 'Modern Communication Methods', nameAr: 'وسائل الاتصال الحديثة', type: 'أساسي', credit: 6, coefficient: 3 },
              { id: 'm-dawah-s1-3', name: 'Contemporary Dawah Discourse', nameAr: 'الخطاب الدعوي المعاصر', type: 'أساسي', credit: 17, coefficient: 6 }
            ]
          },
          {
            id: 'm-dawah-s2',
            number: 2,
            name: 'Semester 2',
            nameAr: 'السداسي الثاني',
            subjects: [
              { id: 'm-dawah-s2-1', name: 'New Media', nameAr: 'الإعلام الجديد', type: 'أساسي', credit: 7, coefficient: 3 },
              { id: 'm-dawah-s2-2', name: 'Applied Dawah Project', nameAr: 'مشروع دعوي تطبيقي', type: 'منهجي', credit: 23, coefficient: 9 }
            ]
          }
        ]
      },
      {
        id: 'm-dawah-y2',
        level: 'M2',
        levelAr: 'السنة الثانية',
        semesters: [
          {
            id: 'm-dawah-s3',
            number: 3,
            name: 'Semester 3',
            nameAr: 'السداسي الثالث',
            subjects: [
              { id: 'm-dawah-s3-1', name: 'Research Project', nameAr: 'مشروع بحثي', type: 'منهجي', credit: 30, coefficient: 12 }
            ]
          },
          {
            id: 'm-dawah-s4',
            number: 4,
            name: 'Semester 4',
            nameAr: 'السداسي الرابع',
            subjects: [
              { id: 'm-dawah-s4-1', name: 'Master Thesis', nameAr: 'مذكرة ماستر', type: 'منهجي', credit: 30, coefficient: 10 }
            ]
          }
        ]
      }
    ]
  }
];

// Doctorate Program (General Structure)
export const doctorateProgram: Program = {
  id: 'doctorate-islamic-studies',
  name: 'Doctorate in Islamic Studies',
  nameAr: 'دكتوراه العلوم الإسلامية',
  degree: 'دكتوراه',
  duration: '3-5 years',
  durationAr: '3-5 سنوات',
  description: 'تكوين بحثي متقدم في العلوم الإسلامية',
  years: [
    {
      id: 'phd-y1',
      level: 'PhD',
      levelAr: 'الدكتوراه',
      semesters: [
        {
          id: 'phd-s1',
          number: 1,
          name: 'Research Phase',
          nameAr: 'مرحلة البحث',
          subjects: [
            { id: 'phd-1', name: 'Advanced Research Methods', nameAr: 'مناهج البحث المتقدم', type: 'منهجي', credit: 10, coefficient: 4 },
            { id: 'phd-2', name: 'Readings in Heritage', nameAr: 'قراءات في التراث', type: 'أساسي', credit: 8, coefficient: 3 },
            { id: 'phd-3', name: 'Contemporary Issues in Specialization', nameAr: 'قضايا معاصرة في التخصص', type: 'أساسي', credit: 8, coefficient: 3 },
            { id: 'phd-4', name: 'Research Seminars', nameAr: 'حلقات بحث', type: 'منهجي', credit: 10, coefficient: 4 },
            { id: 'phd-5', name: 'Doctoral Dissertation', nameAr: 'أطروحة دكتوراه', type: 'منهجي', credit: 120, coefficient: 20 }
          ]
        }
      ]
    }
  ]
};

// Statistics for the platform
export const platformStats = {
  totalSubjects: 50,
  totalStudents: 1000,
  totalLessons: 200,
  totalSpecializations: 5
};

// Export all programs
export const allPrograms = [licenceProgram, ...masterPrograms, doctorateProgram];
