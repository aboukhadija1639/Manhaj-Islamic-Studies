import { Link } from 'react-router-dom';
import { GraduationCap, Book, Award, BookOpen, Users, Library, ArrowRight } from 'lucide-react';
import { licenceProgram, masterPrograms, doctorateProgram, platformStats } from '@/data/academicStructure';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-medium">
              نظام LMD المعتمد
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              البرامج الأكاديمية
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              برامج أكاديمية متكاملة في العلوم الإسلامية وفق نظام LMD (ليسانس - ماستر - دكتوراه)
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="py-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold">{platformStats.totalSubjects}+</div>
              <div className="text-sm opacity-90">مقياس دراسي</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold">{platformStats.totalStudents}+</div>
              <div className="text-sm opacity-90">طالب</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Library className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold">{platformStats.totalLessons}+</div>
              <div className="text-sm opacity-90">درس</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold">{platformStats.totalSpecializations}</div>
              <div className="text-sm opacity-90">تخصص</div>
            </div>
          </div>
        </div>
      </section>

      {/* Licence Program */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border-2 border-border hover:border-emerald-500 rounded-3xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold">
                      الطور الأول
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {licenceProgram.nameAr}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {licenceProgram.description}
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">سنوات</div>
                        <div className="text-sm text-muted-foreground">6 سداسيات</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">180</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">رصيد</div>
                        <div className="text-sm text-muted-foreground">Crédit</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">جذع مشترك</div>
                        <div className="text-sm text-muted-foreground">علوم إسلامية</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/programs/${licenceProgram.id}`}>
                    <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      استكشف برنامج الليسانس
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Programs */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-semibold mb-4">
                الطور الثاني
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                برامج الماستر
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                خمسة تخصصات علمية دقيقة في العلوم الإسلامية، مدة الدراسة سنتان (4 سداسيات) - 120 رصيد
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {masterPrograms.map((program, index) => {
                const gradients = [
                  { bg: 'from-emerald-500 to-teal-600', border: 'hover:border-emerald-500' },
                  { bg: 'from-teal-500 to-cyan-600', border: 'hover:border-teal-500' },
                  { bg: 'from-cyan-500 to-blue-600', border: 'hover:border-cyan-500' },
                  { bg: 'from-blue-500 to-indigo-600', border: 'hover:border-blue-500' },
                  { bg: 'from-indigo-500 to-purple-600', border: 'hover:border-indigo-500' }
                ];
                const gradient = gradients[index];

                return (
                  <div
                    key={program.id}
                    className={`group bg-card border-2 border-border ${gradient.border} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${gradient.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Book className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {program.nameAr}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {program.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                        {program.durationAr}
                      </span>
                      <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                        120 رصيد
                      </span>
                      <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                        مذكرة ماستر
                      </span>
                    </div>
                    
                    <Link to={`/programs/${program.id}`}>
                      <button className="w-full px-4 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        عرض التفاصيل
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Link to="/programs/master">
                <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                  عرض جميع تخصصات الماستر
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Doctorate Program */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border-2 border-border hover:border-cyan-500 rounded-3xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold">
                      الطور الثالث
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {doctorateProgram.nameAr}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {doctorateProgram.description}
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">3-5</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">سنوات</div>
                        <div className="text-sm text-muted-foreground">مدة البحث</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">تكوين بحثي</div>
                        <div className="text-sm text-muted-foreground">متقدم</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">أطروحة</div>
                        <div className="text-sm text-muted-foreground">دكتوراه</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/programs/${doctorateProgram.id}`}>
                    <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      استكشف برنامج الدكتوراه
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              هل أنت مستعد لبدء رحلتك الأكاديمية؟
            </h2>
            <p className="text-lg text-white/90">
              اختر البرنامج المناسب لك واستكشف المقاييس والمحتوى التعليمي المتاح
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/curriculum">
                <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  عرض خريطة المنهج
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300">
                  تعرف على المنصة
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
