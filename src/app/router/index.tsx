import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import { Container, Skeleton } from '../../shared/ui';

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('../../features/landing/LandingPage'));
const SubjectsPage = lazy(() => import('../../features/subjects/SubjectsPageEnhanced'));
const ModuleDetailPage = lazy(() => import('../../features/subjects/ModuleDetailPage'));
const AboutPage = lazy(() => import('../../features/landing/AboutPage'));
const NotFoundPage = lazy(() => import('../../features/landing/NotFoundPage'));
const EnglishModulePage = lazy(() => import('../../features/lessons/EnglishModulePage'));
const LessonPage = lazy(() => import('../../features/lessons/LessonPage'));
const ManhajOverviewPage = lazy(() => import('../../features/manhaj/ManhajOverviewPage'));
const CurriculumMapPage = lazy(() => import('../../features/manhaj/CurriculumMapPage'));
const EnhancedCurriculumMap = lazy(() => import('../../features/manhaj/EnhancedCurriculumMap'));
const ScienceDetailPage = lazy(() => import('../../features/manhaj/ScienceDetailPage'));

// New Programs Pages
const ProgramsPage = lazy(() => import('../../features/programs/ProgramsPage'));
const ProgramDetailPage = lazy(() => import('../../features/programs/ProgramDetailPage'));
const MasterProgramsPage = lazy(() => import('../../features/programs/MasterProgramsPage'));

// Subject Detail Page
const SubjectDetailPage = lazy(() => import('../../features/subjects/SubjectDetailPage'));

// Academic Structure Pages
const DegreesPage = lazy(() => import('../../features/academics/DegreesPage'));
const CommonCorePage = lazy(() => import('../../features/academics/CommonCorePage'));
const SpecializationChoicePage = lazy(() => import('../../features/academics/SpecializationChoicePage'));
const AcademicPathwaysPage = lazy(() => import('../../features/academics/AcademicPathwaysPage'));
const DegreeDetailPage = lazy(() => import('../../features/academics/DegreeDetailPage'));
const SpecialtyDetailPage = lazy(() => import('../../features/academics/SpecialtyDetailPage'));
const AcademicYearPage = lazy(() => import('../../features/academics/AcademicYearPage'));
const SemesterPage = lazy(() => import('../../features/academics/SemesterPage'));
const AcademicModulePage = lazy(() => import('../../features/academics/AcademicModulePage'));

// Loading component
function PageLoader() {
  return (
    <div className="py-12 animate-fade-in">
      <Container>
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </Container>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      
      // ========== Programs Routes (Main Entry Point) ==========
      
      // Programs Overview
      {
        path: 'programs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProgramsPage />
          </Suspense>
        ),
      },
      
      // Master Programs Overview
      {
        path: 'programs/master',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MasterProgramsPage />
          </Suspense>
        ),
      },
      
      // Individual Program Detail (Licence, Master specializations, Doctorate)
      {
        path: 'programs/:programId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProgramDetailPage />
          </Suspense>
        ),
      },
      
      // ========== Subject Detail Routes ==========
      
      // Subject Detail Page
      {
        path: 'subjects/:subjectId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SubjectDetailPage />
          </Suspense>
        ),
      },
      
      // ========== Curriculum Map ==========
      
      {
        path: 'curriculum',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EnhancedCurriculumMap />
          </Suspense>
        ),
      },
      
      // ========== Academic Structure Routes (Legacy/Advanced) ==========
      
      // Degrees List
      {
        path: 'academics',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DegreesPage />
          </Suspense>
        ),
      },
      
      // Common Core Page
      {
        path: 'academics/licence-islamic-sciences/common-core',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CommonCorePage />
          </Suspense>
        ),
      },
      
      // Specialization Choice Page
      {
        path: 'academics/choose-specialization',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SpecializationChoicePage />
          </Suspense>
        ),
      },
      
      // Academic Pathways Page
      {
        path: 'academics/pathways',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AcademicPathwaysPage />
          </Suspense>
        ),
      },
      
      // Degree Detail
      {
        path: 'academics/:degreeId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DegreeDetailPage />
          </Suspense>
        ),
      },
      
      // Specialty Detail
      {
        path: 'academics/:degreeId/:specialtyId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SpecialtyDetailPage />
          </Suspense>
        ),
      },
      
      // Academic Year
      {
        path: 'academics/:degreeId/:specialtyId/:yearId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AcademicYearPage />
          </Suspense>
        ),
      },
      
      // Semester
      {
        path: 'academics/:degreeId/:specialtyId/:yearId/:semesterId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SemesterPage />
          </Suspense>
        ),
      },
      
      // Module
      {
        path: 'academics/:degreeId/:specialtyId/:yearId/:semesterId/:moduleId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AcademicModulePage />
          </Suspense>
        ),
      },
      
      // ========== Legacy & Utility Routes ==========
      
      {
        path: 'subjects',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SubjectsPage />
          </Suspense>
        ),
      },
      {
        path: 'modules/:moduleId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ModuleDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'modules/english-language',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EnglishModulePage />
          </Suspense>
        ),
      },
      {
        path: 'lessons/:lessonId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LessonPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'manhaj',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ManhajOverviewPage />
          </Suspense>
        ),
      },
      {
        path: 'manhaj/curriculum-map',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CurriculumMapPage />
          </Suspense>
        ),
      },
      {
        path: 'manhaj/science/:scienceId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ScienceDetailPage />
          </Suspense>
        ),
      },
      
      // Redirect old routes
      {
        path: 'modules/ulum-al-quran',
        element: <Navigate to="/academics/licence-islamic-sciences/quran-sciences/licence-1/licence-1-s1/ulum-al-quran" replace />,
      },
      {
        path: 'modules/ulum-al-quran/:lessonId',
        element: <Navigate to="/academics/licence-islamic-sciences/quran-sciences/licence-1/licence-1-s1/ulum-al-quran" replace />,
      },
      
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
