/**
 * Global notification utility
 * This allows us to show notifications from anywhere in the app,
 * including axios interceptors and services
 */

let globalNotificationApi = null;

/**
 * Set the notification API instance from Ant Design App
 * This should be called once in the root App component
 */
export const setGlobalNotificationApi = (notificationApi) => {
  globalNotificationApi = notificationApi;
};

/**
 * Show success notification globally
 */
export const showSuccessNotification = (config) => {
  if (globalNotificationApi) {
    globalNotificationApi.success(config);
  } else {
    console.warn('Global notification API not initialized');
  }
};

/**
 * Show error notification globally
 */
export const showErrorNotification = (config) => {
  if (globalNotificationApi) {
    globalNotificationApi.error(config);
  } else {
    console.warn('Global notification API not initialized');
  }
};

/**
 * Show info notification globally
 */
export const showInfoNotification = (config) => {
  if (globalNotificationApi) {
    globalNotificationApi.info(config);
  } else {
    console.warn('Global notification API not initialized');
  }
};

/**
 * Show warning notification globally
 */
export const showWarningNotification = (config) => {
  if (globalNotificationApi) {
    globalNotificationApi.warning(config);
  } else {
    console.warn('Global notification API not initialized');
  }
};
