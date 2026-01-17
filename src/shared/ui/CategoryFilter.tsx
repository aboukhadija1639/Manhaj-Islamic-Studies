import { cn } from '../utils/cn';
import type { ModuleCategory } from '../data/modules';
import { moduleCategories } from '../data/modules';

interface CategoryFilterProps {
  activeCategory: ModuleCategory | 'all';
  onCategoryChange: (category: ModuleCategory | 'all') => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: 'all' as const, title: 'جميع المقاييس', icon: '📋', color: 'gray' },
    { ...moduleCategories.sharia, color: 'emerald' },
    { ...moduleCategories.supporting, color: 'amber' },
    { ...moduleCategories.technical, color: 'blue' },
  ];

  const colorStyles = {
    gray: {
      active: 'bg-secondary text-secondary-foreground border-secondary',
      inactive: 'bg-card text-card-foreground border-border hover:border-muted-foreground',
    },
    emerald: {
      active: 'bg-emerald-600 text-white border-emerald-600',
      inactive: 'bg-card text-card-foreground border-emerald-300 dark:border-emerald-600 hover:border-emerald-400',
    },
    amber: {
      active: 'bg-amber-600 text-white border-amber-600',
      inactive: 'bg-card text-card-foreground border-amber-300 dark:border-amber-600 hover:border-amber-400',
    },
    blue: {
      active: 'bg-blue-600 text-white border-blue-600',
      inactive: 'bg-card text-card-foreground border-blue-300 dark:border-blue-600 hover:border-blue-400',
    },
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const styles = colorStyles[category.color as keyof typeof colorStyles];

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id as ModuleCategory | 'all')}
            className={cn(
              'flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold',
              'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
              isActive ? styles.active : styles.inactive
            )}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm">{category.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
