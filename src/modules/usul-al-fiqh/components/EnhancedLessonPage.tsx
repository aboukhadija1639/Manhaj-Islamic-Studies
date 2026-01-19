/**
 * صفحة الدرس المحسّنة لمقياس أصول الفقه
 * Enhanced Lesson Page Component for Usul al-Fiqh Module
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shared/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Progress } from '../../../shared/ui/progress';
import Button from '../../../shared/ui/Button';
import {
  BookOpen,
  Target,
  FileText,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Clock,
  Award,
  Zap,
} from 'lucide-react';
import DefinitionCard from './DefinitionCard';
import UsulQuizCard from './UsulQuizCard';
import LessonSummary from './LessonSummary';
import type { Lesson } from '../../../data/academics/modules/usul-al-fiqh-enhanced.data';

interface EnhancedLessonPageProps {
  lesson: Lesson;
  onLessonComplete?: (lessonId: string) => void;
}

const EnhancedLessonPage = ({
  lesson,
  onLessonComplete,
}: EnhancedLessonPageProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [expandedDefinitions, setExpandedDefinitions] = useState<Set<string>>(new Set());
  const [lessonProgress, setLessonProgress] = useState(0);

  const handleQuizComplete = (quizId: string, isCorrect: boolean) => {
    setCompletedQuizzes((prev) => new Set(prev).add(quizId));
    if (isCorrect) {
      setCorrectAnswers((prev) => new Set(prev).add(quizId));
    }

    // Calculate progress
    const totalQuizzes = lesson.quizzes.length;
    const completedCount = completedQuizzes.size + 1;
    const progress = Math.round((completedCount / totalQuizzes) * 100);
    setLessonProgress(progress);

    // Check if all quizzes completed
    if (completedCount === totalQuizzes) {
      onLessonComplete?.(lesson.id);
    }
  };

  const handleDefinitionToggle = (defId: string) => {
    const newSet = new Set(expandedDefinitions);
    if (newSet.has(defId)) {
      newSet.delete(defId);
    } else {
      newSet.add(defId);
    }
    setExpandedDefinitions(newSet);
  };

  const quizAccuracy =
    completedQuizzes.size > 0
      ? Math.round((correctAnswers.size / completedQuizzes.size) * 100)
      : 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-l from-indigo-700 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm font-semibold opacity-90">الدرس {lesson.order}</span>
                </div>
                <h1 className="text-4xl font-bold mb-2">{lesson.titleAr}</h1>
                <p className="text-white/80 text-lg">{lesson.title}</p>
                <p className="text-white/70 text-sm mt-2">{lesson.descriptionAr}</p>
              </motion.div>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[280px] w-full md:w-auto"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">المدة المقدرة</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {lesson.estimatedDuration}
                  </p>
                  <p className="text-xs text-white/70">دقيقة</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-white/80">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-xs">الأسئلة</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {lesson.quizzes.length}
                  </p>
                  <p className="text-xs text-white/70">سؤال</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">التقدم</span>
                  <span className="text-sm font-bold">{lessonProgress}%</span>
                </div>
                <Progress value={lessonProgress} className="h-2 bg-white/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto gap-2 bg-transparent">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3"
              >
                <BookOpen className="h-4 w-4 ml-2" />
                نظرة عامة
              </TabsTrigger>
              <TabsTrigger
                value="objectives"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3"
              >
                <Target className="h-4 w-4 ml-2" />
                الأهداف
              </TabsTrigger>
              <TabsTrigger
                value="definitions"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3"
              >
                <FileText className="h-4 w-4 ml-2" />
                التعريفات
              </TabsTrigger>
              <TabsTrigger
                value="quizzes"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3"
              >
                <HelpCircle className="h-4 w-4 ml-2" />
                الأسئلة
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3"
              >
                <Lightbulb className="h-4 w-4 ml-2" />
                الملخص
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-indigo-700">محتوى الدرس</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed text-lg">
                    {lesson.descriptionAr}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Animated Content */}
            {lesson.animatedContent.length > 0 && (
              <motion.div
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700">محتوى تفاعلي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {lesson.animatedContent.map((content, idx) => (
                        <motion.div
                          key={content.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800"
                        >
                          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
                            {content.titleAr}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {content.elements.map((element, elemIdx) => (
                              <motion.div
                                key={element.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: content.animationDelay + elemIdx * 100,
                                }}
                                className="p-4 rounded-lg border-2"
                                style={{
                                  borderColor: element.color || '#818CF8',
                                  backgroundColor: `${element.color || '#818CF8'}15`,
                                }}
                              >
                                <h4 className="font-semibold mb-2" style={{ color: element.color }}>
                                  {element.labelAr}
                                </h4>
                                <p className="text-sm text-foreground">
                                  {element.descriptionAr}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* Objectives Tab */}
          <TabsContent value="objectives" className="space-y-6">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-indigo-700">الأهداف التعليمية</CardTitle>
                  <CardDescription>
                    ما ستتعلمه من خلال هذا الدرس
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {lesson.objectivesAr.map((objective, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <motion.div
                          className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold"
                          whileHover={{ scale: 1.1 }}
                        >
                          {idx + 1}
                        </motion.div>
                        <span className="text-foreground pt-2 text-lg">{objective}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Definitions Tab */}
          <TabsContent value="definitions" className="space-y-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {lesson.definitions.map((definition) => (
                <motion.div
                  key={definition.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <DefinitionCard
                    definition={definition}
                    expanded={expandedDefinitions.has(definition.id)}
                    onToggle={handleDefinitionToggle}
                    showCitations={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            {/* Quiz Stats */}
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">الأسئلة المكتملة</p>
                    <p className="text-3xl font-bold text-foreground">
                      {completedQuizzes.size}/{lesson.quizzes.length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">الإجابات الصحيحة</p>
                    <p className="text-3xl font-bold text-foreground">
                      {correctAnswers.size}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">دقة الإجابة</p>
                    <p className="text-3xl font-bold text-foreground">
                      {quizAccuracy}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quizzes */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="space-y-6"
            >
              {lesson.quizzes.map((quiz, idx) => (
                <motion.div
                  key={quiz.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <UsulQuizCard
                    question={quiz}
                    questionNumber={idx + 1}
                    onComplete={(isCorrect) => handleQuizComplete(quiz.id, isCorrect)}
                    showCitations={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
            >
              <LessonSummary
                summary={lesson.summary}
                showCitations={true}
                onDownload={() => {
                  // Implement download functionality
                  console.log('Download summary:', lesson.summary.id);
                }}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {lessonProgress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white rounded-lg shadow-lg p-4 max-w-md"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">تم إكمال الدرس بنجاح!</p>
                <p className="text-sm opacity-90">
                  لقد أكملت جميع الأسئلة. استمر في الدروس القادمة.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedLessonPage;
