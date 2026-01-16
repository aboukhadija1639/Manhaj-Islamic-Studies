import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Button } from '@/shared/ui';
import { academicService } from '@/app/services';
import { lazy, Suspense } from 'react';
import { getModuleById } from '../../data/academics/years/licence-year-1.data';

// استيراد ModuleDetailPage الجديد لعلوم القرآن
const ModuleDetailPage = lazy(() => import('../../modules/ulum-al-quran/components/ModuleDetailPage').then(m => ({ default: m.ModuleDetailPage })));

export default function AcademicModulePage() {
  const { degreeId, specialtyId, yearId, semesterId, moduleId } = useParams();
  const navigate = useNavigate();
  
  // Try to get module from new data structure first
  let module = moduleId ? getModuleById(moduleId) : undefined;
  
  // Fallback to academicService if not found (returns null if not found)
  if (!module) {
    const fallbackModule = academicService.getModuleById(moduleId || '');
    module = fallbackModule || undefined;
  }

  if (!module) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">المقياس غير موجود</h1>
        <Link to="/academics" className="text-emerald-600 mt-4 inline-block">العودة للبرامج</Link>
      </Container>
    );
  }

  // Handle lesson navigation
  const handleNavigateToLesson = (_lessonId: string) => {
    // Navigate to lesson within the module
    const contentTab = document.querySelector('[value="content"]');
    if (contentTab instanceof HTMLElement) {
      contentTab.click();
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(`/academics/${degreeId}/${specialtyId}/${yearId}/${semesterId}`);
  };

  // إذا كان المقياس هو علوم القرآن، نستخدم الصفحة الجديدة المتكاملة
  if (moduleId === 'ulum-al-quran') {
    return (
      <div>
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b" dir="rtl">
          <Container className="py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <button
                onClick={() => navigate('/academics')}
                className="hover:text-emerald-600 transition-colors"
              >
                الأكاديميات
              </button>
              <span>/</span>
              <button
                onClick={() => navigate(`/academics/${degreeId}`)}
                className="hover:text-emerald-600 transition-colors"
              >
                ليسانس
              </button>
              <span>/</span>
              <button
                onClick={() => navigate(`/academics/${degreeId}/${specialtyId}`)}
                className="hover:text-emerald-600 transition-colors"
              >
                علوم القرآن والقراءات
              </button>
              <span>/</span>
              <button
                onClick={() => navigate(`/academics/${degreeId}/${specialtyId}/${yearId}`)}
                className="hover:text-emerald-600 transition-colors"
              >
                السنة الأولى
              </button>
              <span>/</span>
              <button
                onClick={handleBack}
                className="hover:text-emerald-600 transition-colors"
              >
                السداسي الأول
              </button>
              <span>/</span>
              <span className="text-gray-900 font-medium">علوم القرآن</span>
            </nav>
          </Container>
        </div>

        {/* Module Detail Page */}
        <Suspense fallback={<div className="p-20 text-center">جاري تحميل المقياس...</div>}>
          <ModuleDetailPage
            moduleId={moduleId}
            onNavigateToLesson={handleNavigateToLesson}
          />
        </Suspense>
      </div>
    );
  }

  // للمقاييس الأخرى التي لم تجهز بعد، نعرض صفحة "قيد التطوير"
  return (
    <div className="py-12 bg-slate-50 min-h-screen" dir="rtl">
      <Container>
        <div className="mb-10">
          <Link to={`/academics/${degreeId}/${specialtyId}/${yearId}`} className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 mb-6">
            <span>←</span> العودة إلى قائمة المقاييس
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{module.nameAr}</h1>
              <p className="text-slate-600">{module.code} • {module.credits} رصيد • المعامل {module.weeklyHours.lecture}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">تنزيل البرنامج</Button>
              <Button variant="primary">بدء الدراسة</Button>
            </div>
          </div>
        </div>

        <Card className="p-20 text-center border-dashed border-2">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">محتوى المقياس قيد التجهيز</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            نحن نعمل حالياً على رفع المحاضرات والموارد التعليمية لمقياس {module.nameAr}. 
            يرجى العودة لاحقاً.
          </p>
        </Card>
      </Container>
    </div>
  );
}

// مكون Card محلي لتجنب مشاكل الاستيراد
function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
      {children}
    </div>
  );
}
