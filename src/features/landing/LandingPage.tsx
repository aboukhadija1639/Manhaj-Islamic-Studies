import { Book, GraduationCap, BookOpen, Heart, Search, Target, Smartphone, Users, Award, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import { masterPrograms, platformStats } from '@/data/academicStructure';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-sm font-medium">منصة تعليمية متكاملة - نظام LMD</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
                منصة منهاج للعلوم الشرعية
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              منصة تعليمية متكاملة ومتخصصة في العلوم الإسلامية لطلبة جامعة حمه لخضر بالوادي
              <br />
              <span className="font-semibold">نظام LMD: ليسانس - ماستر - دكتوراه</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/programs">
                <button className="group px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  تصفح البرامج الأكاديمية
                  <span className="group-hover:translate-x-1 transition-transform">←</span>
                </button>
              </Link>
              <Link to="/about">
                <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                  تعرف على المنصة
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <BookOpen className="w-10 h-10" />
              </div>
              <div className="text-3xl md:text-4xl font-bold">{platformStats.totalSubjects}+</div>
              <div className="text-sm md:text-base opacity-90">مادة دراسية (مقياس)</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="w-10 h-10" />
              </div>
              <div className="text-3xl md:text-4xl font-bold">{platformStats.totalStudents}+</div>
              <div className="text-sm md:text-base opacity-90">طالب مسجل</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Library className="w-10 h-10" />
              </div>
              <div className="text-3xl md:text-4xl font-bold">{platformStats.totalLessons}+</div>
              <div className="text-sm md:text-base opacity-90">درس متاح</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Award className="w-10 h-10" />
              </div>
              <div className="text-3xl md:text-4xl font-bold">{platformStats.totalSpecializations}</div>
              <div className="text-sm md:text-base opacity-90">تخصص علمي (ماستر)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Levels Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4">
              نظام LMD
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              الأطوار التعليمية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نظام تعليمي متكامل وفق المعايير الوطنية للتعليم العالي
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Licence */}
            <div className="group relative bg-card border-2 border-border hover:border-emerald-500 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-bl-full blur-2xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-emerald-600 transition-colors">
                  الطور الأول: ليسانس
                </h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>3 سنوات / 6 سداسيات</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>جذع مشترك في العلوم الإسلامية</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>180 رصيد (Crédit)</span>
                  </div>
                </div>
                <Link to="/programs/licence">
                  <button className="w-full px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-center gap-2">
                    استكشف البرنامج
                    <span>←</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Master */}
            <div className="group relative bg-card border-2 border-border hover:border-teal-500 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-bl-full blur-2xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-teal-600 transition-colors">
                  الطور الثاني: ماستر
                </h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>سنتان / 4 سداسيات</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>5 تخصصات علمية</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>120 رصيد (Crédit)</span>
                  </div>
                </div>
                <Link to="/programs/master">
                  <button className="w-full px-6 py-3 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-xl font-semibold hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors flex items-center justify-center gap-2">
                    استكشف التخصصات
                    <span>←</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Doctorate */}
            <div className="group relative bg-card border-2 border-border hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-bl-full blur-2xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-cyan-600 transition-colors">
                  الطور الثالث: دكتوراه
                </h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span>3-5 سنوات</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span>تكوين بحثي متقدم</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span>أطروحة دكتوراه</span>
                  </div>
                </div>
                <Link to="/programs/doctorate">
                  <button className="w-full px-6 py-3 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-xl font-semibold hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors flex items-center justify-center gap-2">
                    استكشف البرنامج
                    <span>←</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Specializations Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-semibold mb-4">
              تخصصات الماستر
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              التخصصات العلمية المعتمدة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              خمسة تخصصات علمية دقيقة في العلوم الإسلامية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {masterPrograms.map((program, index) => {
              const gradients = [
                'from-emerald-500 to-teal-600',
                'from-teal-500 to-cyan-600',
                'from-cyan-500 to-blue-600',
                'from-blue-500 to-indigo-600',
                'from-indigo-500 to-purple-600'
              ];
              const bgGradients = [
                'from-emerald-500/20 to-teal-500/20',
                'from-teal-500/20 to-cyan-500/20',
                'from-cyan-500/20 to-blue-500/20',
                'from-blue-500/20 to-indigo-500/20',
                'from-indigo-500/20 to-purple-500/20'
              ];
              const hoverColors = [
                'hover:border-emerald-500',
                'hover:border-teal-500',
                'hover:border-cyan-500',
                'hover:border-blue-500',
                'hover:border-indigo-500'
              ];

              return (
                <div
                  key={program.id}
                  className={`group relative bg-card border-2 border-border ${hoverColors[index]} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradients[index]} rounded-bl-full blur-2xl`}></div>
                  <div className="relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {program.nameAr}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {program.description}
                    </p>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${gradients[index]} rounded-full`}></div>
                        <span>{program.durationAr}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${gradients[index]} rounded-full`}></div>
                        <span>120 رصيد</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${gradients[index]} rounded-full`}></div>
                        <span>مذكرة ماستر</span>
                      </div>
                    </div>
                    <Link to={`/programs/${program.id}`}>
                      <button className="w-full px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm">
                        عرض المقاييس
                        <span>←</span>
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/programs/master">
              <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                عرض جميع التخصصات
                <span>←</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4">
              المميزات
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              لماذا منصة منهاج؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              منصة متكاملة توفر كل ما يحتاجه الطالب في رحلته التعليمية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="group bg-card border-2 border-border hover:border-emerald-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">محتوى منظم</h3>
              <p className="text-muted-foreground text-sm">
                مقاييس مرتبة حسب الأطوار والسداسيات مع الرصيد والمعامل
              </p>
            </div>

            <div className="group bg-card border-2 border-border hover:border-teal-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">سهولة البحث</h3>
              <p className="text-muted-foreground text-sm">
                راحة للعين مع الوصول السريع لكل مقياس حسب التخصص
              </p>
            </div>

            <div className="group bg-card border-2 border-border hover:border-cyan-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">تجربة حديثة</h3>
              <p className="text-muted-foreground text-sm">
                واجهة عصرية متجاوبة مع جميع الأجهزة بتصميم احترافي
              </p>
            </div>

            <div className="group bg-card border-2 border-border hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">أهداف واضحة</h3>
              <p className="text-muted-foreground text-sm">
                كل مقياس له أهداف محددة ومراجع معتمدة ومحاضرات منظمة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              ابدأ رحلتك التعليمية الآن
            </h2>
            <p className="text-lg md:text-xl text-white/90">
              انضم إلى مئات الطلاب في جامعة حمه لخضر واستفد من محتوى تعليمي منظم ومتكامل
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  استكشف البرامج الأكاديمية
                </button>
              </Link>
              <Link to="/curriculum">
                <button className="px-8 py-4 bg-emerald-600 text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all duration-300">
                  عرض خريطة المنهج
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
