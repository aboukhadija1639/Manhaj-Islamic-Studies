import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, GraduationCap, Calendar, Award, ChevronRight, Filter, Grid3x3, List } from 'lucide-react';
import { licenceProgram, masterPrograms, type Program, type Semester } from '../../data/academicStructure';

type ViewMode = 'grid' | 'timeline';

export default function EnhancedCurriculumMap() {
  const [selectedProgram, setSelectedProgram] = useState<string>('licence-islamic-studies');
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  // Get all programs
  const allPrograms: Program[] = [licenceProgram, ...masterPrograms];

  // Get selected program
  const currentProgram = allPrograms.find(p => p.id === selectedProgram) || licenceProgram;

  // Get all semesters from the selected program
  const getAllSemesters = (program: Program): Semester[] => {
    if (program.semesters) {
      return program.semesters;
    }
    if (program.years) {
      return program.years.flatMap(year => year.semesters);
    }
    return [];
  };

  const semesters = getAllSemesters(currentProgram);

  // Calculate statistics
  const totalSubjects = semesters.reduce((sum, sem) => sum + sem.subjects.length, 0);
  const totalCredits = semesters.reduce((sum, sem) => 
    sum + sem.subjects.reduce((s, sub) => s + sub.credit, 0), 0
  );

  // Get subject type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'أساسي': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300';
      case 'منهجي': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300';
      case 'استكشافي': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300';
      case 'اختياري': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-300';
    }
  };

  // Get program gradient
  const getProgramGradient = (degree: string) => {
    switch (degree) {
      case 'ليسانس': return 'from-emerald-600 via-teal-600 to-cyan-600';
      case 'ماستر': return 'from-blue-600 via-indigo-600 to-purple-600';
      case 'دكتوراه': return 'from-purple-600 via-pink-600 to-rose-600';
      default: return 'from-emerald-600 via-teal-600 to-cyan-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${getProgramGradient(currentProgram.degree)} text-white py-16 px-4 overflow-hidden`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">خريطة المنهج التفاعلية</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              خريطة المنهج الدراسي
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              استكشف البرامج الأكاديمية والمقاييس بطريقة تفاعلية ومرئية
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">{semesters.length}</div>
              <div className="text-sm text-white/80">سداسي</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">{totalSubjects}</div>
              <div className="text-sm text-white/80">مقياس</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">{totalCredits}</div>
              <div className="text-sm text-white/80">رصيد</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">{currentProgram.degree}</div>
              <div className="text-sm text-white/80">الطور</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b-2 border-border shadow-md">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Program Selector */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                البرنامج:
              </span>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="px-4 py-2 bg-card border-2 border-border rounded-xl font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <optgroup label="ليسانس">
                  <option value="licence-islamic-studies">ليسانس العلوم الإسلامية</option>
                </optgroup>
                <optgroup label="ماستر">
                  {masterPrograms.map(program => (
                    <option key={program.id} value={program.id}>{program.nameAr}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">Timeline</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="text-sm font-medium">Grid</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Program Info Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${getProgramGradient(currentProgram.degree)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">{currentProgram.nameAr}</h2>
              <p className="text-muted-foreground mb-3">{currentProgram.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{currentProgram.durationAr}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>{totalCredits} رصيد إجمالي</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-emerald-600" />
                  <span>{totalSubjects} مقياس</span>
                </div>
              </div>
            </div>
            <Link
              to={`/programs/${currentProgram.id}`}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <span>عرض التفاصيل</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="space-y-8">
            {semesters.map((semester, index) => (
              <div key={semester.id} className="relative">
                {/* Semester Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getProgramGradient(currentProgram.degree)} rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg`}>
                    {semester.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground">{semester.nameAr}</h3>
                    <p className="text-muted-foreground">{semester.subjects.length} مقياس • {semester.subjects.reduce((sum, s) => sum + s.credit, 0)} رصيد</p>
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pr-20">
                  {semester.subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/subjects/${subject.id}`}
                      className="group bg-card border-2 border-border rounded-xl p-4 hover:border-emerald-500 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(subject.type)}`}>
                          <Book className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-foreground mb-1 group-hover:text-emerald-600 transition-colors">
                            {subject.nameAr}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {subject.description || subject.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-1 rounded-full border ${getTypeColor(subject.type)}`}>
                          {subject.type}
                        </span>
                        <div className="flex gap-3 text-muted-foreground">
                          <span>{subject.credit} رصيد</span>
                          <span>معامل {subject.coefficient}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Connecting Line */}
                {index < semesters.length - 1 && (
                  <div className="absolute right-7 top-20 w-0.5 h-full bg-gradient-to-b from-emerald-500 to-teal-500 opacity-30"></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {semesters.map((semester) => (
              <div key={semester.id} className="bg-card border-2 border-border rounded-2xl p-6 hover:border-emerald-500 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getProgramGradient(currentProgram.degree)} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                    {semester.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{semester.nameAr}</h3>
                    <p className="text-sm text-muted-foreground">{semester.subjects.length} مقياس</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {semester.subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/subjects/${subject.id}`}
                      className="block p-3 bg-muted rounded-lg hover:bg-muted/80 hover:border-emerald-500 border-2 border-transparent transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-foreground group-hover:text-emerald-600 transition-colors">
                          {subject.nameAr}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`px-2 py-0.5 rounded-full ${getTypeColor(subject.type)}`}>
                          {subject.type}
                        </span>
                        <span>{subject.credit} رصيد</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="container mx-auto max-w-7xl px-4 pb-12">
        <div className="bg-card border-2 border-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">أنواع المقاييس</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${getTypeColor('أساسي')} flex items-center justify-center`}>
                <Book className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm">أساسي</div>
                <div className="text-xs text-muted-foreground">Core</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${getTypeColor('منهجي')} flex items-center justify-center`}>
                <Book className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm">منهجي</div>
                <div className="text-xs text-muted-foreground">Methodological</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${getTypeColor('استكشافي')} flex items-center justify-center`}>
                <Book className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm">استكشافي</div>
                <div className="text-xs text-muted-foreground">Exploratory</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${getTypeColor('اختياري')} flex items-center justify-center`}>
                <Book className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm">اختياري</div>
                <div className="text-xs text-muted-foreground">Elective</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
