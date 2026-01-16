# Prompt التنفيذ الكامل: إعادة هيكلة واجهة المستخدم الأكاديمية

**المهمة:** بصفتك خبير تطوير واجهات أمامية (Frontend Expert) باستخدام React و TypeScript، قم بتنفيذ إعادة هيكلة كاملة لواجهة المستخدم لمنصة "منهاج" لتتوافق مع البنية الأكاديمية الجديدة. يجب عليك استخدام طبقة المجال (Domain Layer) الموجودة وطبقة بيانات (Data Layer) سيتم توفيرها، مع اتباع أفضل الممارسات في التصميم والكود.

---

## المرحلة 1: إعداد البيئة وإنشاء طبقة البيانات (Data Layer)

### 1.1. تثبيت الاعتماديات

تأكد من تثبيت الاعتماديات التالية لإدارة الحالة وجلب البيانات:

```bash
pnpm install zustand @tanstack/react-query
```

### 1.2. إنشاء طبقة البيانات (Data Layer)

أنشئ مجلداً جديداً `src/data` وضع فيه الملفات التالية التي تحتوي على البيانات الأكاديمية الكاملة. **هذه البيانات هي مصدر الحقيقة الوحيد.**

-   `src/data/academics/degrees.data.ts`: يحتوي على بيانات درجتي الليسانس والماستر.
-   `src/data/academics/specialties.data.ts`: يحتوي على بيانات التخصصات السبعة.
-   `src/data/academics/semesters.data.ts`: يحتوي على بيانات جميع السداسيات.
-   `src/data/academics/modules.data.ts`: يحتوي على بيانات جميع المقاييس لكل سداسي.
-   `src/data/academics/units.data.ts`: يحتوي على بيانات الوحدات التعليمية لكل مقياس.
-   `src/data/content/content.data.ts`: يحتوي على بيانات المحتوى التعليمي (PDFs, Videos, etc.).

### 1.3. إنشاء طبقة الخدمات (App Services)

أنشئ مجلداً `src/app/services` لتهيئة خدمات المجال مع البيانات الفعلية. هذا يفصل بين منطق المجال والبيانات.

-   `src/app/services/academicService.ts`: قم بإنشاء نسخة من `DegreeService`, `SpecialtyService`, `ModuleService` وتمرير البيانات لها من طبقة البيانات.
-   `src/app/services/contentService.ts`: قم بإنشاء نسخة من `ContentService` و `ProgressService`.

---

## المرحلة 2: إعادة هيكلة نظام التوجيه (Routing)

قم بتعديل ملف `src/app/router/index.tsx` ليعكس الهيكل الأكاديمي الجديد. استخدم `React.lazy` للتحميل الكسول لجميع الصفحات.

```typescript
// src/app/router/index.tsx

// ... imports
const ProgramsPage = React.lazy(() => import("../../features/programs/ProgramsPage"));
const DegreePage = React.lazy(() => import("../../features/programs/DegreePage"));
const SpecialtyPage = React.lazy(() => import("../../features/programs/SpecialtyPage"));
const ModulePage = React.lazy(() => import("../../features/modules/ModulePage")); // إعادة تسمية UlumAlQuranPage

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // ... other routes
      {
        path: "programs",
        element: <ProgramsPage />,
      },
      {
        path: "programs/:degreeId",
        element: <DegreePage />,
      },
      {
        path: "programs/:degreeId/:specialtyId",
        element: <SpecialtyPage />,
      },
      {
        path: "modules/:moduleId", // مسار المقياس الموحد
        element: <ModulePage />,
      },
      // ...
    ],
  },
]);
```

---

## المرحلة 3: بناء المكونات المشتركة (Shared Components)

أنشئ المكونات التالية في `src/shared/ui` لتكون قابلة لإعادة الاستخدام في جميع الصفحات الأكاديمية.

-   **`AcademicCard.tsx`:** مكون بطاقة عام يمكن استخدامه لعرض (الدرجة، التخصص، المقياس) مع props لتخصيص المحتوى (العنوان، الوصف، الأيقونة، الرابط).
-   **`Breadcrumbs.tsx`:** مكون لعرض مسار التنقل (e.g., `البرامج > ليسانس > علوم القرآن`).
-   **`PageHeader.tsx`:** مكون رأس صفحة موحد يعرض العنوان والوصف ومسار التنقل.
-   **`LoadingSpinner.tsx`:** مؤشر تحميل.
-   **`ErrorDisplay.tsx`:** مكون لعرض رسائل الخطأ مع زر إعادة المحاولة.
-   **`EmptyState.tsx`:** مكون لعرض حالة عدم وجود بيانات.

---

## المرحلة 4: بناء الصفحات الأكاديمية

أنشئ مجلداً جديداً `src/features/programs` وابدأ في بناء الصفحات.

### 4.1. `ProgramsPage.tsx`

-   **الجلب:** استخدم `academicService` لجلب جميع الدرجات (`getAllDegreeSummaries`).
-   **العرض:** استخدم `AcademicCard` لعرض بطاقتين (ليسانس وماستر) داخل شبكة (Grid).
-   **التنقل:** يجب أن توجه كل بطاقة إلى `/programs/:degreeId`.

### 4.2. `DegreePage.tsx`

-   **الجلب:**
    -   استخدم `useParams` للحصول على `degreeId`.
    -   استخدم `academicService` لجلب تفاصيل الدرجة والتخصصات المرتبطة بها.
-   **العرض:**
    -   استخدم `PageHeader` و `Breadcrumbs`.
    -   اعرض قائمة بالتخصصات باستخدام `AcademicCard`.
-   **التنقل:** يجب أن توجه كل بطاقة تخصص إلى `/programs/:degreeId/:specialtyId`.

### 4.3. `SpecialtyPage.tsx`

-   **الجلب:**
    -   استخدم `useParams` للحصول على `degreeId` و `specialtyId`.
    -   استخدم `academicService` لجلب تفاصيل التخصص والخطة الدراسية الكاملة (السنوات، السداسيات، المقاييس).
-   **العرض:**
    -   استخدم `PageHeader` لعرض معلومات التخصص (الأهداف، المخرجات).
    -   استخدم مكون `Tabs` من `shadcn/ui` لعرض السنوات والسداسيات.
    -   اعرض المقاييس لكل سداسي في قائمة، مع تمييز نوع المقياس (أساسي، منهجي...) بلون مختلف.
-   **التنقل:** يجب أن يوجه كل مقياس إلى `/modules/:moduleId`.

### 4.4. `ModulePage.tsx` (إعادة هيكلة `UlumAlQuranPage`)

-   **إعادة التسمية:** قم بإعادة تسمية `UlumAlQuranPage.tsx` إلى `ModulePage.tsx` ليكون عاماً.
-   **الجلب الديناميكي:**
    -   استخدم `useParams` للحصول على `moduleId`.
    -   استخدم `academicService` و `contentService` لجلب جميع بيانات المقياس (التفاصيل، الوحدات، المحتوى، الموارد).
    -   استخدم `useQuery` من `@tanstack/react-query` لإدارة عملية الجلب.
-   **إدارة الحالة:**
    -   استخدم `useState` لإدارة الوحدة النشطة حالياً.
    -   استخدم `useSearchParams` لتحديث الـ URL عند تغيير الوحدة (e.g., `?unit=unit-1`).
-   **العرض:**
    -   يجب أن تظل بنية الصفحة كما هي (`ModuleShell`) ولكن يجب أن يتم تغذيتها بالبيانات الديناميكية.
    -   عرض قائمة الوحدات في الشريط الجانبي.
    -   عند اختيار وحدة، اعرض محتوياتها في الجزء الرئيسي.

---

## المرحلة 5: إدارة الحالة وتتبع التقدم

### 5.1. إنشاء مخزن الحالة (Zustand Store)

-   أنشئ مخزناً في `src/app/stores/userStore.ts` لإدارة حالة المستخدم الحالي (e.g., `userId`, `name`).

### 5.2. التكامل مع `ProgressService`

-   في `ModulePage.tsx`، استخدم `ProgressService` لجلب تقدم الطالب في المقياس.
-   عندما يكمل الطالب وحدة أو محتوى، قم باستدعاء الدوال المناسبة من `ProgressService` (e.g., `markUnitCompleted`).
-   اعرض نسبة التقدم بشكل مرئي في واجهة المستخدم.

---

## المرحلة 6: الاختبار والتوثيق النهائي

### 6.1. الاختبار

-   تأكد من أن جميع الصفحات تعمل بشكل صحيح وتتعامل مع حالات التحميل والخطأ والفراغ.
-   اختبر التنقل بين جميع الصفحات.
-   تأكد من أن تتبع التقدم يعمل كما هو متوقع.

### 6.2. التوثيق

-   قم بتحديث `README.md` ليعكس البنية الجديدة للمشروع.
-   أضف تعليقات JSDoc إلى المكونات والصفحات الرئيسية لشرح وظيفتها والـ props التي تتلقاها.

---

## معايير النجاح (Definition of Done)

-   [ ] تم إنشاء طبقة البيانات والخدمات التطبيقية.
-   [ ] تم تحديث نظام التوجيه بالكامل.
-   [ ] تم بناء جميع الصفحات الأكاديمية (Programs, Degree, Specialty, Module).
-   [ ] جميع الصفحات ديناميكية وتعتمد على البيانات.
-   [ ] تم دمج نظام تتبع التقدم.
-   [ ] الكود نظيف، موثق، ويجتاز جميع اختبارات `ESLint` و `TypeScript`.
-   [ ] المشروع يعمل بشكل كامل محلياً بدون أخطاء.
