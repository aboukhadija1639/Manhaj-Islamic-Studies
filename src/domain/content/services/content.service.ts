/**
 * Content Service
 * خدمة المحتوى التعليمي
 */

import type { Content, ContentType, ContentStatus, Resource } from '../types';

/**
 * خدمة المحتوى التعليمي
 */
export class ContentService {
  private contents: Map<string, Content>;
  private resources: Map<string, Resource>;

  constructor(contents: Content[] = [], resources: Resource[] = []) {
    this.contents = new Map(contents.map((c) => [c.id, c]));
    this.resources = new Map(resources.map((r) => [r.id, r]));
  }

  /**
   * الحصول على جميع المحتويات
   */
  getAllContents(): Content[] {
    return Array.from(this.contents.values());
  }

  /**
   * الحصول على محتوى بواسطة المعرف
   */
  getContentById(id: string): Content | null {
    return this.contents.get(id) || null;
  }

  /**
   * الحصول على محتويات بواسطة المقياس
   */
  getContentsByModule(moduleId: string): Content[] {
    return this.getAllContents().filter((c) => c.moduleId === moduleId);
  }

  /**
   * الحصول على محتويات بواسطة الوحدة
   */
  getContentsByUnit(unitId: string): Content[] {
    return this.getAllContents().filter((c) => c.unitId === unitId);
  }

  /**
   * الحصول على محتويات بواسطة النوع
   */
  getContentsByType(type: ContentType): Content[] {
    return this.getAllContents().filter((c) => c.type === type);
  }

  /**
   * الحصول على محتويات بواسطة الحالة
   */
  getContentsByStatus(status: ContentStatus): Content[] {
    return this.getAllContents().filter((c) => c.status === status);
  }

  /**
   * الحصول على المحتويات المنشورة
   */
  getPublishedContents(): Content[] {
    return this.getContentsByStatus('published');
  }

  /**
   * إضافة محتوى جديد
   */
  addContent(content: Content): void {
    this.contents.set(content.id, content);
  }

  /**
   * تحديث محتوى
   */
  updateContent(id: string, updates: Partial<Content>): void {
    const existing = this.contents.get(id);
    if (!existing) {
      throw new Error(`المحتوى غير موجود: ${id}`);
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };

    this.contents.set(id, updated);
  }

  /**
   * حذف محتوى
   */
  deleteContent(id: string): boolean {
    return this.contents.delete(id);
  }

  /**
   * البحث عن محتويات
   */
  searchContents(query: string): Content[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllContents().filter(
      (content) =>
        content.title.toLowerCase().includes(lowerQuery) ||
        content.description?.toLowerCase().includes(lowerQuery) ||
        content.metadata.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * تصفية المحتويات
   */
  filterContents(filters: {
    moduleId?: string;
    unitId?: string;
    type?: ContentType;
    status?: ContentStatus;
    language?: string;
  }): Content[] {
    let result = this.getAllContents();

    if (filters.moduleId) {
      result = result.filter((c) => c.moduleId === filters.moduleId);
    }

    if (filters.unitId) {
      result = result.filter((c) => c.unitId === filters.unitId);
    }

    if (filters.type) {
      result = result.filter((c) => c.type === filters.type);
    }

    if (filters.status) {
      result = result.filter((c) => c.status === filters.status);
    }

    if (filters.language) {
      result = result.filter((c) => c.metadata.language === filters.language);
    }

    return result;
  }

  // ===== Resource Methods =====

  /**
   * الحصول على جميع الموارد
   */
  getAllResources(): Resource[] {
    return Array.from(this.resources.values());
  }

  /**
   * الحصول على مورد بواسطة المعرف
   */
  getResourceById(id: string): Resource | null {
    return this.resources.get(id) || null;
  }

  /**
   * الحصول على موارد بواسطة المقياس
   */
  getResourcesByModule(moduleId: string): Resource[] {
    return this.getAllResources().filter((r) => r.moduleId === moduleId);
  }

  /**
   * إضافة مورد جديد
   */
  addResource(resource: Resource): void {
    this.resources.set(resource.id, resource);
  }

  /**
   * تحديث مورد
   */
  updateResource(id: string, updates: Partial<Resource>): void {
    const existing = this.resources.get(id);
    if (!existing) {
      throw new Error(`المورد غير موجود: ${id}`);
    }

    this.resources.set(id, { ...existing, ...updates });
  }

  /**
   * حذف مورد
   */
  deleteResource(id: string): boolean {
    return this.resources.delete(id);
  }

  /**
   * الحصول على عدد المحتويات
   */
  getContentCount(): number {
    return this.contents.size;
  }

  /**
   * الحصول على عدد الموارد
   */
  getResourceCount(): number {
    return this.resources.size;
  }
}

/**
 * دالة مساعدة لإنشاء خدمة المحتوى
 */
export function createContentService(
  contents: Content[] = [],
  resources: Resource[] = []
): ContentService {
  return new ContentService(contents, resources);
}
