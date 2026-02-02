import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CONSTANTS } from "@/config/constants";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user";
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      logout: () => {
        localStorage.removeItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: CONSTANTS.STORAGE_KEYS.USER,
    },
  ),
);
