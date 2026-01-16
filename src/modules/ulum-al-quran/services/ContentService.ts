/**
 * ContentService - Manages content loading and lesson rendering
 * 
 * Handles:
 * - Loading and caching the manifest
 * - Loading individual lessons
 * - Computing lesson navigation
 * - Extracting table of contents from content
 */

import type {
  IContentService,
  ModuleManifest,
  RenderedLesson,
  LessonNavigation,
  LessonReference,
  TOCEntry,
  ManifestItem,
} from '../types';

class ContentService implements IContentService {
  private manifest: ModuleManifest | null = null;
  private contentCache: Map<string, RenderedLesson> = new Map();
  private manifestUrl = '/content/ulum-al-quran/manifest.generated.json';

  /**
   * Load the module manifest
   */
  async loadManifest(): Promise<ModuleManifest> {
    if (this.manifest) {
      return this.manifest;
    }

    try {
      const response = await fetch(this.manifestUrl);
      if (!response.ok) {
        throw new Error(`Failed to load manifest: ${response.statusText}`);
      }

      const data = await response.json();
      this.manifest = data;
      return data;
    } catch (error) {
      console.error('Error loading manifest:', error);
      throw error;
    }
  }

  /**
   * Load a specific lesson
   */
  async loadLesson(lessonId: string): Promise<RenderedLesson> {
    // Check cache
    if (this.contentCache.has(lessonId)) {
      return this.contentCache.get(lessonId)!;
    }

    const manifest = await this.loadManifest();
    const item = this.findLessonItem(manifest, lessonId);

    if (!item) {
      throw new Error(`Lesson not found: ${lessonId}`);
    }

    const section = this.findSectionForLesson(manifest, lessonId);
    if (!section) {
      throw new Error(`Section not found for lesson: ${lessonId}`);
    }

    // Render content based on type
    let content: React.ReactNode;
    let toc: TOCEntry[] = [];

    switch (item.type) {
      case 'pdf':
        content = this.renderPDF(item.path, item.title);
        break;
      case 'md':
      case 'mdx':
        const mdContent = await this.loadMarkdownContent(item.path);
        content = this.renderMarkdown(mdContent);
        toc = this.extractTableOfContents(mdContent);
        break;
      case 'image':
        content = this.renderImage(item.path);
        break;
      default:
        throw new Error(`Unsupported content type: ${item.type}`);
    }

    const navigation = await this.getNavigation(lessonId);

    const lesson: RenderedLesson = {
      id: lessonId,
      title: item.title,
      sectionId: section.id,
      sectionTitle: section.title,
      type: item.type,
      content,
      toc,
      metadata: item.metadata,
      navigation,
    };

    // Cache the lesson
    this.contentCache.set(lessonId, lesson);

    return lesson;
  }

  /**
   * Get navigation for a lesson (previous/next)
   */
  async getNavigation(lessonId: string): Promise<LessonNavigation> {
    const manifest = await this.loadManifest();
    let previousLesson: LessonReference | null = null;
    let nextLesson: LessonReference | null = null;

    let foundCurrent = false;
    let previousItem: { item: ManifestItem; section: any } | null = null;

    for (const section of manifest.sections) {
      for (const item of section.items) {
        if (item.id === lessonId) {
          foundCurrent = true;

          // Find next lesson
          const currentIndex = section.items.indexOf(item);
          if (currentIndex < section.items.length - 1) {
            const nextItem = section.items[currentIndex + 1];
            nextLesson = {
              id: nextItem.id,
              title: nextItem.title,
              sectionId: section.id,
              sectionTitle: section.title,
            };
          } else {
            // Look in next section
            const currentSectionIndex = manifest.sections.indexOf(section);
            if (currentSectionIndex < manifest.sections.length - 1) {
              const nextSection = manifest.sections[currentSectionIndex + 1];
              if (nextSection.items.length > 0) {
                const nextItem = nextSection.items[0];
                nextLesson = {
                  id: nextItem.id,
                  title: nextItem.title,
                  sectionId: nextSection.id,
                  sectionTitle: nextSection.title,
                };
              }
            }
          }

          break;
        }

        if (!foundCurrent) {
          previousItem = { item, section };
        }
      }

      if (foundCurrent) break;
    }

    if (previousItem) {
      previousLesson = {
        id: previousItem.item.id,
        title: previousItem.item.title,
        sectionId: previousItem.section.id,
        sectionTitle: previousItem.section.title,
      };
    }

    return { previousLesson, nextLesson };
  }

  /**
   * Find a lesson item in the manifest
   */
  private findLessonItem(manifest: ModuleManifest, lessonId: string): ManifestItem | null {
    for (const section of manifest.sections) {
      const item = section.items.find(i => i.id === lessonId);
      if (item) return item;
    }
    return null;
  }

  /**
   * Find the section containing a lesson
   */
  private findSectionForLesson(manifest: ModuleManifest, lessonId: string) {
    for (const section of manifest.sections) {
      if (section.items.some(i => i.id === lessonId)) {
        return section;
      }
    }
    return null;
  }

  /**
   * Load markdown content from file
   */
  private async loadMarkdownContent(path: string): Promise<string> {
    try {
      const response = await fetch(`/content/ulum-al-quran/${path}`);
      if (!response.ok) {
        throw new Error(`Failed to load markdown: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading markdown content:', error);
      throw error;
    }
  }

  /**
   * Render PDF content
   */
  private renderPDF(path: string, title: string): any {
    // Return a component reference that will be rendered by the caller
    return {
      type: 'pdf',
      path,
      title,
    };
  }

  /**
   * Render markdown content
   */
  private renderMarkdown(content: string): any {
    // Return a component reference that will be rendered by the caller
    return {
      type: 'markdown',
      content,
    };
  }

  /**
   * Render image content
   */
  private renderImage(path: string): any {
    return {
      type: 'image',
      path,
    };
  }

  /**
   * Extract table of contents from markdown
   */
  private extractTableOfContents(content: string): TOCEntry[] {
    const lines = content.split('\n');
    const toc: TOCEntry[] = [];
    const stack: TOCEntry[] = [];

    for (const line of lines) {
      const match = line.match(/^(#{2,6})\s+(.+)$/);
      if (!match) continue;

      const level = match[1].length;
      const title = match[2].trim();
      const id = this.generateHeadingId(title);

      const entry: TOCEntry = {
        id,
        title,
        level,
        children: [],
      };

      // Pop stack until we find the parent level
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        toc.push(entry);
      } else {
        stack[stack.length - 1].children.push(entry);
      }

      stack.push(entry);
    }

    return toc;
  }

  /**
   * Generate ID from heading text
   */
  private generateHeadingId(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0600-\u06FF\-]/g, '')
      .slice(0, 50);
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.contentCache.clear();
    this.manifest = null;
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { manifestLoaded: boolean; cachedLessons: number } {
    return {
      manifestLoaded: this.manifest !== null,
      cachedLessons: this.contentCache.size,
    };
  }
}

// Export singleton instance
export const contentService = new ContentService();

export default ContentService;
