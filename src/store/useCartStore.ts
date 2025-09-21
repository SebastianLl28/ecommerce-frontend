import { create } from "zustand";

interface CartState {
  cartCounter: number;
  addToCart: () => void;
  removeFromCart: () => void;
  clearCart: () => void;
  setCartCount: (count: number) => void;
}

const useCartStore = create<CartState>((set) => ({
  cartCounter: 0,
  addToCart: () => set((state) => ({ cartCounter: state.cartCounter + 1 })),
  removeFromCart: () =>
    set((state) => ({
      cartCounter: state.cartCounter > 0 ? state.cartCounter - 1 : 0,
    })),
  clearCart: () => set({ cartCounter: 0 }),
  setCartCount: (count: number) => set({ cartCounter: count }),
}));

export const useCartCount = () => useCartStore((state) => state.cartCounter);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useSetCartCount = () =>
  useCartStore((state) => state.setCartCount);
