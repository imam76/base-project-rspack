import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';

/** @type {import('react-router-dom').RouteObject[]} */
const routes = [
  {
    path: '/datastore',
    loader: async () => ({ data: 'test 123' }),
    action: async () => {
      console.log('action');
      return { data: 'response update' };
    },
    element: ReactLazyWithSuspense(
      async () => await import('@/pages/datastore/datastore'),
    ),
  },
];

export default routes;
