# Technical Design: Quranic Sciences (علوم القرآن) Module Integration

## Executive Summary

This document outlines the architecture for integrating the "Quranic Sciences" module into the Manhaj Islamic Studies Platform. The solution provides a modern, accessible, RTL-first learning experience with auto-discovery of content, full-text search, progress tracking, and support for multiple content formats (PDF, Markdown, images).

---

## 1. Content Ingestion Approach

### 1.1 Content Structure

The extracted archive contains:
```
علوم القرآن/
├── محاضرات_الدكتور_مخلوف_في_مقياس_علوم_القرآن_الجزء1.pdf
└── محاضرات_علوم_القرآن_الجزء_الثاني_.pdf
```

**Strategy:** Auto-generate a manifest by scanning the content folder and extracting metadata from:
- **Filename** → lesson title (Arabic-friendly parsing)
- **File type** → content format (PDF, MD, MDX, images)
- **Folder structure** → sections/chapters
- **PDF metadata** → title, author (if available)

### 1.2 Manifest Generation

**Process:**
1. Create a Node.js script: `scripts/generate-module-manifest.ts`
2. Scan `./content/ulum-al-quran/` recursively
3. Group files by folder (sections)
4. Extract titles from filenames, strip extensions
5. Detect file type and assign content renderer
6. Output: `src/modules/ulum-al-quran/manifest.generated.json`

**Manifest Structure:**
```typescript
type ModuleManifest = {
  moduleId: "ulum-al-quran";
  title: "علوم القرآن";
  description: "دراسة شاملة لعلوم القرآن الكريم";
  language: "ar";
  direction: "rtl";
  sections: Array<{
    id: string;
    title: string;
    order: number;
    items: Array<{
      id: string;
      title: string;
      type: "pdf" | "md" | "mdx" | "image";
      path: string;
      order: number;
      metadata?: {
        author?: string;
        duration?: number; // estimated reading time in minutes
        tags?: string[];
      };
    }>;
  }>;
};
```

### 1.3 Content Discovery Rules

- **Numeric prefixes** (e.g., `01_`, `02_`) → used for ordering
- **Underscores & hyphens** → converted to spaces in titles
- **PDF files** → detected as "pdf" type, stored with relative path
- **Markdown files** → parsed for frontmatter (title, description, tags)
- **Images** → grouped as gallery or embedded in lessons
- **Nested folders** → become sections; files within → lessons

---

## 2. Rendering Strategy Per File Type

### 2.1 PDF Rendering

**Approach:** Embedded viewer with fallback

**Implementation:**
- Use `react-pdf` library for in-browser PDF rendering
- Display first page as preview with page navigation
- Provide download link as fallback
- Lazy-load pages for performance
- Support fullscreen mode

**Fallback:** If PDF fails to load, show download button with file metadata

### 2.2 Markdown/MDX Rendering

**Approach:** Parse frontmatter, render with enhanced typography

**Features:**
- Extract title, description, tags from frontmatter
- Generate Table of Contents from headings (h2, h3)
- Support custom callout components (Note, Warning, Benefit)
- Syntax highlighting for code blocks
- Responsive images with captions
- RTL text handling with proper typography

**Processor:** `remark` + `rehype` pipeline with custom plugins

### 2.3 Image Rendering

**Approach:** Responsive gallery with captions

**Features:**
- Lazy loading with blur-up placeholder
- Responsive sizing (mobile-first)
- Optional caption from filename or metadata
- Lightbox/modal for full-size view

---

## 3. Search Indexing Approach

### 3.1 Client-Side Full-Text Search

**Strategy:** Build index at module load, store in memory + localStorage

**Process:**
1. Extract text from all content files:
   - PDF: use `pdfjs-dist` to extract text
   - Markdown: strip markdown syntax, keep plain text
   - Images: use filename + alt text
2. Create searchable index with fields:
   - `lessonId`, `sectionId`, `title`, `content`, `tags`
3. Implement fuzzy matching for Arabic text
4. Debounce search input (300ms)
5. Highlight matches in results

**Performance:**
- Lazy-load index on first search (code splitting)
- Cache index in localStorage (invalidate on manifest change)
- Limit results to top 20 matches
- Use Web Workers for indexing (if content is large)

### 3.2 Search UI

- Top search bar in module header
- Real-time results dropdown with:
  - Lesson title + section breadcrumb
  - Context snippet (50 chars around match)
  - Click to jump to lesson
- Keyboard shortcuts: `Ctrl+K` to focus search

---

## 4. Progress Persistence Layer

### 4.1 ProgressService Architecture

**Interface:**
```typescript
interface IProgressService {
  getLessonStatus(moduleId: string, lessonId: string): Promise<LessonStatus>;
  setLessonCompleted(moduleId: string, lessonId: string, completed: boolean): Promise<void>;
  getModuleProgress(moduleId: string): Promise<ModuleProgress>;
  clearProgress(moduleId: string): Promise<void>;
}

type LessonStatus = {
  lessonId: string;
  completed: boolean;
  lastAccessed: Date;
  timeSpent: number; // seconds
};

type ModuleProgress = {
  moduleId: string;
  totalLessons: number;
  completedLessons: number;
  percentComplete: number;
  lastUpdated: Date;
};
```

### 4.2 Persistence Layers

**Layer 1: localStorage (Default)**
- Store progress as JSON
- Key: `progress:${moduleId}:${lessonId}`
- Automatic sync on every update

**Layer 2: Backend Adapter (Future)**
- Abstract adapter pattern for backend sync
- Placeholder for API integration
- Conflict resolution strategy (last-write-wins)

### 4.3 Auto-Save Behavior

- Mark lesson as "viewed" on page load
- Mark as "completed" on user action
- Debounce saves (500ms) to reduce writes
- Sync to backend on blur/unload (if available)

---

## 5. UI/UX Architecture

### 5.1 Module Shell Layout

**Desktop (RTL):**
```
┌─────────────────────────────────────────────┐
│  [Search] | علوم القرآن | [Menu]            │  ← Header
├──────────────┬──────────────────┬──────────┤
│              │                  │          │
│  Sections    │   Lesson         │   TOC    │
│  & Lessons   │   Content        │ & Stats  │
│  (Sidebar)   │   (Main)         │ (Right)  │
│              │                  │          │
└──────────────┴──────────────────┴──────────┘
```

**Mobile:**
- Hamburger menu → drawer sidebar (RTL slide-in from right)
- Full-width content area
- TOC collapsible section below content
- Search in header

### 5.2 Component Hierarchy

```
ModuleShell
├── ModuleHeader
│   ├── SearchBox
│   ├── ModuleTitle
│   └── MenuButton
├── ModuleSidebar
│   ├── SectionList
│   │   └── LessonItem (recursive)
│   └── ProgressSummary
├── LessonRenderer
│   ├── LessonHeader (title, breadcrumbs, reading time)
│   ├── TableOfContents
│   ├── ContentRenderer
│   │   ├── MarkdownRenderer
│   │   ├── PDFRenderer
│   │   └── ImageRenderer
│   ├── CompletionToggle
│   └── NavigationFooter (prev/next)
└── SearchResults (overlay)
    └── ResultItem[]
```

### 5.3 Design System

**Colors (RTL-friendly neutral palette):**
- Primary: `#1a5490` (Islamic blue)
- Secondary: `#d4a574` (warm gold)
- Neutral: `#f5f5f5`, `#333333`
- Status: Green (completed), Gray (pending), Amber (in-progress)

**Typography:**
- Headings: `font-family: 'Droid Arabic Naskh', serif` (Arabic)
- Body: `font-family: system-ui` (RTL-safe)
- Monospace: `font-family: 'JetBrains Mono'`

**Spacing & Shadows:**
- Soft shadows: `shadow-sm` (Tailwind)
- Card padding: `p-4` (mobile), `p-6` (desktop)
- Section gaps: `gap-6`

---

## 6. Accessibility (A11y)

### 6.1 Keyboard Navigation

- **Tab order:** Header → Sidebar → Main content → Footer
- **Arrow keys:** Navigate sections/lessons in sidebar
- **Enter:** Open lesson
- **Escape:** Close modals/search
- **Ctrl+K:** Focus search

### 6.2 ARIA Labels

- `role="navigation"` for sidebars
- `aria-label` for icon buttons
- `aria-current="page"` for active lesson
- `aria-live="polite"` for search results
- Semantic HTML: `<nav>`, `<article>`, `<section>`

### 6.3 Contrast & Readability

- Minimum contrast ratio: 4.5:1 (WCAG AA)
- Font size: min 16px on mobile
- Line height: 1.6 for body text
- RTL text alignment verified

---

## 7. Performance Optimization

### 7.1 Code Splitting

- Module routes lazy-loaded: `React.lazy(() => import('./modules/ulum-al-quran'))`
- Manifest loaded on demand
- Search index lazy-loaded on first search
- PDF viewer lazy-loaded on first PDF encounter

### 7.2 Virtualization

- Sidebar lesson list: virtualize if >100 items
- Use `react-window` for large lists

### 7.3 Caching Strategy

- Manifest: cache in localStorage (invalidate on deploy)
- Search index: cache in localStorage (invalidate on manifest change)
- PDFs: browser HTTP cache + service worker (optional)

### 7.4 Image Optimization

- Lazy loading: `loading="lazy"`
- Responsive images: `srcset` for multiple sizes
- Format: WebP with fallback to JPEG
- Blur-up placeholder while loading

---

## 8. Deployment & Build Process

### 8.1 Content Preparation

```bash
# 1. Extract content archive
mkdir -p content/ulum-al-quran
7z x علومالقرآن.7z -o./content/ulum-al-quran

# 2. Generate manifest
npm run generate:manifest

# 3. Verify output
cat src/modules/ulum-al-quran/manifest.generated.json
```

### 8.2 Build Steps

```bash
# Development
npm run dev

# Production build
npm run build
# Manifest is included in bundle
```

### 8.3 Static Asset Serving

- Content files served from `/public/content/ulum-al-quran/`
- Or bundled at build time (recommended for PDFs)
- CDN-friendly: add cache headers for static assets

---

## 9. Testing Strategy

### 9.1 Unit Tests

- **Manifest generation:** Verify folder scanning, title extraction, ordering
- **Progress service:** CRUD operations, localStorage persistence
- **Search indexing:** Fuzzy matching, Arabic text handling
- **TOC extraction:** Heading detection, ID generation

### 9.2 Integration Tests

- Module shell rendering with mock manifest
- Navigation between lessons
- Search functionality end-to-end
- Progress persistence across page reloads

### 9.3 E2E Tests (Cypress/Playwright)

- User journey: open module → search → navigate → mark complete
- PDF rendering and download
- Mobile responsiveness
- RTL layout verification

---

## 10. Future Enhancements

1. **Backend Sync:** REST API for progress persistence
2. **Annotations:** User highlights, notes, bookmarks
3. **Discussions:** Comments per lesson (moderated)
4. **Certificates:** Completion badges
5. **Offline Mode:** Service Worker for offline access
6. **Analytics:** Track engagement, completion rates
7. **AI Features:** Smart summaries, Q&A assistant

---

## Summary

This architecture provides a **scalable, maintainable, production-ready** solution for the Quranic Sciences module. It balances simplicity (static manifest) with power (auto-discovery, search, progress), while maintaining accessibility and RTL-first design principles.

**Key Decisions:**
- ✅ Client-side search for instant results
- ✅ localStorage for progress (no backend required initially)
- ✅ Lazy loading for performance
- ✅ Manifest-driven architecture for flexibility
- ✅ Component-based for reusability across modules
