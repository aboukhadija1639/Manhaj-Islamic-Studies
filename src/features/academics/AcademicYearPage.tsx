import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from '@/shared/ui';
import { academicService } from '@/app/services';

export default function AcademicYearPage() {
  const { degreeId, specialtyId, yearId } = useParams();
  const specialty = academicService.getSpecialtyById(specialtyId || '');
  const degree = academicService.getDegreeById(degreeId || '');
  
  const yearNum = parseInt(yearId?.split('-')[1] || '1');
  const semesters = yearNum === 1 ? [1, 2] : yearNum === 2 ? [3, 4] : [5, 6];

  if (!specialty || !degree) {
    return <Container className="py-20 text-center"><h1>المعلومات غير متوفرة</h1></Container>;
  }

  return (
    <div className="py-12 bg-background min-h-screen" dir="rtl">
      <Container>
        <div className="mb-10">
          <Link to={`/academics/${degreeId}/${specialtyId}`} className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 mb-6">
            <span>←</span> العودة إلى {specialty.nameAr}
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            السنة {yearNum === 1 ? 'الأولى' : yearNum === 2 ? 'الثانية' : 'الثالثة'}
          </h1>
          <p className="text-muted-foreground">{degree.nameAr} - {specialty.nameAr}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {semesters.map((semNum) => {
            const modules = academicService.getModulesBySemester(`${degree.type}-${yearNum}-s${semNum}`);
            return (
              <div key={semNum}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg">
                    {semNum}
                  </span>
                  السداسي {semNum}
                </h2>
                <div className="space-y-4">
                  {modules.length > 0 ? (
                    modules.map((module) => (
                      <Card key={module.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-foreground">{module.nameAr}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{module.code} • {module.credits} رصيد</p>
                          </div>
                          <Link to={`/academics/${degreeId}/${specialtyId}/${yearId}/${degree.type}-${yearNum}-s${semNum}/${module.id}`}>
                            <Button variant="outline" size="sm">فتح المقياس</Button>
                          </Link>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center text-muted-foreground border-dashed">
                      <p>لا توجد مقاييس مضافة لهذا السداسي بعد</p>
                    </Card>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
