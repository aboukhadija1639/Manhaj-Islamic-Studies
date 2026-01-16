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
import { BookOpen, Target, Users, Lightbulb, MessageCircle, Mail, Github, Linkedin, Send } from 'lucide-react';

const TELEGRAM_LINK = 'https://t.me/just_contactbot';
const DEVELOPER_EMAIL = 'moussaouiaboubaker.sn@gmail.com';
const DEVELOPER_GITHUB = 'https://github.com/Aboubaker001';
const DEVELOPER_LINKEDIN = 'https://www.linkedin.com/in/moussaoui-aboubaker-389a41249/';

type SectionId = 'vision' | 'goals' | 'how' | 'who' | 'faq' | 'contact';

function AboutPage() {
  const features = [
    { 
      icon: BookOpen, 
      title: 'محتوى منظم', 
      desc: 'تنظيم شامل للمواد الدراسية وفق نظام LMD المعتمد في الجامعة',
      gradient: 'from-emerald-500 to-teal-600'
    },
    { 
      icon: Target, 
      title: 'أهداف واضحة', 
      desc: 'تحديد دقيق لأهداف كل مقياس ومخرجات التعلم المتوقعة',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      icon: Users, 
      title: 'تجربة متميزة', 
      desc: 'واجهة عصرية سهلة الاستخدام مع دعم الوضع الداكن والفاتح',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      icon: Lightbulb, 
      title: 'تطوير مستمر', 
      desc: 'تحديثات دورية بناءً على ملاحظات الطلاب واحتياجاتهم',
      gradient: 'from-amber-500 to-orange-600'
    },
  ];

  const goals = [
    { 
      title: 'تنظيم المحتوى الأكاديمي', 
      desc: 'توفير بنية واضحة ومنظمة للمواد الدراسية عبر جميع المستويات والتخصصات، مما يسهل على الطلاب التنقل والوصول السريع للمعلومات المطلوبة.',
      icon: BookOpen,
      color: 'from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    { 
      title: 'تسهيل الوصول للمعلومات', 
      desc: 'تقليل الوقت والجهد المبذول في البحث عن المراجع والملخصات من خلال توحيد جميع المصادر في منصة واحدة سهلة الاستخدام.',
      icon: Target,
      color: 'from-blue-500/10 to-cyan-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    { 
      title: 'تحسين تجربة التعلم', 
      desc: 'تقديم واجهة عصرية ومريحة للعين تدعم جميع الأجهزة وتساعد الطلاب على التركيز على المحتوى العلمي دون تشتيت.',
      icon: Lightbulb,
      color: 'from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    { 
      title: 'دعم الطلاب والتواصل', 
      desc: 'إتاحة قنوات تواصل فعالة للاستفسارات والاقتراحات، مع الالتزام بالتحسين المستمر بناءً على احتياجات المجتمع الطلابي.',
      icon: MessageCircle,
      color: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
  ];

  const steps = [
    { 
      number: '01',
      title: 'اختر البرنامج الدراسي', 
      desc: 'حدد مستوى الدراسة (ليسانس، ماستر، دكتوراه) والتخصص المناسب للوصول إلى المسار الأكاديمي الصحيح.',
    },
    { 
      number: '02',
      title: 'تصفح المقاييس والمواد', 
      desc: 'استعرض جميع المقاييس المرتبة حسب السداسيات مع تفاصيل الرصيد والمعامل ونوع المقياس.',
    },
    { 
      number: '03',
      title: 'ابدأ رحلة التعلم', 
      desc: 'اطلع على الملخصات والأهداف والمراجع المعتمدة والمحاضرات المتاحة لكل مقياس في مكان واحد.',
    },
  ];

  const stats = [
    { value: '24/7', label: 'متاحة على مدار الساعة', gradient: 'from-emerald-500 to-teal-600' },
    { value: '100%', label: 'مجانية تمامًا', gradient: 'from-blue-500 to-cyan-600' },
    { value: '3', label: 'مستويات أكاديمية', gradient: 'from-purple-500 to-pink-600' },
    { value: '5', label: 'تخصصات ماستر', gradient: 'from-amber-500 to-orange-600' },
  ];

  const faqs = [
    { 
      q: 'هل المنصة مخصصة لطلاب كلية العلوم الإسلامية بجامعة الوادي؟', 
      a: 'نعم، تم تصميم منصة منهاج خصيصًا لدعم طلاب كلية العلوم الإسلامية بجامعة حمه لخضر بالوادي، حيث تنظم المحتوى الأكاديمي وفق نظام LMD المعتمد في الكلية.',
    },
    { 
      q: 'هل المحتوى يتم تحديثه بشكل دوري؟', 
      a: 'نعم، نلتزم بالتحسين المستمر وتحديث المحتوى بناءً على ملاحظات الطلاب وتحديثات المنهج الدراسي الرسمي، لضمان توفير معلومات دقيقة ومحدثة.',
    },
    { 
      q: 'كيف يمكنني إرسال اقتراح أو الإبلاغ عن مشكلة؟', 
      a: 'يمكنك التواصل معنا عبر بوت التلغرام الخاص بالدعم الفني، أو مراسلتنا عبر البريد الإلكتروني. نرحب بجميع الاقتراحات والملاحظات لتحسين تجربة الاستخدام.',
    },
    { 
      q: 'هل يمكن استخدام المنصة على الهاتف المحمول؟', 
      a: 'بالتأكيد، المنصة مصممة بتقنية responsive design لتعمل بكفاءة على جميع الأجهزة بما في ذلك الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر.',
    },
  ];

  const sections = React.useMemo(() => [
    { id: 'vision', label: 'الرؤية' },
    { id: 'goals', label: 'الأهداف' },
    { id: 'how', label: 'كيف تعمل' },
    { id: 'who', label: 'من نحن' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
    { id: 'contact', label: 'التواصل' },
  ], []);

  const [activeSection, setActiveSection] = React.useState<SectionId>('vision');
  const [showTop, setShowTop] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
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
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/50 backdrop-blur-md">
        <div
          className="h-full transition-[width] duration-200 ease-out bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Container size="lg" className="relative pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative mb-20">
          {/* Floating Background Elements */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 -left-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge 
                variant="secondary" 
                className="rounded-full px-5 py-2 backdrop-blur-sm bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
              >
                منصة تعليمية متكاملة
              </Badge>
              <span className="text-sm text-muted-foreground">
                جامعة حمه لخضر بالوادي • كلية العلوم الإسلامية
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              عن منصة{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                منهاج
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl font-['Cairo']">
              منصة تعليمية رقمية متخصصة في تنظيم المسار الأكاديمي لطلاب العلوم الإسلامية، توفر محتوى علميًا منظمًا وفق نظام LMD مع تجربة استخدام عصرية وسهلة تواكب احتياجات الطلاب في العصر الرقمي.
            </p>

            {/* Statistics Cards */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="relative group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  <Card className="relative border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-['Cairo']">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-16 z-40 mb-12 -mx-4 px-4 py-4 bg-background/80 backdrop-blur-md border-y border-border/40">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300
                  ${activeSection === sec.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                {sec.label}
              </a>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <section id="vision" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              رؤيتنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl font-['Cairo']">
              نسعى لتكون منصة منهاج المرجع الأول لطلاب العلوم الإسلامية في جامعة حمه لخضر، من خلال توفير بيئة تعليمية رقمية متكاملة تجمع بين الأصالة العلمية والتقنية الحديثة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={idx} 
                  className="group border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground font-['Cairo']">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              أهدافنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl font-['Cairo']">
              نعمل على تحقيق مجموعة من الأهداف الاستراتيجية لتحسين تجربة التعلم وتسهيل الوصول للمحتوى الأكاديمي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, idx) => {
              const Icon = goal.icon;
              return (
                <Card 
                  key={idx}
                  className="group border-border/50 hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${goal.iconColor}`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-3">
                      {goal.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-['Cairo']">
                      {goal.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              كيف تعمل المنصة
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl font-['Cairo']">
              ثلاث خطوات بسيطة للوصول إلى جميع المواد الدراسية والمحتوى الأكاديمي المنظم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="relative"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 right-0 w-full h-0.5 bg-gradient-to-l from-emerald-500/50 to-transparent -z-10" />
                )}
                <Card className="group border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div className="text-6xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 opacity-20 group-hover:opacity-30 transition-opacity">
                      {step.number}
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground font-['Cairo']">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Who We Are Section */}
        <section id="who" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              من نحن
            </h2>
          </div>

          <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
            <CardContent className="p-8 md:p-10">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-['Cairo']">
                  منصة منهاج هي مبادرة طلابية تهدف إلى تنظيم وتسهيل الوصول للمحتوى الأكاديمي لطلاب كلية العلوم الإسلامية بجامعة حمه لخضر بالوادي. تم تطوير المنصة بعناية فائقة لتلبية احتياجات الطلاب وتوفير تجربة تعليمية متميزة.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-['Cairo']">
                  نؤمن بأهمية التكنولوجيا في تحسين جودة التعليم، ونسعى لتوفير أدوات عصرية تساعد الطلاب على التفوق الأكاديمي من خلال الوصول السريع والمنظم للمعلومات والمراجع العلمية.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed font-['Cairo']">
                  المنصة في تطور مستمر بفضل ملاحظات واقتراحات الطلاب، ونرحب بجميع المساهمات التي تساعد في تحسين تجربة الاستخدام وإثراء المحتوى الأكاديمي.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl font-['Cairo']">
              إجابات على أكثر الأسئلة شيوعًا حول المنصة وكيفية استخدامها.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card 
                key={idx}
                className="border-border/50 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader 
                  className="cursor-pointer p-6 hover:bg-muted/30 transition-colors"
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg font-bold text-right flex-1">
                      {faq.q}
                    </CardTitle>
                    <div className={`text-2xl transition-transform duration-300 ${expandedFaqs[idx] ? 'rotate-180' : ''}`}>
                      ↓
                    </div>
                  </div>
                </CardHeader>
                {expandedFaqs[idx] && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <Separator className="mb-4" />
                    <p className="text-muted-foreground leading-relaxed font-['Cairo']">
                      {faq.a}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-32">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              تواصل معنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl font-['Cairo']">
              نرحب بجميع الاستفسارات والاقتراحات والملاحظات لتحسين المنصة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telegram Contact */}
            <Card className="group border-border/50 bg-gradient-to-br from-background to-blue-500/5 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold">
                      بوت الدعم الفني
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      تلغرام
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 font-['Cairo']">
                  تواصل معنا مباشرة عبر بوت التلغرام للحصول على الدعم الفني والإجابة على استفساراتك.
                </p>
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  >
                    <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                      فتح المحادثة
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCopyTelegram}
                    className="px-4"
                  >
                    {copied ? '✓' : 'نسخ'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Contact */}
            <Card className="group border-border/50 bg-gradient-to-br from-background to-emerald-500/5 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold">
                      البريد الإلكتروني
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      للتواصل المباشر
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 font-['Cairo']">
                  راسلنا عبر البريد الإلكتروني لأي استفسارات أو اقتراحات أو ملاحظات.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-emerald-500/50 hover:bg-emerald-500/10"
                >
                  <a href={`mailto:${DEVELOPER_EMAIL}`}>
                    {DEVELOPER_EMAIL}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Developer Info */}
          <Card className="mt-8 border-border/50 bg-gradient-to-br from-background to-purple-500/5">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">
                    المطور
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    أبو البراء
                  </p>
                  <p className="text-sm text-muted-foreground font-['Cairo']">
                    مطور ومصمم المنصة
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <a href={DEVELOPER_GITHUB} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <a href={DEVELOPER_LINKEDIN} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>

      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-50 p-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="العودة للأعلى"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default AboutPage;
