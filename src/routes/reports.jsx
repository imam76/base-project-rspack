import ReactLazyWithSuspense from '@/utils/reactLazyWithSuspense';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  {
    path: 'reports',
    children: [
      {
        index: true,
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/reports/reports'),
        ),
      },
      {
        path: 'profit-loss',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/reports/profit-loss'),
        ),
      },
      {
        path: 'expenses',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/reports/expenses'),
        ),
      },
      {
        path: 'revenue',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/reports/revenue'),
        ),
      },
      {
        path: 'cash-flow',
        element: ReactLazyWithSuspense(
          async () => await import('@/pages/reports/cash-flow'),
        ),
      },
    ],
  },
];

export default routes;