/**
 * ModuleHeader - Top navigation bar with search and module info
 */

import { useState, useRef } from 'react';
import type { ModuleManifest, SearchResult } from '../types';
import { SearchBox } from './SearchBox';
import { SearchResults } from './SearchResults';
import { useSearchShortcut } from '../hooks/useSearch';

interface ModuleHeaderProps {
  manifest: ModuleManifest;
  onMenuClick: () => void;
  progress?: any;
}

export function ModuleHeader({
  manifest,
  onMenuClick,
  progress,
}: ModuleHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useSearchShortcut(() => {
    setShowSearch(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  });

  const handleSelectResult = (_result: SearchResult) => {
    setShowSearch(false);
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Menu Button - Mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="فتح القائمة"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Module Title */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">
            {manifest.title}
          </h1>
          {progress && (
            <p className="text-sm text-gray-600">
              {progress.completedLessons} من {progress.totalLessons} درس مكتمل
            </p>
          )}
        </div>

        {/* Search Box */}
        <div className="flex-1 max-w-md">
          <SearchBox
            manifest={manifest}
            onSearch={setSearchResults}
            onSelectResult={handleSelectResult}
            inputRef={searchInputRef}
          />
        </div>

        {/* Help Button */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="مساعدة"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showSearch && searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onSelectResult={handleSelectResult}
        />
      )}
    </header>
  );
}

export default ModuleHeader;
