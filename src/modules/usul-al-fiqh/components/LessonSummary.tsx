/**
 * ملخص الدرس التفاعلي لمقياس أصول الفقه
 * Interactive Lesson Summary Component for Usul al-Fiqh Module
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { CheckCircle2, BookOpen, Lightbulb, Download } from 'lucide-react';
import Button from '../../../shared/ui/Button';
import { cn } from '../../../shared/utils/cn';
import type { Summary } from '../../../data/academics/modules/usul-al-fiqh-enhanced.data';

interface LessonSummaryProps {
  summary: Summary;
  showCitations?: boolean;
  onDownload?: () => void;
}

const LessonSummary = ({
  summary,
  showCitations = true,
  onDownload,
}: LessonSummaryProps) => {
  const [expandedPoints, setExpandedPoints] = useState<Set<number>>(new Set());
  const [showFullContent, setShowFullContent] = useState(false);

  const togglePoint = (index: number) => {
    const newSet = new Set(expandedPoints);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedPoints(newSet);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* Header Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl text-indigo-700 dark:text-indigo-400 mb-2">
                  {summary.titleAr}
                </CardTitle>
                <CardDescription className="text-base text-foreground">
                  {summary.title}
                </CardDescription>
              </div>
              {onDownload && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDownload}
                  className="flex-shrink-0 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  title="تحميل الملخص"
                >
                  <Download className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-indigo-700 dark:text-indigo-400">
              المحتوى الأساسي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {summary.contentAr}
                </p>
              </div>

              {/* English Version Toggle */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
              >
                {showFullContent ? 'إخفاء النسخة الإنجليزية' : 'عرض النسخة الإنجليزية'}
              </motion.button>

              {/* English Content */}
              <AnimatePresence>
                {showFullContent && (
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-800"
                  >
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {summary.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Points */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <CardTitle className="text-lg text-foreground">
                النقاط الرئيسية
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summary.keyPointsAr.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => togglePoint(idx)}
                >
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                    <motion.div
                      animate={{ scale: expandedPoints.has(idx) ? 1.2 : 1 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                        {point}
                      </p>
                      {summary.keyPoints[idx] && (
                        <AnimatePresence>
                          {expandedPoints.has(idx) && (
                            <motion.p
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="text-sm text-muted-foreground mt-2 italic"
                            >
                              {summary.keyPoints[idx]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Citations */}
      {showCitations && summary.citations.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg text-foreground">
                  المصادر والمراجع
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary.citations.map((citation, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <Badge className="flex-shrink-0 mt-0.5 bg-blue-600 hover:bg-blue-700">
                        {idx + 1}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground break-words">
                          {citation.author}
                        </p>
                        <p className="text-sm italic text-muted-foreground break-words">
                          {citation.title}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                          {citation.source && (
                            <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded">
                              المصدر: {citation.source}
                            </span>
                          )}
                          {citation.volume && (
                            <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded">
                              المجلد: {citation.volume}
                            </span>
                          )}
                          {citation.page && (
                            <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded">
                              ص. {citation.page}
                            </span>
                          )}
                          {citation.year && (
                            <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded">
                              السنة: {citation.year}
                            </span>
                          )}
                        </div>
                        {citation.note && (
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 break-words">
                            ملاحظة: {citation.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex gap-3 justify-center pt-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            اقرأ المزيد
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4" />
            حمل الملخص
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LessonSummary;
