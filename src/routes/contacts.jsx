import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';
import { redirect } from 'react-router';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  {
    path: 'contacts',
    children: [
      {
        index: true,
        loader: () => redirect('/datastore/contacts/list'),
      },
      {
        path: 'list',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/contacts/contacts'),
        ),
        children: [
          {
            path: 'filter',
            element: ReactLazyWithSuspense(
              async () =>
                await import('@/pages/datastore/contacts/filter-contact'),
            ),
          },
        ],
      },
      {
        path: 'create',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/contacts/create-contact'),
        ),
      },
      {
        path: 'edit/:id',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/contacts/edit-contact'),
        ),
      },
      {
        path: 'detail/:id',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/contacts/detail-contact'),
        ),
      },
      {
        path: '*',
        element: ReactLazyWithSuspense(() => import('@/pages/notfound')),
      },
    ],
  },
];

export default routes;
