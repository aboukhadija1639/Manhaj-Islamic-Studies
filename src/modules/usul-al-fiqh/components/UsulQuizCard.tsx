/**
 * بطاقة اختبار تفاعلية لمقياس أصول الفقه
 * Interactive Quiz Card Component for Usul al-Fiqh Module
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/Card';
import Button from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { CheckCircle2, XCircle, BookOpen, Lightbulb } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';
import type { QuizQuestion } from '../../../data/academics/modules/usul-al-fiqh-enhanced.data';

interface UsulQuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  onComplete?: (isCorrect: boolean, answer: string | number) => void;
  showCitations?: boolean;
}

const UsulQuizCard = ({
  question,
  questionNumber,
  onComplete,
  showCitations = true,
}: UsulQuizCardProps) => {
  const [userAnswer, setUserAnswer] = useState<string | number>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCheck = () => {
    let correct = false;

    if (question.type === 'fill-blank') {
      const normalizedAnswer = (userAnswer as string).trim().toLowerCase();
      const normalizedCorrect = (question.correctAnswer as string).toLowerCase();
      correct = normalizedAnswer === normalizedCorrect;
    } else if (question.type === 'multiple-choice' || question.type === 'true-false') {
      correct = userAnswer === question.correctAnswer;
    }

    setIsCorrect(correct);
    setShowResult(true);
    onComplete?.(correct, userAnswer);
  };

  const handleReset = () => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card
        className={cn(
          'transition-all duration-300',
          showResult &&
            (isCorrect
              ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/10'
              : 'border-2 border-red-500 bg-red-50 dark:bg-red-900/10')
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4 flex-1">
              <motion.div
                className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {questionNumber}
              </motion.div>
              <div className="flex-1">
                <CardTitle className="text-lg text-foreground mb-2">
                  {question.questionAr}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {question.question}
                </CardDescription>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={cn('px-3 py-1 rounded-full text-xs font-semibold', getDifficultyColor(question.difficulty))}
            >
              {question.difficulty === 'easy' && 'سهل'}
              {question.difficulty === 'medium' && 'متوسط'}
              {question.difficulty === 'hard' && 'صعب'}
            </motion.div>
          </div>

          {/* Related Topics */}
          {question.relatedTopics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {question.relatedTopics.map((topic, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <Badge variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Multiple Choice Options */}
          {(question.type === 'multiple-choice' || question.type === 'true-false') &&
            question.optionsAr && (
              <div className="space-y-3">
                {question.optionsAr.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => !showResult && setUserAnswer(idx)}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    disabled={showResult}
                    className={cn(
                      'w-full p-4 text-right rounded-lg border-2 transition-all',
                      'hover:border-indigo-400 dark:hover:border-indigo-600',
                      userAnswer === idx
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-border bg-card',
                      showResult && idx === question.correctAnswer && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                      showResult && userAnswer === idx && idx !== question.correctAnswer && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                      showResult && 'cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-foreground">{option}</span>
                      <span className="text-sm font-bold text-muted-foreground">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

          {/* Fill in the Blank */}
          {question.type === 'fill-blank' && (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="اكتب إجابتك هنا..."
                disabled={showResult}
                className={cn(
                  'w-full px-4 py-3 rounded-lg border-2 transition-all text-right',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500',
                  showResult && 'cursor-not-allowed opacity-75'
                )}
              />
              <p className="text-xs text-muted-foreground text-right">
                Type your answer in Arabic
              </p>
            </div>
          )}

          {/* Result Display */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                  'p-4 rounded-lg border-2',
                  isCorrect
                    ? 'bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700'
                    : 'bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      'font-bold text-lg',
                      isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                    )}
                  >
                    {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                  </span>
                </div>

                {!isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-3 bg-white/50 dark:bg-black/20 rounded-md"
                  >
                    <p className="text-sm font-semibold text-foreground mb-1">الإجابة الصحيحة:</p>
                    <p className="text-sm text-foreground">{question.correctAnswerAr}</p>
                  </motion.div>
                )}

                {/* Explanation Toggle */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  <Lightbulb className="h-4 w-4" />
                  {showExplanation ? 'إخفاء التوضيح' : 'عرض التوضيح'}
                </motion.button>

                {/* Explanation Content */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-3 bg-white/50 dark:bg-black/20 rounded-md"
                    >
                      <p className="text-sm font-semibold text-foreground mb-2">التوضيح:</p>
                      <p className="text-sm text-foreground leading-relaxed">{question.explanationAr}</p>
                      <p className="text-xs text-muted-foreground mt-2 italic">{question.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Citations */}
                {showCitations && question.citations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-md border-l-4 border-indigo-500"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-foreground">المصادر:</p>
                    </div>
                    <ul className="space-y-1">
                      {question.citations.map((citation, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground">
                          <span className="font-semibold">{citation.author}</span>
                          {' - '}
                          <span className="italic">{citation.title}</span>
                          {citation.page && ` (ص. ${citation.page})`}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!showResult ? (
              <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleCheck}
                  disabled={
                    (question.type === 'fill-blank' && !(userAnswer as string).trim()) ||
                    ((question.type === 'multiple-choice' || question.type === 'true-false') && userAnswer === '')
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  تحقق من الإجابة
                </Button>
              </motion.div>
            ) : (
              <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleReset}
                  variant="secondary"
                  className="w-full"
                >
                  حاول مرة أخرى
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UsulQuizCard;
