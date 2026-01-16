import { cn } from '../utils/cn';

interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: 'emerald' | 'amber' | 'blue' | 'purple';
  className?: string;
}

const colorStyles = {
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    text: 'text-amber-600 dark:text-amber-400',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-600 dark:text-blue-400',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
    text: 'text-purple-600 dark:text-purple-400',
  },
};

const StatsCard = ({ icon, label, value, color = 'emerald', className }: StatsCardProps) => {
  const styles = colorStyles[color];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 p-6',
        'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        styles.bg,
        styles.border,
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
            styles.iconBg
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </p>
          <p className={cn('text-3xl font-bold', styles.text)}>
            {value}
          </p>
        </div>
      </div>

      {/* Decorative Element */}
      <div
        className={cn(
          'absolute -bottom-2 -left-2 w-24 h-24 rounded-full opacity-10',
          styles.iconBg
        )}
      />
    </div>
  );
};

export default StatsCard;
