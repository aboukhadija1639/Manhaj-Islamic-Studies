/**
 * Degree Model - Business Logic
 * نموذج الدرجة الأكاديمية مع المنطق
 */

import type { Degree, DegreeSummary, DegreeType } from '../types';

/**
 * فئة نموذج الدرجة الأكاديمية
 */
export class DegreeModel {
  private degree: Degree;

  constructor(degree: Degree) {
    this.degree = degree;
  }

  /**
   * الحصول على البيانات الكاملة
   */
  getData(): Degree {
    return { ...this.degree };
  }

  /**
   * الحصول على ملخص الدرجة
   */
  getSummary(): DegreeSummary {
    return {
      id: this.degree.id,
      type: this.degree.type,
      nameAr: this.degree.nameAr,
      nameEn: this.degree.nameEn,
      duration: this.degree.duration,
      specialtyCount: this.degree.specialtyIds.length,
    };
  }

  /**
   * التحقق من صحة البيانات
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.degree.id) errors.push('معرف الدرجة مطلوب');
    if (!this.degree.nameAr) errors.push('الاسم بالعربية مطلوب');
    if (!this.degree.nameEn) errors.push('الاسم بالإنجليزية مطلوب');
    
    if (this.degree.type === 'licence' && this.degree.duration.years !== 3) {
      errors.push('مدة الليسانس يجب أن تكون 3 سنوات');
    }
    
    if (this.degree.type === 'master' && this.degree.duration.years !== 2) {
      errors.push('مدة الماستر يجب أن تكون سنتان');
    }

    if (this.degree.type === 'licence' && this.degree.duration.semesters !== 6) {
      errors.push('عدد سداسيات الليسانس يجب أن يكون 6');
    }
    
    if (this.degree.type === 'master' && this.degree.duration.semesters !== 4) {
      errors.push('عدد سداسيات الماستر يجب أن يكون 4');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * الحصول على عدد السنوات
   */
  getYearsCount(): number {
    return this.degree.duration.years;
  }

  /**
   * الحصول على عدد السداسيات
   */
  getSemestersCount(): number {
    return this.degree.duration.semesters;
  }

  /**
   * الحصول على عدد التخصصات
   */
  getSpecialtyCount(): number {
    return this.degree.specialtyIds.length;
  }

  /**
   * التحقق من وجود تخصص معين
   */
  hasSpecialty(specialtyId: string): boolean {
    return this.degree.specialtyIds.includes(specialtyId);
  }

  /**
   * إضافة تخصص
   */
  addSpecialty(specialtyId: string): void {
    if (!this.hasSpecialty(specialtyId)) {
      this.degree.specialtyIds.push(specialtyId);
    }
  }

  /**
   * إزالة تخصص
   */
  removeSpecialty(specialtyId: string): void {
    this.degree.specialtyIds = this.degree.specialtyIds.filter(
      (id) => id !== specialtyId
    );
  }
}

/**
 * دالة مساعدة لإنشاء نموذج درجة
 */
export function createDegreeModel(degree: Degree): DegreeModel {
  return new DegreeModel(degree);
}

/**
 * دالة مساعدة للتحقق من نوع الدرجة
 */
export function isDegreeType(value: string): value is DegreeType {
  return value === 'licence' || value === 'master';
}
