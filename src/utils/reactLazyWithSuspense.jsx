import { Suspense, lazy } from 'react';

const ReactLazyWithSuspense = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default ReactLazyWithSuspense;
