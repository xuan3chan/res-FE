import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "@/config/constants";
import { CONSTANTS } from "@/config/constants";

interface AppState {
  // Sidebar state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Theme state
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Theme
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: CONSTANTS.STORAGE_KEYS.THEME,
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
