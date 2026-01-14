/**
 * Curriculum Query Functions
 * 
 * These functions provide a clean API for accessing curriculum data.
 * Components should use these queries instead of importing data directly.
 */

import { curriculum } from './data';
import type { Year, Semester, Subject, Lesson, SemesterStats, SubjectStats } from './types';

export const curriculumQueries = {
  // ============ METADATA ============
  
  getMetadata: () => curriculum.metadata,
  
  // ============ YEARS ============
  
  getAllYears: (): Year[] => curriculum.years,
  
  getYear: (yearId: number): Year | undefined => 
    curriculum.years.find(y => y.id === yearId),
  
  // ============ SEMESTERS ============
  
  getSemester: (yearId: number, semesterId: number): Semester | undefined => {
    const year = curriculumQueries.getYear(yearId);
    return year?.semesters.find(s => s.id === semesterId);
  },
  
  getAllSemesters: (yearId: number): Semester[] => {
    const year = curriculumQueries.getYear(yearId);
    return year?.semesters || [];
  },
  
  // ============ SUBJECTS ============
  
  getSubject: (yearId: number, semesterId: number, subjectId: string): Subject | undefined => {
    const semester = curriculumQueries.getSemester(yearId, semesterId);
    return semester?.subjects.find(s => s.id === subjectId);
  },
  
  getAllSubjects: (yearId: number, semesterId: number): Subject[] => {
    const semester = curriculumQueries.getSemester(yearId, semesterId);
    return semester?.subjects || [];
  },
  
  getSubjectsByCategory: (
    yearId: number, 
    semesterId: number, 
    category: 'core' | 'supporting' | 'technical'
  ): Subject[] => {
    const subjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return subjects.filter(s => s.category === category);
  },
  
  // ============ LESSONS ============
  
  getLesson: (
    yearId: number, 
    semesterId: number, 
    subjectId: string, 
    lessonId: string
  ): Lesson | undefined => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    return subject?.lessons.find(l => l.id === lessonId);
  },
  
  getAllLessons: (yearId: number, semesterId: number, subjectId: string): Lesson[] => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    return subject?.lessons || [];
  },
  
  getNextLesson: (
    yearId: number, 
    semesterId: number, 
    subjectId: string, 
    currentLessonId: string
  ): Lesson | undefined => {
    const lessons = curriculumQueries.getAllLessons(yearId, semesterId, subjectId);
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    return currentIndex >= 0 && currentIndex < lessons.length - 1 
      ? lessons[currentIndex + 1] 
      : undefined;
  },
  
  getPreviousLesson: (
    yearId: number, 
    semesterId: number, 
    subjectId: string, 
    currentLessonId: string
  ): Lesson | undefined => {
    const lessons = curriculumQueries.getAllLessons(yearId, semesterId, subjectId);
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    return currentIndex > 0 
      ? lessons[currentIndex - 1] 
      : undefined;
  },
  
  // ============ CONNECTIONS ============
  
  getConnectedSubjects: (yearId: number, semesterId: number, subjectId: string): Subject[] => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    if (!subject) return [];
    
    const connectedIds = subject.connections.map(c => c.targetId);
    const allSubjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return allSubjects.filter(s => connectedIds.includes(s.id));
  },
  
  getPrerequisiteSubjects: (yearId: number, semesterId: number, subjectId: string): Subject[] => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    if (!subject) return [];
    
    const allSubjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return allSubjects.filter(s => subject.prerequisites.includes(s.id));
  },
  
  // ============ STATISTICS ============
  
  getSemesterStats: (yearId: number, semesterId: number): SemesterStats => {
    const subjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return {
      totalSubjects: subjects.length,
      totalCredits: subjects.reduce((sum, s) => sum + s.credits, 0),
      totalHours: subjects.reduce((sum, s) => sum + s.hours, 0),
      coreSubjects: subjects.filter(s => s.category === 'core').length,
      supportingSubjects: subjects.filter(s => s.category === 'supporting').length,
      technicalSubjects: subjects.filter(s => s.category === 'technical').length,
      totalLessons: subjects.reduce((sum, s) => sum + s.lessons.length, 0),
    };
  },
  
  getSubjectStats: (yearId: number, semesterId: number, subjectId: string): SubjectStats => {
    const subject = curriculumQueries.getSubject(yearId, semesterId, subjectId);
    if (!subject) {
      return {
        totalLessons: 0,
        totalDuration: 0,
      };
    }
    
    return {
      totalLessons: subject.lessons.length,
      totalDuration: subject.lessons.reduce((sum, l) => sum + (l.duration || 0), 0),
    };
  },
  
  // ============ SEARCH ============
  
  searchSubjects: (yearId: number, semesterId: number, query: string): Subject[] => {
    const subjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    const lowerQuery = query.toLowerCase();
    return subjects.filter(s => 
      s.titleAr.includes(query) ||
      s.title.toLowerCase().includes(lowerQuery) ||
      s.shortDesc.toLowerCase().includes(lowerQuery) ||
      s.topics.some(t => t.includes(query) || t.toLowerCase().includes(lowerQuery))
    );
  },
  
  searchLessons: (yearId: number, semesterId: number, subjectId: string, query: string): Lesson[] => {
    const lessons = curriculumQueries.getAllLessons(yearId, semesterId, subjectId);
    const lowerQuery = query.toLowerCase();
    return lessons.filter(l =>
      l.titleAr.includes(query) ||
      l.title.toLowerCase().includes(lowerQuery) ||
      l.description?.toLowerCase().includes(lowerQuery) ||
      l.objectives.some(o => o.includes(query) || o.toLowerCase().includes(lowerQuery))
    );
  },
  
  // ============ CURRICULUM MAP ============
  
  getCurriculumMap: (yearId: number, semesterId: number) => {
    const semester = curriculumQueries.getSemester(yearId, semesterId);
    return semester?.curriculumMap;
  },
  
  getLearningPhases: (yearId: number, semesterId: number) => {
    const semester = curriculumQueries.getSemester(yearId, semesterId);
    return semester?.learningPhases || [];
  },
  
  getSubjectsByPhase: (yearId: number, semesterId: number, phaseId: number): Subject[] => {
    const phases = curriculumQueries.getLearningPhases(yearId, semesterId);
    const phase = phases.find(p => p.id === phaseId);
    if (!phase) return [];
    
    const allSubjects = curriculumQueries.getAllSubjects(yearId, semesterId);
    return allSubjects.filter(s => phase.subjectIds.includes(s.id));
  },
};
