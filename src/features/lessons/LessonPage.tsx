import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button } from '@/shared/ui';
import LessonSection from '@/shared/ui/LessonSection';
import ExerciseCard from '@/shared/ui/ExerciseCard';
import { getLessonById } from '@/shared/data/englishLessons';
import { cn } from '@/shared/utils/cn';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const [, setCompletedExercises] = useState<Set<string>>(new Set());
  const [correctExercises, setCorrectExercises] = useState<Set<string>>(new Set());

  if (!lesson) {
    return (
      <Container className="py-12 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Lesson Not Found
        </h1>
        <Link to="/modules/english-language">
          <Button>Back to English Module</Button>
        </Link>
      </Container>
    );
  }

  const difficultyColors = {
    beginner: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-300 dark:border-green-700',
    },
    intermediate: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-300 dark:border-amber-700',
    },
    advanced: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-300 dark:border-red-700',
    },
  };

  const difficultyStyle = difficultyColors[lesson.difficulty];

  const handleExerciseComplete = (exerciseId: string, correct: boolean) => {
    setCompletedExercises((prev) => new Set(prev).add(exerciseId));
    if (correct) {
      setCorrectExercises((prev) => new Set(prev).add(exerciseId));
    } else {
      setCorrectExercises((prev) => {
        const newSet = new Set(prev);
        newSet.delete(exerciseId);
        return newSet;
      });
    }
  };

  const progress = lesson.exercises
    ? Math.round((correctExercises.size / lesson.exercises.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-12">
        <Container>
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link to="/modules/english-language" className="hover:underline opacity-90">
              English Language
            </Link>
            <span>→</span>
            <span>Lesson {lesson.number}</span>
          </div>

          <div className="flex items-start gap-6">
            <div className="text-6xl bg-white/20 p-6 rounded-2xl backdrop-blur-sm">
              {lesson.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {lesson.title}
                </h1>
              </div>
              <p className="text-xl opacity-90 mb-4">{lesson.titleAr}</p>
              <p className="text-lg opacity-95 mb-4 max-w-3xl">
                {lesson.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  ⏱️ {lesson.duration}
                </span>
                <span className={cn('px-4 py-2 rounded-lg backdrop-blur-sm capitalize', difficultyStyle.bg, difficultyStyle.text, difficultyStyle.border, 'border-2')}>
                  📊 {lesson.difficulty}
                </span>
                {lesson.exercises && (
                  <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    ✍️ {lesson.exercises.length} Exercises
                  </span>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Progress Bar */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="mb-8 p-6 bg-card rounded-2xl border-2 border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-foreground">
                Your Progress
              </h3>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {progress}%
              </span>
            </div>
            <div className="w-full h-4 bg-muted dark:bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {correctExercises.size} of {lesson.exercises.length} exercises completed correctly
            </p>
          </div>
        )}

        {/* Lesson Content */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <span>📚</span>
            <span>Lesson Content</span>
          </h2>
          {lesson.sections.map((section) => (
            <LessonSection key={section.id} section={section} />
          ))}
        </div>

        {/* Exercises */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <span>✍️</span>
              <span>Practice Exercises</span>
            </h2>
            <p className="text-muted-foreground">
              Test your understanding with these exercises. You can try each exercise multiple times!
            </p>
            {lesson.exercises.map((exercise, idx) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                exerciseNumber={idx + 1}
                onComplete={(correct) => handleExerciseComplete(exercise.id, correct)}
              />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-12 mt-12 border-t-2 border-border">
          <Link to="/modules/english-language">
            <Button variant="secondary" size="lg">
              ← Back to English Module
            </Button>
          </Link>
          {lesson.number < 4 && (
            <Link to={`/lessons/lesson-${lesson.number + 1}`}>
              <Button size="lg">
                Next Lesson →
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LessonPage;
