import { useParams, Link, useNavigate } from 'react-router-dom';
import { Book, ArrowRight, Target, BookOpen, GraduationCap, FileText, Video, Download, Clock, Award, BookMarked } from 'lucide-react';
import { licenceProgram, masterPrograms, type Subject } from '../../data/academicStructure';

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  // Find the subject across all programs
  const findSubject = (): { subject: Subject | null; programName: string; semesterName: string; programId: string } => {
    // Search in Licence program
    if (licenceProgram.years) {
      for (const year of licenceProgram.years) {
        for (const semester of year.semesters) {
          const subject = semester.subjects.find((s: any) => s.id === subjectId);
          if (subject) {
            return {
              subject: {
                ...subject,
                code: subject.id.toUpperCase().replace(/-/g, '/'),
                programId: licenceProgram.id,
                semesterId: semester.id
              },
              programName: licenceProgram.nameAr,
              semesterName: semester.nameAr,
              programId: licenceProgram.id
            };
          }
        }
      }
    }

    // Search in Master programs
    for (const program of masterPrograms) {
      if (program.semesters) {
        for (const semester of program.semesters) {
          const subject = semester.subjects.find((s: any) => s.id === subjectId);
          if (subject) {
            return {
              subject: {
                ...subject,
                code: subject.id.toUpperCase().replace(/-/g, '/'),
                programId: program.id,
                semesterId: semester.id
              },
              programName: program.nameAr,
              semesterName: semester.nameAr,
              programId: program.id
            };
          }
        }
      }
    }

    return { subject: null, programName: '', semesterName: '', programId: '' };
  };

  const { subject, programName, semesterName, programId } = findSubject();

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">المقياس غير موجود</h1>
          <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على المقياس المطلوب</p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            العودة إلى البرامج
          </Link>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'أساسي': return 'from-emerald-500 to-teal-600';
      case 'منهجي': return 'from-blue-500 to-cyan-600';
      case 'استكشافي': return 'from-purple-500 to-pink-600';
      case 'اختياري': return 'from-amber-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case 'أساسي': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      case 'منهجي': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'استكشافي': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'اختياري': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${getTypeColor(subject.type)} text-white py-16 px-4 overflow-hidden`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-6">
            <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link to="/programs" className="hover:text-white transition-colors">البرامج</Link>
            <span>/</span>
            <Link to={`/programs/${programId}`} className="hover:text-white transition-colors">{programName}</Link>
            <span>/</span>
            <span className="text-white">{subject.nameAr}</span>
          </div>

          {/* Subject Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className={`w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <Book className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-4 py-1 ${getTypeBgColor(subject.type)} rounded-full text-sm font-medium`}>
                  {subject.type}
                </span>
                <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                  {subject.code}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{subject.nameAr}</h1>
              <p className="text-xl text-white/90 mb-4">{subject.name}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{subject.credit} رصيد (Crédit)</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5" />
                  <span>المعامل: {subject.coefficient}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>{semesterName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description/Summary */}
            {(subject.description || subject.descriptionAr || subject.summary || subject.summaryAr) && (
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(subject.type)} rounded-xl flex items-center justify-center`}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">ملخص المقياس</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {subject.summaryAr || subject.descriptionAr || subject.summary || subject.description}
                  </p>
                </div>
              </div>
            )}

            {/* Objectives */}
            {(subject.objectives || subject.objectivesAr) && (subject.objectives?.length || subject.objectivesAr?.length) ? (
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(subject.type)} rounded-xl flex items-center justify-center`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">أهداف المقياس</h2>
                </div>
                <ul className="space-y-3">
                  {(subject.objectivesAr || subject.objectives)?.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${getTypeColor(subject.type)} mt-2 flex-shrink-0`}></div>
                      <span className="leading-relaxed">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* References */}
            {(subject.references || subject.referencesAr) && (subject.references?.length || subject.referencesAr?.length) ? (
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(subject.type)} rounded-xl flex items-center justify-center`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">المراجع المعتمدة</h2>
                </div>
                <ul className="space-y-3">
                  {(subject.referencesAr || subject.references)?.map((reference, index) => (
                    <li key={index} className="flex items-start gap-3 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                      <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-foreground leading-relaxed">{reference}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Lectures Section */}
            {subject.lectures && subject.lectures.length > 0 && (
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(subject.type)} rounded-xl flex items-center justify-center`}>
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">المحاضرات</h2>
                </div>
                <div className="space-y-4">
                  {subject.lectures.map((lecture) => (
                    <div key={lecture.id} className="p-6 bg-muted rounded-xl hover:bg-muted/80 transition-colors border-2 border-transparent hover:border-emerald-500">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2">{lecture.titleAr || lecture.title}</h3>
                          {(lecture.descriptionAr || lecture.description) && (
                            <p className="text-muted-foreground text-sm">{lecture.descriptionAr || lecture.description}</p>
                          )}
                        </div>
                        {lecture.duration && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{lecture.duration}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3">
                        {lecture.videoUrl && (
                          <a
                            href={lecture.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                          >
                            <Video className="w-4 h-4" />
                            مشاهدة الفيديو
                          </a>
                        )}
                        {lecture.fileUrl && (
                          <a
                            href={lecture.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Download className="w-4 h-4" />
                            تحميل الملف
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-4">معلومات سريعة</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">البرنامج</div>
                  <div className="font-medium text-foreground">{programName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">السداسي</div>
                  <div className="font-medium text-foreground">{semesterName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">نوع المقياس</div>
                  <span className={`inline-block px-3 py-1 ${getTypeBgColor(subject.type)} rounded-full text-sm font-medium`}>
                    {subject.type}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">الرصيد</div>
                  <div className="font-bold text-foreground text-xl">{subject.credit} Crédit</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">المعامل</div>
                  <div className="font-bold text-foreground text-xl">{subject.coefficient}</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <Link
                  to={`/programs/${programId}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  عرض البرنامج الكامل
                </Link>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  العودة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
