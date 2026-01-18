import { useState, useEffect } from 'react';
import type { FiqhProgress, FiqhQuizAttempt } from '../types';

const STORAGE_KEY = 'fiqh_module_progress';

export function useFiqhProgress() {
  const [progress, setProgress] = useState<FiqhProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } else {
        setProgress({
          totalAttempts: 0,
          bestScore: 0,
          averageScore: 0,
          attempts: [],
        });
      }
    } catch (error) {
      console.error('Failed to load fiqh progress:', error);
      setProgress({
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        attempts: [],
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save attempt to localStorage
  const saveAttempt = (attempt: Omit<FiqhQuizAttempt, 'id'>) => {
    try {
      const newAttempt: FiqhQuizAttempt = {
        ...attempt,
        id: `attempt_${Date.now()}`,
      };

      const updatedProgress: FiqhProgress = {
        totalAttempts: (progress?.totalAttempts || 0) + 1,
        bestScore: Math.max(progress?.bestScore || 0, attempt.score),
        averageScore:
          ((progress?.averageScore || 0) * (progress?.totalAttempts || 0) +
            attempt.score) /
          ((progress?.totalAttempts || 0) + 1),
        attempts: [...(progress?.attempts || []), newAttempt],
        lastAttempt: newAttempt,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
      setProgress(updatedProgress);
      return newAttempt;
    } catch (error) {
      console.error('Failed to save fiqh attempt:', error);
      return null;
    }
  };

  // Clear all progress
  const clearProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProgress({
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        attempts: [],
      });
    } catch (error) {
      console.error('Failed to clear fiqh progress:', error);
    }
  };

  // Get statistics
  const getStatistics = () => {
    if (!progress || progress.totalAttempts === 0) {
      return {
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        improvementTrend: 0,
        consistencyScore: 0,
      };
    }

    const recentAttempts = progress.attempts.slice(-5);
    const improvementTrend =
      recentAttempts.length > 1
        ? recentAttempts[recentAttempts.length - 1].score -
          recentAttempts[0].score
        : 0;

    const scores = progress.attempts.map(a => a.score);
    const mean = progress.averageScore;
    const variance =
      scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
      scores.length;
    const stdDev = Math.sqrt(variance);
    const consistencyScore = Math.max(0, 100 - stdDev * 10);

    return {
      totalAttempts: progress.totalAttempts,
      bestScore: progress.bestScore,
      averageScore: Math.round(progress.averageScore * 100) / 100,
      improvementTrend,
      consistencyScore: Math.round(consistencyScore),
    };
  };

  return {
    progress,
    isLoading,
    saveAttempt,
    clearProgress,
    getStatistics,
  };
}
