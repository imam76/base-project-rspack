import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  {
    path: 'contacts',
    children: [
      {
        index: true,
        loader: async () => ({ data: 'test 123' }),
        action: async () => {
          console.log('action');
          return { data: 'response update' };
        },
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/contacts/contacts'),
        ),
      },
      {
        path: 'add',
        loader: async () => ({ data: 'test 123' }),
        action: async () => {
          console.log('action');
          return { data: 'response update' };
        },
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/datastore'),
        ),
      }
    ]
  },
];

export default routes;
