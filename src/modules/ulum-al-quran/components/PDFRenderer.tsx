import { useState } from 'react';

interface PDFRendererProps {
  path: string;
  title: string;
}

export function PDFRenderer({ path, title }: PDFRendererProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fullPath = `/content/ulum-al-quran/${path}`;
  const pdfUrl = `${fullPath}#toolbar=1&navpanes=0&scrollbar=1`;

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg border border-border overflow-hidden bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-blue-500 mx-auto" />
              <p className="mt-2 text-sm text-muted-foreground">جاري تحميل الملف...</p>
            </div>
          </div>
        )}

        {!error ? (
          <iframe
            src={pdfUrl}
            title={title}
            className="w-full h-96 md:h-[600px]"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError(true);
              setIsLoading(false);
            }}
          />
        ) : (
          <div className="h-96 md:h-[600px] flex items-center justify-center">
            <div className="text-center">
              <svg className="h-12 w-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-muted-foreground mb-4">لا يمكن عرض الملف</p>
              <a href={fullPath} download={title} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                تنزيل الملف
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">ملف PDF</p>
        </div>
        <a href={fullPath} download={title} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          تنزيل
        </a>
      </div>
    </div>
  );
}

export default PDFRenderer;
