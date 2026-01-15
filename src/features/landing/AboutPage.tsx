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

function AboutPage() {
  const highlights = [
    'منظم حسب المنهج الدراسي',
    'تجربة حديثة وسهلة',
    'محتوى سريع الوصول',
  ];

  const goals = [
    {
      title: 'تنظيم المحتوى',
      desc: 'تجميع المواد والملخصات والمراجع في مسار واضح حسب السنة والمقياس.',
      icon: '📚',
    },
    {
      title: 'تسهيل الوصول',
      desc: 'تقليل الوقت الضائع في البحث وتوحيد المصادر داخل واجهة واحدة.',
      icon: '⚡',
    },
    {
      title: 'تحسين تجربة التعلم',
      desc: 'تصميم مناسب للجوال مع واجهة واضحة تساعد على التركيز.',
      icon: '🧭',
    },
    {
      title: 'دعم الطالب',
      desc: 'إتاحة قنوات تواصل للاقتراحات والتحسين المستمر.',
      icon: '🤝',
    },
  ];

  const steps = [
    { title: 'اختر سنتك', desc: 'حدد المستوى الدراسي للوصول للمسار الصحيح.' },
    { title: 'اختر المادة', desc: 'تصفح المواد مرتبة حسب المنهج المعتمد.' },
    { title: 'ابدأ التعلّم', desc: 'ملخصات، مراجع، وروابط مساعدة في مكان واحد.' },
  ];

  const faqs = [
    {
      q: 'هل المنصة مخصصة لطلاب كلية العلوم الإسلامية بجامعة الوادي؟',
      a: 'نعم، تم تصميم “منهاج” أساسًا لدعم طلاب الكلية عبر تنظيم المحتوى وفق المسار الدراسي.',
    },
    {
      q: 'هل المحتوى يتم تحديثه؟',
      a: 'نعم، نعتمد التحسين المستمر بناءً على ملاحظات الطلاب وتحديثات المنهج قدر الإمكان.',
    },
    {
      q: 'كيف أرسل اقتراحًا أو أبلّغ عن خطأ؟',
      a: 'يمكنك التواصل عبر بوت التلغرام، ونرحب بأي اقتراحات لتحسين التجربة والمحتوى.',
    },
  ];

  return (
    <div dir="rtl" className="py-12 animate-fade-in">
      <Container size="md">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
            عن منصة منهاج
          </h1>

          <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
            منصة تعليمية رقمية موجهة لطلاب كلية العلوم الإسلامية بجامعة الوادي، تهدف إلى
            تنظيم المحتوى العلمي وتسهيل الوصول إليه عبر تجربة استخدام حديثة وواضحة.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <Badge key={h} variant="secondary">
                {h}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href="/subjects" aria-label="استكشف المواد">
                استكشف المواد
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a href="#contact" aria-label="انتقل إلى قسم التواصل">
                تواصل معنا
              </a>
            </Button>

            <Button variant="ghost" asChild>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                aria-label="التواصل عبر تيليغرام"
              >
                بوت التلغرام
              </a>
            </Button>
          </div>
        </div>

        {/* Layout: sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Side navigation (desktop) */}
          <aside className="md:col-span-4 md:sticky md:top-6 h-fit">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">أقسام الصفحة</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <nav className="space-y-2">
                  <a className="block hover:text-foreground" href="#vision">
                    الرؤية
                  </a>
                  <a className="block hover:text-foreground" href="#goals">
                    الأهداف
                  </a>
                  <a className="block hover:text-foreground" href="#how">
                    كيف تعمل المنصة؟
                  </a>
                  <a className="block hover:text-foreground" href="#who">
                    من نحن
                  </a>
                  <a className="block hover:text-foreground" href="#faq">
                    أسئلة شائعة
                  </a>
                  <a className="block hover:text-foreground" href="#contact">
                    تواصل معنا
                  </a>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Content */}
          <section className="md:col-span-8 space-y-6">
            {/* Vision */}
            <Card id="vision" className="shadow-sm">
              <CardHeader>
                <CardTitle>رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  نسعى لتوفير منصة تعليمية متكاملة وحديثة تساعد الطالب على الوصول السهل
                  والمنظم للمحتوى العلمي، وتقلل الجهد الضائع في البحث، وتدعم تجربة تعلم
                  مركّزة عبر واجهة عصرية وسهلة الاستخدام.
                </p>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card id="goals" className="shadow-sm">
              <CardHeader>
                <CardTitle>أهدافنا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {goals.map((g) => (
                    <div
                      key={g.title}
                      className="rounded-xl border p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-xl leading-none">{g.icon}</div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {g.title}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            {g.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How it works */}
            <Card id="how" className="shadow-sm">
              <CardHeader>
                <CardTitle>كيف تعمل المنصة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((s, idx) => (
                    <div key={s.title} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full border flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{s.title}</div>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-5" />

                <p className="text-sm text-muted-foreground leading-relaxed">
                  هدفنا أن تصل للمعلومة في أقل عدد من النقرات، وبأعلى درجة وضوح وتنظيم.
                </p>
              </CardContent>
            </Card>

            {/* Who we are */}
            <Card id="who" className="shadow-sm">
              <CardHeader>
                <CardTitle>من نحن</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  “منهاج” منصة تعليمية تم تطويرها خصيصًا لطلاب كلية العلوم الإسلامية بجامعة
                  الوادي في الجزائر. نؤمن بأن التكنولوجيا حين تُسخّر لخدمة العلم تُقلّل
                  التشتت وتزيد الفاعلية، لذلك نركز على تجربة استخدام عملية، بسيطة، ومنظمة.
                </p>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card id="faq" className="shadow-sm">
              <CardHeader>
                <CardTitle>أسئلة شائعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-xl border p-4">
                    <div className="font-semibold text-foreground">{f.q}</div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact */}
            <Card id="contact" className="shadow-sm">
              <CardHeader>
                <CardTitle>تواصل معنا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-muted-foreground">
                  <div className="rounded-xl border p-4">
                    <div className="font-semibold text-foreground mb-1">العنوان</div>
                    <p className="leading-relaxed text-sm">
                      جامعة الوادي، كلية العلوم الإسلامية<br />
                      الوادي، الجزائر
                    </p>
                  </div>

                  <div className="rounded-xl border p-4">
                    <div className="font-semibold text-foreground mb-1">
                      ملاحظات واقتراحات
                    </div>
                    <p className="leading-relaxed text-sm">
                      نرحب بملاحظاتكم واقتراحاتكم لتطوير المنصة وتحسين الخدمات المقدمة.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      <Button asChild>
                        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
                          مراسلتنا عبر تيليغرام
                        </a>
                      </Button>

                      <Button variant="outline" asChild>
                        <a href="/support">مركز الدعم</a>
                      </Button>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                      رابط البوت: {TELEGRAM_LINK.replace('https://', '')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;