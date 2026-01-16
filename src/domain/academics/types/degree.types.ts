/**
 * أنواع الدرجة الأكاديمية
 * Academic Degree Types
 * 
 * كلية العلوم الإسلامية - جامعة الوادي
 * Faculty of Islamic Sciences - University of El Oued
 */

/**
 * نوع الدرجة الأكاديمية
 */
export type DegreeType = 'licence' | 'master';

/**
 * الدرجة الأكاديمية (ليسانس أو ماستر)
 * Academic Degree (Bachelor or Master)
 */
export interface Degree {
  /** معرف فريد للدرجة */
  id: string;
  
  /** نوع الدرجة */
  type: DegreeType;
  
  /** الاسم بالعربية */
  nameAr: string;
  
  /** الاسم بالإنجليزية */
  nameEn: string;
  
  /** الوصف */
  description: string;
  
  /** المدة الزمنية */
  duration: {
    /** عدد السنوات */
    years: number;
    /** عدد السداسيات */
    semesters: number;
  };
  
  /** معرفات التخصصات المتاحة */
  specialtyIds: string[];
  
  /** البيانات الوصفية */
  metadata: {
    /** الكلية */
    faculty: string;
    /** الجامعة */
    university: string;
    /** النظام الأكاديمي */
    system: 'LMD';
    /** تاريخ الإنشاء */
    createdAt?: string;
    /** آخر تحديث */
    updatedAt?: string;
  };
}

/**
 * ملخص الدرجة الأكاديمية (للعرض في القوائم)
 */
export interface DegreeSummary {
  id: string;
  type: DegreeType;
  nameAr: string;
  nameEn: string;
  duration: {
    years: number;
    semesters: number;
  };
  specialtyCount: number;
}
