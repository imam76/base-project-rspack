import App from '@/pages';
import Dashboard from '@/pages/dashboard/dashboard';
import Datastore from '@/pages/datastore/datastore';
import NotFound from '@/pages/notfound';
import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: async () => ({ data: "test 123" }),
        action: async () => {
          console.log('action');
          return { data: "response update" };
        },
        element: ReactLazyWithSuspense(() => import('@/pages/dashboard/dashboard')),
      },
      {
        path: '/dashboard',
        loader: async () => ({ data: "test 123" }),
        action: async () => {
          console.log('action');
          return { data: "response update" };
        },
        element: ReactLazyWithSuspense(() => import('@/pages/dashboard/dashboard')),
      },
      {
        path: '/datastore',
        loader: async () => ({ data: "test 123" }),
        action: async () => {
          console.log('action');
          return { data: "response update" };
        },
        element: ReactLazyWithSuspense(() => import('@/pages/datastore/datastore')),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;
