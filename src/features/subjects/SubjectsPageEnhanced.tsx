import { useState } from 'react';
import { Container, ModuleCard, CategoryFilter, StatsCard } from '@/shared/ui';
import { semester1Modules, getSemester1Stats, moduleCategories } from '@/shared/data/modules';
import type { ModuleCategory } from '@/shared/data/modules';

const SubjectsPageEnhanced = () => {
  const [activeCategory, setActiveCategory] = useState<ModuleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = getSemester1Stats();

  // Filter modules based on category and search
  const filteredModules = semester1Modules.filter((module) => {
    const matchesCategory = activeCategory === 'all' || module.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      module.titleAr.includes(searchQuery) ||
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container className="py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            <span>📚</span>
            <span>السنة الأولى - السداسي الأول</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            المقاييس الدراسية
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            استكشف مقاييس السداسي الأول من السنة الأولى في تخصص العلوم الإسلامية
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon="📚"
            label="إجمالي المقاييس"
            value={semester1Modules.length}
            color="emerald"
          />
          <StatsCard
            icon="⭐"
            label="الوحدات الدراسية"
            value={stats.totalCredits}
            color="amber"
          />
          <StatsCard
            icon="⏱️"
            label="ساعات التدريس"
            value={stats.totalHours}
            color="blue"
          />
          <StatsCard
            icon="🎯"
            label="المحاور الدراسية"
            value={semester1Modules.reduce((sum, m) => sum + m.topics.length, 0)}
            color="purple"
          />
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن مقياس..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-border bg-card text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
              🔍
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-foreground">
            تصفية حسب التصنيف
          </h2>
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Category Description */}
        {activeCategory !== 'all' && (
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-card border-2 border-border">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{moduleCategories[activeCategory].icon}</span>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {moduleCategories[activeCategory].title}
                </h3>
                <p className="text-muted-foreground">
                  {moduleCategories[activeCategory].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center">
          <p className="text-muted-foreground">
            عرض <span className="font-bold text-primary-600 dark:text-primary-400">{filteredModules.length}</span> من أصل {semester1Modules.length} مقياس
          </p>
        </div>

        {/* Modules Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-muted-foreground">
              جرب البحث بكلمات مختلفة أو اختر تصنيفاً آخر
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="text-lg mb-6 opacity-90">
            اختر مقياساً من الأعلى وابدأ رحلتك التعليمية الآن
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-card text-primary rounded-xl font-semibold hover:bg-muted transition-colors">
              تصفح جميع المقاييس
            </button>
            <button className="px-8 py-3 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors border-2 border-white/20">
              تعرف على المنصة
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SubjectsPageEnhanced;
