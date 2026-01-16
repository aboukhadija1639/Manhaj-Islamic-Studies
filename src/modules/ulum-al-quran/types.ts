/**
 * Type definitions for the Quranic Sciences (علوم القرآن) module
 */

export type ContentType = 'pdf' | 'md' | 'mdx' | 'image';

export interface ManifestItemMetadata {
  author?: string;
  duration?: number; // estimated reading time in minutes
  tags?: string[];
}

export interface ManifestItem {
  id: string;
  title: string;
  type: ContentType;
  path: string; // relative to content root
  order: number;
  metadata?: ManifestItemMetadata;
}

export interface ManifestSection {
  id: string;
  title: string;
  order: number;
  items: ManifestItem[];
}

export interface ModuleManifest {
  moduleId: 'ulum-al-quran';
  title: string;
  description: string;
  language: 'ar';
  direction: 'rtl';
  version: string;
  generatedAt: string;
  sections: ManifestSection[];
}

// Lesson Navigation
export interface LessonNavigation {
  previousLesson: LessonReference | null;
  nextLesson: LessonReference | null;
}

export interface LessonReference {
  id: string;
  title: string;
  sectionId: string;
  sectionTitle: string;
}

// Progress Tracking
export interface LessonStatus {
  lessonId: string;
  completed: boolean;
  lastAccessed: Date;
  timeSpent: number; // seconds
}

export interface ModuleProgress {
  moduleId: string;
  totalLessons: number;
  completedLessons: number;
  percentComplete: number;
  lastUpdated: Date;
}

// Search
export interface SearchIndex {
  lessonId: string;
  sectionId: string;
  title: string;
  content: string;
  tags: string[];
}

export interface SearchResult {
  lessonId: string;
  sectionId: string;
  sectionTitle: string;
  lessonTitle: string;
  snippet: string;
  highlightedSnippet: string;
  relevance: number; // 0-1
}

// Markdown Frontmatter
export interface MarkdownFrontmatter {
  title?: string;
  description?: string;
  author?: string;
  tags?: string[];
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
}

// Table of Contents
export interface TOCEntry {
  id: string;
  title: string;
  level: number; // 1-6 (h1-h6)
  children: TOCEntry[];
}

// Rendered Lesson
export interface RenderedLesson {
  id: string;
  title: string;
  sectionId: string;
  sectionTitle: string;
  type: ContentType;
  content: React.ReactNode;
  toc: TOCEntry[];
  metadata?: ManifestItemMetadata;
  navigation: LessonNavigation;
}

// PDF Viewer State
export interface PDFViewerState {
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

// Service Interfaces
export interface IProgressService {
  getLessonStatus(moduleId: string, lessonId: string): Promise<LessonStatus>;
  setLessonCompleted(
    moduleId: string,
    lessonId: string,
    completed: boolean
  ): Promise<void>;
  getModuleProgress(moduleId: string): Promise<ModuleProgress>;
  clearProgress(moduleId: string): Promise<void>;
  getAllProgress(moduleId: string): Promise<Record<string, LessonStatus>>;
}

export interface ISearchService {
  buildIndex(manifest: ModuleManifest, contentRoot: string): Promise<SearchIndex[]>;
  search(query: string, limit?: number): Promise<SearchResult[]>;
  clearIndex(): void;
}

export interface IContentService {
  loadManifest(): Promise<ModuleManifest>;
  loadLesson(lessonId: string): Promise<RenderedLesson>;
  getNavigation(lessonId: string): Promise<LessonNavigation>;
}

// Component Props
export interface ModuleShellProps {
  manifest: ModuleManifest;
}

export interface LessonRendererProps {
  lesson: RenderedLesson;
  onMarkComplete: (completed: boolean) => void;
  isCompleted: boolean;
}

export interface SidebarProps {
  manifest: ModuleManifest;
  currentLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  progress: ModuleProgress | null;
}

export interface SearchBoxProps {
  onSearch: (query: string) => void;
  onSelectResult: (result: SearchResult) => void;
  isLoading?: boolean;
}

export interface TableOfContentsProps {
  entries: TOCEntry[];
  onSelectEntry: (id: string) => void;
}

export interface PDFRendererProps {
  path: string;
  title: string;
}

export interface MarkdownRendererProps {
  content: string;
  onTOCGenerated?: (toc: TOCEntry[]) => void;
}
