/**
 * أنواع التخصصات الأكاديمية
 * Academic Specialty Types
 * 
 * كلية العلوم الإسلامية - جامعة الوادي
 */

/**
 * مجال التخصص
 * Specialty Area
 */
export type SpecialtyArea =
  | 'quran-sciences'      // علوم القرآن والقراءات
  | 'hadith-sciences'     // الحديث وعلومه
  | 'fiqh'                // الفقه وأصوله
  | 'aqidah'              // العقيدة والمذاهب المعاصرة
  | 'dawah'               // الدعوة والثقافة الإسلامية
  | 'sharia-law'          // الشريعة والقانون
  | 'arabic-quran';       // اللغة العربية والدراسات القرآنية

/**
 * التخصص الأكاديمي
 * Academic Specialty
 */
export interface Specialty {
  /** معرف فريد للتخصص */
  id: string;
  
  /** مجال التخصص */
  area: SpecialtyArea;
  
  /** الاسم بالعربية */
  nameAr: string;
  
  /** الاسم بالإنجليزية */
  nameEn: string;
  
  /** الوصف */
  description: string;
  
  /** نوع الدرجة (ليسانس أو ماستر) */
  degreeType: 'licence' | 'master';
  
  /** الأهداف التعليمية */
  objectives: string[];
  
  /** المخرجات المتوقعة */
  outcomes: string[];
  
  /** المسارات المهنية */
  careerPaths: string[];
  
  /** المسارات الممكنة للماستر (للتخصصات في الليسانس) */
  masterPathways?: string[];
  
  /** المتطلبات من الليسانس (لتخصصات الماستر) */
  licencePrerequisites?: string[];
  
  /** الآفاق البحثية */
  researchAreas?: string[];
  
  /** الآفاق المهنية التفصيلية */
  detailedCareerOutlooks?: {
    title: string;
    description: string;
    sectors: string[];
  }[];
  
  /** الأيقونة */
  icon: string;
  
  /** اللون (للتصميم) */
  color: string;
  
  /** التدرج اللوني */
  gradient: string;
  
  /** البيانات الوصفية */
  metadata?: {
    /** عدد الطلاب التقريبي */
    studentCount?: number;
    /** تاريخ الإنشاء */
    establishedYear?: number;
    /** الاعتماد الأكاديمي */
    accreditation?: string;
  };
}

/**
 * ملخص التخصص (للعرض في القوائم)
 */
export interface SpecialtySummary {
  id: string;
  area: SpecialtyArea;
  nameAr: string;
  nameEn: string;
  degreeType: 'licence' | 'master';
  icon: string;
  color: string;
}

/**
 * متطلبات القبول في التخصص
 */
export interface SpecialtyRequirements {
  specialtyId: string;
  minimumGrade?: number;
  prerequisites?: string[];
  requiredCourses?: string[];
  additionalRequirements?: string[];
}
