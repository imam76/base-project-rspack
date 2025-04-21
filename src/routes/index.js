import App from '@/pages';
import Dashboard from '@/pages/dashboard/dashboard';
import NotFound from '@/pages/notfound';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      }
    ]
  },
]);

export default router;
