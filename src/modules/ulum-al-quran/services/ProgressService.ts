/**
 * ProgressService - Manages lesson completion and progress tracking
 * 
 * Default implementation uses localStorage for persistence.
 * Can be extended with backend adapter for server-side sync.
 */

import type { IProgressService, LessonStatus, ModuleProgress } from '../types';

const STORAGE_PREFIX = 'progress';
const STORAGE_SEPARATOR = ':';

interface StoredLessonStatus {
  lessonId: string;
  completed: boolean;
  lastAccessed: string; // ISO string
  timeSpent: number;
}

class ProgressService implements IProgressService {
  private debounceTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private backendAdapter: IProgressService | null = null;

  /**
   * Set a backend adapter for server-side sync
   */
  setBackendAdapter(adapter: IProgressService): void {
    this.backendAdapter = adapter;
  }

  /**
   * Get the storage key for a lesson
   */
  private getStorageKey(moduleId: string, lessonId: string): string {
    return [STORAGE_PREFIX, moduleId, lessonId].join(STORAGE_SEPARATOR);
  }

  /**
   * Get lesson status
   */
  async getLessonStatus(moduleId: string, lessonId: string): Promise<LessonStatus> {
    const key = this.getStorageKey(moduleId, lessonId);
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        const data: StoredLessonStatus = JSON.parse(stored);
        return {
          lessonId: data.lessonId,
          completed: data.completed,
          lastAccessed: new Date(data.lastAccessed),
          timeSpent: data.timeSpent,
        };
      } catch (error) {
        console.error('Error parsing lesson status:', error);
      }
    }

    // Return default status
    return {
      lessonId,
      completed: false,
      lastAccessed: new Date(),
      timeSpent: 0,
    };
  }

  /**
   * Set lesson as completed or not
   */
  async setLessonCompleted(
    moduleId: string,
    lessonId: string,
    completed: boolean
  ): Promise<void> {
    const key = this.getStorageKey(moduleId, lessonId);
    const status = await this.getLessonStatus(moduleId, lessonId);

    const updated: StoredLessonStatus = {
      lessonId: status.lessonId,
      completed,
      lastAccessed: new Date().toISOString(),
      timeSpent: status.timeSpent,
    };

    localStorage.setItem(key, JSON.stringify(updated));

    // Debounce backend sync
    this.syncToBackendDebounced(moduleId, lessonId, updated);
  }

  /**
   * Update time spent on a lesson
   */
  async updateTimeSpent(
    moduleId: string,
    lessonId: string,
    additionalSeconds: number
  ): Promise<void> {
    const key = this.getStorageKey(moduleId, lessonId);
    const status = await this.getLessonStatus(moduleId, lessonId);

    const updated: StoredLessonStatus = {
      lessonId: status.lessonId,
      completed: status.completed,
      lastAccessed: new Date().toISOString(),
      timeSpent: status.timeSpent + additionalSeconds,
    };

    localStorage.setItem(key, JSON.stringify(updated));
  }

  /**
   * Get overall module progress
   */
  async getModuleProgress(moduleId: string): Promise<ModuleProgress> {
    // Get all keys that match this module
    const prefix = [STORAGE_PREFIX, moduleId].join(STORAGE_SEPARATOR);
    const allKeys = Object.keys(localStorage);
    const moduleKeys = allKeys.filter(key => key.startsWith(prefix + STORAGE_SEPARATOR));

    let totalLessons = 0;
    let completedLessons = 0;

    for (const key of moduleKeys) {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const data: StoredLessonStatus = JSON.parse(stored);
          totalLessons++;
          if (data.completed) {
            completedLessons++;
          }
        } catch (error) {
          console.error('Error parsing progress data:', error);
        }
      }
    }

    return {
      moduleId,
      totalLessons,
      completedLessons,
      percentComplete: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
      lastUpdated: new Date(),
    };
  }

  /**
   * Get all progress for a module
   */
  async getAllProgress(moduleId: string): Promise<Record<string, LessonStatus>> {
    const prefix = [STORAGE_PREFIX, moduleId].join(STORAGE_SEPARATOR);
    const allKeys = Object.keys(localStorage);
    const moduleKeys = allKeys.filter(key => key.startsWith(prefix + STORAGE_SEPARATOR));

    const progress: Record<string, LessonStatus> = {};

    for (const key of moduleKeys) {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const data: StoredLessonStatus = JSON.parse(stored);
          progress[data.lessonId] = {
            lessonId: data.lessonId,
            completed: data.completed,
            lastAccessed: new Date(data.lastAccessed),
            timeSpent: data.timeSpent,
          };
        } catch (error) {
          console.error('Error parsing progress data:', error);
        }
      }
    }

    return progress;
  }

  /**
   * Clear all progress for a module
   */
  async clearProgress(moduleId: string): Promise<void> {
    const prefix = [STORAGE_PREFIX, moduleId].join(STORAGE_SEPARATOR);
    const allKeys = Object.keys(localStorage);
    const moduleKeys = allKeys.filter(key => key.startsWith(prefix + STORAGE_SEPARATOR));

    for (const key of moduleKeys) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Mark lesson as viewed (update last accessed)
   */
  async markLessonViewed(moduleId: string, lessonId: string): Promise<void> {
    const key = this.getStorageKey(moduleId, lessonId);
    const status = await this.getLessonStatus(moduleId, lessonId);

    const updated: StoredLessonStatus = {
      lessonId: status.lessonId,
      completed: status.completed,
      lastAccessed: new Date().toISOString(),
      timeSpent: status.timeSpent,
    };

    localStorage.setItem(key, JSON.stringify(updated));
  }

  /**
   * Debounced sync to backend
   */
  private syncToBackendDebounced(
    moduleId: string,
    lessonId: string,
    status: StoredLessonStatus
  ): void {
    if (!this.backendAdapter) return;

    const key = `${moduleId}:${lessonId}`;

    // Clear existing timer
    const existingTimer = this.debounceTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new debounced timer
    const timer = setTimeout(async () => {
      try {
        await this.backendAdapter!.setLessonCompleted(
          moduleId,
          lessonId,
          status.completed
        );
      } catch (error) {
        console.error('Error syncing progress to backend:', error);
      }
      this.debounceTimers.delete(key);
    }, 500);

    this.debounceTimers.set(key, timer);
  }

  /**
   * Export progress as JSON (for backup)
   */
  exportProgress(moduleId: string): Record<string, StoredLessonStatus> {
    const prefix = [STORAGE_PREFIX, moduleId].join(STORAGE_SEPARATOR);
    const allKeys = Object.keys(localStorage);
    const moduleKeys = allKeys.filter(key => key.startsWith(prefix + STORAGE_SEPARATOR));

    const exported: Record<string, StoredLessonStatus> = {};

    for (const key of moduleKeys) {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const data: StoredLessonStatus = JSON.parse(stored);
          exported[data.lessonId] = data;
        } catch (error) {
          console.error('Error parsing progress data:', error);
        }
      }
    }

    return exported;
  }

  /**
   * Import progress from JSON (for restore)
   */
  importProgress(moduleId: string, data: Record<string, StoredLessonStatus>): void {
    for (const [lessonId, status] of Object.entries(data)) {
      const key = this.getStorageKey(moduleId, lessonId);
      localStorage.setItem(key, JSON.stringify(status));
    }
  }
}

// Export singleton instance
export const progressService = new ProgressService();

export default ProgressService;
