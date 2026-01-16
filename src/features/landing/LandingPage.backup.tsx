import { Link } from 'react-router-dom';
import { Container, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../shared/ui';

function LandingPage() {
  const featuredSubjects = [
    {
      id: 'tafsir',
      title: 'التفسير وعلوم القرآن',
      description: 'دراسة معاني القرآن الكريم وأساليب تفسيره وعلومه المتنوعة',
      icon: '📖',
      level: 'السنة الأولى',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'hadith',
      title: 'الحديث وعلومه',
      description: 'دراسة السنة النبوية الشريفة وعلوم الحديث ومصطلحاته',
      icon: '📚',
      level: 'السنة الأولى',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      id: 'fiqh',
      title: 'الفقه وأصوله',
      description: 'دراسة الأحكام الشرعية العملية وقواعد الاستنباط',
      icon: '⚖️',
      level: 'السنة الأولى',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'aqidah',
      title: 'العقيدة الإسلامية',
      description: 'دراسة أصول الإيمان والتوحيد والعقيدة الصحيحة',
      icon: '🕌',
      level: 'السنة الأولى',
      gradient: 'from-blue-500 to-indigo-600',
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'محتوى منظم',
      description: 'محتوى علمي مرتب ومنظم حسب المنهج الدراسي المعتمد بجامعة الوادي',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'سهولة البحث',
      description: 'نظام بحث قوي ومتطور للوصول السريع إلى المعلومات المطلوبة',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'تجربة حديثة',
      description: 'واجهة عصرية وسهلة الاستخدام على جميع الأجهزة مع دعم الوضع الليلي',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  const stats = [
    { label: 'مادة دراسية', value: '50+', icon: '📚' },
    { label: 'طالب مسجل', value: '1000+', icon: '👨‍🎓' },
    { label: 'درس متاح', value: '200+', icon: '📖' },
    { label: 'تخصص علمي', value: '5', icon: '🎓' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section - Enhanced with Modern Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 py-20 md:py-32">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <Container>
          <div className="relative max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 mb-6 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                منصة تعليمية متكاملة
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                منصة منهاج
              </span>
              <br />
              <span className="text-foreground">للعلوم الشرعية</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              منصة تعليمية متكاملة لطلاب العلوم الإسلامية بجامعة حمه لخضر بالوادي، توفر محتوى علمي منظم وسهل الوصول
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300" asChild>
                <Link to="/subjects">
                  <span className="relative z-10 flex items-center gap-2">
                    تصفح المواد الدراسية
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l-5 5 5 5" />
                    </svg>
                  </span>
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-800 hover:bg-white dark:hover:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-lg transition-all duration-300" asChild>
                <Link to="/about">
                  تعرف على المنصة
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section - New */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-emerald-50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Subjects - Enhanced */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                المواد الدراسية
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              المواد الدراسية المميزة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استكشف المواد الدراسية للسنة الأولى 2025/2026 في كلية العلوم الإسلامية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSubjects.map((subject) => (
              <Card 
                key={subject.id} 
                hover 
                className="group cursor-pointer border-2 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${subject.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    <div className={`relative text-5xl p-4 bg-gradient-to-br ${subject.gradient} rounded-2xl inline-flex shadow-lg`}>
                      {subject.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {subject.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {subject.level}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="ghost" size="lg" className="group hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400" asChild>
              <Link to="/subjects">
                <span className="flex items-center gap-2">
                  عرض جميع المواد
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l-5 5 5 5" />
                  </svg>
                </span>
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                المميزات
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              لماذا منهاج؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نوفر لك أفضل تجربة تعليمية بمميزات حديثة ومتطورة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-2xl bg-card border-2 border-border hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section - New */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <Container>
          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              ابدأ رحلتك التعليمية الآن
            </h2>
            <p className="text-lg md:text-xl text-emerald-50 mb-8 leading-relaxed">
              انضم إلى آلاف الطلاب الذين يستفيدون من منصة منهاج في دراستهم للعلوم الشرعية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" asChild>
                <Link to="/academics">
                  استكشف البرامج الأكاديمية
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-emerald-700 text-white hover:bg-emerald-800 border-2 border-white/20 shadow-xl transition-all duration-300" asChild>
                <Link to="/manhaj">
                  عرض خريطة المنهج
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default LandingPage;
