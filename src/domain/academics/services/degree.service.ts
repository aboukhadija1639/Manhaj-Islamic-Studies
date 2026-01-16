/**
 * Degree Service
 * خدمة الدرجات الأكاديمية
 */

import type { Degree, DegreeSummary, DegreeType } from '../types';
import { DegreeModel } from '../models';

/**
 * خدمة الدرجات الأكاديمية
 */
export class DegreeService {
  private degrees: Map<string, Degree>;

  constructor(degrees: Degree[] = []) {
    this.degrees = new Map(degrees.map((d) => [d.id, d]));
  }

  /**
   * الحصول على جميع الدرجات
   */
  getAllDegrees(): Degree[] {
    return Array.from(this.degrees.values());
  }

  /**
   * الحصول على ملخصات جميع الدرجات
   */
  getAllDegreeSummaries(): DegreeSummary[] {
    return this.getAllDegrees().map((degree) => 
      new DegreeModel(degree).getSummary()
    );
  }

  /**
   * الحصول على درجة بواسطة المعرف
   */
  getDegreeById(id: string): Degree | null {
    return this.degrees.get(id) || null;
  }

  /**
   * الحصول على درجة بواسطة النوع
   */
  getDegreeByType(type: DegreeType): Degree | null {
    return this.getAllDegrees().find((d) => d.type === type) || null;
  }

  /**
   * الحصول على درجات بواسطة التخصص
   */
  getDegreesBySpecialty(specialtyId: string): Degree[] {
    return this.getAllDegrees().filter((degree) =>
      degree.specialtyIds.includes(specialtyId)
    );
  }

  /**
   * إضافة درجة جديدة
   */
  addDegree(degree: Degree): void {
    const model = new DegreeModel(degree);
    const validation = model.validate();
    
    if (!validation.isValid) {
      throw new Error(`خطأ في التحقق: ${validation.errors.join(', ')}`);
    }

    this.degrees.set(degree.id, degree);
  }

  /**
   * تحديث درجة
   */
  updateDegree(id: string, updates: Partial<Degree>): void {
    const existing = this.degrees.get(id);
    if (!existing) {
      throw new Error(`الدرجة غير موجودة: ${id}`);
    }

    const updated = { ...existing, ...updates };
    const model = new DegreeModel(updated);
    const validation = model.validate();
    
    if (!validation.isValid) {
      throw new Error(`خطأ في التحقق: ${validation.errors.join(', ')}`);
    }

    this.degrees.set(id, updated);
  }

  /**
   * حذف درجة
   */
  deleteDegree(id: string): boolean {
    return this.degrees.delete(id);
  }

  /**
   * البحث عن درجات
   */
  searchDegrees(query: string): Degree[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllDegrees().filter(
      (degree) =>
        degree.nameAr.toLowerCase().includes(lowerQuery) ||
        degree.nameEn.toLowerCase().includes(lowerQuery) ||
        degree.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * الحصول على عدد الدرجات
   */
  getCount(): number {
    return this.degrees.size;
  }

  /**
   * التحقق من وجود درجة
   */
  exists(id: string): boolean {
    return this.degrees.has(id);
  }
}

/**
 * دالة مساعدة لإنشاء خدمة الدرجات
 */
export function createDegreeService(degrees: Degree[] = []): DegreeService {
  return new DegreeService(degrees);
}
