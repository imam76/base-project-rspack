import axios from 'axios';
import { showErrorNotification } from '../globalNotification';

let isHandlingLogout = false;

const ERROR_MESSAGES = {
  400: { default: 'The request could not be understood by the server.' },
  401: { default: 'You are not authorized to access this resource.' },
  403: { default: 'You do not have permission to access this resource.' },
  404: { default: 'The requested resource was not found.' },
  422: {
    default: 'The provided data is invalid.',
    handleValidation: true,
  },
  429: { default: 'You have made too many requests. Please try again later.' },
  500: { default: 'An internal server error occurred.' },
  502: { default: 'The server received an invalid response.' },
  503: { default: 'The service is temporarily unavailable.' },
};

const handleUnauthorized = () => {
  if (!isHandlingLogout) {
    isHandlingLogout = true;
    localStorage.removeItem('userData');
    setTimeout(() => {
      isHandlingLogout = false;
    }, 100);
  }
};

const getErrorContent = (status, data) => {
  const errorConfig = ERROR_MESSAGES[status] || {};
  const message = data?.error || `Error ${status}`;
  let description =
    data?.details || errorConfig.default || 'An unexpected error occurred.';

  if (
    status === 422 &&
    errorConfig.handleValidation &&
    data?.errors &&
    typeof data.errors === 'object'
  ) {
    const validationErrors = Object.values(data.errors).flat();
    description = validationErrors.join(', ');
  }

  return { message, description };
};

const showError = (message, description) => {
  showErrorNotification({
    message,
    description,
    duration: 5,
  });
};

const Api = () => {
  const instance = axios.create({
    // headers: {
    //   Authorization: 'Bearer YTBiYmU0ZDMtNjU4NS0zYTk2LWEzZmMtZDBlOTJiM2NlYWIw',
    //   slug: 'devkebunbuahsupplier18042025250418190300-pg.zahironline.com',
    // },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;

      if (response) {
        const { status, data } = response;

        if (status === 401) {
          handleUnauthorized();
        }

        const { message, description } = getErrorContent(status, data);
        showError(message, description);
      } else if (error.request) {
        showError(
          'Network Error',
          'Unable to connect to the server. Please check your internet connection.',
        );
      } else {
        showError(
          'Request Error',
          error.message ||
            'An unexpected error occurred while making the request.',
        );
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default Api;
