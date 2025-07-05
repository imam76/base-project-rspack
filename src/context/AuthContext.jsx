import Api from '@/utils/axios/api';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        checkAuthStatus();
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('userData');
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userData' && e.newValue === null) {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      const userData = localStorage.getItem('userData');
      if (!userData && user) {
        setUser(null);
      }
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const response = await Api().get('/api/auth/me');

      if (response.data.success && response.data.user) {
        const userData = response.data.user;
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      // Error handling is now done globally via axios interceptor
      // Just clean up local state
      if (error.response?.status === 401) {
        localStorage.removeItem('userData');
        setUser(null);
      }
    }
  };
  const login = async (email, password) => {
    try {
      const response = await Api().post('/api/auth', {
        email,
        password,
      });

      const { data } = response;

      if (data.success && data.user) {
        const { user: userData } = data;
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }

      return { success: false, error: data.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        const errorMessage =
          error.response.data?.message || 'Invalid credentials';
        return { success: false, error: errorMessage };
      }

      if (error.request) {
        return {
          success: false,
          error: 'Network error. Please check your connection.',
        };
      }

      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  };

  const logout = async () => {
    try {
      await Api().post('/api/auth/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('userData');
      setUser(null);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
