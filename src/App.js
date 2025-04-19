import React from 'react';
import { RouterProvider } from 'react-router';

import router from './routes/index.js';

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}