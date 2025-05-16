import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';
import contacts from './contacts';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  {
    path: 'datastore',
    children: [
      {
        index: true,
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/datastore/datastore'),
        ),
      },
      ...contacts,
    ],
  },
];

export default routes;
