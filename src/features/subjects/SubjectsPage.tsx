import { Container, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from '../../shared/ui';
import { useState } from 'react';

interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: string;
  modules: number;
  category: string;
}

function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const subjects: Subject[] = [
    {
      id: 'tafsir',
      title: 'التفسير وعلوم القرآن',
      description: 'دراسة معاني القرآن الكريم وأساليب تفسيره وعلومه المتنوعة من ناسخ ومنسوخ ومحكم ومتشابه وأسباب النزول',
      icon: '📖',
      level: 'السنة الأولى',
      modules: 8,
      category: 'قرآن',
    },
    {
      id: 'hadith',
      title: 'الحديث وعلومه',
      description: 'دراسة السنة النبوية الشريفة وعلوم الحديث ومصطلحاته والجرح والتعديل',
      icon: '📚',
      level: 'السنة الأولى',
      modules: 10,
      category: 'حديث',
    },
    {
      id: 'fiqh',
      title: 'الفقه وأصوله',
      description: 'دراسة الأحكام الشرعية العملية المستمدة من الأدلة التفصيلية وقواعد الاستنباط',
      icon: '⚖️',
      level: 'السنة الأولى',
      modules: 12,
      category: 'فقه',
    },
    {
      id: 'aqidah',
      title: 'العقيدة الإسلامية',
      description: 'دراسة أصول الإيمان والتوحيد والعقيدة الصحيحة وفق منهج أهل السنة والجماعة',
      icon: '🕌',
      level: 'السنة الأولى',
      modules: 6,
      category: 'عقيدة',
    },
    {
      id: 'arabic',
      title: 'اللغة العربية',
      description: 'دراسة النحو والصرف والبلاغة والأدب العربي',
      icon: '✍️',
      level: 'السنة الأولى',
      modules: 9,
      category: 'لغة',
    },
    {
      id: 'sirah',
      title: 'السيرة النبوية',
      description: 'دراسة سيرة النبي محمد صلى الله عليه وسلم ومغازيه وشمائله',
      icon: '🌟',
      level: 'السنة الأولى',
      modules: 7,
      category: 'سيرة',
    },
  ];

  const filteredSubjects = subjects.filter(subject =>
    subject.title.includes(searchQuery) ||
    subject.description.includes(searchQuery) ||
    subject.category.includes(searchQuery)
  );

  return (
    <div className="py-12 animate-fade-in">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            المواد الدراسية
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            استعرض جميع المواد الدراسية المتاحة للسنة الأولى 2025/2026
          </p>

          {/* Search */}
          <div className="max-w-md">
            <Input
              type="search"
              placeholder="ابحث عن مادة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <Card key={subject.id} hover className="group cursor-pointer h-full flex flex-col">
              <CardHeader className="flex-1">
                <div className="text-5xl mb-4">{subject.icon}</div>
                <CardTitle className="text-xl group-hover:text-primary-600 transition-colors mb-2">
                  {subject.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {subject.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                    {subject.level}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {subject.modules} وحدات
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading text-xl font-semibold mb-2">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-muted-foreground">
              جرب البحث بكلمات مختلفة
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default SubjectsPage;
