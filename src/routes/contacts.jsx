import Api from '@/utils/axios/api';
import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  {
    path: 'contacts',
    children: [
      {
        index: true,
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/contacts/contacts'),
        ),
      },
      {
        path: 'create',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/contacts/create-contact'),
        ),
      },
    ],
  },
];

export default routes;
