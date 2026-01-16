import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui';
import { commonCoreInfo, commonCoreDetails } from '@/data/academics/common-core.data';
import { BookOpen, Calendar, Target, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * صفحة الجذع المشترك - السنة الأولى
 * Common Core Page - Year 1
 */
export default function CommonCorePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <Container className="py-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">السنة الأولى - ليسانس</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {commonCoreInfo.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {commonCoreInfo.description}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-card border border-border rounded-lg p-4">
                <Calendar className="w-6 h-6 text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">{commonCoreInfo.duration.years}</div>
                <div className="text-sm text-muted-foreground">سنة دراسية</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <BookOpen className="w-6 h-6 text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">{commonCoreInfo.duration.semesters}</div>
                <div className="text-sm text-muted-foreground">سداسيات</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <Target className="w-6 h-6 text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {commonCoreDetails.semester1.totalCredits + commonCoreDetails.semester2.totalCredits}
                </div>
                <div className="text-sm text-muted-foreground">وحدة دراسية</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <Users className="w-6 h-6 text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">{commonCoreInfo.availableSpecialties.length}</div>
                <div className="text-sm text-muted-foreground">تخصصات متاحة</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Objectives Section */}
      <section className="py-12 border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              أهداف الجذع المشترك
            </h2>
            
            <div className="grid gap-4">
              {commonCoreInfo.objectives.map((objective, index) => (
                <div key={index} className="flex gap-4 items-start bg-card border border-border rounded-lg p-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Semesters Section */}
      <section className="py-12 bg-muted/30">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              المقاييس الدراسية
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Semester 1 */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    {commonCoreDetails.semester1.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {commonCoreDetails.semester1.totalCredits} وحدة
                  </div>
                </div>
                
                <div className="space-y-3">
                  {commonCoreDetails.semester1.modules.map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{module.nameAr}</div>
                        <div className="text-sm text-muted-foreground mt-1">{module.description}</div>
                      </div>
                      <div className="text-sm font-medium text-primary mr-4">
                        {module.credits} وحدات
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semester 2 */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    {commonCoreDetails.semester2.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {commonCoreDetails.semester2.totalCredits} وحدة
                  </div>
                </div>
                
                <div className="space-y-3">
                  {commonCoreDetails.semester2.modules.map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{module.nameAr}</div>
                        <div className="text-sm text-muted-foreground mt-1">{module.description}</div>
                      </div>
                      <div className="text-sm font-medium text-primary mr-4">
                        {module.credits} وحدات
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specialization Choice Section */}
      <section className="py-12 border-t border-border">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {commonCoreDetails.specializationGuidance.title}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {commonCoreDetails.specializationGuidance.description}
            </p>
            
            {/* Criteria */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {commonCoreDetails.specializationGuidance.criteria.map((criterion, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {criterion.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {criterion.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Process */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                خطوات اختيار التخصص
              </h3>
              <div className="space-y-3">
                {commonCoreDetails.specializationGuidance.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-8 flex justify-center">
              <Link
                to="/academics/choose-specialization"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <span>استكشف التخصصات المتاحة</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
