import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui';
import { specialtiesData } from '@/data/academics/specialties.data';
import { ArrowRight, BookOpen, GraduationCap, Briefcase, Search } from 'lucide-react';

/**
 * صفحة اختيار التخصص
 * Specialization Choice Page
 */
export default function SpecializationChoicePage() {
  // Filter only Licence specializations
  const licenceSpecialties = specialtiesData.filter((s: any) => s.degreeId === 'licence-islamic-sciences');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <Container className="py-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">اختيار التخصص - السنة الثانية</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              اختر تخصصك الأكاديمي
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              بعد إتمام السنة الأولى (الجذع المشترك) بنجاح، حان الوقت لاختيار تخصصك الذي ستتعمق فيه خلال السنتين القادمتين. اختر التخصص الذي يتناسب مع ميولك العلمية وأهدافك المهنية.
            </p>
          </div>
        </Container>
      </section>

      {/* Guidance Section */}
      <section className="py-12 border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              كيف تختار التخصص المناسب؟
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  الميول العلمية
                </h3>
                <p className="text-muted-foreground">
                  راجع المقاييس التي استمتعت بدراستها في السنة الأولى وحصلت فيها على أفضل النتائج
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  الآفاق الأكاديمية
                </h3>
                <p className="text-muted-foreground">
                  تعرف على مسارات الماستر المتاحة لكل تخصص وإمكانية مواصلة الدراسات العليا
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  الآفاق المهنية
                </h3>
                <p className="text-muted-foreground">
                  اطلع على الفرص الوظيفية والمهنية المتاحة لخريجي كل تخصص
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specializations Grid */}
      <section className="py-12">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                التخصصات المتاحة ({licenceSpecialties.length})
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {licenceSpecialties.map((specialty: any) => (
                <Link
                  key={specialty.id}
                  to={`/academics/licence-islamic-sciences/${specialty.id}`}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {specialty.nameAr}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {specialty.nameEn}
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mr-4" />
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {specialty.description}
                  </p>

                  {/* Master Pathways */}
                  {specialty.masterPathways && specialty.masterPathways.length > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          مسارات الماستر المتاحة:
                        </span>
                      </div>
                      <div className="text-sm text-foreground">
                        {specialty.masterPathways.map((pathwayId: string, index: number) => {
                          const masterSpecialty = specialtiesData.find((s: any) => s.id === pathwayId);
                          return (
                            <div key={pathwayId}>
                              {masterSpecialty?.nameAr}
                              {index < specialty.masterPathways!.length - 1 && ' • '}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Research Areas */}
                  {specialty.researchAreas && specialty.researchAreas.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">مجالات البحث:</span>
                        <span className="mr-2">
                          {specialty.researchAreas.slice(0, 2).join(' • ')}
                          {specialty.researchAreas.length > 2 && '...'}
                        </span>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              هل تحتاج إلى مساعدة في الاختيار؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              استشر الأساتذة والمرشدين الأكاديميين، واحضر جلسات التوجيه المتاحة
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/academics/pathways"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <span>استكشف المسارات الأكاديمية</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/academics/licence-islamic-sciences/common-core"
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:border-primary/50 transition-colors"
              >
                <span>العودة إلى الجذع المشترك</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
