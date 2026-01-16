/**
 * أنواع الوحدة التعليمية
 * Unit Types
 */

/**
 * نوع محتوى الوحدة
 */
export type UnitContentType = 'pdf' | 'video' | 'quiz' | 'reading' | 'exercise' | 'presentation' | 'audio';

/**
 * الوحدة التعليمية (Lesson/Unit)
 */
export interface Unit {
  /** معرف فريد للوحدة */
  id: string;
  
  /** معرف المقياس */
  moduleId: string;
  
  /** الترتيب */
  order: number;
  
  /** العنوان بالعربية */
  titleAr: string;
  
  /** العنوان بالإنجليزية */
  titleEn: string;
  
  /** الوصف */
  description: string;
  
  /** المدة التقديرية (بالساعات) */
  duration: number;
  
  /** محتويات الوحدة */
  contents: UnitContent[];
  
  /** الأهداف */
  objectives: string[];
  
  /** الكلمات المفتاحية */
  keywords: string[];
  
  /** هل الوحدة إلزامية؟ */
  isRequired: boolean;
  
  /** معرفات الوحدات المتطلبة */
  prerequisiteUnitIds?: string[];
}

/**
 * محتوى الوحدة
 */
export interface UnitContent {
  /** معرف فريد للمحتوى */
  id: string;
  
  /** نوع المحتوى */
  type: UnitContentType;
  
  /** العنوان */
  title: string;
  
  /** المسار النسبي في مجلد المحتوى */
  path: string;
  
  /** البيانات الوصفية */
  metadata?: {
    /** عدد الصفحات (للـ PDF) */
    pages?: number;
    /** المدة (للفيديو/الصوت بالدقائق) */
    duration?: number;
    /** الحجم */
    size?: string;
    /** اللغة */
    language?: string;
    /** المؤلف */
    author?: string;
  };
  
  /** رابط خارجي (اختياري) */
  externalUrl?: string;
}

/**
 * ملخص الوحدة
 */
export interface UnitSummary {
  id: string;
  order: number;
  titleAr: string;
  duration: number;
  contentCount: number;
  isRequired: boolean;
}

/**
 * تقدم الطالب في الوحدة
 */
export interface UnitProgress {
  unitId: string;
  userId: string;
  isCompleted: boolean;
  completedContents: string[]; // IDs of completed contents
  progress: number; // 0-100
  lastAccessedAt: Date;
  completedAt?: Date;
}
