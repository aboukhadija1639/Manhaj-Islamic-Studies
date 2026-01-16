/**
 * صفحة تفاصيل المقياس - علوم القرآن
 * Module Detail Page - Quranic Sciences
 * 
 * صفحة كاملة تعرض جميع معلومات المقياس:
 * - نظرة عامة (Overview)
 * - الأهداف (Objectives)
 * - المحتوى (Content)
 * - الموارد (Resources)
 * - التقدم (Progress)
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
} from 'lucide-react';
import type {
  QuranModuleUnit,
  QuranModuleLesson,
  QuranModuleResource,
} from '../../../data/academics/modules/ulum-al-quran.data';
import {
  quranModuleOverview,
  getAllUnits,
  getAllResources,
  getTotalLessonsCount,
  getTotalEstimatedDuration,
} from '../../../data/academics/modules/ulum-al-quran.data';

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

  const units = getAllUnits();
  const resources = getAllResources();
  const totalLessons = getTotalLessonsCount();
  const totalHours = getTotalEstimatedDuration();
  const completionPercentage = Math.round(
    (completedLessons.size / totalLessons) * 100
  );

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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-l from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge className="mb-2 bg-white/20 text-white hover:bg-white/30">
                UEF-111
              </Badge>
              <h1 className="text-3xl font-bold mb-2">علوم القرآن</h1>
              <p className="text-emerald-100 text-lg">
                Quranic Sciences
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>6 وحدات دراسية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{totalHours} ساعة</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{totalLessons} درس</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
              <div className="text-sm mb-2">التقدم الإجمالي</div>
              <div className="text-3xl font-bold mb-2">
                {completionPercentage}%
              </div>
              <Progress value={completionPercentage} className="h-2" />
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
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="objectives" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              الأهداف
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              المحتوى
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              الموارد
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              التقدم
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>أهمية المقياس</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {quranModuleOverview.importance}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المتطلبات الأساسية</CardTitle>
                <CardDescription>
                  ما يجب أن يتوفر لدى الطالب قبل دراسة هذا المقياس
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {quranModuleOverview.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معايير التقييم</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {quranModuleOverview.assessmentCriteria.map(
                    (criterion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-600 flex-shrink-0 mt-2" />
                        <span className="text-gray-700">{criterion}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معلومات الأستاذ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">الاسم:</span> د. محمد العربي
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">اللقب:</span> أستاذ محاضر
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">البريد الإلكتروني:</span>{' '}
                    <a
                      href="mailto:mohamed.arabi@univ-eloued.dz"
                      className="text-emerald-600 hover:underline"
                    >
                      mohamed.arabi@univ-eloued.dz
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Objectives Tab */}
          <TabsContent value="objectives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الأهداف التعليمية</CardTitle>
                <CardDescription>
                  ما سيتعلمه الطالب من خلال هذا المقياس
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {quranModuleOverview.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 pt-1">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المخرجات المتوقعة</CardTitle>
                <CardDescription>
                  المهارات والقدرات التي سيكتسبها الطالب
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {quranModuleOverview.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{outcome}</span>
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
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات التقدم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-700">
                      {completedLessons.size}
                    </div>
                    <div className="text-sm text-gray-600">دروس مكتملة</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      {totalLessons - completedLessons.size}
                    </div>
                    <div className="text-sm text-gray-600">دروس متبقية</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">
                      {completionPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">نسبة الإنجاز</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التقدم حسب الوحدات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {units.map((unit) => {
                  const unitCompletedCount = unit.lessons.filter((l) =>
                    completedLessons.has(l.id)
                  ).length;
                  const unitPercentage = Math.round(
                    (unitCompletedCount / unit.lessons.length) * 100
                  );

                  return (
                    <div key={unit.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">
                          {unit.title}
                        </span>
                        <span className="text-sm text-gray-600">
                          {unitCompletedCount} / {unit.lessons.length}
                        </span>
                      </div>
                      <Progress value={unitPercentage} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper Components

interface UnitCardProps {
  unit: QuranModuleUnit;
  completedLessons: Set<string>;
  onLessonClick: (lessonId: string) => void;
  onToggleCompletion: (lessonId: string) => void;
}

function UnitCard({
  unit,
  completedLessons,
  onLessonClick,
  onToggleCompletion,
}: UnitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const completedCount = unit.lessons.filter((l) =>
    completedLessons.has(l.id)
  ).length;

  return (
    <Card>
      <CardHeader
        className="cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{unit.title}</CardTitle>
            <CardDescription className="mt-1">
              {unit.description}
            </CardDescription>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>{unit.lessons.length} دروس</span>
              <span>•</span>
              <span>{unit.estimatedDuration} دقيقة</span>
              <span>•</span>
              <span>
                {completedCount} / {unit.lessons.length} مكتمل
              </span>
            </div>
          </div>
          <Badge
            variant={completedCount === unit.lessons.length ? 'default' : 'secondary'}
            className="mr-2"
          >
            {Math.round((completedCount / unit.lessons.length) * 100)}%
          </Badge>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-2">
            {unit.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                isCompleted={completedLessons.has(lesson.id)}
                onLessonClick={onLessonClick}
                onToggleCompletion={onToggleCompletion}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

interface LessonItemProps {
  lesson: QuranModuleLesson;
  isCompleted: boolean;
  onLessonClick: (lessonId: string) => void;
  onToggleCompletion: (lessonId: string) => void;
}

function LessonItem({
  lesson,
  isCompleted,
  onLessonClick,
  onToggleCompletion,
}: LessonItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
        isCompleted
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleCompletion(lesson.id);
        }}
        className="flex-shrink-0"
      >
        {isCompleted ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        ) : (
          <Circle className="h-5 w-5 text-gray-400" />
        )}
      </button>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => onLessonClick(lesson.id)}
      >
        <div className="font-medium text-gray-900">{lesson.title}</div>
        <div className="text-sm text-gray-600 mt-1">{lesson.description}</div>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          <span>{lesson.estimatedDuration} دقيقة</span>
          <span>•</span>
          <span>{lesson.type.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

interface ResourceCardProps {
  resource: QuranModuleResource;
}

function ResourceCard({ resource }: ResourceCardProps) {
  const getResourceIcon = () => {
    switch (resource.type) {
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'link':
        return <Download className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (resource.category) {
      case 'textbook':
        return 'bg-blue-100 text-blue-700';
      case 'reference':
        return 'bg-purple-100 text-purple-700';
      case 'supplementary':
        return 'bg-emerald-100 text-emerald-700';
      case 'audio':
        return 'bg-amber-100 text-amber-700';
      case 'video':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">{getResourceIcon()}</div>
            <div>
              <CardTitle className="text-base">{resource.title}</CardTitle>
              {resource.author && (
                <CardDescription className="mt-1">
                  {resource.author}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge className={getCategoryColor()}>{resource.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
        <Button variant="outline" size="sm" className="w-full">
          <Download className="h-4 w-4 ml-2" />
          {resource.type === 'link' ? 'فتح الرابط' : 'تحميل'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ModuleDetailPage;
