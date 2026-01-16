/**
 * SearchBox - Search input with real-time results
 */

import React, { useRef, useEffect } from 'react';
import type { ModuleManifest, SearchResult } from '../types';
import { useSearch } from '../hooks/useSearch';

interface SearchBoxProps {
  manifest: ModuleManifest;
  onSearch: (results: SearchResult[]) => void;
  onSelectResult: (result: SearchResult) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchBox({
  manifest,
  onSearch,
  inputRef,
}: SearchBoxProps) {
  const [query, setQuery] = React.useState('');
  const localInputRef = useRef<HTMLInputElement>(null);
  const { results, isSearching, isIndexing, search } = useSearch(manifest);

  const ref = inputRef || localInputRef;

  useEffect(() => {
    onSearch(results);
  }, [results, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch([]);
    ref.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={ref}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="ابحث عن درس..."
          disabled={isIndexing}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          aria-label="البحث في الدروس"
        />

        {/* Search Icon */}
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-600"
            aria-label="مسح البحث"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Loading Indicator */}
        {(isSearching || isIndexing) && (
          <div className="absolute left-3 top-2.5">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </div>

      {/* Keyboard Shortcut Hint */}
      {!query && (
        <div className="absolute left-3 top-2.5 text-xs text-gray-400">
          Ctrl+K
        </div>
      )}
    </div>
  );
}

export default SearchBox;
