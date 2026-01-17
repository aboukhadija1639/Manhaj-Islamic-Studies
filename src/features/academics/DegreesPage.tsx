import { Container, Card, Button } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { academicService } from '@/app/services';

export default function DegreesPage() {
  const degrees = academicService.getAllDegrees();

  return (
    <div className="py-12 bg-background min-h-screen" dir="rtl">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">البرامج الأكاديمية</h1>
            <p className="text-lg text-muted-foreground">
              اختر البرنامج الدراسي المناسب لمسارك التعليمي في كلية العلوم الإسلامية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {degrees.map((degree) => (
              <Card key={degree.id} className="p-8 flex flex-col h-full hover:shadow-xl transition-shadow border-t-4 border-t-emerald-500">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                    {degree.type === 'licence' ? 'نظام LMD' : 'دراسات عليا'}
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{degree.nameAr}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {degree.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="block font-medium text-card-foreground">المدة: {degree.duration.years} سنوات</span>
                    <span>{degree.specialtyIds.length} تخصصات متاحة</span>
                  </div>
                  <Link to={`/academics/${degree.id}`}>
                    <Button variant="primary">عرض التخصصات</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
