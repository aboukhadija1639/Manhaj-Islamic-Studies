/**
 * Ulum Al-Quran Page - Main page for Quranic Sciences module
 * Integrates the ModuleShell component with the platform
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModuleShell } from '@/modules/ulum-al-quran/components/ModuleShell';
import type { ModuleManifest } from '@/modules/ulum-al-quran/types';

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-500 mx-auto" />
        <p className="mt-4 text-gray-600 font-medium">جاري تحميل وحدة علوم القرآن...</p>
      </div>
    </div>
  );
}

function ErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <svg 
          className="h-16 w-16 text-red-500 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">خطأ في تحميل الوحدة</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            إعادة المحاولة
          </button>
          <a
            href="/subjects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            العودة للمقاييس
          </a>
        </div>
      </div>
    </div>
  );
}

export default function UlumAlQuranPage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState<ModuleManifest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadManifest = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/content/ulum-al-quran/manifest.generated.json');
      
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'لم يتم العثور على محتوى الوحدة. يرجى التأكد من توليد الـ manifest.'
            : `فشل تحميل البيانات: ${response.statusText}`
        );
      }
      
      const data = await response.json();
      setManifest(data);
    } catch (err) {
      console.error('Error loading manifest:', err);
      setError(err instanceof Error ? err : new Error('خطأ غير معروف'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadManifest();
  }, []);

  // Handle lesson navigation
  useEffect(() => {
    if (lessonId && manifest) {
      // The ModuleShell will handle the lesson display
      console.log('Navigating to lesson:', lessonId);
    }
  }, [lessonId, manifest]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <ErrorFallback error={error} onRetry={loadManifest} />;
  }

  if (!manifest) {
    return (
      <ErrorFallback 
        error={new Error('لم يتم تحميل البيانات')} 
        onRetry={loadManifest} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleShell 
        manifest={manifest}
        initialLessonId={lessonId}
        onLessonChange={(newLessonId) => {
          // Update URL when lesson changes
          navigate(`/modules/ulum-al-quran/${newLessonId}`, { replace: true });
        }}
      />
    </div>
  );
}
