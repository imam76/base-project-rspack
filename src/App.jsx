import { RouterProvider } from 'react-router';

import router from './routes/index.jsx';

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
