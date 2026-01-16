/**
 * أنواع السداسي
 * Semester Types
 */

/**
 * السداسي
 * Semester
 */
export interface Semester {
  /** معرف فريد للسداسي */
  id: string;
  
  /** رقم السداسي (1-6 للليسانس، 1-4 للماستر) */
  semesterNumber: number;
  
  /** معرف السنة الأكاديمية */
  yearId: string;
  
  /** معرفات المقاييس */
  moduleIds: string[];
  
  /** الاسم بالعربية */
  nameAr: string;
  
  /** الاسم بالإنجليزية */
  nameEn: string;
  
  /** الوصف */
  description?: string;
  
  /** إجمالي الوحدات */
  totalCredits: number;
  
  /** عدد الأسابيع */
  weeks: number;
  
  /** تاريخ البدء (اختياري) */
  startDate?: string;
  
  /** تاريخ الانتهاء (اختياري) */
  endDate?: string;
}

/**
 * ملخص السداسي
 */
export interface SemesterSummary {
  id: string;
  semesterNumber: number;
  nameAr: string;
  moduleCount: number;
  totalCredits: number;
}

/**
 * إحصائيات السداسي
 */
export interface SemesterStats {
  semesterId: string;
  totalModules: number;
  totalCredits: number;
  fundamentalModules: number;
  methodologyModules: number;
  discoveryModules: number;
  transversalModules: number;
  optionalModules: number;
}
