/**
 * Specialty Service
 * خدمة التخصصات الأكاديمية
 */

import type { Specialty, SpecialtySummary, SpecialtyArea } from '../types';
import { SpecialtyModel } from '../models';

/**
 * خدمة التخصصات الأكاديمية
 */
export class SpecialtyService {
  private specialties: Map<string, Specialty>;

  constructor(specialties: Specialty[] = []) {
    this.specialties = new Map(specialties.map((s) => [s.id, s]));
  }

  /**
   * الحصول على جميع التخصصات
   */
  getAllSpecialties(): Specialty[] {
    return Array.from(this.specialties.values());
  }

  /**
   * الحصول على ملخصات جميع التخصصات
   */
  getAllSpecialtySummaries(): SpecialtySummary[] {
    return this.getAllSpecialties().map((specialty) =>
      new SpecialtyModel(specialty).getSummary()
    );
  }

  /**
   * الحصول على تخصص بواسطة المعرف
   */
  getSpecialtyById(id: string): Specialty | null {
    return this.specialties.get(id) || null;
  }

  /**
   * الحصول على تخصص بواسطة المجال
   */
  getSpecialtyByArea(area: SpecialtyArea): Specialty | null {
    return this.getAllSpecialties().find((s) => s.area === area) || null;
  }

  /**
   * الحصول على تخصصات بواسطة نوع الدرجة
   */
  getSpecialtiesByDegreeType(degreeType: 'licence' | 'master'): Specialty[] {
    return this.getAllSpecialties().filter((s) => s.degreeType === degreeType);
  }

  /**
   * الحصول على تخصصات الليسانس
   */
  getLicenceSpecialties(): Specialty[] {
    return this.getSpecialtiesByDegreeType('licence');
  }

  /**
   * الحصول على تخصصات الماستر
   */
  getMasterSpecialties(): Specialty[] {
    return this.getSpecialtiesByDegreeType('master');
  }

  /**
   * إضافة تخصص جديد
   */
  addSpecialty(specialty: Specialty): void {
    const model = new SpecialtyModel(specialty);
    const validation = model.validate();
    
    if (!validation.isValid) {
      throw new Error(`خطأ في التحقق: ${validation.errors.join(', ')}`);
    }

    this.specialties.set(specialty.id, specialty);
  }

  /**
   * تحديث تخصص
   */
  updateSpecialty(id: string, updates: Partial<Specialty>): void {
    const existing = this.specialties.get(id);
    if (!existing) {
      throw new Error(`التخصص غير موجود: ${id}`);
    }

    const updated = { ...existing, ...updates };
    const model = new SpecialtyModel(updated);
    const validation = model.validate();
    
    if (!validation.isValid) {
      throw new Error(`خطأ في التحقق: ${validation.errors.join(', ')}`);
    }

    this.specialties.set(id, updated);
  }

  /**
   * حذف تخصص
   */
  deleteSpecialty(id: string): boolean {
    return this.specialties.delete(id);
  }

  /**
   * البحث عن تخصصات
   */
  searchSpecialties(query: string): Specialty[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllSpecialties().filter(
      (specialty) =>
        specialty.nameAr.toLowerCase().includes(lowerQuery) ||
        specialty.nameEn.toLowerCase().includes(lowerQuery) ||
        specialty.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * تصفية التخصصات
   */
  filterSpecialties(filters: {
    degreeType?: 'licence' | 'master';
    area?: SpecialtyArea;
  }): Specialty[] {
    let result = this.getAllSpecialties();

    if (filters.degreeType) {
      result = result.filter((s) => s.degreeType === filters.degreeType);
    }

    if (filters.area) {
      result = result.filter((s) => s.area === filters.area);
    }

    return result;
  }

  /**
   * الحصول على عدد التخصصات
   */
  getCount(): number {
    return this.specialties.size;
  }

  /**
   * التحقق من وجود تخصص
   */
  exists(id: string): boolean {
    return this.specialties.has(id);
  }

  /**
   * الحصول على التخصصات الأكثر شعبية
   */
  getPopularSpecialties(limit: number = 5): Specialty[] {
    return this.getAllSpecialties()
      .sort((a, b) => {
        const aCount = a.metadata?.studentCount || 0;
        const bCount = b.metadata?.studentCount || 0;
        return bCount - aCount;
      })
      .slice(0, limit);
  }
}

/**
 * دالة مساعدة لإنشاء خدمة التخصصات
 */
export function createSpecialtyService(specialties: Specialty[] = []): SpecialtyService {
  return new SpecialtyService(specialties);
}
