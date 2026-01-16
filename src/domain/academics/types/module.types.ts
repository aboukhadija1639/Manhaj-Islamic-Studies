/**
 * أنواع المقياس (Course/Module)
 * Module Types
 */

/**
 * نوع المقياس حسب التصنيف الأكاديمي
 */
export type ModuleType =
  | 'fundamental'   // أساسي (UEF)
  | 'methodology'   // منهجي (UEM)
  | 'discovery'     // استكشافي (UED)
  | 'transversal'   // أفقي (UET)
  | 'optional';     // اختياري

/**
 * نوع التقييم
 */
export type AssessmentType = 'continuous' | 'exam' | 'project' | 'presentation' | 'practical';

/**
 * المقياس (Course/Module)
 */
export interface Module {
  /** معرف فريد للمقياس */
  id: string;
  
  /** الرمز الأكاديمي (مثل: UEF-111) */
  code: string;
  
  /** الاسم بالعربية */
  nameAr: string;
  
  /** الاسم بالإنجليزية */
  nameEn: string;
  
  /** الوصف */
  description: string;
  
  /** نوع المقياس */
  type: ModuleType;
  
  /** عدد الوحدات (Credits) */
  credits: number;
  
  /** الساعات الأسبوعية */
  weeklyHours: {
    /** محاضرة */
    lecture: number;
    /** أعمال موجهة */
    tutorial: number;
    /** أعمال تطبيقية */
    practical: number;
  };
  
  /** معرف السداسي */
  semesterId: string;
  
  /** معرفات المقاييس المتطلبة */
  prerequisiteIds: string[];
  
  /** الأهداف التعليمية */
  objectives: string[];
  
  /** المخرجات المتوقعة */
  outcomes: string[];
  
  /** الكلمات المفتاحية */
  keywords: string[];
  
  /** معرفات الوحدات التعليمية */
  unitIds: string[];
  
  /** معرفات الموارد */
  resourceIds: string[];
  
  /** التقييم */
  assessment: {
    /** التقييم المستمر (%) */
    continuous: number;
    /** الامتحان النهائي (%) */
    exam: number;
    /** أنواع التقييم */
    types: AssessmentType[];
  };
  
  /** معلومات الأستاذ (اختياري) */
  instructor?: {
    /** الاسم */
    name: string;
    /** اللقب */
    title: string;
    /** البريد الإلكتروني */
    email?: string;
  };
  
  /** الأيقونة */
  icon?: string;
  
  /** اللون */
  color?: string;
  
  /** البيانات الوصفية */
  metadata?: {
    /** اللغة */
    language: 'ar' | 'en' | 'fr';
    /** مستوى الصعوبة */
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    /** تاريخ آخر تحديث */
    lastUpdated?: string;
  };
}

/**
 * ملخص المقياس (للعرض في القوائم)
 */
export interface ModuleSummary {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  type: ModuleType;
  credits: number;
  totalHours: number;
  icon?: string;
  color?: string;
}

/**
 * تفاصيل المقياس الموسعة
 */
export interface ModuleDetails extends Module {
  /** السداسي */
  semester?: {
    id: string;
    semesterNumber: number;
    nameAr: string;
  };
  /** السنة */
  year?: {
    id: string;
    yearNumber: number;
    nameAr: string;
  };
  /** الدرجة */
  degree?: {
    id: string;
    type: 'licence' | 'master';
    nameAr: string;
  };
  /** إحصائيات */
  stats?: {
    totalUnits: number;
    totalResources: number;
    estimatedDuration: number; // in hours
  };
}
