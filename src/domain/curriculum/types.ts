// Core curriculum types for the Manhaj platform

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
  gradient: string;
  
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
  type: 'theory' | 'example' | 'exercise' | 'summary' | 'table' | 'diagram' | 'tips' | 'steps';
  title?: string;
  titleAr?: string;
  content?: string;
  data?: any; // for structured data (tables, exercises, etc.)
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
  descriptionAr: string;
  diagram?: string; // path to diagram image
  relationships: MapRelationship[];
}

export interface MapRelationship {
  from: string; // subject ID
  to: string;   // subject ID
  type: 'prerequisite' | 'supports' | 'applies';
  label?: string;
}

export interface LearningPhase {
  id: number;
  titleAr: string;
  title: string;
  weeks: string;
  description: string;
  subjectIds: string[];
}

// Statistics types
export interface SemesterStats {
  totalSubjects: number;
  totalCredits: number;
  totalHours: number;
  coreSubjects: number;
  supportingSubjects: number;
  technicalSubjects: number;
  totalLessons: number;
}

export interface SubjectStats {
  totalLessons: number;
  totalDuration: number; // minutes
  completedLessons?: number;
  progress?: number; // percentage
}
