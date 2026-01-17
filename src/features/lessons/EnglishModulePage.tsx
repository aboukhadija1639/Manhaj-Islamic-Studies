import { Link } from 'react-router-dom';
import { Container, Button, Card } from '@/shared/ui';
import { englishLessons } from '@/shared/data/englishLessons';
import { cn } from '@/shared/utils/cn';

const EnglishModulePage = () => {
  const difficultyColors = {
    beginner: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      badge: 'bg-green-500',
    },
    intermediate: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      badge: 'bg-amber-500',
    },
    advanced: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      badge: 'bg-red-500',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-16">
        <Container>
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link to="/subjects" className="hover:underline opacity-90">
              Modules
            </Link>
            <span>→</span>
            <span>English Language</span>
          </div>

          <div className="flex items-start gap-6">
            <div className="text-7xl bg-primary-foreground/20 p-8 rounded-2xl backdrop-blur-sm">
              🌐
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                English Language
              </h1>
              <p className="text-2xl opacity-90 mb-4">لغة إنجليزية</p>
              <p className="text-lg opacity-95 mb-6 max-w-3xl">
                Master the fundamentals of English grammar with interactive lessons covering numbers, speech forms, conditionals, and voice transformations.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary-foreground/20 rounded-lg backdrop-blur-sm">
                  📚 {englishLessons.length} Lessons
                </span>
                <span className="px-4 py-2 bg-primary-foreground/20 rounded-lg backdrop-blur-sm">
                  ⭐ 3 Credits
                </span>
                <span className="px-4 py-2 bg-primary-foreground/20 rounded-lg backdrop-blur-sm">
                  ⏱️ 22.5 Hours
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Module Overview */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            📖 About This Module
          </h2>
          <p className="text-lg text-card-foreground leading-relaxed mb-4">
            This English Language module is designed for first-year students of Islamic Sciences at the University of El-Oued. The course focuses on essential grammar topics that form the foundation for academic reading and writing.
          </p>
          <p className="text-lg text-card-foreground leading-relaxed">
            Each lesson includes comprehensive explanations, examples, and interactive exercises to help you master the material. You can track your progress and practice as many times as you need.
          </p>
        </Card>

        {/* Lessons Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span>📚</span>
            <span>Course Lessons</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {englishLessons.map((lesson) => {
              const diffStyle = difficultyColors[lesson.difficulty];
              return (
                <Card
                  key={lesson.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{lesson.icon}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-muted-foreground">
                              Lesson {lesson.number}
                            </span>
                            <span className={cn('w-2 h-2 rounded-full', diffStyle.badge)} />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {lesson.titleAr}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-card-foreground mb-4 line-clamp-2">
                      {lesson.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                        ⏱️ {lesson.duration}
                      </span>
                      <span className={cn('px-3 py-1 rounded-full text-xs font-semibold capitalize', diffStyle.bg, diffStyle.text)}>
                        📊 {lesson.difficulty}
                      </span>
                      {lesson.exercises && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          ✍️ {lesson.exercises.length} Exercises
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link to={`/lessons/${lesson.id}`} className="block">
                      <Button className="w-full group-hover:shadow-md transition-shadow">
                        Start Lesson →
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Learning Path */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span>🎯</span>
            <span>Recommended Learning Path</span>
          </h2>
          <div className="space-y-4">
            {englishLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {lesson.number}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    {lesson.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {lesson.duration} • {lesson.difficulty}
                  </p>
                </div>
                <Link to={`/lessons/${lesson.id}`}>
                  <Button size="sm">Start</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
          <div className="flex justify-between items-center pt-12 mt-12 border-t-2 border-border">
          <Link to="/subjects">
            <Button variant="secondary" size="lg">
              ← Back to Modules
            </Button>
          </Link>
          <Link to="/lessons/lesson-1-numbers">
            <Button size="lg">
              Start First Lesson →
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default EnglishModulePage;
