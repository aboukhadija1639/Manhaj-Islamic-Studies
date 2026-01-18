export interface FiqhSection {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  examWeight: number;
}

export interface FiqhQuizQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FiqhQuizAttempt {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpent: number;
  answers: Array<{
    questionId: number;
    answer: string | number | boolean;
    isCorrect: boolean;
  }>;
}

export interface FiqhProgress {
  totalAttempts: number;
  bestScore: number;
  averageScore: number;
  attempts: FiqhQuizAttempt[];
  lastAttempt?: FiqhQuizAttempt;
}

export interface FiqhModuleConfig {
  id: string;
  title: string;
  description: string;
  program: string;
  year: string;
  sections: FiqhSection[];
  assessments: Array<{
    type: 'quiz' | 'exam';
    title: string;
    description: string;
    duration: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  references: Array<{
    author: string;
    title: string;
    publisher: string;
    year: number;
  }>;
}
