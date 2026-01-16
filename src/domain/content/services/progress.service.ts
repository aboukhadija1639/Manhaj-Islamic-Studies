/**
 * Progress Service
 * خدمة تتبع التقدم
 */

import type {
  ModuleProgress,
  UnitProgress,
  ContentProgress,
  ProgressStats,
  Achievement,
} from '../types';

/**
 * خدمة تتبع التقدم
 */
export class ProgressService {
  private moduleProgress: Map<string, ModuleProgress>;
  private unitProgress: Map<string, UnitProgress>;
  private contentProgress: Map<string, ContentProgress>;
  private achievements: Map<string, Achievement[]>;

  constructor() {
    this.moduleProgress = new Map();
    this.unitProgress = new Map();
    this.contentProgress = new Map();
    this.achievements = new Map();
  }

  // ===== Module Progress =====

  /**
   * الحصول على تقدم المستخدم في مقياس
   */
  getModuleProgress(userId: string, moduleId: string): ModuleProgress | null {
    const key = `${userId}:${moduleId}`;
    return this.moduleProgress.get(key) || null;
  }

  /**
   * الحصول على جميع تقدمات المستخدم في المقاييس
   */
  getUserModuleProgress(userId: string): ModuleProgress[] {
    return Array.from(this.moduleProgress.values()).filter(
      (p) => p.userId === userId
    );
  }

  /**
   * تحديث تقدم المستخدم في مقياس
   */
  updateModuleProgress(progress: ModuleProgress): void {
    const key = `${progress.userId}:${progress.moduleId}`;
    this.moduleProgress.set(key, {
      ...progress,
      lastUpdatedAt: new Date(),
    });
  }

  /**
   * وضع علامة على وحدة كمكتملة
   */
  markUnitCompleted(userId: string, moduleId: string, unitId: string): void {
    const progress = this.getModuleProgress(userId, moduleId);
    
    if (!progress) {
      // إنشاء تقدم جديد
      const newProgress: ModuleProgress = {
        userId,
        moduleId,
        completedUnits: [unitId],
        completedContents: [],
        progress: 0,
        startedAt: new Date(),
        lastUpdatedAt: new Date(),
        isCompleted: false,
      };
      this.updateModuleProgress(newProgress);
    } else {
      // تحديث التقدم الموجود
      if (!progress.completedUnits.includes(unitId)) {
        progress.completedUnits.push(unitId);
        progress.lastUpdatedAt = new Date();
        this.updateModuleProgress(progress);
      }
    }
  }

  /**
   * حساب نسبة التقدم في مقياس
   */
  calculateModuleProgress(
    userId: string,
    moduleId: string,
    totalUnits: number
  ): number {
    const progress = this.getModuleProgress(userId, moduleId);
    if (!progress || totalUnits === 0) return 0;
    
    return Math.round((progress.completedUnits.length / totalUnits) * 100);
  }

  // ===== Unit Progress =====

  /**
   * الحصول على تقدم المستخدم في وحدة
   */
  getUnitProgress(userId: string, unitId: string): UnitProgress | null {
    const key = `${userId}:${unitId}`;
    return this.unitProgress.get(key) || null;
  }

  /**
   * تحديث تقدم المستخدم في وحدة
   */
  updateUnitProgress(progress: UnitProgress): void {
    const key = `${progress.userId}:${progress.unitId}`;
    this.unitProgress.set(key, {
      ...progress,
      lastAccessedAt: new Date(),
    });
  }

  /**
   * وضع علامة على محتوى كمكتمل
   */
  markContentCompleted(userId: string, unitId: string, contentId: string): void {
    const progress = this.getUnitProgress(userId, unitId);
    
    if (!progress) {
      const newProgress: UnitProgress = {
        userId,
        unitId,
        completedContents: [contentId],
        progress: 0,
        isCompleted: false,
        lastAccessedAt: new Date(),
      };
      this.updateUnitProgress(newProgress);
    } else {
      if (!progress.completedContents.includes(contentId)) {
        progress.completedContents.push(contentId);
        this.updateUnitProgress(progress);
      }
    }
  }

  // ===== Content Progress =====

  /**
   * الحصول على تقدم المستخدم في محتوى
   */
  getContentProgress(userId: string, contentId: string): ContentProgress | null {
    const key = `${userId}:${contentId}`;
    return this.contentProgress.get(key) || null;
  }

  /**
   * تحديث تقدم المستخدم في محتوى
   */
  updateContentProgress(progress: ContentProgress): void {
    const key = `${progress.userId}:${progress.contentId}`;
    this.contentProgress.set(key, {
      ...progress,
      lastAccessedAt: new Date(),
    });
  }

  // ===== Statistics =====

  /**
   * الحصول على إحصائيات تقدم المستخدم
   */
  getUserProgressStats(userId: string): ProgressStats {
    const moduleProgressList = this.getUserModuleProgress(userId);
    
    const totalModules = moduleProgressList.length;
    const completedModules = moduleProgressList.filter((p) => p.isCompleted).length;
    const inProgressModules = totalModules - completedModules;
    
    const totalUnits = moduleProgressList.reduce(
      (sum, p) => sum + p.completedUnits.length,
      0
    );
    
    const completedUnits = moduleProgressList.reduce(
      (sum, p) => sum + p.completedUnits.length,
      0
    );
    
    const overallProgress =
      totalModules > 0
        ? Math.round(
            moduleProgressList.reduce((sum, p) => sum + p.progress, 0) / totalModules
          )
        : 0;
    
    const lastActivity = moduleProgressList.reduce<Date | undefined>(
      (latest, p) => {
        if (!latest || p.lastUpdatedAt > latest) {
          return p.lastUpdatedAt;
        }
        return latest;
      },
      undefined
    );

    return {
      userId,
      totalModules,
      completedModules,
      inProgressModules,
      totalUnits,
      completedUnits,
      overallProgress,
      totalTimeSpent: 0, // يمكن حسابه من البيانات الفعلية
      lastActivity,
    };
  }

  // ===== Achievements =====

  /**
   * الحصول على إنجازات المستخدم
   */
  getUserAchievements(userId: string): Achievement[] {
    return this.achievements.get(userId) || [];
  }

  /**
   * إضافة إنجاز للمستخدم
   */
  addAchievement(achievement: Achievement): void {
    const userAchievements = this.getUserAchievements(achievement.userId);
    userAchievements.push(achievement);
    this.achievements.set(achievement.userId, userAchievements);
  }

  /**
   * التحقق من الإنجازات الجديدة
   */
  checkForAchievements(userId: string, moduleId: string): Achievement[] {
    const newAchievements: Achievement[] = [];
    const progress = this.getModuleProgress(userId, moduleId);
    
    if (progress && progress.isCompleted) {
      // إنجاز إكمال المقياس
      newAchievements.push({
        id: `achievement-${Date.now()}`,
        userId,
        type: 'module-completed',
        title: 'إكمال المقياس',
        description: 'تم إكمال المقياس بنجاح',
        icon: '🎓',
        earnedAt: new Date(),
        metadata: { moduleId },
      });
    }

    return newAchievements;
  }

  /**
   * إعادة تعيين التقدم
   */
  resetProgress(userId: string, moduleId: string): void {
    const key = `${userId}:${moduleId}`;
    this.moduleProgress.delete(key);
  }
}

/**
 * دالة مساعدة لإنشاء خدمة التقدم
 */
export function createProgressService(): ProgressService {
  return new ProgressService();
}
