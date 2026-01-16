# تحليل معماري شامل لمنصة منهاج - كلية العلوم الإسلامية

## 📋 نظرة عامة

هذا التحليل يهدف إلى إعادة هيكلة منصة منهاج لتكون **أكاديمية بحتة** تعتمد على البيانات (Data-Driven) وتعكس الهيكل الأكاديمي الحقيقي لكلية العلوم الإسلامية.

---

## 1️⃣ تحليل البنية الحالية

### 📁 هيكل المجلدات الحالي

```
src/
├── app/                      # طبقة التطبيق
│   ├── layout/              # التخطيط العام
│   └── router/              # التوجيه
├── domain/                   # طبقة المجال (جديدة، غير مكتملة)
│   └── curriculum/          # بيانات المنهج
├── features/                 # الميزات حسب الوظيفة
│   ├── landing/             # الصفحة الرئيسية
│   ├── lessons/             # الدروس
│   ├── manhaj/              # المنهج
│   ├── modules/             # الوحدات (جديد)
│   └── subjects/            # المقاييس
├── modules/                  # وحدات محددة
│   └── ulum-al-quran/       # وحدة علوم القرآن
├── shared/                   # المشترك
│   ├── data/                # البيانات
│   ├── hooks/               # الخطافات
│   ├── ui/                  # المكونات
│   └── utils/               # الأدوات
└── styles/                   # الأنماط
```

### 🔍 المشاكل المعمارية المحددة

#### 1. **خلط المفاهيم الأكاديمية**
- ❌ `subjects/` و `modules/` و `lessons/` مستخدمة بشكل غير متسق
- ❌ لا يوجد تمييز واضح بين: **Degree → Specialty → Year → Semester → Module**
- ❌ البيانات الأكاديمية مبعثرة في `shared/data/`

#### 2. **عدم وجود هيكل أكاديمي واضح**
```typescript
// الوضع الحالي في modules.ts
export interface Module {
  id: string;
  title: string;
  titleAr: string;
  category: 'sharia' | 'supporting' | 'technical'; // ❌ تصنيف غير أكاديمي
  // ... لا توجد معلومات عن: الدرجة، التخصص، السنة، السداسي
}
```

#### 3. **التوجيه (Routing) غير أكاديمي**
```typescript
// الوضع الحالي
/modules/:moduleId                    // ❌ غير واضح
/modules/english-language             // ❌ حالة خاصة
/modules/ulum-al-quran               // ❌ حالة خاصة أخرى
/manhaj/science/:scienceId           // ❌ مفهوم "science" غامض
```

**المطلوب:**
```typescript
// الهيكل الأكاديمي الصحيح
/programs/licence                                    // الليسانس
/programs/licence/specialties/quran-sciences         // التخصص
/programs/licence/year-1/semester-1                  // السنة والسداسي
/programs/licence/year-1/semester-1/ulum-al-quran   // المقياس
```

#### 4. **طبقة المجال (Domain) غير مكتملة**
- ✅ يوجد `domain/curriculum/` لكنه محدود
- ❌ لا توجد نماذج للدرجات (Degrees)
- ❌ لا توجد نماذج للتخصصات (Specialties)
- ❌ لا توجد نماذج للسنوات والسداسيات

#### 5. **الاقتران الشديد (Tight Coupling)**
```typescript
// مثال: ModuleCard.tsx
<Link to={
  module.id === 'english-language' ? '/modules/english-language'
  : module.id === 'ulum-al-quran' ? '/modules/ulum-al-quran'
  : `/modules/${module.id}`
}>
```
❌ هذا يعني أن كل وحدة جديدة تحتاج تعديل في الكود!

#### 6. **البيانات مختلطة مع واجهة المستخدم**
- ❌ `shared/data/modules.ts` يحتوي على بيانات ثابتة
- ❌ `shared/data/manhajData.ts` يحتوي على بيانات أخرى
- ❌ `shared/data/englishLessons.ts` بيانات خاصة بوحدة واحدة

---

## 2️⃣ البنية المقترحة الجديدة

### 🎯 المبادئ الأساسية

1. **فصل المخاوف (Separation of Concerns)**
   - Domain Layer: المنطق الأكاديمي البحت
   - Data Layer: البيانات الأكاديمية
   - Feature Layer: واجهة المستخدم والتفاعل
   - Shared Layer: المكونات والأدوات المشتركة

2. **التصميم المعتمد على البيانات (Data-Driven)**
   - جميع البيانات الأكاديمية في ملفات JSON/TS منفصلة
   - المكونات تقرأ البيانات وتعرضها فقط
   - سهولة إضافة محتوى جديد بدون تعديل الكود

3. **الهيكل الأكاديمي الصارم**
   ```
   Faculty (كلية العلوم الإسلامية)
     └── Degree (الدرجة: ليسانس / ماستر)
         └── Specialty (التخصص: علوم القرآن، الحديث...)
             └── Academic Year (السنة: 1، 2، 3)
                 └── Semester (السداسي: S1-S6)
                     └── Module (المقياس: علوم القرآن...)
                         └── Unit (الوحدة/الدرس)
   ```

### 📁 الهيكل المقترح

```
src/
├── domain/                          # طبقة المجال - المنطق الأكاديمي البحت
│   ├── academics/
│   │   ├── types/                   # أنواع TypeScript
│   │   │   ├── degree.types.ts      # Degree, DegreeType
│   │   │   ├── specialty.types.ts   # Specialty, SpecialtyArea
│   │   │   ├── academic-year.types.ts
│   │   │   ├── semester.types.ts
│   │   │   ├── module.types.ts      # Module (المقياس)
│   │   │   ├── unit.types.ts        # Unit (الوحدة/الدرس)
│   │   │   └── index.ts
│   │   ├── models/                  # النماذج والمنطق
│   │   │   ├── degree.model.ts
│   │   │   ├── specialty.model.ts
│   │   │   ├── module.model.ts
│   │   │   └── index.ts
│   │   ├── services/                # الخدمات الأكاديمية
│   │   │   ├── degree.service.ts
│   │   │   ├── specialty.service.ts
│   │   │   ├── module.service.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── content/                     # إدارة المحتوى التعليمي
│       ├── types/
│       │   ├── content.types.ts     # PDF, Video, Quiz...
│       │   └── progress.types.ts
│       ├── services/
│       │   ├── content.service.ts
│       │   └── progress.service.ts
│       └── index.ts
│
├── data/                            # طبقة البيانات - البيانات الأكاديمية
│   ├── academics/
│   │   ├── degrees/
│   │   │   ├── licence.data.ts      # بيانات الليسانس
│   │   │   ├── master.data.ts       # بيانات الماستر
│   │   │   └── index.ts
│   │   ├── specialties/
│   │   │   ├── quran-sciences.data.ts
│   │   │   ├── hadith-sciences.data.ts
│   │   │   ├── fiqh.data.ts
│   │   │   ├── aqidah.data.ts
│   │   │   ├── dawah.data.ts
│   │   │   └── index.ts
│   │   ├── modules/
│   │   │   ├── licence/
│   │   │   │   ├── year-1/
│   │   │   │   │   ├── semester-1/
│   │   │   │   │   │   ├── ulum-al-quran.data.ts
│   │   │   │   │   │   ├── fiqh-al-ibadat.data.ts
│   │   │   │   │   │   └── ...
│   │   │   │   │   └── semester-2/
│   │   │   │   ├── year-2/
│   │   │   │   └── year-3/
│   │   │   └── master/
│   │   └── index.ts
│   └── content/                     # محتوى تعليمي إضافي
│       └── resources/
│
├── features/                        # طبقة الميزات - واجهة المستخدم
│   ├── programs/                    # البرامج الأكاديمية
│   │   ├── pages/
│   │   │   ├── ProgramsPage.tsx     # قائمة البرامج
│   │   │   ├── DegreePage.tsx       # صفحة الدرجة
│   │   │   ├── SpecialtyPage.tsx    # صفحة التخصص
│   │   │   └── YearSemesterPage.tsx # صفحة السنة/السداسي
│   │   ├── components/
│   │   │   ├── DegreeCard.tsx
│   │   │   ├── SpecialtyCard.tsx
│   │   │   ├── SemesterGrid.tsx
│   │   │   └── ...
│   │   └── index.ts
│   │
│   ├── modules/                     # المقاييس (Modules)
│   │   ├── pages/
│   │   │   ├── ModulePage.tsx       # صفحة المقياس العامة
│   │   │   ├── ModuleOverviewPage.tsx
│   │   │   ├── ModuleContentPage.tsx
│   │   │   └── ModuleResourcesPage.tsx
│   │   ├── components/
│   │   │   ├── ModuleHeader.tsx
│   │   │   ├── ModuleSidebar.tsx
│   │   │   ├── ModuleContent/
│   │   │   │   ├── PDFViewer.tsx
│   │   │   │   ├── VideoPlayer.tsx
│   │   │   │   ├── QuizRenderer.tsx
│   │   │   │   └── ...
│   │   │   ├── ModuleProgress.tsx
│   │   │   └── ...
│   │   └── index.ts
│   │
│   ├── landing/                     # الصفحة الرئيسية
│   ├── search/                      # البحث
│   └── profile/                     # الملف الشخصي
│
├── app/                             # طبقة التطبيق
│   ├── router/
│   │   ├── routes.config.ts         # تكوين المسارات
│   │   ├── academic.routes.tsx      # مسارات أكاديمية
│   │   └── index.tsx
│   ├── layout/
│   │   ├── RootLayout.tsx
│   │   ├── AcademicLayout.tsx       # تخطيط للصفحات الأكاديمية
│   │   └── ...
│   └── providers/
│       ├── AcademicProvider.tsx
│       └── ...
│
├── shared/                          # المشترك
│   ├── ui/                          # مكونات UI عامة
│   ├── hooks/                       # خطافات مشتركة
│   ├── utils/                       # أدوات مساعدة
│   └── constants/                   # ثوابت
│
└── content/                         # المحتوى التعليمي الثابت
    └── modules/
        ├── ulum-al-quran/
        │   ├── pdfs/
        │   ├── summaries/
        │   └── manifest.json
        └── ...
```

---

## 3️⃣ نماذج البيانات (Data Models)

### 📊 TypeScript Interfaces

```typescript
// domain/academics/types/degree.types.ts

/**
 * نوع الدرجة الأكاديمية
 */
export type DegreeType = 'licence' | 'master';

/**
 * الدرجة الأكاديمية (ليسانس أو ماستر)
 */
export interface Degree {
  id: string;
  type: DegreeType;
  nameAr: string;
  nameEn: string;
  description: string;
  duration: {
    years: number;
    semesters: number;
  };
  specialties: string[]; // IDs of specialties
  metadata: {
    faculty: string;
    university: string;
    system: 'LMD';
  };
}

// domain/academics/types/specialty.types.ts

/**
 * مجال التخصص
 */
export type SpecialtyArea =
  | 'quran-sciences'      // علوم القرآن
  | 'hadith-sciences'     // الحديث وعلومه
  | 'fiqh'                // الفقه وأصوله
  | 'aqidah'              // العقيدة
  | 'dawah'               // الدعوة والثقافة الإسلامية
  | 'sharia-law'          // الشريعة والقانون
  | 'arabic-quran';       // اللغة العربية والدراسات القرآنية

/**
 * التخصص الأكاديمي
 */
export interface Specialty {
  id: string;
  area: SpecialtyArea;
  nameAr: string;
  nameEn: string;
  description: string;
  degreeType: DegreeType;
  objectives: string[];
  careerPaths: string[];
  icon: string;
  color: string;
}

// domain/academics/types/academic-year.types.ts

/**
 * السنة الأكاديمية
 */
export interface AcademicYear {
  id: string;
  yearNumber: number; // 1, 2, 3
  degreeId: string;
  specialtyId?: string; // optional for common core years
  semesters: string[]; // IDs of semesters
}

// domain/academics/types/semester.types.ts

/**
 * السداسي
 */
export interface Semester {
  id: string;
  semesterNumber: number; // 1-6 for licence, 1-4 for master
  yearId: string;
  modules: string[]; // IDs of modules
  totalCredits: number;
}

// domain/academics/types/module.types.ts

/**
 * نوع المقياس
 */
export type ModuleType =
  | 'fundamental'   // أساسي
  | 'methodology'   // منهجي
  | 'discovery'     // استكشافي
  | 'transversal'   // أفقي
  | 'optional';     // اختياري

/**
 * المقياس (Course/Module)
 */
export interface Module {
  id: string;
  code: string; // e.g., "UEF-111"
  nameAr: string;
  nameEn: string;
  description: string;
  type: ModuleType;
  credits: number;
  weeklyHours: {
    lecture: number;    // محاضرة
    tutorial: number;   // أعمال موجهة
    practical: number;  // أعمال تطبيقية
  };
  semesterId: string;
  prerequisites: string[]; // IDs of prerequisite modules
  objectives: string[];
  outcomes: string[];
  units: Unit[];
  resources: Resource[];
  assessment: {
    continuous: number;  // التقييم المستمر (%)
    exam: number;        // الامتحان (%)
  };
  instructor?: {
    name: string;
    title: string;
  };
}

// domain/academics/types/unit.types.ts

/**
 * الوحدة التعليمية (Lesson/Unit)
 */
export interface Unit {
  id: string;
  moduleId: string;
  order: number;
  titleAr: string;
  titleEn: string;
  description: string;
  duration: number; // in hours
  content: UnitContent[];
  objectives: string[];
  keywords: string[];
}

/**
 * محتوى الوحدة
 */
export interface UnitContent {
  id: string;
  type: 'pdf' | 'video' | 'quiz' | 'reading' | 'exercise';
  title: string;
  path: string; // relative path in content folder
  metadata?: {
    pages?: number;
    duration?: number;
    size?: string;
  };
}

// domain/content/types/progress.types.ts

/**
 * تتبع التقدم
 */
export interface Progress {
  userId: string;
  moduleId: string;
  completedUnits: string[];
  lastAccessedUnit?: string;
  progress: number; // 0-100
  startedAt: Date;
  lastUpdatedAt: Date;
}
```

---

## 4️⃣ استراتيجية التوجيه (Routing Strategy)

### 🛤️ المسارات الأكاديمية

```typescript
// app/router/routes.config.ts

export const ACADEMIC_ROUTES = {
  // الصفحة الرئيسية
  HOME: '/',
  
  // البرامج
  PROGRAMS: '/programs',
  
  // الدرجات
  DEGREE: '/programs/:degreeType', // licence | master
  
  // التخصصات
  SPECIALTIES: '/programs/:degreeType/specialties',
  SPECIALTY: '/programs/:degreeType/specialties/:specialtyId',
  
  // السنوات والسداسيات
  YEAR: '/programs/:degreeType/year-:yearNumber',
  SEMESTER: '/programs/:degreeType/year-:yearNumber/semester-:semesterNumber',
  
  // المقاييس
  MODULE: '/programs/:degreeType/year-:yearNumber/semester-:semesterNumber/:moduleId',
  MODULE_OVERVIEW: '/programs/:degreeType/year-:yearNumber/semester-:semesterNumber/:moduleId/overview',
  MODULE_CONTENT: '/programs/:degreeType/year-:yearNumber/semester-:semesterNumber/:moduleId/content',
  MODULE_RESOURCES: '/programs/:degreeType/year-:yearNumber/semester-:semesterNumber/:moduleId/resources',
  
  // الوحدات
  UNIT: '/programs/:degreeType/year-:yearNumber/semester-:semesterNumber/:moduleId/units/:unitId',
} as const;
```

### 📝 أمثلة على المسارات

```
✅ /programs
   → قائمة البرامج (ليسانس، ماستر)

✅ /programs/licence
   → صفحة الليسانس (نظرة عامة، التخصصات، السنوات)

✅ /programs/licence/specialties
   → قائمة تخصصات الليسانس

✅ /programs/licence/specialties/quran-sciences
   → صفحة تخصص علوم القرآن

✅ /programs/licence/year-1/semester-1
   → صفحة السداسي الأول من السنة الأولى (قائمة المقاييس)

✅ /programs/licence/year-1/semester-1/ulum-al-quran
   → صفحة مقياس علوم القرآن

✅ /programs/licence/year-1/semester-1/ulum-al-quran/overview
   → نظرة عامة على المقياس

✅ /programs/licence/year-1/semester-1/ulum-al-quran/content
   → محتوى المقياس (الوحدات والدروس)

✅ /programs/licence/year-1/semester-1/ulum-al-quran/units/unit-1
   → وحدة محددة من المقياس
```

---

## 5️⃣ خطة الترحيل (Migration Plan)

### 🔄 المرحلة 1: إنشاء طبقة المجال (Domain Layer)

**الهدف:** إنشاء الأساس الأكاديمي بدون كسر الكود الحالي

**الخطوات:**
1. ✅ إنشاء `domain/academics/types/` مع جميع الأنواع
2. ✅ إنشاء `domain/academics/models/` مع النماذج
3. ✅ إنشاء `domain/academics/services/` مع الخدمات
4. ✅ اختبار الأنواع والنماذج

**الملفات المتأثرة:** لا شيء (إضافة فقط)

### 🔄 المرحلة 2: إنشاء طبقة البيانات (Data Layer)

**الهدف:** نقل البيانات من `shared/data/` إلى `data/academics/`

**الخطوات:**
1. ✅ إنشاء `data/academics/degrees/licence.data.ts`
2. ✅ إنشاء `data/academics/specialties/` لكل تخصص
3. ✅ تحويل `shared/data/modules.ts` إلى الهيكل الجديد
4. ✅ إنشاء بيانات السنوات والسداسيات

**الملفات المتأثرة:**
- `shared/data/modules.ts` → سيتم الاستبدال تدريجياً
- `shared/data/manhajData.ts` → سيتم دمجه في البنية الجديدة

### 🔄 المرحلة 3: تحديث نظام التوجيه (Routing)

**الهدف:** تطبيق المسارات الأكاديمية الجديدة

**الخطوات:**
1. ✅ إنشاء `app/router/routes.config.ts`
2. ✅ إنشاء `app/router/academic.routes.tsx`
3. ✅ تحديث `app/router/index.tsx` لدعم المسارات الجديدة
4. ✅ إضافة redirects من المسارات القديمة للجديدة

**الملفات المتأثرة:**
- `app/router/index.tsx` → تحديث كبير
- جميع مكونات `Link` في المشروع → تحديث المسارات

### 🔄 المرحلة 4: إنشاء صفحات البرامج

**الهدف:** إنشاء الصفحات الأكاديمية الجديدة

**الخطوات:**
1. ✅ إنشاء `features/programs/pages/ProgramsPage.tsx`
2. ✅ إنشاء `features/programs/pages/DegreePage.tsx`
3. ✅ إنشاء `features/programs/pages/SpecialtyPage.tsx`
4. ✅ إنشاء `features/programs/pages/YearSemesterPage.tsx`
5. ✅ إنشاء المكونات المشتركة

**الملفات المتأثرة:** لا شيء (إضافة فقط)

### 🔄 المرحلة 5: إعادة بناء صفحة المقياس

**الهدف:** تحويل `modules/ulum-al-quran/` للبنية الجديدة

**الخطوات:**
1. ✅ إنشاء `features/modules/pages/ModulePage.tsx` (عامة)
2. ✅ نقل مكونات `modules/ulum-al-quran/components/` إلى `features/modules/components/`
3. ✅ تحديث المكونات لاستخدام البيانات من `domain/academics/`
4. ✅ تحديث المسارات

**الملفات المتأثرة:**
- `modules/ulum-al-quran/` → سيتم دمجه في `features/modules/`
- `features/modules/UlumAlQuranPage.tsx` → سيتم استبداله بـ `ModulePage.tsx`

### 🔄 المرحلة 6: تنظيف وتحسين

**الهدف:** إزالة الكود القديم والتحسين

**الخطوات:**
1. ✅ حذف `shared/data/modules.ts` (بعد نقل البيانات)
2. ✅ حذف `features/subjects/` (مستبدل بـ `features/programs/`)
3. ✅ حذف `features/manhaj/` (مدمج في البنية الجديدة)
4. ✅ تحديث جميع الروابط القديمة
5. ✅ اختبار شامل

---

## 6️⃣ إعادة بناء صفحة علوم القرآن

### 📖 الهيكل المقترح لصفحة المقياس

```typescript
// features/modules/pages/ModulePage.tsx

/**
 * صفحة المقياس العامة - تعمل لجميع المقاييس
 * تستقبل البيانات من domain/academics/
 */
export function ModulePage() {
  const { degreeType, yearNumber, semesterNumber, moduleId } = useParams();
  const module = useModule(moduleId); // من domain/academics/services/
  
  return (
    <AcademicLayout>
      <ModuleBreadcrumb module={module} />
      <ModuleHeader module={module} />
      
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3">
          <ModuleSidebar module={module} />
        </aside>
        
        {/* Main Content */}
        <main className="col-span-9">
          <Routes>
            <Route index element={<ModuleOverview module={module} />} />
            <Route path="content" element={<ModuleContent module={module} />} />
            <Route path="resources" element={<ModuleResources module={module} />} />
            <Route path="units/:unitId" element={<UnitPage module={module} />} />
          </Routes>
        </main>
      </div>
    </AcademicLayout>
  );
}
```

### 📋 أقسام صفحة المقياس

#### 1. **نظرة عامة (Overview)**
- تعريف المقياس
- الأهداف التعليمية
- المخرجات المتوقعة
- معلومات الأستاذ
- التقييم

#### 2. **المحتوى (Content)**
- قائمة الوحدات التعليمية
- تتبع التقدم
- الوحدة الحالية
- الوحدات المكتملة

#### 3. **الموارد (Resources)**
- ملفات PDF
- فيديوهات
- ملخصات
- مراجع إضافية

#### 4. **الوحدة (Unit)**
- عارض المحتوى (PDF/Video/Quiz)
- جدول المحتويات
- التنقل بين الوحدات
- وضع علامة كمكتمل

---

## 7️⃣ التوصيات والخطوات التالية

### ✅ الأولويات

1. **عالية الأولوية**
   - [ ] إنشاء طبقة المجال الكاملة
   - [ ] إنشاء بيانات الليسانس والتخصصات
   - [ ] تحديث نظام التوجيه
   - [ ] إنشاء صفحات البرامج الأساسية

2. **متوسطة الأولوية**
   - [ ] إعادة بناء صفحة علوم القرآن
   - [ ] نقل المكونات المشتركة
   - [ ] تحديث جميع الروابط

3. **منخفضة الأولوية**
   - [ ] تنظيف الكود القديم
   - [ ] تحسين الأداء
   - [ ] إضافة اختبارات

### 📚 التوثيق المطلوب

1. **دليل المطور**
   - كيفية إضافة تخصص جديد
   - كيفية إضافة مقياس جديد
   - كيفية إضافة محتوى لمقياس موجود

2. **دليل البنية**
   - شرح طبقة المجال
   - شرح طبقة البيانات
   - شرح نظام التوجيه

---

## 📊 الخلاصة

### ✅ ما سيتم الحفاظ عليه
- ✅ جميع المكونات في `shared/ui/`
- ✅ التصميم والأنماط الحالية
- ✅ محتوى علوم القرآن الموجود
- ✅ نظام التخطيط (Layout)

### 🔄 ما سيتم تحديثه
- 🔄 نظام التوجيه بالكامل
- 🔄 بنية البيانات
- 🔄 صفحات الميزات

### ❌ ما سيتم حذفه
- ❌ `features/subjects/` (مستبدل)
- ❌ `features/manhaj/` (مدمج)
- ❌ `shared/data/modules.ts` (مستبدل)

---

**التاريخ:** 16 يناير 2026  
**الحالة:** 📋 تحليل مكتمل - جاهز للتنفيذ  
**المرحلة التالية:** إنشاء طبقة المجال والبيانات
