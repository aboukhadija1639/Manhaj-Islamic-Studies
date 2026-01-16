/**
 * ModuleShell - Main container for the Quranic Sciences module
 * 
 * Handles:
 * - Layout (header, sidebar, main content)
 * - RTL-aware responsive design
 * - Mobile drawer sidebar
 */

import { useState, useEffect } from 'react';
import type { ModuleManifest } from '../types';

import { ModuleHeader } from './ModuleHeader';
import { ModuleSidebar } from './ModuleSidebar';
import { LessonRenderer } from './LessonRenderer';
import { useModuleProgress } from '../hooks/useLesson';

interface ModuleShellProps {
  manifest: ModuleManifest;
  initialLessonId?: string;
  onLessonChange?: (lessonId: string) => void;
}

export function ModuleShell({ manifest, initialLessonId, onLessonChange }: ModuleShellProps) {
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { progress } = useModuleProgress(manifest.moduleId);

  // Set initial or first lesson as default
  useEffect(() => {
    if (initialLessonId) {
      setCurrentLessonId(initialLessonId);
    } else if (!currentLessonId && manifest.sections.length > 0) {
      const firstLesson = manifest.sections[0].items[0];
      if (firstLesson) {
        setCurrentLessonId(firstLesson.id);
      }
    }
  }, [manifest, currentLessonId, initialLessonId]);

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setSidebarOpen(false);
    if (onLessonChange) {
      onLessonChange(lessonId);
    }
  };

  return (
    <div
      className="flex h-screen flex-col bg-gray-50"
      dir="rtl"
      lang="ar"
    >
      {/* Header */}
      <ModuleHeader
        manifest={manifest}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        progress={progress}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:border-l md:border-gray-200 md:bg-white">
          <ModuleSidebar
            manifest={manifest}
            currentLessonId={currentLessonId}
            onSelectLesson={handleSelectLesson}
            progress={progress}
          />
        </div>

        {/* Sidebar - Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 z-50 w-64 overflow-y-auto bg-white shadow-lg">
              <ModuleSidebar
                manifest={manifest}
                currentLessonId={currentLessonId}
                onSelectLesson={handleSelectLesson}
                progress={progress}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {currentLessonId ? (
            <LessonRenderer
              lessonId={currentLessonId}
              moduleId={manifest.moduleId}
            />
          ) : (
            <div className="flex items-center justify-center p-8">
              <p className="text-gray-500">جاري تحميل الدرس...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModuleShell;
