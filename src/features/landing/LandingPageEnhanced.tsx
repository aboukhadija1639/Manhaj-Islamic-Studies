import { Link } from 'react-router-dom';
import { Container, Button, Card, ModuleCard } from '@/shared/ui';
import { semester1Modules, moduleCategories } from '@/shared/data/modules';

const LandingPageEnhanced = () => {
  // Get featured modules (one from each category)
  const featuredModules = [
    semester1Modules.find(m => m.id === 'ulum-al-quran')!,
    semester1Modules.find(m => m.id === 'arabic-language')!,
    semester1Modules.find(m => m.id === 'computer-science')!,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 md:py-32">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-white text-sm font-semibold">
              <span>🎓</span>
              <span>جامعة الوادي - كلية العلوم الإسلامية</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              منصة منهاج للعلوم الشرعية
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              منصة تعليمية متكاملة لطلاب العلوم الإسلامية بجامعة الوادي، توفر محتوى علمي منظم ومسهل الوصول
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/subjects">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl">
                  تصفح المواد الدراسية ←
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="ghost" className="text-white border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 backdrop-blur-sm">
                  تعرف على المنصة
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{semester1Modules.length}</div>
                <div className="text-sm text-white/80">مقياس دراسي</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">3</div>
                <div className="text-sm text-white/80">تصنيفات علمية</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">44</div>
                <div className="text-sm text-white/80">وحدة دراسية</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Modules Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted dark:from-card dark:to-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              المواد الدراسية المميزة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استكشف المواد الدراسية للسداسي الأول 2025/2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/subjects">
              <Button size="lg" variant="primary">
                عرض جميع المواد ←
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              التصنيفات العلمية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              المقاييس منظمة في ثلاث عائلات علمية متكاملة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sharia Sciences */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">{moduleCategories.sharia.icon}</div>
                <h3 className="text-2xl font-bold text-foreground">
                  {moduleCategories.sharia.title}
                </h3>
                <p className="text-muted-foreground">
                  {moduleCategories.sharia.description}
                </p>
                <div className="pt-4">
                  <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold">
                    5 مقاييس
                  </span>
                </div>
              </div>
            </Card>

            {/* Supporting Sciences */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">{moduleCategories.supporting.icon}</div>
                <h3 className="text-2xl font-bold text-foreground">
                  {moduleCategories.supporting.title}
                </h3>
                <p className="text-muted-foreground">
                  {moduleCategories.supporting.description}
                </p>
                <div className="pt-4">
                  <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full font-semibold">
                    3 مقاييس
                  </span>
                </div>
              </div>
            </Card>

            {/* Technical Sciences */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">{moduleCategories.technical.icon}</div>
                <h3 className="text-2xl font-bold text-foreground">
                  {moduleCategories.technical.title}
                </h3>
                <p className="text-muted-foreground">
                  {moduleCategories.technical.description}
                </p>
                <div className="pt-4">
                  <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                    2 مقاييس
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              لماذا منهاج؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-foreground mb-2">محتوى منظم</h3>
              <p className="text-sm text-muted-foreground">
                مقاييس مرتبة ومنظمة حسب السداسيات
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-foreground mb-2">أهداف واضحة</h3>
              <p className="text-sm text-muted-foreground">
                كل مقياس له أهداف محددة وواضحة
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🌙</div>
              <h3 className="font-bold text-foreground mb-2">وضع ليلي</h3>
              <p className="text-sm text-muted-foreground">
                راحة للعين مع الوضع الداكن
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-foreground mb-2">متجاوب</h3>
              <p className="text-sm text-muted-foreground">
                يعمل على جميع الأجهزة بسلاسة
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              ابدأ رحلتك التعليمية الآن
            </h2>
            <p className="text-xl text-white/90">
              انضم إلى آلاف الطلاب الذين يستخدمون منصة منهاج لتنظيم دراستهم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/subjects">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  استكشف المقاييس ←
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="ghost" className="text-white border-2 border-primary-foreground/30 hover:bg-primary-foreground/10">
                  المزيد عن المنصة
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPageEnhanced;
