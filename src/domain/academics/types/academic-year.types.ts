/**
 * أنواع السنة الأكاديمية
 * Academic Year Types
 */

/**
 * السنة الأكاديمية
 * Academic Year
 */
export interface AcademicYear {
  /** معرف فريد للسنة */
  id: string;
  
  /** رقم السنة (1، 2، 3 للليسانس | 1، 2 للماستر) */
  yearNumber: number;
  
  /** معرف الدرجة */
  degreeId: string;
  
  /** معرف التخصص (اختياري للسنوات المشتركة) */
  specialtyId?: string;
  
  /** هل هذه سنة جذع مشترك؟ */
  isCommonCore: boolean;
  
  /** معرفات السداسيات */
  semesterIds: string[];
  
  /** الاسم بالعربية */
  nameAr: string;
  
  /** الاسم بالإنجليزية */
  nameEn: string;
  
  /** الوصف */
  description?: string;
  
  /** إجمالي الوحدات المطلوبة */
  totalCredits: number;
}

/**
 * ملخص السنة الأكاديمية
 */
export interface AcademicYearSummary {
  id: string;
  yearNumber: number;
  nameAr: string;
  isCommonCore: boolean;
  semesterCount: number;
  totalCredits: number;
}
