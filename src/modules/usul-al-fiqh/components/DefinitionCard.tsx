/**
 * بطاقة التعريف التفاعلية لمقياس أصول الفقه
 * Interactive Definition Card Component for Usul al-Fiqh Module
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { ChevronDown, BookOpen, Link2 } from 'lucide-react';
// import { cn } from '../../../shared/utils/cn';
import type { Definition } from '../../../data/academics/modules/usul-al-fiqh-enhanced.data';

interface DefinitionCardProps {
  definition: Definition;
  expanded?: boolean;
  onToggle?: (id: string) => void;
  showCitations?: boolean;
}

const DefinitionCard = ({
  definition,
  expanded = false,
  onToggle,
  showCitations = true,
}: DefinitionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggle?.(definition.id);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <motion.button
          onClick={handleToggle}
          className="w-full text-left"
          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
          whileTap={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <motion.div
                  className="flex items-center gap-3 mb-2"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-indigo-600"
                    animate={{ scale: isExpanded ? 1.2 : 1 }}
                  />
                  <CardTitle className="text-lg text-indigo-700 dark:text-indigo-400">
                    {definition.termAr}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground font-mono">
                    ({definition.term})
                  </span>
                </motion.div>
                <CardDescription className="text-sm text-muted-foreground">
                  {definition.linguistic}
                </CardDescription>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </div>
          </CardHeader>
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CardContent className="space-y-6 border-t pt-6">
                {/* Technical Definition */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800"
                >
                  <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                    التعريف الاصطلاحي:
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {definition.technical}
                  </p>
                </motion.div>

                {/* Examples */}
                {definition.examples && definition.examples.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <p className="text-sm font-semibold text-foreground mb-3">أمثلة:</p>
                    <div className="space-y-2">
                      {definition.examples.map((example, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + idx * 0.05 }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                        >
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex-shrink-0">
                            {idx + 1}.
                          </span>
                          <span className="text-sm text-foreground">{example}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Related Terms */}
                {definition.relatedTerms && definition.relatedTerms.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-sm font-semibold text-foreground mb-3">مصطلحات ذات صلة:</p>
                    <div className="flex flex-wrap gap-2">
                      {definition.relatedTerms.map((term, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                          >
                            <Link2 className="h-3 w-3 mr-1" />
                            {term}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Citations */}
                {showCitations && definition.citations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                        المصادر والمراجع:
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {definition.citations.map((citation, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + idx * 0.05 }}
                          className="text-xs text-foreground p-2 rounded bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors"
                        >
                          <div className="font-semibold text-blue-700 dark:text-blue-400">
                            {citation.author}
                          </div>
                          <div className="italic text-muted-foreground">
                            {citation.title}
                          </div>
                          {(citation.page || citation.volume) && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {citation.volume && `المجلد: ${citation.volume}`}
                              {citation.volume && citation.page && ' - '}
                              {citation.page && `ص. ${citation.page}`}
                            </div>
                          )}
                          {citation.note && (
                            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                              ملاحظة: {citation.note}
                            </div>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default DefinitionCard;
