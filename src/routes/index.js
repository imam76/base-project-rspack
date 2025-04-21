import App from '@/pages';
import Dashboard from '@/pages/dashboard/dashboard';
import Datastore from '@/pages/datastore/datastore';
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
      },
      {
        path: '/datastore',
        element: <Datastore />,
      }
    ],
  },
]);

export default router;
