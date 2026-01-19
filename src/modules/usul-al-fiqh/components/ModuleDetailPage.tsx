/**
 * صفحة تفاصيل المقياس - أصول الفقه
 * Module Detail Page - Principles of Jurisprudence (Usul al-Fiqh)
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shared/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Progress } from '../../../shared/ui/progress';
import Button from '../../../shared/ui/Button';
import {
  BookOpen,
  Target,
  FileText,
  Download,
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  Circle,
  ExternalLink,
} from 'lucide-react';
import type {
  UsulModuleUnit,
  UsulModuleLesson,
  UsulModuleResource,
} from '../../../data/academics/modules/usul-al-fiqh.data';
import {
  usulModuleOverview,
  usulModuleUnits,
  usulModuleResources,
} from '../../../data/academics/modules/usul-al-fiqh.data';

interface ModuleDetailPageProps {
  moduleId: string;
  onNavigateToLesson?: (lessonId: string) => void;
}

export function ModuleDetailPage({
  moduleId: _moduleId,
  onNavigateToLesson,
}: ModuleDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  const units = usulModuleUnits;
  const resources = usulModuleResources;
  
  const totalLessons = units.reduce((acc, unit) => acc + unit.lessons.length, 0);
  const totalMinutes = units.reduce((acc, unit) => acc + unit.estimatedDuration, 0);
  const totalHours = Math.round(totalMinutes / 60);
  
  const completionPercentage = totalLessons > 0 
    ? Math.round((completedLessons.size / totalLessons) * 100)
    : 0;

  const handleLessonClick = (lessonId: string) => {
    if (onNavigateToLesson) {
      onNavigateToLesson(lessonId);
    }
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-l from-indigo-700 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <Badge className="mb-2 bg-white/20 text-white hover:bg-white/30 border-none">
                UEF-114
              </Badge>
              <h1 className="text-3xl font-bold mb-2">أصول الفقه (1)</h1>
              <p className="text-white/80 text-lg">
                Principles of Jurisprudence
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>5 أرصدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{totalHours} ساعة مقدرة</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{totalLessons} درس</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[240px] w-full md:w-auto">
              <div className="text-sm mb-2">التقدم في المقياس</div>
              <div className="text-3xl font-bold mb-2">
                {completionPercentage}%
              </div>
              <Progress value={completionPercentage} className="h-2 bg-white/20" />
              <div className="text-xs mt-2 opacity-90">
                {completedLessons.size} من {totalLessons} درس مكتمل
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto gap-2 bg-transparent">
            <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3">
              <BookOpen className="h-4 w-4 ml-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="objectives" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3">
              <Target className="h-4 w-4 ml-2" />
              الأهداف
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3">
              <FileText className="h-4 w-4 ml-2" />
              المحتوى
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3">
              <Download className="h-4 w-4 ml-2" />
              الموارد
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3">
              <TrendingUp className="h-4 w-4 ml-2" />
              التقدم
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-700">أهمية المقياس</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed text-lg">
                  {usulModuleOverview.importance}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-indigo-700">المتطلبات الأساسية</CardTitle>
                  <CardDescription>
                    ما يجب أن يتوفر لدى الطالب قبل دراسة هذا المقياس
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {usulModuleOverview.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-indigo-700">معايير التقييم</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {usulModuleOverview.assessmentCriteria.map(
                      (criterion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-indigo-600 flex-shrink-0 mt-2.5" />
                          <span className="text-foreground">{criterion}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Objectives Tab */}
          <TabsContent value="objectives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-700">الأهداف التعليمية</CardTitle>
                <CardDescription>
                  ما سيتعلمه الطالب من خلال هذا المقياس
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {usulModuleOverview.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="text-foreground pt-2 text-lg">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-700">المخرجات المتوقعة</CardTitle>
                <CardDescription>
                  المهارات والقدرات التي سيكتسبها الطالب
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {usulModuleOverview.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-lg">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            {units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                completedLessons={completedLessons}
                onLessonClick={handleLessonClick}
                onToggleCompletion={toggleLessonCompletion}
              />
            ))}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-700">تحليل التقدم الدراسي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-indigo-50 p-6 rounded-xl text-center">
                      <div className="text-sm text-indigo-600 mb-1">الدروس المكتملة</div>
                      <div className="text-4xl font-bold text-indigo-900">
                        {completedLessons.size} / {totalLessons}
                      </div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl text-center">
                      <div className="text-sm text-green-600 mb-1">نسبة الإنجاز</div>
                      <div className="text-4xl font-bold text-green-900">
                        {completionPercentage}%
                      </div>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-xl text-center">
                      <div className="text-sm text-amber-600 mb-1">الوحدات المتبقية</div>
                      <div className="text-4xl font-bold text-amber-900">
                        {units.length - Math.floor(completedLessons.size / (totalLessons/units.length || 1))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">التقدم حسب الوحدات</h3>
                    {units.map((unit) => {
                      const unitLessons = unit.lessons.length;
                      const completedInUnit = unit.lessons.filter((l) =>
                        completedLessons.has(l.id)
                      ).length;
                      const unitPercentage = Math.round(
                        (completedInUnit / unitLessons) * 100
                      );

                      return (
                        <div key={unit.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{unit.title}</span>
                            <span className="font-medium">{unitPercentage}%</span>
                          </div>
                          <Progress value={unitPercentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Sub-components
function UnitCard({
  unit,
  completedLessons,
  onLessonClick,
  onToggleCompletion,
}: {
  unit: UsulModuleUnit;
  completedLessons: Set<string>;
  onLessonClick: (id: string) => void;
  onToggleCompletion: (id: string) => void;
}) {
  return (
    <Card className="overflow-hidden border-r-4 border-r-indigo-600">
      <CardHeader className="bg-indigo-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-indigo-900">{unit.title}</CardTitle>
            <CardDescription className="mt-1">{unit.description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-white">
            {unit.lessons.length} دروس
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {unit.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
            >
              <div
                className="flex items-center gap-4 flex-1 cursor-pointer"
                onClick={() => onLessonClick(lesson.id)}
              >
                <div className="text-muted-foreground group-hover:text-indigo-600 transition-colors">
                  {completedLessons.has(lesson.id) ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <div className="font-medium group-hover:text-indigo-700 transition-colors">
                    {lesson.title}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lesson.estimatedDuration} دقيقة
                    </span>
                    <span className="flex items-center gap-1 uppercase">
                      <FileText className="h-3 w-3" /> {lesson.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleCompletion(lesson.id)}
                  className={completedLessons.has(lesson.id) ? "text-green-600" : ""}
                >
                  {completedLessons.has(lesson.id) ? "مكتمل" : "تحديد كمكتمل"}
                </Button>
                <Button size="sm" onClick={() => onLessonClick(lesson.id)}>
                  عرض الدرس
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ResourceCard({ resource }: { resource: UsulModuleResource }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow border-t-4 border-t-indigo-500">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
            {resource.category === 'textbook' ? 'كتاب مقرر' : 
             resource.category === 'reference' ? 'مرجع' : 'إضافي'}
          </Badge>
          <div className="text-muted-foreground">
            {resource.type === 'book' ? <BookOpen className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
        {resource.author && (
          <CardDescription className="font-medium text-indigo-600">
            تأليف: {resource.author}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{resource.description}</p>
      </CardContent>
      <div className="p-4 pt-0 mt-auto">
        <Button variant="outline" className="w-full gap-2 border-indigo-200 hover:bg-indigo-50">
          {resource.url || resource.filePath ? (
            <>
              <Download className="h-4 w-4" /> تحميل المورد
            </>
          ) : (
            <>
              <ExternalLink className="h-4 w-4" /> تفاصيل المرجع
            </>
          )}
        </Button>
      </div>
    </Card>
}
