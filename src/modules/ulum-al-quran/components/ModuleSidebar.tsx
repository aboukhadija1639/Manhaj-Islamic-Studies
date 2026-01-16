/**
 * ModuleSidebar - Navigation sidebar with sections and lessons
 */

import React, { useState } from 'react';
import type { ModuleManifest } from '../types';

interface ModuleSidebarProps {
  manifest: ModuleManifest;
  currentLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  progress?: any;
}

export function ModuleSidebar({
  manifest,
  currentLessonId,
  onSelectLesson,
  progress,
}: ModuleSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(manifest.sections.slice(0, 1).map(s => s.id))
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Progress Summary */}
      {progress && (
        <div className="border-b border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-900">التقدم</div>
          <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress.percentComplete}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-600">
            {progress.completedLessons} من {progress.totalLessons}
          </div>
        </div>
      )}

      {/* Sections List */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {manifest.sections.map((section) => (
            <li key={section.id}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
              >
                <span>{section.title}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedSections.has(section.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Lessons List */}
              {expandedSections.has(section.id) && (
                <ul className="mt-1 space-y-1 pr-4">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => onSelectLesson(item.id)}
                        className={`w-full rounded-lg px-3 py-2 text-sm text-right transition-colors ${
                          currentLessonId === item.id
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        aria-current={
                          currentLessonId === item.id ? 'page' : undefined\n                        }\n                      >\n                        <div className=\"flex items-center justify-between gap-2\">\n                          <span className=\"truncate\">{item.title}</span>\n                          {/* Type Icon */}\n                          <span className=\"flex-shrink-0 text-xs text-gray-500\">\n                            {item.type === 'pdf' && '📄'}\n                            {item.type === 'md' && '📝'}\n                            {item.type === 'mdx' && '✨'}\n                            {item.type === 'image' && '🖼️'}\n                          </span>\n                        </div>\n                        {/* Duration */}\n                        {item.metadata?.duration && (\n                          <div className=\"text-xs text-gray-500 mt-1\">\n                            {item.metadata.duration} دقيقة\n                          </div>\n                        )}\n                      </button>\n                    </li>\n                  ))}\n                </ul>\n              )}\n            </li>\n          ))}\n        </ul>\n      </nav>\n\n      {/* Footer */}\n      <div className=\"border-t border-gray-200 p-4\">\n        <button className=\"w-full rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100\">\n          تنزيل جميع الموارد\n        </button>\n      </div>\n    </div>\n  );\n}\n\nexport default ModuleSidebar;\n
