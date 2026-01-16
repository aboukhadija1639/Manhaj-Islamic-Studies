/**
 * أنواع المسارات الأكاديمية والانتقالات
 * Academic Pathways and Transitions Types
 * 
 * كلية العلوم الإسلامية - جامعة الوادي
 */

/**
 * مستوى السنة الدراسية
 * Academic Year Level
 */
export type YearLevel = 1 | 2 | 3;

/**
 * نوع المقياس في المسار الأكاديمي
 * Module Type in Academic Path
 */
export type AcademicModuleType = 
  | 'common-core'      // جذع مشترك (Year 1)
  | 'orientation'      // توجيه وتعمق (Year 2)
  | 'specialization'   // تخصص كامل (Year 3 or Master)
  | 'elective'         // اختياري
  | 'research';        // بحثي (Master only)

/**
 * مرحلة الدراسة
 * Study Phase
 */
export type StudyPhase = 
  | 'common-core'      // الجذع المشترك (Year 1)
  | 'orientation'      // التوجيه والتعمق (Year 2)
  | 'specialization';  // التخصص الكامل (Year 3)

/**
 * المسار الأكاديمي من الليسانس إلى الماستر
 * Academic Pathway from Licence to Master
 */
export interface AcademicPathway {
  /** معرف فريد للمسار */
  id: string;
  
  /** تخصص الليسانس */
  licenceSpecialtyId: string;
  
  /** تخصصات الماستر الممكنة */
  masterSpecialtyIds: string[];
  
  /** الوصف */
  description: string;
  
  /** المتطلبات */
  requirements: {
    /** المعدل الأدنى */
    minimumGrade?: number;
    /** المقاييس المطلوبة */
    requiredModules?: string[];
    /** المهارات المطلوبة */
    requiredSkills?: string[];
  };
  
  /** الآفاق المهنية */
  careerOutlooks: CareerOutlook[];
  
  /** الآفاق البحثية */
  researchAreas: string[];
}

/**
 * الآفاق المهنية
 * Career Outlook
 */
export interface CareerOutlook {
  /** المسمى الوظيفي */
  title: string;
  
  /** الوصف */
  description: string;
  
  /** القطاعات */
  sectors: string[];
  
  /** المهارات المطلوبة */
  requiredSkills: string[];
}

/**
 * نقطة الانتقال الأكاديمي
 * Academic Transition Point
 */
export interface TransitionPoint {
  /** معرف فريد */
  id: string;
  
  /** من (مرحلة أو سنة) */
  from: {
    phase: StudyPhase;
    yearLevel: YearLevel;
  };
  
  /** إلى (مرحلة أو سنة) */
  to: {
    phase: StudyPhase;
    yearLevel: YearLevel;
  };
  
  /** العنوان */
  title: string;
  
  /** الوصف */
  description: string;
  
  /** الإجراءات المطلوبة */
  requiredActions: string[];
  
  /** الموعد النهائي */
  deadline?: string;
  
  /** الإرشادات */
  guidance: string[];
}

/**
 * اختيار التخصص
 * Specialization Choice
 */
export interface SpecializationChoice {
  /** معرف الطالب */
  studentId: string;
  
  /** معرف التخصص المختار */
  specialtyId: string;
  
  /** تاريخ الاختيار */
  choiceDate: string;
  
  /** الأسباب */
  reasons?: string[];
  
  /** الحالة */
  status: 'pending' | 'approved' | 'rejected';
}

/**
 * معلومات المسار الأكاديمي للطالب
 * Student Academic Path Information
 */
export interface StudentAcademicPath {
  /** معرف الطالب */
  studentId: string;
  
  /** المرحلة الحالية */
  currentPhase: StudyPhase;
  
  /** السنة الحالية */
  currentYear: YearLevel;
  
  /** التخصص (إن وجد) */
  specialtyId?: string;
  
  /** المقاييس المكتملة */
  completedModules: string[];
  
  /** المقاييس الحالية */
  currentModules: string[];
  
  /** المعدل التراكمي */
  gpa?: number;
  
  /** نقاط الانتقال القادمة */
  upcomingTransitions: TransitionPoint[];
  
  /** المسارات الممكنة للماستر */
  possibleMasterPathways?: AcademicPathway[];
}

/**
 * معلومات الجذع المشترك
 * Common Core Information
 */
export interface CommonCoreInfo {
  /** العنوان */
  title: string;
  
  /** الوصف */
  description: string;
  
  /** المدة */
  duration: {
    years: number;
    semesters: number;
  };
  
  /** الأهداف */
  objectives: string[];
  
  /** المقاييس الإجبارية */
  requiredModules: string[];
  
  /** التخصصات المتاحة بعد الجذع المشترك */
  availableSpecialties: string[];
  
  /** موعد اختيار التخصص */
  specializationChoiceDeadline: string;
}

/**
 * معلومات التخصص الموسعة
 * Extended Specialty Information
 */
export interface ExtendedSpecialtyInfo {
  /** معرف التخصص */
  specialtyId: string;
  
  /** المرحلة */
  phase: StudyPhase;
  
  /** السنوات */
  years: YearLevel[];
  
  /** المقاييس حسب السنة */
  modulesByYear: {
    [year: number]: string[];
  };
  
  /** المسارات المهنية */
  careerPaths: CareerOutlook[];
  
  /** المسارات البحثية */
  researchAreas: string[];
  
  /** المسارات الممكنة للماستر */
  masterPathways: string[];
  
  /** المتطلبات */
  requirements: {
    minimumGrade?: number;
    prerequisiteModules?: string[];
    skills?: string[];
  };
}

/**
 * إحصائيات المسار الأكاديمي
 * Academic Path Statistics
 */
export interface AcademicPathStats {
  /** إجمالي المقاييس */
  totalModules: number;
  
  /** المقاييس المكتملة */
  completedModules: number;
  
  /** المقاييس المتبقية */
  remainingModules: number;
  
  /** نسبة الإنجاز */
  completionPercentage: number;
  
  /** الوحدات المكتسبة */
  earnedCredits: number;
  
  /** إجمالي الوحدات المطلوبة */
  totalRequiredCredits: number;
  
  /** المعدل التراكمي */
  gpa?: number;
}
