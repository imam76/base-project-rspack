import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';
import contacts from './contacts';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  {
    path: 'datastore',
    children: [
      {
        index: true,
        loader: async () => ({ data: 'test 123' }),
        action: async () => {
          console.log('action');
          return { data: 'response update' };
        },
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/datastore'),
        ),
      },
      ...contacts,
    ],
  },
];

export default routes;
