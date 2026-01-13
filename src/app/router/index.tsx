import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import { Container, Skeleton } from '../../shared/ui';

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('../../features/landing/LandingPage'));
const SubjectsPage = lazy(() => import('../../features/subjects/SubjectsPage'));
const AboutPage = lazy(() => import('../../features/landing/AboutPage'));
const NotFoundPage = lazy(() => import('../../features/landing/NotFoundPage'));

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
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
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
