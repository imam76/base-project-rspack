import AppLayout from '@/pages';
import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';
import { createBrowserRouter } from 'react-router';
import datastores from './datastores/_datastores';
import reports from './reports/_reports';

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
      ...datastores,
      ...reports,
    ],
  },
  {
    path: '*',
    element: ReactLazyWithSuspense(() => import('@/pages/notfound')),
  },
]);

export default router;
