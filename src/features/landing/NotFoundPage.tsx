import { Link } from 'react-router-dom';
import { Container, Button } from '../../shared/ui';

function NotFoundPage() {
  return (
    <div className="py-20 animate-fade-in">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="font-heading text-4xl font-bold mb-4">
            الصفحة غير موجودة
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </p>
          <Button size="lg" asChild>
            <Link to="/">العودة إلى الرئيسية</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
