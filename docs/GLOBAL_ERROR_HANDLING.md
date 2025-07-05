# Global Error Handling

This document explains the global error handling system implemented in the application.

## Overview

The application has a centralized error handling system that automatically handles HTTP errors from all API requests and displays appropriate notifications to users. This eliminates the need to add error handling code in every component that makes API calls.

## Components

### 1. Global Notification Utility (`src/utils/globalNotification.js`)

Provides functions to show notifications from anywhere in the application:

- `setGlobalNotificationApi(notificationApi)` - Initialize the notification API
- `showSuccessNotification(config)` - Show success notification
- `showErrorNotification(config)` - Show error notification
- `showInfoNotification(config)` - Show info notification
- `showWarningNotification(config)` - Show warning notification

### 2. Axios Interceptor (`src/utils/axios/api.js`)

The main API utility now includes a response interceptor that:

- Catches all HTTP errors (400, 401, 403, 404, 422, 429, 500, 502, 503, etc.)
- Shows appropriate error notifications with user-friendly messages
- Handles 401 errors specially by logging out the user and redirecting to login
- Handles validation errors (422) by showing field-specific error messages
- Handles network errors when the server is unreachable

### 3. App Initialization (`src/App.jsx`)

The root App component initializes the global notification API using Ant Design's `App.useApp()` hook.

## Error Types Handled

| Status Code | Error Type | Behavior |
|-------------|------------|----------|
| 400 | Bad Request | Shows validation error message |
| 401 | Unauthorized | Shows error + auto-logout + redirect to /login |
| 403 | Forbidden | Shows permission error message |
| 404 | Not Found | Shows resource not found message |
| 422 | Validation Error | Shows validation errors from server |
| 429 | Too Many Requests | Shows rate limit message |
| 500 | Server Error | Shows internal server error message |
| 502 | Bad Gateway | Shows gateway error message |
| 503 | Service Unavailable | Shows service unavailable message |
| Network Error | No response | Shows network connectivity error |

## Usage

### For New API Calls

Simply use the `Api()` utility for all HTTP requests. Error handling is automatic:

```javascript
import Api from '@/utils/axios/api';

// GET request
const response = await Api().get('/api/users');

// POST request
const response = await Api().post('/api/users', userData);

// PUT request
const response = await Api().put('/api/users/1', userData);

// DELETE request
const response = await Api().delete('/api/users/1');
```

### For Existing Code

No changes needed! All existing code using `Api()` will automatically benefit from global error handling.

### Manual Notifications

If you need to show custom notifications, you can still use the global notification utility:

```javascript
import { showSuccessNotification, showErrorNotification } from '@/utils/globalNotification';

// Show success notification
showSuccessNotification({
  message: 'Success',
  description: 'Operation completed successfully!',
  duration: 3,
});

// Show error notification
showErrorNotification({
  message: 'Error',
  description: 'Something went wrong!',
  duration: 5,
});
```

## Benefits

1. **Consistency** - All errors are handled the same way across the application
2. **Reduced Boilerplate** - No need to write error handling code in every component
3. **Better UX** - Users always see meaningful error messages
4. **Security** - Automatic logout on authentication errors
5. **Maintainability** - Centralized error handling logic

## Authentication Flow

For 401 (Unauthorized) errors:

1. Error interceptor catches the 401 response
2. Shows "Unauthorized" notification
3. Clears user data from localStorage
4. AuthContext detects the localStorage change and updates user state to null
5. ProtectedRoute component detects user is null and redirects to `/login` using React Router's `<Navigate>` component
6. No page refresh occurs - it's a client-side navigation

**Important:** The system no longer uses `window.location.href` which caused page refreshes. Instead, it relies on React's state management and React Router for smooth navigation without page reloads.

## Validation Errors

For 422 (Validation Error) responses, the system:

1. Extracts validation error messages from the response
2. Shows them in a user-friendly format
3. Supports both single error messages and multiple field errors

## Testing

You can test the error handling by making API calls to non-existent endpoints or by triggering different error status codes. All errors will be automatically handled and displayed to the user.
