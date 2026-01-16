/**
 * SearchService - Client-side full-text search with fuzzy matching
 * 
 * Builds an index from module content and provides instant search results.
 * Supports Arabic text with proper diacritics handling.
 */

import type { ISearchService, SearchIndex, SearchResult, ModuleManifest } from '../types';

interface FuzzyMatchResult {
  score: number;
  indices: number[];
}

class SearchService implements ISearchService {
  private index: SearchIndex[] = [];
  private isIndexed = false;
  private cacheKey = 'search-index-cache';

  /**
   * Build search index from manifest and content
   */
  async buildIndex(manifest: ModuleManifest, contentRoot: string): Promise<SearchIndex[]> {
    // Check cache first
    const cached = this.loadFromCache(manifest.version);
    if (cached.length > 0) {
      this.index = cached;
      this.isIndexed = true;
      return cached;
    }

    this.index = [];

    for (const section of manifest.sections) {
      for (const item of section.items) {
        try {
          const content = await this.extractContent(item.path, item.type, contentRoot);
          
          const indexEntry: SearchIndex = {
            lessonId: item.id,
            sectionId: section.id,
            title: item.title,
            content: content,
            tags: item.metadata?.tags || [item.type],
          };

          this.index.push(indexEntry);
        } catch (error) {
          console.warn(`Failed to index ${item.id}:`, error);
        }
      }
    }

    this.isIndexed = true;

    // Cache the index
    this.saveToCache(manifest.version, this.index);

    return this.index;
  }

  /**
   * Search the index
   */
  async search(query: string, limit: number = 20): Promise<SearchResult[]> {
    if (!this.isIndexed || this.index.length === 0) {
      return [];
    }

    const normalizedQuery = this.normalizeArabic(query.toLowerCase());
    const results: SearchResult[] = [];

    for (const entry of this.index) {
      const titleMatch = this.fuzzyMatch(
        normalizedQuery,
        this.normalizeArabic(entry.title.toLowerCase())
      );

      const contentMatch = this.fuzzyMatch(
        normalizedQuery,
        this.normalizeArabic(entry.content.toLowerCase())
      );

      const tagsMatch = entry.tags.some(tag =>
        this.fuzzyMatch(normalizedQuery, this.normalizeArabic(tag.toLowerCase())).score > 0.5
      );

      // Calculate relevance score
      const relevance = Math.max(
        titleMatch.score * 3, // Title matches weighted higher
        contentMatch.score,
        tagsMatch ? 0.6 : 0
      );

      if (relevance > 0.3) {
        const snippet = this.extractSnippet(entry.content, normalizedQuery, 50);
        const highlightedSnippet = this.highlightMatches(snippet, normalizedQuery);

        results.push({
          lessonId: entry.lessonId,
          sectionId: entry.sectionId,
          sectionTitle: entry.sectionId, // Will be populated by caller
          lessonTitle: entry.title,
          snippet,
          highlightedSnippet,
          relevance,
        });
      }
    }

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }

  /**
   * Clear the index
   */
  clearIndex(): void {
    this.index = [];
    this.isIndexed = false;
    localStorage.removeItem(this.cacheKey);
  }

  /**
   * Extract content from different file types
   */
  private async extractContent(
    path: string,
    type: string,
    contentRoot: string
  ): Promise<string> {
    // In a real implementation, this would:
    // - For PDF: use pdfjs to extract text
    // - For Markdown: parse and extract text
    // - For Images: use OCR or filename
    
    // For now, return a placeholder
    // In production, integrate with actual content loading
    return `Content from ${path}`;
  }

  /**
   * Fuzzy matching algorithm (simplified Levenshtein-based)
   */
  private fuzzyMatch(query: string, text: string): FuzzyMatchResult {
    if (!query) return { score: 0, indices: [] };
    if (!text) return { score: 0, indices: [] };

    // Exact match
    if (text.includes(query)) {
      return { score: 1, indices: [text.indexOf(query)] };
    }

    // Substring match
    let matchScore = 0;
    let matchIndices: number[] = [];

    for (let i = 0; i < text.length - query.length + 1; i++) {
      const substring = text.substring(i, i + query.length);
      const similarity = this.stringSimilarity(query, substring);
      
      if (similarity > matchScore) {
        matchScore = similarity;
        matchIndices = [i];
      }
    }

    return { score: matchScore, indices: matchIndices };
  }

  /**
   * Calculate string similarity (0-1)
   */
  private stringSimilarity(a: string, b: string): number {
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;

    if (longer.length === 0) return 1;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance
   */
  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  /**
   * Normalize Arabic text (remove diacritics, etc.)
   */
  private normalizeArabic(text: string): string {
    // Remove Arabic diacritics
    return text
      .replace(/[\u064B-\u0652]/g, '') // Remove diacritics
      .replace(/ة/g, 'ه') // Normalize ة to ه
      .replace(/أ|إ|آ/g, 'ا') // Normalize alef variants
      .trim();
  }

  /**
   * Extract snippet around match
   */
  private extractSnippet(text: string, query: string, contextLength: number): string {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    
    if (index === -1) {
      return text.substring(0, contextLength * 2) + '...';
    }

    const start = Math.max(0, index - contextLength);
    const end = Math.min(text.length, index + query.length + contextLength);

    let snippet = text.substring(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    return snippet;
  }

  /**
   * Highlight matches in text
   */
  private highlightMatches(text: string, query: string): string {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Save index to cache
   */
  private saveToCache(version: string, index: SearchIndex[]): void {
    try {
      const cacheData = {
        version,
        timestamp: Date.now(),
        index,
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache search index:', error);
    }
  }

  /**
   * Load index from cache
   */
  private loadFromCache(version: string): SearchIndex[] {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return [];

      const cacheData = JSON.parse(cached);
      
      // Validate cache version
      if (cacheData.version !== version) {
        localStorage.removeItem(this.cacheKey);
        return [];
      }

      // Check cache age (24 hours)
      const age = Date.now() - cacheData.timestamp;
      if (age > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(this.cacheKey);
        return [];
      }

      return cacheData.index || [];
    } catch (error) {
      console.warn('Failed to load search index from cache:', error);
      return [];
    }
  }

  /**
   * Get index statistics
   */
  getStats(): { indexed: boolean; entryCount: number } {
    return {
      indexed: this.isIndexed,
      entryCount: this.index.length,
    };
  }
}

// Export singleton instance
export const searchService = new SearchService();

export default SearchService;
