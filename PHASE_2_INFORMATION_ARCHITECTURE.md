# Phase 2: Scalable Information Architecture

## Overview

This phase defines the **complete information architecture** that will support unlimited years, semesters, subjects, and lessons without requiring code changes. The architecture is **data-driven**, **hierarchical**, and **query-based**.

---

## Core Principles

1. **Hierarchy First** - Year → Semester → Subject → Lesson is the fundamental structure
2. **Data-Driven** - All content organized by data, not hard-coded routes
3. **Query-Based** - Components query curriculum data, don't import directly
4. **Scalable** - Adding Year 2 requires only new data
5. **Type-Safe** - Full TypeScript coverage with Zod validation

---

## URL Structure (Dynamic Routing)

### Academic Routes

```
/                                           → Landing Page (Public)
/about                                      → About Page (Public)

/years                                      → Years Overview (All years)
/years/:yearId                              → Year Overview (e.g., /years/1)
/years/:yearId/semesters/:semesterId        → Semester Overview (e.g., /years/1/semesters/1)
/years/:yearId/semesters/:semesterId/map    → Curriculum Map
/years/:yearId/semesters/:semesterId/subjects                    → Subjects List
/years/:yearId/semesters/:semesterId/subjects/:subjectId         → Subject Detail
/years/:yearId/semesters/:semesterId/subjects/:subjectId/lessons/:lessonId  → Lesson View
```

### Manhaj Routes (Philosophy/Meta)

```
/manhaj                                     → Manhaj Overview (Philosophy)
/manhaj/principles                          → Core Principles
/manhaj/epistemology                        → Islamic Epistemology
```

### Examples

```
/years/1/semesters/1                        → "Year 1, Semester 1 Overview"
/years/1/semesters/1/subjects/aqeedah       → "Aqeedah (Year 1, Semester 1)"
/years/1/semesters/1/subjects/aqeedah/lessons/introduction  → "Lesson: Introduction to Aqeedah"
/years/1/semesters/1/map                    → "Curriculum Map for Semester 1"
/years/2/semesters/1/subjects/fiqh          → "Fiqh (Year 2, Semester 1)" ← Future
```

---

## Data Schema

### TypeScript Interfaces

```typescript
// domain/curriculum/types.ts

export interface Curriculum {
  years: Year[];
  metadata: CurriculumMetadata;
}

export interface CurriculumMetadata {
  institution: string;
  institutionAr: string;
  program: string;
  programAr: string;
  degree: string;
  degreeAr: string;
}

export interface Year {
  id: number;
  titleAr: string;
  title: string;
  description?: string;
  semesters: Semester[];
}

export interface Semester {
  id: number;
  titleAr: string;
  title: string;
  description?: string;
  weeks: number;
  startDate?: string;
  endDate?: string;
  subjects: Subject[];
  curriculumMap?: CurriculumMap;
  learningPhases?: LearningPhase[];
}

export interface Subject {
  id: string;
  titleAr: string;
  title: string;
  shortDesc: string;
  description?: string;
  icon: string;
  category: 'core' | 'supporting' | 'technical';
  credits: number;
  hours: number;
  
  // Manhaj metadata
  purpose: string;
  educationalGoal: string;
  functionalRole: string;
  practicalOutcome: string;
  epistemologicalPosition: EpistemologicalPosition;
  
  // Relationships
  connections: SubjectConnection[];
  prerequisites: string[];
  enables: string[];
  
  // Content
  topics: string[];
  objectives: string[];
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  number: number;
  titleAr: string;
  title: string;
  description?: string;
  duration?: number; // minutes
  objectives: string[];
  
  // Content
  contentType: 'embedded' | 'mdx' | 'external';
  contentPath?: string; // for MDX
  sections?: LessonSection[]; // for embedded
  
  // Metadata
  references?: Reference[];
  keywords?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface LessonSection {
  id: string;
  type: 'theory' | 'example' | 'exercise' | 'summary' | 'table' | 'diagram';
  title?: string;
  content: string | any; // string for text, any for structured data
}

export interface EpistemologicalPosition {
  type: 'revealed' | 'rational' | 'instrumental' | 'applied' | 'spiritual';
  typeAr: string;
  description: string;
}

export interface SubjectConnection {
  targetId: string;
  relationship: 'governs' | 'unlocks' | 'contextualizes' | 'structures' | 'applies' | 'protects' | 'supports';
  relationshipAr: string;
  description: string;
}

export interface Reference {
  type: 'quran' | 'hadith' | 'book' | 'article' | 'website';
  title: string;
  titleAr?: string;
  author?: string;
  url?: string;
  citation?: string;
}

export interface CurriculumMap {
  description: string;
  diagram?: string; // path to diagram image
  relationships: MapRelationship[];
}

export interface MapRelationship {
  from: string; // subject ID
  to: string;   // subject ID
  type: 'prerequisite' | 'supports' | 'applies';
}

export interface LearningPhase {
  id: number;
  titleAr: string;
  title: string;
  weeks: string;
  description: string;
  subjectIds: string[];
}
```

---

## Query Functions

```typescript
// domain/curriculum/queries.ts

import { curriculum } from './data';
import type { Year, Semester, Subject, Lesson } from './types';

export const curriculumQueries = {
  // Years
  getAllYears: (): Year[] => curriculum.years,
  
  getYear: (yearId: number): Year | undefined => 
    curriculum.years.find(y => y.id === yearId),
  
  // Semesters
  getSemester: (yearId: number, semesterId: number): Semester | undefined => {
    const year = curriculumQueries.getYear(yearId);
    return year?.semesters.find(s => s.id === semesterId);
  },
  
  getAllSemesters: (yearId: number): Semester[] => {
    const year = curriculumQueries.getYear(yearId);
    return year?.semesters || [];
  },
  
  // Subjects
  getSubject: (yearId: number, semesterId: number, subjectId: string): Subject | undefined => {
    const semester = curriculumQueries.getSemester(yearId, semesterId);
    return semester?.subjects.find(s => s.id === subjectId);
  },
  
  getAllSubjects: (yearId: number, semesterId: number): Subject[] => {
    const semester = curriculumQueries.getSemester(yearId, semesterId);
    return semester?.subjects || [];
  },
  
  getSubjectsByCategory: (yearId: number, semesterId: number, category: string): Subject[] => {
    const subjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return subjects.filter(s => s.category === category);
  },
  
  // Lessons
  getLesson: (yearId: number, semesterId: number, subjectId: string, lessonId: string): Lesson | undefined => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    return subject?.lessons.find(l => l.id === lessonId);
  },
  
  getAllLessons: (yearId: number, semesterId: number, subjectId: string): Lesson[] => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    return subject?.lessons || [];
  },
  
  getNextLesson: (yearId: number, semesterId: number, subjectId: string, currentLessonId: string): Lesson | undefined => {
    const lessons = curriculumQueries.getAllLessons(yearId, semesterId, subjectId);
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    return currentIndex >= 0 && currentIndex < lessons.length - 1 
      ? lessons[currentIndex + 1] 
      : undefined;
  },
  
  getPreviousLesson: (yearId: number, semesterId: number, subjectId: string, currentLessonId: string): Lesson | undefined => {
    const lessons = curriculumQueries.getAllLessons(yearId, semesterId, subjectId);
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    return currentIndex > 0 
      ? lessons[currentIndex - 1] 
      : undefined;
  },
  
  // Connections
  getConnectedSubjects: (yearId: number, semesterId: number, subjectId: string): Subject[] => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    if (!subject) return [];
    
    const connectedIds = subject.connections.map(c => c.targetId);
    const allSubjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return allSubjects.filter(s => connectedIds.includes(s.id));
  },
  
  // Statistics
  getSemesterStats: (yearId: number, semesterId: number) => {
    const subjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return {
      totalSubjects: subjects.length,
      totalCredits: subjects.reduce((sum, s) => sum + s.credits, 0),
      totalHours: subjects.reduce((sum, s) => sum + s.hours, 0),
      coreSubjects: subjects.filter(s => s.category === 'core').length,
      supportingSubjects: subjects.filter(s => s.category === 'supporting').length,
      technicalSubjects: subjects.filter(s => s.category === 'technical').length,
    };
  },
  
  // Search
  searchSubjects: (yearId: number, semesterId: number, query: string): Subject[] => {
    const subjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    const lowerQuery = query.toLowerCase();
    return subjects.filter(s => 
      s.titleAr.includes(query) ||
      s.title.toLowerCase().includes(lowerQuery) ||
      s.shortDesc.toLowerCase().includes(lowerQuery)
    );
  },
};
```

---

## React Hooks

```typescript
// shared/hooks/useCurriculum.ts

import { useParams } from 'react-router-dom';
import { curriculumQueries } from '@/domain/curriculum/queries';

export function useCurrentYear() {
  const { yearId } = useParams<{ yearId: string }>();
  const year = yearId ? curriculumQueries.getYear(parseInt(yearId)) : undefined;
  return { year, yearId: yearId ? parseInt(yearId) : undefined };
}

export function useCurrentSemester() {
  const { yearId, semesterId } = useParams<{ yearId: string; semesterId: string }>();
  const semester = yearId && semesterId 
    ? curriculumQueries.getSemester(parseInt(yearId), parseInt(semesterId))
    : undefined;
  return { 
    semester, 
    yearId: yearId ? parseInt(yearId) : undefined,
    semesterId: semesterId ? parseInt(semesterId) : undefined,
  };
}

export function useCurrentSubject() {
  const { yearId, semesterId, subjectId } = useParams<{ yearId: string; semesterId: string; subjectId: string }>();
  const subject = yearId && semesterId && subjectId
    ? curriculumQueries.getSubject(parseInt(yearId), parseInt(semesterId), subjectId)
    : undefined;
  return { 
    subject, 
    yearId: yearId ? parseInt(yearId) : undefined,
    semesterId: semesterId ? parseInt(semesterId) : undefined,
    subjectId,
  };
}

export function useCurrentLesson() {
  const { yearId, semesterId, subjectId, lessonId } = useParams<{ 
    yearId: string; 
    semesterId: string; 
    subjectId: string; 
    lessonId: string;
  }>();
  
  const lesson = yearId && semesterId && subjectId && lessonId
    ? curriculumQueries.getLesson(parseInt(yearId), parseInt(semesterId), subjectId, lessonId)
    : undefined;
    
  const nextLesson = yearId && semesterId && subjectId && lessonId
    ? curriculumQueries.getNextLesson(parseInt(yearId), parseInt(semesterId), subjectId, lessonId)
    : undefined;
    
  const previousLesson = yearId && semesterId && subjectId && lessonId
    ? curriculumQueries.getPreviousLesson(parseInt(yearId), parseInt(semesterId), subjectId, lessonId)
    : undefined;
  
  return { 
    lesson,
    nextLesson,
    previousLesson,
    yearId: yearId ? parseInt(yearId) : undefined,
    semesterId: semesterId ? parseInt(semesterId) : undefined,
    subjectId,
    lessonId,
  };
}
```

---

## Routing Implementation

```typescript
// app/router/index.tsx (NEW)

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AcademicLayout from '../layouts/AcademicLayout';
import { PageLoader } from '@/shared/ui';

// Public pages
const LandingPage = lazy(() => import('@/features/public/LandingPage'));
const AboutPage = lazy(() => import('@/features/public/AboutPage'));
const ManhajOverviewPage = lazy(() => import('@/features/manhaj/ManhajOverviewPage'));

// Academic pages
const YearsOverviewPage = lazy(() => import('@/features/years/YearsOverviewPage'));
const YearDetailPage = lazy(() => import('@/features/years/YearDetailPage'));
const SemesterOverviewPage = lazy(() => import('@/features/semesters/SemesterOverviewPage'));
const CurriculumMapPage = lazy(() => import('@/features/semesters/CurriculumMapPage'));
const SubjectListPage = lazy(() => import('@/features/subjects/SubjectListPage'));
const SubjectDetailPage = lazy(() => import('@/features/subjects/SubjectDetailPage'));
const LessonViewPage = lazy(() => import('@/features/lessons/LessonViewPage'));

const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><LandingPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
      { path: 'manhaj', element: <Suspense fallback={<PageLoader />}><ManhajOverviewPage /></Suspense> },
    ],
  },
  
  // Academic routes
  {
    path: '/years',
    element: <AcademicLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><YearsOverviewPage /></Suspense> },
      { path: ':yearId', element: <Suspense fallback={<PageLoader />}><YearDetailPage /></Suspense> },
      { 
        path: ':yearId/semesters/:semesterId',
        children: [
          { index: true, element: <Suspense fallback={<PageLoader />}><SemesterOverviewPage /></Suspense> },
          { path: 'map', element: <Suspense fallback={<PageLoader />}><CurriculumMapPage /></Suspense> },
          {
            path: 'subjects',
            children: [
              { index: true, element: <Suspense fallback={<PageLoader />}><SubjectListPage /></Suspense> },
              { path: ':subjectId', element: <Suspense fallback={<PageLoader />}><SubjectDetailPage /></Suspense> },
              { path: ':subjectId/lessons/:lessonId', element: <Suspense fallback={<PageLoader />}><LessonViewPage /></Suspense> },
            ],
          },
        ],
      },
    ],
  },
  
  // Redirects for backwards compatibility (temporary)
  { path: '/subjects', element: <Navigate to="/years/1/semesters/1/subjects" replace /> },
  { path: '/modules/:moduleId', element: <Navigate to="/years/1/semesters/1/subjects/:moduleId" replace /> },
  
  // 404
  { path: '*', element: <div>404 Not Found</div> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
```

---

## Navigation Utilities

```typescript
// shared/utils/routing.ts

export const routes = {
  home: () => '/',
  about: () => '/about',
  manhaj: () => '/manhaj',
  
  years: () => '/years',
  year: (yearId: number) => `/years/${yearId}`,
  
  semester: (yearId: number, semesterId: number) => 
    `/years/${yearId}/semesters/${semesterId}`,
  
  curriculumMap: (yearId: number, semesterId: number) => 
    `/years/${yearId}/semesters/${semesterId}/map`,
  
  subjects: (yearId: number, semesterId: number) => 
    `/years/${yearId}/semesters/${semesterId}/subjects`,
  
  subject: (yearId: number, semesterId: number, subjectId: string) => 
    `/years/${yearId}/semesters/${semesterId}/subjects/${subjectId}`,
  
  lesson: (yearId: number, semesterId: number, subjectId: string, lessonId: string) => 
    `/years/${yearId}/semesters/${semesterId}/subjects/${subjectId}/lessons/${lessonId}`,
};

// Breadcrumb generation
export function generateBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', labelAr: 'الرئيسية', path: '/' }];
  
  // Parse URL and generate breadcrumbs
  if (parts[0] === 'years') {
    breadcrumbs.push({ label: 'Years', labelAr: 'السنوات', path: '/years' });
    
    if (parts[1]) {
      const yearId = parseInt(parts[1]);
      breadcrumbs.push({ 
        label: `Year ${yearId}`, 
        labelAr: `السنة ${yearId}`, 
        path: `/years/${yearId}` 
      });
      
      if (parts[2] === 'semesters' && parts[3]) {
        const semesterId = parseInt(parts[3]);
        breadcrumbs.push({ 
          label: `Semester ${semesterId}`, 
          labelAr: `الفصل ${semesterId}`, 
          path: `/years/${yearId}/semesters/${semesterId}` 
        });
        
        if (parts[4] === 'subjects') {
          if (parts[5]) {
            // Subject detail
            breadcrumbs.push({ 
              label: 'Subject', 
              labelAr: 'المادة', 
              path: `/years/${yearId}/semesters/${semesterId}/subjects/${parts[5]}` 
            });
            
            if (parts[6] === 'lessons' && parts[7]) {
              // Lesson view
              breadcrumbs.push({ 
                label: 'Lesson', 
                labelAr: 'الدرس', 
                path: `/years/${yearId}/semesters/${semesterId}/subjects/${parts[5]}/lessons/${parts[7]}` 
              });
            }
          } else {
            // Subjects list
            breadcrumbs.push({ 
              label: 'Subjects', 
              labelAr: 'المواد', 
              path: `/years/${yearId}/semesters/${semesterId}/subjects` 
            });
          }
        } else if (parts[4] === 'map') {
          breadcrumbs.push({ 
            label: 'Curriculum Map', 
            labelAr: 'خريطة المنهج', 
            path: `/years/${yearId}/semesters/${semesterId}/map` 
          });
        }
      }
    }
  }
  
  return breadcrumbs;
}
```

---

## Migration Path

### Existing Data → New Schema

```typescript
// Migration script (conceptual)

import { modules } from './old/modules';
import { manhajSciences } from './old/manhajData';
import { englishLessons } from './old/englishLessons';

const newCurriculum = {
  years: [
    {
      id: 1,
      titleAr: 'السنة الأولى',
      title: 'Year 1',
      semesters: [
        {
          id: 1,
          titleAr: 'الفصل الأول',
          title: 'Semester 1',
          weeks: 16,
          subjects: manhajSciences.map(science => ({
            ...science,
            lessons: science.id === 'english-language' 
              ? englishLessons 
              : [], // Other subjects don't have lessons yet
          })),
        },
      ],
    },
  ],
};
```

---

## Success Criteria

✅ **Adding Year 2 requires:**
- Add new Year object to curriculum.years array
- Add subjects and lessons data
- Zero code changes

✅ **URLs are hierarchical and self-documenting**

✅ **Components use queries, not direct imports**

✅ **Navigation is context-aware (knows current year/semester)**

✅ **Breadcrumbs auto-generate from URL**

---

## Next Steps

**Phase 3**: Implement the curriculum data layer with full TypeScript types and query functions

**Phase 4**: Design and implement the UI/UX with sidebar, breadcrumbs, and lesson reader

**Phase 5**: Refactor existing pages to use the new architecture

**Phase 6**: Test scalability by adding Year 2 data (should be trivial)
