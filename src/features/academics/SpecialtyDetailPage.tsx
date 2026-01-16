import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from '@/shared/ui';
import { academicService } from '@/app/services';

export default function SpecialtyDetailPage() {
  const { degreeId, specialtyId } = useParams();
  const specialty = academicService.getSpecialtyById(specialtyId || '');
  const degree = academicService.getDegreeById(degreeId || '');

  if (!specialty || !degree) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">التخصص غير موجود</h1>
        <Link to="/academics" className="text-emerald-600 mt-4 inline-block">العودة للبرامج</Link>
      </Container>
    );
  }

  // سنوات الدراسة بناءً على نوع الدرجة
  const years = degree.type === 'licence' ? [1, 2, 3] : [1, 2];

  return (
    <div className="py-12 bg-slate-50 min-h-screen" dir="rtl">
      <Container>
        <div className="mb-10">
          <Link to={`/academics/${degreeId}`} className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 mb-6">
            <span>←</span> العودة إلى {degree.nameAr}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{specialty.icon}</span>
            <h1 className="text-4xl font-bold text-slate-900">{specialty.nameAr}</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">{specialty.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">المسار الدراسي</h2>
            <div className="space-y-6">
              {years.map((yearNum) => (
                <Card key={yearNum} className="p-6 flex items-center justify-between hover:border-emerald-300 transition-colors">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">السنة {yearNum === 1 ? 'الأولى' : yearNum === 2 ? 'الثانية' : 'الثالثة'}</h3>
                    <p className="text-slate-500">سداسيات الدراسة والمقاييس المقررة</p>
                  </div>
                  <Link to={`/academics/${degreeId}/${specialtyId}/year-${yearNum}`}>
                    <Button variant="primary">عرض المقاييس</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="p-6 bg-emerald-900 text-white">
              <h3 className="text-xl font-bold mb-4">أهداف التخصص</h3>
              <ul className="space-y-3">
                {specialty.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2 text-emerald-100 text-sm">
                    <span className="text-emerald-400">✓</span> {obj}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">الآفاق المهنية</h3>
              <div className="flex flex-wrap gap-2">
                {specialty.careerPaths.map((path, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    {path}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
