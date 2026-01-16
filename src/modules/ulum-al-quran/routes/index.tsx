import React, { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const ModuleShell = lazy(() =>
  import('../components/ModuleShell').then(m => ({
    default: m.ModuleShell,
  }))
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 mx-auto" />
      <p className="mt-4 text-gray-600">جاري تحميل الوحدة...</p>
    </div>
  </div>
);

const ModuleWrapper = () => {
  const [manifest, setManifest] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const loadManifest = async () => {
      try {
        const response = await fetch('/content/ulum-al-quran/manifest.generated.json');
        if (!response.ok) throw new Error('Failed to load manifest');
        const data = await response.json();
        setManifest(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    loadManifest();
  }, []);

  if (isLoading) return <LoadingFallback />;
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 font-medium">خطأ في تحميل الوحدة</p>
          <p className="text-gray-600 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return manifest ? <ModuleShell manifest={manifest} /> : null;
};

export const ulamAlQuranRoute: RouteObject = {
  path: 'ulum-al-quran',
  element: (
    <Suspense fallback={<LoadingFallback />}>
      <ModuleWrapper />
    </Suspense>
  ),
};

export default ulamAlQuranRoute;
