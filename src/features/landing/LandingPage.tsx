import { Link } from 'react-router-dom';
import { Container, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../shared/ui';

function LandingPage() {
  const featuredSubjects = [
    {
      id: 'tafsir',
      title: 'التفسير وعلوم القرآن',
      description: 'دراسة معاني القرآن الكريم وأساليب تفسيره وعلومه المتنوعة',
      icon: '📖',
      level: 'السنة الأولى',
    },
    {
      id: 'hadith',
      title: 'الحديث وعلومه',
      description: 'دراسة السنة النبوية الشريفة وعلوم الحديث ومصطلحاته',
      icon: '📚',
      level: 'السنة الأولى',
    },
    {
      id: 'fiqh',
      title: 'الفقه وأصوله',
      description: 'دراسة الأحكام الشرعية العملية وقواعد الاستنباط',
      icon: '⚖️',
      level: 'السنة الأولى',
    },
    {
      id: 'aqidah',
      title: 'العقيدة الإسلامية',
      description: 'دراسة أصول الإيمان والتوحيد والعقيدة الصحيحة',
      icon: '🕌',
      level: 'السنة الأولى',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-background dark:from-primary-950/20 dark:to-background py-20 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              منصة منهاج للعلوم الشرعية
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              منصة تعليمية متكاملة لطلاب العلوم الإسلامية بجامعة الوادي، توفر محتوى علمي منظم وسهل الوصول
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/subjects">تصفح المواد الدراسية</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/about">تعرف على المنصة</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Subjects */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              المواد الدراسية المميزة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استكشف المواد الدراسية للسنة الأولى 2025/2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSubjects.map((subject) => (
              <Card key={subject.id} hover className="group cursor-pointer">
                <CardHeader>
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <CardTitle className="text-xl group-hover:text-primary-600 transition-colors">
                    {subject.title}
                  </CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                    {subject.level}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="ghost" size="lg" asChild>
              <Link to="/subjects">عرض جميع المواد ←</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              لماذا منهاج؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">محتوى منظم</h3>
              <p className="text-muted-foreground">
                محتوى علمي مرتب ومنظم حسب المنهج الدراسي المعتمد
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">سهولة البحث</h3>
              <p className="text-muted-foreground">
                نظام بحث قوي للوصول السريع إلى المعلومات المطلوبة
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">تجربة حديثة</h3>
              <p className="text-muted-foreground">
                واجهة عصرية وسهلة الاستخدام على جميع الأجهزة
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default LandingPage;
