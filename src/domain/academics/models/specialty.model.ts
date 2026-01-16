/**
 * Specialty Model - Business Logic
 * نموذج التخصص الأكاديمي مع المنطق
 */

import type { Specialty, SpecialtySummary, SpecialtyArea } from '../types';

/**
 * فئة نموذج التخصص
 */
export class SpecialtyModel {
  private specialty: Specialty;

  constructor(specialty: Specialty) {
    this.specialty = specialty;
  }

  /**
   * الحصول على البيانات الكاملة
   */
  getData(): Specialty {
    return { ...this.specialty };
  }

  /**
   * الحصول على ملخص التخصص
   */
  getSummary(): SpecialtySummary {
    return {
      id: this.specialty.id,
      area: this.specialty.area,
      nameAr: this.specialty.nameAr,
      nameEn: this.specialty.nameEn,
      degreeType: this.specialty.degreeType,
      icon: this.specialty.icon,
      color: this.specialty.color,
    };
  }

  /**
   * التحقق من صحة البيانات
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.specialty.id) errors.push('معرف التخصص مطلوب');
    if (!this.specialty.nameAr) errors.push('الاسم بالعربية مطلوب');
    if (!this.specialty.nameEn) errors.push('الاسم بالإنجليزية مطلوب');
    if (!this.specialty.description) errors.push('الوصف مطلوب');
    
    if (this.specialty.objectives.length === 0) {
      errors.push('يجب تحديد أهداف تعليمية');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * الحصول على عدد الأهداف
   */
  getObjectivesCount(): number {
    return this.specialty.objectives.length;
  }

  /**
   * الحصول على عدد المخرجات
   */
  getOutcomesCount(): number {
    return this.specialty.outcomes.length;
  }

  /**
   * الحصول على عدد المسارات المهنية
   */
  getCareerPathsCount(): number {
    return this.specialty.careerPaths.length;
  }

  /**
   * التحقق من نوع الدرجة
   */
  isLicence(): boolean {
    return this.specialty.degreeType === 'licence';
  }

  /**
   * التحقق من نوع الدرجة
   */
  isMaster(): boolean {
    return this.specialty.degreeType === 'master';
  }

  /**
   * الحصول على معلومات التصميم
   */
  getDesignInfo(): { icon: string; color: string; gradient: string } {
    return {
      icon: this.specialty.icon,
      color: this.specialty.color,
      gradient: this.specialty.gradient,
    };
  }
}

/**
 * دالة مساعدة لإنشاء نموذج تخصص
 */
export function createSpecialtyModel(specialty: Specialty): SpecialtyModel {
  return new SpecialtyModel(specialty);
}

/**
 * دالة مساعدة للتحقق من مجال التخصص
 */
export function isSpecialtyArea(value: string): value is SpecialtyArea {
  const validAreas: SpecialtyArea[] = [
    'quran-sciences',
    'hadith-sciences',
    'fiqh',
    'aqidah',
    'dawah',
    'sharia-law',
    'arabic-quran',
  ];
  return validAreas.includes(value as SpecialtyArea);
}

/**
 * الحصول على اسم مجال التخصص بالعربية
 */
export function getSpecialtyAreaNameAr(area: SpecialtyArea): string {
  const names: Record<SpecialtyArea, string> = {
    'quran-sciences': 'علوم القرآن والقراءات',
    'hadith-sciences': 'الحديث وعلومه',
    'fiqh': 'الفقه وأصوله',
    'aqidah': 'العقيدة والمذاهب المعاصرة',
    'dawah': 'الدعوة والثقافة الإسلامية',
    'sharia-law': 'الشريعة والقانون',
    'arabic-quran': 'اللغة العربية والدراسات القرآنية',
  };
  return names[area];
}
