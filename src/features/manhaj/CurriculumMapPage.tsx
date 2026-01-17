import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui';
import { manhajSciences, learningPhases } from '@/shared/data/manhajData';

export default function CurriculumMapPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'supporting' | 'technical'>('all');

  const filteredSciences = selectedCategory === 'all'
    ? manhajSciences
    : manhajSciences.filter(s => s.category === selectedCategory);

  const coreSciences = manhajSciences.filter(s => s.category === 'core');
  const supportingSciences = manhajSciences.filter(s => s.category === 'supporting');
  const technicalSciences = manhajSciences.filter(s => s.category === 'technical');

  const totalCredits = manhajSciences.reduce((sum, s) => sum + s.credits, 0);
  const totalHours = manhajSciences.reduce((sum, s) => sum + s.hours, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              خريطة المنهج الدراسي
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Curriculum Map - Semester 1
            </p>
            <p className="text-lg opacity-90">
              Bachelor in Sharia Sciences - University of El-Oued
            </p>
          </div>
        </Container>
      </section>

      {/* Statistics */}
      <section className="py-8 bg-stone-100 dark:bg-stone-900">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {manhajSciences.length}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">علوم / Sciences</div>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {totalCredits}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">ساعة معتمدة / Credits</div>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {totalHours}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">ساعة تدريس / Hours</div>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                16
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">أسبوع / Weeks</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Learning Pathway */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            مسار التعلم
            <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
              Learning Pathway
            </span>
          </h2>
          <div className="max-w-5xl mx-auto bg-card rounded-2xl p-8 shadow-lg mb-12">
            <img
              src="/docs/diagrams/pathway.png"
              alt="Learning Pathway - 4 Phases"
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {learningPhases.map((phase) => (
              <div
                key={phase.id}
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-800 dark:to-stone-700 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800"
              >
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {phase.id}
                </div>
                <h3 className="text-xl font-bold mb-2 text-right">{phase.titleAr}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                  Weeks {phase.weeks}
                </p>
                <p className="text-sm text-stone-700 dark:text-stone-300 mb-4 text-right">
                  {phase.description}
                </p>
                <div className="space-y-2">
                  {phase.sciences.map((scienceId) => {
                    const science = manhajSciences.find(s => s.id === scienceId);
                    return science ? (
                      <div
                        key={scienceId}
                        className="text-xs bg-card rounded px-3 py-2 text-right"
                      >
                        {science.titleAr}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            العلوم حسب التصنيف
            <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
              Sciences by Category
            </span>
          </h2>
          
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-card text-stone-700 dark:text-stone-300 hover:bg-muted dark:hover:bg-stone-700'
              }`}
            >
              الكل / All ({manhajSciences.length})
            </button>
            <button
              onClick={() => setSelectedCategory('core')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'core'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-card text-stone-700 dark:text-stone-300 hover:bg-muted dark:hover:bg-stone-700'
              }`}
            >
              العلوم الأساسية / Core ({coreSciences.length})
            </button>
            <button
              onClick={() => setSelectedCategory('supporting')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'supporting'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-card text-stone-700 dark:text-stone-300 hover:bg-muted dark:hover:bg-stone-700'
              }`}
            >
              العلوم المساعدة / Supporting ({supportingSciences.length})
            </button>
            <button
              onClick={() => setSelectedCategory('technical')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'technical'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-card text-stone-700 dark:text-stone-300 hover:bg-muted dark:hover:bg-stone-700'
              }`}
            >
              العلوم التقنية / Technical ({technicalSciences.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredSciences.map((science) => (
              <Link
                key={science.id}
                to={`/manhaj/science/${science.id}`}
                className="group bg-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-stone-200 dark:border-stone-700 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-5xl`}>{science.icon}</div>
                  <div className="text-right flex-1 mr-4">
                    <h3 className="text-2xl font-bold mb-1">{science.titleAr}</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{science.title}</p>
                  </div>
                </div>
                
                <p className="text-stone-700 dark:text-stone-300 text-sm mb-4 text-right line-clamp-3">
                  {science.shortDesc}
                </p>
                
                <div className="flex justify-between items-center text-sm text-stone-600 dark:text-stone-400 mb-4">
                  <span>{science.hours} ساعة</span>
                  <span>{science.credits} ساعة معتمدة</span>
                </div>
                
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  science.category === 'core'
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                    : science.category === 'supporting'
                    ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                }`}>
                  {science.category === 'core' ? 'أساسي' : science.category === 'supporting' ? 'مساعد' : 'تقني'}
                </div>
                
                <div className="mt-4 text-teal-600 dark:text-teal-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  استكشف ← Explore
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ابدأ رحلتك التعليمية
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your learning journey with the Foundation phase
            </p>
            <Link
              to="/subjects"
              className="inline-block bg-card text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-muted transition-colors shadow-lg"
            >
              عرض جميع المواد →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
