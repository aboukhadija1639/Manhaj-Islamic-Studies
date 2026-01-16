/**
 * Module Model - Business Logic
 * نموذج المقياس مع المنطق
 */

import type { Module, ModuleSummary, ModuleType } from '../types';

/**
 * فئة نموذج المقياس
 */
export class ModuleModel {
  private module: Module;

  constructor(module: Module) {
    this.module = module;
  }

  /**
   * الحصول على البيانات الكاملة
   */
  getData(): Module {
    return { ...this.module };
  }

  /**
   * الحصول على ملخص المقياس
   */
  getSummary(): ModuleSummary {
    return {
      id: this.module.id,
      code: this.module.code,
      nameAr: this.module.nameAr,
      nameEn: this.module.nameEn,
      type: this.module.type,
      credits: this.module.credits,
      totalHours: this.getTotalWeeklyHours(),
      icon: this.module.icon,
      color: this.module.color,
    };
  }

  /**
   * التحقق من صحة البيانات
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.module.id) errors.push('معرف المقياس مطلوب');
    if (!this.module.code) errors.push('رمز المقياس مطلوب');
    if (!this.module.nameAr) errors.push('الاسم بالعربية مطلوب');
    if (!this.module.nameEn) errors.push('الاسم بالإنجليزية مطلوب');
    
    if (this.module.credits <= 0) {
      errors.push('عدد الوحدات يجب أن يكون أكبر من صفر');
    }

    const totalAssessment = this.module.assessment.continuous + this.module.assessment.exam;
    if (totalAssessment !== 100) {
      errors.push('مجموع نسب التقييم يجب أن يكون 100%');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * الحصول على إجمالي الساعات الأسبوعية
   */
  getTotalWeeklyHours(): number {
    const { lecture, tutorial, practical } = this.module.weeklyHours;
    return lecture + tutorial + practical;
  }

  /**
   * الحصول على عدد الوحدات التعليمية
   */
  getUnitsCount(): number {
    return this.module.unitIds.length;
  }

  /**
   * الحصول على عدد الموارد
   */
  getResourcesCount(): number {
    return this.module.resourceIds.length;
  }

  /**
   * الحصول على عدد المتطلبات
   */
  getPrerequisitesCount(): number {
    return this.module.prerequisiteIds.length;
  }

  /**
   * التحقق من وجود متطلبات
   */
  hasPrerequisites(): boolean {
    return this.module.prerequisiteIds.length > 0;
  }

  /**
   * التحقق من نوع المقياس
   */
  isFundamental(): boolean {
    return this.module.type === 'fundamental';
  }

  isMethodology(): boolean {
    return this.module.type === 'methodology';
  }

  isDiscovery(): boolean {
    return this.module.type === 'discovery';
  }

  isTransversal(): boolean {
    return this.module.type === 'transversal';
  }

  isOptional(): boolean {
    return this.module.type === 'optional';
  }

  /**
   * الحصول على نسبة التقييم المستمر
   */
  getContinuousAssessmentPercentage(): number {
    return this.module.assessment.continuous;
  }

  /**
   * الحصول على نسبة الامتحان
   */
  getExamPercentage(): number {
    return this.module.assessment.exam;
  }

  /**
   * الحصول على معلومات الأستاذ
   */
  getInstructor(): { name: string; title: string } | null {
    return this.module.instructor || null;
  }
}

/**
 * دالة مساعدة لإنشاء نموذج مقياس
 */
export function createModuleModel(module: Module): ModuleModel {
  return new ModuleModel(module);
}

/**
 * دالة مساعدة للتحقق من نوع المقياس
 */
export function isModuleType(value: string): value is ModuleType {
  const validTypes: ModuleType[] = [
    'fundamental',
    'methodology',
    'discovery',
    'transversal',
    'optional',
  ];
  return validTypes.includes(value as ModuleType);
}

/**
 * الحصول على اسم نوع المقياس بالعربية
 */
export function getModuleTypeNameAr(type: ModuleType): string {
  const names: Record<ModuleType, string> = {
    fundamental: 'أساسي (UEF)',
    methodology: 'منهجي (UEM)',
    discovery: 'استكشافي (UED)',
    transversal: 'أفقي (UET)',
    optional: 'اختياري',
  };
  return names[type];
}

/**
 * الحصول على لون نوع المقياس
 */
export function getModuleTypeColor(type: ModuleType): string {
  const colors: Record<ModuleType, string> = {
    fundamental: 'emerald',
    methodology: 'blue',
    discovery: 'amber',
    transversal: 'purple',
    optional: 'gray',
  };
  return colors[type];
}
