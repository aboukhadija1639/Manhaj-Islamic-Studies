import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui';
import { manhajPrinciples } from '@/shared/data/manhajData';

export default function ManhajOverviewPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-purple-700 text-white py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-6xl">📖</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              منهاج العلوم الشرعية
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-light">
              Manhaj of Sharia Sciences
            </p>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90">
              An integrated system of knowledge rooted in Islamic epistemology
            </p>
          </div>
        </Container>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              رؤية المنهج
              <span className="block text-2xl font-normal mt-2 text-stone-600 dark:text-stone-400">
                Our Vision
              </span>
            </h2>
            <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto text-right">
              <p className="text-xl leading-relaxed">
                <strong>منهاج العلوم الشرعية</strong> ليس مجرد مجموعة من المقررات، بل هو{' '}
                <strong className="text-teal-600 dark:text-teal-400">نظام متكامل من المعرفة</strong>{' '}
                متجذر في المعرفة الإسلامية. منهجنا يدرك أن:
              </p>
              <ul className="space-y-4 text-lg">
                <li>
                  <strong className="text-purple-600 dark:text-purple-400">العلم عبادة</strong> - 
                  طلب العلم عبادة، وليس مجرد تراكم معلومات. كل علم ندرسه هو وسيلة للتقرب إلى الله.
                </li>
                <li>
                  <strong className="text-teal-600 dark:text-teal-400">التكامل لا التفرق</strong> - 
                  المعرفة الإسلامية كل متكامل تحت إطار التوحيد. العقيدة تحكم كل العلوم.
                </li>
                <li>
                  <strong className="text-emerald-600 dark:text-emerald-400">الغاية قبل المادة</strong> - 
                  لا ندرس للشهادات بل لنصبح علماء يفهمون صحيحًا ويعبدون صحيحًا.
                </li>
                <li>
                  <strong className="text-blue-600 dark:text-blue-400">النص أساس المعرفة</strong> - 
                  معرفتنا تبدأ بالوحي (القرآن والسنة)، نصل إليها عبر العربية.
                </li>
                <li>
                  <strong className="text-amber-600 dark:text-amber-400">التوازن بين العلم والعمل</strong> - 
                  العلم بلا تزكية يولد الكبر. العمل بلا علم يولد البدعة.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Principles */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            المبادئ الأساسية
            <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
              Core Principles
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {manhajPrinciples.map((principle) => (
              <div
                key={principle.id}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-stone-200 dark:border-stone-700"
              >
                <div className="text-5xl mb-4">{principle.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-right">
                  {principle.titleAr}
                </h3>
                <p className="text-lg font-semibold text-stone-600 dark:text-stone-400 mb-4">
                  {principle.title}
                </p>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-right">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Hierarchical Diagram */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            البنية الهرمية للمعرفة
            <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
              Hierarchical Structure of Knowledge
            </span>
          </h2>
          <div className="max-w-5xl mx-auto bg-card rounded-2xl p-8 shadow-lg">
            <img
              src="/docs/diagrams/hierarchy.png"
              alt="Hierarchical Structure of Islamic Knowledge"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-center text-stone-600 dark:text-stone-400 mt-6 text-lg">
              يوضح هذا الرسم البياني كيف تتدفق المعرفة الإسلامية من الله (المصدر) عبر الوحي إلى العلوم التطبيقية
            </p>
          </div>
        </Container>
      </section>

      {/* Integration Model */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            نموذج التكامل
            <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
              Integration Model
            </span>
          </h2>
          <div className="max-w-5xl mx-auto bg-card rounded-2xl p-8 shadow-lg">
            <img
              src="/docs/diagrams/integration.png"
              alt="Integration Model - Tawhid Centered"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-center text-stone-600 dark:text-stone-400 mt-6 text-lg">
              كل المعرفة متحدة تحت إطار التوحيد: العقيدة والعبادة والمعرفة والأخلاق
            </p>
          </div>
        </Container>
      </section>

      {/* Key Insights */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-stone-900 dark:to-stone-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              رؤى أساسية
              <span className="block text-xl font-normal mt-2 text-stone-600 dark:text-stone-400">
                Key Insights
              </span>
            </h2>
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-md border-r-4 border-yellow-500">
                <h3 className="text-xl font-bold mb-2 text-right">العقيدة تحكم كل العلوم</h3>
                <p className="text-stone-700 dark:text-stone-300 text-right">
                  Aqeedah governs all other sciences. It is the lens through which we understand everything.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border-r-4 border-emerald-500">
                <h3 className="text-xl font-bold mb-2 text-right">العربية تفتح الوحي</h3>
                <p className="text-stone-700 dark:text-stone-300 text-right">
                  Arabic unlocks the Quran and Hadith. Without it, we depend on translations.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border-r-4 border-blue-500">
                <h3 className="text-xl font-bold mb-2 text-right">السيرة تُسَيِّق النصوص</h3>
                <p className="text-stone-700 dark:text-stone-300 text-right">
                  Seerah contextualizes texts. We understand revelation through the Prophet's life.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border-r-4 border-amber-500">
                <h3 className="text-xl font-bold mb-2 text-right">أصول الفقه يُنظِّم الفقه</h3>
                <p className="text-stone-700 dark:text-stone-300 text-right">
                  Usul al-Fiqh structures Fiqh. It provides the methodology for deriving rulings.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border-r-4 border-purple-500">
                <h3 className="text-xl font-bold mb-2 text-right">التزكية تحمي العلم</h3>
                <p className="text-stone-700 dark:text-stone-300 text-right">
                  Tazkiyah protects knowledge from corrupting the soul. Pure hearts seek knowledge for Allah.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              استكشف خريطة المنهج
            </h2>
            <p className="text-xl mb-8 opacity-90">
              See how all sciences interconnect and discover your learning pathway
            </p>
            <Link
              to="/manhaj/curriculum-map"
              className="inline-block bg-card text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-muted transition-colors shadow-lg"
            >
              عرض خريطة المنهج →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
