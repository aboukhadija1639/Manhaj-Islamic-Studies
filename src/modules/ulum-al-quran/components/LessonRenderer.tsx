import { useState } from 'react';
import { useLesson, useMarkLessonComplete } from '../hooks/useLesson';
import { TableOfContents } from './TableOfContents';
import { PDFRenderer } from './PDFRenderer';
import { MarkdownRenderer } from './MarkdownRenderer';

interface LessonRendererProps {
  lessonId: string;
  moduleId: string;
}

export function LessonRenderer({
  lessonId,
  moduleId,
}: LessonRendererProps) {
  const { lesson, isLoading, error, isCompleted } = useLesson(lessonId, moduleId);
  const { markComplete, isUpdating } = useMarkLessonComplete(moduleId, lessonId);
  const [_showTOC, _setShowTOC] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-blue-500 mx-auto" />
          <p className="mt-4 text-muted-foreground">جاري تحميل الدرس...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <svg className="h-12 w-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-foreground font-medium">حدث خطأ</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="flex-1 overflow-y-auto">
        <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="#" className="hover:text-foreground">{lesson.sectionTitle}</a>
            <span>/</span>
            <span className="text-foreground font-medium">{lesson.title}</span>
          </nav>

          <header className="mb-8 border-b border-border pb-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">{lesson.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {lesson.metadata?.duration && (
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{lesson.metadata.duration} دقيقة</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span className="text-xs px-2 py-1 bg-muted rounded">{lesson.type}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-sm max-w-none">
            {lesson.type === 'pdf' && <PDFRenderer path={(lesson.content as any).path} title={lesson.title} />}
            {lesson.type === 'md' && <MarkdownRenderer content={(lesson.content as any).content} />}
            {lesson.type === 'image' && (
              <img src={`/content/ulum-al-quran/${(lesson.content as any).path}`} alt={lesson.title} className="max-w-full h-auto rounded-lg" />
            )}
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <button
              onClick={() => markComplete(!isCompleted)}
              disabled={isUpdating}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                isCompleted ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              } disabled:opacity-50`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isCompleted ? 'تم الانتهاء' : 'وضع علامة كمكتمل'}
            </button>
          </div>
        </article>
      </div>

      {lesson.toc.length > 0 && (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-l lg:border-border lg:bg-background lg:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">محتويات الدرس</h2>
          <TableOfContents entries={lesson.toc} />
        </div>
      )}
    </div>
  );
}

export default LessonRenderer;
