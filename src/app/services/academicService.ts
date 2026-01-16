/**
 * Academic Service
 * خدمة الأكاديميات - تهيئة خدمات المجال مع البيانات الفعلية
 * 
 * هذه الطبقة تربط بين طبقة المجال (Domain Layer) وطبقة البيانات (Data Layer)
 */

import { DegreeService, SpecialtyService, ModuleService } from '@/domain';
import { degreesData } from '@/data/academics/degrees.data';
import { specialtiesData } from '@/data/academics/specialties.data';
import { modulesData } from '@/data/academics/modules.data';
import type { ModuleType } from '@/domain';

/**
 * تهيئة خدمات المجال مع البيانات
 */
class AcademicServiceClass {
  private degreeService: DegreeService;
  private specialtyService: SpecialtyService;
  private moduleService: ModuleService;

  constructor() {
    // تهيئة الخدمات مع البيانات الفعلية
    this.degreeService = new DegreeService(degreesData);
    this.specialtyService = new SpecialtyService(specialtiesData);
    this.moduleService = new ModuleService(modulesData);
  }

  // ========== Degree Services ==========

  /**
   * الحصول على جميع الدرجات
   */
  getAllDegrees() {
    return this.degreeService.getAllDegrees();
  }

  /**
   * الحصول على ملخصات الدرجات
   */
  getAllDegreeSummaries() {
    return this.degreeService.getAllDegreeSummaries();
  }

  /**
   * الحصول على درجة بمعرفها
   */
  getDegreeById(degreeId: string) {
    return this.degreeService.getDegreeById(degreeId);
  }

  /**
   * الحصول على الدرجات حسب النوع
   */
  getDegreesByType(type: 'licence' | 'master') {
    return this.degreeService.getDegreeByType(type);
  }

  // ========== Specialty Services ==========

  /**
   * الحصول على جميع التخصصات
   */
  getAllSpecialties() {
    return this.specialtyService.getAllSpecialties();
  }

  /**
   * الحصول على تخصص بمعرفه
   */
  getSpecialtyById(specialtyId: string) {
    return this.specialtyService.getSpecialtyById(specialtyId);
  }

  /**
   * الحصول على التخصصات حسب نوع الدرجة
   */
  getSpecialtiesByDegreeType(degreeType: 'licence' | 'master') {
    return this.specialtyService.getSpecialtiesByDegreeType(degreeType);
  }

  /**
   * الحصول على التخصصات حسب المجال
   */
  getSpecialtiesByArea(area: any) {
    return this.specialtyService.getSpecialtyByArea(area);
  }

  /**
   * البحث عن تخصصات
   */
  searchSpecialties(query: string) {
    return this.specialtyService.searchSpecialties(query);
  }

  // ========== Module Services ==========

  /**
   * الحصول على جميع المقاييس
   */
  getAllModules() {
    return this.moduleService.getAllModules();
  }

  /**
   * الحصول على مقياس بمعرفه
   */
  getModuleById(moduleId: string) {
    return this.moduleService.getModuleById(moduleId);
  }

  /**
   * الحصول على المقاييس حسب السداسي
   */
  getModulesBySemester(semesterId: string) {
    return this.moduleService.getModulesBySemester(semesterId);
  }

  /**
   * الحصول على المقاييس حسب النوع
   */
  getModulesByType(type: ModuleType) {
    return this.moduleService.getModulesByType(type);
  }

  /**
   * البحث عن مقاييس
   */
  searchModules(query: string) {
    return this.moduleService.searchModules(query);
  }

  // ========== Combined Services ==========

  /**
   * الحصول على تخصص مع مقاييسه
   * دالة مجمعة تجمع بيانات من خدمات متعددة
   */
  getSpecialtyWithModules(specialtyId: string) {
    const specialty = this.specialtyService.getSpecialtyById(specialtyId);
    if (!specialty) return null;

    // ملاحظة: في البنية الحالية، المقاييس مرتبطة بالسداسيات وليس التخصص مباشرة
    // ولكن للتبسيط في هذه المرحلة، سنقوم بتصفية المقاييس التي تنتمي لهذا التخصص
    // (يجب تحديث نموذج المقياس ليشمل specialtyId إذا لزم الأمر)
    const modules = this.moduleService.getAllModules().filter(() => {
        // هذا مجرد منطق مؤقت حتى يتم ربط المقاييس بالتخصصات بشكل كامل
        return true; 
    });

    return {
      ...specialty,
      modules,
    };
  }

  /**
   * الحصول على درجة مع تخصصاتها
   */
  getDegreeWithSpecialties(degreeId: string) {
    const degree = this.degreeService.getDegreeById(degreeId);
    if (!degree) return null;

    const specialties = degree.specialtyIds
      .map((id) => this.specialtyService.getSpecialtyById(id))
      .filter((s): s is NonNullable<typeof s> => s !== null);

    return {
      ...degree,
      specialties,
    };
  }
}

// تصدير نسخة واحدة من الخدمة (Singleton)
export const academicService = new AcademicServiceClass();
