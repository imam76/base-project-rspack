import { setGlobalNotificationApi } from '@/utils/globalNotification';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp, ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import router from './routes/index.jsx';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Component to initialize global notification API
function AppWithNotification() {
  const { notification } = AntdApp.useApp();

  useEffect(() => {
    // Initialize global notification API
    setGlobalNotificationApi(notification);
  }, [notification]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
          },
        }}
      >
        <AntdApp>
          <AppWithNotification />
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
