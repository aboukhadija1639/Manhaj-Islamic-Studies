/**
 * SearchResults - Display search results in dropdown
 */


import type { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  onSelectResult: (result: SearchResult) => void;
}

export function SearchResults({
  results,
  onSelectResult,
}: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {results.map((result) => (
            <li key={`${result.sectionId}-${result.lessonId}`}>
              <button
                onClick={() => onSelectResult(result)}
                className="w-full px-4 py-3 text-right hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  {/* Relevance Indicator */}
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            i <= Math.ceil(result.relevance * 3)
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {result.lessonTitle}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.sectionTitle}
                    </div>
                    <div
                      className="mt-1 text-xs text-gray-600 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: result.highlightedSnippet,
                      }}
                    />
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-center text-xs text-gray-500">
        {results.length} نتيجة
      </div>
    </div>
  );
}

export default SearchResults;
