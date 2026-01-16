/**
 * Progress Types
 * أنواع تتبع التقدم
 */

/**
 * تقدم المستخدم في مقياس
 */
export interface ModuleProgress {
  /** معرف المستخدم */
  userId: string;
  
  /** معرف المقياس */
  moduleId: string;
  
  /** الوحدات المكتملة */
  completedUnits: string[];
  
  /** المحتويات المكتملة */
  completedContents: string[];
  
  /** نسبة التقدم (0-100) */
  progress: number;
  
  /** آخر وحدة تم الوصول إليها */
  lastAccessedUnit?: string;
  
  /** تاريخ البدء */
  startedAt: Date;
  
  /** تاريخ آخر تحديث */
  lastUpdatedAt: Date;
  
  /** تاريخ الإكمال */
  completedAt?: Date;
  
  /** هل تم إكمال المقياس؟ */
  isCompleted: boolean;
}

/**
 * تقدم المستخدم في وحدة
 */
export interface UnitProgress {
  /** معرف المستخدم */
  userId: string;
  
  /** معرف الوحدة */
  unitId: string;
  
  /** المحتويات المكتملة */
  completedContents: string[];
  
  /** نسبة التقدم (0-100) */
  progress: number;
  
  /** هل تم إكمال الوحدة؟ */
  isCompleted: boolean;
  
  /** تاريخ آخر وصول */
  lastAccessedAt: Date;
  
  /** تاريخ الإكمال */
  completedAt?: Date;
  
  /** الوقت المستغرق (بالدقائق) */
  timeSpent?: number;
}

/**
 * تقدم المستخدم في محتوى
 */
export interface ContentProgress {
  /** معرف المستخدم */
  userId: string;
  
  /** معرف المحتوى */
  contentId: string;
  
  /** هل تم إكمال المحتوى؟ */
  isCompleted: boolean;
  
  /** نسبة التقدم (0-100) */
  progress: number;
  
  /** الموضع الحالي (للفيديو/الصوت) */
  currentPosition?: number;
  
  /** تاريخ آخر وصول */
  lastAccessedAt: Date;
  
  /** تاريخ الإكمال */
  completedAt?: Date;
  
  /** الوقت المستغرق (بالدقائق) */
  timeSpent?: number;
}

/**
 * إحصائيات التقدم
 */
export interface ProgressStats {
  /** معرف المستخدم */
  userId: string;
  
  /** إجمالي المقاييس */
  totalModules: number;
  
  /** المقاييس المكتملة */
  completedModules: number;
  
  /** المقاييس قيد التقدم */
  inProgressModules: number;
  
  /** إجمالي الوحدات */
  totalUnits: number;
  
  /** الوحدات المكتملة */
  completedUnits: number;
  
  /** نسبة التقدم الإجمالية (0-100) */
  overallProgress: number;
  
  /** الوقت الإجمالي المستغرق (بالساعات) */
  totalTimeSpent: number;
  
  /** آخر نشاط */
  lastActivity?: Date;
}

/**
 * إنجاز
 */
export interface Achievement {
  /** معرف فريد */
  id: string;
  
  /** معرف المستخدم */
  userId: string;
  
  /** نوع الإنجاز */
  type: 'module-completed' | 'semester-completed' | 'year-completed' | 'perfect-score' | 'streak';
  
  /** العنوان */
  title: string;
  
  /** الوصف */
  description: string;
  
  /** الأيقونة */
  icon: string;
  
  /** تاريخ الحصول عليه */
  earnedAt: Date;
  
  /** البيانات الإضافية */
  metadata?: {
    moduleId?: string;
    semesterId?: string;
    yearId?: string;
    score?: number;
    streakDays?: number;
  };
}
