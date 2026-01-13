import { useState } from 'react';
import { Card } from './Card';
import Button from './Button';
import Input from './Input';
import { cn } from '../utils/cn';
import type { Exercise } from '../data/englishLessons';

interface ExerciseCardProps {
  exercise: Exercise;
  exerciseNumber: number;
  onComplete?: (correct: boolean) => void;
}

const ExerciseCard = ({ exercise, exerciseNumber, onComplete }: ExerciseCardProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = () => {
    let correct = false;

    if (exercise.type === 'fill-in' || exercise.type === 'transformation') {
      const normalizedAnswer = userAnswer.trim().toLowerCase();
      const normalizedCorrect = (exercise.correctAnswer as string).toLowerCase();
      correct = normalizedAnswer === normalizedCorrect;
    } else if (exercise.type === 'multiple-choice') {
      correct = selectedOption === exercise.correctAnswer;
    }

    setIsCorrect(correct);
    setShowResult(true);
    onComplete?.(correct);
  };

  const handleReset = () => {
    setUserAnswer('');
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <Card
      className={cn(
        'p-6 transition-all duration-300',
        showResult && (isCorrect ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20')
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
          {exerciseNumber}
        </span>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {exercise.question}
          </p>
        </div>
      </div>

      {/* Fill-in or Transformation */}
      {(exercise.type === 'fill-in' || exercise.type === 'transformation') && (
        <div className="mb-4">
          <Input
            value={userAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={showResult}
            className="w-full"
          />
        </div>
      )}

      {/* Multiple Choice */}
      {exercise.type === 'multiple-choice' && exercise.options && (
        <div className="space-y-3 mb-4">
          {exercise.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && setSelectedOption(option)}
              disabled={showResult}
              className={cn(
                'w-full p-4 text-left rounded-lg border-2 transition-all',
                'hover:border-primary-400 dark:hover:border-primary-600',
                selectedOption === option
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
                showResult && option === exercise.correctAnswer && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                showResult && selectedOption === option && option !== exercise.correctAnswer && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                showResult && 'cursor-not-allowed'
              )}
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {String.fromCharCode(65 + idx)}. {option}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div
          className={cn(
            'p-4 rounded-lg mb-4',
            isCorrect ? 'bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700'
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
            <span className={cn('font-bold text-lg', isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200')}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          {!isCorrect && (
            <p className="text-gray-800 dark:text-gray-200 mb-1">
              <span className="font-semibold">Correct answer:</span> {exercise.correctAnswer}
            </p>
          )}
          {exercise.explanation && (
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="font-semibold">Explanation:</span> {exercise.explanation}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!showResult ? (
          <Button
            onClick={handleCheck}
            disabled={
              (exercise.type === 'fill-in' || exercise.type === 'transformation') && !userAnswer.trim() ||
              exercise.type === 'multiple-choice' && !selectedOption
            }
            className="flex-1"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleReset} variant="secondary" className="flex-1">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ExerciseCard;
