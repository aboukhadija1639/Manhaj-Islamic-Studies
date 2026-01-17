import { Link } from 'react-router-dom';
import { ArrowLeft, Book, ArrowRight, BookOpen, Calendar, Award } from 'lucide-react';
import { masterPrograms } from '@/data/academicStructure';

export default function MasterProgramsPage() {
  const gradients = [
    { bg: 'from-emerald-500 to-teal-600', border: 'border-emerald-500', light: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
    { bg: 'from-teal-500 to-cyan-600', border: 'border-teal-500', light: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400' },
    { bg: 'from-cyan-500 to-blue-600', border: 'border-cyan-500', light: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400' },
    { bg: 'from-blue-500 to-indigo-600', border: 'border-blue-500', light: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
    { bg: 'from-indigo-500 to-purple-600', border: 'border-indigo-500', light: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>العودة إلى البرامج</span>
          </Link>
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-medium">
              الطور الثاني - نظام LMD
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              برامج الماستر
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              خمسة تخصصات علمية دقيقة في العلوم الإسلامية، تمنح درجة الماستر بعد سنتين من الدراسة والبحث
            </p>
          </div>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">المدة</h3>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  سنتان
                </p>
                <p className="text-sm text-muted-foreground mt-1">4 سداسيات</p>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">الرصيد</h3>
                <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  120 رصيد
                </p>
                <p className="text-sm text-muted-foreground mt-1">Crédit</p>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">التخصصات</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  5 تخصصات
                </p>
                <p className="text-sm text-muted-foreground mt-1">علمية دقيقة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                التخصصات المتاحة
              </h2>
              <p className="text-lg text-muted-foreground">
                اختر التخصص الذي يناسب اهتماماتك وأهدافك الأكاديمية
              </p>
            </div>

            <div className="space-y-6">
              {masterPrograms.map((program, index) => {
                const gradient = gradients[index];
                
                return (
                  <div
                    key={program.id}
                    className={`group bg-card border-2 ${gradient.border} rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl`}
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 bg-gradient-to-br ${gradient.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Book className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="mb-4">
                          <span className={`inline-block px-3 py-1 ${gradient.light} ${gradient.text} rounded-full text-sm font-semibold`}>
                            تخصص ماستر
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                          {program.nameAr}
                        </h3>
                        
                        <p className="text-lg text-muted-foreground mb-6">
                          {program.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${gradient.light} rounded-lg flex items-center justify-center`}>
                              <Calendar className={`w-5 h-5 ${gradient.text}`} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">المدة</div>
                              <div className="font-bold text-foreground">{program.durationAr}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${gradient.light} rounded-lg flex items-center justify-center`}>
                              <Award className={`w-5 h-5 ${gradient.text}`} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">الرصيد</div>
                              <div className="font-bold text-foreground">120 رصيد</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${gradient.light} rounded-lg flex items-center justify-center`}>
                              <BookOpen className={`w-5 h-5 ${gradient.text}`} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">السداسيات</div>
                              <div className="font-bold text-foreground">4 سداسيات</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${gradient.light} rounded-lg flex items-center justify-center`}>
                              <Book className={`w-5 h-5 ${gradient.text}`} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">المقاييس</div>
                              <div className="font-bold text-foreground">
                                {program.semesters?.reduce((acc: number, sem: any) => acc + sem.subjects.length, 0) || 0} مقياس
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Link to={`/programs/${program.id}`}>
                          <button className={`px-8 py-4 bg-gradient-to-r ${gradient.bg} text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2`}>
                            استكشف التخصص
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border-2 border-border rounded-3xl p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                شروط القبول في الماستر
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">1</span>
                  </div>
                  <p>شهادة ليسانس في العلوم الإسلامية أو تخصص ذي صلة بمعدل جيد</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">2</span>
                  </div>
                  <p>النجاح في مسابقة الدخول للماستر (امتحان كتابي ومقابلة شفوية)</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">3</span>
                  </div>
                  <p>تقديم ملف القبول كاملاً في المواعيد المحددة</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">4</span>
                  </div>
                  <p>استيفاء الشروط الخاصة بكل تخصص (إن وجدت)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              جاهز لبدء رحلة الماستر؟
            </h2>
            <p className="text-lg text-white/90">
              اختر التخصص الذي يناسبك واستكشف المقاييس والمحتوى التعليمي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/curriculum">
                <button className="px-8 py-4 bg-white text-teal-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  عرض خريطة المنهج
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300">
                  تواصل معنا
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
