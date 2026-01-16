/**
 * Content Types
 * أنواع المحتوى التعليمي
 */

/**
 * نوع المحتوى
 */
export type ContentType = 'pdf' | 'video' | 'audio' | 'quiz' | 'reading' | 'exercise' | 'presentation';

/**
 * حالة المحتوى
 */
export type ContentStatus = 'draft' | 'published' | 'archived';

/**
 * المحتوى التعليمي
 */
export interface Content {
  /** معرف فريد */
  id: string;
  
  /** معرف المقياس */
  moduleId: string;
  
  /** معرف الوحدة */
  unitId?: string;
  
  /** النوع */
  type: ContentType;
  
  /** العنوان */
  title: string;
  
  /** الوصف */
  description?: string;
  
  /** المسار النسبي */
  path: string;
  
  /** رابط خارجي */
  externalUrl?: string;
  
  /** الحالة */
  status: ContentStatus;
  
  /** البيانات الوصفية */
  metadata: ContentMetadata;
  
  /** تاريخ الإنشاء */
  createdAt: Date;
  
  /** تاريخ آخر تحديث */
  updatedAt: Date;
}

/**
 * البيانات الوصفية للمحتوى
 */
export interface ContentMetadata {
  /** اللغة */
  language: 'ar' | 'en' | 'fr';
  
  /** المؤلف */
  author?: string;
  
  /** الحجم (بالبايت) */
  size?: number;
  
  /** المدة (بالدقائق) */
  duration?: number;
  
  /** عدد الصفحات */
  pages?: number;
  
  /** الكلمات المفتاحية */
  keywords?: string[];
  
  /** الترخيص */
  license?: string;
  
  /** معلومات إضافية */
  [key: string]: unknown;
}

/**
 * مورد تعليمي
 */
export interface Resource {
  /** معرف فريد */
  id: string;
  
  /** معرف المقياس */
  moduleId: string;
  
  /** العنوان */
  title: string;
  
  /** الوصف */
  description?: string;
  
  /** النوع */
  type: 'reference' | 'supplementary' | 'exercise' | 'solution' | 'other';
  
  /** المسار أو الرابط */
  url: string;
  
  /** هل هو رابط خارجي؟ */
  isExternal: boolean;
  
  /** البيانات الوصفية */
  metadata?: {
    author?: string;
    publisher?: string;
    year?: number;
    isbn?: string;
  };
}

/**
 * ملف PDF
 */
export interface PDFContent extends Content {
  type: 'pdf';
  metadata: ContentMetadata & {
    pages: number;
    size: number;
  };
}

/**
 * محتوى فيديو
 */
export interface VideoContent extends Content {
  type: 'video';
  metadata: ContentMetadata & {
    duration: number;
    resolution?: string;
    format?: string;
  };
}

/**
 * محتوى صوتي
 */
export interface AudioContent extends Content {
  type: 'audio';
  metadata: ContentMetadata & {
    duration: number;
    format?: string;
  };
}

/**
 * اختبار
 */
export interface QuizContent extends Content {
  type: 'quiz';
  questions: QuizQuestion[];
  metadata: ContentMetadata & {
    totalQuestions: number;
    passingScore: number;
    timeLimit?: number;
  };
}

/**
 * سؤال اختبار
 */
export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}
