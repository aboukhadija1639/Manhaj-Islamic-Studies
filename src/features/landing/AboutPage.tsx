import * as React from 'react';
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Separator,
} from '../../shared/ui';

const TELEGRAM_LINK = 'https://t.me/just_contactbot';

type SectionId = 'vision' | 'goals' | 'how' | 'who' | 'faq' | 'contact';

function AboutPage() {
  const highlights = ['منظم حسب المنهج الدراسي', 'تجربة حديثة وسهلة', 'محتوى سريع الوصول', 'دعم متعدد الأجهزة'];
  const features = [
    { icon: '🚀', title: 'سرعة الأداء', desc: 'تحميل فوري للمحتوى وتصميم خفيف الوزن' },
    { icon: '🎨', title: 'تصميم متجاوب', desc: 'تتوافق مع جميع أحجام الشاشات' },
    { icon: '🌓', title: 'الوضع الداكن', desc: 'تجربة مريحة للعين في أي وقت' },
    { icon: '🔍', title: 'بحث ذكي', desc: 'العثور على المحتوى بسهولة' },
  ];

  const goals = [
    { 
      title: 'تنظيم المحتوى', 
      desc: 'تجميع المواد والملخصات والمراجع في مسار واضح حسب السنة والمقياس.',
      icon: '📚',
      color: 'bg-blue-500/10'
    },
    { 
      title: 'تسهيل الوصول', 
      desc: 'تقليل الوقت الضائع في البحث وتوحيد المصادر داخل واجهة واحدة.',
      icon: '⚡',
      color: 'bg-amber-500/10'
    },
    { 
      title: 'تحسين تجربة التعلم', 
      desc: 'تصميم مناسب للجوال مع واجهة واضحة تساعد على التركيز.',
      icon: '🧭',
      color: 'bg-emerald-500/10'
    },
    { 
      title: 'دعم الطالب', 
      desc: 'إتاحة قنوات تواصل للاقتراحات والتحسين المستمر.',
      icon: '🤝',
      color: 'bg-violet-500/10'
    },
  ];

  const steps = [
    { 
      title: 'اختر سنتك', 
      desc: 'حدد المستوى الدراسي للوصول للمسار الصحيح.',
      icon: '1️⃣'
    },
    { 
      title: 'اختر المادة', 
      desc: 'تصفح المواد مرتبة حسب المنهج المعتمد.',
      icon: '2️⃣'
    },
    { 
      title: 'ابدأ التعلّم', 
      desc: 'ملخصات، مراجع، وروابط مساعدة في مكان واحد.',
      icon: '3️⃣'
    },
  ];

  const stats = [
    { value: '24/7', label: 'متاحة على مدار الساعة' },
    { value: '100%', label: 'مجانية تمامًا' },
    { value: '🎯', label: 'موجهة للطلاب' },
    { value: '🚀', label: 'تطوير مستمر' },
  ];

  const faqs = [
    { 
      q: 'هل المنصة مخصصة لطلاب كلية العلوم الإسلامية بجامعة الوادي؟', 
      a: 'نعم، تم تصميم "منهاج" أساسًا لدعم طلاب الكلية عبر تنظيم المحتوى وفق المسار الدراسي.',
      expanded: false 
    },
    { 
      q: 'هل المحتوى يتم تحديثه؟', 
      a: 'نعم، نعتمد التحسين المستمر بناءً على ملاحظات الطلاب وتحديثات المنهج قدر الإمكان.',
      expanded: false 
    },
    { 
      q: 'كيف أرسل اقتراحًا أو أبلّغ عن خطأ؟', 
      a: 'يمكنك التواصل عبر بوت التلغرام، ونرحب بأي اقتراحات لتحسين التجربة والمحتوى.',
      expanded: false 
    },
  ];

  const sections = React.useMemo(() => [
  { id: 'vision', label: 'الرؤية' },
  { id: 'goals', label: 'الأهداف' },
  { id: 'how', label: 'كيف تعمل' },
  { id: 'who', label: 'من نحن' },
  { id: 'faq', label: 'الأسئلة' },
  { id: 'contact', label: 'التواصل' },
], []);

  const [activeSection, setActiveSection] = React.useState<SectionId>('vision');
  const [showTop, setShowTop] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [bannerClosed, setBannerClosed] = React.useState(false);
  const [expandedFaqs, setExpandedFaqs] = React.useState<boolean[]>(faqs.map(() => false));

  // Smooth anchor scrolling
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', hash);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Active section highlight
  React.useEffect(() => {
    const ids = sections.map((s) => s.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const id = visible?.target?.id as SectionId | undefined;
        if (id && ids.includes(id)) setActiveSection(id);
      },
      { threshold: [0.15, 0.25, 0.35, 0.5] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Scroll progress + back-to-top visibility
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(100, Math.max(0, (y / h) * 100)) : 0;
      setProgress(p);
      setShowTop(y > 700);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopyTelegram = async () => {
    try {
      await navigator.clipboard.writeText(TELEGRAM_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Ignore silently
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => prev.map((expanded, i) => i === index ? !expanded : expanded));
  };

  return (
    <div dir="rtl" className="relative min-h-screen">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/50 backdrop-blur-md">
        <div
          className="h-full transition-[width] duration-200 ease-out
                     bg-linear-to-r from-primary via-primary/80 to-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Announcement Banner */}
      {!bannerClosed && (
        <div className="relative z-40">
          <div className="absolute inset-x-0 top-0">
            <div className="bg-linear-to-r from-primary/20 via-primary/10 to-transparent">
              <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-xs">✨</span>
                    </div>
                    <p className="text-sm font-medium">
                      تحسينات تجربة المستخدم وتحديثات المحتوى بشكل مستمر
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      asChild
                    >
                      <a href="#contact">تواصل الآن</a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => setBannerClosed(true)}
                      aria-label="إغلاق"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Container size="lg" className="relative pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative mb-16">
          {/* Floating Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-10 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge 
                variant="secondary" 
                className="rounded-full px-4 py-1.5 backdrop-blur-sm bg-background/80"
              >
                <span className="text-xs ml-1">✨</span>
                منصة طلابية متكاملة
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <span>🌐</span>
                جامعة الوادي • كلية العلوم الإسلامية
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              عن منصة{' '}
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                منهاج
              </span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-3xl">
              منصة تعليمية رقمية تنظّم المسار الدراسي وتُسهّل الوصول للمحتوى العلمي بأقل جهد وأعلى وضوح،
              بتجربة حديثة تدعم الوضع الداكن والفاتح وتواكب تطلعات الطلاب في العصر الرقمي.
            </p>

            {/* Highlights */}
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((h) => (
                <Badge
                  key={h}
                  variant="outline"
                  className="rounded-full px-4 py-2 border-border/50
                           bg-background/70 backdrop-blur-sm
                           transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <span className="text-xs ml-2">✅</span>
                  {h}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-xl px-8 py-6 text-base font-semibold
                         transition-all duration-300 hover:scale-105 hover:shadow-xl
                         bg-linear-to-r from-primary to-primary/90"
                asChild
              >
                <a href="/subjects" className="flex items-center gap-2">
                  <span>📖</span>
                  ابدأ الاستكشاف الآن
                  <span>›</span>
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 py-6 text-base font-semibold
                         transition-all duration-300 hover:scale-105 hover:shadow-md
                         border-primary/30 hover:border-primary"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  <span>💬</span>
                  تواصل مع الفريق
                </a>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="rounded-xl px-8 py-6 text-base font-semibold
                         transition-all duration-300 hover:scale-105"
                asChild
              >
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>↗</span>
                  قناة التلغرام
                </a>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border p-6
                           bg-background/60 backdrop-blur-sm
                           transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="mt-3 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Side Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 self-start">
            <Card
              className="rounded-2xl border-border/50 bg-background/80 backdrop-blur-xl
                       shadow-lg shadow-primary/5"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>🧭</span>
                  التنقل بين الأقسام
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {sections.map((s) => {
                    const active = activeSection === s.id;
                    return (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
                                  ${active 
                                    ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                                  }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <div className={`p-1.5 rounded-lg ${active ? 'bg-primary/20' : 'bg-muted'}`}>
                          <span className={`text-sm ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                            {s.id === 'vision' ? '🌟' : 
                             s.id === 'goals' ? '🎯' : 
                             s.id === 'how' ? '⚡' : 
                             s.id === 'who' ? '👥' : 
                             s.id === 'faq' ? '💬' : '🌐'}
                          </span>
                        </div>
                        <span className="font-medium">{s.label}</span>
                        {active && (
                          <span className="mr-auto text-primary">›</span>
                        )}
                      </a>
                    );
                  })}
                </nav>

                <Separator className="my-6" />

                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <span>💡</span>
                    نصيحة سريعة
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    استخدم قائمة التنقل للوصول السريع لأي قسم. على الهاتف، يمكنك السحب لليمين للعرض.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features Sidebar */}
            <Card className="mt-6 rounded-2xl bg-linear-to-br from-muted/30 to-background/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>⚡</span>
                  ميزات المنصة
                </h3>
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                      <span className="text-xl">{feature.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-8">
            {/* Vision */}
            <section id="vision" className="scroll-mt-32">
              <Card className="rounded-2xl overflow-hidden border-border/50 bg-linear-to-br from-background to-muted/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <span className="text-primary text-lg">🎯</span>
                    </div>
                    <CardTitle className="text-2xl">رؤيتنا</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      نسعى لتوفير منصة تعليمية متكاملة وحديثة تساعد الطالب على الوصول السهل والمنظم للمحتوى العلمي،
                      وتقلل الجهد الضائع في البحث، وتدعم تجربة تعلم مركّزة عبر واجهة عصرية وسهلة الاستخدام.
                    </p>
                    <div className="mt-8 p-6 rounded-2xl bg-linear-to-r from-primary/5 via-transparent to-primary/5">
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-lg">🚀</span>
                        <h3 className="text-lg font-semibold">نؤمن بأن</h3>
                      </div>
                      <p className="mt-2">
                        التكنولوجيا عندما تُستخدم بشكل صحيح يمكنها تحويل التعليم من عملية معقدة إلى تجربة سلسة وممتعة.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Goals */}
            <section id="goals" className="scroll-mt-32">
              <Card className="rounded-2xl border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10">
                      <span className="text-emerald-500 text-lg">🎯</span>
                    </div>
                    <CardTitle className="text-2xl">أهدافنا</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map((goal) => (
                      <div
                        key={goal.title}
                        className="group relative overflow-hidden rounded-2xl p-6
                                 bg-linear-to-br from-background to-muted/30
                                 border transition-all duration-500
                                 hover:scale-[1.02] hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${goal.color} backdrop-blur-sm`}>
                              <span className="text-2xl">{goal.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {goal.desc}
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 pt-4 border-t border-border/50 group-hover:border-primary/30 transition-colors duration-300">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <span>✅</span>
                                قيد التنفيذ
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* How it Works */}
            <section id="how" className="scroll-mt-32">
              <Card className="rounded-2xl overflow-hidden bg-linear-to-b from-background to-muted/10">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-amber-500/10">
                      <span className="text-amber-500 text-lg">⚡</span>
                    </div>
                    <CardTitle className="text-2xl">كيف تعمل المنصة؟</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Connection Lines */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {steps.map((step, index) => (
                        <div
                          key={step.title}
                          className="group relative"
                        >
                          <div className="relative z-10">
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-300" />
                            <div className="relative bg-background border rounded-2xl p-6
                                         transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-primary/10
                                              flex items-center justify-center text-xl font-bold">
                                  {step.icon}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{step.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                                </div>
                              </div>
                              <div className="mt-4 pt-4 border-t border-border/50">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                  ابدأ الآن
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Step Indicator */}
                          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary 
                                        flex items-center justify-center text-white font-bold text-sm
                                        shadow-lg shadow-primary/30">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="text-center p-6 rounded-2xl bg-linear-to-r from-primary/5 to-transparent">
                    <p className="text-lg font-medium">
                      هدفنا أن تصل للمعلومة في أقل عدد من النقرات، وبأعلى درجة وضوح وتنظيم.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* About Us */}
            <section id="who" className="scroll-mt-32">
              <Card className="rounded-2xl bg-linear-to-br from-muted/20 to-background">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-violet-500/10">
                      <span className="text-violet-500 text-lg">👥</span>
                    </div>
                    <CardTitle className="text-2xl">من نحن</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        "منهاج" منصة تعليمية تم تطويرها خصيصًا لطلاب كلية العلوم الإسلامية بجامعة الوادي في الجزائر.
                        نؤمن بأن التكنولوجيا حين تُسخّر لخدمة العلم تُقلّل التشتت وتزيد الفاعلية، لذلك نركز على تجربة
                        استخدام عملية، بسيطة، ومنظمة.
                      </p>
                      <div className="p-4 rounded-xl bg-background/50 border">
                        <h4 className="font-semibold mb-2">قيمنا الأساسية</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            الشفافية والوضوح
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            التطوير المستمر
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            التركيز على احتياجات الطالب
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent rounded-2xl" />
                      <div className="relative p-6 rounded-2xl border bg-background/80 backdrop-blur-sm">
                        <h4 className="font-semibold mb-4">لماذا اختارونا؟</h4>
                        <div className="space-y-3">
                          {[
                            'تصميم مخصص للتعليم الإلكتروني',
                            'محتوى منظم حسب المنهج الرسمي',
                            'دعم فني وتقني متواصل',
                            'تحديثات دورية بناء على الملاحظات'
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                              <span className="text-emerald-500 shrink-0">✅</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-32">
              <Card className="rounded-2xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-blue-500/10">
                      <span className="text-blue-500 text-lg">💬</span>
                    </div>
                    <CardTitle className="text-2xl">أسئلة شائعة</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="group rounded-2xl border overflow-hidden
                                 transition-all duration-300 hover:shadow-lg"
                      >
                        <button
                          className="w-full p-6 text-right flex items-center justify-between gap-4
                                   hover:bg-muted/30 transition-colors duration-300"
                          onClick={() => toggleFaq(index)}
                        >
                          <span className="font-semibold text-lg flex-1">{faq.q}</span>
                          <div className={`transform transition-transform duration-300 ${expandedFaqs[index] ? 'rotate-180' : ''}`}>
                            <span className="text-muted-foreground text-lg">›</span>
                          </div>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedFaqs[index] ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="p-6 pt-0">
                            <div className="pl-6 border-r-2 border-primary/30">
                              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Contact */}
            <section id="contact" className="scroll-mt-32">
              <Card className="rounded-2xl overflow-hidden border-0
                           bg-linear-to-br from-primary/5 via-background to-primary/5">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-primary/50 to-primary" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-linear-to-br from-primary to-primary/80">
                      <span className="text-white text-lg">🌐</span>
                    </div>
                    <CardTitle className="text-2xl">تواصل معنا</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                      <div className="rounded-2xl p-6 bg-background/80 backdrop-blur-sm border">
                        <h4 className="font-semibold text-lg mb-4">العنوان</h4>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2">
                            <span className="text-primary">📍</span>
                            جامعة الوادي، كلية العلوم الإسلامية
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-primary">🏛️</span>
                            الوادي، الجزائر
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl p-6 bg-background/80 backdrop-blur-sm border">
                        <h4 className="font-semibold text-lg mb-4">ساعات العمل</h4>
                        <div className="space-y-2">
                          <p>👨‍💼 الدعم الفني: 24/7</p>
                          <p>📧 الرد على الاستفسارات: خلال 24 ساعة</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl p-6 bg-background/80 backdrop-blur-sm border">
                      <h4 className="font-semibold text-lg mb-6">ملاحظات واقتراحات</h4>
                      <p className="text-muted-foreground mb-6">
                        نرحب بملاحظاتكم واقتراحاتكم لتطوير المنصة وتحسين الخدمات المقدمة.
                        فريقنا دائمًا متاح للاستماع إليكم.
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Button
                            className="rounded-xl h-12 justify-start px-6
                                     transition-all duration-300 hover:scale-105"
                            variant="outline"
                            asChild
                          >
                            <a href="/support" className="flex items-center gap-3">
                              <span>💬</span>
                              مركز الدعم
                            </a>
                          </Button>

                          <Button
                            className="rounded-xl h-12 justify-start px-6
                                     transition-all duration-300 hover:scale-105"
                            variant="outline"
                            onClick={handleCopyTelegram}
                          >
                            <span className="text-xs ml-2">📋</span>
                            {copied ? 'تم النسخ!' : 'نسخ الرابط'}
                          </Button>
                        </div>

                        <div className="mt-6">
                          <Button
                            size="lg"
                            className="w-full rounded-xl h-14 text-base font-semibold
                                     bg-linear-to-r from-primary to-primary/90
                                     hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                            asChild
                          >
                            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
                              <span className="text-xs ml-2">💬</span>
                              مراسلتنا عبر تيليغرام
                              <span className="text-xs mr-2">↗</span>
                            </a>
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4 text-center">
                          {TELEGRAM_LINK.replace('https://', '')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>

        {/* Back to Top */}
        {showTop && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12
                     backdrop-blur-sm border-border/50 shadow-lg
                     transition-all duration-300 hover:scale-110 hover:shadow-xl
                     animate-bounce"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="العودة للأعلى"
          >
            ↑
          </Button>
        )}
      </Container>
    </div>
  );
}

export default AboutPage;