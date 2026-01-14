/**
 * Routing Utilities
 * 
 * Helper functions for generating routes and breadcrumbs
 */

import { curriculumQueries } from '@/domain/curriculum/queries';

// ============ ROUTE GENERATORS ============

export const routes = {
  // Public routes
  home: () => '/',
  about: () => '/about',
  manhaj: () => '/manhaj',
  
  // Academic routes
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

// ============ BREADCRUMB GENERATION ============

export interface Breadcrumb {
  label: string;
  labelAr: string;
  path: string;
}

export function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', labelAr: 'الرئيسية', path: '/' }
  ];
  
  if (parts.length === 0) return breadcrumbs;
  
  // Parse URL structure
  if (parts[0] === 'years') {
    breadcrumbs.push({ 
      label: 'Years', 
      labelAr: 'السنوات', 
      path: '/years' 
    });
    
    if (parts[1]) {
      const yearId = parseInt(parts[1]);
      const year = curriculumQueries.getYear(yearId);
      
      breadcrumbs.push({ 
        label: year?.title || `Year ${yearId}`, 
        labelAr: year?.titleAr || `السنة ${yearId}`, 
        path: `/years/${yearId}` 
      });
      
      if (parts[2] === 'semesters' && parts[3]) {
        const semesterId = parseInt(parts[3]);
        const semester = curriculumQueries.getSemester(yearId, semesterId);
        
        breadcrumbs.push({ 
          label: semester?.title || `Semester ${semesterId}`, 
          labelAr: semester?.titleAr || `الفصل ${semesterId}`, 
          path: `/years/${yearId}/semesters/${semesterId}` 
        });
        
        if (parts[4] === 'map') {
          breadcrumbs.push({ 
            label: 'Curriculum Map', 
            labelAr: 'خريطة المنهج', 
            path: `/years/${yearId}/semesters/${semesterId}/map` 
          });
        } else if (parts[4] === 'subjects') {
          if (parts[5]) {
            const subjectId = parts[5];
            const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
            
            breadcrumbs.push({ 
              label: subject?.title || 'Subject', 
              labelAr: subject?.titleAr || 'المادة', 
              path: `/years/${yearId}/semesters/${semesterId}/subjects/${subjectId}` 
            });
            
            if (parts[6] === 'lessons' && parts[7]) {
              const lessonId = parts[7];
              const lesson = curriculumQueries.getLesson(yearId, semesterId, subjectId, lessonId);
              
              breadcrumbs.push({ 
                label: lesson?.title || 'Lesson', 
                labelAr: lesson?.titleAr || 'الدرس', 
                path: `/years/${yearId}/semesters/${semesterId}/subjects/${subjectId}/lessons/${lessonId}` 
              });
            }
          } else {
            breadcrumbs.push({ 
              label: 'Subjects', 
              labelAr: 'المواد', 
              path: `/years/${yearId}/semesters/${semesterId}/subjects` 
            });
          }
        }
      }
    }
  } else if (parts[0] === 'manhaj') {
    breadcrumbs.push({ 
      label: 'Manhaj', 
      labelAr: 'المنهج', 
      path: '/manhaj' 
    });
  } else if (parts[0] === 'about') {
    breadcrumbs.push({ 
      label: 'About', 
      labelAr: 'عن المنصة', 
      path: '/about' 
    });
  }
  
  return breadcrumbs;
}

// ============ URL PARSING ============

export interface ParsedRoute {
  type: 'home' | 'years' | 'year' | 'semester' | 'subjects' | 'subject' | 'lesson' | 'map' | 'manhaj' | 'about' | 'unknown';
  yearId?: number;
  semesterId?: number;
  subjectId?: string;
  lessonId?: string;
}

export function parseRoute(pathname: string): ParsedRoute {
  const parts = pathname.split('/').filter(Boolean);
  
  if (parts.length === 0) return { type: 'home' };
  
  if (parts[0] === 'years') {
    if (parts.length === 1) return { type: 'years' };
    
    const yearId = parseInt(parts[1]);
    if (parts.length === 2) return { type: 'year', yearId };
    
    if (parts[2] === 'semesters' && parts[3]) {
      const semesterId = parseInt(parts[3]);
      
      if (parts.length === 4) return { type: 'semester', yearId, semesterId };
      
      if (parts[4] === 'map') return { type: 'map', yearId, semesterId };
      
      if (parts[4] === 'subjects') {
        if (parts.length === 5) return { type: 'subjects', yearId, semesterId };
        
        const subjectId = parts[5];
        if (parts.length === 6) return { type: 'subject', yearId, semesterId, subjectId };
        
        if (parts[6] === 'lessons' && parts[7]) {
          const lessonId = parts[7];
          return { type: 'lesson', yearId, semesterId, subjectId, lessonId };
        }
      }
    }
  }
  
  if (parts[0] === 'manhaj') return { type: 'manhaj' };
  if (parts[0] === 'about') return { type: 'about' };
  
  return { type: 'unknown' };
}
