import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from '@/shared/ui';
import { academicService } from '@/app/services';

export default function DegreeDetailPage() {
  const { degreeId } = useParams();
  const degree = academicService.getDegreeWithSpecialties(degreeId || '');

  if (!degree) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">البرنامج غير موجود</h1>
        <Link to="/academics" className="text-emerald-600 mt-4 inline-block">العودة للبرامج</Link>
      </Container>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen" dir="rtl">
      <Container>
        <div className="mb-10">
          <Link to="/academics" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 mb-6">
            <span>←</span> العودة إلى البرامج
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-4">{degree.nameAr}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{degree.description}</p>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-8">التخصصات المتاحة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {degree.specialties.map((specialty) => (
            <Card key={specialty.id} className="p-6 hover:shadow-lg transition-all group">
              <div className="text-4xl mb-4">{specialty.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-emerald-600 transition-colors">
                {specialty.nameAr}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                {specialty.description}
              </p>
              <Link to={`/academics/${degree.id}/${specialty.id}`}>
                <Button variant="outline" className="w-full">استكشاف التخصص</Button>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
