# أمثلة ونماذج الكود: إعادة هيكلة الواجهة الأكاديمية

**المؤلف:** Manus AI Agent  
**التاريخ:** 16 يناير 2026  
**الإصدار:** 1.0

---

## 1. طبقة البيانات (Data Layer)

هذه أمثلة لكيفية بناء ملفات البيانات. يجب أن تكون شاملة وتحتوي على جميع البيانات الفعلية.

### `src/data/academics/degrees.data.ts`

```typescript
import type { Degree } from "@/domain";

export const degreesData: Degree[] = [
  {
    id: "licence-islamic-sciences",
    type: "licence",
    nameAr: "ليسانس العلوم الإسلامية",
    nameEn: "Bachelor in Islamic Sciences",
    description: "برنامج الليسانس في العلوم الإسلامية يمتد لثلاث سنوات...",
    duration: { years: 3, semesters: 6 },
    specialtyIds: [
      "quran-sciences",
      "hadith-sciences",
      "fiqh",
      "aqidah",
      "dawah",
      "sharia-law",
      "arabic-quran",
    ],
    metadata: {
      faculty: "كلية العلوم الإسلامية",
      university: "جامعة الوادي",
      system: "LMD",
    },
  },
  // ... بيانات درجة الماستر
];
```

### `src/data/academics/specialties.data.ts`

```typescript
import type { Specialty } from "@/domain";

export const specialtiesData: Specialty[] = [
  {
    id: "quran-sciences",
    area: "quran-sciences",
    nameAr: "علوم القرآن والقراءات",
    nameEn: "Quranic Sciences and Readings",
    description: "يهدف هذا التخصص إلى تكوين طلبة متمكنين في علوم القرآن...",
    degreeType: "licence",
    objectives: [
      "إتقان علوم القرآن الكريم من حيث النزول والجمع والقراءات.",
      "دراسة القراءات العشر المتواترة وأصولها.",
    ],
    outcomes: ["القدرة على تدريس علوم القرآن.", "إتقان تلاوة القرآن بالقراءات."],
    careerPaths: ["معلم قرآن كريم.", "باحث في الدراسات القرآنية."],
    icon: "📖",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
  },
  // ... بيانات باقي التخصصات
];
```

---

## 2. طبقة الخدمات التطبيقية (App Services)

### `src/app/services/academicService.ts`

```typescript
import {
  createDegreeService,
  createSpecialtyService,
  createModuleService,
} from "@/domain";
import { degreesData } from "@/data/academics/degrees.data";
import { specialtiesData } from "@/data/academics/specialties.data";
import { modulesData } from "@/data/academics/modules.data";

// تهيئة الخدمات مع البيانات الفعلية
const degreeService = createDegreeService(degreesData);
const specialtyService = createSpecialtyService(specialtiesData);
const moduleService = createModuleService(modulesData);

// تجميع الخدمات في كائن واحد لسهولة الاستخدام
export const academicService = {
  degrees: degreeService,
  specialties: specialtyService,
  modules: moduleService,

  // يمكنك إضافة دوال مجمعة هنا
  getSpecialtyWithModules: (specialtyId: string) => {
    const specialty = specialtyService.getSpecialtyById(specialtyId);
    if (!specialty) return null;

    // هذه دالة غير موجودة في الخدمة الأساسية، ولكن يمكن بناؤها هنا
    const modules = moduleService.getAllModules().filter(m => 
        specialty.moduleIds.includes(m.id) // افتراض أن التخصص يحتوي على معرفات المقاييس
    );

    return { ...specialty, modules };
  },
};
```

---

## 3. مكونات الواجهة (UI Components)

### `src/features/programs/DegreePage.tsx`

```typescript
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { academicService } from "@/app/services/academicService";
import { PageHeader, LoadingSpinner, ErrorDisplay, AcademicCard } from "@/shared/ui";

const DegreePage = () => {
  const { degreeId } = useParams<{ degreeId: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["degree", degreeId],
    queryFn: () => {
      if (!degreeId) return null;
      const degree = academicService.degrees.getDegreeById(degreeId);
      if (!degree) throw new Error("Degree not found");

      const specialties = degree.specialtyIds.map(id => 
        academicService.specialties.getSpecialtyById(id)
      ).filter(Boolean);

      return { degree, specialties };
    },
    enabled: !!degreeId, // فقط قم بتشغيل الكويري إذا كان degreeId موجوداً
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay error={error} />;
  if (!data) return null;

  const { degree, specialties } = data;

  return (
    <div>
      <PageHeader
        title={degree.nameAr}
        description={degree.description}
        breadcrumbs={[{ label: "البرامج", href: "/programs" }, { label: degree.nameAr }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {specialties.map((specialty) => (
          <AcademicCard
            key={specialty.id}
            title={specialty.nameAr}
            description={specialty.description}
            icon={specialty.icon}
            href={`/programs/${degreeId}/${specialty.id}`}
            color={specialty.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DegreePage;
```

### `src/features/modules/ModulePage.tsx` (مقتطف)

```typescript
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { academicService, contentService, progressService } from "@/app/services";
import { ModuleShell } from "@/modules/ulum-al-quran"; // إعادة استخدام المكون الحالي
import { useEffect, useState } from "react";

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeUnitId, setActiveUnitId] = useState<string | null>(searchParams.get("unit"));

  // جلب بيانات المقياس
  const { data: moduleData, isLoading, isError } = useQuery({
    queryKey: ["module", moduleId],
    queryFn: () => {
      if (!moduleId) return null;
      const module = academicService.modules.getModuleById(moduleId);
      if (!module) throw new Error("Module not found");
      
      const units = module.unitIds.map(id => academicService.units.getUnitById(id)); // افتراض وجود خدمة للوحدات
      const content = contentService.getContentsByModule(moduleId);
      
      return { module, units, content };
    },
  });

  // جلب تقدم الطالب
  const { data: userProgress } = useQuery({
    queryKey: ["progress", moduleId, "user-1"], // استخدام معرف المستخدم الفعلي
    queryFn: () => progressService.getModuleProgress("user-1", moduleId!),
    enabled: !!moduleId,
  });

  // تحديث الـ URL عند تغيير الوحدة
  useEffect(() => {
    if (activeUnitId) {
      setSearchParams({ unit: activeUnitId });
    } else {
      setSearchParams({});
    }
  }, [activeUnitId, setSearchParams]);

  if (isLoading) return <div>Loading module...</div>;
  if (isError || !moduleData) return <div>Error loading module.</div>;

  return (
    <ModuleShell
      module={moduleData.module} // تمرير بيانات المقياس
      units={moduleData.units}
      content={moduleData.content}
      initialUnitId={activeUnitId}
      onUnitChange={setActiveUnitId}
      progress={userProgress}
    />
  );
};

export default ModulePage;
```

---

## 4. المكونات المشتركة (Shared Components)

### `src/shared/ui/AcademicCard.tsx`

```typescript
import { Link } from "react-router-dom";

interface AcademicCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color?: string; // e.g., 'emerald', 'sky', 'rose'
}

export const AcademicCard = ({ title, description, icon, href, color = 'gray' }: AcademicCardProps) => {
  const colorClasses = {
    emerald: 'from-emerald-50 to-green-100 border-emerald-200',
    sky: 'from-sky-50 to-blue-100 border-sky-200',
    // ... other colors
  };

  return (
    <Link to={href} className={`block p-6 bg-gradient-to-br rounded-lg border ${colorClasses[color]} shadow-sm hover:shadow-lg transition-shadow`}>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 line-clamp-2">{description}</p>
    </Link>
  );
};
```

### `src/shared/ui/Breadcrumbs.tsx`

```typescript
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {item.href ? (
              <Link to={item.href} className="hover:underline hover:text-gray-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```
