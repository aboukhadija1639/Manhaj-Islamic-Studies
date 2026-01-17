import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import type { Module } from '../data/modules';

export interface ModuleCardProps extends HTMLAttributes<HTMLDivElement> {
  module: Module;
}

const categoryStyles = {
  sharia: {
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconText: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    hover: 'hover:border-emerald-300 dark:hover:border-emerald-700',
  },
  supporting: {
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    border: 'border-amber-200 dark:border-amber-800',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconText: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    hover: 'hover:border-amber-300 dark:hover:border-amber-700',
  },
  technical: {
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconText: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    hover: 'hover:border-blue-300 dark:hover:border-blue-700',
  },
};

const ModuleCard = forwardRef<HTMLDivElement, ModuleCardProps>(
  ({ module, className, ...props }, ref) => {
    const styles = categoryStyles[module.category];

    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-2xl border-2 bg-card',
          'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
          styles.border,
          styles.hover,
          className
        )}
        {...props}
      >
        {/* Gradient Background */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-50',
            `bg-gradient-to-br ${styles.gradient}`
          )}
        />

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            {/* Icon */}
            <div
              className={cn(
                'flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                'transition-transform duration-300 group-hover:scale-110',
                styles.iconBg
              )}
            >
              {module.icon}
            </div>

            {/* Credits Badge */}
            <div
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold',
                styles.badge
              )}
            >
              {module.credits} وحدات
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-1">
              {module.titleAr}
            </h3>
            <p className="text-sm text-muted-foreground">
              {module.title}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {module.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{module.hours} ساعة</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📚</span>
              <span>{module.topics.length} محاور</span>
            </div>
          </div>

          {/* Topics Preview */}
          <div className="flex flex-wrap gap-2">
            {module.topics.slice(0, 3).map((topic, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {topic}
              </span>
            ))}
            {module.topics.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                +{module.topics.length - 3}
              </span>
            )}
          </div>

          {/* Action Button */}
          <Link
            to={
              module.id === 'english-language'
                ? '/modules/english-language'
                : module.id === 'ulum-al-quran'
                ? '/modules/ulum-al-quran'
                : `/modules/${module.id}`
            }
            className={cn(
              'block w-full mt-4 py-3 px-4 rounded-xl text-center font-semibold',
              'transition-all duration-200',
              'bg-muted text-card-foreground dark:text-card-foreground',
              'hover:bg-muted dark:hover:bg-muted',
              'group-hover:shadow-md'
            )}
          >
            استكشف المقياس ←
          </Link>
        </div>

        {/* Hover Glow Effect */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            'bg-gradient-to-br',
            styles.gradient,
            'pointer-events-none'
          )}
        />
      </div>
    );
  }
);

ModuleCard.displayName = 'ModuleCard';

export default ModuleCard;
