/**
 * Academic Types - Central Export
 * جميع أنواع الهيكل الأكاديمي
 */

// Degree Types
export type { Degree, DegreeSummary, DegreeType } from './degree.types';

// Specialty Types
export type {
  Specialty,
  SpecialtySummary,
  SpecialtyArea,
  SpecialtyRequirements,
} from './specialty.types';

// Academic Year Types
export type { AcademicYear, AcademicYearSummary } from './academic-year.types';

// Semester Types
export type { Semester, SemesterSummary, SemesterStats } from './semester.types';

// Module Types
export type {
  Module,
  ModuleSummary,
  ModuleDetails,
  ModuleType,
  AssessmentType,
} from './module.types';

// Unit Types
export type {
  Unit,
  UnitSummary,
  UnitContent,
  UnitContentType,
  UnitProgress,
} from './unit.types';
