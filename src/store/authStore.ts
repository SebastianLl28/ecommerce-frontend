import type { UserResponse } from "@/features/auth/types";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: UserResponse | null;
  login: (user: UserResponse) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useLogin = () => useAuthStore((state) => state.login);
export const useAuthLogout = () => useAuthStore((state) => state.logout);
