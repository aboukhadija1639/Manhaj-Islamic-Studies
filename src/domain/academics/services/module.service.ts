/**
 * Module Service
 * خدمة المقاييس الأكاديمية
 */

import type { Module, ModuleSummary, ModuleType } from '../types';
import { ModuleModel } from '../models';

/**
 * خدمة المقاييس الأكاديمية
 */
export class ModuleService {
  private modules: Map<string, Module>;

  constructor(modules: Module[] = []) {
    this.modules = new Map(modules.map((m) => [m.id, m]));
  }

  /**
   * الحصول على جميع المقاييس
   */
  getAllModules(): Module[] {
    return Array.from(this.modules.values());
  }

  /**
   * الحصول على ملخصات جميع المقاييس
   */
  getAllModuleSummaries(): ModuleSummary[] {
    return this.getAllModules().map((module) =>
      new ModuleModel(module).getSummary()
    );
  }

  /**
   * الحصول على مقياس بواسطة المعرف
   */
  getModuleById(id: string): Module | null {
    return this.modules.get(id) || null;
  }

  /**
   * الحصول على مقياس بواسطة الرمز
   */
  getModuleByCode(code: string): Module | null {
    return this.getAllModules().find((m) => m.code === code) || null;
  }

  /**
   * الحصول على مقاييس بواسطة السداسي
   */
  getModulesBySemester(semesterId: string): Module[] {
    return this.getAllModules().filter((m) => m.semesterId === semesterId);
  }

  /**
   * الحصول على مقاييس بواسطة النوع
   */
  getModulesByType(type: ModuleType): Module[] {
    return this.getAllModules().filter((m) => m.type === type);
  }

  /**
   * الحصول على المقاييس الأساسية
   */
  getFundamentalModules(): Module[] {
    return this.getModulesByType('fundamental');
  }

  /**
   * الحصول على المقاييس المنهجية
   */
  getMethodologyModules(): Module[] {
    return this.getModulesByType('methodology');
  }

  /**
   * الحصول على المقاييس الاستكشافية
   */
  getDiscoveryModules(): Module[] {
    return this.getModulesByType('discovery');
  }

  /**
   * الحصول على المقاييس الأفقية
   */
  getTransversalModules(): Module[] {
    return this.getModulesByType('transversal');
  }

  /**
   * الحصول على المقاييس الاختيارية
   */
  getOptionalModules(): Module[] {
    return this.getModulesByType('optional');
  }

  /**
   * الحصول على مقاييس لها متطلبات
   */
  getModulesWithPrerequisites(): Module[] {
    return this.getAllModules().filter((m) => m.prerequisiteIds.length > 0);
  }

  /**
   * الحصول على المتطلبات لمقياس معين
   */
  getPrerequisites(moduleId: string): Module[] {
    const module = this.getModuleById(moduleId);
    if (!module) return [];

    return module.prerequisiteIds
      .map((id) => this.getModuleById(id))
      .filter((m): m is Module => m !== null);
  }

  /**
   * الحصول على المقاييس التي تتطلب مقياساً معيناً
   */
  getModulesThatRequire(moduleId: string): Module[] {
    return this.getAllModules().filter((m) =>
      m.prerequisiteIds.includes(moduleId)
    );
  }

  /**
   * إضافة مقياس جديد
   */
  addModule(module: Module): void {
    const model = new ModuleModel(module);
    const validation = model.validate();
    
    if (!validation.isValid) {
      throw new Error(`خطأ في التحقق: ${validation.errors.join(', ')}`);
    }

    this.modules.set(module.id, module);
  }

  /**
   * تحديث مقياس
   */
  updateModule(id: string, updates: Partial<Module>): void {
    const existing = this.modules.get(id);
    if (!existing) {
      throw new Error(`المقياس غير موجود: ${id}`);
    }

    const updated = { ...existing, ...updates };
    const model = new ModuleModel(updated);
    const validation = model.validate();
    
    if (!validation.isValid) {
      throw new Error(`خطأ في التحقق: ${validation.errors.join(', ')}`);
    }

    this.modules.set(id, updated);
  }

  /**
   * حذف مقياس
   */
  deleteModule(id: string): boolean {
    return this.modules.delete(id);
  }

  /**
   * البحث عن مقاييس
   */
  searchModules(query: string): Module[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllModules().filter(
      (module) =>
        module.nameAr.toLowerCase().includes(lowerQuery) ||
        module.nameEn.toLowerCase().includes(lowerQuery) ||
        module.code.toLowerCase().includes(lowerQuery) ||
        module.description.toLowerCase().includes(lowerQuery) ||
        module.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * تصفية المقاييس
   */
  filterModules(filters: {
    type?: ModuleType;
    semesterId?: string;
    minCredits?: number;
    maxCredits?: number;
    hasPrerequisites?: boolean;
  }): Module[] {
    let result = this.getAllModules();

    if (filters.type) {
      result = result.filter((m) => m.type === filters.type);
    }

    if (filters.semesterId) {
      result = result.filter((m) => m.semesterId === filters.semesterId);
    }

    if (filters.minCredits !== undefined) {
      result = result.filter((m) => m.credits >= filters.minCredits!);
    }

    if (filters.maxCredits !== undefined) {
      result = result.filter((m) => m.credits <= filters.maxCredits!);
    }

    if (filters.hasPrerequisites !== undefined) {
      result = result.filter(
        (m) =>
          (m.prerequisiteIds.length > 0) === filters.hasPrerequisites
      );
    }

    return result;
  }

  /**
   * الحصول على إحصائيات المقاييس
   */
  getStats(): {
    total: number;
    byType: Record<ModuleType, number>;
    totalCredits: number;
    averageCredits: number;
  } {
    const modules = this.getAllModules();
    const total = modules.length;
    const totalCredits = modules.reduce((sum, m) => sum + m.credits, 0);

    const byType: Record<ModuleType, number> = {
      fundamental: 0,
      methodology: 0,
      discovery: 0,
      transversal: 0,
      optional: 0,
    };

    modules.forEach((m) => {
      byType[m.type]++;
    });

    return {
      total,
      byType,
      totalCredits,
      averageCredits: total > 0 ? totalCredits / total : 0,
    };
  }

  /**
   * الحصول على عدد المقاييس
   */
  getCount(): number {
    return this.modules.size;
  }

  /**
   * التحقق من وجود مقياس
   */
  exists(id: string): boolean {
    return this.modules.has(id);
  }
}

/**
 * دالة مساعدة لإنشاء خدمة المقاييس
 */
export function createModuleService(modules: Module[] = []): ModuleService {
  return new ModuleService(modules);
}
