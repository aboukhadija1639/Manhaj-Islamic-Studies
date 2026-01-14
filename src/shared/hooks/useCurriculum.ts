/**
 * React Hooks for Curriculum Access
 * 
 * These hooks provide components with easy access to curriculum data
 * based on the current route parameters.
 */

import { useParams } from 'react-router-dom';
import { curriculumQueries } from '@/domain/curriculum/queries';

// ============ CONTEXT HOOKS ============

export function useCurrentYear() {
  const { yearId } = useParams<{ yearId: string }>();
  const parsedYearId = yearId ? parseInt(yearId) : undefined;
  const year = parsedYearId ? curriculumQueries.getYear(parsedYearId) : undefined;
  
  return { 
    year, 
    yearId: parsedYearId,
    isLoading: false,
    error: parsedYearId && !year ? 'Year not found' : null,
  };
}

export function useCurrentSemester() {
  const { yearId, semesterId } = useParams<{ yearId: string; semesterId: string }>();
  const parsedYearId = yearId ? parseInt(yearId) : undefined;
  const parsedSemesterId = semesterId ? parseInt(semesterId) : undefined;
  
  const semester = parsedYearId && parsedSemesterId
    ? curriculumQueries.getSemester(parsedYearId, parsedSemesterId)
    : undefined;
  
  return { 
    semester, 
    yearId: parsedYearId,
    semesterId: parsedSemesterId,
    isLoading: false,
    error: parsedYearId && parsedSemesterId && !semester ? 'Semester not found' : null,
  };
}

export function useCurrentSubject() {
  const { yearId, semesterId, subjectId } = useParams<{ 
    yearId: string; 
    semesterId: string; 
    subjectId: string;
  }>();
  
  const parsedYearId = yearId ? parseInt(yearId) : undefined;
  const parsedSemesterId = semesterId ? parseInt(semesterId) : undefined;
  
  const subject = parsedYearId && parsedSemesterId && subjectId
    ? curriculumQueries.getSubject(parsedYearId, parsedSemesterId, subjectId)
    : undefined;
  
  return { 
    subject, 
    yearId: parsedYearId,
    semesterId: parsedSemesterId,
    subjectId,
    isLoading: false,
    error: parsedYearId && parsedSemesterId && subjectId && !subject ? 'Subject not found' : null,
  };
}

export function useCurrentLesson() {
  const { yearId, semesterId, subjectId, lessonId } = useParams<{ 
    yearId: string; 
    semesterId: string; 
    subjectId: string; 
    lessonId: string;
  }>();
  
  const parsedYearId = yearId ? parseInt(yearId) : undefined;
  const parsedSemesterId = semesterId ? parseInt(semesterId) : undefined;
  
  const lesson = parsedYearId && parsedSemesterId && subjectId && lessonId
    ? curriculumQueries.getLesson(parsedYearId, parsedSemesterId, subjectId, lessonId)
    : undefined;
    
  const nextLesson = parsedYearId && parsedSemesterId && subjectId && lessonId
    ? curriculumQueries.getNextLesson(parsedYearId, parsedSemesterId, subjectId, lessonId)
    : undefined;
    
  const previousLesson = parsedYearId && parsedSemesterId && subjectId && lessonId
    ? curriculumQueries.getPreviousLesson(parsedYearId, parsedSemesterId, subjectId, lessonId)
    : undefined;
  
  return { 
    lesson,
    nextLesson,
    previousLesson,
    yearId: parsedYearId,
    semesterId: parsedSemesterId,
    subjectId,
    lessonId,
    isLoading: false,
    error: parsedYearId && parsedSemesterId && subjectId && lessonId && !lesson ? 'Lesson not found' : null,
  };
}

// ============ DATA HOOKS ============

export function useYears() {
  const years = curriculumQueries.getAllYears();
  return { years, isLoading: false, error: null };
}

export function useSemesters(yearId: number) {
  const semesters = curriculumQueries.getAllSemesters(yearId);
  return { semesters, isLoading: false, error: null };
}

export function useSubjects(yearId: number, semesterId: number) {
  const subjects = curriculumQueries.getAllSubjects(yearId, semesterId);
  return { subjects, isLoading: false, error: null };
}

export function useLessons(yearId: number, semesterId: number, subjectId: string) {
  const lessons = curriculumQueries.getAllLessons(yearId, semesterId, subjectId);
  return { lessons, isLoading: false, error: null };
}

// ============ STATISTICS HOOKS ============

export function useSemesterStats(yearId: number, semesterId: number) {
  const stats = curriculumQueries.getSemesterStats(yearId, semesterId);
  return { stats, isLoading: false, error: null };
}

export function useSubjectStats(yearId: number, semesterId: number, subjectId: string) {
  const stats = curriculumQueries.getSubjectStats(yearId, semesterId, subjectId);
  return { stats, isLoading: false, error: null };
}

// ============ RELATIONSHIP HOOKS ============

export function useConnectedSubjects(yearId: number, semesterId: number, subjectId: string) {
  const connected = curriculumQueries.getConnectedSubjects(yearId, semesterId, subjectId);
  return { connected, isLoading: false, error: null };
}

export function usePrerequisites(yearId: number, semesterId: number, subjectId: string) {
  const prerequisites = curriculumQueries.getPrerequisiteSubjects(yearId, semesterId, subjectId);
  return { prerequisites, isLoading: false, error: null };
}

// ============ CURRICULUM MAP HOOKS ============

export function useCurriculumMap(yearId: number, semesterId: number) {
  const map = curriculumQueries.getCurriculumMap(yearId, semesterId);
  return { map, isLoading: false, error: null };
}

export function useLearningPhases(yearId: number, semesterId: number) {
  const phases = curriculumQueries.getLearningPhases(yearId, semesterId);
  return { phases, isLoading: false, error: null };
}
