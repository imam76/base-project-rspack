import AppLayout from '@/pages';
import NotFound from '@/pages/notfound';
import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';
import { createBrowserRouter } from 'react-router';
import datastore from './datastore';
import reports from './reports';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: ReactLazyWithSuspense(
          () => import('@/pages/dashboard/dashboard'),
        ),
      },
      {
        path: 'dashboard',
        element: ReactLazyWithSuspense(
          () => import('@/pages/dashboard/dashboard'),
        ),
      },
      {
        path: 'ai',
        element: ReactLazyWithSuspense(() => import('@/pages/ai/groomingAi')),
      },
      ...datastore,
      ...reports,
    ],
  },
  {
    path: '*',
    element: ReactLazyWithSuspense(() => import('@/pages/notfound')),
  },
]);

export default router;