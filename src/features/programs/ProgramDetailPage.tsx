import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Award, Target, Book, FileText } from 'lucide-react';
import { licenceProgram, masterPrograms, doctorateProgram } from '@/data/academicStructure';

export default function ProgramDetailPage() {
  const { programId } = useParams();
  
  // Find the program
  let program = null;
  let programType = '';
  
  if (programId === licenceProgram.id) {
    program = licenceProgram;
    programType = 'licence';
  } else if (programId === doctorateProgram.id) {
    program = doctorateProgram;
    programType = 'doctorate';
  } else {
    const masterProgram = masterPrograms.find(p => p.id === programId);
    if (masterProgram) {
      program = masterProgram;
      programType = 'master';
    }
  }
  
  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  const gradientColors = {
    licence: 'from-emerald-600 to-teal-600',
    master: 'from-teal-600 to-cyan-600',
    doctorate: 'from-cyan-600 to-blue-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${gradientColors[programType as keyof typeof gradientColors]} text-white py-16`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>العودة إلى البرامج</span>
          </Link>
          
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-medium mb-4">
              {programType === 'licence' && 'الطور الأول - ليسانس'}
              {programType === 'master' && 'الطور الثاني - ماستر'}
              {programType === 'doctorate' && 'الطور الثالث - دكتوراه'}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {program.nameAr}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      {/* Program Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">المدة</h3>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {program.durationAr || `${program.duration} سنوات`}
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">الرصيد</h3>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {program.credits || 'متغير'} {program.credits && 'رصيد'}
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">السداسيات</h3>
                <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {program.semesters?.length || 'متعدد'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      {program.semesters && program.semesters.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  هيكل البرنامج
                </h2>
                <p className="text-lg text-muted-foreground">
                  السداسيات والمقاييس المقررة في هذا البرنامج
                </p>
              </div>

              <div className="space-y-6">
                {program.semesters.map((semester: any, index: number) => (
                  <div key={semester.id} className="bg-card border-2 border-border rounded-2xl p-6 hover:border-emerald-500 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{semester.name}</h3>
                        <p className="text-muted-foreground">{semester.subjects.length} مقياس</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {semester.subjects.map((subject: any) => (
                        <div key={subject.code} className="flex items-start gap-3 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Book className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-foreground mb-1">{subject.nameAr}</h4>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                              <span className="px-2 py-1 bg-background rounded">
                                {subject.type}
                              </span>
                              <span className="px-2 py-1 bg-background rounded">
                                {subject.credits} رصيد
                              </span>
                              <span className="px-2 py-1 bg-background rounded">
                                معامل {subject.coefficient}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Program Objectives */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">أهداف البرنامج</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {programType === 'licence' && (
                  <>
                    <p>• تأسيس الطالب في العلوم الإسلامية الأساسية من قرآن وحديث وفقه وعقيدة</p>
                    <p>• إكساب الطالب المهارات اللغوية والمنهجية اللازمة للبحث العلمي</p>
                    <p>• تمكين الطالب من فهم النصوص الشرعية وتطبيقها في الواقع المعاصر</p>
                    <p>• إعداد الطالب لمتابعة الدراسات العليا في التخصصات الإسلامية</p>
                  </>
                )}
                {programType === 'master' && (
                  <>
                    <p>• التعمق في التخصص العلمي المختار وإتقان مناهجه وأدواته</p>
                    <p>• تطوير القدرات البحثية والتحليلية في المجال التخصصي</p>
                    <p>• إعداد بحوث علمية أصيلة تساهم في إثراء المكتبة الإسلامية</p>
                    <p>• تأهيل الطالب للعمل الأكاديمي والبحثي المتقدم</p>
                  </>
                )}
                {programType === 'doctorate' && (
                  <>
                    <p>• إعداد باحثين متخصصين قادرين على الإضافة العلمية الأصيلة</p>
                    <p>• تطوير المهارات البحثية المتقدمة والتفكير النقدي</p>
                    <p>• المساهمة في حل المشكلات المعاصرة من منظور إسلامي</p>
                    <p>• تأهيل أساتذة جامعيين وباحثين في العلوم الإسلامية</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">شروط القبول</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {programType === 'licence' && (
                  <>
                    <p>• شهادة البكالوريا أو ما يعادلها</p>
                    <p>• النجاح في المسابقة الوطنية للقبول الجامعي</p>
                    <p>• استيفاء الشروط المحددة من قبل وزارة التعليم العالي</p>
                  </>
                )}
                {programType === 'master' && (
                  <>
                    <p>• شهادة ليسانس في العلوم الإسلامية أو تخصص ذي صلة</p>
                    <p>• معدل جيد في الليسانس (حسب المعايير المحددة)</p>
                    <p>• النجاح في مسابقة الدخول للماستر</p>
                    <p>• مقابلة شخصية مع لجنة القبول (عند الاقتضاء)</p>
                  </>
                )}
                {programType === 'doctorate' && (
                  <>
                    <p>• شهادة ماستر في التخصص أو تخصص قريب</p>
                    <p>• معدل جيد جداً في الماستر</p>
                    <p>• تقديم مشروع بحث أولي</p>
                    <p>• موافقة أستاذ مشرف على الإشراف على البحث</p>
                    <p>• النجاح في المقابلة مع لجنة القبول</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 bg-gradient-to-br ${gradientColors[programType as keyof typeof gradientColors]} text-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              مهتم بهذا البرنامج؟
            </h2>
            <p className="text-lg text-white/90">
              استكشف المزيد من التفاصيل أو تواصل معنا للحصول على معلومات إضافية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/curriculum">
                <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
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
