import { useParams, Link } from 'react-router-dom';
import { Container, Button, Card } from '@/shared/ui';
import { semester1Modules } from '@/shared/data/modules';

const ModuleDetailPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = semester1Modules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <Container className="py-12 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          المقياس غير موجود
        </h1>
        <Link to="/subjects">
          <Button>العودة إلى المقاييس</Button>
        </Link>
      </Container>
    );
  }

  const categoryColors = {
    sharia: {
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
    supporting: {
      gradient: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
    },
    technical: {
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
    },
  };

  const colors = categoryColors[module.category];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${colors.gradient} text-white py-16`}>
        <Container>
          <div className="flex items-center gap-2 mb-4">
            <Link to="/subjects" className="hover:underline opacity-90">
              المقاييس
            </Link>
            <span>←</span>
            <span>{module.titleAr}</span>
          </div>

          <div className="flex items-start gap-6">
            <div className="text-6xl bg-white/20 p-6 rounded-2xl backdrop-blur-sm">
              {module.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {module.titleAr}
              </h1>
              <p className="text-xl opacity-90 mb-4">{module.title}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  ⭐ {module.credits} وحدات
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  ⏱️ {module.hours} ساعة
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  📚 {module.topics.length} محاور
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12 space-y-8">
        {/* Description */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            📝 نبذة عن المقياس
          </h2>
          <p className="text-lg text-card-foreground leading-relaxed">
            {module.description}
          </p>
        </Card>

        {/* Objectives */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            🎯 أهداف المقياس
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.objectives.map((objective, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 ${colors.border} ${colors.bg}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-2xl ${colors.text}`}>✓</span>
                  <p className="text-card-foreground flex-1">
                    {objective}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Topics */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            📚 محاور المقياس
          </h2>
          <div className="space-y-4">
            {module.topics.map((topic, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl border-2 border-border hover:border-primary-300 dark:hover:border-primary-700 bg-card transition-all hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center font-bold`}>
                      {idx + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {topic}
                    </h3>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary-500 transition-colors">
                    ←
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Coming Soon Features */}
        <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            🚀 قريباً
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">📘</div>
              <h3 className="font-semibold text-foreground mb-1">
                ملخصات تفصيلية
              </h3>
              <p className="text-sm text-muted-foreground">
                ملخصات شاملة لكل محور
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🌳</div>
              <h3 className="font-semibold text-foreground mb-1">
                خرائط ذهنية
              </h3>
              <p className="text-sm text-muted-foreground">
                تشجير المفاهيم والعلاقات
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🧠</div>
              <h3 className="font-semibold text-foreground mb-1">
                أسئلة تدريبية
              </h3>
              <p className="text-sm text-muted-foreground">
                اختبر معلوماتك
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <Link to={module.id === 'english-language' ? '/modules/english-language' : '/subjects'}>
            <Button variant="secondary" size="lg">
              ← العودة إلى المقاييس
            </Button>
          </Link>
          <Button size="lg" disabled>
            ابدأ الدراسة (قريباً)
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ModuleDetailPage;
