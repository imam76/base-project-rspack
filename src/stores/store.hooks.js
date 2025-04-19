import { useAppStore } from './index.js';

// Contoh hook untuk cart (bisa ditambah selector kompleks)
export const useCart = () => {
  const cart = useAppStore((state) => state.cart);
  const addToCart = useAppStore((state) => state.addToCart);
  const totalItems = cart.length;

  return { cart, addToCart, totalItems };
};

// Hook untuk user slice
export const useUser = () => useAppStore((state) => state.user);

// Hook untuk auth state
export const useAuth = () => {
  return useAppStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token,
    login: state.login,
    logout: state.logout,
  }));
};

// Hook untuk profile actions
export const useUserProfile = () => {
  return useAppStore((state) => ({
    user: state.user,
    updateProfile: state.updateProfile,
  }));
};