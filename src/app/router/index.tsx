import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import { Container, Skeleton } from '../../shared/ui';

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('../../features/landing/LandingPageEnhanced'));
const SubjectsPage = lazy(() => import('../../features/subjects/SubjectsPageEnhanced'));
const ModuleDetailPage = lazy(() => import('../../features/subjects/ModuleDetailPage'));
const AboutPage = lazy(() => import('../../features/landing/AboutPage'));
const NotFoundPage = lazy(() => import('../../features/landing/NotFoundPage'));
const EnglishModulePage = lazy(() => import('../../features/lessons/EnglishModulePage'));
const LessonPage = lazy(() => import('../../features/lessons/LessonPage'));
const ManhajOverviewPage = lazy(() => import('../../features/manhaj/ManhajOverviewPage'));
const CurriculumMapPage = lazy(() => import('../../features/manhaj/CurriculumMapPage'));
const ScienceDetailPage = lazy(() => import('../../features/manhaj/ScienceDetailPage'));
const UlumAlQuranPage = lazy(() => import('../../features/modules/UlumAlQuranPage'));

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
      {
        path: 'modules/ulum-al-quran',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UlumAlQuranPage />
          </Suspense>
        ),
      },
      {
        path: 'modules/ulum-al-quran/:lessonId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UlumAlQuranPage />
          </Suspense>
        ),
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
