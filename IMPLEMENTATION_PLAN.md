# Manhaj Implementation Plan
## Production-Grade Islamic Studies Platform

**Date:** January 16, 2026  
**Status:** In Progress  
**System:** Algerian LMD (Licence-Master-Doctorate)

---

## 1. Executive Summary

This document outlines the implementation strategy for enhancing the Manhaj Islamic Studies Platform to production-grade standards. The implementation follows strict requirements:

- **RTL-First Design**: All UI must be Arabic-only with proper RTL support
- **Data-Driven Architecture**: No hardcoded academic structures
- **Reuse Existing Code**: Refactor, don't rewrite
- **TypeScript Strict Mode**: Zero tolerance for `any` types or unused variables
- **Production Quality**: No demos, placeholders, or shortcuts

---

## 2. Current State Analysis

### ✅ Strengths (Already Implemented)
- Comprehensive domain models (Degree, Specialty, Module, Semester, Year)
- Data layer with configuration files
- LMD system structure properly defined
- TypeScript strict mode enabled
- Basic routing structure exists
- Qur'anic Sciences module partially implemented

### ⚠️ Gaps (Needs Implementation)
- **UI Components**: Many components need RTL refinement
- **Qur'anic Sciences Module**: Needs enhancement to production standards
- **Progress Tracking**: Not fully implemented
- **Resource Management**: PDF/file handling incomplete
- **Search Functionality**: Missing
- **Arabic-Only Interface**: Some English text remains
- **Module Page**: Needs complete overhaul with all required sections

---

## 3. Implementation Phases

### Phase 1: Domain Model Refinement ✅
**Status:** Complete (existing models are solid)

The existing domain models already support:
- LMD system (Licence 3 years, Master 2 years)
- 7 Specialties (configurable)
- Module types (fundamental, methodology, discovery, transversal, optional)
- Assessment structures
- Progress tracking types

**No changes needed** - models are production-ready.

---

### Phase 2: Data Layer Enhancement (In Progress)

#### 2.1 Academic Year Structure
Create data files for each academic year with semester breakdowns:

```
src/data/academics/
├── degrees.data.ts ✅
├── specialties.data.ts ✅
├── modules.data.ts ✅
├── years/
│   ├── licence/
│   │   ├── year-1.data.ts
│   │   ├── year-2.data.ts
│   │   └── year-3.data.ts
│   └── master/
│       ├── year-1.data.ts
│       └── year-2.data.ts
└── semesters/
    └── [semester-specific data]
```

#### 2.2 Module Content
For each module (especially Qur'anic Sciences):
- Learning objectives (Arabic)
- Unit structure with lessons
- Resource links (PDFs, summaries)
- Assessment criteria
- Prerequisites

---

### Phase 3: RTL-First UI Components

#### 3.1 Core Components (Refactor Existing)
All components must:
- Use `dir="rtl"` at root
- Use logical CSS properties (`margin-inline-start` not `margin-left`)
- Arabic-only text (no English in UI)
- Cairo font family for Arabic
- WCAG accessibility standards

**Components to refactor:**
- `Button` → Add RTL icon positioning
- `Card` → RTL layout support
- `Input` → RTL text alignment
- `ModuleCard` → Complete RTL redesign
- `Badge` → RTL positioning
- `Container` → RTL grid support

#### 3.2 Academic-Specific Components
- `ModuleDetailPage` (new) - Complete module view with all sections
- `LessonNavigator` (new) - Unit/lesson navigation
- `ProgressTracker` (enhance) - Visual progress indicators
- `ResourceLibrary` (new) - PDF/file management
- `BreadcrumbNav` (enhance) - RTL breadcrumbs

---

### Phase 4: Routing Architecture

#### 4.1 Academic Routes (RESTful)
```
/academics
  /:degreeId (licence-islamic-sciences | master-islamic-sciences)
    /:specialtyId (quran-sciences | hadith-sciences | ...)
      /:yearId (year-1 | year-2 | year-3)
        /:semesterId (s1 | s2 | s3 | s4 | s5 | s6)
          /:moduleId (ulum-al-quran | ...)
```

#### 4.2 Legacy Support
- `/subjects` → Redirect to `/academics`
- `/modules/:id` → Redirect to full academic path
- `/lessons/:id` → Redirect to module view

---

### Phase 5: Qur'anic Sciences Module Enhancement

**Priority:** HIGHEST  
**Requirement:** Reuse existing code, enhance to production standards

#### 5.1 Module Page Sections (All Required)
1. **Header Section**
   - Module title (Arabic)
   - Module code
   - Credits and hours
   - Semester/Year context

2. **Overview Tab**
   - Importance and context
   - Academic description
   - Prerequisites
   - Instructor info

3. **Objectives Tab**
   - Learning objectives (bullet points)
   - Expected outcomes
   - Skills to be acquired

4. **Content Tab**
   - Unit structure (collapsible)
   - Lesson list with progress indicators
   - Navigation between lessons
   - Estimated duration per unit

5. **Resources Tab**
   - PDF downloads
   - Summaries
   - External references
   - Supplementary materials

6. **Progress Tab**
   - Completion percentage
   - Units completed
   - Time spent
   - Assessment results

#### 5.2 Technical Implementation
```typescript
// Reuse existing structure
src/modules/ulum-al-quran/
├── components/
│   ├── ModuleHeader.tsx (enhance)
│   ├── ModuleOverview.tsx (new)
│   ├── ModuleObjectives.tsx (new)
│   ├── ModuleContent.tsx (enhance)
│   ├── ModuleResources.tsx (new)
│   └── ModuleProgress.tsx (new)
├── hooks/
│   ├── useModuleData.ts (existing)
│   ├── useModuleProgress.ts (new)
│   └── useModuleNavigation.ts (new)
├── services/
│   └── quran-module.service.ts (enhance)
└── types/
    └── quran-module.types.ts (enhance)
```

---

### Phase 6: Feature Implementation

#### 6.1 Progress Tracking
- LocalStorage-based progress
- Completion status per lesson
- Time tracking
- Assessment scores

#### 6.2 Search Functionality
- Search across modules
- Filter by specialty/year/semester
- Arabic text search
- Keyword matching

#### 6.3 Resource Management
- PDF viewer integration
- Download functionality
- Resource categorization
- External link handling

---

## 4. Quality Standards

### 4.1 Code Quality
- ✅ TypeScript strict mode (no `any`, no unused vars)
- ✅ ESLint + Prettier configured
- ✅ Component documentation (JSDoc)
- ✅ Consistent naming (Arabic comments, English code)

### 4.2 UI/UX Standards
- ✅ RTL-first design
- ✅ Arabic-only interface
- ✅ WCAG 2.1 Level AA accessibility
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Loading states and error handling

### 4.3 Performance
- ✅ Lazy loading for routes
- ✅ Code splitting
- ✅ Image optimization
- ✅ < 2s initial load time

---

## 5. Migration Strategy

### 5.1 Existing Code Reuse
**DO NOT rewrite from scratch:**
- Domain models → Keep as-is
- Data files → Enhance with more content
- Services → Refactor for consistency
- Components → Enhance RTL support

### 5.2 Deprecation Path
- Old routes → Add redirects
- English UI text → Replace with Arabic
- Inline styles → Move to Tailwind classes

---

## 6. Testing Strategy

### 6.1 Manual Testing
- [ ] All routes accessible
- [ ] RTL layout correct on all pages
- [ ] Arabic text displays properly
- [ ] Progress tracking works
- [ ] Resource downloads work

### 6.2 Build Verification
```bash
pnpm build
# Must succeed with zero TypeScript errors
```

---

## 7. Documentation Deliverables

1. **Architecture Document** ✅ (exists)
2. **Implementation Roadmap** ✅ (exists)
3. **Domain Layer Complete** ✅ (exists)
4. **Extension Guide** (to be created)
5. **Migration Guide** (this document)

---

## 8. Timeline

- **Phase 1:** ✅ Complete
- **Phase 2:** 🔄 In Progress (Data Layer)
- **Phase 3:** 📋 Next (UI Components)
- **Phase 4:** 📋 Pending (Routing)
- **Phase 5:** 📋 Priority (Qur'anic Sciences)
- **Phase 6:** 📋 Final (Features)

---

## 9. Success Criteria

### Must Have (MVP)
- [x] Domain models complete
- [ ] Qur'anic Sciences module production-ready
- [ ] All UI in Arabic (zero English)
- [ ] RTL layout perfect
- [ ] Routing architecture complete
- [ ] Progress tracking functional
- [ ] Build succeeds with zero errors

### Should Have
- [ ] Search functionality
- [ ] Resource management
- [ ] Dark mode
- [ ] Mobile responsive

### Nice to Have
- [ ] Analytics
- [ ] Offline support
- [ ] PWA features

---

## 10. Next Actions

1. ✅ Analyze existing codebase
2. 🔄 Create this implementation plan
3. 📋 Enhance data layer with complete module content
4. 📋 Refactor UI components for RTL
5. 📋 Implement complete Qur'anic Sciences module page
6. 📋 Add progress tracking
7. 📋 Verify build and deployment

---

**Last Updated:** January 16, 2026  
**Document Owner:** Senior Software Architect  
**Status:** Living Document (will be updated as implementation progresses)
