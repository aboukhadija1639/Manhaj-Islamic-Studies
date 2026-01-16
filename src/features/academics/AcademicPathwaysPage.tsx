import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui';
import { academicPathways } from '@/data/academics/pathways.data';
import { specialtiesData } from '@/data/academics/specialties.data';
import { ArrowRight, GraduationCap, Briefcase, Search, TrendingUp } from 'lucide-react';

/**
 * صفحة المسارات الأكاديمية (ليسانس → ماستر)
 * Academic Pathways Page (Licence → Master)
 */
export default function AcademicPathwaysPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <Container className="py-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">المسارات الأكاديمية</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              من الليسانس إلى الماستر
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              اكتشف المسارات الأكاديمية المتاحة من تخصصات الليسانس إلى برامج الماستر، مع معلومات مفصلة عن الآفاق المهنية ومجالات البحث لكل مسار.
            </p>
          </div>
        </Container>
      </section>

      {/* Pathways Section */}
      <section className="py-12">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              المسارات الأكاديمية ({academicPathways.length})
            </h2>
            
            <div className="space-y-8">
              {academicPathways.map((pathway) => {
                const licenceSpecialty = specialtiesData.find((s: any) => s.id === pathway.licenceSpecialtyId);
                const masterSpecialties = pathway.masterSpecialtyIds.map((id: string) => 
                  specialtiesData.find((s: any) => s.id === id)
                ).filter(Boolean);

                return (
                  <div
                    key={pathway.id}
                    className="bg-card border border-border rounded-xl p-8"
                  >
                    {/* Pathway Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                            ليسانس
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                          <div className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                            ماستر
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {licenceSpecialty?.nameAr}
                          <ArrowRight className="inline-block w-6 h-6 mx-3 text-primary" />
                          {masterSpecialties.map(m => m?.nameAr).join(' / ')}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {pathway.description}
                    </p>

                    {/* Requirements */}
                    <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-bold text-foreground mb-4">
                        شروط الالتحاق بالماستر
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">المعدل الأدنى</div>
                          <div className="text-2xl font-bold text-primary">
                            {pathway.requirements.minimumGrade}/20
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">المقاييس المطلوبة</div>
                          <div className="text-sm text-foreground">
                            {pathway.requirements.requiredModules?.length || 0} مقياس
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">المهارات المطلوبة</div>
                          <div className="text-sm text-foreground">
                            {pathway.requirements.requiredSkills?.length || 0} مهارة
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Career Outlooks */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-bold text-foreground">
                          الآفاق المهنية ({pathway.careerOutlooks.length})
                        </h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        {pathway.careerOutlooks.map((career, index) => (
                          <div
                            key={index}
                            className="bg-background border border-border rounded-lg p-4"
                          >
                            <h5 className="font-bold text-foreground mb-2">
                              {career.title}
                            </h5>
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                              {career.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {career.sectors.slice(0, 2).map((sector, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                                >
                                  {sector}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Research Areas */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Search className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-bold text-foreground">
                          مجالات البحث
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pathway.researchAreas.map((area, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-muted border border-border text-foreground text-sm rounded-lg"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-6 border-t border-border flex gap-4">
                      <Link
                        to={`/academics/licence-islamic-sciences/${pathway.licenceSpecialtyId}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border text-foreground rounded-lg text-sm font-medium hover:border-primary/50 transition-colors"
                      >
                        <span>تفاصيل تخصص الليسانس</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      {masterSpecialties.map(master => master && (
                        <Link
                          key={master.id}
                          to={`/academics/master-islamic-sciences/${master.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                        >
                          <span>تفاصيل تخصص الماستر</span>
                          <GraduationCap className="w-4 h-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              جاهز لاختيار مسارك الأكاديمي؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              ابدأ بالتعرف على التخصصات المتاحة في الليسانس
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/academics/choose-specialization"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <span>اختر تخصص الليسانس</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/academics"
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:border-primary/50 transition-colors"
              >
                <span>العودة إلى الصفحة الرئيسية</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
