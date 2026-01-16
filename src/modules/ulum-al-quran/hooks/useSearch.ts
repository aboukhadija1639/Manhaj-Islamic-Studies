/**
 * useSearch - Hook for module search functionality
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { SearchResult, ModuleManifest } from '../types';
import { searchService } from '../services/SearchService';

interface UseSearchState {
  results: SearchResult[];
  isSearching: boolean;
  isIndexing: boolean;
  error: Error | null;
}

export function useSearch(manifest: ModuleManifest | null): UseSearchState & {
  search: (query: string) => void;
} {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isIndexedRef = useRef(false);

  // Build index when manifest changes
  useEffect(() => {
    if (!manifest) return;

    let mounted = true;

    const buildIndex = async () => {
      try {
        setIsIndexing(true);
        setError(null);

        await searchService.buildIndex(manifest, '/content/ulum-al-quran');

        if (mounted) {
          isIndexedRef.current = true;
          setIsIndexing(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to build search index'));
          setIsIndexing(false);
        }
      }
    };

    if (!isIndexedRef.current) {
      buildIndex();
    }

    return () => {
      mounted = false;
    };
  }, [manifest]);

  const search = useCallback((query: string) => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Debounce search
    debounceTimer.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        setError(null);

        const searchResults = await searchService.search(query, 20);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Search failed'));
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, []);

  return { results, isSearching, isIndexing, error, search };
}

/**
 * useSearchShortcut - Hook for keyboard shortcut (Ctrl+K)
 */
export function useSearchShortcut(onFocus: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        onFocus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFocus]);
}
