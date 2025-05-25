import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as ANTApp, ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import('@ant-design/v5-patch-for-react-19');

import App from './App';
import { theme } from './styles/theme';
import('./index.css');

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <ANTApp>
          <App />
        </ANTApp>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
