import AppLayout from '@/pages';
import NotFound from '@/pages/notfound';
import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';
import { createBrowserRouter } from 'react-router';
import datastore from './datastore';

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
        loader: () => {
          console.log('INI HANDLE LOADER');
          return { data: 'LOADER TESTED' };
        },
        action: () => {
          console.log('INI HANDLE ACTION');
          return { data: 'RESPONSE 200 ACTION' };
        },
      },
      {
        path: 'dashboard',
        element: ReactLazyWithSuspense(
          () => import('@/pages/dashboard/dashboard'),
        ),
        loader: () => {
          console.log('INI HANDLE LOADER');
          return { data: 'LOADER TESTED' };
        },
        action: () => {
          console.log('INI HANDLE ACTION');
          return { data: 'RESPONSE 200 ACTION' };
        },
      },
      {
        path: 'ai',
        element: ReactLazyWithSuspense(() => import('@/pages/ai/groomingAi')),
        loader: () => {
          console.log('INI HANDLE LOADER');
          return { data: 'LOADER TESTED' };
        },
        action: () => {
          console.log('INI HANDLE ACTION');
          return { data: 'RESPONSE 200 ACTION' };
        },
      },
      ...datastore,
    ],
  },
  {
    path: '*',
    element: ReactLazyWithSuspense(() => import('@/pages/notfound')),
  },
]);

export default router;
