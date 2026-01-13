import { useParams, Link } from 'react-router-dom';
import { Container } from '@/shared/ui';
import { manhajSciences } from '@/shared/data/manhajData';

export default function ScienceDetailPage() {
  const { scienceId } = useParams<{ scienceId: string }>();
  const science = manhajSciences.find(s => s.id === scienceId);

  if (!science) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Science Not Found</h1>
          <Link to="/manhaj/curriculum-map" className="text-teal-600 hover:underline">
            ← Back to Curriculum Map
          </Link>
        </div>
      </Container>
    );
  }

  const connectedSciences = science.connections.map(conn => 
    manhajSciences.find(s => s.id === conn.targetId)
  ).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${science.gradient} text-white py-16`}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/manhaj/curriculum-map"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              ← العودة إلى خريطة المنهج
            </Link>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-7xl">{science.icon}</div>
              <div className="text-right flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {science.titleAr}
                </h1>
                <p className="text-2xl opacity-90">{science.title}</p>
              </div>
            </div>
            <p className="text-xl leading-relaxed opacity-90">
              {science.shortDesc}
            </p>
            <div className="flex gap-6 mt-6 text-lg">
              <div>
                <span className="font-semibold">{science.credits}</span> ساعة معتمدة
              </div>
              <div>
                <span className="font-semibold">{science.hours}</span> ساعة تدريس
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  science.category === 'core'
                    ? 'bg-white/20'
                    : science.category === 'supporting'
                    ? 'bg-white/20'
                    : 'bg-white/20'
                }`}>
                  {science.category === 'core' ? 'علم أساسي' : science.category === 'supporting' ? 'علم مساعد' : 'علم تقني'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Purpose & Goals */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Purpose */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg border-r-4 border-teal-500">
              <h2 className="text-2xl font-bold mb-4 text-right flex items-center justify-end gap-3">
                <span>الغرض من هذا العلم</span>
                <span className="text-3xl">🎯</span>
              </h2>
              <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed text-right">
                {science.purpose}
              </p>
            </div>

            {/* Educational Goal */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg border-r-4 border-emerald-500">
              <h2 className="text-2xl font-bold mb-4 text-right flex items-center justify-end gap-3">
                <span>الهدف التربوي</span>
                <span className="text-3xl">📚</span>
              </h2>
              <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed text-right">
                {science.educationalGoal}
              </p>
            </div>

            {/* Functional Role */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold mb-4 text-right flex items-center justify-end gap-3">
                <span>الدور الوظيفي</span>
                <span className="text-3xl">🔗</span>
              </h2>
              <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed text-right">
                {science.functionalRole}
              </p>
            </div>

            {/* Practical Outcome */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg border-r-4 border-purple-500">
              <h2 className="text-2xl font-bold mb-4 text-right flex items-center justify-end gap-3">
                <span>الأثر العملي</span>
                <span className="text-3xl">✨</span>
              </h2>
              <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed text-right">
                {science.practicalOutcome}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Epistemological Position */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              الموقع المعرفي
              <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
                Epistemological Position
              </span>
            </h2>
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <span className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${
                  science.epistemologicalPosition.type === 'revealed'
                    ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300'
                    : science.epistemologicalPosition.type === 'rational'
                    ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                    : science.epistemologicalPosition.type === 'instrumental'
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                    : science.epistemologicalPosition.type === 'applied'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                }`}>
                  {science.epistemologicalPosition.typeAr}
                </span>
              </div>
              <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed text-center">
                {science.epistemologicalPosition.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Connections */}
      {connectedSciences.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                العلاقات مع العلوم الأخرى
                <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
                  Connections with Other Sciences
                </span>
              </h2>
              <div className="space-y-6">
                {science.connections.map((conn, idx) => {
                  const targetScience = connectedSciences[idx];
                  if (!targetScience) return null;
                  
                  return (
                    <div
                      key={conn.targetId}
                      className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-4xl">{targetScience.icon}</div>
                        <div className="flex-1 text-right">
                          <h3 className="text-xl font-bold">{targetScience.titleAr}</h3>
                          <p className="text-sm text-stone-600 dark:text-stone-400">{targetScience.title}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                          conn.relationship === 'governs'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                            : conn.relationship === 'unlocks'
                            ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                            : conn.relationship === 'contextualizes'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : conn.relationship === 'structures'
                            ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                            : conn.relationship === 'applies'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : conn.relationship === 'protects'
                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                            : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                        }`}>
                          {conn.relationshipAr}
                        </div>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 text-right">
                        {conn.description}
                      </p>
                      <Link
                        to={`/manhaj/science/${targetScience.id}`}
                        className="inline-block mt-3 text-teal-600 dark:text-teal-400 text-sm font-semibold hover:underline"
                      >
                        استكشف {targetScience.titleAr} ←
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Prerequisites & Enables */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900">
        <Container>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prerequisites */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-right flex items-center justify-end gap-3">
                <span>المتطلبات السابقة</span>
                <span className="text-3xl">⬅️</span>
              </h3>
              {science.prerequisites.length > 0 ? (
                <ul className="space-y-2 text-right">
                  {science.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="text-stone-700 dark:text-stone-300">
                      • {prereq}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-stone-600 dark:text-stone-400 text-right">
                  لا توجد متطلبات سابقة - يمكن دراسته مباشرة
                </p>
              )}
            </div>

            {/* Enables */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-right flex items-center justify-end gap-3">
                <span>ما يُمَكِّن من دراسته</span>
                <span className="text-3xl">➡️</span>
              </h3>
              <ul className="space-y-2 text-right">
                {science.enables.map((enable, idx) => (
                  <li key={idx} className="text-stone-700 dark:text-stone-300">
                    • {enable}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Topics & Objectives */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Topics */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-stone-800 dark:to-stone-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-right">
                المواضيع الرئيسية
              </h3>
              <ul className="space-y-3 text-right">
                {science.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-center justify-end gap-3">
                    <span className="text-stone-700 dark:text-stone-300">{topic}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectives */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-stone-800 dark:to-stone-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-right">
                الأهداف التعليمية
              </h3>
              <ul className="space-y-3 text-right">
                {science.objectives.map((objective, idx) => (
                  <li key={idx} className="flex items-center justify-end gap-3">
                    <span className="text-stone-700 dark:text-stone-300">{objective}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ابدأ دراسة هذا العلم
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explore lessons, exercises, and resources for this science
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/subjects"
                className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-stone-100 transition-colors shadow-lg"
              >
                عرض المحتوى التعليمي
              </Link>
              <Link
                to="/manhaj/curriculum-map"
                className="inline-block bg-white/10 backdrop-blur text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
              >
                العودة إلى خريطة المنهج
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
