import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'; // Untuk immutability
import { createCartSlice } from './slices/cart.slice';
import { createUserSlice } from './slices/user.slice';

// Buat store utama dengan middleware (immer, devtools, dll)
export const useAppStore = create()(
  immer((...a) => ({
    ...createCartSlice(...a),
    ...createUserSlice(...a),
  })),
);
