/**
 * useLesson - Hook for loading and managing lesson state
 */

import { useState, useEffect } from 'react';
import type { RenderedLesson } from '../types';
import { contentService } from '../services/ContentService';
import { progressService } from '../services/ProgressService';

interface UseLessonState {
  lesson: RenderedLesson | null;
  isLoading: boolean;
  error: Error | null;
  isCompleted: boolean;
}

export function useLesson(lessonId: string, moduleId: string): UseLessonState {
  const [lesson, setLesson] = useState<RenderedLesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadLesson = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load lesson content
        const loadedLesson = await contentService.loadLesson(lessonId);
        if (mounted) {
          setLesson(loadedLesson);
        }

        // Load progress status
        const status = await progressService.getLessonStatus(moduleId, lessonId);
        if (mounted) {
          setIsCompleted(status.completed);
        }

        // Mark as viewed
        await progressService.markLessonViewed(moduleId, lessonId);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadLesson();

    return () => {
      mounted = false;
    };
  }, [lessonId, moduleId]);

  return { lesson, isLoading, error, isCompleted };
}

/**
 * useMarkLessonComplete - Hook for marking lesson as complete
 */
export function useMarkLessonComplete(moduleId: string, lessonId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const markComplete = async (completed: boolean) => {
    try {
      setIsUpdating(true);
      setError(null);
      await progressService.setLessonCompleted(moduleId, lessonId, completed);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsUpdating(false);
    }
  };

  return { markComplete, isUpdating, error };
}

/**
 * useModuleProgress - Hook for getting module progress
 */
export function useModuleProgress(moduleId: string) {
  const [progress, setProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadProgress = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const moduleProgress = await progressService.getModuleProgress(moduleId);
        if (mounted) {
          setProgress(moduleProgress);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadProgress();

    return () => {
      mounted = false;
    };
  }, [moduleId]);

  return { progress, isLoading, error };
}
