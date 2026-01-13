import { Container, Card, CardHeader, CardTitle, CardContent } from '../../shared/ui';

function AboutPage() {
  return (
    <div className="py-12 animate-fade-in">
      <Container size="md">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
          عن منصة منهاج
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>رؤيتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                نسعى لتوفير منصة تعليمية متكاملة وحديثة لطلاب العلوم الإسلامية بجامعة الوادي، تساعدهم على الوصول السهل والمنظم للمحتوى العلمي، وتعزز من تجربتهم التعليمية من خلال واجهة عصرية وسهلة الاستخدام.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>أهدافنا</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>توفير محتوى علمي منظم ومرتب حسب المنهج الدراسي المعتمد</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>تسهيل الوصول إلى المواد الدراسية والمراجع العلمية</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>تحسين تجربة التعلم من خلال تقنيات حديثة وواجهة سهلة</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>دعم الطلاب في مسيرتهم التعليمية بأدوات فعالة</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>من نحن</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                منهاج هي منصة تعليمية تم تطويرها خصيصاً لطلاب كلية العلوم الإسلامية بجامعة الوادي في الجزائر. نحن نؤمن بأهمية التكنولوجيا في تحسين جودة التعليم، ونسعى لتقديم أفضل تجربة تعليمية رقمية للطلاب.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تواصل معنا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong className="text-foreground">العنوان:</strong><br />
                  جامعة الوادي، كلية العلوم الإسلامية<br />
                  الوادي، الجزائر
                </p>
                <p>
                  نرحب بملاحظاتكم واقتراحاتكم لتطوير المنصة وتحسين الخدمات المقدمة.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;
